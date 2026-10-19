/**
 * Tarifs HT par participant — catalogue OFC (source unique).
 * Grille 2027 : 310 € HT / participant / journée de 7 h.
 * Exception : NUM-01 / NIV-01 — 4 h — 120 € HT (pas de prorata).
 *
 * Ne pas importer `data/catalogue-2027` ici (risque de cycle avec le Header client).
 */
import { formatNumberFr } from '@/lib/format-number-fr';

/** Les bases de l’IA (NUM-01 / NIV-01) — 4 h. */
export const TARIF_PARTICIPANT_NIV01_HT = 120 as const;

/** Modules 7 h inter (NUM-02, NUM-03, NUM-07, NUM-08, etc.). */
export const TARIF_PARTICIPANT_NIV02_HT = 310 as const;
export const TARIF_PARTICIPANT_NIV03_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_PARTICIPANT_NIV04_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_PARTICIPANT_NIV05_HT = TARIF_PARTICIPANT_NIV02_HT;

/** NIV-09 — assistants IA personnalisés (7 h). */
export const TARIF_PARTICIPANT_NIV09_HT = TARIF_PARTICIPANT_NIV02_HT;

/** NUM-04 / NIV-10 — variante 7 h. */
export const TARIF_PARTICIPANT_NIV10_HT = TARIF_PARTICIPANT_NIV02_HT;

/** NUM-04 variante 14 h. */
export const TARIF_PARTICIPANT_NIV10_14H_HT = 620 as const;

/** Alias grille 2027. */
export const TARIF_JOURNEE_7H_INTER_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_NUM01_4H_INTER_HT = TARIF_PARTICIPANT_NIV01_HT;

/** @deprecated Alias — préférer TARIF_PARTICIPANT_NIV02_HT. */
export const TARIF_PARTICIPANT_NIVEAU_2_4H_HT = TARIF_PARTICIPANT_NIV02_HT;

/** Minimum participants — sessions convoquées par un réseau. */
export const SESSION_CONVOQUEE_MIN_PARTICIPANTS = 6 as const;

/** « 310 € HT / participant » — format d’affichage catalogue. */
export function libelleTarifParticipantCatalogue(tarifHt: number): string {
  return `${formatNumberFr(tarifHt)} € HT / participant`;
}
