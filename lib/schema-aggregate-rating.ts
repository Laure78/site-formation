import { indicateursResultats } from '@/lib/data/indicateurs-resultats';

/**
 * Note moyenne questionnaires de satisfaction à chaud — OFC (indicateur 2 Qualiopi).
 * Source : `lib/data/indicateurs-resultats.ts`.
 */
export const SCHEMA_AGGREGATE_RATING_VALUE = String(indicateursResultats.noteSatisfaction);

/** Nombre de questionnaires consolidés sur la période de référence. */
export const SCHEMA_AGGREGATE_REVIEW_COUNT = indicateursResultats.nombreRepondants;

/** Bloc AggregateRating Schema.org — aligné questionnaires satisfaction à chaud. */
export function buildSchemaAggregateRating(): Record<string, string | number> {
  return {
    '@type': 'AggregateRating',
    ratingValue: indicateursResultats.noteSatisfaction,
    bestRating: 5,
    worstRating: 1,
    reviewCount: indicateursResultats.nombreRepondants,
  };
}
