import Link from 'next/link';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import {
  CATALOGUE_HERO_SUBTITLE,
  getCataloguePageHeroReassurance,
} from '@/lib/formations-catalogue-page-config';
import { LINKS } from '@/lib/internal-links';
import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { PHOTOS } from '@/lib/photos';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Hero catalogue — sans bandeau de stats (réassurance texte seule). */
export function FormationsCatalogueHero() {
  return (
    <MarketingLightHero
      eyebrow="Catalogue formations IA BTP"
      title={CATALOGUE_POSITIONNEMENT.h1}
      titleId="formations-catalogue-hero-h1"
      contentUpdatedAt={getPillarPageContentUpdatedAt('/formations')}
      description={
        <>
          {CATALOGUE_HERO_SUBTITLE}
          <span className="mt-3 block text-base font-medium text-slate-600">
            {getCataloguePageHeroReassurance()}
          </span>
        </>
      }
      middle={
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
      }
      heroVisual={PHOTOS.formationsCatalogueHero2026}
    />
  );
}
