/**
 * Routes publiques à pousser dans le sitemap — générées depuis les registres
 * (catalogue, métiers, tâches /ia-*, départements), pas une liste marketing figée.
 */
import { formationHref } from '@/data/formations';
import { DEPARTEMENT_PAGE_PATHS } from '@/lib/departement-pages';
import { FORMATION_IA_METIER_DYNAMIC_REGISTRY } from '@/lib/formation-ia-metier-dynamic-registry';
import { GSC_EXCLUDED_SITEMAP_PATHS } from '@/lib/gsc-redirects-2026';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';
import { isFormationMetierPath, normSitemapPath } from '@/lib/sitemap-tiers';

function uniqPaths(paths: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of paths) {
    const p = normSitemapPath(raw);
    if (!p || seen.has(p) || GSC_EXCLUDED_SITEMAP_PATHS.has(p)) continue;
    seen.add(p);
    out.push(p);
  }
  return out;
}

/** Home, catalogue, financement, à propos, blog, contact, partenaires. */
export const SITEMAP_CORE_STATIC_PATHS = [
  LINKS.home,
  LINKS.formations,
  LINKS.financement,
  LINKS.aPropos,
  LINKS.avisClients,
  LINKS.partenaires,
  LINKS.blog,
  LINKS.contact,
] as const;

/**
 * Sessions catalogue (5 NIV) + landing PME — les « 6 formations » sous `/formations/…`.
 * Les landings géo (Morangis, Longjumeau, SQY) et la plateforme restent dans le bloc marketing.
 */
export function getSitemapCatalogueFormationPaths(): string[] {
  return uniqPaths([
    ...getPublishedFormations().map((f) => formationHref(f)),
    LINKS.formationPmeBtp,
  ]);
}

/** Pages tâches canoniques `/ia-*` (hors redirections GSC, ex. `/ia-conducteur-travaux`). */
export function getSitemapIaTaskPaths(): string[] {
  return uniqPaths([
    LINKS.iaDevis,
    LINKS.iaAnalyseDce,
    LINKS.iaMemoireTechnique,
    LINKS.iaCompteRenduChantier,
  ]);
}

/** Pages département IDF (`/formation-ia-btp-*`). */
export function getSitemapDepartementPaths(): string[] {
  return uniqPaths([...DEPARTEMENT_PAGE_PATHS]);
}

/**
 * Landings métier `/formation-ia-*` : constantes LINKS + registre dynamique + pages
 * encore listées ici si l’URL n’a pas de clé LINKS dédiée.
 */
export function getSitemapMetierLandingPaths(): string[] {
  const fromLinks = Object.values(LINKS).filter((path) => isFormationMetierPath(path));
  const fromDynamic = Object.keys(FORMATION_IA_METIER_DYNAMIC_REGISTRY).map(
    (metier) => `/formation-ia-${metier}-btp`,
  );
  return uniqPaths([
    ...fromLinks,
    ...fromDynamic,
    LINKS.formationIaConducteurTravauxLanding,
    LINKS.chatgptArtisans,
    LINKS.formationIaTravauxPublics,
  ]);
}
