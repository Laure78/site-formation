'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import {
  AGENDA_STATUS_TONE,
  addMonths,
  buildMonthGrid,
  dateKeyFromParts,
  parseDateKey,
  sessionsOnDate,
  type FormateurAgendaSession,
} from '@/lib/extranet-formateurs/agenda';
import { MISSION_STATUS_LABELS } from '@/lib/extranet-formateurs/phase2-types';
import { LINKS } from '@/lib/internal-links';

const WEEKDAYS = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'] as const;

const MONTH_FORMAT = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

type FormateurAgendaCalendarProps = {
  sessions: FormateurAgendaSession[];
  /** Vue compacte pour le tableau de bord */
  compact?: boolean;
};

function todayKey(): string {
  const t = new Date();
  return dateKeyFromParts(t.getFullYear(), t.getMonth(), t.getDate());
}

export function FormateurAgendaCalendar({ sessions, compact = false }: FormateurAgendaCalendarProps) {
  const today = todayKey();
  const initial = parseDateKey(today);
  const [cursor, setCursor] = useState({ year: initial.year, month: initial.month });
  const [selected, setSelected] = useState<string | null>(today);

  const weeks = useMemo(
    () => buildMonthGrid(cursor.year, cursor.month),
    [cursor.year, cursor.month]
  );

  const monthLabel = MONTH_FORMAT.format(new Date(cursor.year, cursor.month, 1));

  const selectedSessions = selected ? sessionsOnDate(sessions, selected) : [];

  const upcomingInMonth = useMemo(() => {
    return sessions.filter((s) => {
      const end = s.endsOn ?? s.startsOn;
      const monthStart = dateKeyFromParts(cursor.year, cursor.month, 1);
      const lastDay = new Date(cursor.year, cursor.month + 1, 0).getDate();
      const monthEnd = dateKeyFromParts(cursor.year, cursor.month, lastDay);
      return s.startsOn <= monthEnd && end >= monthStart && s.status !== 'cancelled';
    });
  }, [sessions, cursor.year, cursor.month]);

  const goPrev = () => setCursor((c) => addMonths(c.year, c.month, -1));
  const goNext = () => setCursor((c) => addMonths(c.year, c.month, 1));
  const goToday = () => {
    const t = parseDateKey(todayKey());
    setCursor({ year: t.year, month: t.month });
    setSelected(todayKey());
  };

  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className={`font-display font-bold text-slate-900 ${compact ? 'text-lg' : 'text-xl'}`}>
          {compact ? 'Agenda des sessions' : 'Agenda'}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrev}
            className="flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="Mois précédent"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={goToday}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Aujourd&apos;hui
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="Mois suivant"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      <p className="text-center font-display text-base font-semibold capitalize text-slate-800 md:text-lg">
        {monthLabel}
      </p>

      <div
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        role="grid"
        aria-label={`Calendrier ${monthLabel}`}
      >
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/80">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="px-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs"
            >
              {d}
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-slate-100 last:border-b-0">
            {week.map((dateKey, di) => {
              if (!dateKey) {
                return (
                  <div
                    key={`empty-${wi}-${di}`}
                    className="min-h-[4.5rem] border-r border-slate-100 bg-slate-50/40 last:border-r-0 sm:min-h-[5.5rem]"
                    aria-hidden
                  />
                );
              }
              const dayNum = parseDateKey(dateKey).day;
              const daySessions = sessionsOnDate(sessions, dateKey).filter((s) => s.status !== 'cancelled');
              const isToday = dateKey === today;
              const isSelected = dateKey === selected;

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelected(dateKey)}
                  className={`relative flex min-h-[4.5rem] flex-col border-r border-slate-100 p-1.5 text-left transition-colors last:border-r-0 sm:min-h-[5.5rem] sm:p-2 ${
                    isSelected ? 'bg-[#EFF6FF] ring-1 ring-inset ring-[#377CF3]/40' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isToday ? 'bg-[#377CF3] text-white' : 'text-slate-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  <ul className="mt-1 hidden flex-1 flex-col gap-0.5 sm:block">
                    {daySessions.slice(0, compact ? 1 : 2).map((s) => (
                      <li
                        key={s.id}
                        className={`truncate rounded border px-1 py-0.5 text-[10px] font-medium leading-tight ${AGENDA_STATUS_TONE[s.status]}`}
                        title={s.title}
                      >
                        {s.title}
                      </li>
                    ))}
                    {daySessions.length > (compact ? 1 : 2) ? (
                      <li className="text-[10px] font-medium text-slate-500">
                        +{daySessions.length - (compact ? 1 : 2)}
                      </li>
                    ) : null}
                  </ul>
                  {daySessions.length > 0 ? (
                    <span
                      className="absolute bottom-1.5 right-1.5 flex gap-0.5 sm:hidden"
                      aria-hidden
                    >
                      {daySessions.slice(0, 3).map((s) => (
                        <span key={s.id} className="h-1.5 w-1.5 rounded-full bg-[#377CF3]" />
                      ))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <section
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        aria-labelledby={compact ? 'agenda-detail-compact' : 'agenda-detail'}
      >
        <h3
          id={compact ? 'agenda-detail-compact' : 'agenda-detail'}
          className="text-sm font-semibold text-slate-900"
        >
          {selected
            ? new Date(selected + 'T12:00:00').toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Sélectionnez un jour'}
        </h3>
        {selectedSessions.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">Aucune session planifiée ce jour-là.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {selectedSessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`${LINKS.espaceFormateursInterventions}/${s.id}`}
                  className={`block rounded-lg border px-3 py-2.5 transition-colors hover:border-[#377CF3]/50 ${AGENDA_STATUS_TONE[s.status]}`}
                >
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wide opacity-80">
                    {MISSION_STATUS_LABELS[s.status]}
                    {s.modality ? ` · ${s.modality}` : ''}
                  </p>
                  {s.scheduleText ? (
                    <p className="mt-1 text-sm opacity-90">{s.scheduleText}</p>
                  ) : null}
                  {(s.locationCity || s.locationName || s.clientCompanyName) && (
                    <p className="mt-1 flex items-start gap-1 text-sm opacity-90">
                      <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden />
                      <span>
                        {[s.locationName, s.locationCity, s.clientCompanyName]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {!compact && upcomingInMonth.length > 0 ? (
        <p className="text-center text-sm text-slate-500">
          {upcomingInMonth.length} session{upcomingInMonth.length > 1 ? 's' : ''} sur ce mois
        </p>
      ) : null}
    </div>
  );
}