import Link from 'next/link';
import { getModuleByCode } from '@/data/catalogue-2027';
import {
  moduleCatalogueHref,
  moduleHasProgrammePage,
} from '@/lib/catalogue-2027/module-link';
import type { AccueilParcoursEtapeCard } from '@/lib/accueil-offre-catalogue';

type Props = {
  etapes: readonly AccueilParcoursEtapeCard[];
  /** Titre de la liste — défaut « Modules de formation » */
  heading?: string;
  className?: string;
};

/**
 * Liste ordonnée des modules d’un parcours métier — source `getAccueilParcoursOffre` / catalogue 2027.
 */
export function ParcoursFormationModulesList({
  etapes,
  heading = 'Modules de formation',
  className = '',
}: Props) {
  if (etapes.length === 0) return null;

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-ofc-ink">{heading}</p>
      <ol className="mt-2 space-y-2">
        {etapes.map((etape, index) => {
          const mod = getModuleByCode(etape.moduleCode);
          const duree = mod?.dureeHeures;
          const href = moduleCatalogueHref(etape.moduleCode);
          const hasProgramme = moduleHasProgrammePage(etape.moduleCode);
          const label = `${etape.moduleCode} — ${etape.titre}`;

          return (
            <li key={`${etape.moduleCode}-${index}`} className="text-sm leading-snug">
              <span className="font-medium tabular-nums text-ofc-ink-muted">{index + 1}.</span>{' '}
              {hasProgramme ? (
                <Link
                  href={href}
                  className="font-medium text-ofc-ink hover:text-ofc-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                >
                  {label}
                </Link>
              ) : (
                <Link
                  href={href}
                  className="text-ofc-ink-muted hover:text-ofc-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                >
                  {label}
                </Link>
              )}
              {duree ? (
                <span className="text-ofc-ink-muted"> · {duree} h</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
