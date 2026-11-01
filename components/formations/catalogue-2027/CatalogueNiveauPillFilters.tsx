'use client';

import type { FormationNiveau } from '@/data/formations';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { countVisibleFormationsIaCatalogue } from '@/lib/catalogue-formations-ia-filter';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import { useMemo } from 'react';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

function countForNiveau(niveau: FormationNiveau | undefined): number {
  const available = getCataloguePageCoreFormations();
  const upcoming = getUpcomingCatalogueFormationEntries();
  return countVisibleFormationsIaCatalogue(available, upcoming, { niveau });
}

export function CatalogueNiveauPillFilters({ filters, onChange }: Props) {
  const totalAll = useMemo(() => countForNiveau(undefined), []);

  const pills: { key: string; label: string; niveau?: FormationNiveau; count: number }[] = useMemo(
    () => [
      { key: 'all', label: 'Toutes les formations', count: totalAll },
      ...FORMATIONS_NIVEAUX_IA.map((n) => ({
        key: `n${n.niveau}`,
        label: n.sousTitre,
        niveau: n.niveau,
        count: countForNiveau(n.niveau),
      })),
    ],
    [totalAll],
  );

  const activeKey =
    filters.niveau == null
      ? 'all'
      : `n${filters.niveau}`;

  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
      role="group"
      aria-label="Filtrer par niveau"
    >
      {pills.map((pill) => {
        const isActive = pill.key === activeKey;
        return (
          <button
            key={pill.key}
            type="button"
            onClick={() => onChange({ niveau: pill.niveau ?? undefined })}
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
