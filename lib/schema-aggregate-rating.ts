import { QUALIOPI_STATS } from '@/config/qualiopi';

/**
 * Note moyenne questionnaires de satisfaction post-formation OFC.
 * Format Schema.org : point décimal, sans suffixe « /5 ».
 *
 * @deprecated Ne plus injecter dans le JSON-LD sans un tableau `review[]`
 * d’avis individuels vérifiables (politique Google Rich Results).
 * Les chiffres restent affichés en clair sur le site (+ méthodologie Qualiopi).
 * Conservé pour une éventuelle option B (avis Google Business documentés).
 */
export const SCHEMA_AGGREGATE_RATING_VALUE = String(QUALIOPI_STATS.NOTE_MOYENNE_VALEUR);

/**
 * @deprecated Voir commentaire ci-dessus — ne plus appeler dans les schémas publics.
 */
export function buildSchemaAggregateRating(): Record<string, string | number> {
  return {
    '@type': 'AggregateRating',
    ratingValue: SCHEMA_AGGREGATE_RATING_VALUE,
    bestRating: '5',
    worstRating: '1',
    ratingCount: String(QUALIOPI_STATS.NB_REPONDANTS),
  };
}
