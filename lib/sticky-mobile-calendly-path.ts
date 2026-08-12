/** Pages sans bandeau sticky mobile (déjà en mode conversion ou hors site public). */
const HIDDEN_PREFIXES = [
  '/prendre-rdv',
  '/prendre-rendez-vous',
  '/admin',
  '/auth',
  '/espace-apprenant',
  '/acces-admin',
  '/invitation',
] as const;

export function shouldShowStickyMobileCalendlyBar(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return !HIDDEN_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}
