import {
  SCHEMA_CONTACT,
  SCHEMA_PERSON_AFFILIATIONS,
  SCHEMA_PERSON_AFFILIATIONS_A_PROPOS,
  SCHEMA_PERSON_KNOWS_ABOUT,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PERSON_SAME_AS,
  buildPersonAffiliationSchemaNodes,
  schemaHeaderPersonImageUrl,
} from '@/lib/schema-constants';
import { SCHEMA_SITE_ORG, sitePersonProofDescription } from '@/lib/schema-site-proof';

export type PersonLaureSchemaNodeOptions = {
  /** `@id` du nœud Person (défaut : `{base}/#laure-olivie`). */
  personId?: string;
  /** URL canonique de la page Person (défaut : `/a-propos`). */
  pageUrl?: string;
  /** Référence Organization par `@id` (défaut : `{base}/#organization`). */
  organizationId?: string;
  /** Affiliations : toutes (layout) ou noyau FFB / CSFE / UMB-FFB (/a-propos). */
  affiliationsScope?: 'all' | 'a-propos';
  /** Surcharge description (sinon SCHEMA_PERSON_LAURE + PROOF). */
  description?: string;
};

/**
 * Nœud JSON-LD `Person` — Laure Olivié.
 * Doctrine : formatrice IA · 10 ans terrain BTP · présentiel IDF.
 * Injecté via layout (`GlobalSiteJsonLd`) et page `/a-propos`.
 */
export function buildPersonLaureSchemaNode(
  options: PersonLaureSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_SITE_ORG.url;
  const personId = options.personId ?? `${base}/#laure-olivie`;
  const pageUrl = options.pageUrl ?? base;
  const organizationId = options.organizationId ?? `${base}/#organization`;
  const affiliations =
    options.affiliationsScope === 'a-propos'
      ? SCHEMA_PERSON_AFFILIATIONS_A_PROPOS
      : SCHEMA_PERSON_AFFILIATIONS;

  return {
    '@type': 'Person',
    '@id': personId,
    name: SCHEMA_SITE_ORG.personName,
    jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
    description:
      options.description ?? sitePersonProofDescription(SCHEMA_PERSON_LAURE.description),
    url: pageUrl,
    image: schemaHeaderPersonImageUrl(),
    email: SCHEMA_SITE_ORG.email,
    worksFor: {
      '@type': 'Organization',
      '@id': organizationId,
      name: SCHEMA_SITE_ORG.legalName,
    },
    affiliation: buildPersonAffiliationSchemaNodes(affiliations),
    knowsAbout: [...SCHEMA_PERSON_KNOWS_ABOUT],
    sameAs: [...SCHEMA_PERSON_SAME_AS],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Île-de-France',
    },
  };
}

/** @deprecated Préférer `buildGlobalSiteJsonLdGraph()` — conservé pour imports existants. */
export function buildGlobalPersonLaureJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildPersonLaureSchemaNode(),
  };
}
