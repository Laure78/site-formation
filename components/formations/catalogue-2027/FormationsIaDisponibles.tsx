import { Suspense } from 'react';
import {
  FORMATIONS_IA_NIVEAU_SECTIONS,
  getFormationsIaDisponiblesByNiveau,
} from '@/lib/formations-ia-disponibles-niveaux';
import { FormationsIaDisponiblesClient } from '@/components/formations/catalogue-2027/FormationsIaDisponiblesClient';

export function FormationsIaDisponibles() {
  const byNiveau = getFormationsIaDisponiblesByNiveau();

  return (
    <section
      id="formations-ia-disponibles"
      className="mt-16 scroll-mt-28 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="ia-disponibles-title"
    >
      <span id="skills-metiers-btp" className="sr-only" />

      <h2 id="ia-disponibles-title" className="ofc-type-h2 text-ofc-ink">
        Formations IA disponibles
      </h2>
      <p className="mt-3 max-w-3xl text-ofc-ink-muted">
        Programmes Qualiopi ouverts aux inscriptions — présentiel en Île-de-France. Filtrez par
        niveau ou consultez l’ensemble du catalogue modules pour les parcours 2027.
      </p>

      <Suspense fallback={<p className="mt-8 text-sm text-ofc-ink-muted">Chargement du catalogue…</p>}>
        <FormationsIaDisponiblesClient
          sections={FORMATIONS_IA_NIVEAU_SECTIONS}
          byNiveau={byNiveau}
        />
      </Suspense>
    </section>
  );
}
