import { buildLayoutRootJsonLdGraph } from '@/lib/schema-layout-root-graph';

/**
 * JSON-LD `@graph` global — EducationalOrganization + Person (layout racine).
 * `@id` : `#organization` · `#laure-olivie`
 */
export function buildGlobalSiteJsonLdGraph(): Record<string, unknown> {
  return buildLayoutRootJsonLdGraph();
}
