import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { buildOrganizationOfcSchemaNode } from '@/lib/schema-organization-global';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';

/**
 * JSON-LD `@graph` global — Organization + Person (layout racine).
 * `@id` : `#organization` · `#laure-olivie`
 */
export function buildGlobalSiteJsonLdGraph(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const organizationId = `${base}/#organization`;
  const personId = `${base}/#laure-olivie`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationOfcSchemaNode({ organizationId, personId }),
      buildPersonLaureSchemaNode({ personId, organizationId }),
    ],
  };
}
