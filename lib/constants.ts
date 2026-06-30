/**
 * Chiffres publics OFC — source unique (affichage, compteurs, JSON-LD).
 *
 * @see SCHEMA_STATS dans lib/schema-constants.ts
 */
export const siteStats = {
  /** Nombre officiel de personnes / professionnels formés. */
  personnesFormees: 1592,
  /** Note moyenne affichée (format FR). */
  noteMoyenneAffichee: '4,85/5',
  /** Valeur numérique pour `<CountUp>` et schémas. */
  noteMoyenneValeur: 4.85,
  /** Taux de satisfaction affiché (bandeau CTA accueil). */
  satisfactionPercent: 98,
} as const;

/** Mention de fraîcheur sous les compteurs (sans date au jour près). */
export function getStatsFreshnessLabel(referenceYear?: number): string {
  const year = referenceYear ?? new Date().getFullYear();
  return `chiffres à jour ${year}`;
}

/**
 * @deprecated Préférer `siteStats` — conservé pour compatibilité imports existants.
 */
export const SOCIAL_PROOF = {
  PROFESSIONALS_TRAINED: siteStats.personnesFormees,
  AVERAGE_RATING: siteStats.noteMoyenneAffichee,
  AVERAGE_RATING_VALUE: siteStats.noteMoyenneValeur,
  SATISFACTION_PERCENT: siteStats.satisfactionPercent,
} as const;

/** Affichage du nombre de personnes formées avec espaces (ex. 1 592). */
export function formatPersonnesFormeesCount(
  value: number = siteStats.personnesFormees,
): string {
  return value.toLocaleString('fr-FR');
}

/** @deprecated Alias — utiliser `formatPersonnesFormeesCount`. */
export function formatProfessionalsTrainedCount(
  value: number = siteStats.personnesFormees,
): string {
  return formatPersonnesFormeesCount(value);
}
