'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdminAccess } from '@/lib/admin-access';
import type { ExtranetDocStatus } from '@/lib/extranet-formateurs/document-types';
import type { ExtranetNdaStatus } from '@/lib/extranet-formateurs/document-types';
import type { ExtranetAdminValidationStatus } from '@/lib/extranet-formateurs/types';

const BUCKET = 'extranet-formateurs';

export async function inviteExtranetTrainerAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const firstName = String(formData.get('first_name') ?? '').trim();
  const lastName = String(formData.get('last_name') ?? '').trim();
  const specialty = String(formData.get('specialty') ?? '').trim();

  if (!email || !email.includes('@')) {
    return { ok: false, error: 'E-mail invalide.' };
  }

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_trainers').insert({
    email,
    first_name: firstName || null,
    last_name: lastName || null,
    specialty: specialty || null,
    status: 'invited',
  });

  if (error) {
    if (error.code === '23505') return { ok: false, error: 'Un dossier existe déjà pour cet e-mail.' };
    console.error('[inviteExtranetTrainer]', error.message);
    return { ok: false, error: 'Création impossible.' };
  }

  await admin.from('extranet_audit_log').insert({
    actor_id: access.userId,
    action: 'trainer_invited',
    details: { email, first_name: firstName, last_name: lastName },
  });

  revalidatePath('/admin/formateurs');
  return { ok: true };
}

export async function updateExtranetTrainerAdminAction(
  trainerId: string,
  patch: {
    nda_status?: ExtranetNdaStatus;
    admin_validation_status?: ExtranetAdminValidationStatus;
    first_contract_at?: string | null;
    nda_declaration_deadline?: string | null;
    requires_urssaf_vigilance?: boolean;
    requires_rc_pro?: boolean;
    requires_qualiopi_certificate?: boolean;
    requires_pedagogy_proof?: boolean;
    admin_notes?: string | null;
    status?: string;
  }
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_trainers').update(patch).eq('id', trainerId);
  if (error) {
    console.error('[updateExtranetTrainerAdmin]', error.message);
    return { ok: false, error: 'Mise à jour impossible.' };
  }

  await admin.from('extranet_audit_log').insert({
    trainer_id: trainerId,
    actor_id: access.userId,
    action: 'trainer_admin_update',
    details: patch,
  });

  revalidatePath('/admin/formateurs');
  revalidatePath(`/admin/formateurs/${trainerId}`);
  return { ok: true };
}

export async function reviewExtranetDocumentAction(
  documentId: string,
  status: ExtranetDocStatus,
  adminComment?: string
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  if (!['approved', 'rejected', 'expired'].includes(status)) {
    return { ok: false, error: 'Statut invalide.' };
  }

  const admin = createAdminClient();
  const { data: doc } = await admin
    .from('extranet_trainer_documents')
    .select('id, trainer_id')
    .eq('id', documentId)
    .maybeSingle();

  if (!doc) return { ok: false, error: 'Document introuvable.' };

  const { error } = await admin
    .from('extranet_trainer_documents')
    .update({
      status,
      admin_comment: adminComment?.trim() || null,
      reviewed_by: access.userId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', documentId);

  if (error) {
    console.error('[reviewExtranetDocument]', error.message);
    return { ok: false, error: 'Validation impossible.' };
  }

  await admin.from('extranet_document_events').insert({
    document_id: documentId,
    trainer_id: doc.trainer_id,
    event_type: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'expired',
    actor_id: access.userId,
    payload: { admin_comment: adminComment ?? null },
  });

  revalidatePath('/admin/formateurs');
  revalidatePath(`/admin/formateurs/${doc.trainer_id}`);
  return { ok: true };
}

export async function publishCharterVersionAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const versionLabel = String(formData.get('version_label') ?? '').trim();
  const contentMd = String(formData.get('content_md') ?? '').trim();
  if (!versionLabel || !contentMd) {
    return { ok: false, error: 'Version et contenu requis.' };
  }

  const admin = createAdminClient();
  await admin.from('extranet_charter_versions').update({ is_current: false }).eq('is_current', true);

  const { error } = await admin.from('extranet_charter_versions').insert({
    version_label: versionLabel,
    content_md: contentMd,
    is_current: true,
    created_by: access.userId,
  });

  if (error) {
    console.error('[publishCharterVersion]', error.message);
    return { ok: false, error: 'Publication impossible.' };
  }

  revalidatePath('/admin/formateurs/charte');
  revalidatePath('/espace-formateurs/charte');
  return { ok: true };
}

export async function getExtranetAdminDocumentSignedUrlAction(
  documentId: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: doc } = await admin
    .from('extranet_trainer_documents')
    .select('storage_path')
    .eq('id', documentId)
    .maybeSingle();

  if (!doc?.storage_path || doc.storage_path.includes('..')) {
    return { ok: false, error: 'Document introuvable.' };
  }

  const { data, error } = await admin.storage.from(BUCKET).createSignedUrl(doc.storage_path, 300);
  if (error || !data?.signedUrl) {
    return { ok: false, error: 'Lien indisponible.' };
  }
  return { ok: true, url: data.signedUrl };
}
