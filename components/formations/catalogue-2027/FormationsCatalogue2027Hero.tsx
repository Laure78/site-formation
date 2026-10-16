import Link from 'next/link';
import { CATALOGUE_2027_POSITIONNEMENT } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const FORMATIONS_IA_H1 = 'Formations IA pour les professionnels du BTP';
const FORMATIONS_IA_INTRO =
  'Choisissez votre formation selon vos besoins, votre niveau et les documents sur lesquels vous souhaitez travailler.';

export function FormationsCatalogue2027Hero() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <p className="ofc-badge bg-ofc-accent-soft text-ofc-accent">Catalogue · Formations IA BTP</p>
        <h1
          id="formations-catalogue-hero-h1"
          className="ofc-type-hero mt-5 max-w-3xl text-balance text-ofc-ink"
        >
          {FORMATIONS_IA_H1}
        </h1>
        <p className="ofc-type-lead mt-5 max-w-2xl text-ofc-ink-muted">{FORMATIONS_IA_INTRO}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted">
          {CATALOGUE_2027_POSITIONNEMENT.introductionMarque}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#formations-ia-disponibles"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Voir les formations disponibles
          </a>
          <Link
            href={LINKS.parcoursMetiers}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Choisir mon parcours métier
          </Link>
        </div>
      </div>
    </section>
  );
}
