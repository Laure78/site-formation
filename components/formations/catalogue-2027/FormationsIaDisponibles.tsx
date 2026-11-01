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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 id="catalogue-formations-title" className="ofc-type-h2 text-ofc-ink">
            Sessions disponibles
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted">
            Comparez les programmes par niveau et par usage métier. Cliquez sur « Voir le programme »
            pour consulter le détail.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
        <Suspense fallback={null}>
          <FormationsCatalogueToolbar />
        </Suspense>
        <p className="mt-4 text-sm text-ofc-ink-muted">{CATALOGUE_GRILLE_MODALITES_LIGNE}</p>
      </div>

      <FormationsCatalogueGrid
        rows={rows}
        totalVisible={totalVisible}
        hasActiveFilters={hasActiveFilters}
      />
    </section>
  );
}
