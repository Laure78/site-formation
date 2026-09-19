import type { SupabaseClient } from '@supabase/supabase-js';
import {
  addDays,
  endOfWeekSunday,
  isSameLocalDay,
  startOfWeekMonday,
  toDateKey,
  weekdayLabel,
} from '@/lib/mon-espace/agenda-dates';
import type {
  AgendaDayBucket,
  AgendaTaskItem,
  WorkspaceEvent,
} from '@/lib/mon-espace/agenda-types';

export async function getWeekAgenda(
  supabase: SupabaseClient,
  ownerId: string,
  weekAnchor: Date
): Promise<{
  weekStart: Date;
  weekEnd: Date;
  days: AgendaDayBucket[];
}> {
  const weekStart = startOfWeekMonday(weekAnchor);
  const weekEnd = endOfWeekSunday(weekStart);

  const [{ data: events, error: evError }, { data: tasks, error: taskError }] =
    await Promise.all([
      supabase
        .from('workspace_events')
        .select('*')
        .eq('owner_id', ownerId)
        .lt('start_at', weekEnd.toISOString())
        .gte('start_at', weekStart.toISOString())
        .order('start_at', { ascending: true }),
      supabase
        .from('workspace_tasks')
        .select('id, title, due_date, done')
        .eq('owner_id', ownerId)
        .not('due_date', 'is', null)
        .gte('due_date', toDateKey(weekStart))
        .lte('due_date', toDateKey(weekEnd))
        .order('due_date', { ascending: true }),
    ]);

  if (evError) throw new Error(evError.message);
  if (taskError) throw new Error(taskError.message);

  const eventList = (events ?? []) as WorkspaceEvent[];
  const taskList = (tasks ?? []) as AgendaTaskItem[];
  const today = new Date();

  const days: AgendaDayBucket[] = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dateKey = toDateKey(date);
    return {
      dateKey,
      date,
      weekdayLabel: weekdayLabel(date),
      dayNumber: date.getDate(),
      isToday: isSameLocalDay(date, today),
      events: eventList.filter((e) => toDateKey(new Date(e.start_at)) === dateKey),
      tasks: taskList.filter((t) => t.due_date === dateKey),
    };
  });

  return { weekStart, weekEnd, days };
}

export async function getEventById(
  supabase: SupabaseClient,
  ownerId: string,
  eventId: string
): Promise<WorkspaceEvent | null> {
  const { data, error } = await supabase
    .from('workspace_events')
    .select('*')
    .eq('id', eventId)
    .eq('owner_id', ownerId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as WorkspaceEvent | null) ?? null;
}
