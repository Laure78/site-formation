import type { SupabaseClient } from '@supabase/supabase-js';
import { parisDateKey } from '@/lib/rdv-datetime';
import { createAdminClient } from '@/lib/supabase/admin';
import type {
  SatisfactionEmailKind,
  ParticipantSatisfactionRow,
} from '@/lib/training-ops/satisfaction/types';
import {
  getQuestionnairePublicUrl,
  getSatisfactionSettings,
} from '@/lib/training-ops/satisfaction/settings';
import { sendParticipantSatisfactionEmail } from '@/lib/training-ops/satisfaction/send-email';
import {
  computeGoogleNextActionAt,
  computeQuestionnaireNextActionAt,
  googleStatusAfterQuestionnaireComplete,
  nextGoogleStatusAfterSend,
  nextQuestionnaireStatusAfterSend,
  planGoogleEmail,
  planQuestionnaireEmails,
  questionnaireStatusAfterComplete,
  shouldMarkSansReponse,
} from '@/lib/training-ops/satisfaction/workflow-logic';

const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.laureolivie.fr';

export function questionnaireLinkForToken(accessToken: string, publicUrl: string): string {
  return `${SITE}/satisfaction/formation/${accessToken}`;
}

export async function appendTimeline(
  supabase: SupabaseClient,
  participantSatisfactionId: string,
  eventType: string,
  eventLabel: string,
  origin: 'auto' | 'manual' | 'system',
  metadata: Record<string, unknown> = {},
) {
  await supabase.from('training_satisfaction_timeline').insert({
    participant_satisfaction_id: participantSatisfactionId,
    event_type: eventType,
    event_label: eventLabel,
    origin,
    metadata,
  });
}

/** Crée les fiches satisfaction pour tous les participants actifs quand la session est terminée. */
export async function enrollSessionParticipantsForSatisfaction(sessionId: string) {
  const supabase = createAdminClient();
  const { data: session, error: sErr } = await supabase
    .from('training_sessions')
    .select('id, status, ends_on, starts_on')
    .eq('id', sessionId)
    .single();
  if (sErr || !session) throw new Error(sErr?.message ?? 'Session introuvable');
  if (!['terminee', 'cloturee'].includes(session.status)) return { created: 0 };

  const endedOn = session.ends_on ?? session.starts_on;
  const { data: participants, error: pErr } = await supabase
    .from('training_session_participants')
    .select('id')
    .eq('session_id', sessionId)
    .neq('status', 'annule');
  if (pErr) throw new Error(pErr.message);

  let created = 0;
  for (const p of participants ?? []) {
    const { data: existing } = await supabase
      .from('training_participant_satisfaction')
      .select('id')
      .eq('session_participant_id', p.id)
      .maybeSingle();
    if (existing) continue;

    const { error: insErr } = await supabase.from('training_participant_satisfaction').insert({
      session_participant_id: p.id,
      session_id: sessionId,
      session_ended_on: endedOn,
      questionnaire_status: 'a_envoyer',
      google_status: 'non_eligible',
    });
    if (!insErr) {
      created += 1;
      const { data: row } = await supabase
        .from('training_participant_satisfaction')
        .select('id')
        .eq('session_participant_id', p.id)
        .single();
      if (row) {
        await appendTimeline(
          supabase,
          row.id,
          'session_terminee',
          'Formation terminée — participant éligible au questionnaire',
          'system',
          { sessionId },
        );
      }
    }
  }
  return { created };
}

async function loadSentKinds(
  supabase: SupabaseClient,
  participantSatisfactionId: string,
): Promise<Set<SatisfactionEmailKind>> {
  const { data } = await supabase
    .from('training_satisfaction_email_deliveries')
    .select('email_kind, status')
    .eq('participant_satisfaction_id', participantSatisfactionId)
    .eq('status', 'sent');
  const set = new Set<SatisfactionEmailKind>();
  for (const row of data ?? []) {
    set.add(row.email_kind as SatisfactionEmailKind);
  }
  return set;
}

type ParticipantContext = {
  row: ParticipantSatisfactionRow;
  email: string;
  firstName: string;
  lastName: string;
  formationTitle: string;
  sessionDate: string;
  trainerName: string;
};

async function loadParticipantContext(
  supabase: SupabaseClient,
  row: ParticipantSatisfactionRow,
): Promise<ParticipantContext | null> {
  const { data: part } = await supabase
    .from('training_session_participants')
    .select(
      'person:training_people(first_name, last_name, email), session:training_sessions(starts_on, ends_on, program:training_programs(title), primary_trainer_id)',
    )
    .eq('id', row.session_participant_id)
    .single();
  if (!part?.person) return null;
  const person = part.person as unknown as { first_name: string; last_name: string; email: string };
  const session = part.session as unknown as {
    starts_on: string | null;
    ends_on: string | null;
    program: { title: string } | null;
    primary_trainer_id: string | null;
  };
  let trainerName = 'Laure Olivié';
  if (session.primary_trainer_id) {
    const { data: prof } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', session.primary_trainer_id)
      .maybeSingle();
    if (prof) {
      trainerName = [prof.first_name, prof.last_name].filter(Boolean).join(' ') || trainerName;
    }
  }
  const sessionDate = session.ends_on ?? session.starts_on ?? row.session_ended_on ?? '';
  const dateLabel = sessionDate
    ? new Date(`${sessionDate}T12:00:00`).toLocaleDateString('fr-FR')
    : '—';

  return {
    row,
    email: person.email,
    firstName: person.first_name,
    lastName: person.last_name,
    formationTitle: session.program?.title ?? 'Formation',
    sessionDate: dateLabel,
    trainerName,
  };
}

/** Claim atomique avant envoi — empêche doublons. */
async function claimDelivery(
  supabase: SupabaseClient,
  participantSatisfactionId: string,
  kind: SatisfactionEmailKind,
  toEmail: string,
  subject: string,
  triggeredBy: 'auto' | 'manual',
): Promise<{ ok: true; deliveryId: string } | { ok: false; reason: string }> {
  const idempotencyKey = `${participantSatisfactionId}:${kind}`;
  const { data, error } = await supabase
    .from('training_satisfaction_email_deliveries')
    .insert({
      participant_satisfaction_id: participantSatisfactionId,
      email_kind: kind,
      idempotency_key: idempotencyKey,
      status: 'sending',
      to_email: toEmail,
      subject,
      triggered_by: triggeredBy,
      attempt_count: 1,
    })
    .select('id')
    .single();

  if (error) {
    if (error.code === '23505') {
      return { ok: false, reason: 'already_sent_or_in_flight' };
    }
    return { ok: false, reason: error.message };
  }
  return { ok: true, deliveryId: data.id };
}

async function finalizeDelivery(
  supabase: SupabaseClient,
  deliveryId: string,
  result: { ok: true; messageId?: string } | { ok: false; error: string },
) {
  if (result.ok) {
    await supabase
      .from('training_satisfaction_email_deliveries')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        resend_message_id: result.messageId ?? null,
        last_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', deliveryId);
    return;
  }
  await supabase
    .from('training_satisfaction_email_deliveries')
    .update({
      status: 'failed',
      last_error: result.error,
      updated_at: new Date().toISOString(),
    })
    .eq('id', deliveryId);
}

export async function executeSendKind(
  supabase: SupabaseClient,
  ctx: ParticipantContext,
  kind: SatisfactionEmailKind,
  triggeredBy: 'auto' | 'manual',
): Promise<{ ok: boolean; error?: string; skipped?: boolean }> {
  const settings = await getSatisfactionSettings();
  const qLink = questionnaireLinkForToken(ctx.row.access_token, getQuestionnairePublicUrl(settings));

  const subjectPreview =
    kind.startsWith('google') ? 'Demande avis Google' : 'Questionnaire satisfaction';

  const claim = await claimDelivery(
    supabase,
    ctx.row.id,
    kind,
    ctx.email,
    subjectPreview,
    triggeredBy,
  );
  if (!claim.ok) {
    return { ok: true, skipped: true };
  }

  const sendResult = await sendParticipantSatisfactionEmail({
    kind,
    to: ctx.email,
    vars: {
      prenom: ctx.firstName,
      nom: ctx.lastName,
      formation: ctx.formationTitle,
      date_formation: ctx.sessionDate,
      formateur: ctx.trainerName,
    },
    questionnaireLink: qLink.includes('/satisfaction/formation/')
      ? qLink
      : undefined,
  });

  await finalizeDelivery(supabase, claim.deliveryId, sendResult);

  if (!sendResult.ok) {
    const statusField = kind.startsWith('google') ? 'google_status' : 'questionnaire_status';
    await supabase
      .from('training_participant_satisfaction')
      .update({
        [statusField]: 'echec_envoi',
        updated_at: new Date().toISOString(),
      })
      .eq('id', ctx.row.id);
    await appendTimeline(supabase, ctx.row.id, 'email_failed', `Échec envoi (${kind})`, triggeredBy, {
      error: sendResult.error,
    });
    return { ok: false, error: sendResult.error };
  }

  const now = new Date().toISOString();
  const updates: Record<string, unknown> = { updated_at: now };

  if (kind.startsWith('questionnaire')) {
    updates.questionnaire_status = nextQuestionnaireStatusAfterSend(kind, ctx.row.questionnaire_status);
    updates.questionnaire_last_sent_at = now;
    if (!ctx.row.questionnaire_first_sent_at) updates.questionnaire_first_sent_at = now;
    if (kind.includes('reminder')) {
      updates.questionnaire_reminder_count = ctx.row.questionnaire_reminder_count + 1;
    }
  } else {
    updates.google_status = nextGoogleStatusAfterSend(kind);
    updates.google_last_sent_at = now;
    if (!ctx.row.google_first_sent_at) updates.google_first_sent_at = now;
    if (kind === 'google_reminder_1') {
      updates.google_reminder_count = ctx.row.google_reminder_count + 1;
    }
  }

  await supabase.from('training_participant_satisfaction').update(updates).eq('id', ctx.row.id);

  await appendTimeline(
    supabase,
    ctx.row.id,
    kind,
    `Email ${kind} envoyé`,
    triggeredBy,
    { deliveryId: claim.deliveryId },
  );

  return { ok: true };
}

export async function markQuestionnaireComplete(
  participantSatisfactionId: string,
  options: { score?: number | null; origin?: 'manual' | 'system' } = {},
) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  await supabase
    .from('training_participant_satisfaction')
    .update({
      questionnaire_status: questionnaireStatusAfterComplete(),
      questionnaire_completed_at: now,
      questionnaire_score: options.score ?? null,
      questionnaire_next_action_at: null,
      google_status: googleStatusAfterQuestionnaireComplete(),
      updated_at: now,
    })
    .eq('id', participantSatisfactionId);

  await appendTimeline(
    supabase,
    participantSatisfactionId,
    'questionnaire_complete',
    'Questionnaire complété',
    options.origin === 'manual' ? 'manual' : 'system',
    { score: options.score ?? null },
  );

  const settings = await getSatisfactionSettings();
  const { data: row } = await supabase
    .from('training_participant_satisfaction')
    .select('*')
    .eq('id', participantSatisfactionId)
    .single();
  if (row) {
    const sentKinds = await loadSentKinds(supabase, participantSatisfactionId);
    const nextGoogle = computeGoogleNextActionAt({
      settings,
      sessionEndedOn: row.session_ended_on,
      questionnaireStatus: 'complete',
      questionnaireDisabled: row.questionnaire_disabled,
      questionnaireReminderCount: row.questionnaire_reminder_count,
      questionnaireCompletedAt: now,
      googleStatus: 'a_programmer',
      googleDisabled: row.google_disabled,
      googleReminderCount: row.google_reminder_count,
      sentKinds,
      todayParis: parisDateKey(new Date()),
      nowIso: now,
    });
    if (nextGoogle) {
      await supabase
        .from('training_participant_satisfaction')
        .update({
          google_next_action_at: nextGoogle,
          google_status: 'programme',
          updated_at: now,
        })
        .eq('id', participantSatisfactionId);
    }
  }
}

export async function runTrainingSatisfactionCron(todayParis: string) {
  const supabase = createAdminClient();
  const settings = await getSatisfactionSettings();
  const nowIso = new Date().toISOString();

  const { data: rows, error } = await supabase
    .from('training_participant_satisfaction')
    .select('*');
  if (error) throw new Error(error.message);

  const stats = {
    questionnaireSent: 0,
    googleSent: 0,
    skipped: 0,
    errors: [] as string[],
  };

  const allRows = (rows ?? []).filter((r) => {
    const row = r as ParticipantSatisfactionRow;
    const qActive =
      !row.questionnaire_disabled &&
      !['complete', 'desactive', 'sans_reponse'].includes(row.questionnaire_status);
    const gActive =
      !row.google_disabled &&
      !['non_eligible', 'termine', 'desactive'].includes(row.google_status);
    return qActive || gActive;
  }) as ParticipantSatisfactionRow[];

  for (const row of allRows as ParticipantSatisfactionRow[]) {
    const ctx = await loadParticipantContext(supabase, row);
    if (!ctx) continue;

    const sentKinds = await loadSentKinds(supabase, row.id);
    const wfInput = {
      settings,
      sessionEndedOn: row.session_ended_on,
      questionnaireStatus: row.questionnaire_status,
      questionnaireDisabled: row.questionnaire_disabled,
      questionnaireReminderCount: row.questionnaire_reminder_count,
      questionnaireCompletedAt: row.questionnaire_completed_at,
      googleStatus: row.google_status,
      googleDisabled: row.google_disabled,
      googleReminderCount: row.google_reminder_count,
      sentKinds,
      todayParis,
      nowIso,
    };

    const qPlan = planQuestionnaireEmails(wfInput);
    if (qPlan) {
      const res = await executeSendKind(supabase, ctx, qPlan.kind, 'auto');
      if (res.skipped) stats.skipped += 1;
      else if (res.ok) stats.questionnaireSent += 1;
      else if (res.error) stats.errors.push(res.error);
    }

    const gPlan = planGoogleEmail(wfInput);
    if (gPlan) {
      const freshRow = (await supabase
        .from('training_participant_satisfaction')
        .select('*')
        .eq('id', row.id)
        .single()).data as ParticipantSatisfactionRow | null;
      if (!freshRow) continue;
      const ctx2 = await loadParticipantContext(supabase, freshRow);
      if (!ctx2) continue;
      const res = await executeSendKind(supabase, ctx2, gPlan.kind, 'auto');
      if (res.skipped) stats.skipped += 1;
      else if (res.ok) stats.googleSent += 1;
      else if (res.error) stats.errors.push(res.error);
    }

    const nextQ = computeQuestionnaireNextActionAt(wfInput);
    const nextG = computeGoogleNextActionAt(wfInput);
    const patch: Record<string, unknown> = {
      questionnaire_next_action_at: nextQ,
      google_next_action_at: nextG,
      updated_at: nowIso,
    };
    if (shouldMarkSansReponse(wfInput)) {
      patch.questionnaire_status = 'sans_reponse';
      patch.questionnaire_next_action_at = null;
    }
    await supabase.from('training_participant_satisfaction').update(patch).eq('id', row.id);

    if (shouldMarkSansReponse(wfInput)) {
      await appendTimeline(
        supabase,
        row.id,
        'questionnaire_sans_reponse',
        'Questionnaire clos — sans réponse après relances',
        'auto',
      );
    }
  }

  return stats;
}
