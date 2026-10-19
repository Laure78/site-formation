import { JsonLd } from '@/components/JsonLd';
import { EtudesDeCasHubPageContent } from '@/components/etudes-de-cas/EtudesDeCasHubPageContent';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  ETUDES_DE_CAS_FAQ,
  ETUDES_DE_CAS_HERO,
  ETUDES_DE_CAS_HUB_CARDS,
  ETUDES_DE_CAS_SEO,
} from '@/lib/etudes-de-cas-hub';

const PATH = LINKS.etudesCasHub;
const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${PATH}`;

export const metadata = createPageMetadata({
  title: ETUDES_DE_CAS_SEO.title,
  description: ETUDES_DE_CAS_SEO.description,
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'études de cas IA BTP',
    'intelligence artificielle bâtiment',
    'compte rendu de chantier avec l\'IA',
    'formation intelligence artificielle BTP',
    'IA et conduite de travaux',
  ],
});

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${CANONICAL}#collection`,
  name: ETUDES_DE_CAS_HERO.title,
  description: ETUDES_DE_CAS_SEO.description,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  isPartOf: { '@type': 'WebSite', name: 'laureolivie.fr', url: SITE_CONFIG.url },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: ETUDES_DE_CAS_HUB_CARDS.length,
    itemListElement: ETUDES_DE_CAS_HUB_CARDS.map((etude, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${BASE}${etude.href}`,
      name: etude.title,
    })),
  },
};

const faqJsonLd = getFAQSchema(ETUDES_DE_CAS_FAQ);

export default function EtudesDeCasHubPage() {
  return (
    <>
      <JsonLd id="schema-etudes-de-cas-collection" schema={collectionJsonLd} />
      {faqJsonLd ? <JsonLd id="schema-etudes-de-cas-faq" schema={faqJsonLd} /> : null}
      <EtudesDeCasHubPageContent />
    </>
  );
}
