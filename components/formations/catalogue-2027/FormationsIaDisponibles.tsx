import { Suspense } from 'react';
import {
  CATALOGUE_GRILLE_MODALITES_LIGNE,
  getCataloguePageCoreFormations,
} from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import { FormationsCatalogueGrid } from '@/components/formations/catalogue-2027/FormationsCatalogueGrid';
import { FormationsCatalogueToolbar } from '@/components/formations/catalogue-2027/FormationsCatalogueToolbar';
import { CatalogModulesLegacyAnchor } from '@/components/formations/catalogue-2027/CatalogModulesLegacyAnchor';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';
import {
  buildFormationsCatalogueGridRows,
  countFormationsCatalogueGridResults,
} from '@/lib/catalogue-page-grid';
import { formationsIaHasActiveFilters } from '@/lib/catalogue-formations-ia-filter';

type Props = {
  filters: FormationsCataloguePageFilters;
};

export function FormationsIaDisponibles({ filters }: Props) {
  const availableEntries = getCataloguePageCoreFormations();
  const upcomingEntries = getUpcomingCatalogueFormationEntries();
  const rows = buildFormationsCatalogueGridRows(availableEntries, upcomingEntries, filters);
  const totalVisible = countFormationsCatalogueGridResults(
    availableEntries,
    upcomingEntries,
    filters,
  );
  const hasActiveFilters = formationsIaHasActiveFilters(filters);

  return (
    <section
      id="catalogue-formations"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="catalogue-formations-title"
    >
      <CatalogModulesLegacyAnchor />

      <div className="text-center">
        <h2 id="catalogue-formations-title" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
          Choisissez votre formation
        </h2>
        <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Des parcours pratiques adaptés à votre niveau et à votre métier.
        </p>
      </div>

      <div className="mt-8">
        <Suspense fallback={null}>
          <FormationsCatalogueToolbar />
        </Suspense>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500 sm:text-sm">{CATALOGUE_GRILLE_MODALITES_LIGNE}</p>

      <FormationsCatalogueGrid
        rows={rows}
        totalVisible={totalVisible}
        hasActiveFilters={hasActiveFilters}
      />
    </section>
  );
}
