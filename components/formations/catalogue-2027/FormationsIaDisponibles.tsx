import { Suspense } from 'react';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import { FormationsIaDisponiblesClient } from '@/components/formations/catalogue-2027/FormationsIaDisponiblesClient';

export function FormationsIaDisponibles() {
  const availableEntries = getCataloguePageCoreFormations();
  const upcomingEntries = getUpcomingCatalogueFormationEntries();

  return (
    <section
      id="catalogue-formations"
      className="scroll-mt-28"
      aria-labelledby="catalogue-formations-title"
    >
      <h2 id="catalogue-formations-title" className="sr-only">
        Recherche et catalogue des formations
      </h2>

      <Suspense fallback={<p className="mt-8 text-sm text-ofc-ink-muted">Chargement du catalogue…</p>}>
        <FormationsIaDisponiblesClient
          availableEntries={availableEntries}
          upcomingEntries={upcomingEntries}
        />
      </Suspense>
    </section>
  );
}
