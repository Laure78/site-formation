import { ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES } from '@/lib/accueil-config';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';

/** Méthode en 4 étapes — timeline compacte. */
export function AccueilMethodeAccompagnementSection() {
  return (
    <AccueilMaquetteSection tone="muted" aria-labelledby="accueil-methode-title">
      <AccueilMaquetteHeading
        id="accueil-methode-title"
        title="Notre méthode, en 4 étapes"
        description="Un accompagnement simple et efficace, de vos besoins à la mise en pratique."
      />

      <ol className="accueil-maquette__grid grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2.5">
        {ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES.map((etape) => (
          <li key={etape.n} className="list-none">
            <article className="flex h-full flex-col rounded-xl border border-ofc-border bg-white p-4 shadow-sm">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#377CF3] font-display text-xs font-bold text-white"
                aria-hidden
              >
                {etape.n}
              </span>
              <h3 className="mt-2.5 font-display text-sm font-bold text-[#101936]">{etape.titre}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ofc-ink-muted">{etape.detail}</p>
            </article>
          </li>
        ))}
      </ol>
    </AccueilMaquetteSection>
  );
}
