'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import {
  LIST_CATEGORY_COLORS,
  type ListCategoryColor,
} from '@/lib/admin/mon-espace/listes';

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

function revalidateListes(listId?: string) {
  revalidatePath(LINKS.adminMonEspaceListes);
  if (listId) {
    revalidatePath(`${LINKS.adminMonEspaceListes}/${listId}`);
  }
}

const VALID_COLORS = new Set(LIST_CATEGORY_COLORS.map((c) => c.id));

function parseColor(raw: string): ListCategoryColor {
  return VALID_COLORS.has(raw as ListCategoryColor)
    ? (raw as ListCategoryColor)
    : 'blue';
}

/* ——— Catégories ——— */

export async function createCategoryAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const title = String(formData.get('title') ?? '').trim() || 'Nouvelle catégorie';
  const icon = String(formData.get('icon') ?? '📋').trim() || '📋';
  const color = parseColor(String(formData.get('color') ?? 'blue'));

  const { count } = await supabase
    .from('workspace_list_categories')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId);

  const { error } = await supabase.from('workspace_list_categories').insert({
    owner_id: ownerId,
    title,
    icon,
    color,
    position: count ?? 0,
  });

  if (error) throw new Error(error.message);
  revalidateListes();
}

export async function updateCategoryAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const title = String(formData.get('title') ?? '').trim();
  const icon = String(formData.get('icon') ?? '').trim();
  const colorRaw = String(formData.get('color') ?? '').trim();

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (title) patch.title = title;
  if (icon) patch.icon = icon;
  if (colorRaw) patch.color = parseColor(colorRaw);

  const { error } = await supabase
    .from('workspace_list_categories')
    .update(patch)
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes();
}

export async function deleteCategoryAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const { error } = await supabase
    .from('workspace_list_categories')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes();
}

export async function reorderCategoriesAction(orderedIds: string[]) {
  const { supabase, ownerId } = await requireOwner();
  await Promise.all(
    orderedIds.map((id, position) =>
      supabase
        .from('workspace_list_categories')
        .update({ position, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('owner_id', ownerId)
    )
  );
  revalidateListes();
}

/* ——— Listes ——— */

export async function createListAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const categoryId = String(formData.get('category_id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim() || 'Nouvelle liste';
  if (!categoryId) throw new Error('Catégorie manquante');

  const { count } = await supabase
    .from('workspace_lists')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId)
    .eq('category_id', categoryId);

  const { error } = await supabase.from('workspace_lists').insert({
    owner_id: ownerId,
    category_id: categoryId,
    title,
    position: count ?? 0,
  });

  if (error) throw new Error(error.message);
  revalidateListes();
}

export async function updateListAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const title = String(formData.get('title') ?? '').trim();
  const categoryId = String(formData.get('category_id') ?? '').trim();
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (title) patch.title = title;
  if (categoryId) patch.category_id = categoryId;

  const { error } = await supabase
    .from('workspace_lists')
    .update(patch)
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(id);
}

export async function toggleListFavoriteAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const isFavorite = String(formData.get('is_favorite') ?? '') === 'true';
  if (!id) return;

  const { error } = await supabase
    .from('workspace_lists')
    .update({
      is_favorite: !isFavorite,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(id);
}

export async function archiveListAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const archived = String(formData.get('archived') ?? '') !== 'true';
  if (!id) return;

  const { error } = await supabase
    .from('workspace_lists')
    .update({ archived, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(id);
}

export async function duplicateListAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const { data: list, error } = await supabase
    .from('workspace_lists')
    .select('*')
    .eq('id', id)
    .eq('owner_id', ownerId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!list) throw new Error('Liste introuvable');

  const { count } = await supabase
    .from('workspace_lists')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId)
    .eq('category_id', list.category_id);

  const { data: created, error: createError } = await supabase
    .from('workspace_lists')
    .insert({
      owner_id: ownerId,
      category_id: list.category_id,
      title: `${list.title} (copie)`,
      is_favorite: false,
      archived: false,
      position: count ?? 0,
    })
    .select('id')
    .single();

  if (createError) throw new Error(createError.message);

  const { data: items } = await supabase
    .from('workspace_list_items')
    .select('title, note, completed, position')
    .eq('list_id', id)
    .eq('owner_id', ownerId)
    .order('position', { ascending: true });

  if (items && items.length > 0) {
    await supabase.from('workspace_list_items').insert(
      items.map((item) => ({
        owner_id: ownerId,
        list_id: created.id,
        title: item.title,
        note: item.note,
        completed: false,
        position: item.position,
      }))
    );
  }

  revalidateListes(created.id);
}

export async function deleteListAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const { error } = await supabase
    .from('workspace_lists')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes();
}

export async function moveListAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const categoryId = String(formData.get('category_id') ?? '').trim();
  if (!id || !categoryId) return;

  const { count } = await supabase
    .from('workspace_lists')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId)
    .eq('category_id', categoryId);

  const { error } = await supabase
    .from('workspace_lists')
    .update({
      category_id: categoryId,
      position: count ?? 0,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(id);
}

/* ——— Items ——— */

export async function addListItemAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const listId = String(formData.get('list_id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  if (!listId || !title) return;

  const { count } = await supabase
    .from('workspace_list_items')
    .select('id', { count: 'exact', head: true })
    .eq('list_id', listId)
    .eq('owner_id', ownerId);

  const { error } = await supabase.from('workspace_list_items').insert({
    owner_id: ownerId,
    list_id: listId,
    title,
    completed: false,
    position: count ?? 0,
  });

  if (error) throw new Error(error.message);
  revalidateListes(listId);
}

export async function toggleListItemAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const listId = String(formData.get('list_id') ?? '').trim();
  const completed = String(formData.get('completed') ?? '') === 'true';
  if (!id) return;

  const { error } = await supabase
    .from('workspace_list_items')
    .update({
      completed: !completed,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(listId || undefined);
}

export async function updateListItemAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const listId = String(formData.get('list_id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const noteRaw = formData.get('note');
  if (!id || !title) return;

  const patch: Record<string, unknown> = {
    title,
    updated_at: new Date().toISOString(),
  };
  if (typeof noteRaw === 'string') {
    patch.note = noteRaw.trim() || null;
  }

  const { error } = await supabase
    .from('workspace_list_items')
    .update(patch)
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(listId || undefined);
}

export async function deleteListItemAction(formData: FormData) {
  const { supabase, ownerId } = await requireOwner();
  const id = String(formData.get('id') ?? '').trim();
  const listId = String(formData.get('list_id') ?? '').trim();
  if (!id) return;

  const { error } = await supabase
    .from('workspace_list_items')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateListes(listId || undefined);
}

export async function reorderListItemsAction(
  listId: string,
  orderedIds: string[]
) {
  const { supabase, ownerId } = await requireOwner();
  await Promise.all(
    orderedIds.map((id, position) =>
      supabase
        .from('workspace_list_items')
        .update({ position, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('list_id', listId)
        .eq('owner_id', ownerId)
    )
  );
  revalidateListes(listId);
}
