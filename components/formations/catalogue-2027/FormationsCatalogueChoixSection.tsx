import Link from 'next/link';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { buildFormationsIaNiveauHref } from '@/lib/catalogue-filter-url';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Bloc d’orientation en tête du catalogue `/formations`. */
export function FormationsCatalogueChoixSection() {
  return (
    <section
      id="comparer-niveaux"
      className="scroll-mt-24 border-b border-[#E2E8F0] bg-[#F8FAFC] py-12 md:py-14"
      aria-labelledby="formations-choix-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2 id="formations-choix-title" className="ofc-type-h2 text-ofc-ink">
          Quelle formation IA BTP choisir ?
        </h2>
        <p className="mt-3 max-w-2xl text-ofc-ink-muted">
          Orientez-vous par niveau de maîtrise de l’IA ou par parcours métier. Les prérequis de
          chaque programme restent prioritaires.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#formations-niveaux-cartes"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Je choisis mon niveau
          </a>
          <Link
            href={LINKS.parcoursMetiers}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Je choisis mon métier
          </Link>
        </div>

        <div
          id="formations-niveaux-cartes"
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {FORMATIONS_NIVEAUX_IA.map((n) => (
            <article
              key={n.niveau}
              className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                Niveau {n.niveau}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-ofc-ink">
                {n.sousTitre}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
                <span className="font-medium text-ofc-ink">Public — </span>
                {n.publicCible}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink">
                <span className="font-medium">Objectif — </span>
                {n.objectif}
              </p>
              <div className="mt-auto pt-6">
                <Link
                  href={buildFormationsIaNiveauHref(n.niveau)}
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 w-full items-center justify-center px-4 py-2.5 text-sm font-semibold`}
                >
                  Voir les formations
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
