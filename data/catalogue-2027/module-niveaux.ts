/**
 * Niveaux pédagogiques catalogue 2027 — durées et tarifs inter alignés sur la grille participant.
 */
import {
  TARIF_PARTICIPANT_JOURNEE_7H_HT,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';
import type { ModuleCode, ModuleDureeHeures, ModuleNiveau } from './types';

export const MODULE_ANNEE_DISPONIBILITE = 2027 as const;

export const NIVEAU_LIBELLE: Record<ModuleNiveau, string> = {
  1: 'Niveau 1 · Débutant',
  2: 'Niveau 2 · Avancé',
  3: 'Niveau 3 · Approfondi',
};

/** Durée inter standard par niveau (heures). */
export function dureeHeuresPourNiveau(niveau: ModuleNiveau): ModuleDureeHeures {
  if (niveau === 3) return 14;
  return 4;
}

/** Tarif inter HT / participant par niveau. */
export function prixInterHtPourNiveau(niveau: ModuleNiveau): number {
  if (niveau === 1) return TARIF_PARTICIPANT_NIV01_HT;
  if (niveau === 3) return TARIF_PARTICIPANT_NIV10_14H_HT;
  return TARIF_PARTICIPANT_NIV02_HT;
}

/** Identifiant référentiel (slug) dérivé du code. */
export function moduleIdFromCode(code: ModuleCode): string {
  return code.toLowerCase();
}

/**
 * Niveau pédagogique par code — une définition par module.
 * NUM-01 : initiation · NUM-04 : application métier (seul niveau 3 du référentiel actuel).
 */
export const NIVEAU_PAR_MODULE: Record<ModuleCode, ModuleNiveau> = {
  'DIR-01': 2,
  'DIR-02': 2,
  'DIR-03': 2,
  'DIR-04': 2,
  'DIR-05': 2,
  'COM-01': 2,
  'COM-02': 2,
  'COM-03': 2,
  'COM-04': 2,
  'COM-05': 2,
  'COM-06': 2,
  'TRA-01': 2,
  'TRA-02': 2,
  'TRA-03': 2,
  'TRA-04': 2,
  'TRA-05': 2,
  'MAN-01': 2,
  'MAN-02': 2,
  'MAN-03': 2,
  'MAN-04': 2,
  'ADM-01': 2,
  'ADM-02': 2,
  'ADM-03': 2,
  'ADM-04': 2,
  'TQP-01': 2,
  'TQP-02': 2,
  'TQP-03': 2,
  'NUM-01': 1,
  'NUM-02': 2,
  'NUM-03': 2,
  'NUM-04': 3,
  'NUM-05': 2,
  'NUM-06': 2,
  'NUM-07': 2,
  'NUM-08': 2,
};

/** Cas où l’ancienne durée était 14 h mais le niveau reste 2 (4 h) — arbitrage documenté. */
export const ARBITRAGES_PEDAGOGIQUES_NIVEAU: readonly {
  code: ModuleCode;
  note: string;
}[] = [
  {
    code: 'COM-03',
    note:
      'Réponse marchés publics (ex-14 h) : programme métier dense — reclassé niveau 2 (session 4 h) ; approfondissement hors parcours standard.',
  },
  {
    code: 'TRA-01',
    note:
      'Préparation de chantier (ex-14 h) : fil rouge condensé en niveau 2 ; points IA conservés dans le programme.',
  },
  {
    code: 'MAN-02',
    note: 'Management d’équipe (ex-14 h) : niveau 2 — compétences encadrement sans format approfondi.',
  },
  {
    code: 'NUM-06',
    note: 'Lecture maquette BIM (ex-14 h) : initiation exploitation — niveau 2, pas création d’application.',
  },
];

/** Tarif inter HT / participant — ancienne grille parcours (7 h → 310 €, 14 h → 620 €, 4 h → 120 €). */
export function legacyPrixInterParcoursHt(dureeHeuresLegacy: number): number {
  if (dureeHeuresLegacy <= 4) return TARIF_PARTICIPANT_NIV01_HT;
  if (dureeHeuresLegacy <= 7) return TARIF_PARTICIPANT_JOURNEE_7H_HT;
  return TARIF_PARTICIPANT_NIV10_14H_HT;
}

export function assertNiveauCoherent(
  code: ModuleCode,
  niveau: ModuleNiveau,
  dureeHeures: ModuleDureeHeures,
): string | null {
  const attendu = dureeHeuresPourNiveau(niveau);
  if (dureeHeures !== attendu) {
    return `${code} : durée ${dureeHeures} h incohérente avec niveau ${niveau} (attendu ${attendu} h)`;
  }
  const ref = NIVEAU_PAR_MODULE[code];
  if (ref !== niveau) {
    return `${code} : niveau ${niveau} ≠ référentiel ${ref}`;
  }
  return null;
}
