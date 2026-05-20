/**
 * Signaux JSON-LD globaux (situation dans la SERP / sitelinks) — WebSite + SiteNavigationElement.
 * @see https://schema.org/WebSite — hasPart
 */
import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

export type SiteNavItem = {
  name: string;
  url: string;
  description: string;
};

/** Libellés alignés sur la Navbar (Formations, Financement, Blog, …). */
export const SITE_NAVIGATION_ITEMS: SiteNavItem[] = [
  {
    name: 'Accueil',
    url: `${base}/`,
    description: 'Formatrice IA et ChatGPT pour le BTP',
  },
  {
    name: 'Formations',
    url: `${base}/formations`,
    description: 'Catalogue complet des formations IA pour les entreprises du bâtiment',
  },
  {
    name: 'Financement',
    url: `${base}/financement-constructys-formation-ia-btp`,
    description: 'Financement OPCO Constructys pour les formations IA BTP',
  },
  {
    name: 'Blog',
    url: `${base}/blog`,
    description: 'Articles et guides pratiques sur l’IA dans le BTP',
  },
  {
    name: 'Claude AI BTP',
    url: `${base}/claude-ai-btp`,
    description: 'Guide complet Claude AI pour les professionnels du BTP',
  },
  {
    name: 'À propos',
    url: `${base}/a-propos`,
    description: 'Laure Olivié — formatrice IA BTP, OFC Création d’Entreprise',
  },
  {
    name: 'Contact',
    url: `${base}/contact`,
    description: 'Contacter Laure Olivié pour un devis ou une formation',
  },
  {
    name: 'Prendre RDV',
    url: `${base}/prendre-rdv`,
    description: 'Réserver une visio découverte gratuite',
  },
];

const WEBSITE_ID = `${base}/#website`;
const ORG_ID = `${base}/#organization`;

const HAS_PART = [
  {
    '@type': 'WebPage',
    '@id': `${base}/formations#webpage`,
    url: `${base}/formations`,
    name: 'Formations IA BTP',
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
    name: 'Blog formation IA BTP',
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
    name: 'Laure Olivié — Formation IA BTP',
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

  const navElements = SITE_NAVIGATION_ITEMS.map((item, index) => ({
    '@type': 'SiteNavigationElement',
    '@id': `${base}/#nav-${index + 1}`,
    name: item.name,
    url: item.url,
    description: item.description,
    position: index + 1,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [webSite, ...navElements],
  };
}
