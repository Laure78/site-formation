/**
 * Signaux JSON-LD globaux (situation dans la SERP / sitelinks) — nœud WebSite (hasPart).
 * Les SiteNavigationElement ont été retirés (valeur SEO négligeable, ils gonflaient le graph de chaque page).
 * @see https://schema.org/WebSite — hasPart
 */
import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

const WEBSITE_ID = `${base}/#website`;
const ORG_ID = `${base}/#organization`;

const HAS_PART = [
  {
    '@type': 'WebPage',
    '@id': `${base}/formations#webpage`,
    url: `${base}/formations`,
    name: 'Formations IA appliquées au bâtiment',
    description: 'Catalogue de formations IA certifiées Qualiopi',
  },
  {
    '@type': 'WebPage',
    '@id': `${base}/financement-constructys-formation-ia-btp#webpage`,
    url: `${base}/financement-constructys-formation-ia-btp`,
    name: 'Financement Constructys',
    description: 'Financement OPCO BTP pour les formations IA',
  },
  {
    '@type': 'WebPage',
    '@id': `${base}/blog#webpage`,
    url: `${base}/blog`,
    name: 'Blog formation IA pour le BTP',
    description: 'Guides et articles sur l’IA dans le BTP',
  },
  {
    '@type': 'WebPage',
    '@id': `${base}/claude-ai-btp#webpage`,
    url: `${base}/claude-ai-btp`,
    name: 'Claude AI BTP',
    description: 'Guide Claude AI pour le bâtiment et les travaux publics',
  },
  {
    '@type': 'WebPage',
    '@id': `${base}/a-propos#webpage`,
    url: `${base}/a-propos`,
    name: 'À propos',
    description: 'Formatrice IA & ChatGPT pour le BTP — Qualiopi, OFC Création d’Entreprise',
  },
  {
    '@type': 'WebPage',
    '@id': `${base}/contact#webpage`,
    url: `${base}/contact`,
    name: 'Contact',
    description: 'Demander un devis ou une formation',
  },
];

export function buildGlobalSitelinksGraphJsonLd(): Record<string, unknown> {
  const pros = formatProfessionalsTrainedCount();
  const desc = `Formation IA et ChatGPT pour le BTP par Laure Olivié. Qualiopi. Financement possible selon éligibilité. ${pros} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`;

  const webSite = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Laure Olivié — Formation IA pour les pro du BTP',
    alternateName: ['Laure Olivié', 'OFC Création d’Entreprise', 'Laure Olivie'],
    url: base,
    description: desc,
    inLanguage: 'fr-FR',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    hasPart: HAS_PART,
  };

  return {
    '@context': 'https://schema.org',
    ...webSite,
  };
}
