import { SOCIAL_PROOF } from '@/lib/constants';

/**
 * Note moyenne questionnaires de satisfaction post-formation OFC (4,85/5 affiché).
 * Format Schema.org : point décimal, sans suffixe « /5 ».
 */
export const SCHEMA_AGGREGATE_RATING_VALUE = '4.85';

/**
 * AggregateRating Schema.org — aligné pages métier (`FormationMetierJsonLd`, `CourseSchema`).
 *
 * `ratingCount` = nombre de réponses aux questionnaires de fin de formation
 * (source : `siteStats.personnesFormees` via `SOCIAL_PROOF.PROFESSIONALS_TRAINED`).
 * Ne pas confondre avec le nombre d’avis publics Google Business Profile.
 */
export function buildSchemaAggregateRating(): Record<string, string | number> {
  return {
    '@type': 'AggregateRating',
    ratingValue: SCHEMA_AGGREGATE_RATING_VALUE,
    bestRating: '5',
    worstRating: '1',
    ratingCount: String(SOCIAL_PROOF.PROFESSIONALS_TRAINED),
  };
}
