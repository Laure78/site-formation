import { LINKS } from '@/lib/internal-links';

/** Route page hub parcours métiers — header et fil d’Ariane maquette dédiés. */
export function isParcoursMetiersMaquetteRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const norm = pathname.replace(/\/$/, '') || '/';
  return norm === LINKS.parcoursMetiers;
}
