import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_KNOWS_ABOUT,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PERSON_SAME_AS,
  SCHEMA_PUBLIC_SITE_URL,
  buildPersonAffiliationSchemaNodes,
  schemaHeaderPersonImageUrl,
} from '@/lib/schema-constants';
import { siteHasPublicPhone } from '@/lib/seo';

export type PersonLaureSchemaNodeOptions = {
  /** `@id` du nœud Person (défaut : `{base}/#person`). */
  personId?: string;
  /** URL canonique de la page Person (défaut : `/a-propos`). */
  pageUrl?: string;
  /** Référence Organization par `@id` (défaut : `{base}/#organization`). */
  organizationId?: string;
  /** Inclure `affiliation` (fédérations BTP). */
  includeAffiliation?: boolean;
};

/**
 * Nœud JSON-LD `Person` — Laure Olivié.
 * Réutilisable dans le `@graph` global (layout) et les pages dédiées (/a-propos).
 */
export function buildPersonLaureSchemaNode(
  options: PersonLaureSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const personId = options.personId ?? `${base}/#person`;
  const pageUrl = options.pageUrl ?? `${base}/a-propos`;
  const organizationId = options.organizationId ?? `${base}/#organization`;
  const includeAffiliation = options.includeAffiliation ?? true;

  return {
    '@type': 'Person',
    '@id': personId,
    name: SCHEMA_PERSON_LAURE.name,
    url: pageUrl,
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
      '@id': organizationId,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    ...(includeAffiliation ? { affiliation: buildPersonAffiliationSchemaNodes() } : {}),
    knowsAbout: [...SCHEMA_PERSON_KNOWS_ABOUT],
    sameAs: [...SCHEMA_PERSON_SAME_AS],
  };
}

/** @deprecated Préférer `buildGlobalSiteJsonLdGraph()` — conservé pour imports existants. */
export function buildGlobalPersonLaureJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildPersonLaureSchemaNode(),
  };
}
