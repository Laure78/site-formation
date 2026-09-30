/**
 * JSON-LD @graph (legacy) — ne plus injecter sur l’accueil.
 * Organization / Person : déclarés une fois dans le layout (`#organization`, `#laure-olivie`).
 * @deprecated Préférer `buildHomeUnifiedGraphJsonLd()` + `GlobalSiteJsonLd`.
 */
import {
  SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

export const HOME_PAGE_GRAPH_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${BASE}/#webpage-legacy`,
      url: BASE,
      name: 'Formation IA pour le BTP',
      publisher: { '@id': `${BASE}/#organization` },
      about: { '@id': `${BASE}/#laure-olivie` },
    },
  ],
} as const;

/** Conservé pour imports éventuels — les sameAs Person live dans le layout. */
export const HOME_PAGE_PERSON_SAME_AS = [
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
] as const;
