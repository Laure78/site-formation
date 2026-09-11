/**
 * Logique pure — relance satisfaction J+1 (Europe/Paris).
 * Sans I/O : testable via scripts/assert-satisfaction-j1.ts
 */

import { parisDateKey } from '@/lib/rdv-datetime';

const PARIS = 'Europe/Paris';

/** Ajoute N jours civils à une clé YYYY-MM-DD (calendrier, hors DST). */
export function addCalendarDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
  return utc.toISOString().slice(0, 10);
}

/** Date d’envoi prévue = fin de formation + 1 jour civil. */
export function satisfactionReminderDueOn(sessionEndsOn: string): string {
  return addCalendarDays(sessionEndsOn, 1);
}

export type SatisfactionReminderEligibilityInput = {
  sessionEndsOn: string | null | undefined;
  sessionCancelled: boolean;
  enrollmentStatus: 'active' | 'cancelled' | string;
  email: string | null | undefined;
  accountStatus?: string | null;
  /** Statut événement existant (null = jamais créé). */
  eventStatus: 'pending' | 'sending' | 'sent' | 'failed' | null;
  /** Jour civil Paris de référence (défaut : aujourd’hui). */
  todayParis?: string;
};

export type SatisfactionReminderSkipReason =
  | 'no_end_date'
  | 'session_cancelled'
  | 'enrollment_cancelled'
  | 'invalid_email'
  | 'account_disabled'
  | 'not_yet_due'
  | 'already_sent'
  | 'in_flight';

export type SatisfactionReminderEligibility =
  | { ok: true; dueOn: string; isCatchUp: boolean }
  | { ok: false; reason: SatisfactionReminderSkipReason };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidReminderEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return EMAIL_RE.test(email.trim());
}

/**
 * CAS 1–8 : éligibilité d’envoi (sans claim BDD).
 * Rattrapage : dueOn < today → ok (encore jamais envoyé).
 */
export function evaluateSatisfactionReminderEligibility(
  input: SatisfactionReminderEligibilityInput
): SatisfactionReminderEligibility {
  if (!input.sessionEndsOn) {
    return { ok: false, reason: 'no_end_date' };
  }
  if (input.sessionCancelled) {
    return { ok: false, reason: 'session_cancelled' };
  }
  if (input.enrollmentStatus !== 'active') {
    return { ok: false, reason: 'enrollment_cancelled' };
  }
  if (!isValidReminderEmail(input.email)) {
    return { ok: false, reason: 'invalid_email' };
  }
  if (input.accountStatus === 'disabled') {
    return { ok: false, reason: 'account_disabled' };
  }
  if (input.eventStatus === 'sent') {
    return { ok: false, reason: 'already_sent' };
  }
  if (input.eventStatus === 'sending') {
    return { ok: false, reason: 'in_flight' };
  }

  const today = input.todayParis ?? parisDateKey(new Date());
  const dueOn = satisfactionReminderDueOn(input.sessionEndsOn);

  if (dueOn > today) {
    return { ok: false, reason: 'not_yet_due' };
  }

  return {
    ok: true,
    dueOn,
    isCatchUp: dueOn < today,
  };
}

/** Libellé admin — statut relance. */
export function formatSatisfactionReminderAdminLabel(params: {
  sessionEndsOn: string | null;
  sessionCancelled: boolean;
  enrollmentStatus: string;
  eventStatus: 'pending' | 'sending' | 'sent' | 'failed' | null;
  sentAt: string | null;
  lastError: string | null;
  now?: Date;
}): { tone: 'ok' | 'planned' | 'error' | 'na'; label: string } {
  if (params.sessionCancelled || params.enrollmentStatus === 'cancelled') {
    return { tone: 'na', label: 'Relance non applicable (annulé)' };
  }
  if (!params.sessionEndsOn) {
    return { tone: 'na', label: 'Date de fin de session manquante' };
  }
  if (params.eventStatus === 'sent' && params.sentAt) {
    const when = new Date(params.sentAt).toLocaleString('fr-FR', {
      timeZone: PARIS,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return { tone: 'ok', label: `Relance envoyée le ${when}` };
  }
  if (params.eventStatus === 'failed') {
    return {
      tone: 'error',
      label: params.lastError
        ? `Échec d’envoi — nouvelle tentative au prochain cron`
        : 'Échec d’envoi',
    };
  }

  const dueOn = satisfactionReminderDueOn(params.sessionEndsOn);
  const today = parisDateKey(params.now ?? new Date());
  const dueLabel = new Date(`${dueOn}T12:00:00`).toLocaleDateString('fr-FR', {
    timeZone: PARIS,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  if (dueOn > today) {
    return { tone: 'planned', label: `Relance prévue le ${dueLabel}` };
  }
  if (params.eventStatus === 'sending') {
    return { tone: 'planned', label: 'Envoi en cours…' };
  }
  return { tone: 'planned', label: `Relance due le ${dueLabel} (rattrapage au prochain cron)` };
}
