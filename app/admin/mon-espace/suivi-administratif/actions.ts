'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import type { ChecklistItemStatus } from '@/lib/admin/mon-espace/suivi-administratif';

async function requireOwner() {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    throw new Error(
      access.reason === 'unauthenticated' ? 'Non authentifié' : 'Accès interdit'
    );
  }
  const supabase = await createClient();
  return { supabase, userId: access.userId };
}

function revalidateSuivi() {
  revalidatePath(LINKS.adminMonEspace);
  revalidatePath(LINKS.adminMonEspaceSuivi);
}

const VALID_STATUS = new Set<ChecklistItemStatus>(['todo', 'waiting', 'done']);

export async function updateChecklistEntryAction(formData: FormData) {
  const { supabase } = await requireOwner();
  const entryId = String(formData.get('entry_id') ?? '').trim();
  if (!entryId) throw new Error('Entrée introuvable');

  const statusRaw = String(formData.get('status') ?? '').trim();
  const enabledRaw = formData.get('enabled');
  const noteRaw = formData.get('note');

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (statusRaw && VALID_STATUS.has(statusRaw as ChecklistItemStatus)) {
    patch.status = statusRaw;
    patch.completed_at =
      statusRaw === 'done' ? new Date().toISOString() : null;
  }

  if (enabledRaw === 'true' || enabledRaw === 'false') {
    patch.enabled = enabledRaw === 'true';
  }

  if (typeof noteRaw === 'string') {
    patch.note = noteRaw.trim() || null;
  }

  const { error } = await supabase
    .from('course_checklist_entries')
    .update(patch)
    .eq('id', entryId);

  if (error) throw new Error(error.message);
  revalidateSuivi();
}

export async function setChecklistItemEnabledAction(formData: FormData) {
  const { supabase } = await requireOwner();
  const entryId = String(formData.get('entry_id') ?? '').trim();
  const enabled = String(formData.get('enabled') ?? '') === 'true';
  if (!entryId) return;

  const { error } = await supabase
    .from('course_checklist_entries')
    .update({
      enabled,
      updated_at: new Date().toISOString(),
    })
    .eq('id', entryId);

  if (error) throw new Error(error.message);
  revalidateSuivi();
}

export async function toggleDefinitionActiveAction(formData: FormData) {
  const { supabase } = await requireOwner();
  const definitionId = String(formData.get('definition_id') ?? '').trim();
  const isActive = String(formData.get('is_active') ?? '') === 'true';
  if (!definitionId) return;

  const { error } = await supabase
    .from('admin_checklist_definitions')
    .update({ is_active: isActive })
    .eq('id', definitionId);

  if (error) throw new Error(error.message);
  revalidateSuivi();
}

export async function setDefinitionDefaultEnabledAction(formData: FormData) {
  const { supabase } = await requireOwner();
  const definitionId = String(formData.get('definition_id') ?? '').trim();
  const defaultEnabled = String(formData.get('default_enabled') ?? '') === 'true';
  if (!definitionId) return;

  const { error } = await supabase
    .from('admin_checklist_definitions')
    .update({ default_enabled: defaultEnabled })
    .eq('id', definitionId);

  if (error) throw new Error(error.message);
  revalidateSuivi();
}
