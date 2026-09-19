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

export function OrganisationAgendaToolbar({
  weekStartKey,
  onAdd,
}: {
  weekStartKey: string;
  onAdd: () => void;
}) {
  const router = useRouter();
  const weekStart = startOfWeekMonday(new Date(`${weekStartKey}T12:00:00`));

  function goTo(date: Date) {
    const monday = startOfWeekMonday(date);
    router.push(`${LINKS.adminMonEspaceAgenda}?semaine=${toDateKey(monday)}`);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <button
          type="button"
          onClick={() => goTo(addDays(weekStart, -7))}
          className="px-3 py-2.5 text-slate-500 hover:bg-slate-50"
          aria-label="Semaine précédente"
        >
          <ChevronLeft size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => goTo(new Date())}
          className="border-x border-slate-100 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Aujourd&apos;hui
        </button>
        <button
          type="button"
          onClick={() => goTo(addDays(weekStart, 7))}
          className="px-3 py-2.5 text-slate-500 hover:bg-slate-50"
          aria-label="Semaine suivante"
        >
          <ChevronRight size={18} strokeWidth={1.75} />
        </button>
      </div>

      <p className="font-display text-[15px] font-semibold text-slate-800 lg:flex-1 lg:px-4">
        {formatWeekRangeLabel(weekStart)}
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/15 hover:bg-[#2d66d6]"
      >
        <Plus size={16} strokeWidth={2} aria-hidden />
        Nouvel événement
      </button>
    </div>
  );
}
