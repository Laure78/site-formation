/**
 * Publication programmée des fiches catalogue — masquage URL, nav, sitemap et listes
 * jusqu'à la date incluse (minuit Europe/Paris).
 */
import { FORMATIONS, type Formation } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';

export type FormationCatalogueCode = 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-05';

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

/** Meta description page `/formations` — sans NIV-03 tant que non publiée. */
export function getCataloguePageMetaDescription(at: Date = new Date()): string {
  if (isFormationCataloguePublished('NIV-03', at)) {
    return "5 formations IA pour le BTP en 4 h : devis, appels d'offres, conduite de travaux, Claude AI et maîtrise d'œuvre. Présentiel IDF — organisme certifié Qualiopi, Constructys.";
  }
  return "4 formations IA pour le BTP en 4 h : devis, appels d'offres, Claude AI et maîtrise d'œuvre. Présentiel IDF — organisme certifié Qualiopi, Constructys.";
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
  return `${count} sessions NIV-01 à NIV-05 — organisme Qualiopi.`;
}

/** Chemin catalogue masqué (NIV-03) — pour filtrer maillage et FAQ. */
export function isHiddenCatalogueFormationPath(path: string, at: Date = new Date()): boolean {
  return path === NIV03_FORMATION_PATH && !isFormationCataloguePublished('NIV-03', at);
}
