/**
 * Chiffres publics OFC — source unique (affichage, compteurs, JSON-LD).
 * Les indicateurs Qualiopi sont centralisés dans config/qualiopi.ts.
 */
import { QUALIOPI_STATS } from '@/config/qualiopi';

export const siteStats = {
  personnesFormees: QUALIOPI_STATS.NB_FORMES,
  noteMoyenneAffichee: QUALIOPI_STATS.NOTE_MOYENNE,
  noteMoyenneValeur: QUALIOPI_STATS.NOTE_MOYENNE_VALEUR,
} as const;

/** Mention de fraîcheur sous les compteurs (sans date au jour près). */
export function getStatsFreshnessLabel(referenceYear?: number): string {
  const year = referenceYear ?? new Date().getFullYear();
  return `chiffres à jour ${year}`;
}

/** @deprecated Préférer `siteStats` — conservé pour compatibilité imports existants. */
export const SOCIAL_PROOF = {
  PROFESSIONALS_TRAINED: siteStats.personnesFormees,
  AVERAGE_RATING: siteStats.noteMoyenneAffichee,
  AVERAGE_RATING_VALUE: siteStats.noteMoyenneValeur,
} as const;

export function formatPersonnesFormeesCount(value: number = siteStats.personnesFormees): string {
  return value.toLocaleString('fr-FR');
}

/** @deprecated Alias — utiliser `formatPersonnesFormeesCount`. */
export function formatProfessionalsTrainedCount(value: number = siteStats.personnesFormees): string {
  return formatPersonnesFormeesCount(value);
}
