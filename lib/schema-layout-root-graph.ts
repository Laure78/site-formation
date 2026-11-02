/**
 * JSON-LD `@graph` racine (layout) — EducationalOrganization.
 * Identité : `SITE` (`lib/site-config.ts`) · logo : `schema-constants`.
 */
import { SCHEMA_PUBLIC_SITE_URL, schemaLogoUrl } from '@/lib/schema-constants';
import {
  buildSiteAProposPersonSchemaNode,
  buildSiteLayoutEducationalOrganizationNode,
} from '@/lib/site-config';

/** `@graph` injecté dans `app/layout.tsx` via `<GlobalSiteJsonLd />`. */
export function buildLayoutRootJsonLdGraph(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildSiteLayoutEducationalOrganizationNode(base, schemaLogoUrl()),
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
