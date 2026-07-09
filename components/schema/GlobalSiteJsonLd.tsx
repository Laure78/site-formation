import { JsonLd } from '@/components/JsonLd';
import { buildGlobalSiteJsonLdGraph } from '@/lib/schema-global-site-graph';

/**
 * JSON-LD global — `@graph` Person + Organization (layout racine).
 * Remplace les blocs Person / Organization séparés pour une entité cohérente.
 */
export function GlobalSiteJsonLd() {
  return <JsonLd id="schema-global-site-graph" schema={buildGlobalSiteJsonLdGraph()} />;
}
