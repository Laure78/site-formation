/**
 * Configuration SEO et GEO pour Laure Olivié / OFC Création d'Entreprise
 * Formation IA BTP — France, Île-de-France, Guyancourt (Yvelines)
 */

export const SITE_CONFIG = {
  name: 'Laure Olivié',
  legalName: 'OFC Création d\'Entreprise',
  description:
    "Formation IA BTP & ChatGPT : devis, chantier, mémoires techniques et administratif. Réseau FFB & CSFE, Qualiopi, financement OPCO Constructys. Laure Olivié — +1592 pros formés. Île-de-France & France.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr',
  email: 'laureolivie@yahoo.fr',
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
    // Priorité haute — requêtes stratégiques
    'formation IA BTP',
    'formation ChatGPT entreprise BTP',
    'IA pour PME bâtiment',
    'IA pour garage automobile',
    'formation IA artisan',
    'automatisation tâches administratives BTP',
    'IA devis bâtiment',
    'IA gestion chantier',
    // Compléments sémantiques
    'formation intelligence artificielle bâtiment',
    'formation ChatGPT BTP',
    'IA pour le BTP',
    'IA travaux publics',
    'IA construction',
    'IA génie civil',
    'IA appels d\'offres BTP',
    'IA conducteur de travaux',
    'IA compte rendu chantier',
    'IA mémoire technique',
    'formation ChatGPT artisan',
    'IA pour artisans',
    'IA entreprise artisanale',
    'IA PME artisanale',
    'IA TPE bâtiment',
    'formation IA garage automobile',
    'formation ChatGPT garage',
    'IA pour garages',
    'IA réparation automobile',
    'IA atelier mécanique',
    'formation IA PME BTP',
    'formation IA entreprise bâtiment',
    'IA pour dirigeants BTP',
    // Longue traîne
    'comment utiliser ChatGPT dans une entreprise du bâtiment',
    'gagner du temps administratif BTP IA',
    'IA pour conducteur de travaux',
    'IA pour PME artisanale',
    // Géographie (SEO local / GEO)
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
    'FFB formation IA',
    'IA acte de construire',
    'formation professionnels étanchéité BTP',
    'CSFE formation IA',
  ],
  /** Fiche Google Business Profile (avis, horaires, local SEO) */
  googleBusinessProfileUrl:
    'https://share.google/4ILaucOrmSyE55gkx',
  sameAs: [
    'https://www.linkedin.com/in/laure-olivie',
    'https://www.laureolivie.fr',
    'https://share.google/4ILaucOrmSyE55gkx',
  ],
  /** Nombre de professionnels formés — valeur unique pour cohérence NAP / biographie */
  statsPersonnesFormees: '1592',
} as const;

const DEFAULT_OG_IMAGE = {
  url: `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`,
  width: 1200,
  height: 630,
  alt: 'Laure Olivié — Formatrice IA pour le BTP, Qualiopi',
} as const;

/** Helper pour métadonnées de page avec Open Graph + Twitter (partages & GEO) */
export function createPageMetadata({
  title,
  description,
  path = '',
  keywords,
  openGraphType = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /** article = pages formation / blog (meilleure sémantique pour les moteurs) */
  openGraphType?: 'website' | 'article';
}) {
  const url = path ? `${SITE_CONFIG.url}${path}` : SITE_CONFIG.url;
  const kw = keywords ? [...keywords] : [...SITE_CONFIG.keywords];
  return {
    title,
    description,
    keywords: kw,
    openGraph: {
      type: openGraphType,
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: 'fr_FR',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
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
      "Formation ChatGPT entreprise BTP : IA pour devis, chantier, mémoires techniques et administratif. Public : PME bâtiment, artisans, conducteurs de travaux, fédérations (FFB). Qualiopi, OPCO Constructys.",
    url: `${SITE_CONFIG.url}/formations`,
    provider: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url,
    },
    teaches: [
      'Formation ChatGPT entreprise BTP',
      'IA devis bâtiment',
      'IA gestion chantier',
      'Automatisation tâches administratives BTP',
      'IA pour PME artisanale',
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
  teaches,
  courseCode,
  educationalLevel,
  timeRequired,
}: {
  name: string;
  description: string;
  path: string;
  providerName: string;
  areaServed?: string[];
  instructorName?: string;
  /** Compétences couvertes — utile pour réponses IA (Perplexity, SGE) */
  teaches?: string[];
  /** Ex. réf. catalogue BTP-02 */
  courseCode?: string;
  /** Ex. « Intermédiaire », « Professionnel » */
  educationalLevel?: string;
  /** Durée ISO 8601, ex. PT7H pour 7 h */
  timeRequired?: string;
}) {
  const instructor = instructorName ?? SITE_CONFIG.name;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    inLanguage: 'fr-FR',
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: providerName,
    },
    instructor: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: instructor,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name,
      courseMode: 'online',
    },
    url: `${SITE_CONFIG.url}${path}`,
    ...(courseCode && { courseCode }),
    ...(educationalLevel && { educationalLevel }),
    ...(timeRequired && { timeRequired }),
    ...(teaches?.length && { teaches }),
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
    description:
      "Organisme de formation : intelligence artificielle et ChatGPT pour le BTP, PME bâtiment, artisans et garages. Automatisation administrative, IA devis bâtiment, IA gestion chantier. Certifié Qualiopi.",
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
    description:
      "Formation IA BTP et ChatGPT entreprise : automatisation des tâches administratives, IA devis bâtiment, IA gestion chantier. Artisans, PME bâtiment, garages automobile, conducteurs de travaux. Guyancourt (78), Île-de-France et France.",
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
    description: 'Formatrice spécialisée en intelligence artificielle pour le BTP basée à Guyancourt (78). 1592 professionnels formés. Note moyenne 4,85/5. 10 ans d\'expérience en travaux publics et formation. Instructrice LinkedIn Learning. Certification Qualiopi. Clients : FFB, GERESO, Lefebvre Dalloz, CNAM Entreprise.',
    knowsAbout: [
      'Formation IA BTP',
      'Formation ChatGPT entreprise BTP',
      'Comment utiliser ChatGPT dans une entreprise du bâtiment',
      'IA pour PME bâtiment',
      'IA pour TPE et PME du bâtiment et des travaux publics',
      'Automatisation tâches administratives BTP',
      'Gagner du temps administratif BTP IA',
      'IA devis bâtiment',
      'IA gestion chantier',
      'IA pour conducteur de travaux',
      'Intelligence artificielle pour le BTP',
      'IA générative',
      'ChatGPT',
      'ChatGPT pour entreprises',
      'IA pour le bâtiment',
      'IA pour travaux publics',
      'Analyse d\'appels d\'offres',
      'Génération de devis avec IA',
      'Mémoire technique IA',
      'Assistant IA pour analyse DCE',
      'Formation appels d\'offres niveau 2 BTP',
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
        name: 'FFB Île-de-France Est',
        description: 'Fédération Française du Bâtiment - Île-de-France Est',
      },
      {
        '@type': 'Organization',
        name: 'FFB Île-de-France Ouest',
        description: 'Fédération Française du Bâtiment - Région Île-de-France (78-91-95)',
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
      {
        '@type': 'Organization',
        name: 'ARFAB',
        url: 'https://www.arfab-formation.fr/',
        description: 'Association de formation pour les artisans du bâtiment',
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
    description:
      'Formations IA pour dirigeants et équipes du BTP (bâtiment et travaux publics). Devis, appels d\'offres, ChatGPT. 100% finançable Constructys.',
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
