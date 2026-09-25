/**
 * Logique pure — workflows questionnaire & Google (testable sans BDD).
 */
import { addCalendarDays } from '@/lib/satisfaction-reminder-logic';
import type {
  GoogleStatus,
  QuestionnaireStatus,
  SatisfactionEmailKind,
  SatisfactionSettings,
} from '@/lib/training-ops/satisfaction/types';

export type PlannedEmailAction = {
  kind: SatisfactionEmailKind;
  reason: string;
};

export type WorkflowInput = {
  settings: Pick<
    SatisfactionSettings,
    | 'questionnaire_auto_enabled'
    | 'questionnaire_first_send_days'
    | 'questionnaire_reminder_1_days'
    | 'questionnaire_reminder_2_days'
    | 'questionnaire_max_reminders'
    | 'google_auto_enabled'
    | 'google_delay_after_complete_days'
    | 'google_reminder_days'
    | 'google_max_reminders'
  >;
  sessionEndedOn: string | null;
  questionnaireStatus: QuestionnaireStatus;
  questionnaireDisabled: boolean;
  questionnaireReminderCount: number;
  questionnaireCompletedAt: string | null;
  googleStatus: GoogleStatus;
  googleDisabled: boolean;
  googleReminderCount: number;
  /** ISO timestamps des envois déjà réussis par kind */
  sentKinds: Set<SatisfactionEmailKind>;
  todayParis: string;
  nowIso: string;
};

function parseDay(isoOrDate: string): string {
  return isoOrDate.slice(0, 10);
}

/** Action questionnaire due à une date Paris (YYYY-MM-DD). */
export function planQuestionnaireEmails(input: WorkflowInput): PlannedEmailAction | null {
  if (input.questionnaireDisabled) return null;
  if (input.questionnaireStatus === 'complete' || input.questionnaireStatus === 'desactive') {
    return null;
  }
  if (!input.sessionEndedOn || !input.settings.questionnaire_auto_enabled) return null;

  const firstDue = addCalendarDays(
    input.sessionEndedOn,
    input.settings.questionnaire_first_send_days,
  );
  const r1Due = addCalendarDays(input.sessionEndedOn, input.settings.questionnaire_reminder_1_days);
  const r2Due = addCalendarDays(input.sessionEndedOn, input.settings.questionnaire_reminder_2_days);

  if (!input.sentKinds.has('questionnaire_initial') && input.todayParis >= firstDue) {
    return { kind: 'questionnaire_initial', reason: 'Premier envoi questionnaire (J+' + input.settings.questionnaire_first_send_days + ')' };
  }

  if (
    input.settings.questionnaire_max_reminders >= 1 &&
    !input.sentKinds.has('questionnaire_reminder_1') &&
    input.sentKinds.has('questionnaire_initial') &&
    input.todayParis >= r1Due &&
    !input.questionnaireCompletedAt
  ) {
    return { kind: 'questionnaire_reminder_1', reason: 'Relance questionnaire 1' };
  }

  if (
    input.settings.questionnaire_max_reminders >= 2 &&
    !input.sentKinds.has('questionnaire_reminder_2') &&
    input.sentKinds.has('questionnaire_reminder_1') &&
    input.todayParis >= r2Due &&
    !input.questionnaireCompletedAt
  ) {
    return { kind: 'questionnaire_reminder_2', reason: 'Relance questionnaire 2 (dernière)' };
  }

  return null;
}

export function planGoogleEmail(input: WorkflowInput): PlannedEmailAction | null {
  if (input.googleDisabled) return null;
  if (!input.settings.google_auto_enabled) return null;
  if (!input.questionnaireCompletedAt) return null;
  if (input.googleStatus === 'termine' || input.googleStatus === 'desactive') return null;

  const completedDay = parseDay(input.questionnaireCompletedAt);
  const firstDue = addCalendarDays(
    completedDay,
    input.settings.google_delay_after_complete_days,
  );
  const reminderDue = addCalendarDays(
    completedDay,
    input.settings.google_delay_after_complete_days + input.settings.google_reminder_days,
  );

  if (!input.sentKinds.has('google_initial') && input.todayParis >= firstDue) {
    return { kind: 'google_initial', reason: 'Demande avis Google après questionnaire' };
  }

  if (
    input.settings.google_max_reminders >= 1 &&
    !input.sentKinds.has('google_reminder_1') &&
    input.sentKinds.has('google_initial') &&
    input.todayParis >= reminderDue
  ) {
    return { kind: 'google_reminder_1', reason: 'Relance avis Google' };
  }

  return null;
}

export function nextQuestionnaireStatusAfterSend(
  kind: SatisfactionEmailKind,
  current: QuestionnaireStatus,
): QuestionnaireStatus {
  if (kind === 'questionnaire_initial') return 'envoye';
  if (kind === 'questionnaire_reminder_1') return 'relance_1_envoyee';
  if (kind === 'questionnaire_reminder_2') return 'relance_2_envoyee';
  return current;
}

export function nextGoogleStatusAfterSend(kind: SatisfactionEmailKind): GoogleStatus {
  if (kind === 'google_initial') return 'envoye';
  if (kind === 'google_reminder_1') return 'relance_envoyee';
  return 'envoye';
}

export function questionnaireStatusAfterComplete(): QuestionnaireStatus {
  return 'complete';
}

export function googleStatusAfterQuestionnaireComplete(): GoogleStatus {
  return 'a_programmer';
}

export function computeQuestionnaireNextActionAt(
  input: WorkflowInput,
): string | null {
  if (input.questionnaireDisabled || input.questionnaireStatus === 'complete') return null;
  if (!input.sessionEndedOn) return null;

  const firstDue = addCalendarDays(
    input.sessionEndedOn,
    input.settings.questionnaire_first_send_days,
  );
  if (!input.sentKinds.has('questionnaire_initial')) {
    return `${firstDue}T09:00:00.000Z`;
  }
  if (
    !input.questionnaireCompletedAt &&
    input.settings.questionnaire_max_reminders >= 1 &&
    !input.sentKinds.has('questionnaire_reminder_1')
  ) {
    const d = addCalendarDays(input.sessionEndedOn, input.settings.questionnaire_reminder_1_days);
    return `${d}T09:00:00.000Z`;
  }
  if (
    !input.questionnaireCompletedAt &&
    input.settings.questionnaire_max_reminders >= 2 &&
    !input.sentKinds.has('questionnaire_reminder_2')
  ) {
    const d = addCalendarDays(input.sessionEndedOn, input.settings.questionnaire_reminder_2_days);
    return `${d}T09:00:00.000Z`;
  }
  return null;
}

export function computeGoogleNextActionAt(input: WorkflowInput): string | null {
  if (input.googleDisabled || input.googleStatus === 'termine') return null;
  if (!input.questionnaireCompletedAt) return null;
  const completedDay = parseDay(input.questionnaireCompletedAt);
  if (!input.sentKinds.has('google_initial')) {
    const d = addCalendarDays(completedDay, input.settings.google_delay_after_complete_days);
    return `${d}T09:00:00.000Z`;
  }
  if (input.settings.google_max_reminders >= 1 && !input.sentKinds.has('google_reminder_1')) {
    const d = addCalendarDays(
      completedDay,
      input.settings.google_delay_after_complete_days + input.settings.google_reminder_days,
    );
    return `${d}T09:00:00.000Z`;
  }
  return null;
}

/** Une action manuelle récente (< 24 h) demande confirmation. */
export function shouldConfirmManualResend(lastSentAt: string | null, now: Date): boolean {
  if (!lastSentAt) return false;
  const last = new Date(lastSentAt).getTime();
  return now.getTime() - last < 24 * 60 * 60 * 1000;
}

/** Dernière date (Paris) à laquelle une relance questionnaire pouvait encore être envoyée. */
export function lastQuestionnaireActionDay(input: WorkflowInput): string | null {
  if (!input.sessionEndedOn) return null;
  const { questionnaire_max_reminders, questionnaire_reminder_2_days, questionnaire_reminder_1_days, questionnaire_first_send_days } =
    input.settings;
  if (questionnaire_max_reminders >= 2) {
    return addCalendarDays(input.sessionEndedOn, questionnaire_reminder_2_days);
  }
  if (questionnaire_max_reminders >= 1) {
    return addCalendarDays(input.sessionEndedOn, questionnaire_reminder_1_days);
  }
  return addCalendarDays(input.sessionEndedOn, questionnaire_first_send_days);
}

/** Après épuisement des relances et délai final — sans réponse. */
export function shouldMarkSansReponse(input: WorkflowInput): boolean {
  if (input.questionnaireDisabled || input.questionnaireCompletedAt) return false;
  if (['complete', 'desactive', 'sans_reponse'].includes(input.questionnaireStatus)) return false;
  if (!input.sentKinds.has('questionnaire_initial')) return false;
  if (planQuestionnaireEmails(input)) return false;
  const lastDay = lastQuestionnaireActionDay(input);
  if (!lastDay) return false;
  return input.todayParis > lastDay;
}
