/**
 * Relance satisfaction J+1 — sélection candidats, claim atomique, envoi Resend.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import {
  evaluateSatisfactionReminderEligibility,
  satisfactionReminderDueOn,
} from '@/lib/satisfaction-reminder-logic';
import { sendSatisfactionJ1Email } from '@/lib/send-satisfaction-j1-email';
import { parisDateKey } from '@/lib/rdv-datetime';

const EMAIL_TYPE = 'satisfaction_j1' as const;

export type SatisfactionJ1Candidate = {
  enrollmentId: string;
  userId: string;
  courseId: string;
  email: string;
  prenom: string | null;
  nomFormation: string;
  sessionEndsOn: string;
  eventStatus: 'pending' | 'sending' | 'sent' | 'failed' | null;
};

function formatSessionDateFr(dateKey: string): string {
  return new Date(`${dateKey}T12:00:00`).toLocaleDateString('fr-FR', {
    timeZone: 'Europe/Paris',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function yesterdayParisKey(todayParis: string): string {
  const [y, m, d] = todayParis.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - 1, 12, 0, 0)).toISOString().slice(0, 10);
}

/**
 * Inscriptions actives dont la session est terminée depuis ≥ 1 jour civil Paris,
 * sans relance « sent », email valide, compte non disabled, session non annulée.
 */
export async function listSatisfactionJ1Candidates(
  supabase: SupabaseClient,
  todayParis: string = parisDateKey()
): Promise<SatisfactionJ1Candidate[]> {
  const maxEndsOn = yesterdayParisKey(todayParis);

  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(
      `
      id,
      user_id,
      course_id,
      status,
      courses!inner (
        id,
        title,
        session_ends_on,
        session_cancelled
      )
    `
    )
    .eq('status', 'active')
    .eq('courses.session_cancelled', false)
    .not('courses.session_ends_on', 'is', null)
    .lte('courses.session_ends_on', maxEndsOn);

  if (error) {
    throw new Error(`[satisfaction-j1] select enrollments: ${error.message}`);
  }

  if (!enrollments?.length) return [];

  const userIds = [...new Set(enrollments.map((e) => e.user_id as string))];
  const enrollmentIds = enrollments.map((e) => e.id as string);

  const [{ data: profiles, error: pErr }, { data: events, error: evErr }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, email, first_name, full_name, account_status')
      .in('id', userIds),
    supabase
      .from('enrollment_email_events')
      .select('enrollment_id, status')
      .eq('email_type', EMAIL_TYPE)
      .in('enrollment_id', enrollmentIds),
  ]);

  if (pErr) throw new Error(`[satisfaction-j1] select profiles: ${pErr.message}`);
  if (evErr) throw new Error(`[satisfaction-j1] select events: ${evErr.message}`);

  const profileById = new Map((profiles ?? []).map((p) => [p.id as string, p]));
  const eventsByEnrollment = new Map(
    (events ?? []).map((ev) => [ev.enrollment_id as string, ev.status as string])
  );

  const out: SatisfactionJ1Candidate[] = [];

  for (const row of enrollments) {
    const course = Array.isArray(row.courses) ? row.courses[0] : row.courses;
    const profile = profileById.get(row.user_id as string);
    if (!course || !profile) continue;

    const sessionEndsOn = course.session_ends_on as string | null;
    const eventStatus = (eventsByEnrollment.get(row.id as string) ?? null) as
      | 'pending'
      | 'sending'
      | 'sent'
      | 'failed'
      | null;

    const eligibility = evaluateSatisfactionReminderEligibility({
      sessionEndsOn,
      sessionCancelled: Boolean(course.session_cancelled),
      enrollmentStatus: (row.status as string) || 'active',
      email: profile.email as string | null,
      accountStatus: profile.account_status as string | null,
      eventStatus,
      todayParis,
    });

    if (!eligibility.ok || !sessionEndsOn || !profile.email) continue;

    const prenom =
      (profile.first_name as string | null)?.trim() ||
      (typeof profile.full_name === 'string'
        ? profile.full_name.trim().split(/\s+/)[0] || null
        : null);

    out.push({
      enrollmentId: row.id as string,
      userId: row.user_id as string,
      courseId: row.course_id as string,
      email: String(profile.email).trim(),
      prenom,
      nomFormation: String(course.title || 'Formation IA BTP'),
      sessionEndsOn,
      eventStatus,
    });
  }

  return out;
}

/**
 * Claim atomique : insert si absent, puis passe pending/failed → sending.
 * Retourne false si déjà sent / sending récent / conflit concurrent.
 */
export async function claimSatisfactionJ1Send(
  supabase: SupabaseClient,
  enrollmentId: string,
  dueOn: string
): Promise<boolean> {
  await supabase.from('enrollment_email_events').upsert(
    {
      enrollment_id: enrollmentId,
      email_type: EMAIL_TYPE,
      status: 'pending',
      scheduled_for: dueOn,
      attempt_count: 0,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'enrollment_id,email_type', ignoreDuplicates: true }
  );

  const { data: current } = await supabase
    .from('enrollment_email_events')
    .select('id, status, attempt_count, updated_at')
    .eq('enrollment_id', enrollmentId)
    .eq('email_type', EMAIL_TYPE)
    .maybeSingle();

  if (!current) return false;
  if (current.status === 'sent') return false;

  if (current.status === 'sending') {
    const updatedAt = current.updated_at ? new Date(current.updated_at as string).getTime() : 0;
    const stale = Date.now() - updatedAt > 30 * 60_000;
    if (!stale) return false;
    // Libère le claim coincé
    await supabase
      .from('enrollment_email_events')
      .update({
        status: 'failed',
        last_error: 'Claim sending expiré (timeout 30 min)',
        updated_at: new Date().toISOString(),
      })
      .eq('id', current.id)
      .eq('status', 'sending');
  }

  const { data: claimed, error } = await supabase
    .from('enrollment_email_events')
    .update({
      status: 'sending',
      attempt_count: (current.attempt_count ?? 0) + 1,
      scheduled_for: dueOn,
      updated_at: new Date().toISOString(),
    })
    .eq('id', current.id)
    .in('status', ['pending', 'failed'])
    .select('id')
    .maybeSingle();

  return Boolean(!error && claimed);
}

export async function markSatisfactionJ1Sent(
  supabase: SupabaseClient,
  enrollmentId: string
): Promise<void> {
  await supabase
    .from('enrollment_email_events')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
      last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq('enrollment_id', enrollmentId)
    .eq('email_type', EMAIL_TYPE)
    .eq('status', 'sending');
}

export async function markSatisfactionJ1Failed(
  supabase: SupabaseClient,
  enrollmentId: string,
  errorMessage: string
): Promise<void> {
  const safe = errorMessage.slice(0, 500);
  await supabase
    .from('enrollment_email_events')
    .update({
      status: 'failed',
      last_error: safe,
      updated_at: new Date().toISOString(),
    })
    .eq('enrollment_id', enrollmentId)
    .eq('email_type', EMAIL_TYPE)
    .eq('status', 'sending');
}

export type SatisfactionJ1RunResult = {
  candidates: number;
  sent: number;
  skipped: number;
  failed: number;
  errors: string[];
};

/** Exécute la relance pour tous les candidats éligibles (cron). */
export async function runSatisfactionJ1Reminders(
  supabase: SupabaseClient,
  todayParis: string = parisDateKey()
): Promise<SatisfactionJ1RunResult> {
  const candidates = await listSatisfactionJ1Candidates(supabase, todayParis);
  let sent = 0;
  let skipped = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const c of candidates) {
    const dueOn = satisfactionReminderDueOn(c.sessionEndsOn);
    const claimed = await claimSatisfactionJ1Send(supabase, c.enrollmentId, dueOn);
    if (!claimed) {
      skipped += 1;
      continue;
    }

    const result = await sendSatisfactionJ1Email({
      to: c.email,
      prenom: c.prenom,
      nomFormation: c.nomFormation,
      dateFormation: formatSessionDateFr(c.sessionEndsOn),
    });

    if (!result.ok) {
      failed += 1;
      errors.push(`${c.enrollmentId.slice(0, 8)}: ${result.error}`);
      await markSatisfactionJ1Failed(supabase, c.enrollmentId, result.error);
      console.error('[satisfaction-j1] send failed', c.enrollmentId.slice(0, 8), result.error);
      continue;
    }

    await markSatisfactionJ1Sent(supabase, c.enrollmentId);
    sent += 1;
    console.info('[satisfaction-j1] sent', c.enrollmentId.slice(0, 8), c.courseId.slice(0, 8));
  }

  return {
    candidates: candidates.length,
    sent,
    skipped,
    failed,
    errors,
  };
}
