/**
 * Configuration SEO et GEO pour Laure Olivié / OFC Création d'Entreprise
 * Formation IA appliquée au bâtiment — France, Île-de-France, Guyancourt (Yvelines)
 */

import type { Metadata } from 'next';
import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';
import { faqAnswerPlainTextForSchema } from '@/lib/faq-plain-text';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
  SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PERSON_AFFILIATIONS,
  SCHEMA_PUBLIC_SITE_URL,
  SCHEMA_STATS,
  buildIdfAreaServedSchemaEntities,
  schemaDefaultPersonImageUrl,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
import { buildPageMetadata } from '@/utils/metadata';

export {
  buildPageMetadata,
  OG_SITE_NAME,
  withOgDescriptionSuffix,
  BRAND_TITLE_SUFFIX,
  SEO_TITLE_MAX_LENGTH,
  SEO_TITLE_SEGMENT_MAX_LENGTH,
  META_DESCRIPTION_MIN_LENGTH,
  META_DESCRIPTION_MAX_LENGTH,
  stripBrandSuffix,
  truncateForBrandedTitle,
  buildBrandedTitle,
  joinTitleSegments,
  assertBrandedTitleClean,
  assertMetaDescriptionLength,
  warnSeoMetadataDev,
} from '@/utils/metadata';

const SITE_URL_DEFAULT = SCHEMA_PUBLIC_SITE_URL;

/** Profil LinkedIn (locale FR) — source unique pour liens UI et sameAs */
export const LINKEDIN_PROFILE_URL = SCHEMA_LINKEDIN_PROFILE_URL;

export const SITE_CONFIG = {
  name: 'Laure Olivié',
  legalName: 'OFC Création d\'Entreprise',
  /** ≤ ~120 car. — le layout ajoute « Laure Olivié, formatrice IA appliquée au bâtiment. » (meta SERP totale ≈ 155 car.) */
  description:
    `Formation IA pour le BTP et formation IA appliquée au bâtiment en Île-de-France : Paris, 77–95. Formation IA travaux publics, ChatGPT, Qualiopi, Constructys. ${formatProfessionalsTrainedCount()}+ pros formés.`,
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
    'formation IA pour les pros du BTP',
    'formation ChatGPT entreprise BTP',
    'IA pour PME bâtiment',
    'formation IA PME BTP',
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
    'formation ChatGPT PME BTP',
    'IA pour PME BTP',
    'IA entreprise du bâtiment',
    'IA PME du bâtiment',
    'IA TPE bâtiment',
    'formation IA PME BTP',
    'formation IA entreprise bâtiment',
    'IA pour dirigeants BTP',
    // Longue traîne
    'comment utiliser ChatGPT dans une entreprise du bâtiment',
    'gagner du temps administratif BTP IA',
    'IA pour conducteur de travaux',
    'IA pour PME du bâtiment',
    // Géographie (SEO local / GEO)
    'formation IA Guyancourt',
    'formation IA Île-de-France',
    'formation IA Yvelines',
    'formation IA Paris',
    // Financement
    'OPCO Constructys',
    'formation Qualiopi BTP',
    'formation éligible à un financement OPCO',
    'financement possible selon éligibilité',
    'FFB formation IA',
    'IA acte de construire',
    'formation professionnels étanchéité BTP',
    'CSFE formation IA',
  ],
  /** Fiche Google Business Profile (avis, horaires, local SEO) */
  googleBusinessProfileUrl: SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
  /** Google Maps — siège (aligné sur geo.streetAddress / postalCode / city) */
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('6 Rue Henri Dunant, 78280 Guyancourt, France'),
  sameAs: [
    LINKEDIN_PROFILE_URL,
    SITE_URL_DEFAULT,
    SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
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
export const ARTICLE_SECTION_GEO = 'Formation IA appliquée au bâtiment';

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

export type BuildMetadataInput = {
  title: string;
  /** Titre HTML final sans template layout — segment ou titre déjà suffixé (nettoyé puis re-suffixé). */
  titleAbsolute?: string;
  description: string;
  /** Chemin absolu du site (ex. `/formation-ia-btp-ile-de-france`) — canonical auto-référencé. */
  path?: string;
  /** Ignoré — la meta keywords n’est plus émise (Google l’ignore). */
  keywords?: string[] | null;
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
  /** Meta description figée (articles, landings rédigées à la main). */
  descriptionFinal?: boolean;
  robots?: Metadata['robots'];
  alternatesLanguages?: Record<string, string>;
  category?: string;
};

/**
 * Helper SEO unique : title ≤ 60 car. avec suffixe « | Laure Olivié »,
 * description 150–160 (warning en dev), canonical auto-référencé depuis `path`.
 * Le title segment est tronqué AVANT le suffixe, jamais en plein mot.
 */
export function buildMetadata({
  title,
  titleAbsolute,
  description,
  path = '',
  keywords: _unusedKeywords,
  openGraphType = 'website',
  article,
  image,
  appendAuthorSuffix = false,
  openGraphTitle,
  openGraphDescription,
  descriptionFinal,
  robots,
  alternatesLanguages,
  category,
}: BuildMetadataInput): Metadata {
  void _unusedKeywords;
  return buildPageMetadata({
    title,
    titleAbsolute,
    description,
    baseUrl: SITE_CONFIG.url,
    path,
    ogType: openGraphType,
    article,
    image,
    appendAuthorSuffix,
    openGraphTitle,
    openGraphDescription,
    descriptionFinal,
    robots,
    alternatesLanguages,
    category,
  });
}

/** Alias — préférer `buildMetadata` pour les nouvelles pages. */
export function createPageMetadata(
  input: BuildMetadataInput,
): Metadata {
  return buildMetadata(input);
}

/** Schéma Course principal "Formation IA pour le BTP" (visible sur toutes les pages) */
export function getMainCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_CONFIG.url}/#course`,
    name: 'Formation IA pour les pros du BTP',
    description:
      "Formation ChatGPT entreprise BTP : IA pour devis, chantier, mémoires techniques et administratif. Public : PME bâtiment, professionnels du BTP, conducteurs de travaux, fédérations (FFB). Qualiopi, OPCO Constructys.",
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
      'IA pour PME du bâtiment',
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
  instructorName,
  teaches,
  courseCode,
  educationalLevel,
  timeRequired,
}: {
  name: string;
  description: string;
  path: string;
  /** @deprecated Conservé pour compatibilité — provider fixé à OFC Création d'Entreprise */
  providerName?: string;
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
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  return buildFormationFicheCourseJsonLd({
    name,
    description,
    path,
    organizationId: `${base}/#organization`,
    instructorId: instructorName ? undefined : `${base}/#person`,
    instructorName: instructorName ?? SITE_CONFIG.name,
    teaches,
    courseCode,
    educationalLevel,
    timeRequired,
  });
}

/**
 * Person (Laure Olivié) — JSON-LD global layout, @id #laure-olivie.
 * Données alignées sur schema-constants / SITE_CONFIG.
 */
export function getGlobalLayoutPersonJsonLd() {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    ...buildPersonLaureSchemaNode({
      personId: `${base}/#laure-olivie`,
      organizationId: `${base}/#organization`,
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
    image: `${SITE_CONFIG.url}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
    alternateName: [SITE_CONFIG.name, 'Laure Olivié Formation'],
    description:
      "Organisme de formation : intelligence artificielle et ChatGPT pour le BTP, PME bâtiment et professionnels du secteur. Automatisation administrative, IA devis bâtiment, IA gestion chantier. Certifié Qualiopi.",
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
    areaServed: buildIdfAreaServedSchemaEntities(),
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
    name: 'Laure Olivié — Formation IA appliquée au bâtiment',
    description:
      "Formation IA pour le BTP et ChatGPT entreprise : automatisation des tâches administratives, IA devis bâtiment, IA gestion chantier. Professionnels du BTP, PME bâtiment, conducteurs de travaux. Guyancourt (78), Île-de-France et France.",
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
    areaServed: buildIdfAreaServedSchemaEntities(),
    priceRange: '€€',
    image: `${SITE_CONFIG.url}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
    hasMap: SITE_CONFIG.googleMapsUrl,
  };
}

/** Aligné recommandations Google / rich results FAQ */
export const FAQ_SCHEMA_MIN = 3;
export const FAQ_SCHEMA_MAX = 24;

/**
 * Schéma FAQPage pour GEO — aligné sur le corps de page (texte des réponses sans HTML).
 * Minimum 3 questions, maximum `FAQ_SCHEMA_MAX` (au-delà : découper en blocs thématiques sur d’autres pages).
 * Retourne `null` si moins de 3 paires valides (pas de JSON-LD FAQPage invalide).
 */
export function getFAQSchema(faq: ReadonlyArray<{ q: string; a: string }>) {
  const items = faq
    .map((item) => {
      const q = item.q.trim();
      const a = item.a.trim();
      if (!q || !a) return null;
      const answerPlain = faqAnswerPlainTextForSchema(a).trim();
      if (!answerPlain) return null;
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
        text: faqAnswerPlainTextForSchema(item.a).trim(),
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
  const imageUrl = image?.startsWith('http') ? image : image ? `${SITE_CONFIG.url}${image}` : `${SITE_CONFIG.url}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`;
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
  'formation IA pour les pros du BTP',
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

/** sameAs auteur articles blog — LinkedIn + LinkedIn Learning (E-E-A-T). */
const BLOG_ARTICLE_AUTHOR_SAME_AS = [
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
] as const;

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
      jobTitle: 'Formatrice IA pour le BTP',
      worksFor: {
        '@type': 'Organization',
        name: SITE_CONFIG.legalName,
      },
      sameAs: [...BLOG_ARTICLE_AUTHOR_SAME_AS],
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      url: base,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/logo-lo.svg`,
      },
    },
    datePublished: pubIso,
    dateModified: modIso,
    image: imageUrl,
    /** URL canonique de la page article (GEO / rich results). */
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    url: pageUrl,
    inLanguage: 'fr',
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
/** Titre affiché dans le rich result (éviter dépassement SERP). */
const BLOG_POSTING_HEADLINE_MAX = 60;

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
  const baseRoot = SITE_CONFIG.url.replace(/\/$/, '');
  const pageUrl = `${baseRoot}/blog/${slug}`;
  const pubIso = dateToIso8601ForMeta(datePublished);
  const modIso = dateModified ? dateToIso8601ForMeta(dateModified) : pubIso;
  const headlineSafe =
    headline.length > BLOG_POSTING_HEADLINE_MAX
      ? `${headline.slice(0, BLOG_POSTING_HEADLINE_MAX - 1).trim()}…`
      : headline;
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: headlineSafe,
    description,
    image: imageUrl,
    datePublished: pubIso,
    dateModified: modIso,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: `${baseRoot}/a-propos`,
      jobTitle: 'Formatrice IA pour le BTP',
      worksFor: {
        '@type': 'Organization',
        name: SITE_CONFIG.legalName,
      },
      sameAs: LINKEDIN_PROFILE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseRoot}/logo-lo.svg`,
      },
    },
    mainEntityOfPage: pageUrl,
    articleSection: ARTICLE_SECTION_GEO,
    keywords: mergeBlogPostingKeywords(keywords),
    inLanguage: 'fr',
    isPartOf: {
      '@type': 'Blog',
      name: 'Formation IA appliquée au bâtiment — Ressources et articles',
      url: `${baseRoot}/blog`,
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
    image: `${SITE_CONFIG.url}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
    jobTitle: 'Formatrice IA spécialisée BTP',
    alternateName: ['Laure Olivié', 'Laure Olivie'],
    description: `Formatrice IA spécialisée BTP depuis 2022, basée à Guyancourt (78). ${formatProfessionalsTrainedCount()} professionnels formés. Note moyenne ${SOCIAL_PROOF.AVERAGE_RATING}. 10 ans de terrain BTP (conductrice de travaux). Instructrice LinkedIn Learning. Certification Qualiopi. Réseau FFB Grand Paris, CSFE, UMB-FFB.`,
    knowsAbout: [
      'Formation IA pour le BTP',
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
        description: 'Organisme de formation certifié Qualiopi (Certifopac n° 520911-1, validité 16/01/2025–15/01/2028) pour les actions de formation professionnelle · SIRET 905 244 281 00010 · NDA 11788515078',
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
        '@id': `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.legalName,
        url: SITE_CONFIG.url,
      },
      ...SCHEMA_PERSON_AFFILIATIONS.map((org) => ({
        '@type': 'Organization' as const,
        name: org.name,
        ...(org.url ? { url: org.url } : {}),
      })),
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Formation professionnelle BTP et travaux publics',
      description: '10 ans de terrain BTP (conduite de chantier et travaux publics)',
    },
    award: [
      'Formatrice LinkedIn Learning 2024',
      `${formatProfessionalsTrainedCount()} professionnels formés (statistique officielle)`,
      `Note moyenne ${SOCIAL_PROOF.AVERAGE_RATING}`,
      '10 ans de terrain BTP · formatrice IA spécialisée BTP depuis 2022',
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
      SCHEMA_LINKEDIN_PROFILE_URL,
      SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
      SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
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
    name: 'Catalogue des formations IA pour les pros du BTP',
    description:
      'Formations IA pour dirigeants et équipes du BTP (bâtiment et travaux publics). Devis, appels d\'offres, ChatGPT. financement possible selon éligibilité.',
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
