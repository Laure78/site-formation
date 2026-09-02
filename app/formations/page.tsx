import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getFaqCataloguePage } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';
import {
  getCatalogueBesoinOptions,
  getCataloguePageCoreFormations,
  getCataloguePageMetaDescriptionShort,
} from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueHero } from '@/components/formations/catalogue/FormationsCatalogueHero';
import { FormationsCatalogueMainSection } from '@/components/formations/catalogue/FormationsCatalogueMainSection';
import { FormationsCatalogueComparison } from '@/components/formations/catalogue/FormationsCatalogueComparison';
import { FormationsCatalogueMethodSection } from '@/components/formations/catalogue/FormationsCatalogueMethodSection';
import { FormationsCataloguePracticalInfoSection } from '@/components/formations/catalogue/FormationsCataloguePracticalInfoSection';
import { FormationsCatalogueProofSection } from '@/components/formations/catalogue/FormationsCatalogueProofSection';
import { FormationsCatalogueHesitationCta } from '@/components/formations/catalogue/FormationsCatalogueHesitationCta';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import { FormationsCatalogueMaillageSection } from '@/components/formations/catalogue/FormationsCatalogueMaillageSection';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const FORMATIONS_HTML_TITLE = 'Catalogue formations IA pour le BTP';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const catalogueCount = getCatalogueFormationsCount();
  const metaDescription = getCataloguePageMetaDescriptionShort();

  return {
    ...createPageMetadata({
      title: FORMATIONS_HTML_TITLE,
      titleAbsolute: FORMATIONS_HTML_TITLE,
      description: metaDescription,
      descriptionFinal: true,
      path: '/formations',
      appendAuthorSuffix: false,
      openGraphTitle: FORMATIONS_HTML_TITLE,
      openGraphDescription: metaDescription,
      keywords: [
        'catalogue formation IA pour les pros du BTP',
        'formation ChatGPT BTP',
        'formation IA bâtiment',
        'formation IA construction',
        'formation IA travaux publics',
        "formation IA appels d'offre BTP",
        'formation IA — organisme certifié Qualiopi',
        'formation IA Constructys',
        'formation IA appliquée au bâtiment Île-de-France',
      ],
      robots: { index: true, follow: true },
      image: {
        url: PHOTOS.formationIaBtpSalleInteractive2026.src,
        width: 1200,
        height: 630,
        alt: `Catalogue formation IA pour le BTP — ${catalogueCount} formations dispensées par un organisme certifié Qualiopi de 4 h`,
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

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pt-10">
        <FormationsCatalogueMainSection formations={coreFormations} besoinOptions={besoinOptions} />
        <FormationsCatalogueComparison formations={coreFormations} />
        <FormationsCatalogueMethodSection />
        <FormationsCataloguePracticalInfoSection />
        <FormationsCatalogueProofSection />
        <FormationsCatalogueHesitationCta />
        <FormationsFaqSection items={faqCatalogue} title="Questions fréquentes" />
        <FormationsCatalogueMaillageSection />
      </div>
    </>
  );
}
