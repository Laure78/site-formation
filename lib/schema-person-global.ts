import {
  SCHEMA_PERSON_KNOWS_ABOUT,
  SCHEMA_PERSON_LAURE,
  schemaHeaderPersonImageUrl,
} from '@/lib/schema-constants';
import { SCHEMA_SITE_ORG, sitePersonProofDescription } from '@/lib/schema-site-proof';
import {
  SITE_AREA_SERVED_LABEL,
  SITE_PERSON_JOB_TITLE,
  buildSiteAProposPersonSchemaNode,
  sitePersonSchemaSameAs,
  siteSchemaOrganizationId,
  siteSchemaPersonId,
} from '@/lib/site-config';

export type PersonLaureSchemaNodeOptions = {
  /** `@id` du nœud Person (défaut : `{base}/#laure-olivie`). */
  personId?: string;
  /** URL canonique de la page Person (défaut : `/a-propos`). */
  pageUrl?: string;
  /** Référence Organization par `@id` (défaut : `{base}/#organization`). */
  organizationId?: string;
  /** Surcharge description (sinon SCHEMA_PERSON_LAURE + PROOF). */
  description?: string;
};

/**
 * Nœud JSON-LD `Person` — Laure Olivié.
 * Doctrine : formatrice IA · expérience BTP (source : anneesExperienceBTP) · présentiel IDF.
 * Injecté via layout (`GlobalSiteJsonLd`) et page `/a-propos`.
 */
export function buildPersonLaureSchemaNode(
  options: PersonLaureSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_SITE_ORG.url;
  const personId = options.personId ?? siteSchemaPersonId(base);
  const pageUrl = options.pageUrl ?? `${base}/a-propos`;
  const organizationId = options.organizationId ?? siteSchemaOrganizationId(base);
  return {
    ...buildSiteAProposPersonSchemaNode(base),
    '@id': personId,
    description:
      options.description ?? sitePersonProofDescription(SCHEMA_PERSON_LAURE.description),
    url: pageUrl,
    image: schemaHeaderPersonImageUrl(),
    jobTitle: SITE_PERSON_JOB_TITLE,
    worksFor: {
      '@id': organizationId,
      '@type': 'Organization',
      name: SCHEMA_SITE_ORG.legalName,
    },
    knowsAbout: [...SCHEMA_PERSON_KNOWS_ABOUT],
    sameAs: [...sitePersonSchemaSameAs()],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: SITE_AREA_SERVED_LABEL,
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
