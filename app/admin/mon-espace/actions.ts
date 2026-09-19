'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import {
  RESOURCE_CATEGORIES,
  RESOURCE_KINDS,
  type WorkspaceResourceCategory,
  type WorkspaceResourceKind,
} from '@/lib/admin/mon-espace/types';

const BASE = LINKS.adminMonEspace;

async function requireOwner() {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    throw new Error(
      access.reason === 'unauthenticated' ? 'Non authentifié' : 'Accès interdit'
    );
  }
  const supabase = await createClient();
  return { supabase, ownerId: access.userId };
}

function revalidateMonEspace() {
  revalidatePath(BASE);
  revalidatePath(LINKS.adminMonEspaceAgenda);
  revalidatePath(LINKS.adminMonEspaceNotes);
  revalidatePath(LINKS.adminMonEspaceRessources);
  revalidatePath(`${BASE}/taches`);
  revalidatePath(`${BASE}/favoris`);
  revalidatePath(LINKS.adminMonEspaceSuivi);
}

export async function addTaskAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const title = String(formData.get('title') ?? '').trim();
  const columnId = String(formData.get('column_id') ?? '').trim() || null;
  if (!title) return;

  let countQuery = supabase
    .from('workspace_tasks')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId);

  countQuery = columnId
    ? countQuery.eq('column_id', columnId)
    : countQuery.is('column_id', null);

  const { count } = await countQuery;

  await supabase.from('workspace_tasks').insert({
    owner_id: ownerId,
    column_id: columnId,
    title,
    done: false,
    emphasis: false,
    sort_order: count ?? 0,
  });

  revalidateMonEspace();
}

export async function toggleTaskAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  const done = String(formData.get('done') ?? '') === 'true';
  if (!id) return;

  await supabase
    .from('workspace_tasks')
    .update({ done: !done, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

export async function toggleTaskEmphasisAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  const emphasis = String(formData.get('emphasis') ?? '') === 'true';
  if (!id) return;

  await supabase
    .from('workspace_tasks')
    .update({ emphasis: !emphasis, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

export async function deleteTaskAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  await supabase
    .from('workspace_tasks')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

export async function updateNoteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  const title = String(formData.get('title') ?? 'Notes').trim() || 'Notes';
  const body = String(formData.get('body') ?? '');
  if (!id) return;

  await supabase
    .from('workspace_notes')
    .update({
      title,
      body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

export async function createNoteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const title = String(formData.get('title') ?? '').trim() || 'Nouvelle note';
  const body = String(formData.get('body') ?? '');

  await supabase.from('workspace_notes').insert({
    owner_id: ownerId,
    title,
    body,
    pinned: false,
    sort_order: 0,
  });

  revalidateMonEspace();
}

export async function deleteNoteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  await supabase
    .from('workspace_notes')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

export async function toggleNoteFavoriteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  const pinned = String(formData.get('pinned') ?? '') === 'true';
  if (!id) return;

  await supabase
    .from('workspace_notes')
    .update({
      pinned: !pinned,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

export async function addFavoriteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const label = String(formData.get('label') ?? '').trim();
  const href = String(formData.get('href') ?? '').trim();
  if (!label || !href) return;
  if (!href.startsWith('/')) return; // liens internes uniquement

  await supabase.from('workspace_favorites').insert({
    owner_id: ownerId,
    label,
    href,
    sort_order: 0,
  });

  revalidateMonEspace();
}

export async function deleteFavoriteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  await supabase
    .from('workspace_favorites')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  revalidateMonEspace();
}

const VALID_KINDS = new Set(RESOURCE_KINDS.map((k) => k.id));
const VALID_CATEGORIES = new Set(RESOURCE_CATEGORIES.map((c) => c.id));

function parseResourceForm(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const linkRaw = String(formData.get('link') ?? '').trim();
  const kindRaw = String(formData.get('kind') ?? 'url').trim();
  const categoryRaw = String(formData.get('category') ?? 'autre').trim();
  const isFavorite = String(formData.get('is_favorite') ?? '') === 'true';

  if (!title) throw new Error('Le titre est obligatoire');

  const kind = (
    VALID_KINDS.has(kindRaw as WorkspaceResourceKind) ? kindRaw : 'url'
  ) as WorkspaceResourceKind;
  const category = (
    VALID_CATEGORIES.has(categoryRaw as WorkspaceResourceCategory)
      ? categoryRaw
      : 'autre'
  ) as WorkspaceResourceCategory;

  return {
    title,
    description,
    link: linkRaw || null,
    kind,
    category,
    is_favorite: isFavorite,
  };
}

export async function createResourceAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const payload = parseResourceForm(formData);

  const { error } = await supabase.from('workspace_resources').insert({
    owner_id: ownerId,
    ...payload,
    sort_order: 0,
  });

  if (error) throw new Error(error.message);
  revalidateMonEspace();
}

export async function updateResourceAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) throw new Error('Ressource introuvable');

  const payload = parseResourceForm(formData);

  const { error } = await supabase
    .from('workspace_resources')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateMonEspace();
}

export async function deleteResourceAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const { error } = await supabase
    .from('workspace_resources')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateMonEspace();
}

export async function toggleResourceFavoriteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const isFavorite = String(formData.get('is_favorite') ?? '') === 'true';
  if (!id) return;

  const { error } = await supabase
    .from('workspace_resources')
    .update({
      is_favorite: !isFavorite,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateMonEspace();
}
