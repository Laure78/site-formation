import type { SupabaseClient } from '@supabase/supabase-js';
import {
  formatWeekRangeLabel,
  monthTitle,
  nextMonthDate,
  WEEKDAYS_FR,
} from '@/lib/admin/mon-espace/dates';
import type {
  ColumnWithTasks,
  WorkspaceColumn,
  WorkspaceFavorite,
  WorkspaceHeaderTone,
  WorkspaceNote,
  WorkspaceTask,
} from '@/lib/admin/mon-espace/types';

const MONTH_TONES: WorkspaceHeaderTone[] = ['blue', 'yellow'];
const WEEK_TONES: WorkspaceHeaderTone[] = ['green', 'gray', 'blue', 'rose', 'violet'];

/**
 * Crée la structure d'agenda par défaut (2 mois + 5 jours) si l'utilisateur n'a aucune colonne.
 */
export async function ensureAgendaDefaults(
  supabase: SupabaseClient,
  ownerId: string
): Promise<void> {
  const { count, error } = await supabase
    .from('workspace_columns')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  if ((count ?? 0) > 0) return;

  const now = new Date();
  const next = nextMonthDate(now);

  const monthRows = [
    {
      owner_id: ownerId,
      title: monthTitle(now),
      section: 'months' as const,
      header_tone: MONTH_TONES[0],
      sort_order: 0,
    },
    {
      owner_id: ownerId,
      title: monthTitle(next),
      section: 'months' as const,
      header_tone: MONTH_TONES[1],
      sort_order: 1,
    },
  ];

  const weekRows = WEEKDAYS_FR.map((title, i) => ({
    owner_id: ownerId,
    title,
    section: 'week' as const,
    header_tone: WEEK_TONES[i] ?? 'gray',
    sort_order: i,
  }));

  const { error: insertError } = await supabase
    .from('workspace_columns')
    .insert([...monthRows, ...weekRows]);

  if (insertError) throw new Error(insertError.message);
}

export async function getAgendaBoard(
  supabase: SupabaseClient,
  ownerId: string
): Promise<{
  monthColumns: ColumnWithTasks[];
  weekColumns: ColumnWithTasks[];
  weekLabel: string;
  openTaskCount: number;
}> {
  await ensureAgendaDefaults(supabase, ownerId);

  const { data: columns, error: colError } = await supabase
    .from('workspace_columns')
    .select('*')
    .eq('owner_id', ownerId)
    .order('sort_order', { ascending: true });

  if (colError) throw new Error(colError.message);

  const { data: tasks, error: taskError } = await supabase
    .from('workspace_tasks')
    .select('*')
    .eq('owner_id', ownerId)
    .order('sort_order', { ascending: true });

  if (taskError) throw new Error(taskError.message);

  const cols = (columns ?? []) as WorkspaceColumn[];
  const allTasks = (tasks ?? []) as WorkspaceTask[];

  const byColumn = (columnId: string) =>
    allTasks.filter((t) => t.column_id === columnId);

  const withTasks = (list: WorkspaceColumn[]): ColumnWithTasks[] =>
    list.map((c) => ({ ...c, tasks: byColumn(c.id) }));

  const monthColumns = withTasks(cols.filter((c) => c.section === 'months'));
  const weekColumns = withTasks(cols.filter((c) => c.section === 'week'));
  const openTaskCount = allTasks.filter((t) => !t.done).length;

  return {
    monthColumns,
    weekColumns,
    weekLabel: formatWeekRangeLabel(),
    openTaskCount,
  };
}

export async function getNotes(
  supabase: SupabaseClient,
  ownerId: string
): Promise<WorkspaceNote[]> {
  const { data, error } = await supabase
    .from('workspace_notes')
    .select('*')
    .eq('owner_id', ownerId)
    .order('pinned', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as WorkspaceNote[];
}

export async function getOrCreatePrimaryNote(
  supabase: SupabaseClient,
  ownerId: string
): Promise<WorkspaceNote> {
  const notes = await getNotes(supabase, ownerId);
  if (notes[0]) return notes[0];

  const { data, error } = await supabase
    .from('workspace_notes')
    .insert({
      owner_id: ownerId,
      title: 'Notes',
      body: '',
      pinned: true,
      sort_order: 0,
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as WorkspaceNote;
}

export async function getFavorites(
  supabase: SupabaseClient,
  ownerId: string
): Promise<WorkspaceFavorite[]> {
  const { data, error } = await supabase
    .from('workspace_favorites')
    .select('*')
    .eq('owner_id', ownerId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as WorkspaceFavorite[];
}

export async function getBacklogTasks(
  supabase: SupabaseClient,
  ownerId: string
): Promise<WorkspaceTask[]> {
  const { data, error } = await supabase
    .from('workspace_tasks')
    .select('*')
    .eq('owner_id', ownerId)
    .is('column_id', null)
    .order('done', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as WorkspaceTask[];
}

export async function getAllTasks(
  supabase: SupabaseClient,
  ownerId: string
): Promise<WorkspaceTask[]> {
  const { data, error } = await supabase
    .from('workspace_tasks')
    .select('*')
    .eq('owner_id', ownerId)
    .order('done', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as WorkspaceTask[];
}
