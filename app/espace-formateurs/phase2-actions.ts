'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { LINKS } from '@/lib/internal-links';

const BUCKET = 'extranet-formateurs';
const MAX_BYTES = 15 * 1024 * 1024;

export async function confirmMissionPreparationAction(
  missionId: string
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: mission } = await admin
    .from('extranet_missions')
    .select('trainer_id')
    .eq('id', missionId)
    .maybeSingle();

  if (!mission || mission.trainer_id !== access.trainer.id) {
    return { ok: false, error: 'Mission introuvable.' };
  }

  const { error } = await admin
    .from('extranet_missions')
    .update({
      preparation_confirmed_at: new Date().toISOString(),
      status: 'confirmed',
    })
    .eq('id', missionId);

  if (error) return { ok: false, error: 'Confirmation impossible.' };

  revalidatePath(LINKS.espaceFormateursInterventions);
  revalidatePath(LINKS.espaceFormateurs);
  return { ok: true };
}

export async function saveMissionTrainerReportAction(
  missionId: string,
  report: string
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: mission } = await admin
    .from('extranet_missions')
    .select('trainer_id')
    .eq('id', missionId)
    .maybeSingle();

  if (!mission || mission.trainer_id !== access.trainer.id) {
    return { ok: false, error: 'Mission introuvable.' };
  }

  const { error } = await admin
    .from('extranet_missions')
    .update({ trainer_report: report.trim() || null })
    .eq('id', missionId);

  if (error) return { ok: false, error: 'Enregistrement impossible.' };
  revalidatePath(`${LINKS.espaceFormateursInterventions}/${missionId}`);
  return { ok: true };
}

export async function uploadMissionDocumentAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const missionId = String(formData.get('mission_id') ?? '').trim();
  const docKind = String(formData.get('doc_kind') ?? '').trim();
  const file = formData.get('file');

  if (!missionId || !docKind || !(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Fichier ou mission manquant.' };
  }
  if (file.size > MAX_BYTES) return { ok: false, error: 'Fichier trop volumineux.' };

  const admin = createAdminClient();
  const { data: mission } = await admin
    .from('extranet_missions')
    .select('trainer_id')
    .eq('id', missionId)
    .maybeSingle();

  if (!mission || mission.trainer_id !== access.trainer.id) {
    return { ok: false, error: 'Mission introuvable.' };
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'pdf';
  const path = `${access.trainer.id}/missions/${missionId}/${docKind}-${Date.now()}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || 'application/pdf',
    upsert: false,
  });
  if (upErr) return { ok: false, error: 'Échec du dépôt.' };

  const { error: insErr } = await admin.from('extranet_mission_documents').insert({
    mission_id: missionId,
    trainer_id: access.trainer.id,
    doc_kind: docKind,
    storage_path: path,
    original_filename: file.name.slice(0, 255),
    mime_type: file.type || null,
    uploaded_by: access.userId,
  });

  if (insErr) return { ok: false, error: 'Enregistrement impossible.' };

  revalidatePath(`${LINKS.espaceFormateursInterventions}/${missionId}`);
  return { ok: true };
}

export async function getTrainerResourceSignedUrlAction(
  resourceId: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: grant } = await admin
    .from('extranet_trainer_resource_grants')
    .select('id')
    .eq('trainer_id', access.trainer.id)
    .eq('resource_id', resourceId)
    .maybeSingle();

  if (!grant) return { ok: false, error: 'Accès non autorisé à cette ressource.' };

  const { data: resource } = await admin
    .from('extranet_trainer_resources')
    .select('storage_path, is_archived')
    .eq('id', resourceId)
    .maybeSingle();

  if (!resource || resource.is_archived || resource.storage_path.includes('..')) {
    return { ok: false, error: 'Ressource indisponible.' };
  }

  const signed = await admin.storage.from(BUCKET).createSignedUrl(resource.storage_path, 300);
  if (signed.error || !signed.data?.signedUrl) return { ok: false, error: 'Lien indisponible.' };
  return { ok: true, url: signed.data.signedUrl };
}

export async function getTrainerMissionDocSignedUrlAction(
  documentId: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: doc } = await admin
    .from('extranet_mission_documents')
    .select('trainer_id, storage_path')
    .eq('id', documentId)
    .maybeSingle();

  if (!doc || doc.trainer_id !== access.trainer.id || doc.storage_path.includes('..')) {
    return { ok: false, error: 'Document introuvable.' };
  }

  const signed = await admin.storage.from(BUCKET).createSignedUrl(doc.storage_path, 300);
  if (signed.error || !signed.data?.signedUrl) return { ok: false, error: 'Lien indisponible.' };
  return { ok: true, url: signed.data.signedUrl };
}
