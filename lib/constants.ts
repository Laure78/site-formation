/**
 * Constantes métier partagées (preuve sociale, chiffres officiels OFC).
 * Aligné sur les schémas (schema-constants) — une seule valeur à jour.
 */

export const SOCIAL_PROOF = {
  PROFESSIONALS_TRAINED: 1592,
  /** Note moyenne affichée côté marketing (FR). */
  AVERAGE_RATING: '4,85/5',
} as const;

/** Affichage du nombre de professionnels formés avec espaces (ex. 1 592). */
export function formatProfessionalsTrainedCount(
  value: number = SOCIAL_PROOF.PROFESSIONALS_TRAINED
): string {
  return value.toLocaleString('fr-FR');
}
