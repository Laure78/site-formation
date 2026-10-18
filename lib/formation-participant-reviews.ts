/**
 * Avis participants par formation — uniquement des consolidations sourcées.
 * Sans jeu de données par formation : pas de note ni graphique sur la fiche.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';

export type FormationReviewCriterion = {
  id: string;
  label: string;
  /** Moyenne sur l’échelle du questionnaire. */
  value: number;
  scaleMax: number;
};

export type FormationReviewWave = {
  globalRating: number;
  respondents: number;
  periodLabel: string;
  criteria: readonly FormationReviewCriterion[];
};

export type FormationParticipantReviews =
  | { status: 'published'; chaud?: FormationReviewWave; froid?: FormationReviewWave }
  | { status: 'none' };

/** Critères alignés sur le questionnaire à chaud (SatisfactionSurvey). */
export const SATISFACTION_CRITERIA_LABELS = {
  global: 'Satisfaction globale',
  contenu: 'Qualité du contenu',
  utilite: 'Utilité professionnelle',
  organisation: 'Organisation et accueil',
  recommandation: 'Recommandation',
} as const;

/**
 * Retourne les résultats publiables pour une fiche catalogue.
 * À alimenter lorsque des consolidations par programme existent (source OFC).
 */
export function getFormationParticipantReviews(
  _ref: FormationCatalogueCode,
): FormationParticipantReviews {
  return { status: 'none' };
}
