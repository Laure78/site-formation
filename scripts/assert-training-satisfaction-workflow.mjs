/**
 * Cas 1–8 — logique workflow satisfaction (sans BDD).
 */
import assert from 'node:assert/strict';

function addCalendarDays(dateKey, days) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
  return utc.toISOString().slice(0, 10);
}

function planQuestionnaireEmails(input) {
  const { settings, sessionEndedOn, questionnaireDisabled, questionnaireCompletedAt, sentKinds, todayParis } =
    input;
  if (questionnaireDisabled || questionnaireCompletedAt) return null;
  if (!sessionEndedOn || !settings.questionnaire_auto_enabled) return null;

  const firstDue = addCalendarDays(sessionEndedOn, settings.questionnaire_first_send_days);
  const r1Due = addCalendarDays(sessionEndedOn, settings.questionnaire_reminder_1_days);
  const r2Due = addCalendarDays(sessionEndedOn, settings.questionnaire_reminder_2_days);

  if (!sentKinds.has('questionnaire_initial') && todayParis >= firstDue) {
    return { kind: 'questionnaire_initial' };
  }
  if (
    settings.questionnaire_max_reminders >= 1 &&
    !sentKinds.has('questionnaire_reminder_1') &&
    sentKinds.has('questionnaire_initial') &&
    todayParis >= r1Due
  ) {
    return { kind: 'questionnaire_reminder_1' };
  }
  if (
    settings.questionnaire_max_reminders >= 2 &&
    !sentKinds.has('questionnaire_reminder_2') &&
    sentKinds.has('questionnaire_reminder_1') &&
    todayParis >= r2Due
  ) {
    return { kind: 'questionnaire_reminder_2' };
  }
  return null;
}

function planGoogleEmail(input) {
  const { settings, questionnaireCompletedAt, googleDisabled, sentKinds, todayParis } = input;
  if (googleDisabled || !settings.google_auto_enabled || !questionnaireCompletedAt) return null;
  const completedDay = questionnaireCompletedAt.slice(0, 10);
  const firstDue = addCalendarDays(completedDay, settings.google_delay_after_complete_days);
  const reminderDue = addCalendarDays(
    completedDay,
    settings.google_delay_after_complete_days + settings.google_reminder_days,
  );
  if (!sentKinds.has('google_initial') && todayParis >= firstDue) {
    return { kind: 'google_initial' };
  }
  if (
    settings.google_max_reminders >= 1 &&
    !sentKinds.has('google_reminder_1') &&
    sentKinds.has('google_initial') &&
    todayParis >= reminderDue
  ) {
    return { kind: 'google_reminder_1' };
  }
  return null;
}

const settings = {
  questionnaire_auto_enabled: true,
  questionnaire_first_send_days: 0,
  questionnaire_reminder_1_days: 3,
  questionnaire_reminder_2_days: 7,
  questionnaire_max_reminders: 2,
  google_auto_enabled: true,
  google_delay_after_complete_days: 1,
  google_reminder_days: 5,
  google_max_reminders: 1,
};

const base = {
  settings,
  sessionEndedOn: '2026-09-01',
  questionnaireDisabled: false,
  questionnaireCompletedAt: null,
  sentKinds: new Set(),
  todayParis: '2026-09-01',
};

assert.equal(planQuestionnaireEmails(base)?.kind, 'questionnaire_initial');

const j3 = {
  ...base,
  todayParis: '2026-09-04',
  sentKinds: new Set(['questionnaire_initial']),
};
assert.equal(planQuestionnaireEmails(j3)?.kind, 'questionnaire_reminder_1');

assert.equal(
  planQuestionnaireEmails({ ...j3, questionnaireCompletedAt: '2026-09-02T10:00:00.000Z' }),
  null,
);

const googleDue = {
  ...base,
  questionnaireCompletedAt: '2026-09-02T10:00:00.000Z',
  todayParis: '2026-09-03',
  sentKinds: new Set(['questionnaire_initial']),
  googleDisabled: false,
};
assert.equal(planGoogleEmail(googleDue)?.kind, 'google_initial');

assert.equal(
  planQuestionnaireEmails({
    ...base,
    sentKinds: new Set(['questionnaire_initial']),
    todayParis: '2026-09-01',
  }),
  null,
);

assert.equal(planQuestionnaireEmails({ ...base, questionnaireDisabled: true }), null);

console.log('check:training-satisfaction OK');
