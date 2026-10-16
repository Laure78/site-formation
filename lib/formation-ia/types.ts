/**
 * Usages pédagogiques Claude / ChatGPT intégrés aux programmes OFC.
 * Chaque usage relie compétence métier → tâche IA → livrable → critère d’évaluation.
 */

export type IaOutil = 'claude' | 'chatgpt' | 'claude-et-chatgpt';

/** Fonctionnalités vérifiées dans les documentations officielles (voir features-verified). */
export type IaFonctionnaliteId =
  | 'prompts-fichiers'
  | 'claude-projects'
  | 'claude-skills'
  | 'claude-artifacts'
  | 'claude-connectors'
  | 'claude-cowork'
  | 'chatgpt-projects'
  | 'chatgpt-data-analysis'
  | 'chatgpt-deep-research'
  | 'chatgpt-canvas'
  | 'chatgpt-image-analysis';

export type FormationIaNiveauPedagogique = 'initiation' | 'intermediaire' | 'avance';

/**
 * Usage IA intégré à une séquence de formation.
 * Aligné Qualiopi : objectif (compétence) → activité → livrable → critère.
 */
export type FormationIaUsage = {
  id: string;
  /** Libellé du module / séquence où l’usage est pratiqué. */
  moduleLabel: string;
  competenceMetier: string;
  tacheIa: string;
  documentsOuDonnees: string;
  outil: IaOutil;
  fonctionnaliteId: IaFonctionnaliteId;
  travailParticipant: string;
  livrable: string;
  controlesHumains: string;
  critereEvaluation: string;
  niveau: FormationIaNiveauPedagogique;
  /** Démonstration formateur (les participants observent). */
  demoFormateur?: boolean;
  /** Pratique individuelle ou en binôme. */
  pratiqueParticipant?: boolean;
};

export type FormationIaApplicationsBundle = {
  title: string;
  intro: string;
  /** Cycle méthodologique affiché au-dessus des usages. */
  showMethodCycle?: boolean;
  usages: readonly FormationIaUsage[];
};
