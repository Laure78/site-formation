/**
 * Routes qui nécessitent le rafraîchissement de session Supabase dans le middleware.
 * Toutes les autres pages publiques passent sans `updateSession` pour préserver la cacheabilité HTML.
 */
const SUPABASE_SESSION_PREFIXES = [
  '/admin',
  '/auth',
  '/acces-admin',
  '/espace-apprenant',
  '/messages',
  '/cours/',
  '/invitation/',
  '/questionnaire/',
] as const;

export function needsSupabaseSession(pathname: string): boolean {
  return SUPABASE_SESSION_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix)
  );
}
