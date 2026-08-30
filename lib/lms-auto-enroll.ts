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
    // le trigger SQL 032 couvre le cas service_role / insert courses.
    return { ok: false, error: `Aucun profil trouvé pour ${normalized}` };
  }

  const { error } = await supabase.from('enrollments').upsert(
    { user_id: userId, course_id: courseId, progress_percent: 0 },
    { onConflict: 'user_id,course_id' },
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
