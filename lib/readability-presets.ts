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

/** Hero accueil — compteur jusqu'à 1 500, suffixe « + » statique. */
export const COUNT_UP_PROS_PLUS_SUFFIX: StatCountUpValue = {
  to: siteStats.personnesFormees,
  suffix: '+',
};

export const COUNT_UP_RATING: StatCountUpValue = {
  to: siteStats.noteMoyenneValeur,
  decimals: 2,
  suffix: '/5',
};

/** @deprecated Utiliser COUNT_UP_RATING — le taux en % a été retiré (indicateur unique : note moyenne). */
export const COUNT_UP_SATISFACTION: StatCountUpValue = COUNT_UP_RATING;
