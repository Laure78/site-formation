import type { SupabaseClient } from '@supabase/supabase-js';

/** Email du compte formateur / admin à inscrire automatiquement aux formations LMS. */
export const DEFAULT_LMS_ENROLL_EMAIL = 'laureolivie@yahoo.fr';

/**
 * Inscrit le compte Laure (ou un email fourni) à un cours.
 * Ne crée pas de compte — l’utilisateur doit déjà exister dans Auth.
 */
export async function enrollUserByEmail(
  supabase: SupabaseClient,
  courseId: string,
  email: string = DEFAULT_LMS_ENROLL_EMAIL,
): Promise<{ ok: boolean; error?: string }> {
  const normalized = email.trim().toLowerCase();

  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('id')
    .ilike('email', normalized)
    .limit(1)
    .maybeSingle();

  if (profileErr) {
    return { ok: false, error: profileErr.message };
  }

  let userId = profile?.id as string | undefined;

  if (!userId) {
    // Fallback : profils parfois sans email synchronisé — tenter via auth n’est pas possible côté client ;
    // le trigger SQL 032 / 046 couvre le cas service_role / insert courses.
    return { ok: false, error: `Aucun profil trouvé pour ${normalized}` };
  }

  const { error } = await supabase.from('enrollments').upsert(
    { user_id: userId, course_id: courseId, progress_percent: 0 },
    { onConflict: 'user_id,course_id' },
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Inscrit le compte par défaut sur toutes les formations existantes.
 * À utiliser avec un client service role (bypass RLS) ou une session admin.
 */
export async function enrollDefaultAdminOnAllCourses(
  supabase: SupabaseClient,
  email: string = DEFAULT_LMS_ENROLL_EMAIL,
): Promise<{ ok: boolean; enrolled: number; totalCourses: number; error?: string }> {
  const normalized = email.trim().toLowerCase();

  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('id')
    .ilike('email', normalized)
    .limit(1)
    .maybeSingle();

  if (profileErr) {
    return { ok: false, enrolled: 0, totalCourses: 0, error: profileErr.message };
  }
  if (!profile?.id) {
    return {
      ok: false,
      enrolled: 0,
      totalCourses: 0,
      error: `Aucun profil trouvé pour ${normalized}`,
    };
  }

  const { data: courses, error: coursesErr } = await supabase.from('courses').select('id');
  if (coursesErr) {
    return { ok: false, enrolled: 0, totalCourses: 0, error: coursesErr.message };
  }

  const list = courses ?? [];
  if (list.length === 0) {
    return { ok: true, enrolled: 0, totalCourses: 0 };
  }

  const rows = list.map((c) => ({
    user_id: profile.id,
    course_id: c.id,
    progress_percent: 0,
  }));

  const { error: upsertErr } = await supabase
    .from('enrollments')
    .upsert(rows, { onConflict: 'user_id,course_id' });

  if (upsertErr) {
    return {
      ok: false,
      enrolled: 0,
      totalCourses: list.length,
      error: upsertErr.message,
    };
  }

  return { ok: true, enrolled: list.length, totalCourses: list.length };
}
