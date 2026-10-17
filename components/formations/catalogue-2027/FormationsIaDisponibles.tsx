import { Suspense } from 'react';
import {
  getFormationsCatalogue,
  sortFormationsCatalogue,
} from '@/lib/formations-catalogue-display';
import { FormationsIaDisponiblesClient } from '@/components/formations/catalogue-2027/FormationsIaDisponiblesClient';

export function FormationsIaDisponibles() {
  const entries = sortFormationsCatalogue(getFormationsCatalogue());

  return (
    <section
      id="catalogue-formations"
      className="mt-10 scroll-mt-28 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="catalogue-formations-title"
    >
      <h2 id="catalogue-formations-title" className="ofc-type-h2 text-ofc-ink">
        Catalogue des formations
      </h2>
      <p className="mt-3 max-w-3xl text-ofc-ink-muted">
        Programmes Qualiopi en premier — présentiel en Île-de-France. Filtrez par niveau, thématique
        ou métier. Les prérequis de chaque fiche restent prioritaires.
      </p>

      <Suspense fallback={<p className="mt-8 text-sm text-ofc-ink-muted">Chargement du catalogue…</p>}>
        <FormationsIaDisponiblesClient entries={entries} />
      </Suspense>
    </section>
  );
}
