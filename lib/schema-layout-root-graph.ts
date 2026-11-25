/**
 * JSON-LD `@graph` racine (layout) — EducationalOrganization.
 * Identité : `SITE` (`lib/site-config.ts`) · logo : `schema-constants`.
 */
import {
  SCHEMA_PUBLIC_SITE_URL,
  buildIdfAreaServedSchemaEntities,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import {
  buildSiteAProposPersonSchemaNode,
  buildSiteLayoutEducationalOrganizationNode,
} from '@/lib/site-config';

/** Nœud Organization layout — IDF (région + 8 départements), Qualiopi, NAP Paris 12e. */
export function buildLayoutEducationalOrganizationJsonLdNode(
  siteUrl: string = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, ''),
): Record<string, unknown> {
  const base = siteUrl.replace(/\/$/, '');
  return {
    ...buildSiteLayoutEducationalOrganizationNode(base, schemaLogoUrl()),
    areaServed: buildIdfAreaServedSchemaEntities(),
  };
}

/** `@graph` injecté dans `app/layout.tsx` via `<GlobalSiteJsonLd />`. */
export function buildLayoutRootJsonLdGraph(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildLayoutEducationalOrganizationJsonLdNode(base),
      buildSiteAProposPersonSchemaNode(base),
    ],
  };
}

/** @deprecated — Person définie sur /a-propos (`buildSiteAProposPersonSchemaNode`). */
export function buildLayoutEducationalOrganizationNode(
  organizationId: string,
  personId: string,
): Record<string, unknown> {
  void organizationId;
  void personId;
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return buildSiteLayoutEducationalOrganizationNode(base, schemaLogoUrl());
}

/** @deprecated — Person définie sur /a-propos. */
export function buildLayoutPersonNode(
  personId: string,
  organizationId: string,
): Record<string, unknown> {
  void personId;
  void organizationId;
  return {};
}
