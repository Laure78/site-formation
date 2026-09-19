import type { SupabaseClient } from '@supabase/supabase-js';

export type ListCategoryColor =
  | 'blue'
  | 'sky'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'emerald'
  | 'slate'
  | 'orange';

export const LIST_CATEGORY_COLORS: {
  id: ListCategoryColor;
  label: string;
  cardClass: string;
  accentClass: string;
}[] = [
  { id: 'blue', label: 'Bleu', cardClass: 'border-sky-100/80 bg-sky-50/40', accentClass: 'text-sky-800' },
  { id: 'sky', label: 'Ciel', cardClass: 'border-cyan-100/80 bg-cyan-50/40', accentClass: 'text-cyan-800' },
  { id: 'amber', label: 'Ambre', cardClass: 'border-amber-100/80 bg-amber-50/35', accentClass: 'text-amber-900' },
  { id: 'rose', label: 'Rose', cardClass: 'border-rose-100/80 bg-rose-50/35', accentClass: 'text-rose-800' },
  { id: 'violet', label: 'Violet', cardClass: 'border-violet-100/80 bg-violet-50/40', accentClass: 'text-violet-800' },
  { id: 'emerald', label: 'Émeraude', cardClass: 'border-emerald-100/80 bg-emerald-50/35', accentClass: 'text-emerald-800' },
  { id: 'slate', label: 'Gris', cardClass: 'border-slate-200/80 bg-slate-50/50', accentClass: 'text-slate-700' },
  { id: 'orange', label: 'Orange', cardClass: 'border-orange-100/80 bg-orange-50/35', accentClass: 'text-orange-900' },
];

export const LIST_CATEGORY_ICONS = [
  '📋', '🛒', '💡', '🚀', '✅', '🛍️', '✍️', '🏠', '💼', '🎯', '📚', '🛠️', '⭐', '📦',
] as const;

export type WorkspaceListCategory = {
  id: string;
  owner_id: string;
  title: string;
  icon: string;
  color: ListCategoryColor;
  position: number;
  created_at: string;
  updated_at: string;
};

export type WorkspaceList = {
  id: string;
  owner_id: string;
  category_id: string;
  title: string;
  is_favorite: boolean;
  archived: boolean;
  position: number;
  created_at: string;
  updated_at: string;
};

export type WorkspaceListItem = {
  id: string;
  owner_id: string;
  list_id: string;
  title: string;
  note: string | null;
  completed: boolean;
  position: number;
  created_at: string;
  updated_at: string;
};

export type ListWithProgress = WorkspaceList & {
  itemCount: number;
  completedCount: number;
};

export type CategoryWithLists = WorkspaceListCategory & {
  lists: ListWithProgress[];
};

const DEFAULT_CATEGORIES: {
  title: string;
  icon: string;
  color: ListCategoryColor;
}[] = [
  { title: 'Courses', icon: '🛒', color: 'amber' },
  { title: 'Idées', icon: '💡', color: 'violet' },
  { title: 'Projets', icon: '🚀', color: 'blue' },
  { title: 'À faire', icon: '✅', color: 'emerald' },
  { title: 'Achats', icon: '🛍️', color: 'orange' },
  { title: 'Contenus', icon: '✍️', color: 'sky' },
  { title: 'Personnel', icon: '🏠', color: 'rose' },
];

export function getColorMeta(color: ListCategoryColor) {
  return LIST_CATEGORY_COLORS.find((c) => c.id === color) ?? LIST_CATEGORY_COLORS[0]!;
}

/**
 * Seed initial optionnel — catégories modifiables / supprimables ensuite.
 */
export async function ensureDefaultListCategories(
  supabase: SupabaseClient,
  ownerId: string
): Promise<void> {
  const { count, error } = await supabase
    .from('workspace_list_categories')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  if ((count ?? 0) > 0) return;

  const rows = DEFAULT_CATEGORIES.map((c, i) => ({
    owner_id: ownerId,
    title: c.title,
    icon: c.icon,
    color: c.color,
    position: i,
  }));

  const { error: insertError } = await supabase
    .from('workspace_list_categories')
    .insert(rows);

  if (insertError) throw new Error(insertError.message);
}

export async function getMesListesBoard(
  supabase: SupabaseClient,
  ownerId: string,
  options: { query?: string; includeArchived?: boolean } = {}
): Promise<{
  categories: CategoryWithLists[];
  favorites: ListWithProgress[];
}> {
  await ensureDefaultListCategories(supabase, ownerId);

  const [{ data: cats, error: catError }, { data: lists, error: listError }, { data: items, error: itemError }] =
    await Promise.all([
      supabase
        .from('workspace_list_categories')
        .select('*')
        .eq('owner_id', ownerId)
        .order('position', { ascending: true }),
      supabase
        .from('workspace_lists')
        .select('*')
        .eq('owner_id', ownerId)
        .order('position', { ascending: true }),
      supabase
        .from('workspace_list_items')
        .select('id, list_id, title, note, completed')
        .eq('owner_id', ownerId),
    ]);

  if (catError) throw new Error(catError.message);
  if (listError) throw new Error(listError.message);
  if (itemError) throw new Error(itemError.message);

  const categories = (cats ?? []) as WorkspaceListCategory[];
  let listRows = (lists ?? []) as WorkspaceList[];
  if (!options.includeArchived) {
    listRows = listRows.filter((l) => !l.archived);
  }

  const itemsByList = new Map<string, { total: number; done: number; texts: string[] }>();
  for (const item of items ?? []) {
    const listId = item.list_id as string;
    const cur = itemsByList.get(listId) ?? { total: 0, done: 0, texts: [] };
    cur.total += 1;
    if (item.completed) cur.done += 1;
    cur.texts.push(
      `${item.title ?? ''} ${item.note ?? ''}`
    );
    itemsByList.set(listId, cur);
  }

  const withProgress = (list: WorkspaceList): ListWithProgress => {
    const stats = itemsByList.get(list.id) ?? { total: 0, done: 0, texts: [] };
    return {
      ...list,
      itemCount: stats.total,
      completedCount: stats.done,
    };
  };

  const query = (options.query ?? '').trim().toLowerCase();
  const catById = new Map(categories.map((c) => [c.id, c]));

  let filteredLists = listRows.map(withProgress);

  if (query) {
    filteredLists = filteredLists.filter((list) => {
      const cat = catById.get(list.category_id);
      const stats = itemsByList.get(list.id);
      const hay = [
        list.title,
        cat?.title ?? '',
        ...(stats?.texts ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(query);
    });
  }

  const listsByCat = new Map<string, ListWithProgress[]>();
  for (const list of filteredLists) {
    const arr = listsByCat.get(list.category_id) ?? [];
    arr.push(list);
    listsByCat.set(list.category_id, arr);
  }

  const categoriesWithLists: CategoryWithLists[] = categories
    .map((cat) => ({
      ...cat,
      lists: listsByCat.get(cat.id) ?? [],
    }))
    .filter((cat) => !query || cat.lists.length > 0 || cat.title.toLowerCase().includes(query));

  const favorites = filteredLists
    .filter((l) => l.is_favorite && !l.archived)
    .sort((a, b) => a.title.localeCompare(b.title, 'fr'));

  return { categories: categoriesWithLists, favorites };
}

export async function getListDetail(
  supabase: SupabaseClient,
  ownerId: string,
  listId: string
): Promise<{
  list: WorkspaceList;
  category: WorkspaceListCategory;
  items: WorkspaceListItem[];
  categories: WorkspaceListCategory[];
} | null> {
  const { data: list, error } = await supabase
    .from('workspace_lists')
    .select('*')
    .eq('id', listId)
    .eq('owner_id', ownerId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!list) return null;

  const [{ data: category, error: catError }, { data: items, error: itemError }, { data: categories, error: catsError }] =
    await Promise.all([
      supabase
        .from('workspace_list_categories')
        .select('*')
        .eq('id', (list as WorkspaceList).category_id)
        .eq('owner_id', ownerId)
        .maybeSingle(),
      supabase
        .from('workspace_list_items')
        .select('*')
        .eq('list_id', listId)
        .eq('owner_id', ownerId)
        .order('position', { ascending: true }),
      supabase
        .from('workspace_list_categories')
        .select('*')
        .eq('owner_id', ownerId)
        .order('position', { ascending: true }),
    ]);

  if (catError) throw new Error(catError.message);
  if (itemError) throw new Error(itemError.message);
  if (catsError) throw new Error(catsError.message);
  if (!category) return null;

  return {
    list: list as WorkspaceList,
    category: category as WorkspaceListCategory,
    items: (items ?? []) as WorkspaceListItem[],
    categories: (categories ?? []) as WorkspaceListCategory[],
  };
}
