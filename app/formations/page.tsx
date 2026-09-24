import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getFaqCataloguePage } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';
import {
  CATALOGUE_PAGE_TITLE,
  getCatalogueBesoinOptions,
  getCataloguePageCoreFormations,
  getCataloguePageMetaDescriptionShort,
} from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueHero } from '@/components/formations/catalogue/FormationsCatalogueHero';
import { FormationsCatalogueMainSection } from '@/components/formations/catalogue/FormationsCatalogueMainSection';
import { FormationsCatalogueComparison } from '@/components/formations/catalogue/FormationsCatalogueComparison';
import { FormationsCatalogueApprochePratiqueSection } from '@/components/formations/catalogue/FormationsCatalogueApprochePratiqueSection';
import { FormationsCatalogueMethodSection } from '@/components/formations/catalogue/FormationsCatalogueMethodSection';
import { FormationsCataloguePracticalInfoSection } from '@/components/formations/catalogue/FormationsCataloguePracticalInfoSection';
import { FormationsCatalogueSurDemandeSection } from '@/components/formations/catalogue/FormationsCatalogueSurDemandeSection';
import { FormationsCatalogueConversionSection } from '@/components/formations/catalogue/FormationsCatalogueConversionSection';
import { FormationsCatalogueProofSection } from '@/components/formations/catalogue/FormationsCatalogueProofSection';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import { FormationsCatalogueMaillageSection } from '@/components/formations/catalogue/FormationsCatalogueMaillageSection';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const metaDescription = getCataloguePageMetaDescriptionShort();

  return {
    ...createPageMetadata({
      title: CATALOGUE_PAGE_TITLE,
      titleAbsolute: CATALOGUE_PAGE_TITLE,
      description: metaDescription,
      descriptionFinal: true,
      path: '/formations',
      appendAuthorSuffix: false,
      openGraphTitle: CATALOGUE_PAGE_TITLE,
      openGraphDescription: metaDescription,
      keywords: [
        'formation IA pour le BTP',
        'formation ChatGPT BTP',
        'intelligence artificielle bâtiment',
        'Claude BTP',
        'formation IA devis BTP',
        'formation IA appels d\'offres',
        'formation IA maîtrise d\'œuvre',
      ],
      robots: { index: true, follow: true },
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
  const coreFormations = getCataloguePageCoreFormations();
  const besoinOptions = getCatalogueBesoinOptions();
  const faqCatalogue = getFaqCataloguePage();

  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FormationsCatalogueHero />

      <div className="mx-auto max-w-[80rem] px-4 pb-20 pt-10 sm:px-6 md:pt-14 lg:px-8">
        <FormationsCatalogueMainSection formations={coreFormations} besoinOptions={besoinOptions} />
        <FormationsCatalogueApprochePratiqueSection />
        <FormationsCatalogueComparison formations={coreFormations} />
        <FormationsCataloguePracticalInfoSection />
        <FormationsCatalogueMethodSection />
        <FormationsCatalogueSurDemandeSection />
        <FormationsCatalogueConversionSection />
        <FormationsCatalogueProofSection />
        <FormationsFaqSection items={faqCatalogue} title="Questions fréquentes" />
        <FormationsCatalogueMaillageSection />
      </div>
    </>
  );
}
