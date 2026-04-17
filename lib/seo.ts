/**
 * Configuration SEO et GEO pour Laure Olivié / OFC Création d'Entreprise
 * Formation IA BTP — France, Île-de-France, Guyancourt (Yvelines)
 */

import type { Metadata } from 'next';
import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';
import { faqAnswerPlainTextForSchema } from '@/lib/faq-plain-text';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PUBLIC_SITE_URL,
  SCHEMA_STATS,
  schemaDefaultPersonImageUrl,
} from '@/lib/schema-constants';
import { buildPageMetadata } from '@/utils/metadata';

export {
  buildPageMetadata,
  OG_SITE_NAME,
  withOgDescriptionSuffix,
} from '@/utils/metadata';

const SITE_URL_DEFAULT = SCHEMA_PUBLIC_SITE_URL;

/** Profil LinkedIn (locale FR) — source unique pour liens UI et sameAs */
export const LINKEDIN_PROFILE_URL = SCHEMA_LINKEDIN_PROFILE_URL;

export const SITE_CONFIG = {
  name: 'Laure Olivié',
  legalName: 'OFC Création d\'Entreprise',
  description:
    `Expert en formation IA pour le BTP : intelligence artificielle bâtiment et travaux publics, ChatGPT BTP pour artisans et conducteurs de travaux. Devis, appels d'offres, chantier — gain de temps, automatisation, productivité. Qualiopi, OPCO Constructys. Laure Olivié — +${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Île-de-France & France.`,
  url: SITE_URL_DEFAULT,
  linkedinProfileUrl: LINKEDIN_PROFILE_URL,
  email: SCHEMA_CONTACT.email,
  /** Numéro public (liens tel:) — laisser vide pour masquer le téléphone sur tout le site */
  phone: SCHEMA_CONTACT.phone,
  phoneDisplay: SCHEMA_CONTACT.phoneDisplay,
  siret: SCHEMA_CONTACT.siretFormatted,
  locale: 'fr_FR',
  geo: {
    country: SCHEMA_GEO.addressCountry,
    region: SCHEMA_GEO.addressRegion,
    city: SCHEMA_GEO.addressLocality,
    département: SCHEMA_GEO.departement,
    streetAddress: SCHEMA_GEO.streetAddress,
    postalCode: SCHEMA_GEO.postalCode,
    latitude: SCHEMA_GEO.latitude,
    longitude: SCHEMA_GEO.longitude,
  },
  keywords: [
    // Priorité haute — requêtes stratégiques
    'formation IA BTP',
    'formation ChatGPT entreprise BTP',
    'IA pour PME bâtiment',
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
    'https://share.google/kuzjL3D0CaVMgQS8i',
  /** Google Maps — siège (aligné sur geo.streetAddress / postalCode / city) */
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('6 Rue Henri Dunant, 78280 Guyancourt, France'),
  sameAs: [
    LINKEDIN_PROFILE_URL,
    SITE_URL_DEFAULT,
    'https://share.google/kuzjL3D0CaVMgQS8i',
  ],
  /** Nombre de professionnels formés — valeur unique pour cohérence NAP / biographie */
  statsPersonnesFormees: SCHEMA_STATS.personnesFormees,
} as const;

/** Indique si un numéro public est exposé (liens cliquables, JSON-LD telephone, etc.) */
export function siteHasPublicPhone(): boolean {
  return typeof SITE_CONFIG.phone === 'string' && SITE_CONFIG.phone.length > 0;
}

/** Suffixe « · 06 xx… » pour lignes de contact (vide si pas de téléphone public) */
export function sitePhoneDisplaySuffix(): string {
  return siteHasPublicPhone() ? ` · ${SITE_CONFIG.phoneDisplay}` : '';
}

/** Section thématique (Open Graph article:section / GEO) */
export const ARTICLE_SECTION_GEO = 'Formation IA BTP';

/** Date YYYY-MM-DD → ISO 8601 UTC pour les métadonnées article (Google / IA) */
export function dateToIso8601ForMeta(date: string): string {
  const d = new Date(`${date}T12:00:00+01:00`);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

/** Estimation du nombre de mots pour schema Article (GEO) */
export function estimateWordCountFromPlainText(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** Helper pour métadonnées de page avec Open Graph + Twitter (partages & GEO) */
export function createPageMetadata({
  title,
  description,
  path = '',
  keywords,
  openGraphType = 'website',
  article,
  image,
  appendAuthorSuffix = true,
  openGraphTitle,
  openGraphDescription,
  robots,
  alternatesLanguages,
  category,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /** article = pages formation / blog (meilleure sémantique pour les moteurs) */
  openGraphType?: 'website' | 'article';
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  image?: { url: string; width?: number; height?: number; alt?: string };
  appendAuthorSuffix?: boolean;
  openGraphTitle?: string;
  openGraphDescription?: string;
  robots?: Metadata['robots'];
  alternatesLanguages?: Record<string, string>;
  category?: string;
}): Metadata {
  const kw = keywords ? [...keywords] : [...SITE_CONFIG.keywords];
  return {
    ...buildPageMetadata({
      title,
      description,
      baseUrl: SITE_CONFIG.url,
      path,
      keywords: kw,
      ogType: openGraphType,
      article,
      image,
      appendAuthorSuffix,
      openGraphTitle,
      openGraphDescription,
      robots,
      alternatesLanguages,
      category,
    }),
    keywords: kw,
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
  /** Ex. « Avancé », « Professionnel » */
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

/**
 * Person (Laure Olivié) — JSON-LD global layout, @id #laure-olivie.
 * Données alignées sur schema-constants / SITE_CONFIG.
 */
export function getGlobalLayoutPersonJsonLd() {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}/#laure-olivie`,
    name: SITE_CONFIG.name,
    jobTitle: 'Formatrice IA & ChatGPT pour le BTP',
    description: `Formatrice IA spécialisée BTP. A formé ${formatProfessionalsTrainedCount()}+ professionnels du bâtiment. Certifiée Qualiopi.`,
    url: `${base}/a-propos`,
    image: schemaDefaultPersonImageUrl(),
    email: SCHEMA_CONTACT.email,
    ...(siteHasPublicPhone() ? { telephone: SITE_CONFIG.phone } : {}),
    worksFor: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SITE_CONFIG.legalName,
    },
    knowsAbout: [
      'Intelligence artificielle pour le BTP',
      'ChatGPT pour le bâtiment',
      'Formation professionnelle Qualiopi',
      'Devis BTP automatisés',
      "Appels d'offres BTP",
    ],
    sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
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
      "Organisme de formation : intelligence artificielle et ChatGPT pour le BTP, PME bâtiment et artisans. Automatisation administrative, IA devis bâtiment, IA gestion chantier. Certifié Qualiopi.",
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    ...(siteHasPublicPhone() ? { telephone: SITE_CONFIG.phone } : {}),
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
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        ...(siteHasPublicPhone() ? { telephone: SITE_CONFIG.phone } : {}),
        email: SITE_CONFIG.email,
        availableLanguage: ['French'],
        areaServed: 'FR',
      },
    ],
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
      "Formation IA BTP et ChatGPT entreprise : automatisation des tâches administratives, IA devis bâtiment, IA gestion chantier. Artisans, PME bâtiment, conducteurs de travaux. Guyancourt (78), Île-de-France et France.",
    url: SITE_CONFIG.url,
    ...(siteHasPublicPhone() ? { telephone: SITE_CONFIG.phone } : {}),
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
    hasMap: SITE_CONFIG.googleMapsUrl,
  };
}

/** Aligné recommandations Google / rich results FAQ */
export const FAQ_SCHEMA_MIN = 3;
export const FAQ_SCHEMA_MAX = 10;

/**
 * Schéma FAQPage pour GEO — aligné sur le corps de page (texte des réponses sans HTML).
 * Minimum 3 questions, maximum 10 (au-delà : découper en blocs thématiques sur d’autres pages).
 * Retourne `null` si moins de 3 paires valides (pas de JSON-LD FAQPage invalide).
 */
export function getFAQSchema(faq: ReadonlyArray<{ q: string; a: string }>) {
  const items = faq
    .map((item) => {
      const q = item.q.trim();
      const a = item.a.trim();
      if (!q || !a) return null;
      return { q, a };
    })
    .filter((item): item is { q: string; a: string } => item != null)
    .slice(0, FAQ_SCHEMA_MAX);

  if (items.length < FAQ_SCHEMA_MIN) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainTextForSchema(item.a),
      },
    })),
  };
}

/**
 * Extrait les paires Q/R des sections `type: 'faq'` (format « Question — Réponse » par ligne).
 * Utilisé pour JSON-LD FAQPage sur les articles blog.
 */
export function extractFaqPairsFromArticleSections(
  sections: ReadonlyArray<{
    type: string;
    content: string | string[] | unknown;
  }>
): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];
  const lineSep = /\s[—–-]\s/;
  for (const section of sections) {
    if (section.type !== 'faq') continue;
    const raw = section.content;
    const lines = Array.isArray(raw)
      ? raw.filter((x): x is string => typeof x === 'string')
      : typeof raw === 'string'
        ? [raw]
        : [];
    for (const line of lines) {
      const m = line.split(lineSep);
      if (m.length < 2) continue;
      const q = m[0]?.trim() ?? '';
      const a = m.slice(1).join(' ').trim();
      if (q && a) pairs.push({ q, a });
    }
  }
  return pairs;
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
  wordCount,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
  /** Optionnel — estimation pour rich results / IA */
  wordCount?: number;
}) {
  const pageUrl = `${SITE_CONFIG.url}${path}`;
  const imageUrl = image?.startsWith('http') ? image : image ? `${SITE_CONFIG.url}${image}` : `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`;
  const pubIso = dateToIso8601ForMeta(datePublished);
  const modIso = dateModified ? dateToIso8601ForMeta(dateModified) : pubIso;
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: pageUrl,
    datePublished: pubIso,
    dateModified: modIso,
    author: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: authorName,
      url: `${SITE_CONFIG.url}/a-propos/`,
      jobTitle: 'Formatrice IA & ChatGPT spécialisée BTP',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.legalName,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo-lo.svg`,
      },
    },
    image: { '@type': 'ImageObject', url: imageUrl, width: 1200, height: 630 },
    inLanguage: 'fr-FR',
    articleSection: ARTICLE_SECTION_GEO,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
    },
  };
  if (wordCount != null && wordCount > 0) {
    base.wordCount = wordCount;
  }
  return base;
}

/** Mots-clés de base pour JSON-LD BlogPosting (blog /blog/[slug]) — complétés par les mots-clés de l’article */
const BLOG_POSTING_DEFAULT_KEYWORDS = [
  'formation ia btp',
  'chatgpt btp',
  'intelligence artificielle bâtiment',
  'constructys formation ia',
] as const;

function mergeBlogPostingKeywords(articleKeywords?: string[]): string[] {
  const fromArticle = (articleKeywords ?? [])
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of [...BLOG_POSTING_DEFAULT_KEYWORDS, ...fromArticle]) {
    if (!seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
}

/**
 * Schéma schema.org `Article` pour `/blog/[slug]` (rich results / GEO).
 * Dates en ISO 8601 ; image URL absolue.
 */
export function buildBlogArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  imageUrl,
  wordCount,
  keywords,
}: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  imageUrl: string;
  wordCount?: number;
  keywords?: string[];
}): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const pageUrl = `${base}/blog/${slug}`;
  const pubIso = dateToIso8601ForMeta(datePublished);
  const modIso = dateToIso8601ForMeta(dateModified ?? datePublished);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: `${base}/a-propos`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/logo-lo.svg`,
      },
    },
    datePublished: pubIso,
    dateModified: modIso,
    image: imageUrl,
    url: pageUrl,
  };
  if (wordCount != null && wordCount > 0) {
    schema.wordCount = wordCount;
  }
  if (keywords?.length) {
    schema.keywords = keywords.join(', ');
  }
  return schema;
}

/**
 * Schéma BlogPosting pour les articles `/blog/[slug]` (remplace Article sur ces pages).
 * Dates en ISO 8601 ; image URL absolue.
 */
export function buildBlogPostingJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  imageUrl,
  keywords,
  wordCount,
}: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  imageUrl: string;
  keywords?: string[];
  wordCount?: number;
}): Record<string, unknown> {
  const pageUrl = `${SITE_CONFIG.url}/blog/${slug}`;
  const pubIso = dateToIso8601ForMeta(datePublished);
  const modIso = dateModified ? dateToIso8601ForMeta(dateModified) : pubIso;
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: imageUrl,
    datePublished: pubIso,
    dateModified: modIso,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      sameAs: LINKEDIN_PROFILE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo-lo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    articleSection: ARTICLE_SECTION_GEO,
    keywords: mergeBlogPostingKeywords(keywords),
    inLanguage: 'fr',
    isPartOf: {
      '@type': 'Blog',
      name: 'Formation IA BTP — Ressources et articles',
      url: `${SITE_CONFIG.url}/blog`,
    },
  };
  if (wordCount != null && wordCount > 0) {
    base.wordCount = wordCount;
  }
  return base;
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
    description: `Formatrice spécialisée en intelligence artificielle pour le BTP basée à Guyancourt (78). ${formatProfessionalsTrainedCount()} professionnels formés. Note moyenne ${SOCIAL_PROOF.AVERAGE_RATING}. 10 ans d'expérience en travaux publics et formation. Instructrice LinkedIn Learning. Certification Qualiopi. Réseau FFB, CSFE.`,
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
      `${formatProfessionalsTrainedCount()} professionnels formés (statistique officielle)`,
      `Note moyenne ${SOCIAL_PROOF.AVERAGE_RATING}`,
      '10 ans d\'expérience en formation professionnelle',
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: SOCIAL_PROOF.PROFESSIONALS_TRAINED,
      unitText: 'personnes formées',
    },
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    ...(siteHasPublicPhone() ? { telephone: SITE_CONFIG.phone } : {}),
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

/** URL absolue canonique du site pour un chemin (ex. `/blog` → https://www.laureolivie.fr/blog ; `/` → origine sans slash final). */
export function siteAbsoluteUrl(path: string): string {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  if (!path || path === '/') return base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export type BreadcrumbListItem = { name: string; url: string };

/** JSON-LD BreadcrumbList (URLs absolues dans `item`). */
export function buildBreadcrumbListJsonLd(items: BreadcrumbListItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Construit les entrées `{ name, url }` à partir de chemins relatifs (pour `<Breadcrumb />`). */
export function breadcrumbItemsFromPaths(items: { name: string; path: string }[]): BreadcrumbListItem[] {
  return items.map((it) => ({
    name: it.name,
    url: siteAbsoluteUrl(it.path),
  }));
}

/** Schéma BreadcrumbList (alias de `buildBreadcrumbListJsonLd` + chemins relatifs). */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return buildBreadcrumbListJsonLd(breadcrumbItemsFromPaths(items));
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
