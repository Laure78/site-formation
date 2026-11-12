/**
 * Appellations officielles des niveaux, durées cibles et tarifs catalogue IA BTP.
 */
import type { FormationNiveau } from '@/data/formations';
import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
  TARIF_PARTICIPANT_NIV13_HT,
} from '@/lib/tarifs-catalogue-participant';

export const FORMATION_EFFECTIF_MIN = 6 as const;
export const FORMATION_EFFECTIF_MAX = 12 as const;

/** Durée pédagogique cible — niveaux 1 et 2. */
export const FORMATION_DUREE_NIV1_2_MINUTES = 240 as const;

/** Durée pédagogique cible — niveau 3 (14 h). */
export const FORMATION_DUREE_NIV3_MINUTES = 840 as const;

/** Exception catalogue — NIV-13 agents Make (7 h présentiel · 360 min effectives). */
export const FORMATION_DUREE_NIV13_MINUTES = 360 as const;

export const FORMATION_NIVEAU_OFFICIEL: Readonly<Record<FormationNiveau, string>> = {
  1: 'Niveau 1 · Débutant',
  2: 'Niveau 2 · Avancé',
  3: 'Niveau 3 · Approfondi',
};

export function formationNiveauOfficielLabel(niveau: FormationNiveau): string {
  return FORMATION_NIVEAU_OFFICIEL[niveau];
}

export function formationHeroBadgeNiveau(niveau: FormationNiveau): string {
  return `Formation IA BTP · ${formationNiveauOfficielLabel(niveau)}`;
}

export function formationDureeCibleMinutes(
  niveau: FormationNiveau,
  ref?: string,
): number {
  if (ref === 'NIV-13') return FORMATION_DUREE_NIV13_MINUTES;
  return niveau === 3 ? FORMATION_DUREE_NIV3_MINUTES : FORMATION_DUREE_NIV1_2_MINUTES;
}

export function formationTarifHtParNiveau(niveau: FormationNiveau, ref?: string): number {
  if (ref === 'NIV-13') return TARIF_PARTICIPANT_NIV13_HT;
  if (niveau === 1) return TARIF_PARTICIPANT_NIV01_HT;
  if (niveau === 3) return TARIF_PARTICIPANT_NIV10_14H_HT;
  return TARIF_PARTICIPANT_NIV02_HT;
}

/** Libellé durée affichée catalogue selon le niveau. */
export function formationDureeAfficheeParNiveau(niveau: FormationNiveau): string {
  return niveau === 3 ? '14 h' : '4 h';
}
