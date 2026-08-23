/**
 * Presets partagés — `<StatCallout>` / `<CountUp>` (source unique avec `lib/constants.ts`).
 */
import { getStatsFreshnessLabel, siteStats } from '@/lib/constants';
import type { StatCountUpValue } from '@/components/readability/stat-callout-types';

export { getStatsFreshnessLabel };

/** Compteur animé — note satisfaction Qualiopi (sur 5). */
export const COUNT_UP_RATING: StatCountUpValue = {
  to: siteStats.noteMoyenneValeur,
  decimals: 2,
  suffix: '/5',
};

/** @deprecated Utiliser COUNT_UP_RATING — le taux en % a été retiré (indicateur unique : note moyenne). */
export const COUNT_UP_SATISFACTION: StatCountUpValue = COUNT_UP_RATING;
