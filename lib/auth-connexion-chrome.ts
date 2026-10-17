/** Chrome allégé (header / footer site masqués) — page connexion espace apprenant uniquement. */
export const AUTH_CONNEXION_PATH = '/auth/connexion';

export function isAuthConnexionPage(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const normalized = pathname.replace(/\/$/, '') || '/';
  return normalized === AUTH_CONNEXION_PATH;
}
