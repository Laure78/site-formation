import type { SupabaseClient } from '@supabase/supabase-js';

type SessionParticipantPerson = { email: string; profile_id: string | null };

function personFromJoin(value: unknown): SessionParticipantPerson | null {
  if (value == null) return null;
  const item = Array.isArray(value) ? value[0] : value;
  if (!item || typeof item !== 'object') return null;
  const o = item as SessionParticipantPerson;
  return o;
}

/**
 * Inscriptions LMS dont la satisfaction post-formation est gérée par training_ops
 * (participant session lié au même course_id) — exclues du cron satisfaction-j1.
 */
export async function enrollmentIdsExcludedFromSatisfactionJ1(
  supabase: SupabaseClient,
  enrollments: { id: string; user_id: string; course_id: string }[],
  emailByUserId: Map<string, string>,
): Promise<Set<string>> {
  const excluded = new Set<string>();
  if (enrollments.length === 0) return excluded;

  const courseIds = [...new Set(enrollments.map((e) => e.course_id))];

  const { data: programs, error: pErr } = await supabase
    .from('training_programs')
    .select('id, course_id')
    .in('course_id', courseIds);
  if (pErr || !programs?.length) return excluded;

  const programToCourse = new Map(programs.map((p) => [p.id as string, p.course_id as string]));
  const programIds = programs.map((p) => p.id as string);

  const { data: sessions, error: sErr } = await supabase
    .from('training_sessions')
    .select('id, program_id')
    .in('program_id', programIds);
  if (sErr || !sessions?.length) return excluded;

  const sessionIds = sessions.map((s) => s.id as string);
  const sessionToCourse = new Map(
    sessions.map((s) => [s.id as string, programToCourse.get(s.program_id as string)!]),
  );

  const { data: participants, error: partErr } = await supabase
    .from('training_session_participants')
    .select('session_id, status, person:training_people!inner(email, profile_id)')
    .in('session_id', sessionIds)
    .neq('status', 'annule');
  if (partErr) {
    console.error('[satisfaction-j1-ops-exclusion]', partErr.message);
    return excluded;
  }

  const enrollmentKey = (userId: string, courseId: string) => `${userId}:${courseId}`;
  const coveredKeys = new Set<string>();

  for (const row of participants ?? []) {
    const courseId = sessionToCourse.get(row.session_id as string);
    if (!courseId) continue;
    const person = personFromJoin(row.person as unknown);
    if (!person) continue;
    const email = person.email?.trim().toLowerCase();
    if (person.profile_id) {
      coveredKeys.add(enrollmentKey(person.profile_id, courseId));
    }
    if (email) {
      for (const [uid, em] of emailByUserId) {
        if (em.toLowerCase() === email) {
          coveredKeys.add(enrollmentKey(uid, courseId));
        }
      }
    }
  }

  for (const e of enrollments) {
    if (coveredKeys.has(enrollmentKey(e.user_id, e.course_id))) {
      excluded.add(e.id);
    }
  }

  return excluded;
}
