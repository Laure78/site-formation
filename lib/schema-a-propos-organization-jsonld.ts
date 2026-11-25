/**
 * JSON-LD `Organization` — page /a-propos (extrait dédié, lié au nœud global `#organization`).
 * @deprecated Préférer `getAProposUnifiedJsonLd()` — ne plus injecter en parallèle du unified graph.
 */

import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { buildSchemaOrganizationReference } from '@/lib/site-config';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Référence layout — entité complète dans `GlobalSiteJsonLd` uniquement. */
export function getAProposOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildSchemaOrganizationReference(BASE),
  };
}
