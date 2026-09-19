import type { SupabaseClient } from '@supabase/supabase-js';
import { startOfIsoWeek, WEEKDAYS_FR } from '@/lib/admin/mon-espace/dates';
import type { WorkspaceFavorite, WorkspaceTask } from '@/lib/admin/mon-espace/types';

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

export type OrganisationAppointment = {
  id: string;
  start_at: string;
  end_at: string;
  client_name: string;
  status: string | null;
  type_rdv: string | null;
};

export type OrganisationFormationSession = {
  id: string;
  title: string;
  slug: string | null;
  session_ends_on: string;
};

export type OrganisationWeekDay = {
  key: string;
  label: string;
  dayNumber: number;
  isToday: boolean;
  tasks: WorkspaceTask[];
  appointments: OrganisationAppointment[];
};

export type OrganisationDashboardData = {
  todayKey: string;
  todayTasks: WorkspaceTask[];
  todayAppointments: OrganisationAppointment[];
  todayFormations: OrganisationFormationSession[];
  todayDeadlines: WorkspaceTask[];
  priorities: WorkspaceTask[];
  weekDays: OrganisationWeekDay[];
  upcomingFormations: OrganisationFormationSession[];
  favorites: WorkspaceFavorite[];
  openTaskCount: number;
};

/**
 * Agrège données réelles pour le dashboard Organisation.
 * Ne fabrique aucune donnée fictive : listes vides si rien en base.
 */
export async function getOrganisationDashboard(
  supabase: SupabaseClient,
  ownerId: string
): Promise<OrganisationDashboardData> {
  const now = new Date();
  const todayKey = toDateKey(now);
  const weekStart = startOfIsoWeek(now);
  const weekEnd = endOfDay(addDays(weekStart, 4)); // vendredi
  const dayStart = startOfDay(now);
  const dayEnd = endOfDay(now);

  const [
    tasksResult,
    appointmentsTodayResult,
    appointmentsWeekResult,
    formationsResult,
    favoritesResult,
  ] = await Promise.all([
    supabase
      .from('workspace_tasks')
      .select('*')
      .eq('owner_id', ownerId)
      .eq('done', false)
      .order('sort_order', { ascending: true }),
    supabase
      .from('appointments')
      .select('id, start_at, end_at, client_name, status, type_rdv')
      .gte('start_at', dayStart.toISOString())
      .lte('start_at', dayEnd.toISOString())
      .neq('status', 'annule')
      .order('start_at', { ascending: true }),
    supabase
      .from('appointments')
      .select('id, start_at, end_at, client_name, status, type_rdv')
      .gte('start_at', weekStart.toISOString())
      .lte('start_at', weekEnd.toISOString())
      .neq('status', 'annule')
      .order('start_at', { ascending: true }),
    supabase
      .from('courses')
      .select('id, title, slug, session_ends_on')
      .not('session_ends_on', 'is', null)
      .eq('session_cancelled', false)
      .gte('session_ends_on', todayKey)
      .order('session_ends_on', { ascending: true })
      .limit(12),
    supabase
      .from('workspace_favorites')
      .select('*')
      .eq('owner_id', ownerId)
      .order('sort_order', { ascending: true })
      .limit(12),
  ]);

  const tasks = tasksResult.error ? [] : ((tasksResult.data ?? []) as WorkspaceTask[]);
  const appointmentsToday = appointmentsTodayResult.error
    ? []
    : ((appointmentsTodayResult.data ?? []) as OrganisationAppointment[]);
  const appointmentsWeek = appointmentsWeekResult.error
    ? []
    : ((appointmentsWeekResult.data ?? []) as OrganisationAppointment[]);
  const formations = (formationsResult.error ? [] : formationsResult.data ?? []).filter(
    (f): f is OrganisationFormationSession => Boolean(f.session_ends_on)
  );
  const favorites = favoritesResult.error
    ? []
    : ((favoritesResult.data ?? []) as WorkspaceFavorite[]);

  const todayTasks = tasks.filter((t) => t.due_date === todayKey);
  const todayDeadlines = todayTasks.filter((t) => t.emphasis || Boolean(t.due_date));
  const priorities = tasks.filter((t) => t.emphasis).slice(0, 8);
  const todayFormations = formations.filter((f) => f.session_ends_on === todayKey);

  const weekDays: OrganisationWeekDay[] = WEEKDAYS_FR.map((label, i) => {
    const date = addDays(weekStart, i);
    const key = toDateKey(date);
    return {
      key,
      label,
      dayNumber: date.getDate(),
      isToday: key === todayKey,
      tasks: tasks.filter((t) => t.due_date === key),
      appointments: appointmentsWeek.filter(
        (a) => toDateKey(new Date(a.start_at)) === key
      ),
    };
  });

  return {
    todayKey,
    todayTasks,
    todayAppointments: appointmentsToday,
    todayFormations,
    todayDeadlines,
    priorities,
    weekDays,
    upcomingFormations: formations,
    favorites,
    openTaskCount: tasks.length,
  };
}
