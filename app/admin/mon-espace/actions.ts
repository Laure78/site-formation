'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';

const BASE = LINKS.adminMonEspace;

async function requireOwner() {
  const access = await requireAdminAccess();
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
  revalidatePath(`${BASE}/notes`);
  revalidatePath(`${BASE}/taches`);
  revalidatePath(`${BASE}/favoris`);
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
