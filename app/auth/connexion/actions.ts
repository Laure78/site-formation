'use server';

import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/auth';
import { canAccessAdmin, sanitizeInternalPath } from '@/lib/admin-access';

/** Détermine la redirection après connexion (sans exposer la liste blanche côté client). */
export async function resolvePostLoginRedirect(nextRaw: string | null): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return '/auth/connexion';

  const safeNext = sanitizeInternalPath(nextRaw);
  if (safeNext) return safeNext;

  const profile = await getProfile(user.id);
  if (canAccessAdmin(profile, user.email)) return '/admin';

  return '/espace-apprenant';
}
