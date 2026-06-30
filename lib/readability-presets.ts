/**
 * Presets partagés — `<StatCallout>` / `<CountUp>` (source unique avec `lib/constants.ts`).
 */
import { getStatsFreshnessLabel, siteStats } from '@/lib/constants';
import type { StatCountUpValue } from '@/components/readability/stat-callout-types';

export { getStatsFreshnessLabel };

export const COUNT_UP_PROS: StatCountUpValue = { to: siteStats.personnesFormees };

export const COUNT_UP_PROS_PLUS: StatCountUpValue = {
  to: siteStats.personnesFormees,
  prefix: '+',
};

export const COUNT_UP_RATING: StatCountUpValue = {
  to: siteStats.noteMoyenneValeur,
  decimals: 2,
  suffix: '/5',
};

export const COUNT_UP_SATISFACTION: StatCountUpValue = {
  to: siteStats.satisfactionPercent,
  suffix: ' %',
};
