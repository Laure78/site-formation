/**
 * Grille tarifaire interentreprises — catalogue 2027.
 * Délègue aux constantes de `lib/tarifs-catalogue-participant.ts` (source unique).
 */
import { formatNumberFr } from '@/lib/format-number-fr';
import {
  TARIF_JOURNEE_7H_INTER_HT,
  TARIF_NUM01_4H_INTER_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';
import type { ModuleDureeHeures } from './types';

export { TARIF_JOURNEE_7H_INTER_HT, TARIF_NUM01_4H_INTER_HT };

/** Intraentreprise et plan de formation — pas de montant catalogue. */
export const TARIF_INTRA_LIBELLE = 'Sur devis' as const;

export function prixInterHtPourDuree(dureeHeures: ModuleDureeHeures | number): number {
  if (dureeHeures === 4) return TARIF_NUM01_4H_INTER_HT;
  if (dureeHeures % 7 !== 0) {
    throw new Error(`Durée non standard pour grille journalière : ${dureeHeures} h`);
  }
  return (dureeHeures / 7) * TARIF_JOURNEE_7H_INTER_HT;
}

/** Prix d’un module catalogue (NUM-01 = exception 4 h). */
export function prixModuleInterHt(
  code: string,
  dureeHeures: ModuleDureeHeures | number,
): number {
  if (code === 'NUM-01') return TARIF_NUM01_4H_INTER_HT;
  return prixInterHtPourDuree(dureeHeures as ModuleDureeHeures);
}

/**
 * Prix parcours avec modules mixtes (ex. 35 h + NUM-01 4 h = 39 h).
 * Somme des prix modules — ne pas appliquer de prorata sur NUM-01.
 */
export function prixParcoursDepuisDurees(
  modules: readonly { code: string; dureeHeures: number }[],
): number {
  return modules.reduce((sum, m) => sum + prixModuleInterHt(m.code, m.dureeHeures), 0);
}

export function formatPrixInterHt(amount: number): string {
  return `${formatNumberFr(amount)} € HT`;
}

export function libellePrixParticipantInter(amount: number): string {
  return `${formatNumberFr(amount)} € HT / participant`;
}

/** Alias historiques mis à jour — grille 2027. */
export const TARIF_PARTICIPANT_7H_2027_HT = TARIF_JOURNEE_7H_INTER_HT;
export const TARIF_PARTICIPANT_14H_2027_HT = TARIF_PARTICIPANT_NIV10_14H_HT;
export const TARIF_PARTICIPANT_35H_2027_HT = 1550 as const;
export const TARIF_PARTICIPANT_42H_2027_HT = 1860 as const;
export const TARIF_PARTICIPANT_49H_2027_HT = 2170 as const;
export const TARIF_PARTICIPANT_56H_2027_HT = 2480 as const;
