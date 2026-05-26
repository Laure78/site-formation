import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_KNOWS_ABOUT,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
  schemaHeaderPersonImageUrl,
} from '@/lib/schema-constants';
import { siteHasPublicPhone } from '@/lib/seo';

/**
 * JSON-LD `Person` global — Laure Olivié (fondatrice OFC).
 *
 * Injecté une fois dans le `<head>` du layout racine pour cimenter l'entité Person
 * sur toutes les pages. `@id` partagé avec FormationMetierJsonLd
 * (`{base}/#person`) pour que Google fusionne en une seule entité.
 *
 * Données sourcées exclusivement depuis `lib/schema-constants.ts`
 * (règle projet : pas de hardcode NAP / identité dans les schémas).
 */
export function buildGlobalPersonLaureJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: SCHEMA_PERSON_LAURE.name,
    url: base,
    image: schemaHeaderPersonImageUrl(),
    jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
    email: SCHEMA_CONTACT.email,
    ...(siteHasPublicPhone() ? { telephone: SCHEMA_CONTACT.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      addressRegion: SCHEMA_GEO.addressRegion,
      postalCode: SCHEMA_GEO.postalCode,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    worksFor: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    knowsAbout: [...SCHEMA_PERSON_KNOWS_ABOUT],
    sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
  };
}
