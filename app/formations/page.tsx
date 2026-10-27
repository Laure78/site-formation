import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { CATALOGUE_2027_POSITIONNEMENT } from '@/data/catalogue-2027';
import { FormationsCatalogue2027Hero } from '@/components/formations/catalogue-2027/FormationsCatalogue2027Hero';
import { FormationsCatalogueEnBrefSection } from '@/components/formations/catalogue-2027/FormationsCatalogueEnBrefSection';
import { FormationsCataloguePageNav } from '@/components/formations/catalogue-2027/FormationsCataloguePageNav';
import { FormationsCatalogueReassuranceLine } from '@/components/formations/catalogue-2027/FormationsCatalogueReassuranceLine';
import { FormationsCatalogueParcoursMetiers2027Banner } from '@/components/formations/catalogue-2027/FormationsCatalogueParcoursMetiers2027Banner';
import { FormationsIaDisponibles } from '@/components/formations/catalogue-2027/FormationsIaDisponibles';
import { FormationsCatalogueParcoursCompact } from '@/components/formations/catalogue-2027/FormationsCatalogueParcoursCompact';
import { FormationsCatalogueEntrepriseCompact } from '@/components/formations/catalogue-2027/FormationsCatalogueEntrepriseCompact';
import { FormationsCatalogueFinancementEncadre } from '@/components/formations/catalogue-2027/FormationsCatalogueFinancementEncadre';
import { FormationsContact2027 } from '@/components/formations/catalogue-2027/FormationsContact2027';
import { FormationsCatalogueFaqSection } from '@/components/formations/catalogue-2027/FormationsCatalogueFaqSection';
import { FormationsCatalogueMobileBar } from '@/components/formations/catalogue-2027/FormationsCatalogueMobileBar';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const CATALOGUE_TITLE = 'Catalogue des formations IA BTP | Laure Olivié';
const CATALOGUE_DESCRIPTION =
  'Découvrez les formations IA pour le BTP de Laure Olivié. Consultez les programmes, niveaux et durées. Formations en présentiel en Île-de-France.';

export const revalidate = 3600;

type FormationsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: FormationsPageProps = {}): Promise<Metadata> {
  const sp = searchParams ? await searchParams : {};
  const niveauRaw = sp.niveau;
  const niveauParam = Array.isArray(niveauRaw) ? niveauRaw[0] : niveauRaw;
  const hasCatalogueFilters = Boolean(niveauParam?.trim());

  return {
    ...createPageMetadata({
      title: CATALOGUE_TITLE,
      titleAbsolute: CATALOGUE_TITLE,
      description: CATALOGUE_DESCRIPTION,
      descriptionFinal: true,
      path: '/formations',
      appendAuthorSuffix: false,
      openGraphTitle: CATALOGUE_TITLE,
      openGraphDescription: CATALOGUE_DESCRIPTION,
      keywords: [
        'formation IA pour le BTP',
        'catalogue formation IA BTP',
        'formation IA Île-de-France',
        'ChatGPT BTP',
        'Claude AI BTP',
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

export default async function FormationsPage({ searchParams }: FormationsPageProps = {}) {
  void searchParams;

  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FormationsCatalogue2027Hero />

      <div className="mx-auto max-w-[80rem] px-4 pb-24 pt-1 sm:px-6 lg:px-8">
        <p className="sr-only">{CATALOGUE_2027_POSITIONNEMENT.introductionMarque}</p>

        <div className="space-y-6 md:space-y-7">
          <FormationsCatalogueEnBrefSection />
          <FormationsCatalogueReassuranceLine />
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <FormationsCataloguePageNav />
          </div>
          <Suspense fallback={null}>
            <FormationsIaDisponibles />
          </Suspense>

          {isParcoursMetiers2027Visible() ? (
            <>
              <FormationsCatalogueParcoursMetiers2027Banner />
              <FormationsCatalogueParcoursCompact />
            </>
          ) : null}
          <FormationsCatalogueEntrepriseCompact />
          <FormationsCatalogueFinancementEncadre />
          <FormationsContact2027 formationHint={null} />
          <FormationsCatalogueFaqSection />
        </div>
      </div>

      <FormationsCatalogueMobileBar />
    </>
  );
}
