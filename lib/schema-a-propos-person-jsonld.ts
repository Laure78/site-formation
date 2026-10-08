/**
 * JSON-LD `Person` — page /a-propos (extrait dédié).
 * @deprecated Préférer `getAProposUnifiedJsonLd()` (graph unique) + Person layout `#laure-olivie`.
 * Conservé pour imports éventuels / tests — ne plus injecter en parallèle du unified graph.
 */

import { getAProposPagePersonDescription } from '@/lib/a-propos-page-config';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}/a-propos`;

export function getAProposPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildPersonLaureSchemaNode({
      personId: `${BASE}/#laure-olivie`,
      pageUrl: PAGE_URL,
      organizationId: `${BASE}/#organization`,
      affiliationsScope: 'a-propos',
    }),
    description: getAProposPagePersonDescription(),
  };
}
