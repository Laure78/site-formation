'use client';

import { useState } from 'react';
import { CheckSquare, Pencil } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';
import { formatTimeFr } from '@/lib/mon-espace/agenda-dates';
import {
  getCategoryMeta,
  type AgendaDayBucketClient,
  type WorkspaceEvent,
} from '@/lib/mon-espace/agenda-types';
import { AgendaWeekToolbar } from '@/components/mon-espace/agenda/AgendaWeekToolbar';
import { AgendaEventFormDialog } from '@/components/mon-espace/agenda/AgendaEventFormDialog';

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
  onAdd,
  onEditEvent,
}: {
  day: AgendaDayBucketClient;
  onAdd: (dateKey: string) => void;
  onEditEvent: (e: WorkspaceEvent) => void;
}) {
  return (
    <section
      className={`flex min-h-[11rem] flex-col rounded-xl border bg-white p-3 shadow-sm ${
        day.isToday ? 'border-[#377CF3]/50 ring-1 ring-[#377CF3]/20' : 'border-slate-200/90'
      }`}
      aria-label={`${day.weekdayLabel} ${day.dayNumber}`}
    >
      <header className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              day.isToday ? 'text-[#377CF3]' : 'text-slate-400'
            }`}
          >
            {day.weekdayLabel}
          </p>
          <p className="font-display text-lg font-bold text-slate-900">{day.dayNumber}</p>
        </div>
        <button
          type="button"
          onClick={() => onAdd(day.dateKey)}
          className="rounded-lg px-2 py-1 text-xs font-medium text-[#377CF3] hover:bg-[#EFF6FF]"
        >
          + Ajouter
        </button>
      </header>

      <div className="mt-2 flex flex-1 flex-col gap-1.5">
        {day.events.map((event) => (
          <EventCard key={event.id} event={event} onEdit={onEditEvent} />
        ))}

        {day.tasks.map((task) => (
          <Link
            key={task.id}
            href={LINKS.monEspaceTaches}
            className={`flex items-start gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-2.5 py-2 text-left text-sm ${
              task.done ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}
            title="Tâche avec échéance — voir Mes tâches"
          >
            <CheckSquare size={14} className="mt-0.5 shrink-0 text-slate-400" aria-hidden />
            <span className="min-w-0">
              <span className="block truncate font-medium">{task.title}</span>
              <span className="text-[10px] uppercase tracking-wide text-slate-400">Tâche</span>
            </span>
          </Link>
        ))}

        {day.events.length === 0 && day.tasks.length === 0 ? (
          <p className="py-4 text-center text-xs text-slate-400">Rien de prévu</p>
        ) : null}
      </div>
    </section>
  );
}

export function AgendaWeekBoard({
  weekStartKey,
  days,
}: {
  weekStartKey: string;
  days: AgendaDayBucketClient[];
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [defaultDateKey, setDefaultDateKey] = useState<string | undefined>();
  const [editing, setEditing] = useState<WorkspaceEvent | null>(null);
  /** Mobile : jour sélectionné (par défaut aujourd’hui ou premier jour) */
  const today = days.find((d) => d.isToday);
  const [mobileDayKey, setMobileDayKey] = useState(today?.dateKey ?? days[0]?.dateKey ?? '');

  const mobileDay = days.find((d) => d.dateKey === mobileDayKey) ?? days[0];

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
    <div className="space-y-4">
      <AgendaWeekToolbar weekStartIso={weekStartKey} onAdd={() => openCreate()} />

      {/* Desktop / tablette large : 7 colonnes */}
      <div className="hidden gap-2 md:grid md:grid-cols-7">
        {days.map((day) => (
          <DayColumn
            key={day.dateKey}
            day={day}
            onAdd={openCreate}
            onEditEvent={openEdit}
          />
        ))}
      </div>

      {/* Mobile : sélecteur de jour + carte unique */}
      <div className="space-y-3 md:hidden">
        <div
          className="flex gap-1 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Jours de la semaine"
        >
          {days.map((day) => {
            const active = day.dateKey === mobileDay?.dateKey;
            return (
              <button
                key={day.dateKey}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMobileDayKey(day.dateKey)}
                className={`flex min-w-[3.25rem] flex-col items-center rounded-xl px-2 py-2 text-center ${
                  active
                    ? 'bg-[#377CF3] text-white shadow-sm'
                    : day.isToday
                      ? 'bg-[#EFF6FF] text-[#377CF3]'
                      : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase opacity-80">
                  {day.weekdayLabel.slice(0, 3)}
                </span>
                <span className="font-display text-base font-bold">{day.dayNumber}</span>
              </button>
            );
          })}
        </div>

        {mobileDay ? (
          <DayColumn day={mobileDay} onAdd={openCreate} onEditEvent={openEdit} />
        ) : null}
      </div>

      <AgendaEventFormDialog
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
