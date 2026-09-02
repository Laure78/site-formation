import Link from 'next/link';
import { getCataloguePageHeroReassurance } from '@/lib/formations-catalogue-page-config';
import { LINKS } from '@/lib/internal-links';
import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Hero catalogue — promesse courte, double CTA. */
export function FormationsCatalogueHero() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 id="formations-catalogue-hero-h1" className={OFC_TYPE_HERO}>
          {CATALOGUE_POSITIONNEMENT.h1}
        </h1>
        <p className={`${OFC_TYPE_LEAD} mt-4 font-medium text-ofc-ink`}>
          Choisissez le parcours adapté à votre métier et à vos usages : devis, appels d&apos;offres,
          conduite de travaux, maîtrise d&apos;œuvre ou déploiement avancé de l&apos;IA.
        </p>
        <p className="mt-4 text-sm font-medium text-slate-600 md:text-base">
          {getCataloguePageHeroReassurance()}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#catalogue-besoin-selector"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Trouver ma formation
          </a>
          <Link
            href={LINKS.prendreRdv}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Être conseillé
          </Link>
        </div>
      </div>
    </section>
  );
}
