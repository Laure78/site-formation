/** Grille indicateur 21 — niveaux 1 (à renforcer) à 4 (maîtrisé). */

export const COMPETENCY_CRITERIA = [
  { key: 'btp_experience', label: 'Expérience professionnelle BTP' },
  { key: 'ia_tools', label: 'Maîtrise des outils d’IA' },
  { key: 'metier_documents', label: 'Exploitation des documents métier' },
  { key: 'pedagogy', label: 'Compétences pédagogiques' },
  { key: 'facilitation', label: 'Capacité d’animation' },
  { key: 'group_management', label: 'Gestion de groupe' },
  { key: 'internal_procedures', label: 'Respect des procédures internes' },
  { key: 'training_needs', label: 'Besoins de formation complémentaires (diagnostic)' },
] as const;

export type CompetencyCriterionKey = (typeof COMPETENCY_CRITERIA)[number]['key'];

export type CompetencyScores = Partial<Record<CompetencyCriterionKey, number>>;

export const EVALUATION_TYPE_LABELS = {
  initial: 'Évaluation initiale',
  observation: 'Observation en situation',
  reevaluation: 'Réévaluation',
} as const;

export type EvaluationType = keyof typeof EVALUATION_TYPE_LABELS;

export function scoreLabel(n: number | undefined): string {
  if (n == null || n < 1) return '—';
  const labels = ['', 'À renforcer', 'En progression', 'Satisfaisant', 'Maîtrisé'];
  return labels[Math.min(4, Math.max(1, Math.round(n)))] ?? '—';
}
