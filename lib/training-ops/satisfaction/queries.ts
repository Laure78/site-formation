import { createAdminClient } from '@/lib/supabase/admin';
import type { GoogleStatus, QuestionnaireStatus } from '@/lib/training-ops/satisfaction/types';
import {
  computeGoogleNextActionAt,
  computeQuestionnaireNextActionAt,
  planGoogleEmail,
  planQuestionnaireEmails,
} from '@/lib/training-ops/satisfaction/workflow-logic';
import { getSatisfactionSettings } from '@/lib/training-ops/satisfaction/settings';
import { parisDateKey } from '@/lib/rdv-datetime';
import type { SatisfactionEmailKind } from '@/lib/training-ops/satisfaction/types';

export type SatisfactionDashboardFilters = {
  q?: string;
  formationId?: string;
  sessionId?: string;
  trainerId?: string;
  questionnaireStatus?: QuestionnaireStatus;
  googleStatus?: GoogleStatus;
  actionsOnly?: boolean;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
};

export type SatisfactionTableRow = {
  id: string;
  participantName: string;
  email: string;
  formationTitle: string;
  sessionReference: string;
  sessionId: string;
  sessionDate: string | null;
  trainerName: string;
  questionnaireStatus: QuestionnaireStatus;
  questionnaireSentAt: string | null;
  questionnaireReminderCount: number;
  questionnaireCompletedAt: string | null;
  questionnaireScore: number | null;
  googleStatus: GoogleStatus;
  googleSentAt: string | null;
  nextActionLabel: string;
  accessToken: string;
};

export async function listSatisfactionDashboardRows(
  filters: SatisfactionDashboardFilters = {},
): Promise<SatisfactionTableRow[]> {
  const supabase = createAdminClient();
  const settings = await getSatisfactionSettings();
  const todayParis = parisDateKey(new Date());

  let query = supabase.from('training_participant_satisfaction').select(`
    *,
    participant:training_session_participants(
      person:training_people(first_name, last_name, email),
      session:training_sessions(
        id, reference, starts_on, ends_on, primary_trainer_id,
        program:training_programs(id, title)
      )
    )
  `);

  if (filters.sessionId) query = query.eq('session_id', filters.sessionId);

  const { data, error } = await query.order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);

  const { data: deliveries } = await supabase
    .from('training_satisfaction_email_deliveries')
    .select('participant_satisfaction_id, email_kind, status')
    .eq('status', 'sent');

  const sentByPs = new Map<string, Set<SatisfactionEmailKind>>();
  for (const d of deliveries ?? []) {
    const set = sentByPs.get(d.participant_satisfaction_id) ?? new Set();
    set.add(d.email_kind as SatisfactionEmailKind);
    sentByPs.set(d.participant_satisfaction_id, set);
  }

  const trainerIds = new Set<string>();
  for (const row of data ?? []) {
    const session = (row.participant as { session?: { primary_trainer_id?: string } })?.session;
    if (session?.primary_trainer_id) trainerIds.add(session.primary_trainer_id);
  }
  const trainerMap = new Map<string, string>();
  if (trainerIds.size) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .in('id', [...trainerIds]);
    for (const p of profiles ?? []) {
      trainerMap.set(p.id, [p.first_name, p.last_name].filter(Boolean).join(' '));
    }
  }

  const rows: SatisfactionTableRow[] = [];

  for (const raw of data ?? []) {
    const part = raw.participant as {
      person: { first_name: string; last_name: string; email: string };
      session: {
        id: string;
        reference: string;
        starts_on: string | null;
        ends_on: string | null;
        primary_trainer_id: string | null;
        program: { id: string; title: string } | null;
      };
    } | null;
    if (!part?.person || !part.session) continue;

    const name = `${part.person.first_name} ${part.person.last_name}`.trim();
    const email = part.person.email;
    if (filters.q) {
      const hay = `${name} ${email} ${part.session.reference}`.toLowerCase();
      if (!hay.includes(filters.q.toLowerCase())) continue;
    }
    if (filters.formationId && part.session.program?.id !== filters.formationId) continue;
    if (filters.trainerId && part.session.primary_trainer_id !== filters.trainerId) continue;
    if (filters.questionnaireStatus && raw.questionnaire_status !== filters.questionnaireStatus) {
      continue;
    }
    if (filters.googleStatus && raw.google_status !== filters.googleStatus) continue;

    const sessionDate = part.session.ends_on ?? part.session.starts_on;
    if (filters.dateFrom && sessionDate && sessionDate < filters.dateFrom) continue;
    if (filters.dateTo && sessionDate && sessionDate > filters.dateTo) continue;

    const sentKinds = sentByPs.get(raw.id) ?? new Set();
    const wf = {
      settings,
      sessionEndedOn: raw.session_ended_on,
      questionnaireStatus: raw.questionnaire_status,
      questionnaireDisabled: raw.questionnaire_disabled,
      questionnaireReminderCount: raw.questionnaire_reminder_count,
      questionnaireCompletedAt: raw.questionnaire_completed_at,
      googleStatus: raw.google_status,
      googleDisabled: raw.google_disabled,
      googleReminderCount: raw.google_reminder_count,
      sentKinds,
      todayParis,
      nowIso: new Date().toISOString(),
    };
    const qPlan = planQuestionnaireEmails(wf);
    const gPlan = planGoogleEmail(wf);
    const needsAction = Boolean(qPlan || gPlan || raw.questionnaire_status === 'echec_envoi' || raw.google_status === 'echec_envoi');
    if (filters.actionsOnly && !needsAction) continue;

    let nextActionLabel = '—';
    if (qPlan) nextActionLabel = qPlan.reason;
    else if (gPlan) nextActionLabel = gPlan.reason;
    else if (raw.questionnaire_next_action_at) {
      nextActionLabel = `Programmé ${new Date(raw.questionnaire_next_action_at).toLocaleDateString('fr-FR')}`;
    } else if (raw.google_next_action_at) {
      nextActionLabel = `Google ${new Date(raw.google_next_action_at).toLocaleDateString('fr-FR')}`;
    }

    rows.push({
      id: raw.id,
      participantName: name,
      email,
      formationTitle: part.session.program?.title ?? '—',
      sessionReference: part.session.reference,
      sessionId: part.session.id,
      sessionDate,
      trainerName: part.session.primary_trainer_id
        ? trainerMap.get(part.session.primary_trainer_id) ?? '—'
        : 'Laure Olivié',
      questionnaireStatus: raw.questionnaire_status,
      questionnaireSentAt: raw.questionnaire_first_sent_at,
      questionnaireReminderCount: raw.questionnaire_reminder_count,
      questionnaireCompletedAt: raw.questionnaire_completed_at,
      questionnaireScore: raw.questionnaire_score,
      googleStatus: raw.google_status,
      googleSentAt: raw.google_first_sent_at,
      nextActionLabel,
      accessToken: raw.access_token,
    });
  }

  const sort = filters.sort ?? 'session_desc';
  rows.sort((a, b) => {
    switch (sort) {
      case 'session_asc':
        return (a.sessionDate ?? '').localeCompare(b.sessionDate ?? '');
      case 'response_desc':
        return (b.questionnaireCompletedAt ?? '').localeCompare(a.questionnaireCompletedAt ?? '');
      case 'score_desc':
        return (b.questionnaireScore ?? -1) - (a.questionnaireScore ?? -1);
      case 'name_asc':
        return a.participantName.localeCompare(b.participantName, 'fr');
      case 'session_desc':
      default:
        return (b.sessionDate ?? '').localeCompare(a.sessionDate ?? '');
    }
  });

  return rows;
}

export async function getSatisfactionKpis() {
  const rows = await listSatisfactionDashboardRows();
  const completed = rows.filter((r) => r.questionnaireStatus === 'complete');
  const scores = completed
    .map((r) => r.questionnaireScore)
    .filter((s): s is number => s != null);
  const avg =
    scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

  return {
    tauxReponse:
      rows.length > 0 ? Math.round((completed.length / rows.length) * 100) : 0,
    envoyes: rows.filter((r) => r.questionnaireSentAt).length,
    enAttente: rows.filter(
      (r) => !['complete', 'desactive', 'sans_reponse'].includes(r.questionnaireStatus),
    ).length,
    completes: completed.length,
    sansReponse: rows.filter((r) => r.questionnaireStatus === 'sans_reponse').length,
    satisfactionMoyenne: avg != null ? Math.round(avg * 100) / 100 : null,
    relancesAEffectuer: rows.filter((r) =>
      r.nextActionLabel.includes('Relance') || r.nextActionLabel.includes('Premier envoi'),
    ).length,
    googleProgrammes: rows.filter((r) =>
      ['a_programmer', 'programme'].includes(r.googleStatus),
    ).length,
    googleEnvoyes: rows.filter((r) => ['envoye', 'relance_envoyee'].includes(r.googleStatus)).length,
    googleRelances: rows.filter((r) => r.googleStatus === 'relance_envoyee').length,
    googleTermines: rows.filter((r) => r.googleStatus === 'termine').length,
  };
}

export async function getTimeline(participantSatisfactionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_satisfaction_timeline')
    .select('*')
    .eq('participant_satisfaction_id', participantSatisfactionId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getEmailDeliveriesForParticipant(participantSatisfactionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_satisfaction_email_deliveries')
    .select('*')
    .eq('participant_satisfaction_id', participantSatisfactionId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
