import Link from 'next/link';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { TrainingDeliveryInfo } from '@/components/formations/TrainingDeliveryInfo';
import {
  CATALOGUE_HERO_SUBTITLE,
  getCataloguePageHeroReassurance,
} from '@/lib/formations-catalogue-page-config';
import { BUSINESS_DELIVERY } from '@/lib/business-delivery';
import { LINKS } from '@/lib/internal-links';
import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { PHOTOS } from '@/lib/photos';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Hero catalogue — modalités visibles dès le fold. */
export function FormationsCatalogueHero() {
  return (
    <MarketingLightHero
      eyebrow="Catalogue formations IA BTP"
      title={CATALOGUE_POSITIONNEMENT.h1}
      titleId="formations-catalogue-hero-h1"
      contentUpdatedAt={getPillarPageContentUpdatedAt('/formations')}
      description={
        <>
          <span className="block font-semibold text-slate-800">
            Des formations IA BTP 100 % en présentiel en Île-de-France
          </span>
          <span className="mt-2 block">
            J’interviens auprès des entreprises et professionnels du BTP dans le cadre de formations
            en groupe, en intra-entreprise ou en inter-entreprises. Les formations sont réalisées
            exclusivement en présentiel en Île-de-France.
          </span>
          <span className="mt-3 block text-base text-slate-600">{CATALOGUE_HERO_SUBTITLE}</span>
          <span className="mt-3 block text-base font-medium text-slate-600">
            {getCataloguePageHeroReassurance()}
          </span>
        </>
      }
      middle={
        <div className="flex flex-col gap-4">
          <TrainingDeliveryInfo showBody={false} />
          <dl className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-900">Lieu</dt>
              <dd>{BUSINESS_DELIVERY.location} uniquement</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Format</dt>
              <dd>{BUSINESS_DELIVERY.mode}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Public</dt>
              <dd>Groupes / équipes</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Organisation</dt>
              <dd>Intra ou inter-entreprises</dd>
            </div>
          </dl>
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
              Organiser une formation en Île-de-France
            </Link>
          </div>
        </div>
      }
      heroVisual={PHOTOS.formationsCatalogueHero2026}
    />
  );
}
