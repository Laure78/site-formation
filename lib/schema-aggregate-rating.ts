import { QUALIOPI_STATS } from '@/config/qualiopi';

/**
 * Note moyenne questionnaires de satisfaction post-formation OFC.
 * Format Schema.org : point décimal, sans suffixe « /5 ».
 */
export const SCHEMA_AGGREGATE_RATING_VALUE = String(QUALIOPI_STATS.NOTE_MOYENNE_VALEUR);

/**
 * AggregateRating Schema.org — aligné pages métier (`FormationMetierJsonLd`, `CourseSchema`).
 * `ratingCount` = nombre de répondants aux questionnaires (source : config/qualiopi.ts).
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
