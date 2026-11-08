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
import type { CatalogueModule, ModuleNiveau } from './types';
import { prixInterHtPourNiveau } from './module-niveaux';

export { TARIF_JOURNEE_7H_INTER_HT, TARIF_NUM01_4H_INTER_HT };

/** Intra-entreprise et plan de formation — pas de montant catalogue. */
export const TARIF_INTRA_LIBELLE = 'Sur devis' as const;

/** Prix d’un module catalogue — dérivé du niveau pédagogique. */
export function prixModuleInterHt(
  moduleOrCode: CatalogueModule | Pick<CatalogueModule, 'code' | 'niveau' | 'prixInterHt'>,
  _dureeLegacy?: number,
): number {
  if ('prixInterHt' in moduleOrCode && typeof moduleOrCode.prixInterHt === 'number') {
    return moduleOrCode.prixInterHt;
  }
  if ('niveau' in moduleOrCode) {
    return prixInterHtPourNiveau(moduleOrCode.niveau as ModuleNiveau);
  }
  throw new Error(`Module inconnu pour tarif : ${String(moduleOrCode)}`);
}

/** @deprecated Préférer `prixModuleInterHt` avec le module ou son niveau. */
export function prixInterHtPourDuree(_dureeHeures: number, niveau: ModuleNiveau): number {
  return prixInterHtPourNiveau(niveau);
}

/**
 * Prix parcours avec modules mixtes (ex. 35 h + NUM-01 4 h = 39 h).
 * Somme des prix modules — ne pas appliquer de prorata sur NUM-01.
 */
export function prixParcoursDepuisModules(
  modules: readonly Pick<CatalogueModule, 'code' | 'niveau' | 'prixInterHt' | 'dureeHeures'>[],
): number {
  return modules.reduce((sum, m) => sum + prixModuleInterHt(m), 0);
}

/** @deprecated */
export function prixParcoursDepuisDurees(
  modules: readonly { code: string; dureeHeures: number; niveau?: ModuleNiveau; prixInterHt?: number }[],
): number {
  return modules.reduce((sum, m) => {
    if (m.prixInterHt != null) return sum + m.prixInterHt;
    if (m.niveau != null) return sum + prixInterHtPourNiveau(m.niveau);
    throw new Error(`Tarif module ${m.code} : niveau manquant`);
  }, 0);
}

export function formatPrixInterHt(amount: number | undefined | null): string {
  if (amount == null) return 'prix selon modules retenus';
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
