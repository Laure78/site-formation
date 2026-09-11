import assert from 'node:assert/strict';
import {
  addCalendarDays,
  evaluateSatisfactionReminderEligibility,
  formatSatisfactionReminderAdminLabel,
  isValidReminderEmail,
  satisfactionReminderDueOn,
} from '../lib/satisfaction-reminder-logic';
import { QUESTIONNAIRE_SATISFACTION_URL } from '../lib/questionnaire-satisfaction';
import { SCHEMA_GOOGLE_REVIEW_SUBMIT_URL } from '../lib/schema-constants';
import {
  satisfactionJ1EmailSubject,
  satisfactionJ1EmailText,
} from '../emails/SatisfactionJ1Email';

console.log('assert-satisfaction-j1…');

// --- Dates J+1 ---
assert.equal(addCalendarDays('2026-09-10', 1), '2026-09-11');
assert.equal(satisfactionReminderDueOn('2026-09-10'), '2026-09-11');
// Vendredi → samedi
assert.equal(satisfactionReminderDueOn('2026-09-11'), '2026-09-12');

const base = {
  sessionEndsOn: '2026-09-10',
  sessionCancelled: false,
  enrollmentStatus: 'active' as const,
  email: 'stagiaire@example.com',
  accountStatus: 'active',
  eventStatus: null as null,
  todayParis: '2026-09-11',
};

// CAS 1 — terminée hier → envoyé
{
  const r = evaluateSatisfactionReminderEligibility(base);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.dueOn, '2026-09-11');
    assert.equal(r.isCatchUp, false);
  }
}

// CAS 2 — terminée aujourd’hui → pas encore
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    sessionEndsOn: '2026-09-11',
    todayParis: '2026-09-11',
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, 'not_yet_due');
}

// CAS 3 — terminée il y a 3 jours, jamais envoyée → rattrapage
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    sessionEndsOn: '2026-09-08',
    todayParis: '2026-09-11',
  });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.dueOn, '2026-09-09');
    assert.equal(r.isCatchUp, true);
  }
}

// CAS 4 — déjà envoyée
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    eventStatus: 'sent',
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, 'already_sent');
}

// CAS 5 — envoi en cours (2e exécution concurrente)
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    eventStatus: 'sending',
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, 'in_flight');
}

// CAS 6 — apprenant annulé
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    enrollmentStatus: 'cancelled',
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, 'enrollment_cancelled');
}

// CAS 7 — session annulée
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    sessionCancelled: true,
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, 'session_cancelled');
}

// CAS 8 — échec précédent → réessai autorisé
{
  const r = evaluateSatisfactionReminderEligibility({
    ...base,
    eventStatus: 'failed',
  });
  assert.equal(r.ok, true);
}

assert.equal(isValidReminderEmail(''), false);
assert.equal(isValidReminderEmail('pas-un-email'), false);
assert.equal(isValidReminderEmail('ok@ofc.fr'), true);

const labelSent = formatSatisfactionReminderAdminLabel({
  sessionEndsOn: '2026-09-10',
  sessionCancelled: false,
  enrollmentStatus: 'active',
  eventStatus: 'sent',
  sentAt: '2026-09-11T07:02:00.000Z',
  lastError: null,
});
assert.equal(labelSent.tone, 'ok');
assert.match(labelSent.label, /Relance envoyée/);

const labelFail = formatSatisfactionReminderAdminLabel({
  sessionEndsOn: '2026-09-10',
  sessionCancelled: false,
  enrollmentStatus: 'active',
  eventStatus: 'failed',
  sentAt: null,
  lastError: 'Resend timeout',
});
assert.equal(labelFail.tone, 'error');

// Contenu email + liens
assert.equal(satisfactionJ1EmailSubject(), 'Votre avis sur votre formation IA BTP');
const text = satisfactionJ1EmailText({
  prenom: null,
  nomFormation: 'IA BTP test',
  dateFormation: null,
});
assert.match(text, /^Bonjour,/);
assert.doesNotMatch(text, /undefined|null/);
assert.ok(text.includes(QUESTIONNAIRE_SATISFACTION_URL));
assert.ok(text.includes(SCHEMA_GOOGLE_REVIEW_SUBMIT_URL));
assert.equal(QUESTIONNAIRE_SATISFACTION_URL, 'https://tally.so/r/3NNq7l');
assert.equal(SCHEMA_GOOGLE_REVIEW_SUBMIT_URL, 'https://maps.app.goo.gl/a7zv5sXwvv4cF6cS6');

console.log('OK — assert-satisfaction-j1');
