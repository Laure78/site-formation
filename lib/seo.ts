/**
 * Configuration SEO et GEO pour Laure Olivié / OFC Création d'Entreprise
 * Formation IA BTP — France, Île-de-France, Paris
 */

export const SITE_CONFIG = {
  name: 'Laure Olivié',
  legalName: 'OFC Création d\'Entreprise',
  description:
    'Formation IA pour les entreprises du BTP. Gagnez 3 à 5h/semaine sur devis, chiffrages, emails et CR chantier. 100% finançable OPCO Constructys. Paris, Île-de-France, France.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr',
  email: 'laureolivie@yahoo.fr',
  phone: '+33695661818',
  phoneDisplay: '06 95 66 18 18',
  siret: '905 244 281 00010',
  locale: 'fr_FR',
  geo: {
    country: 'FR',
    region: 'Île-de-France',
    city: 'Paris',
    // Paris centre approximatif (pour schéma)
    latitude: 48.8566,
    longitude: 2.3522,
  },
  keywords: [
    'formation IA BTP',
    'formation intelligence artificielle bâtiment',
    'IA travaux publics',
    'formation ChatGPT BTP',
    'devis IA BTP',
    'OPCO Constructys',
    'formation Qualiopi BTP',
    'formation IA Paris',
    'formation IA Île-de-France',
    'conducteur de travaux IA',
    'IA chantier',
    'formation PME BTP',
  ],
  sameAs: [
    'https://www.linkedin.com/in/laure-olivie',
    'https://www.laureolivie.fr',
  ],
} as const;

/** Helper pour métadonnées de page avec Open Graph */
export function createPageMetadata({
  title,
  description,
  path = '',
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}) {
  const url = path ? `${SITE_CONFIG.url}${path}` : SITE_CONFIG.url;
  return {
    title,
    description,
    keywords: keywords ?? SITE_CONFIG.keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: 'fr_FR',
    },
    alternates: path ? { canonical: url } : undefined,
  };
}

/** Schéma Course pour une formation (GEO) */
export function getCourseSchema({
  name,
  description,
  path,
  providerName,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  providerName: string;
  areaServed?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: providerName,
    },
    url: `${SITE_CONFIG.url}${path}`,
    ...(areaServed?.length && {
      areaServed: areaServed.map((a) => ({ '@type': 'Place', name: a })),
    }),
  };
}

/** Schéma JSON-LD Organisation + LocalBusiness (GEO) */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.legalName,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressRegion: SITE_CONFIG.geo.region,
      addressLocality: SITE_CONFIG.geo.city,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'City', name: 'Paris' },
    ],
    sameAs: SITE_CONFIG.sameAs,
    taxID: SITE_CONFIG.siret,
  };
}

/** Schéma LocalBusiness pour SEO local / Google Business */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressRegion: SITE_CONFIG.geo.region,
      addressLocality: SITE_CONFIG.geo.city,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'City', name: 'Paris' },
    ],
    priceRange: '€€',
    image: `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`,
  };
}

/** Schéma FAQPage pour GEO (ChatGPT, Perplexity, etc.) */
export function getFAQSchema(faq: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** Schéma WebSite pour moteur de recherche */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
    inLanguage: 'fr-FR',
  };
}
