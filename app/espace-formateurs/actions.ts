'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import type { ExtranetDocType } from '@/lib/extranet-formateurs/document-types';

const BUCKET = 'extranet-formateurs';
const MAX_BYTES = 15 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

function safeExt(filename: string): string {
  const m = filename.match(/\.([a-zA-Z0-9]{1,8})$/);
  return m ? m[1].toLowerCase() : 'bin';
}

export async function updateExtranetProfileAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const patch = {
    first_name: String(formData.get('first_name') ?? '').trim() || null,
    last_name: String(formData.get('last_name') ?? '').trim() || null,
    phone: String(formData.get('phone') ?? '').trim() || null,
    specialty: String(formData.get('specialty') ?? '').trim() || null,
    siret: String(formData.get('siret') ?? '').trim() || null,
    siren: String(formData.get('siren') ?? '').trim() || null,
    company_name: String(formData.get('company_name') ?? '').trim() || null,
    nda_number: String(formData.get('nda_number') ?? '').trim() || null,
    btp_experience_years: formData.get('btp_experience_years')
      ? Number(formData.get('btp_experience_years'))
      : null,
    btp_experience_summary: String(formData.get('btp_experience_summary') ?? '').trim() || null,
    ia_tools_summary: String(formData.get('ia_tools_summary') ?? '').trim() || null,
    pedagogy_summary: String(formData.get('pedagogy_summary') ?? '').trim() || null,
  };

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_trainers').update(patch).eq('id', access.trainer.id);
  if (error) {
    console.error('[updateExtranetProfile]', error.message);
    return { ok: false, error: 'Enregistrement impossible.' };
  }

  revalidatePath('/espace-formateurs');
  revalidatePath('/espace-formateurs/profil');
  return { ok: true };
}

export async function uploadExtranetDocumentAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const docType = String(formData.get('doc_type') ?? '') as ExtranetDocType;
  const file = formData.get('file');
  const expiresAtRaw = String(formData.get('expires_at') ?? '').trim();

  if (!docType || !(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Fichier ou type manquant.' };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'Fichier trop volumineux (15 Mo max.).' };
  }
  const mime = file.type || 'application/octet-stream';
  if (!ALLOWED_MIME.has(mime)) {
    return { ok: false, error: 'Format non autorisé (PDF, Word ou image).' };
  }

  const admin = createAdminClient();
  const trainerId = access.trainer.id;

  const { data: prev } = await admin
    .from('extranet_trainer_documents')
    .select('id, version')
    .eq('trainer_id', trainerId)
    .eq('doc_type', docType)
    .neq('status', 'superseded')
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextVersion = (prev?.version ?? 0) + 1;
  const ext = safeExt(file.name);
  const path = `${trainerId}/${docType}/v${nextVersion}-${crypto.randomUUID()}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: mime,
    upsert: false,
  });
  if (upErr) {
    console.error('[uploadExtranetDocument storage]', upErr.message);
    return { ok: false, error: 'Échec du dépôt.' };
  }

  const { data: inserted, error: insErr } = await admin
    .from('extranet_trainer_documents')
    .insert({
      trainer_id: trainerId,
      doc_type: docType,
      storage_path: path,
      original_filename: file.name.slice(0, 255),
      mime_type: mime,
      file_size_bytes: file.size,
      version: nextVersion,
      expires_at: expiresAtRaw || null,
      status: 'pending',
    })
    .select('id')
    .single();

  if (insErr || !inserted) {
    console.error('[uploadExtranetDocument db]', insErr?.message);
    return { ok: false, error: 'Enregistrement du document impossible.' };
  }

  if (prev?.id) {
    await admin
      .from('extranet_trainer_documents')
      .update({ status: 'superseded', superseded_by: inserted.id })
      .eq('id', prev.id);
  }

  await admin.from('extranet_document_events').insert({
    document_id: inserted.id,
    trainer_id: trainerId,
    event_type: prev?.id ? 'replaced' : 'uploaded',
    actor_id: access.userId,
    payload: { doc_type: docType, version: nextVersion },
  });

  revalidatePath('/espace-formateurs');
  revalidatePath('/espace-formateurs/documents');
  return { ok: true };
}

export async function getExtranetDocumentSignedUrlAction(
  documentId: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: doc } = await admin
    .from('extranet_trainer_documents')
    .select('trainer_id, storage_path')
    .eq('id', documentId)
    .maybeSingle();

  if (!doc || doc.trainer_id !== access.trainer.id) {
    return { ok: false, error: 'Document introuvable.' };
  }
  if (doc.storage_path.includes('..')) {
    return { ok: false, error: 'Chemin invalide.' };
  }

  const { data, error } = await admin.storage.from(BUCKET).createSignedUrl(doc.storage_path, 300);
  if (error || !data?.signedUrl) {
    return { ok: false, error: 'Lien indisponible.' };
  }
  return { ok: true, url: data.signedUrl };
}

export async function acceptCharterAction(charterVersionId: string): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: version } = await admin
    .from('extranet_charter_versions')
    .select('id, is_current')
    .eq('id', charterVersionId)
    .maybeSingle();

  if (!version?.is_current) {
    return { ok: false, error: 'Version de charte invalide.' };
  }

  const h = await headers();
  const ipHint = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  const userAgent = h.get('user-agent')?.slice(0, 512) ?? null;

  const { error } = await admin.from('extranet_charter_acceptances').upsert(
    {
      trainer_id: access.trainer.id,
      charter_version_id: charterVersionId,
      accepted_at: new Date().toISOString(),
      ip_hint: ipHint,
      user_agent: userAgent,
    },
    { onConflict: 'trainer_id,charter_version_id' }
  );

  if (error) {
    console.error('[acceptCharter]', error.message);
    return { ok: false, error: 'Acceptation impossible.' };
  }

  revalidatePath('/espace-formateurs');
  revalidatePath('/espace-formateurs/charte');
  return { ok: true };
}

export async function signOutExtranetAction() {
  const { createClient } = await import('@/lib/supabase/server');
  const { redirect } = await import('next/navigation');
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(LINKS.espaceFormateursConnexion);
}
