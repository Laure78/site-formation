/**
 * Tarifs HT par participant — NIV-01, NIV-09 et parcours fédérations (pas de forfait groupe).
 */
import { formatNumberFr } from '@/lib/format-number-fr';

export const TARIF_PARTICIPANT_NIV01_HT = 120 as const;
export const TARIF_PARTICIPANT_NIV09_HT = 200 as const;

/** Minimum participants — sessions convoquées par un réseau (grille 3 niveaux). */
export const SESSION_CONVOQUEE_MIN_PARTICIPANTS = 6 as const;

export function libelleTarifParticipantCatalogue(tarifHt: number): string {
  return `${formatNumberFr(tarifHt)} € HT par participant`;
}
