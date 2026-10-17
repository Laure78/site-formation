import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  ACCUEIL_OFFRE_SECTION_ID,
  getAccueilFormationsParNiveau,
  getAccueilParcoursOffre,
} from '@/lib/accueil-offre-catalogue';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import { AccueilFormationsNiveauFilter } from '@/components/landing/accueil/AccueilFormationsNiveauFilter';

/**
 * Cœur visuel de l’accueil — parcours métiers + formations publiées.
 * Données synchronisées avec `/formations`.
 */
export function AccueilOffreCatalogueSection() {
  const parcours = getAccueilParcoursOffre({ featuredOnly: true });
  const groupesFormations = getAccueilFormationsParNiveau();

  return (
    <Section
      id={ACCUEIL_OFFRE_SECTION_ID}
      tone="canvas"
      className="scroll-mt-24"
      aria-labelledby="accueil-offre-catalogue-title"
    >
      {/* Alias d’ancres legacy */}
      <span id="offre-formations-parcours" className="sr-only" />
      <span id="offre-formations" className="sr-only" />
      <SectionHeader
        align="center"
        titleId="accueil-offre-catalogue-title"
        title="Nos formations et parcours pour le BTP"
        description="Une formation pour répondre à un besoin précis. Un parcours pour progresser étape par étape."
        className="mx-auto max-w-2xl"
      />

      {/* ——— Parcours ——— */}
      <div className="mt-14 md:mt-16" id="accueil-parcours">
        <h3 className="font-display text-xl font-bold tracking-tight text-ofc-ink md:text-2xl">
          <Link href={LINKS.parcoursMetiers} className="hover:text-ofc-accent hover:underline">
            Parcours métiers
          </Link>
        </h3>
        <p className="mt-2 max-w-2xl text-base leading-[1.65] text-ofc-ink-muted">
          Un parcours regroupe des modules dans un ordre pédagogique.{' '}
          <Link href={LINKS.parcoursMetiers} className="font-medium text-ofc-accent hover:underline">
            Choisir selon mon métier
          </Link>
          .
        </p>

        <ul className="mt-8 grid list-none gap-6 lg:grid-cols-2 lg:gap-7">
          {parcours.map((p) => (
            <li
              key={p.id}
              id={`accueil-parcours-${p.id}`}
              className="min-w-0 scroll-mt-28"
            >
              <article
                className={`${OFC_CARD} flex h-full flex-col border-ofc-border-strong/40 p-6 sm:p-8`}
              >
                <p className="text-xs font-semibold tracking-wide text-ofc-accent">
                  Parcours
                </p>
                <h4 className={`${OFC_TYPE_H3} mt-2 text-pretty`}>{p.titre}</h4>
                <p className="mt-3 text-base leading-[1.65] text-ofc-ink">
                  {p.objectif}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
                  <span className="font-semibold text-ofc-ink">Public — </span>
                  {p.publicCible}
                </p>
                <p className="mt-2 text-sm font-medium text-ofc-ink-muted">
                  {p.dureeLabel ? <>Durée : {p.dureeLabel} · </> : null}
                  {p.disponibiliteLabel}
                </p>

                <div className="mt-auto pt-7">
                  <Link
                    href={p.href}
                    className={`${OFC_CTA_PRIMARY} group inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 text-sm sm:w-auto`}
                  >
                    Découvrir le parcours
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link
            href={LINKS.parcoursMetiers}
            className="text-sm font-semibold text-ofc-accent hover:underline"
          >
            Voir tous les parcours métiers
          </Link>
        </p>
      </div>

      {/* ——— Formations à la carte ——— */}
      <div
        className="mt-16 border-t border-ofc-border pt-14 md:mt-20 md:pt-16"
        id="accueil-formations"
      >
        <h3 className="font-display text-xl font-bold tracking-tight text-ofc-ink md:text-2xl">
          Formations à la carte
        </h3>
        <p className="mt-2 max-w-2xl text-base leading-[1.65] text-ofc-ink-muted">
          Toutes les formations publiées — présentiel en Île-de-France.
        </p>

        <AccueilFormationsNiveauFilter groupes={groupesFormations} />
      </div>

      <div className="mt-14 flex flex-col items-center gap-3 border-t border-ofc-border pt-10 sm:flex-row sm:flex-wrap sm:justify-center md:mt-16">
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold`}
        >
          Consulter le catalogue complet
        </Link>
        <Link
          href={`${LINKS.prendreRdv}?src=accueil-offre`}
          data-cta="rdv"
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold`}
        >
          {CTA_RDV_LABEL}
        </Link>
      </div>
    </Section>
  );
}
