import Link from 'next/link';
import { Award, GraduationCap, Users } from 'lucide-react';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import {
  getCataloguePageCoreFormations,
  getCataloguePageHeroReassurance,
} from '@/lib/formations-catalogue-page-config';
import { LINKS } from '@/lib/internal-links';
import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { PHOTOS } from '@/lib/photos';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Hero catalogue — en-tête visuel (photo, stats, CTAs) aligné spec UX. */
export function FormationsCatalogueHero() {
  const parcoursCount = getCataloguePageCoreFormations().length;

  return (
    <MarketingLightHero
      eyebrow="Catalogue IA BTP — organisme certifié Qualiopi"
      title={CATALOGUE_POSITIONNEMENT.h1}
      titleId="formations-catalogue-hero-h1"
      contentUpdatedAt={getPillarPageContentUpdatedAt('/formations')}
      description={
        <>
          Choisissez le parcours adapté à votre métier et à vos usages : devis, appels d&apos;offres,
          conduite de travaux, maîtrise d&apos;œuvre ou déploiement avancé de l&apos;IA.
          <span className="mt-3 block text-base font-medium text-slate-600">
            {getCataloguePageHeroReassurance()}
          </span>
        </>
      }
      stats={[
        { icon: GraduationCap, value: parcoursCount, label: 'parcours catalogue' },
        { icon: Users, value: formatNoteSatisfactionSur5(), label: 'Satisfaction (Qualiopi)' },
        { icon: Award, value: 'Qualiopi', label: 'organisme certifié' },
      ]}
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
