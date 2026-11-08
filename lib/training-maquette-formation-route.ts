import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';

const APPLICATION_METIER_PATHS = [
  '/formations/application-metier-btp-niveau-1',
  '/formations/application-metier-btp-niveau-2',
  '/formations/application-metier-btp-niveau-3',
] as const;

/** Entrées thématiques sous `/formations/` — même fil d’Ariane intégré que les fiches catalogue. */
const FORMATION_THEMATIC_INTEGRATED_PATHS = [
  '/formations/ia-etudes-prix-chiffrage-btp',
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
  for (const p of FORMATION_THEMATIC_INTEGRATED_PATHS) {
    paths.add(p);
  }
  cachedPublishedFichePaths = paths;
  return paths;
}

/**
 * Fiches catalogue avec fil d’Ariane intégré au hero (maquette ou template catalogue).
 * Le fil global du layout est masqué pour éviter un doublon visuel.
 */
/** Fiches parcours métiers 2027 — fil d’Ariane intégré au hero. */
export function isParcoursMetierFichePath(pathname: string): boolean {
  const pathNorm = pathname.replace(/\/$/, '') || '/';
  return /^\/formations\/parcours\/[^/]+$/.test(pathNorm);
}

export function isCatalogueFormationFichePath(pathname: string): boolean {
  const pathNorm = pathname.replace(/\/$/, '') || '/';
  if (!pathNorm.startsWith('/formations/')) return false;
  if (isParcoursMetierFichePath(pathNorm)) return true;
  return publishedFichePaths().has(pathNorm);
}
