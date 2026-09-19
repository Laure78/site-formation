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
  AgendaTaskItem,
  WorkspaceEvent,
} from '@/lib/mon-espace/agenda-types';

export type OrganisationAgendaAppointment = {
  id: string;
  start_at: string;
  end_at: string;
  client_name: string;
  type_rdv: string | null;
  status: string | null;
};

export type OrganisationAgendaFormation = {
  id: string;
  title: string;
  session_ends_on: string;
};

export type OrganisationAgendaDay = {
  dateKey: string;
  weekdayLabel: string;
  dayNumber: number;
  isToday: boolean;
  isWeekend: boolean;
  events: WorkspaceEvent[];
  tasks: AgendaTaskItem[];
  appointments: OrganisationAgendaAppointment[];
  formations: OrganisationAgendaFormation[];
};

export type OrganisationWeekAgenda = {
  weekStartKey: string;
  weekEndKey: string;
  days: OrganisationAgendaDay[];
  /** Inclure samedi/dimanche dans la grille desktop si activité le week-end. */
  showWeekend: boolean;
};

/**
 * Vue semaine Organisation : événements admin + tâches datées + RDV plateforme + sessions formation.
 * Les formations viennent de `courses.session_ends_on` (aucune duplication).
 */
export async function getOrganisationWeekAgenda(
  supabase: SupabaseClient,
  ownerId: string,
  weekAnchor: Date
): Promise<OrganisationWeekAgenda> {
  const weekStart = startOfWeekMonday(weekAnchor);
  const weekEnd = endOfWeekSunday(weekStart);
  const weekStartKey = toDateKey(weekStart);
  const weekEndKey = toDateKey(weekEnd);

  const [
    eventsResult,
    tasksResult,
    appointmentsResult,
    formationsResult,
  ] = await Promise.all([
    supabase
      .from('workspace_events')
      .select('*')
      .eq('owner_id', ownerId)
      .gte('start_at', weekStart.toISOString())
      .lt('start_at', addDays(weekEnd, 1).toISOString())
      .order('start_at', { ascending: true }),
    supabase
      .from('workspace_tasks')
      .select('id, title, due_date, done')
      .eq('owner_id', ownerId)
      .not('due_date', 'is', null)
      .gte('due_date', weekStartKey)
      .lte('due_date', weekEndKey)
      .order('due_date', { ascending: true }),
    supabase
      .from('appointments')
      .select('id, start_at, end_at, client_name, type_rdv, status')
      .gte('start_at', weekStart.toISOString())
      .lte('start_at', weekEnd.toISOString())
      .neq('status', 'annule')
      .order('start_at', { ascending: true }),
    supabase
      .from('courses')
      .select('id, title, session_ends_on')
      .not('session_ends_on', 'is', null)
      .eq('session_cancelled', false)
      .gte('session_ends_on', weekStartKey)
      .lte('session_ends_on', weekEndKey)
      .order('session_ends_on', { ascending: true }),
  ]);

  if (eventsResult.error) throw new Error(eventsResult.error.message);
  if (tasksResult.error) throw new Error(tasksResult.error.message);
  // RDV / formations : si erreur schéma, listes vides (pas de données fictives)
  const events = (eventsResult.data ?? []) as WorkspaceEvent[];
  const tasks = (tasksResult.data ?? []) as AgendaTaskItem[];
  const appointments = (appointmentsResult.error
    ? []
    : (appointmentsResult.data ?? [])) as OrganisationAgendaAppointment[];
  const formations = (
    formationsResult.error ? [] : formationsResult.data ?? []
  ).filter(
    (f): f is OrganisationAgendaFormation => Boolean(f.session_ends_on)
  );

  const today = new Date();

  const days: OrganisationAgendaDay[] = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dateKey = toDateKey(date);
    const weekday = date.getDay();
    return {
      dateKey,
      weekdayLabel: weekdayLabel(date),
      dayNumber: date.getDate(),
      isToday: isSameLocalDay(date, today),
      isWeekend: weekday === 0 || weekday === 6,
      events: events.filter((e) => toDateKey(new Date(e.start_at)) === dateKey),
      tasks: tasks.filter((t) => t.due_date === dateKey),
      appointments: appointments.filter(
        (a) => toDateKey(new Date(a.start_at)) === dateKey
      ),
      formations: formations.filter((f) => f.session_ends_on === dateKey),
    };
  });

  const weekendDays = days.filter((d) => d.isWeekend);
  const showWeekend = weekendDays.some(
    (d) =>
      d.events.length > 0 ||
      d.tasks.length > 0 ||
      d.appointments.length > 0 ||
      d.formations.length > 0 ||
      d.isToday
  );

  return {
    weekStartKey,
    weekEndKey,
    days,
    showWeekend,
  };
}
