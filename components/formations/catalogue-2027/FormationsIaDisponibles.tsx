import { Suspense } from 'react';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import { FormationsCatalogueFilteredGrid } from '@/components/formations/catalogue-2027/FormationsCatalogueFilteredGrid';
import { CatalogModulesLegacyAnchor } from '@/components/formations/catalogue-2027/CatalogModulesLegacyAnchor';

export function FormationsIaDisponibles() {
  const availableEntries = getCataloguePageCoreFormations();
  const upcomingEntries = getUpcomingCatalogueFormationEntries();

  return (
    <section
      id="catalogue-formations"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="catalogue-formations-title"
    >
      <CatalogModulesLegacyAnchor />
      <h2 id="catalogue-formations-title" className="sr-only">
        Catalogue des formations et modules
      </h2>

      <Suspense fallback={null}>
        <FormationsCatalogueFilteredGrid
          availableEntries={availableEntries}
          upcomingEntries={upcomingEntries}
        />
      </Suspense>
    </section>
  );
}
