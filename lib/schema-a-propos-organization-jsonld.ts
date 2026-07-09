/**
 * JSON-LD `Organization` — page /a-propos (extrait dédié, lié au nœud global `#organization`).
 */

import { buildOrganizationOfcSchemaNode } from '@/lib/schema-organization-global';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}/a-propos`;

export function getAProposOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildOrganizationOfcSchemaNode({
      organizationId: `${BASE}/#organization`,
      personId: `${PAGE_URL}#person`,
    }),
  };
}
