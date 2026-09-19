'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Pencil,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { formatTimeFr } from '@/lib/mon-espace/agenda-dates';
import {
  getCategoryMeta,
  type WorkspaceEvent,
} from '@/lib/mon-espace/agenda-types';
import type { OrganisationAgendaDay } from '@/lib/admin/mon-espace/agenda-week';
import { OrganisationAgendaToolbar } from '@/components/admin/mon-espace/agenda/OrganisationAgendaToolbar';
import { OrganisationEventFormDialog } from '@/components/admin/mon-espace/agenda/OrganisationEventFormDialog';
import { DAY_HEADER_TONES } from '@/components/admin/mon-espace/ui';

function dayItemCount(day: OrganisationAgendaDay): number {
  return (
    day.events.length +
    day.tasks.length +
    day.appointments.length +
    day.formations.length
  );
}

function EventCard({
  event,
  onEdit,
}: {
  event: WorkspaceEvent;
  onEdit: (e: WorkspaceEvent) => void;
}) {
  const meta = getCategoryMeta(event.category);
  return (
    <button
      type="button"
      onClick={() => onEdit(event)}
      className={`group w-full rounded-lg border px-2.5 py-2 text-left transition-colors hover:shadow-sm ${meta.chipClass}`}
    >
      <div className="flex items-start gap-2">
        <span className={`mt-1 h-8 w-1 shrink-0 rounded-full ${meta.barClass}`} aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-snug">{event.title}</p>
          <p className="mt-0.5 text-[11px] opacity-80">
            {formatTimeFr(event.start_at)} – {formatTimeFr(event.end_at)}
          </p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide opacity-70">
            {meta.label}
          </p>
        </div>
        <Pencil
          size={12}
          className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
          aria-hidden
        />
      </div>
    </button>
  );
}

function DayColumn({
  day,
  dayIndex,
  onAdd,
  onEditEvent,
  compact,
}: {
  day: OrganisationAgendaDay;
  dayIndex: number;
  onAdd: (dateKey: string) => void;
  onEditEvent: (e: WorkspaceEvent) => void;
  compact?: boolean;
}) {
  const headerTone = DAY_HEADER_TONES[dayIndex % DAY_HEADER_TONES.length];

  return (
    <section
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
        day.isToday ? 'ring-2 ring-[#377CF3]/20' : ''
      } ${compact ? 'min-h-0' : 'min-h-[14rem]'}`}
      aria-label={`${day.weekdayLabel} ${day.dayNumber}`}
    >
      <header
        className={`flex items-center justify-between gap-2 px-3 py-2.5 ${headerTone}`}
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
            {day.weekdayLabel}
          </p>
          <p className="font-display text-lg font-bold">{day.dayNumber}</p>
        </div>
        <button
          type="button"
          onClick={() => onAdd(day.dateKey)}
          className="rounded-lg bg-white/70 px-2 py-1 text-xs font-semibold text-[#377CF3] hover:bg-white"
        >
          +
        </button>
      </header>

      <div className="mt-0 flex flex-1 flex-col gap-1.5 p-2.5">
        {day.formations.map((f) => (
          <Link
            key={`f-${f.id}`}
            href={`/admin/formations/${f.id}`}
            className="flex items-start gap-2 rounded-lg border border-sky-100 bg-sky-50/70 px-2.5 py-2 text-sm text-sky-900 hover:underline"
          >
            <BookOpen size={14} className="mt-0.5 shrink-0 text-sky-500" aria-hidden />
            <span className="min-w-0">
              <span className="block truncate font-medium">{f.title}</span>
              <span className="text-[10px] uppercase tracking-wide text-sky-600/80">
                Formation
              </span>
            </span>
          </Link>
        ))}

        {day.appointments.map((a) => (
          <Link
            key={`a-${a.id}`}
            href="/admin/disponibilites"
            className="flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50/60 px-2.5 py-2 text-sm text-amber-950"
          >
            <CalendarDays size={14} className="mt-0.5 shrink-0 text-amber-600" aria-hidden />
            <span className="min-w-0">
              <span className="block truncate font-medium">
                {formatTimeFr(a.start_at)} — {a.client_name}
              </span>
              <span className="text-[10px] uppercase tracking-wide text-amber-700/70">
                {a.type_rdv ? `RDV · ${a.type_rdv}` : 'Rendez-vous'}
              </span>
            </span>
          </Link>
        ))}

        {day.events.map((event) => (
          <EventCard key={event.id} event={event} onEdit={onEditEvent} />
        ))}

        {day.tasks.map((task) => (
          <Link
            key={`t-${task.id}`}
            href={LINKS.adminMonEspaceTaches}
            className={`flex items-start gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-2.5 py-2 text-sm ${
              task.done ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}
            title="Tâche avec échéance"
          >
            <CheckSquare size={14} className="mt-0.5 shrink-0 text-slate-400" aria-hidden />
            <span className="min-w-0">
              <span className="block truncate font-medium">{task.title}</span>
              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                Échéance / tâche
              </span>
            </span>
          </Link>
        ))}

        {dayItemCount(day) === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400">Rien de prévu</p>
        ) : null}
      </div>
    </section>
  );
}

export function OrganisationAgendaWeekBoard({
  weekStartKey,
  days,
  showWeekend,
}: {
  weekStartKey: string;
  days: OrganisationAgendaDay[];
  showWeekend: boolean;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [defaultDateKey, setDefaultDateKey] = useState<string | undefined>();
  const [editing, setEditing] = useState<WorkspaceEvent | null>(null);

  const desktopDays = useMemo(
    () => (showWeekend ? days : days.filter((d) => !d.isWeekend)),
    [days, showWeekend]
  );

  /** Mobile : tous les jours utiles (week-end seulement s’il y a du contenu ou aujourd’hui). */
  const mobileDays = useMemo(
    () =>
      days.filter(
        (d) => !d.isWeekend || dayItemCount(d) > 0 || d.isToday || showWeekend
      ),
    [days, showWeekend]
  );

  function openCreate(dateKey?: string) {
    setEditing(null);
    setDefaultDateKey(dateKey);
    setFormOpen(true);
  }

  function openEdit(event: WorkspaceEvent) {
    setEditing(event);
    setDefaultDateKey(undefined);
    setFormOpen(true);
  }

  return (
    <div className="space-y-5">
      <OrganisationAgendaToolbar weekStartKey={weekStartKey} onAdd={() => openCreate()} />

      {/* Desktop : vraie grille hebdomadaire */}
      <div
        className={`hidden gap-2.5 lg:grid ${
          showWeekend ? 'lg:grid-cols-7' : 'lg:grid-cols-5'
        }`}
      >
        {desktopDays.map((day, i) => (
          <DayColumn
            key={day.dateKey}
            day={day}
            dayIndex={i}
            onAdd={openCreate}
            onEditEvent={openEdit}
          />
        ))}
      </div>

      {/* Tablette : 2–3 colonnes */}
      <div className="hidden gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {desktopDays.map((day, i) => (
          <DayColumn
            key={`md-${day.dateKey}`}
            day={day}
            dayIndex={i}
            onAdd={openCreate}
            onEditEvent={openEdit}
          />
        ))}
      </div>

      {/* Mobile : pile verticale (pas 7 colonnes compressées) */}
      <div className="space-y-3 sm:hidden">
        {mobileDays.map((day, i) => (
          <DayColumn
            key={`m-${day.dateKey}`}
            day={day}
            dayIndex={i}
            onAdd={openCreate}
            onEditEvent={openEdit}
            compact
          />
        ))}
      </div>

      <OrganisationEventFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        defaultDateKey={defaultDateKey}
        event={editing}
      />
    </div>
  );
}
