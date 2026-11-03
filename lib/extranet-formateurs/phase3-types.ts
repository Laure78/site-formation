import type { CompetencyScores, EvaluationType } from './competency-criteria';

export type CompetencyEvaluationRow = {
  id: string;
  trainer_id: string;
  evaluation_type: EvaluationType;
  scores: CompetencyScores;
  evidence_summary: string | null;
  development_plan: string | null;
  evaluator_id: string | null;
  evaluated_at: string;
  created_at: string;
};

export type SubcontractorControlRow = {
  id: string;
  trainer_id: string;
  version: number;
  authorized_scope: string | null;
  admin_situation_ok: boolean | null;
  competencies_ok: boolean | null;
  contract_ok: boolean | null;
  quality_obligations_ok: boolean | null;
  procedures_ok: boolean | null;
  evaluations_reviewed: boolean | null;
  difficulties_notes: string | null;
  corrective_actions: string | null;
  validation_status: 'draft' | 'validated' | 'needs_action';
  validated_by: string | null;
  validated_at: string | null;
  admin_notes: string | null;
  created_at: string;
};

export type MissionFeedbackRow = {
  id: string;
  mission_id: string;
  trainer_id: string;
  difficulties: string | null;
  adaptations: string | null;
  improvement_proposals: string | null;
  incident_report: string | null;
  submitted_at: string;
};

export type QualityActionRow = {
  id: string;
  trainer_id: string | null;
  mission_id: string | null;
  qualiopi_indicator: string;
  title: string;
  description: string | null;
  responsible_name: string | null;
  responsible_user_id: string | null;
  due_date: string | null;
  status: 'open' | 'in_progress' | 'closed';
  closed_at: string | null;
  closure_notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};
