/**
 * Chemins internes sûrs pour redirection post-login (?next=).
 * Module sans dépendance serveur — utilisable côté client.
 */
export function sanitizeInternalPath(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const path = raw.trim();
  if (!path.startsWith('/') || path.startsWith('//')) return null;
  if (path.includes('@') || path.includes('\\') || /^https?:/i.test(path)) return null;

  const qIndex = path.indexOf('?');
  const pathname = qIndex >= 0 ? path.slice(0, qIndex) : path;
  if (!/^\/[\w\-./%]*$/.test(pathname)) return null;

  // Évite les boucles sur les pages d’auth (sauf reset-password).
  if (pathname.startsWith('/auth/') && pathname !== '/auth/reset-password') return null;

  return path;
}
