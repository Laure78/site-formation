/**
 * Bandeau sticky RDV bas d’écran — pages concernées (articles blog + fiches métiers).
 * Exclut la liste /blog, l’accueil et le catalogue /formations.
 */
export function isStickyBlogMetierRdvPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  if (p === '/blog') return false;
  if (p.startsWith('/blog/')) return true;

  if (p.startsWith('/formation-ia-')) return true;

  return false;
}
