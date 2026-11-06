/**
 * Tarifs HT par participant — catalogue OFC (source unique).
 * Grille catalogue IA BTP (inter) : 120 € HT (débutant 4 h) · 170 € HT (avancé 4 h) · 620 € HT (approfondi 14 h).
 * Exception NUM-01 / NIV-01 — 4 h — 120 € HT (pas de prorata).
 * Les journées de 7 h du parcours 14 h (2 × 7 h) ne sont pas proposées comme formation autonome au catalogue.
 *
 * Ne pas importer `data/catalogue-2027` ici (risque de cycle avec le Header client).
 */
import { formatNumberFr } from '@/lib/format-number-fr';

/** Les bases de l’IA (NUM-01 / NIV-01) — 4 h. */
export const TARIF_PARTICIPANT_NIV01_HT = 120 as const;

/** Sessions avancées 4 h inter (NUM-02, NUM-03, NUM-07, NUM-08, NIV-09, etc.). */
export const TARIF_PARTICIPANT_NIV02_HT = 170 as const;
export const TARIF_PARTICIPANT_NIV03_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_PARTICIPANT_NIV04_HT = TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_PARTICIPANT_NIV05_HT = TARIF_PARTICIPANT_NIV02_HT;

/** NIV-09 — assistants IA personnalisés (4 h). */
export const TARIF_PARTICIPANT_NIV09_HT = TARIF_PARTICIPANT_NIV02_HT;

/** NIV-11 — assistance à maîtrise d’ouvrage : forfait session intra de 4 h (jusqu’à 10 participants). */
export const TARIF_SESSION_INTRA_NIV11_HT = 1200 as const;

/** NIV-12 — maîtrise d’œuvre CCTP / DPGF : même forfait session intra de 4 h. */
export const TARIF_SESSION_INTRA_NIV12_HT = TARIF_SESSION_INTRA_NIV11_HT;

/** @deprecated Référence historique — préférer TARIF_PARTICIPANT_NIV10_14H_HT pour NIV-10. */
export const TARIF_PARTICIPANT_NIV10_HT = TARIF_PARTICIPANT_NIV02_HT;

/** NUM-04 variante 14 h. */
export const TARIF_PARTICIPANT_NIV10_14H_HT = 620 as const;

/** Tarif d’une journée pédagogique de 7 h dans un parcours (ex. 14 h = 2 × 7 h) — aligné sur la demi-journée 4 h catalogue. */
export const TARIF_JOURNEE_7H_INTER_HT = 2 * TARIF_PARTICIPANT_NIV02_HT;
export const TARIF_NUM01_4H_INTER_HT = TARIF_PARTICIPANT_NIV01_HT;

/** @deprecated Alias — préférer TARIF_PARTICIPANT_NIV02_HT. */
export const TARIF_PARTICIPANT_NIVEAU_2_4H_HT = TARIF_PARTICIPANT_NIV02_HT;

/** Minimum participants — sessions convoquées par un réseau. */
export const SESSION_CONVOQUEE_MIN_PARTICIPANTS = 6 as const;

/** « 170 € HT / participant » — format d’affichage catalogue (sessions avancées 4 h). */
export function libelleTarifParticipantCatalogue(tarifHt: number): string {
  return `${formatNumberFr(tarifHt)} € HT / participant`;
}

/** True si le libellé contient déjà « HT / participant » (évite les doublons à l’affichage). */
export function tarifAffichageContientHtParticipant(label: string): boolean {
  return /HT\s*\/\s*participant/i.test(label);
}

/** Ajoute le suffixe catalogue uniquement s’il manque. */
export function afficherTarifCatalogueAvecSuffixe(tarif: string): string {
  if (!tarif.trim() || tarif === 'Sur devis') return tarif;
  if (tarifAffichageContientHtParticipant(tarif)) return tarif;
  return `${tarif} HT / participant`;
}
