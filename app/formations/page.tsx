import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import {
  CATALOGUE_2027_POSITIONNEMENT,
  getAllParcoursComputed,
} from '@/data/catalogue-2027';
import { FormationsCatalogue2027Hero } from '@/components/formations/catalogue-2027/FormationsCatalogue2027Hero';
import { FormationsCatalogueChoixSection } from '@/components/formations/catalogue-2027/FormationsCatalogueChoixSection';
import { FormationsParcoursExplorer } from '@/components/formations/catalogue-2027/FormationsParcoursExplorer';
import { FormationsSousDomainesIaChantier } from '@/components/formations/catalogue-2027/FormationsSousDomainesIaChantier';
import { FormationsDeroulementParcours } from '@/components/formations/catalogue-2027/FormationsDeroulementParcours';
import { FormationsIaDisponibles } from '@/components/formations/catalogue-2027/FormationsIaDisponibles';
import { FormationsModulesCatalogue } from '@/components/formations/catalogue-2027/FormationsModulesCatalogue';
import { FormationsPlanEntreprise } from '@/components/formations/catalogue-2027/FormationsPlanEntreprise';
import { FormationsInfosPratiques2027 } from '@/components/formations/catalogue-2027/FormationsInfosPratiques2027';
import { FormationsContact2027 } from '@/components/formations/catalogue-2027/FormationsContact2027';
import { FormationsCatalogueMaillageSection } from '@/components/formations/catalogue/FormationsCatalogueMaillageSection';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const CATALOGUE_2027_TITLE = 'Formations et parcours métiers BTP | Laure Olivié';
const CATALOGUE_2027_DESCRIPTION =
  'Catalogue des formations IA pour le BTP : devis, appels d’offres, chantier, Claude. Présentiel Île-de-France, Qualiopi, OPCO selon éligibilité.';

export const revalidate = 3600;

type FormationsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: FormationsPageProps = {}): Promise<Metadata> {
  const sp = searchParams ? await searchParams : {};
  const hasCatalogueFilters = Boolean(sp.domaine || sp.metier || sp.q || sp.niveau);

  return {
    ...createPageMetadata({
      title: CATALOGUE_2027_TITLE,
      titleAbsolute: CATALOGUE_2027_TITLE,
      description: CATALOGUE_2027_DESCRIPTION,
      descriptionFinal: true,
      path: '/formations',
      appendAuthorSuffix: false,
      openGraphTitle: CATALOGUE_2027_TITLE,
      openGraphDescription: CATALOGUE_2027_DESCRIPTION,
      keywords: [
        'formation IA pour le BTP',
        'parcours métiers BTP',
        'formation conducteur de travaux',
        'formation chef de chantier',
        'formation IA Île-de-France',
        'ChatGPT BTP',
      ],
      robots: hasCatalogueFilters ? { index: false, follow: true } : { index: true, follow: true },
      image: {
        url: PHOTOS.formationsCatalogueHero2026.src,
        width: PHOTOS.formationsCatalogueHero2026.width,
        height: PHOTOS.formationsCatalogueHero2026.height,
        alt: PHOTOS.formationsCatalogueHero2026.alt,
      },
    }),
    alternates: {
      canonical: `${baseUrl}/formations`,
      languages: { 'fr-FR': `${baseUrl}/formations` },
    },
    other: {
      'geo.region': 'FR-IDF',
      'geo.placename': 'Guyancourt',
      'geo.position': '48.7713;2.0739',
      ICBM: '48.7713, 2.0739',
    },
  };
}

export default function FormationsPage() {
  const parcours = getAllParcoursComputed();

  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FormationsCatalogue2027Hero />
      <FormationsCatalogueChoixSection />

      <div className="mx-auto max-w-[80rem] px-4 pb-20 pt-10 sm:px-6 md:pt-14 lg:px-8">
        <p className="sr-only">{CATALOGUE_2027_POSITIONNEMENT.introductionMarque}</p>
        <FormationsIaDisponibles />
        <FormationsParcoursExplorer parcours={parcours} />
        <FormationsSousDomainesIaChantier />
        <FormationsDeroulementParcours />
        <Suspense fallback={null}>
          <FormationsModulesCatalogue />
        </Suspense>
        <FormationsPlanEntreprise />
        <FormationsInfosPratiques2027 />
        <FormationsContact2027 />
        <FormationsCatalogueMaillageSection />
      </div>
    </>
  );
}
