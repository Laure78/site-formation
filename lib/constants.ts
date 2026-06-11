/**
 * Constantes métier partagées (preuve sociale, chiffres officiels OFC).
 * Source unique pour l’affichage et les schémas — ne pas dupliquer ailleurs.
 *
 * @see SCHEMA_STATS dans lib/schema-constants.ts
 */
export const SOCIAL_PROOF = {
  /** Nombre officiel de professionnels formés (aligné JSON-LD, biographies, « Pour qui »). */
  PROFESSIONALS_TRAINED: 1592,
  /** Note moyenne de satisfaction affichée (format FR, ex. cartes accueil, FFB). */
  AVERAGE_RATING: '4,85/5',
  /** Valeur numérique pour `<CountUp>` et schémas. */
  AVERAGE_RATING_VALUE: 4.85,
  /** Taux de satisfaction affiché (bandeau CTA accueil). */
  SATISFACTION_PERCENT: 98,
} as const;

/** Affichage du nombre de professionnels formés avec espaces (ex. 1 592). */
export function formatProfessionalsTrainedCount(
  value: number = SOCIAL_PROOF.PROFESSIONALS_TRAINED
): string {
  return value.toLocaleString('fr-FR');
}
