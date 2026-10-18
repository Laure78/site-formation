import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ParcoursFormationModulesList } from '@/components/formations/ParcoursFormationModulesList';
import { getAccueilParcoursOffre } from '@/lib/accueil-offre-catalogue';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function FormationsCatalogueParcoursCompact() {
  const parcours = getAccueilParcoursOffre();

  return (
    <section
      id="trouver-mon-parcours"
      className="mt-16 scroll-mt-28 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="catalogue-parcours-compact-title"
    >
      <span id="catalogue-niveaux" className="sr-only" />
      <span id="catalogue-besoin-selector" className="sr-only" />
      <span id="catalogue-positionnement" className="sr-only" />
      <span id="catalogue-gammes" className="sr-only" />

      <h2 id="catalogue-parcours-compact-title" className="ofc-type-h2 text-ofc-ink">
        Construisez votre parcours de formation
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        Combinez plusieurs formations selon votre métier, votre niveau et les besoins de votre
        entreprise. Chaque parcours enchaîne des modules métier et, le cas échéant, des sessions IA
        du catalogue Qualiopi.
      </p>

      <ul className="mt-8 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
        {parcours.map((p) => (
          <li key={p.id} id={`parcours-card-${p.id}`} className="min-w-0 scroll-mt-28">
            <article className={`${OFC_CARD} flex h-full flex-col p-5 sm:p-6`}>
              <h3 className="font-display text-lg font-bold leading-snug text-ofc-ink">{p.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{p.benefice}</p>
              {p.dureeLabel ? (
                <p className="mt-3 text-xs font-medium text-ofc-ink-muted">
                  {p.dureeLabel} · {p.disponibiliteLabel}
                </p>
              ) : (
                <p className="mt-3 text-xs font-medium text-ofc-ink-muted">{p.disponibiliteLabel}</p>
              )}

              <ParcoursFormationModulesList etapes={p.etapes} className="mt-4 flex-1" />

              <div className="mt-5 pt-2">
                <Link
                  href={p.href}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 w-full items-center justify-center gap-2 px-4 py-2.5 text-sm sm:w-auto`}
                >
                  Voir le parcours
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.parcoursMetiers}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold`}
        >
          Découvrir les parcours métiers
        </Link>
        <Link
          href={`${LINKS.formations}#catalogue-modules`}
          className="inline-flex min-h-11 items-center justify-center px-4 py-3 text-sm font-semibold text-ofc-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          Voir tous les modules
        </Link>
      </div>
    </section>
  );
}
