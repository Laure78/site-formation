import { createAdminClient } from '@/lib/supabase/admin';
import { logSessionActivity } from '@/lib/training-ops/activity';
import { refreshSessionChecklist } from '@/lib/training-ops/checklist';
import { buildSessionProgress } from '@/lib/training-ops/checklist';

export async function closeTrainingSession(params: {
  sessionId: string;
  actorId: string;
  force?: boolean;
  forceReason?: string;
}): Promise<{ ok: true } | { ok: false; blockers: string[] }> {
  const progress = await buildSessionProgress(params.sessionId);
  const blockers: string[] = [];

  const attendees = progress.find((p) => p.key === 'emargements');
  const report = progress.find((p) => p.key === 'bilan');
  const certs = progress.find((p) => p.key === 'attestations');
  const parts = progress.find((p) => p.key === 'participants');

  if (parts && parts.status === 'a_faire') blockers.push('Aucun participant inscrit');
  if (attendees && attendees.status !== 'complet') blockers.push('Émargement manquant');
  if (report && report.status !== 'complet') blockers.push('Bilan formateur non validé');
  if (certs && certs.status !== 'complet') {
    blockers.push(`Attestations incomplètes (${certs.detail})`);
  }

  if (blockers.length && !params.force) {
    return { ok: false, blockers };
  }

  if (blockers.length && params.force && !params.forceReason?.trim()) {
    return { ok: false, blockers: ['Justification obligatoire pour forcer la clôture'] };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('training_sessions')
    .update({
      status: 'cloturee',
      closed_at: new Date().toISOString(),
      closed_by: params.actorId,
      force_close_reason: params.force ? params.forceReason?.trim() ?? null : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.sessionId);
  if (error) throw new Error(error.message);

  await logSessionActivity({
    sessionId: params.sessionId,
    actorId: params.actorId,
    action: params.force ? 'session_force_closed' : 'session_closed',
    details: { blockers, reason: params.forceReason ?? null },
  });
  await refreshSessionChecklist(params.sessionId);
  return { ok: true };
}

export async function saveTrainerReport(params: {
  sessionId: string;
  actorId: string;
  fields: Record<string, string | null>;
  validate?: boolean;
}) {
  const supabase = createAdminClient();
  const payload = {
    session_id: params.sessionId,
    ...params.fields,
    status: params.validate ? 'valide' : 'brouillon',
    validated_at: params.validate ? new Date().toISOString() : null,
    validated_by: params.validate ? params.actorId : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from('training_trainer_reports').upsert(payload, {
    onConflict: 'session_id',
  });
  if (error) throw new Error(error.message);
  await logSessionActivity({
    sessionId: params.sessionId,
    actorId: params.actorId,
    action: params.validate ? 'trainer_report_validated' : 'trainer_report_saved',
  });
  await refreshSessionChecklist(params.sessionId);
}

export async function addAttendanceSheet(params: {
  sessionId: string;
  sheetDate: string;
  label: string;
  actorId: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_attendance_sheets')
    .insert({
      session_id: params.sessionId,
      sheet_date: params.sheetDate,
      label: params.label,
      created_by: params.actorId,
    })
    .select('*')
    .single();
  if (error) throw new Error(error.message);

  const { data: participants } = await supabase
    .from('training_session_participants')
    .select('id')
    .eq('session_id', params.sessionId)
    .neq('status', 'annule');

  if (participants?.length) {
    await supabase.from('training_attendance_rows').insert(
      participants.map((p) => ({
        sheet_id: data.id,
        participant_id: p.id,
        status: 'present',
      }))
    );
  }

  await logSessionActivity({
    sessionId: params.sessionId,
    actorId: params.actorId,
    action: 'attendance_sheet_added',
    details: { label: params.label },
  });
  await refreshSessionChecklist(params.sessionId);
  return data;
}

export async function updateSessionResource(params: {
  resourceId: string;
  actorId: string;
  title?: string;
  externalUrl?: string | null;
  description?: string | null;
  hide?: boolean;
}) {
  const supabase = createAdminClient();
  const { data: current } = await supabase
    .from('training_session_resources')
    .select('*')
    .eq('id', params.resourceId)
    .maybeSingle();
  if (!current) throw new Error('Support introuvable');

  await supabase.from('training_session_resource_versions').insert({
    session_resource_id: current.id,
    version_label: current.version_label,
    title: current.title,
    storage_path: current.storage_path,
    external_url: current.external_url,
    changed_by: params.actorId,
  });

  const nextVersion = String(Number(current.version_label) + 1 || Date.now());
  const { error } = await supabase
    .from('training_session_resources')
    .update({
      title: params.title ?? current.title,
      external_url: params.externalUrl !== undefined ? params.externalUrl : current.external_url,
      description:
        params.description !== undefined ? params.description : current.description,
      is_hidden: params.hide ?? current.is_hidden,
      customized: true,
      version_label: nextVersion,
      updated_at: new Date().toISOString(),
      updated_by: params.actorId,
    })
    .eq('id', params.resourceId);
  if (error) throw new Error(error.message);

  await logSessionActivity({
    sessionId: current.session_id,
    actorId: params.actorId,
    action: 'support_updated',
    details: { resource_id: params.resourceId, version: nextVersion },
  });
  await refreshSessionChecklist(current.session_id);
}

export async function restoreSessionResourceFromTemplate(
  resourceId: string,
  actorId: string
) {
  const supabase = createAdminClient();
  const { data: current } = await supabase
    .from('training_session_resources')
    .select('*')
    .eq('id', resourceId)
    .maybeSingle();
  if (!current?.source_program_resource_id) {
    throw new Error('Aucun modèle source pour ce support');
  }
  const { data: source } = await supabase
    .from('training_program_resources')
    .select('*')
    .eq('id', current.source_program_resource_id)
    .maybeSingle();
  if (!source) throw new Error('Support modèle introuvable');

  await supabase.from('training_session_resource_versions').insert({
    session_resource_id: current.id,
    version_label: current.version_label,
    title: current.title,
    storage_path: current.storage_path,
    external_url: current.external_url,
    changed_by: actorId,
  });

  await supabase
    .from('training_session_resources')
    .update({
      title: source.title,
      description: source.description,
      storage_path: source.storage_path,
      external_url: source.external_url,
      resource_type: source.resource_type,
      version_label: source.version_label,
      customized: false,
      updated_at: new Date().toISOString(),
      updated_by: actorId,
    })
    .eq('id', resourceId);

  await logSessionActivity({
    sessionId: current.session_id,
    actorId,
    action: 'support_restored',
    details: { resource_id: resourceId },
  });
}
