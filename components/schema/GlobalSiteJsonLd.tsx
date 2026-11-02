import { JsonLd } from '@/components/JsonLd';
import { buildGlobalSiteJsonLdGraph } from '@/lib/schema-global-site-graph';

/**
 * JSON-LD global (Server Component — `<script type="application/ld+json">` via `JsonLd`).
 * `@graph` : EducationalOrganization (#organization) + Person (#laure-olivie) — `lib/site-config.ts`.
 */
export function GlobalSiteJsonLd() {
  return <JsonLd id="schema-global-site-graph" schema={buildGlobalSiteJsonLdGraph()} />;
}
