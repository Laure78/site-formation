/**
 * Tarifs HT par participant — catalogue OFC (source unique, pas de forfait groupe).
 */
import { formatNumberFr } from '@/lib/format-number-fr';

/** Les bases de l’IA (NIV-01) — 4 h. */
export const TARIF_PARTICIPANT_NIV01_HT = 120 as const;

/** IA appels d’offres, conduite de travaux, Claude, maîtrise d’œuvre (NIV-02 à NIV-05) — 4 h. */
export const TARIF_PARTICIPANT_NIV02_HT = 170 as const;
export const TARIF_PARTICIPANT_NIV03_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_PARTICIPANT_NIV04_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_PARTICIPANT_NIV05_HT = TARIF_PARTICIPANT_NIV02_HT;

/** Créer des assistants IA personnalisés (NIV-09) — 7 h. */
export const TARIF_PARTICIPANT_NIV09_HT = 200 as const;

/** Outils de gestion BTP avec l’IA (NIV-10) — 7 h. */
export const TARIF_PARTICIPANT_NIV10_HT = 300 as const;

/** @deprecated Alias — préférer TARIF_PARTICIPANT_NIV02_HT. */
export const TARIF_PARTICIPANT_NIVEAU_2_4H_HT = TARIF_PARTICIPANT_NIV02_HT;

/** Minimum participants — sessions convoquées par un réseau (grille 3 niveaux). */
export const SESSION_CONVOQUEE_MIN_PARTICIPANTS = 6 as const;

/** « 170 € HT / participant » — format d’affichage catalogue. */
export function libelleTarifParticipantCatalogue(tarifHt: number): string {
  return `${formatNumberFr(tarifHt)} € HT / participant`;
}
