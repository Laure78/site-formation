/**
 * JSON-LD `Person` — page /a-propos (extrait dédié rich results / IA).
 * Coordonnées depuis `lib/schema-constants.ts` — ne pas dupliquer en dur.
 */

import { getLaureOlivieSchemaPersonDescription } from '@/lib/laure-olivie-profile';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}/a-propos`;

export function getAProposPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildPersonLaureSchemaNode({
      personId: `${PAGE_URL}#person`,
      pageUrl: PAGE_URL,
      organizationId: `${BASE}/#organization`,
    }),
    description: getLaureOlivieSchemaPersonDescription(),
  };
}
