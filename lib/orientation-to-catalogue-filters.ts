/**
 * Applique les réponses du questionnaire d’orientation aux filtres URL du catalogue unifié.
 */
import { getFormationByCode } from '@/data/formations';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';
import {
  computeOrientationRecommendation,
  type OrientationAnswers,
  type OrientationPratiqueIa,
} from '@/lib/formation-orientation';

/** Filtres catalogue dérivés du questionnaire — niveau uniquement (aligné UI `/formations`). */
export function orientationAnswersToCatalogueFilters(
  answers: OrientationAnswers,
  at: Date = new Date(),
): FormationsIaFilterParams {
  const filters: FormationsIaFilterParams = {};

  if (answers.pratique === 'debute') {
    filters.niveau = 1;
    return filters;
  }

  const rec = computeOrientationRecommendation(answers, at);
  if (rec?.primary.kind === 'formation') {
    const f = getFormationByCode(rec.primary.code);
    if (f?.niveau) filters.niveau = f.niveau;
  }

  return filters;
}

export function pratiqueLabelForFilter(pratique: OrientationPratiqueIa | undefined): string | undefined {
  if (pratique === 'debute') return 'Débutant';
  return undefined;
}
