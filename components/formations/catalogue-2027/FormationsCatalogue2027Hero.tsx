import Link from 'next/link';
import { CATALOGUE_2027_POSITIONNEMENT } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export function FormationsCatalogue2027Hero() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <p className="ofc-badge bg-ofc-accent-soft text-ofc-accent">Catalogue 2027 · Parcours métiers BTP</p>
        <h1
          id="formations-catalogue-hero-h1"
          className="ofc-type-hero mt-5 max-w-[22ch] text-balance text-ofc-ink"
        >
          {CATALOGUE_2027_POSITIONNEMENT.h1}
        </h1>
        <p className="ofc-type-lead mt-5 max-w-2xl text-ofc-ink-muted">
          {CATALOGUE_2027_POSITIONNEMENT.intro}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted">
          {CATALOGUE_2027_POSITIONNEMENT.introductionMarque}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#trouver-mon-parcours"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            {CATALOGUE_2027_POSITIONNEMENT.ctaParcours}
          </a>
          <Link
            href={LINKS.prendreRdv}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            {CATALOGUE_2027_POSITIONNEMENT.ctaEquipe}
          </Link>
        </div>
      </div>
    </section>
  );
}
