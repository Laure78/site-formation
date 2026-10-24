/**
 * Applique les réponses du questionnaire d’orientation aux filtres URL du catalogue unifié.
 */
import type { MetierId } from '@/data/catalogue-2027';
import { getFormationByCode } from '@/data/formations';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';
import { FORMATION_THEMATIQUE_PRINCIPALE } from '@/lib/catalogue-thematiques-btp';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  computeOrientationRecommendation,
  type OrientationAnswers,
  type OrientationBesoin,
  type OrientationMetier,
  type OrientationPratiqueIa,
} from '@/lib/formation-orientation';

const METIER_TO_FILTER: Partial<Record<OrientationMetier, MetierId>> = {
  dirigeant: 'dirigeant',
  'charge-affaires': 'charge-affaires',
  'conducteur-travaux': 'conducteur-travaux',
  'chef-chantier': 'chef-chantier',
  'assistant-gestion': 'assistant-gestion',
};

function besoinToThematique(
  besoin: OrientationBesoin,
): FormationsIaFilterParams['thematique'] | undefined {
  switch (besoin) {
    case 'devis-relances':
      return 'debuter-outils';
    case 'dce-ao':
      return 'devis-ao';
    case 'cr-suivi':
      return 'chantier-moe';
    case 'admin':
      return 'admin-commercial';
    case 'assistants-apps':
      return 'assistants-ia';
    case 'encadrer-ia':
      return 'debuter-outils';
    default:
      return undefined;
  }
}

/** Filtres catalogue dérivés du questionnaire (scroll + URL). */
export function orientationAnswersToCatalogueFilters(
  answers: OrientationAnswers,
  at: Date = new Date(),
): FormationsIaFilterParams {
  const filters: FormationsIaFilterParams = { vue: 'tout' };

  if (answers.metier && answers.metier !== 'autre' && answers.metier !== 'maitrise-oeuvre') {
    const metier = METIER_TO_FILTER[answers.metier];
    if (metier) filters.metier = metier;
  }

  if (answers.besoin) {
    const th = besoinToThematique(answers.besoin);
    if (th) filters.thematique = th;
  }

  if (answers.pratique === 'debute') {
    filters.niveau = 1;
  }

  const rec = computeOrientationRecommendation(answers, at);
  if (rec?.primary.kind === 'formation') {
    const f = getFormationByCode(rec.primary.code);
    if (f?.niveau && answers.pratique !== 'debute') {
      filters.niveau = f.niveau;
    }
    const th = FORMATION_THEMATIQUE_PRINCIPALE[rec.primary.code as FormationCatalogueCode];
    if (th) filters.thematique = th;
  }

  if (answers.pratique === 'avance' && answers.besoin === 'assistants-apps') {
    filters.vue = 'ia';
    filters.thematique = 'outils-gestion';
  }

  return filters;
}

export function pratiqueLabelForFilter(pratique: OrientationPratiqueIa | undefined): string | undefined {
  if (pratique === 'debute') return 'Débutant';
  return undefined;
}
