'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { LINKS } from '@/lib/internal-links';
import {
  PILOTAGE_STATUS_META,
  type SessionPilotageStatus,
} from '@/lib/admin/mon-espace/suivi-administratif';

type CourseOption = { id: string; title: string };

export function SuiviFiltersBar({
  courses,
  counts,
}: {
  courses: CourseOption[];
  counts: Record<SessionPilotageStatus, number>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (!value || value === 'all') next.delete(key);
        else next.set(key, value);
      }
      const qs = next.toString();
      startTransition(() => {
        router.push(
          qs
            ? `${LINKS.adminMonEspaceSuivi}?${qs}`
            : LINKS.adminMonEspaceSuivi
        );
      });
    },
    [router, searchParams]
  );

  const status = (searchParams.get('statut') ?? 'all') as SessionPilotageStatus | 'all';
  const courseId = searchParams.get('formation') ?? '';
  const dateFrom = searchParams.get('du') ?? '';
  const dateTo = searchParams.get('au') ?? '';
  const includeUndated = searchParams.get('sans_date') === '1';

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {(Object.keys(PILOTAGE_STATUS_META) as SessionPilotageStatus[]).map((key) => {
          const meta = PILOTAGE_STATUS_META[key];
          const active = status === key;
          return (
            <button
              key={key}
              type="button"
              disabled={pending}
              onClick={() => update({ statut: active ? null : key })}
              className={`rounded-2xl border px-4 py-3.5 text-left transition-all ${
                active
                  ? `${meta.tone} shadow-[0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-[#377CF3]/25`
                  : 'border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-slate-300'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {meta.label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900">
                {counts[key]}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:flex-row lg:flex-wrap lg:items-end">
        <label className="block min-w-[12rem] flex-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Formation / session
          <select
            value={courseId}
            disabled={pending}
            onChange={(e) => update({ formation: e.target.value || null })}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
          >
            <option value="">Toutes les sessions datées</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Du
          <input
            type="date"
            value={dateFrom}
            disabled={pending}
            onChange={(e) => update({ du: e.target.value || null })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Au
          <input
            type="date"
            value={dateTo}
            disabled={pending}
            onChange={(e) => update({ au: e.target.value || null })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          />
        </label>

        <label className="flex items-center gap-2 pb-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={includeUndated}
            disabled={pending}
            onChange={(e) =>
              update({ sans_date: e.target.checked ? '1' : null })
            }
            className="rounded border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
          />
          Inclure sans date de session
        </label>

        {(status !== 'all' || courseId || dateFrom || dateTo || includeUndated) && (
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(() => router.push(LINKS.adminMonEspaceSuivi))
            }
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}
