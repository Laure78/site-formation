import { Fragment } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import {
  ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES,
  ACCUEIL_METHODE_ACCOMPAGNEMENT_LEAD,
} from '@/lib/accueil-config';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';

/** Méthode en 4 étapes — flux horizontal avec flèches (maquette). */
export function AccueilMethodeAccompagnementSection() {
  const etapes = ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES;

  return (
    <AccueilMaquetteSection tone="muted" aria-labelledby="accueil-methode-title">
      <AccueilMaquetteHeading
        id="accueil-methode-title"
        title="Notre méthode, en 4 étapes"
        description={ACCUEIL_METHODE_ACCOMPAGNEMENT_LEAD}
      />

      <ol className="accueil-maquette__grid flex list-none flex-col gap-1 lg:flex-row lg:items-stretch lg:gap-0">
        {etapes.map((etape, index) => (
          <Fragment key={etape.n}>
            {index > 0 ? (
              <li
                className="flex list-none items-center justify-center py-0.5 lg:w-6 lg:shrink-0 lg:py-0"
                aria-hidden
              >
                <ArrowDown className="h-4 w-4 text-[#C5C5C5] lg:hidden" strokeWidth={2} />
                <ArrowRight className="hidden h-4 w-4 text-[#C5C5C5] lg:block" strokeWidth={2} />
              </li>
            ) : null}
            <li className="min-w-0 flex-1 list-none">
              <article className="flex h-full items-start gap-3 rounded-xl border border-ofc-border bg-white p-3.5 shadow-sm lg:min-h-[5.5rem]">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#377CF3] font-display text-sm font-bold text-white"
                  aria-hidden
                >
                  {etape.n}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-display text-sm font-bold leading-snug text-[#101936]">{etape.titre}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ofc-ink-muted">{etape.detail}</p>
                </div>
              </article>
            </li>
          </Fragment>
        ))}
      </ol>
    </AccueilMaquetteSection>
  );
}
