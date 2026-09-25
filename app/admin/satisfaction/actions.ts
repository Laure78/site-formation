'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import {
  executeSendKind,
  enrollSessionParticipantsForSatisfaction,
  markQuestionnaireComplete,
  appendTimeline,
} from '@/lib/training-ops/satisfaction/service';
import type { SatisfactionEmailKind } from '@/lib/training-ops/satisfaction/types';
import { shouldConfirmManualResend } from '@/lib/training-ops/satisfaction/workflow-logic';
import { getSatisfactionSettings } from '@/lib/training-ops/satisfaction/settings';
import { sendParticipantSatisfactionEmail } from '@/lib/training-ops/satisfaction/send-email';

async function requireStaff() {
  const access = await requireAdminAccess();
  if (!access.ok) throw new Error('Accès refusé');
  return access;
}

async function loadCtx(participantSatisfactionId: string) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from('training_participant_satisfaction')
    .select('*')
    .eq('id', participantSatisfactionId)
    .single();
  if (error || !row) throw new Error('Fiche satisfaction introuvable');

  const { data: part } = await supabase
    .from('training_session_participants')
    .select(
      'person:training_people(first_name, last_name, email), session:training_sessions(starts_on, ends_on, program:training_programs(title), primary_trainer_id)',
    )
    .eq('id', row.session_participant_id)
    .single();
  if (!part?.person) throw new Error('Participant introuvable');

  const person = part.person as unknown as { first_name: string; last_name: string; email: string };
  const session = part.session as unknown as {
    starts_on: string | null;
    ends_on: string | null;
    program: { title: string } | null;
    primary_trainer_id: string | null;
  };
  const sessionDate = session.ends_on ?? session.starts_on ?? '';
  const dateLabel = sessionDate
    ? new Date(`${sessionDate}T12:00:00`).toLocaleDateString('fr-FR')
    : '—';

  return {
    row,
    ctx: {
      row,
      email: person.email,
      firstName: person.first_name,
      lastName: person.last_name,
      formationTitle: session.program?.title ?? 'Formation',
      sessionDate: dateLabel,
      trainerName: 'Laure Olivié',
    },
  };
}

function revalidateSatisfaction() {
  revalidatePath(LINKS.adminSatisfaction);
  revalidatePath(`${LINKS.adminSatisfaction}/parametres`);
  revalidatePath(`${LINKS.adminSatisfaction}/emails`);
}

export async function manualSendQuestionnaireAction(
  participantSatisfactionId: string,
  force = false,
) {
  await requireStaff();
  const { row, ctx } = await loadCtx(participantSatisfactionId);
  if (
    !force &&
    shouldConfirmManualResend(row.questionnaire_last_sent_at, new Date())
  ) {
    return { ok: false as const, needsConfirm: true };
  }
  const supabase = createAdminClient();
  const res = await executeSendKind(supabase, ctx, 'questionnaire_initial', 'manual');
  revalidateSatisfaction();
  return res;
}

/** Réessayer après échec : supprime la ligne d’envoi en échec puis renvoie. */
export async function retryFailedEmailAction(
  participantSatisfactionId: string,
  emailKind: SatisfactionEmailKind,
) {
  await requireStaff();
  const supabase = createAdminClient();
  await supabase
    .from('training_satisfaction_email_deliveries')
    .delete()
    .eq('participant_satisfaction_id', participantSatisfactionId)
    .eq('email_kind', emailKind)
    .eq('status', 'failed');

  const { ctx } = await loadCtx(participantSatisfactionId);
  const res = await executeSendKind(supabase, ctx, emailKind, 'manual');
  revalidateSatisfaction();
  return res;
}

export async function manualSendQuestionnaireReminderAction(
  participantSatisfactionId: string,
  reminderIndex: 1 | 2,
) {
  await requireStaff();
  const { ctx } = await loadCtx(participantSatisfactionId);
  const kind: SatisfactionEmailKind =
    reminderIndex === 1 ? 'questionnaire_reminder_1' : 'questionnaire_reminder_2';
  const supabase = createAdminClient();
  const res = await executeSendKind(supabase, ctx, kind, 'manual');
  revalidateSatisfaction();
  return res;
}

export async function manualSendGoogleAction(participantSatisfactionId: string) {
  await requireStaff();
  const { ctx } = await loadCtx(participantSatisfactionId);
  const supabase = createAdminClient();
  const res = await executeSendKind(supabase, ctx, 'google_initial', 'manual');
  revalidateSatisfaction();
  return res;
}

export async function toggleGoogleDisabledAction(
  participantSatisfactionId: string,
  disabled: boolean,
) {
  await requireStaff();
  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from('training_participant_satisfaction')
    .select('questionnaire_completed_at')
    .eq('id', participantSatisfactionId)
    .single();
  const googleStatus = disabled
    ? 'desactive'
    : row?.questionnaire_completed_at
      ? 'a_programmer'
      : 'non_eligible';
  await supabase
    .from('training_participant_satisfaction')
    .update({
      google_disabled: disabled,
      google_status: googleStatus,
      google_next_action_at: disabled ? null : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', participantSatisfactionId);
  await appendTimeline(
    supabase,
    participantSatisfactionId,
    disabled ? 'google_disabled' : 'google_enabled',
    disabled ? 'Demande Google désactivée' : 'Demande Google réactivée',
    'manual',
  );
  revalidateSatisfaction();
  return { ok: true };
}

export async function toggleQuestionnaireDisabledAction(
  participantSatisfactionId: string,
  disabled: boolean,
) {
  await requireStaff();
  const supabase = createAdminClient();
  const updates: Record<string, unknown> = {
    questionnaire_disabled: disabled,
    updated_at: new Date().toISOString(),
  };
  if (disabled) {
    updates.questionnaire_status = 'desactive';
    updates.questionnaire_next_action_at = null;
  } else {
    updates.questionnaire_status = 'a_envoyer';
  }
  await supabase
    .from('training_participant_satisfaction')
    .update(updates)
    .eq('id', participantSatisfactionId);
  await appendTimeline(
    supabase,
    participantSatisfactionId,
    disabled ? 'questionnaire_disabled' : 'questionnaire_enabled',
    disabled ? 'Relances questionnaire désactivées' : 'Relances questionnaire réactivées',
    'manual',
  );
  revalidateSatisfaction();
  return { ok: true };
}

export async function markGoogleTermineAction(participantSatisfactionId: string) {
  await requireStaff();
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  await supabase
    .from('training_participant_satisfaction')
    .update({
      google_status: 'termine',
      google_completed_at: now,
      google_next_action_at: null,
      updated_at: now,
    })
    .eq('id', participantSatisfactionId);
  await appendTimeline(
    supabase,
    participantSatisfactionId,
    'google_termine',
    'Demande Google marquée comme terminée',
    'manual',
  );
  revalidateSatisfaction();
  return { ok: true };
}

export async function markQuestionnaireCompleteAction(
  participantSatisfactionId: string,
  score?: number | null,
) {
  await requireStaff();
  await markQuestionnaireComplete(participantSatisfactionId, {
    score: score ?? null,
    origin: 'manual',
  });
  revalidateSatisfaction();
  return { ok: true };
}

export async function enrollSessionSatisfactionAction(sessionId: string) {
  await requireStaff();
  const result = await enrollSessionParticipantsForSatisfaction(sessionId);
  revalidatePath(`${LINKS.adminSessions}/${sessionId}`);
  revalidateSatisfaction();
  return result;
}

export async function saveSatisfactionSettingsAction(formData: FormData) {
  await requireStaff();
  const supabase = createAdminClient();
  const payload = {
    questionnaire_auto_enabled: formData.get('questionnaire_auto_enabled') === 'on',
    questionnaire_first_send_days: Number(formData.get('questionnaire_first_send_days') ?? 0),
    questionnaire_reminder_1_days: Number(formData.get('questionnaire_reminder_1_days') ?? 3),
    questionnaire_reminder_2_days: Number(formData.get('questionnaire_reminder_2_days') ?? 7),
    questionnaire_max_reminders: Number(formData.get('questionnaire_max_reminders') ?? 2),
    google_auto_enabled: formData.get('google_auto_enabled') === 'on',
    google_delay_after_complete_days: Number(formData.get('google_delay_after_complete_days') ?? 1),
    google_reminder_days: Number(formData.get('google_reminder_days') ?? 5),
    google_max_reminders: Number(formData.get('google_max_reminders') ?? 1),
    google_review_url: String(formData.get('google_review_url') ?? '').trim(),
    questionnaire_public_url: String(formData.get('questionnaire_public_url') ?? '').trim() || null,
    email_from_name: String(formData.get('email_from_name') ?? '').trim(),
    email_from_address: String(formData.get('email_from_address') ?? '').trim() || null,
    email_reply_to: String(formData.get('email_reply_to') ?? '').trim(),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase
    .from('training_satisfaction_settings')
    .update(payload)
    .eq('id', 1);
  if (error) throw new Error(error.message);
  revalidateSatisfaction();
}

export async function saveEmailTemplateAction(formData: FormData) {
  await requireStaff();
  const templateKey = String(formData.get('template_key') ?? '');
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('training_satisfaction_email_templates')
    .update({
      subject: String(formData.get('subject') ?? '').trim(),
      body_html: String(formData.get('body_html') ?? ''),
      body_text: String(formData.get('body_text') ?? ''),
      is_active: formData.get('is_active') === 'on',
      updated_at: new Date().toISOString(),
    })
    .eq('template_key', templateKey);
  if (error) throw new Error(error.message);
  revalidateSatisfaction();
}

export async function sendTestSatisfactionEmailAction(templateKey: string, to: string) {
  await requireStaff();
  const kind: SatisfactionEmailKind =
    templateKey === 'google_initial' || templateKey === 'google_reminder'
      ? 'google_initial'
      : 'questionnaire_initial';
  const result = await sendParticipantSatisfactionEmail({
    kind,
    to,
    vars: {
      prenom: 'Test',
      nom: 'Admin',
      formation: 'Formation IA BTP — test',
      date_formation: new Date().toLocaleDateString('fr-FR'),
      formateur: 'Laure Olivié',
    },
  });
  return result;
}
