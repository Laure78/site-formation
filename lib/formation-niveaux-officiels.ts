/**
 * Appellations officielles des niveaux, durées cibles et tarifs catalogue IA BTP.
 */
import type { FormationNiveau } from '@/data/formations';
import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';

export const FORMATION_EFFECTIF_MIN = 6 as const;
export const FORMATION_EFFECTIF_MAX = 12 as const;

/** Durée pédagogique cible — niveau 1. */
export const FORMATION_DUREE_NIV1_MINUTES = 240 as const;

/** Durée pédagogique cible — niveau 2 (1 journée, hors pauses). */
export const FORMATION_DUREE_NIV2_MINUTES = 420 as const;

/** @deprecated Préférer FORMATION_DUREE_NIV1_MINUTES. */
export const FORMATION_DUREE_NIV1_2_MINUTES = FORMATION_DUREE_NIV1_MINUTES;

/** Durée pédagogique cible — niveau 3 (14 h). */
export const FORMATION_DUREE_NIV3_MINUTES = 840 as const;

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
  _ref?: string,
): number {
  if (niveau === 3) return FORMATION_DUREE_NIV3_MINUTES;
  if (niveau === 2) return FORMATION_DUREE_NIV2_MINUTES;
  return FORMATION_DUREE_NIV1_MINUTES;
}

export function formationTarifHtParNiveau(niveau: FormationNiveau, _ref?: string): number {
  if (niveau === 1) return TARIF_PARTICIPANT_NIV01_HT;
  if (niveau === 3) return TARIF_PARTICIPANT_NIV10_14H_HT;
  return TARIF_PARTICIPANT_NIV02_HT;
}

/** Libellé durée affichée catalogue selon le niveau. */
/** Horaires type — journée catalogue 7 h (pauses méridienne hors temps effectif). */
export const FORMATION_HORAIRES_JOURNEE_7H =
  '9h00 – 12h30 / 13h30 – 17h00' as const;

export function formationDureeAfficheeParNiveau(niveau: FormationNiveau): string {
  if (niveau === 3) return '14 h';
  if (niveau === 2) return '7 h';
  return '4 h';
}
