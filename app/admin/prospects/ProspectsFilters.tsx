'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const SECTEURS = [
  { value: '', label: 'Tous les secteurs' },
  { value: 'btp', label: 'BTP' },
  { value: 'automobile', label: 'Automobile' },
  { value: 'industrie', label: 'Industrie' },
  { value: 'service', label: 'Service' },
  { value: 'autre', label: 'Autre' },
];

export function ProspectsFilters({
  currentSecteur,
  currentScoreMin,
  currentScoreMax,
}: {
  currentSecteur?: string;
  currentScoreMin?: string;
  currentScoreMax?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(searchParams.toString());
      if (value) p.set(key, value);
      else p.delete(key);
      router.push(`/admin/prospects?${p.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <select
        value={currentSecteur ?? ''}
        onChange={(e) => update('secteur', e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        {SECTEURS.map((s) => (
          <option key={s.value || 'all'} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600">Score min</span>
        <input
          type="number"
          min={0}
          max={100}
          value={currentScoreMin ?? ''}
          onChange={(e) => update('score_min', e.target.value)}
          placeholder="0"
          className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600">Score max</span>
        <input
          type="number"
          min={0}
          max={100}
          value={currentScoreMax ?? ''}
          onChange={(e) => update('score_max', e.target.value)}
          placeholder="100"
          className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
