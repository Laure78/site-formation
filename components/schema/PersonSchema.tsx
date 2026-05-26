import { JsonLd } from '@/components/JsonLd';
import { buildGlobalPersonLaureJsonLd } from '@/lib/schema-person-global';

/**
 * JSON-LD `Person` (Laure Olivié) — layout global (`<head>`).
 * `@id` partagé (`{base}/#person`) avec FormationMetierJsonLd pour fusion d'entité.
 */
export function PersonSchema() {
  return <JsonLd id="schema-person-global" schema={buildGlobalPersonLaureJsonLd()} />;
}
