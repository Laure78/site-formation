import { createAdminClient } from '@/lib/supabase/admin';
import type {
  CompetencyEvaluationRow,
  MissionFeedbackRow,
  QualityActionRow,
  SubcontractorControlRow,
} from './phase3-types';

export async function fetchCompetencyEvaluationsForTrainer(
  trainerId: string
): Promise<CompetencyEvaluationRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_competency_evaluations')
    .select('*')
    .eq('trainer_id', trainerId)
    .order('evaluated_at', { ascending: false });
  return (data ?? []) as CompetencyEvaluationRow[];
}

export async function fetchLatestSubcontractorControl(
  trainerId: string
): Promise<SubcontractorControlRow | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_subcontractor_controls')
    .select('*')
    .eq('trainer_id', trainerId)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as SubcontractorControlRow | null) ?? null;
}

export async function fetchQualityActionsForTrainer(trainerId: string): Promise<QualityActionRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_quality_actions')
    .select('*')
    .eq('trainer_id', trainerId)
    .order('due_date', { ascending: true });
  return (data ?? []) as QualityActionRow[];
}

export async function fetchOpenQualityActions(): Promise<QualityActionRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_quality_actions')
    .select('*')
    .in('status', ['open', 'in_progress'])
    .order('due_date', { ascending: true })
    .limit(100);
  return (data ?? []) as QualityActionRow[];
}

export async function fetchMissionFeedbacksForTrainer(
  trainerId: string
): Promise<MissionFeedbackRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_mission_feedbacks')
    .select('*')
    .eq('trainer_id', trainerId)
    .order('submitted_at', { ascending: false });
  return (data ?? []) as MissionFeedbackRow[];
}
