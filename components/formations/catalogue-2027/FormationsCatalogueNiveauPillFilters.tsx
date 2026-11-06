'use client';

import { useMemo } from 'react';
import type { FormationNiveau } from '@/data/formations';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import { countVisibleFormationsIaCatalogue } from '@/lib/catalogue-formations-ia-filter';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

type PillKey = 'all' | FormationNiveau;

function countForFilter(filters: FormationsCataloguePageFilters): number {
  const available = getCataloguePageCoreFormations();
  const upcoming = getUpcomingCatalogueFormationEntries();
  return countVisibleFormationsIaCatalogue(available, upcoming, filters);
}

function countForMaquetteNiveau(pill: Exclude<PillKey, 'all'>): number {
  const available = getCataloguePageCoreFormations();
  const upcoming = getUpcomingCatalogueFormationEntries();
  const f: FormationsCataloguePageFilters =
    pill === 1 ? { niveau: 1 } : pill === 2 ? { niveau: 2 } : { niveau: 3 };
  return countVisibleFormationsIaCatalogue(available, upcoming, f);
}

export function FormationsCatalogueNiveauPillFilters({ filters, onChange }: Props) {
  const totalAll = useMemo(() => countForFilter({}), []);

  const pills = useMemo(
    () => [
      { key: 'all' as const, label: 'Toutes', filters: {} as FormationsCataloguePageFilters, count: totalAll },
      {
        key: 1 as const,
        label: 'Débutant',
        filters: { niveau: 1 as const } satisfies FormationsCataloguePageFilters,
        count: countForMaquetteNiveau(1),
      },
      {
        key: 2 as const,
        label: 'Avancé',
        filters: { niveau: 2 as const } satisfies FormationsCataloguePageFilters,
        count: countForMaquetteNiveau(2),
      },
      {
        key: 3 as const,
        label: 'Approfondi',
        filters: { niveau: 3 as const } satisfies FormationsCataloguePageFilters,
        count: countForMaquetteNiveau(3),
      },
    ],
    [totalAll],
  );

  const activeKey: PillKey = useMemo(() => {
    if (filters.niveau === 1) return 1;
    if (filters.niveau === 2) return 2;
    if (filters.niveau === 3) return 3;
    return 'all';
  }, [filters.niveau]);

  return (
    <div
      className="flex max-w-full flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Filtrer par niveau pédagogique"
    >
      {pills.map((pill) => {
        const isActive =
          pill.key === 'all' ? activeKey === 'all' : activeKey === pill.key;
        return (
          <button
            key={pill.key === 'all' ? 'all' : String(pill.key)}
            type="button"
            onClick={() =>
              onChange({
                niveau: pill.filters.niveau,
                duree: undefined,
                segment: undefined,
              })
            }
            className={`inline-flex shrink-0 min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              isActive
                ? 'border-[#377CF3] bg-[#377CF3] text-white shadow-sm'
                : 'border-[#E2E8F0] bg-white text-[#101936] hover:border-[#377CF3]/40 hover:bg-[#F8FAFF]'
            }`}
            aria-pressed={isActive}
          >
            {pill.label}
            <span
              className={`ml-1.5 tabular-nums ${isActive ? 'text-white/90' : 'text-slate-500'}`}
              aria-hidden
            >
              ({pill.count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
