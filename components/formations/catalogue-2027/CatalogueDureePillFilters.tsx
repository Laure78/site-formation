'use client';

import { useMemo } from 'react';
import { getFormationByCode, isFormationSurDevis } from '@/data/formations';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import {
  countVisibleFormationsIaCatalogue,
  filterComplementaryFormationsIaEntries,
} from '@/lib/catalogue-formations-ia-filter';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

function countForFilter(filters: FormationsCataloguePageFilters): number {
  const available = getCataloguePageCoreFormations();
  const upcoming = getUpcomingCatalogueFormationEntries();
  return countVisibleFormationsIaCatalogue(available, upcoming, filters);
}

export function CatalogueDureePillFilters({ filters, onChange }: Props) {
  const totalAll = useMemo(() => countForFilter({}), []);

  const surDemandeCount = useMemo(() => {
    const available = getCataloguePageCoreFormations();
    const coreSurDevis = available.filter((e) => {
      const f = getFormationByCode(e.ref);
      return f && isFormationSurDevis(f);
    }).length;
    const complementary = filterComplementaryFormationsIaEntries({ segment: 'sur-demande' }).length;
    return coreSurDevis + complementary;
  }, []);

  const pills = useMemo(
    () => [
      { key: 'all', label: 'Toutes', filters: {} as FormationsCataloguePageFilters, count: totalAll },
      {
        key: '4h',
        label: '4 h',
        filters: { duree: 4 as const },
        count: countForFilter({ duree: 4 }),
      },
      {
        key: '14h',
        label: '14 h',
        filters: { duree: 14 as const },
        count: countForFilter({ duree: 14 }),
      },
      {
        key: 'sur-demande',
        label: 'Sur demande',
        filters: { segment: 'sur-demande' as const },
        count: surDemandeCount,
      },
    ],
    [totalAll, surDemandeCount],
  );

  const activeKey = useMemo(() => {
    if (filters.segment === 'sur-demande') return 'sur-demande';
    if (filters.duree === 4) return '4h';
    if (filters.duree === 14) return '14h';
    return 'all';
  }, [filters.duree, filters.segment]);

  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
      role="group"
      aria-label="Filtrer par durée ou disponibilité"
    >
      {pills.map((pill) => {
        const isActive = pill.key === activeKey;
        return (
          <button
            key={pill.key}
            type="button"
            onClick={() =>
              onChange({
                duree: pill.filters.duree,
                segment: pill.filters.segment,
                niveau: undefined,
              })
            }
            className={`inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              isActive
                ? 'bg-[#377CF3] text-white shadow-sm'
                : 'border border-[#E2E8F0] bg-white text-[#101936] hover:border-[#377CF3]/40 hover:bg-[#F8FAFF]'
            }`}
            aria-pressed={isActive}
          >
            {pill.label}
            <span className={`ml-1.5 tabular-nums ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
              ({pill.count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
