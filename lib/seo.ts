/**
 * Configuration SEO et GEO pour Laure Olivié / OFC Création d'Entreprise
 * Formation IA BTP — France, Île-de-France, Guyancourt (Yvelines)
 */

export const SITE_CONFIG = {
  name: 'Laure Olivié',
  legalName: 'OFC Création d\'Entreprise',
  description:
    "Formation IA BTP certifiée Qualiopi. Gagnez 3 à 5h/semaine sur devis, appels d'offres et emails. 100% financée Constructys. Artisans, PME bâtiment.",
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
    // Mots-clés principaux BTP
    'formation IA BTP',
    'formation intelligence artificielle bâtiment',
    'formation ChatGPT BTP',
    'IA pour le BTP',
    'IA travaux publics',
    'IA construction',
    'IA génie civil',
    
    // Usages métiers
    'IA devis bâtiment',
    'IA appels d\'offres BTP',
    'IA conducteur de travaux',
    'IA gestion de chantier',
    'IA compte rendu chantier',
    'IA mémoire technique',
    
    // Artisanat
    'formation IA artisan',
    'formation ChatGPT artisan',
    'IA pour artisans',
    'IA entreprise artisanale',
    'IA TPE bâtiment',
    
    // Automobile (nouveau)
    'formation IA garage automobile',
    'formation ChatGPT garage',
    'IA pour garages',
    'IA réparation automobile',
    'IA atelier mécanique',
    
    // PME
    'formation IA PME BTP',
    'formation IA entreprise bâtiment',
    'IA pour dirigeants BTP',
    
    // Géographie
    'formation IA Guyancourt',
    'formation IA Île-de-France',
    'formation IA Yvelines',
    'formation IA Paris',
    'formation IA Lyon',
    'formation IA Bordeaux',
    'formation IA Lille',
    
    // Financement
    'OPCO Constructys',
    'formation Qualiopi BTP',
    'formation finançable OPCO',
    '100% finançable',
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
    name: SITE_CONFIG.legalName,
    legalName: SITE_CONFIG.legalName,
    logo: { '@type': 'ImageObject', url: `${SITE_CONFIG.url}/logo-lo.svg` },
    image: `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`,
    alternateName: [SITE_CONFIG.name, 'Laure Olivié Formation'],
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

/** Schéma Article pour blog (GEO) — image recommandée pour rich results */
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
  const imageUrl = image?.startsWith('http') ? image : image ? `${SITE_CONFIG.url}${image}` : `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Person', '@id': `${SITE_CONFIG.url}/#person`, name: authorName },
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
      logo: { '@type': 'ImageObject', url: `${SITE_CONFIG.url}/logo-lo.svg` },
    },
    image: { '@type': 'ImageObject', url: imageUrl, width: 1200, height: 630 },
  };
}

/** Schéma Person (Laure Olivié) — EEAT / Autorité — Optimisé GEO */
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#person`,
    name: SITE_CONFIG.name,
    givenName: 'Laure',
    familyName: 'Olivié',
    image: `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`,
    jobTitle: 'Formatrice IA et ChatGPT pour le BTP',
    alternateName: ['Laure Olivié', 'Laure Olivie'],
    description: 'Formatrice spécialisée en intelligence artificielle pour le BTP basée à Guyancourt (78). 1592 professionnels formés. Note moyenne 4,85/5. 10 ans d\'expérience en travaux publics et formation. Instructrice LinkedIn Learning. Certification Qualiopi. Clients : FFB, CAPEB, GERESO, Lefebvre Dalloz, CNAM Entreprise.',
    knowsAbout: [
      'Intelligence artificielle pour le BTP',
      'IA générative',
      'ChatGPT',
      'ChatGPT pour entreprises',
      'IA pour le bâtiment',
      'IA pour artisans',
      'IA pour travaux publics',
      'Automatisation administrative BTP',
      'Analyse d\'appels d\'offres',
      'Génération de devis avec IA',
      'Mémoire technique IA',
      'Gestion de chantier avec IA',
      'Formation professionnelle BTP',
      'OPCO Constructys',
      'Financement formation OPCO',
      'Formation continue BTP',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        description: 'Organisme de formation certifié Qualiopi (n° 905 244 281 00010) pour les actions de formation professionnelle',
        credentialCategory: 'Certification qualité formation',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'LinkedIn Learning Instructor',
        description: 'Formatrice officielle LinkedIn Learning sur l\'IA pour le BTP depuis 2024',
        credentialCategory: 'Instructeur certifié',
      },
    ],
    worksFor: { '@id': `${SITE_CONFIG.url}/#organization` },
    affiliation: [
      {
        '@type': 'Organization',
        name: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/',
      },
      {
        '@type': 'Organization',
        name: 'FFB Grand Paris',
        description: 'Fédération Française du Bâtiment - Grand Paris',
      },
      {
        '@type': 'Organization',
        name: 'FFB Yvelines',
        description: 'Fédération Française du Bâtiment - Yvelines',
      },
      {
        '@type': 'Organization',
        name: 'FFB Seine-et-Marne',
        description: 'Fédération Française du Bâtiment - Seine-et-Marne',
      },
      {
        '@type': 'Organization',
        name: 'CAPEB',
        description: 'Confédération de l\'Artisanat et des Petites Entreprises du Bâtiment',
      },
      {
        '@type': 'Organization',
        name: 'GERESO',
        description: 'Organisme de formation professionnelle',
      },
      {
        '@type': 'Organization',
        name: 'Lefebvre Dalloz',
        description: 'Formations juridiques et professionnelles',
      },
      {
        '@type': 'Organization',
        name: 'CNAM Entreprise',
        description: 'Conservatoire National des Arts et Métiers - Formation continue',
      },
      {
        '@type': 'Organization',
        name: 'IFRB 78',
        description: 'Institut de Formation Régional du Bâtiment Yvelines',
      },
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Formation professionnelle BTP et travaux publics',
      description: '10 ans d\'expérience terrain en conduite de chantier et travaux publics',
    },
    award: [
      'Formatrice LinkedIn Learning 2024',
      '1592 professionnels formés (statistique officielle)',
      'Note moyenne 4,85/5',
      '10 ans d\'expérience en formation professionnelle',
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 1592,
      unitText: 'personnes formées',
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

/** Schéma ItemList de Course — page catalogue formations */
export function getCourseListSchema(
  courses: Array<{ title: string; description: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_CONFIG.url}/formations#course-list`,
    name: 'Catalogue des formations IA BTP',
    description: 'Formations IA pour artisans et PME du BTP. Devis, appels d\'offres, ChatGPT. 100% finançable Constructys.',
    numberOfItems: courses.length,
    itemListElement: courses.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.title,
        description: c.description,
        url: `${SITE_CONFIG.url}${c.path}`,
        provider: { '@type': 'Person', '@id': `${SITE_CONFIG.url}/#person`, name: SITE_CONFIG.name },
        instructor: { '@type': 'Person', '@id': `${SITE_CONFIG.url}/#person`, name: SITE_CONFIG.name },
        educationalLevel: 'Professionnel',
        inLanguage: 'fr-FR',
      },
    })),
  };
}

/** Extrait un schéma HowTo depuis un article blog si les sections contiennent des listes/étapes */
export function getHowToFromArticle(
  article: { title: string; description: string; slug: string; sections: { type: string; content: string | string[] | Array<{ titre: string; prompt: string; usage?: string }>; title?: string }[] }
): Record<string, unknown> | null {
  const steps: { name: string; text: string }[] = [];
  for (const section of article.sections) {
    if (section.type === 'list') {
      const raw = Array.isArray(section.content) ? section.content : [section.content];
      const items = raw.filter((x): x is string => typeof x === 'string');
      if (items.length < 2) continue;
      const title = section.title ?? 'Étape';
      for (let i = 0; i < items.length; i++) {
        const item = String(items[i]);
        const sep = item.indexOf(' — ');
        const name = sep >= 0 ? item.slice(0, sep).trim() : (section.title ? `${title} ${i + 1}` : `Étape ${i + 1}`);
        const text = sep >= 0 ? item.slice(sep + 3).trim() : item;
        steps.push({ name, text });
      }
    }
  }
  if (steps.length < 2) return null;
  return getHowToSchema({
    name: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    steps,
  });
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
