/**
 * Configuration SEO et GEO pour Laure Olivié / OFC Création d'Entreprise
 * Formation IA BTP — France, Île-de-France, Guyancourt (Yvelines)
 */

export const SITE_CONFIG = {
  name: 'Laure Olivié',
  legalName: 'OFC Création d\'Entreprise',
  description:
    "Formation IA BTP certifiée Qualiopi 100% financée Constructys. Gagnez 3 à 5h/semaine sur devis, appels d'offres, CR et emails avec ChatGPT. Pour artisans, conducteurs de travaux et dirigeants BTP.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr',
  email: 'contact@laureolivie.fr',
  phone: '+33695661818',
  phoneDisplay: '06 95 66 18 18',
  siret: '905 244 281 00010',
  locale: 'fr_FR',
  geo: {
    country: 'FR',
    region: 'Île-de-France',
    city: 'Guyancourt',
    département: 'Yvelines',
    streetAddress: '6 Rue Henri Dunant',
    postalCode: '78280',
    // Guyancourt — siège social
    latitude: 48.7713,
    longitude: 2.0739,
  },
  keywords: [
    'formation IA BTP',
    'formation intelligence artificielle bâtiment',
    'IA travaux publics',
    'formation ChatGPT BTP',
    'devis IA BTP',
    'OPCO Constructys',
    'formation Qualiopi BTP',
    'formation IA Guyancourt',
    'formation IA Île-de-France',
    'formation IA Yvelines',
    'formation IA Seine-et-Marne',
    'conducteur de travaux IA',
    'IA chantier',
    'formation PME BTP',
  ],
  sameAs: [
    'https://www.linkedin.com/in/laure-olivie',
    'https://www.laureolivie.fr',
  ],
  /** Nombre de professionnels formés — valeur unique pour cohérence NAP / biographie */
  statsPersonnesFormees: '1592',
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

/** Schéma Course principal "Formation IA BTP" (visible sur toutes les pages) */
export function getMainCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_CONFIG.url}/#course`,
    name: 'Formation IA BTP',
    description:
      "Formation pour apprendre à utiliser ChatGPT et l'IA dans les entreprises du bâtiment afin de gagner du temps et automatiser certaines tâches.",
    url: `${SITE_CONFIG.url}/formations`,
    provider: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url,
    },
    teaches: [
      'Automatisation administrative',
      'Génération de devis',
      'Utilisation de ChatGPT en entreprise',
    ],
    educationalLevel: 'Professionnel',
    inLanguage: 'fr-FR',
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'State', name: 'Île-de-France' },
    ],
  };
}

/** Schéma Course pour une formation (GEO) — EEAT avec instructor */
export function getCourseSchema({
  name,
  description,
  path,
  providerName,
  areaServed,
  instructorName,
}: {
  name: string;
  description: string;
  path: string;
  providerName: string;
  areaServed?: string[];
  instructorName?: string;
}) {
  const instructor = instructorName ?? SITE_CONFIG.name;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: instructor,
    },
    instructor: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: instructor,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: 'Formation IA pour entreprises du BTP',
    },
    url: `${SITE_CONFIG.url}${path}`,
    ...(areaServed?.length && {
      areaServed: areaServed.map((a) => ({ '@type': 'Place', name: a })),
    }),
  };
}

/** Schéma JSON-LD Organization / EducationalOrganization */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.legalName,
    description: 'Formation en intelligence artificielle pour les entreprises du BTP',
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressRegion: SITE_CONFIG.geo.region,
      addressLocality: SITE_CONFIG.geo.city,
      streetAddress: SITE_CONFIG.geo.streetAddress,
      postalCode: SITE_CONFIG.geo.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'City', name: 'Guyancourt' },
      { '@type': 'State', name: 'Yvelines' },
    ],
    sameAs: SITE_CONFIG.sameAs,
    taxID: SITE_CONFIG.siret,
  };
}

/** Schéma LocalBusiness pour SEO local / Google Business */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: 'Laure Olivié — Formation IA BTP',
    description: 'Formation en intelligence artificielle pour les entreprises du BTP. Formatrice IA générative pour artisans, PME bâtiment, conducteurs de travaux.',
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Guyancourt',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
      streetAddress: SITE_CONFIG.geo.streetAddress,
      postalCode: SITE_CONFIG.geo.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'City', name: 'Guyancourt' },
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

/** Schéma Article pour blog (GEO) */
export function getArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  authorName,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Person', '@id': `${SITE_CONFIG.url}/#person`, name: authorName },
    publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
    ...(image && { image }),
  };
}

/** Schéma Person (Laure Olivié) — EEAT / Autorité */
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#person`,
    name: SITE_CONFIG.name,
    jobTitle: 'Formatrice en intelligence artificielle pour le BTP',
    description: 'Formatrice spécialisée dans l\'intégration de l\'IA générative dans les entreprises du bâtiment.',
    knowsAbout: [
      'Intelligence artificielle',
      'IA générative',
      'ChatGPT',
      'IA pour le BTP',
      'Automatisation administrative BTP',
      'Analyse d\'appels d\'offres',
    ],
    worksFor: { '@id': `${SITE_CONFIG.url}/#organization` },
    affiliation: {
      '@type': 'Organization',
      name: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/',
    },
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    sameAs: [
      ...SITE_CONFIG.sameAs,
      'https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers',
      'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement',
    ],
  };
}

/** Schéma HowTo pour guides */
export function getHowToSchema({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Schéma BreadcrumbList */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

/** Schéma WebSite pour moteur de recherche (sitelinks search box Google) */
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
