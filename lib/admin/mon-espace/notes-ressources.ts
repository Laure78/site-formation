import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  WorkspaceNote,
  WorkspaceResource,
  WorkspaceResourceCategory,
} from '@/lib/admin/mon-espace/types';

export type NotesRessourcesSearchResult = {
  query: string;
  notes: WorkspaceNote[];
  resources: WorkspaceResource[];
};

function normalizeQuery(q: string | undefined | null): string {
  return (q ?? '').trim().slice(0, 120);
}

function matchesText(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export async function searchNotesAndResources(
  supabase: SupabaseClient,
  ownerId: string,
  rawQuery: string | undefined | null
): Promise<NotesRessourcesSearchResult> {
  const query = normalizeQuery(rawQuery);
  if (!query) {
    return { query: '', notes: [], resources: [] };
  }

  const [notesRes, resourcesRes] = await Promise.all([
    supabase
      .from('workspace_notes')
      .select('*')
      .eq('owner_id', ownerId)
      .order('pinned', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(200),
    supabase
      .from('workspace_resources')
      .select('*')
      .eq('owner_id', ownerId)
      .order('is_favorite', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(200),
  ]);

  if (notesRes.error) throw new Error(notesRes.error.message);
  if (resourcesRes.error) throw new Error(resourcesRes.error.message);

  const notes = ((notesRes.data ?? []) as WorkspaceNote[]).filter(
    (n) => matchesText(n.title, query) || matchesText(n.body, query)
  );
  const resources = ((resourcesRes.data ?? []) as WorkspaceResource[]).filter(
    (r) =>
      matchesText(r.title, query) ||
      matchesText(r.description, query) ||
      matchesText(r.link ?? '', query) ||
      matchesText(r.category, query) ||
      matchesText(r.kind, query)
  );

  return { query, notes, resources };
}

export async function getResources(
  supabase: SupabaseClient,
  ownerId: string,
  options: {
    category?: WorkspaceResourceCategory | 'all';
    favoritesOnly?: boolean;
    query?: string;
  } = {}
): Promise<WorkspaceResource[]> {
  let q = supabase
    .from('workspace_resources')
    .select('*')
    .eq('owner_id', ownerId)
    .order('is_favorite', { ascending: false })
    .order('updated_at', { ascending: false });

  if (options.category && options.category !== 'all') {
    q = q.eq('category', options.category);
  }
  if (options.favoritesOnly) {
    q = q.eq('is_favorite', true);
  }

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  let list = (data ?? []) as WorkspaceResource[];
  const query = normalizeQuery(options.query);
  if (query) {
    list = list.filter(
      (r) =>
        matchesText(r.title, query) ||
        matchesText(r.description, query) ||
        matchesText(r.link ?? '', query)
    );
  }
  return list;
}

export async function getNotesFiltered(
  supabase: SupabaseClient,
  ownerId: string,
  options: { query?: string; favoritesOnly?: boolean } = {}
): Promise<WorkspaceNote[]> {
  let q = supabase
    .from('workspace_notes')
    .select('*')
    .eq('owner_id', ownerId)
    .order('pinned', { ascending: false })
    .order('updated_at', { ascending: false });

  if (options.favoritesOnly) {
    q = q.eq('pinned', true);
  }

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  let list = (data ?? []) as WorkspaceNote[];
  const query = normalizeQuery(options.query);
  if (query) {
    list = list.filter(
      (n) => matchesText(n.title, query) || matchesText(n.body, query)
    );
  }
  return list;
}
