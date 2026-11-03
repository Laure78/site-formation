'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import type { CompetencyScores, EvaluationType } from '@/lib/extranet-formateurs/competency-criteria';

export async function saveCompetencyEvaluationAction(
  trainerId: string,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const evaluationType = String(formData.get('evaluation_type') ?? '') as EvaluationType;
  if (!['initial', 'observation', 'reevaluation'].includes(evaluationType)) {
    return { ok: false, error: 'Type d’évaluation invalide.' };
  }

  const scores: CompetencyScores = {};
  for (const key of [
    'btp_experience',
    'ia_tools',
    'metier_documents',
    'pedagogy',
    'facilitation',
    'group_management',
    'internal_procedures',
    'training_needs',
  ]) {
    const v = formData.get(`score_${key}`);
    if (v != null && String(v) !== '') scores[key as keyof CompetencyScores] = Number(v);
  }

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_competency_evaluations').insert({
    trainer_id: trainerId,
    evaluation_type: evaluationType,
    scores,
    evidence_summary: String(formData.get('evidence_summary') ?? '').trim() || null,
    development_plan: String(formData.get('development_plan') ?? '').trim() || null,
    evaluator_id: access.userId,
  });

  if (error) {
    console.error('[saveCompetencyEvaluation]', error.message);
    return { ok: false, error: 'Enregistrement impossible.' };
  }

  revalidatePath(`${LINKS.adminFormateurs}/${trainerId}`);
  revalidatePath(LINKS.adminFormateursQualite);
  return { ok: true };
}

export async function saveSubcontractorControlAction(
  trainerId: string,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: last } = await admin
    .from('extranet_subcontractor_controls')
    .select('version')
    .eq('trainer_id', trainerId)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextVersion = (last?.version ?? 0) + 1;
  const validate = formData.get('validate') === 'on';

  const row = {
    trainer_id: trainerId,
    version: nextVersion,
    authorized_scope: String(formData.get('authorized_scope') ?? '').trim() || null,
    admin_situation_ok: formData.get('admin_situation_ok') === 'on',
    competencies_ok: formData.get('competencies_ok') === 'on',
    contract_ok: formData.get('contract_ok') === 'on',
    quality_obligations_ok: formData.get('quality_obligations_ok') === 'on',
    procedures_ok: formData.get('procedures_ok') === 'on',
    evaluations_reviewed: formData.get('evaluations_reviewed') === 'on',
    difficulties_notes: String(formData.get('difficulties_notes') ?? '').trim() || null,
    corrective_actions: String(formData.get('corrective_actions') ?? '').trim() || null,
    admin_notes: String(formData.get('admin_notes') ?? '').trim() || null,
    validation_status: validate ? ('validated' as const) : ('draft' as const),
    validated_by: validate ? access.userId : null,
    validated_at: validate ? new Date().toISOString() : null,
  };

  const { error } = await admin.from('extranet_subcontractor_controls').insert(row);
  if (error) {
    console.error('[saveSubcontractorControl]', error.message);
    return { ok: false, error: 'Enregistrement impossible.' };
  }

  revalidatePath(`${LINKS.adminFormateurs}/${trainerId}`);
  return { ok: true };
}

export async function createQualityActionAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const title = String(formData.get('title') ?? '').trim();
  const indicator = String(formData.get('qualiopi_indicator') ?? '').trim();
  if (!title || !indicator) return { ok: false, error: 'Titre et indicateur requis.' };

  const admin = createAdminClient();
  const { error } = await admin.from('extranet_quality_actions').insert({
    trainer_id: String(formData.get('trainer_id') ?? '').trim() || null,
    mission_id: String(formData.get('mission_id') ?? '').trim() || null,
    qualiopi_indicator: indicator,
    title,
    description: String(formData.get('description') ?? '').trim() || null,
    responsible_name: String(formData.get('responsible_name') ?? '').trim() || null,
    due_date: String(formData.get('due_date') ?? '').trim() || null,
    created_by: access.userId,
  });

  if (error) return { ok: false, error: 'Création impossible.' };
  revalidatePath(LINKS.adminFormateursQualite);
  return { ok: true };
}

export async function updateQualityActionStatusAction(
  actionId: string,
  status: 'open' | 'in_progress' | 'closed',
  closureNotes?: string
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { error } = await admin
    .from('extranet_quality_actions')
    .update({
      status,
      closed_at: status === 'closed' ? new Date().toISOString() : null,
      closure_notes: closureNotes?.trim() || null,
    })
    .eq('id', actionId);

  if (error) return { ok: false, error: 'Mise à jour impossible.' };
  revalidatePath(LINKS.adminFormateursQualite);
  return { ok: true };
}
