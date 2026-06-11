/**
 * Presets partagés — `<StatCallout>` / `<CountUp>` (source unique avec `lib/constants.ts`).
 */
import { SOCIAL_PROOF } from '@/lib/constants';
import type { StatCountUpValue } from '@/components/readability/stat-callout-types';

export const STATS_FRESHNESS_LABEL = 'au 17 avril 2026';

export const COUNT_UP_PROS: StatCountUpValue = { to: SOCIAL_PROOF.PROFESSIONALS_TRAINED };

export const COUNT_UP_PROS_PLUS: StatCountUpValue = {
  to: SOCIAL_PROOF.PROFESSIONALS_TRAINED,
  prefix: '+',
};

export const COUNT_UP_RATING: StatCountUpValue = {
  to: SOCIAL_PROOF.AVERAGE_RATING_VALUE,
  decimals: 2,
  suffix: '/5',
};

export const COUNT_UP_SATISFACTION: StatCountUpValue = {
  to: SOCIAL_PROOF.SATISFACTION_PERCENT,
  suffix: ' %',
};
