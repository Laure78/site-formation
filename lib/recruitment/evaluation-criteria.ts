export type EvaluationCriterion = {
  key: string;
  label: string;
  group: string;
};

export const EVALUATION_CRITERIA_ETAPE_1: readonly EvaluationCriterion[] = [
  { group: 'Parcours et compétences', key: 'exp_btp', label: 'Expérience BTP' },
  { group: 'Parcours et compétences', key: 'exp_animation', label: 'Expérience d’animation' },
  { group: 'Parcours et compétences', key: 'usage_ia', label: 'Usage de l’IA' },
  { group: 'Organisation', key: 'statut_juridique', label: 'Statut juridique' },
  {
    group: 'Organisation',
    key: 'dispo_mobilite',
    label: 'Disponibilités 2027 et mobilité IDF',
  },
  {
    group: 'Organisation',
    key: 'conditions',
    label: 'Conditions attendues (tarif journalier, frais)',
  },
  { group: 'Posture', key: 'savoir_etre', label: 'Savoir-être' },
  { group: 'Posture', key: 'motivation', label: 'Motivation' },
] as const;

export const EVALUATION_MAX_ETAPE_1 = 32;

export const EVALUATION_CRITERIA_ETAPE_2: readonly EvaluationCriterion[] = [
  { group: 'Animation', key: 'clarte', label: 'Clarté du message' },
  { group: 'Animation', key: 'adaptation_btp', label: 'Adaptation au public BTP' },
  { group: 'Animation', key: 'maitrise_ia', label: 'Maîtrise de l’outil IA' },
  { group: 'Animation', key: 'pedagogie', label: 'Pédagogie et interaction' },
  { group: 'Animation', key: 'temps', label: 'Gestion du temps' },
  { group: 'Animation', key: 'recul', label: 'Recul sur sa prestation' },
] as const;

export const EVALUATION_MAX_ETAPE_2 = 24;

export const EVALUATION_DECISIONS_ETAPE_1 = {
  retenu_etape_2: 'Retenu pour l’étape 2',
  non_retenu: 'Non retenu',
} as const;

export const EVALUATION_DECISIONS_ETAPE_2 = {
  retenu: 'Retenu',
  a_revoir: 'À revoir',
  non_retenu: 'Non retenu',
} as const;

export function sumEvaluationScores(
  scores: Record<string, number | undefined>,
  criteria: readonly EvaluationCriterion[],
): number {
  let total = 0;
  for (const { key } of criteria) {
    const n = scores[key];
    if (typeof n === 'number' && n >= 1 && n <= 4) total += n;
  }
  return total;
}

export function scoreLabel(n: number): string {
  switch (n) {
    case 1:
      return 'Insuffisant';
    case 2:
      return 'Fragile';
    case 3:
      return 'Satisfaisant';
    case 4:
      return 'Très bon';
    default:
      return '—';
  }
}
