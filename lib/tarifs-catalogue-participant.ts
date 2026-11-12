/**
 * Tarifs HT par participant — catalogue OFC.
 * Montants : `lib/site-config.ts` (`SITE_TARIFS`).
 *
 * Ne pas importer `data/catalogue-2027` ici (risque de cycle avec le Header client).
 */
import { formatNumberFr } from '@/lib/format-number-fr';
import {
  TARIF_PARTICIPANT_JOURNEE_7H_HT,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV03_HT,
  TARIF_PARTICIPANT_NIV04_HT,
  TARIF_PARTICIPANT_NIV05_HT,
  TARIF_PARTICIPANT_NIV09_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
  TARIF_PARTICIPANT_NIV13_HT,
} from '@/lib/site-config';

export {
  TARIF_PARTICIPANT_JOURNEE_7H_HT,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV03_HT,
  TARIF_PARTICIPANT_NIV04_HT,
  TARIF_PARTICIPANT_NIV05_HT,
  TARIF_PARTICIPANT_NIV09_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
  TARIF_PARTICIPANT_NIV13_HT,
};

/** Tarif d’une journée pédagogique de 7 h dans un parcours (ex. 14 h = 2 × 7 h). */
export const TARIF_JOURNEE_7H_INTER_HT = TARIF_PARTICIPANT_JOURNEE_7H_HT;

/**
 * @deprecated Ancien forfait session intra MOE/AMO — remplacé par tarif / participant (170 € HT).
 * Conservé pour compatibilité imports ; ne plus afficher « session de 4 h » à ce montant.
 */
export const TARIF_SESSION_INTRA_NIV11_HT = TARIF_PARTICIPANT_NIV02_HT;

/** @deprecated Alias — même tarif / participant que NIV-11. */
export const TARIF_SESSION_INTRA_NIV12_HT = TARIF_PARTICIPANT_NIV02_HT;

/** @deprecated Référence historique — préférer TARIF_PARTICIPANT_NIV10_14H_HT pour NIV-10. */
export const TARIF_PARTICIPANT_NIV10_HT = TARIF_PARTICIPANT_NIV02_HT;

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
