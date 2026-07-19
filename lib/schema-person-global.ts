import {
  SCHEMA_CONTACT,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_KNOWS_ABOUT,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PERSON_SAME_AS,
  SCHEMA_PUBLIC_SITE_URL,
  buildPersonAffiliationSchemaNodes,
  schemaHeaderPersonImageUrl,
} from '@/lib/schema-constants';

export type PersonLaureSchemaNodeOptions = {
  /** `@id` du nœud Person (défaut : `{base}/#laure-olivie`). */
  personId?: string;
  /** URL canonique de la page Person (défaut : `/a-propos`). */
  pageUrl?: string;
  /** Référence Organization par `@id` (défaut : `{base}/#organization`). */
  organizationId?: string;
};

/**
 * Nœud JSON-LD `Person` — Laure Olivié.
 * Doctrine : formatrice IA depuis 2022 · 10 ans de terrain BTP.
 * Affiliation : OFC + FFB Grand Paris + CSFE + UMB-FFB · sameAs LinkedIn / LinkedIn Learning / Google.
 * Injecté une seule fois via layout (`GlobalSiteJsonLd` → `#laure-olivie`).
 */
export function buildPersonLaureSchemaNode(
  options: PersonLaureSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const personId = options.personId ?? `${base}/#laure-olivie`;
  const pageUrl = options.pageUrl ?? `${base}/a-propos`;
  const organizationId = options.organizationId ?? `${base}/#organization`;

  return {
    '@type': 'Person',
    '@id': personId,
    name: SCHEMA_PERSON_LAURE.name,
    jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
    description:
      'Formatrice IA (ChatGPT, Claude AI) pour le BTP depuis 2022, après 10 ans de terrain comme conductrice de travaux. Instructrice LinkedIn Learning.',
    url: pageUrl,
    image: schemaHeaderPersonImageUrl(),
    email: SCHEMA_CONTACT.email,
    worksFor: { '@id': organizationId, '@type': 'Organization', name: SCHEMA_ORGANIZATION_OFC.name },
    affiliation: [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SCHEMA_ORGANIZATION_OFC.name,
        url: base,
      },
      ...buildPersonAffiliationSchemaNodes(),
    ],
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
