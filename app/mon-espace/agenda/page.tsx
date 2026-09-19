import { CalendarDays } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { MonEspacePageHeader } from '@/components/mon-espace/MonEspaceUi';
import { AgendaWeekBoard } from '@/components/mon-espace/agenda/AgendaWeekBoard';
import { getWeekAgenda } from '@/lib/mon-espace/agenda-queries';
import {
  addDays,
  isSameLocalDay,
  parseDateKey,
  startOfWeekMonday,
  toDateKey,
  weekdayLabel,
} from '@/lib/mon-espace/agenda-dates';
import type { AgendaDayBucketClient } from '@/lib/mon-espace/agenda-types';

function emptyWeekDays(anchor: Date): AgendaDayBucketClient[] {
  const weekStart = startOfWeekMonday(anchor);
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      dateKey: toDateKey(date),
      weekdayLabel: weekdayLabel(date),
      dayNumber: date.getDate(),
      isToday: isSameLocalDay(date, today),
      events: [],
      tasks: [],
    };
  });
}

export default async function MonEspaceAgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ semaine?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  let anchor = new Date();
  if (params.semaine && /^\d{4}-\d{2}-\d{2}$/.test(params.semaine)) {
    anchor = parseDateKey(params.semaine);
  }

  let migrationMissing = false;
  let weekStartKey = toDateKey(startOfWeekMonday(anchor));
  let clientDays = emptyWeekDays(anchor);

  try {
    const { weekStart, days } = await getWeekAgenda(supabase, user.id, anchor);
    weekStartKey = toDateKey(startOfWeekMonday(weekStart));
    clientDays = days.map(({ dateKey, weekdayLabel, dayNumber, isToday, events, tasks }) => ({
      dateKey,
      weekdayLabel,
      dayNumber,
      isToday,
      events,
      tasks,
    }));
  } catch {
    migrationMissing = true;
  }

  return (
    <div className="space-y-6">
      <MonEspacePageHeader
        title="Agenda"
        description="Vue semaine : événements et tâches datées. Ajoutez, modifiez ou supprimez vos rendez-vous en un clic."
        icon={CalendarDays}
      />

      {migrationMissing ? (
        <div
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Table événements absente. Appliquez{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            supabase/migrations/049_workspace_events.sql
          </code>{' '}
          dans le SQL Editor Supabase, puis rechargez.
        </div>
      ) : null}

      <AgendaWeekBoard weekStartKey={weekStartKey} days={clientDays} />
    </div>
  );
}
