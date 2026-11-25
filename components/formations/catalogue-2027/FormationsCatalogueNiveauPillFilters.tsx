'use client';

import { useMemo } from 'react';
import type { FormationNiveau } from '@/data/formations';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import { countVisibleFormationsIaCatalogue } from '@/lib/catalogue-formations-ia-filter';
import {
  CATALOGUE_FILTRE_TOUS_NIVEAUX_LABEL,
  CATALOGUE_NIVEAU_PEDAGOGIE_DESCRIPTION,
  catalogueNiveauFiltreTitre,
} from '@/lib/catalogue-niveau-filter-copy';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

type PillKey = 'all' | FormationNiveau;

function countWithFilters(
  base: FormationsCataloguePageFilters,
  niveau?: FormationNiveau,
): number {
  const available = getCataloguePageCoreFormations();
  const upcoming = getUpcomingCatalogueFormationEntries();
  const merged: FormationsCataloguePageFilters = { ...base };
  if (niveau) {
    merged.niveau = niveau;
  } else {
    delete merged.niveau;
  }
  return countVisibleFormationsIaCatalogue(available, upcoming, merged);
}

export function FormationsCatalogueNiveauPillFilters({ filters, onChange }: Props) {
  const baseFilters = useMemo((): FormationsCataloguePageFilters => {
    const rest = { ...filters };
    delete rest.niveau;
    return rest;
  }, [filters]);

  const pills = useMemo(() => {
    const allCount = countWithFilters(baseFilters);
    return [
      {
        key: 'all' as const,
        title: CATALOGUE_FILTRE_TOUS_NIVEAUX_LABEL,
        description: CATALOGUE_NIVEAU_PEDAGOGIE_DESCRIPTION.all,
        count: allCount,
        patch: { niveau: undefined } satisfies Partial<FormationsCataloguePageFilters>,
      },
      ...([1, 2, 3] as const).map((niveau) => ({
        key: niveau,
        title: catalogueNiveauFiltreTitre(niveau),
        description: CATALOGUE_NIVEAU_PEDAGOGIE_DESCRIPTION[niveau],
        count: countWithFilters(baseFilters, niveau),
        patch: { niveau } satisfies Partial<FormationsCataloguePageFilters>,
      })),
    ];
  }, [baseFilters]);

  const activeKey: PillKey = filters.niveau ?? 'all';

  return (
    <div
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      role="group"
      aria-label="Filtrer par niveau pédagogique"
    >
      {pills.map((pill) => {
        const isActive = pill.key === activeKey;
        return (
          <button
            key={pill.key === 'all' ? 'all' : String(pill.key)}
            type="button"
            onClick={() => onChange(pill.patch)}
            aria-pressed={isActive}
            className={`flex min-h-[5.25rem] flex-col rounded-xl border px-3.5 py-3 text-left transition-[border-color,background-color,box-shadow] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              isActive
                ? 'border-[#377CF3] bg-[#F0F6FF] shadow-sm ring-1 ring-[#377CF3]/25'
                : 'border-[#E2E8F0] bg-white hover:border-[#377CF3]/35 hover:bg-[#F8FAFF]'
            }`}
          >
            <span className="flex items-start justify-between gap-2">
              <span className="text-sm font-bold leading-snug text-[#101936]">{pill.title}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                  isActive ? 'bg-[#377CF3] text-white' : 'bg-slate-100 text-slate-600'
                }`}
                aria-hidden
              >
                {pill.count}
              </span>
            </span>
            <span className="mt-1.5 text-xs leading-relaxed text-slate-600">{pill.description}</span>
          </button>
        );
      })}
    </div>
  );
}