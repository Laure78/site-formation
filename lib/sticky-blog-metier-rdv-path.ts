/**
 * Bandeau sticky RDV bas d’écran — fiches métiers `/formation-ia-*` (desktop uniquement).
 * Mobile : `StickyMobileCalendlyCta` (site entier, un seul CTA Calendly).
 */
export function isStickyBlogMetierRdvPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  if (p === '/blog' || p.startsWith('/blog/')) return false;

  if (p.startsWith('/formation-ia-')) return true;

  return false;
}
