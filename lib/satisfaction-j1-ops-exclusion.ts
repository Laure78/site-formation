import type { SupabaseClient } from '@supabase/supabase-js';

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
    .select('session_id, person_id')
    .in('session_id', sessionIds)
    .neq('status', 'annule');
  if (partErr) {
    console.error('[satisfaction-j1-ops-exclusion]', partErr.message);
    return excluded;
  }
  if (!participants?.length) return excluded;

  const personIds = [...new Set(participants.map((p) => p.person_id as string))];
  const { data: people, error: peopleErr } = await supabase
    .from('training_people')
    .select('id, email, profile_id')
    .in('id', personIds);
  if (peopleErr) {
    console.error('[satisfaction-j1-ops-exclusion]', peopleErr.message);
    return excluded;
  }

  const personById = new Map(
    (people ?? []).map((p) => [
      p.id as string,
      { email: String(p.email ?? ''), profile_id: (p.profile_id as string | null) ?? null },
    ]),
  );

  const enrollmentKey = (userId: string, courseId: string) => `${userId}:${courseId}`;
  const coveredKeys = new Set<string>();

  for (const row of participants) {
    const courseId = sessionToCourse.get(row.session_id as string);
    if (!courseId) continue;
    const person = personById.get(row.person_id as string);
    if (!person) continue;
    const email = person.email.trim().toLowerCase();
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
