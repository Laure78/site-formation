/**
 * Publication programmée des fiches catalogue — masquage URL, nav, sitemap et listes
 * jusqu'à la date incluse (minuit Europe/Paris).
 */
import { FORMATIONS, CATALOGUE_NIV_RANGE, type Formation } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { clampMetaDescription } from '@/lib/meta-description';

export type FormationCatalogueCode = 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-05' | 'NIV-06' | 'NIV-07' | 'NIV-08';

/** Date de première publication (YYYY-MM-DD, inclusive, fuseau Europe/Paris). */
export const FORMATION_CATALOGUE_PUBLISH_FROM: Partial<
  Record<FormationCatalogueCode, string>
> = {
  'NIV-03': '2026-08-25',
};

export const NIV03_FORMATION_PATH = LINKS.formationConduiteTravauxSuiviChantier;

function calendarDateParis(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(date);
}

export function isFormationCataloguePublished(
  code: string,
  at: Date = new Date(),
): boolean {
  const from = FORMATION_CATALOGUE_PUBLISH_FROM[code as FormationCatalogueCode];
  if (!from) return true;
  return calendarDateParis(at) >= from;
}

export function isFormationPathPublished(pathname: string, at: Date = new Date()): boolean {
  if (
    pathname === NIV03_FORMATION_PATH ||
    pathname.startsWith(`${NIV03_FORMATION_PATH}/`)
  ) {
    return isFormationCataloguePublished('NIV-03', at);
  }
  return true;
}

export function getPublishedFormations(at: Date = new Date()): readonly Formation[] {
  return FORMATIONS.filter((f) => isFormationCataloguePublished(f.code, at));
}

/** Meta description page `/formations` — 25–160 car. (Bing / Google SERP). */
export function getCataloguePageMetaDescription(at: Date = new Date()): string {
  const raw = isFormationCataloguePublished('NIV-03', at)
    ? 'Formation IA pour le BTP : catalogue Qualiopi (devis, AO, chantier, Claude, applications métier, MOE). Présentiel IDF — financement Constructys selon éligibilité.'
    : 'Formation IA pour le BTP : catalogue Qualiopi (devis, AO, Claude, applications métier, MOE). Présentiel IDF — financement Constructys selon éligibilité.';
  return clampMetaDescription(raw);
}

export function getCatalogueFormationsCount(at: Date = new Date()): number {
  return getPublishedFormations(at).length;
}

export function getCatalogueLabelWithCount(at: Date = new Date()): string {
  return `Catalogue des ${getCatalogueFormationsCount(at)} formations IA BTP`;
}

/** Description pilier — bloc Liens connexes métier. */
export function getCataloguePilierConnexeDescription(at: Date = new Date()): string {
  const count = getCatalogueFormationsCount(at);
  if (count >= 6) {
    return 'Sessions Qualiopi — devis, appels d\'offres, chantier, Claude, applications métier, MOE.';
  }
  if (count >= 5) {
    return 'Cinq sessions Qualiopi — devis, appels d\'offres, chantier, Claude, MOE.';
  }
  return 'Quatre sessions Qualiopi — devis, appels d\'offres, Claude, MOE.';
}

/** Description page catalogue — recherche interne. */
export function getCatalogueSiteSearchDescription(at: Date = new Date()): string {
  if (isFormationCataloguePublished('NIV-03', at)) {
    return 'Formations Qualiopi 4 h — devis, appels d\'offres, conduite de travaux, Claude AI.';
  }
  return 'Formations Qualiopi 4 h — devis, appels d\'offres, Claude AI et maîtrise d\'œuvre.';
}

/** Description lien catalogue — landings métier (ex. métreur). */
export function getCatalogueSessionsRangeDescription(at: Date = new Date()): string {
  const count = getCatalogueFormationsCount(at);
  return `${count} sessions ${CATALOGUE_NIV_RANGE} — organisme Qualiopi.`;
}

/** Chemin catalogue masqué (NIV-03) — pour filtrer maillage et FAQ. */
export function isHiddenCatalogueFormationPath(path: string, at: Date = new Date()): boolean {
  return path === NIV03_FORMATION_PATH && !isFormationCataloguePublished('NIV-03', at);
}
