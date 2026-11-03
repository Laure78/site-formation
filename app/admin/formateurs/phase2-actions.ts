'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import type { ExtranetResourceType } from '@/lib/extranet-formateurs/phase2-types';

const BUCKET = 'extranet-formateurs';
const MAX_BYTES = 15 * 1024 * 1024;

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export async function createExtranetProgramAction(formData: FormData): Promise<{ ok: boolean; error?: string; id?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const title = String(formData.get('title') ?? '').trim();
  const catalogueCode = String(formData.get('catalogue_code') ?? '').trim() || null;
  if (!title) return { ok: false, error: 'Titre requis.' };

  const slugBase = slugify(title);
  const admin = createAdminClient();

  const { data: program, error } = await admin
    .from('extranet_programs')
    .insert({
      title,
      slug: `${slugBase}-${Date.now().toString(36)}`,
      catalogue_code: catalogueCode,
    })
    .select('id')
    .single();

  if (error || !program) {
    console.error('[createExtranetProgram]', error?.message);
    return { ok: false, error: 'Création impossible.' };
  }

  const versionLabel = String(formData.get('version_label') ?? '1.0').trim() || '1.0';
  const { error: vErr } = await admin.from('extranet_program_versions').insert({
    program_id: program.id,
    version_label: versionLabel,
    is_current: true,
    objectives_md: String(formData.get('objectives_md') ?? ''),
    audience: String(formData.get('audience') ?? ''),
    prerequisites: String(formData.get('prerequisites') ?? ''),
    duration_hours: formData.get('duration_hours') ? Number(formData.get('duration_hours')) : null,
    schedule_md: String(formData.get('schedule_md') ?? ''),
    methods_md: String(formData.get('methods_md') ?? ''),
    evaluation_md: String(formData.get('evaluation_md') ?? ''),
    adaptations_md: String(formData.get('adaptations_md') ?? ''),
    published_by: access.userId,
  });

  if (vErr) {
    console.error('[createExtranetProgram version]', vErr.message);
    return { ok: false, error: 'Programme créé sans version — complétez manuellement.' };
  }

  revalidatePath(LINKS.adminFormateursProgrammes);
  return { ok: true, id: program.id };
}

export async function grantProgramToTrainerAction(
  trainerId: string,
  programId: string
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_trainer_program_grants').upsert(
    {
      trainer_id: trainerId,
      program_id: programId,
      granted_by: access.userId,
      granted_at: new Date().toISOString(),
    },
    { onConflict: 'trainer_id,program_id' }
  );

  if (error) {
    console.error('[grantProgram]', error.message);
    return { ok: false, error: 'Attribution impossible.' };
  }

  revalidatePath(`${LINKS.adminFormateurs}/${trainerId}`);
  return { ok: true };
}

export async function uploadTrainerResourceAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const title = String(formData.get('title') ?? '').trim();
  const resourceType = String(formData.get('resource_type') ?? '') as ExtranetResourceType;
  const programId = String(formData.get('program_id') ?? '').trim() || null;
  const file = formData.get('file');

  if (!title || !resourceType || !(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Titre, type et fichier requis.' };
  }
  if (file.size > MAX_BYTES) return { ok: false, error: 'Fichier trop volumineux (15 Mo max.).' };

  const admin = createAdminClient();
  const resourceId = crypto.randomUUID();
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const path = `resources/${resourceId}/${slugify(title)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (upErr) {
    console.error('[uploadTrainerResource storage]', upErr.message);
    return { ok: false, error: 'Échec upload.' };
  }

  const { data: row, error: dbErr } = await admin
    .from('extranet_trainer_resources')
    .insert({
      id: resourceId,
      title,
      resource_type: resourceType,
      program_id: programId,
      description: String(formData.get('description') ?? '').trim() || null,
      storage_path: path,
      original_filename: file.name.slice(0, 255),
      mime_type: file.type || null,
      file_size_bytes: file.size,
      version_label: String(formData.get('version_label') ?? '1.0').trim() || '1.0',
      uploaded_by: access.userId,
    })
    .select('id')
    .single();

  if (dbErr || !row) {
    console.error('[uploadTrainerResource db]', dbErr?.message);
    return { ok: false, error: 'Enregistrement impossible.' };
  }

  revalidatePath(LINKS.adminFormateursSupports);
  return { ok: true };
}

export async function grantResourceToTrainerAction(
  trainerId: string,
  resourceId: string
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_trainer_resource_grants').upsert(
    {
      trainer_id: trainerId,
      resource_id: resourceId,
      granted_by: access.userId,
      granted_at: new Date().toISOString(),
    },
    { onConflict: 'trainer_id,resource_id' }
  );

  if (error) {
    console.error('[grantResource]', error.message);
    return { ok: false, error: 'Attribution impossible.' };
  }

  revalidatePath(`${LINKS.adminFormateurs}/${trainerId}`);
  return { ok: true };
}

export async function createExtranetMissionAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const trainerId = String(formData.get('trainer_id') ?? '').trim();
  const programId = String(formData.get('program_id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const startsOn = String(formData.get('starts_on') ?? '').trim();

  if (!trainerId || !programId || !title || !startsOn) {
    return { ok: false, error: 'Formateur, programme, titre et date requis.' };
  }

  const admin = createAdminClient();
  const { data: version } = await admin
    .from('extranet_program_versions')
    .select('id')
    .eq('program_id', programId)
    .eq('is_current', true)
    .maybeSingle();

  if (!version) return { ok: false, error: 'Aucune version courante pour ce programme.' };

  const { error } = await admin.from('extranet_missions').insert({
    trainer_id: trainerId,
    program_version_id: version.id,
    title,
    status: 'assigned',
    modality: 'presentiel',
    starts_on: startsOn,
    ends_on: String(formData.get('ends_on') ?? '').trim() || null,
    schedule_text: String(formData.get('schedule_text') ?? '').trim() || null,
    duration_hours: formData.get('duration_hours') ? Number(formData.get('duration_hours')) : null,
    location_name: String(formData.get('location_name') ?? '').trim() || null,
    location_address: String(formData.get('location_address') ?? '').trim() || null,
    location_city: String(formData.get('location_city') ?? '').trim() || null,
    client_company_name: String(formData.get('client_company_name') ?? '').trim() || null,
    pedagogical_brief: String(formData.get('pedagogical_brief') ?? '').trim() || null,
    administrative_brief: String(formData.get('administrative_brief') ?? '').trim() || null,
    created_by: access.userId,
  });

  if (error) {
    console.error('[createExtranetMission]', error.message);
    return { ok: false, error: 'Création mission impossible.' };
  }

  revalidatePath(LINKS.adminFormateursPlanning);
  revalidatePath(LINKS.espaceFormateursInterventions);
  return { ok: true };
}

export async function getAdminResourceSignedUrlAction(
  resourceId: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_trainer_resources')
    .select('storage_path')
    .eq('id', resourceId)
    .maybeSingle();

  if (!data?.storage_path || data.storage_path.includes('..')) {
    return { ok: false, error: 'Ressource introuvable.' };
  }

  const signed = await admin.storage.from(BUCKET).createSignedUrl(data.storage_path, 300);
  if (signed.error || !signed.data?.signedUrl) return { ok: false, error: 'Lien indisponible.' };
  return { ok: true, url: signed.data.signedUrl };
}

export async function archiveResourceAction(resourceId: string): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin
    .from('extranet_trainer_resources')
    .update({ is_archived: true })
    .eq('id', resourceId);

  if (error) return { ok: false, error: 'Archivage impossible.' };
  revalidatePath(LINKS.adminFormateursSupports);
  return { ok: true };
}
