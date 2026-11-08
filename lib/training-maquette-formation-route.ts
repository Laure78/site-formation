import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';

const APPLICATION_METIER_PATHS = [
  '/formations/application-metier-btp-niveau-1',
  '/formations/application-metier-btp-niveau-2',
  '/formations/application-metier-btp-niveau-3',
] as const;

let cachedPublishedFichePaths: ReadonlySet<string> | null = null;

function publishedFichePaths(): ReadonlySet<string> {
  if (cachedPublishedFichePaths) return cachedPublishedFichePaths;
  const paths = new Set<string>();
  for (const f of getPublishedFormations()) {
    paths.add(`/formations/${f.slug}`);
  }
  for (const p of APPLICATION_METIER_PATHS) {
    paths.add(p);
  }
  cachedPublishedFichePaths = paths;
  return paths;
}

/**
 * Fiches catalogue avec fil d’Ariane intégré au hero (maquette ou template catalogue).
 * Le fil global du layout est masqué pour éviter un doublon visuel.
 */
export function isCatalogueFormationFichePath(pathname: string): boolean {
  const pathNorm = pathname.replace(/\/$/, '') || '/';
  if (!pathNorm.startsWith('/formations/')) return false;
  return publishedFichePaths().has(pathNorm);
}
