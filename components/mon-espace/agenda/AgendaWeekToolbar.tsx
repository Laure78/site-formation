'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import {
  addDays,
  formatWeekRangeLabel,
  startOfWeekMonday,
  toDateKey,
} from '@/lib/mon-espace/agenda-dates';
import type { AgendaViewMode } from '@/lib/mon-espace/agenda-types';

export function AgendaWeekToolbar({
  weekStartIso,
  onAdd,
}: {
  /** Monday of the displayed week as YYYY-MM-DD */
  weekStartIso: string;
  onAdd: () => void;
}) {
  const router = useRouter();
  const weekStart = startOfWeekMonday(new Date(`${weekStartIso}T12:00:00`));
  const viewMode: AgendaViewMode = 'week';

  function goTo(date: Date) {
    const monday = startOfWeekMonday(date);
    router.push(`${LINKS.monEspaceAgenda}?semaine=${toDateKey(monday)}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm"
          role="group"
          aria-label="Vue agenda"
        >
          <span className="rounded-md bg-[#377CF3] px-3 py-1.5 text-xs font-semibold text-white">
            Semaine
          </span>
          <span
            className="cursor-not-allowed px-3 py-1.5 text-xs font-medium text-slate-400"
            title="Bientôt disponible"
          >
            Mois
          </span>
          <span
            className="cursor-not-allowed px-3 py-1.5 text-xs font-medium text-slate-400"
            title="Bientôt disponible"
          >
            Jour
          </span>
        </div>
        <span className="sr-only">Mode actuel : {viewMode}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => goTo(addDays(weekStart, -7))}
            className="rounded-l-xl px-2.5 py-2 text-slate-600 hover:bg-slate-50"
            aria-label="Semaine précédente"
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => goTo(new Date())}
            className="border-x border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Aujourd&apos;hui
          </button>
          <button
            type="button"
            onClick={() => goTo(addDays(weekStart, 7))}
            className="rounded-r-xl px-2.5 py-2 text-slate-600 hover:bg-slate-50"
            aria-label="Semaine suivante"
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>

        <p className="min-w-0 flex-1 text-sm font-medium text-slate-800 sm:flex-none sm:px-2">
          {formatWeekRangeLabel(weekStart)}
        </p>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#377CF3] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2d66d6]"
        >
          <Plus size={16} strokeWidth={2} aria-hidden />
          Ajouter
        </button>
      </div>
    </div>
  );
}
