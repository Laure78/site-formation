import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { getAllArticles, BLOG_CATEGORIES, type BlogCategoryId } from '@/lib/blog';
import { getFormationIaHubMetierSitemapPaths } from '@/lib/formation-ia-hub-metier-rich';
import { BLOG_CATEGORY_PATH_SLUGS } from '@/lib/blog-index-urls';
import { GSC_EXCLUDED_SITEMAP_PATHS } from '@/lib/gsc-redirects-2026';
import { TUTOS } from '@/lib/tutos';
import {
  getSitemapCatalogueFormationPaths,
  getSitemapDepartementPaths,
  getSitemapIaTaskPaths,
  getSitemapMetierLandingPaths,
} from '@/lib/sitemap-public-routes';
import {
  SITEMAP_FORMATION_CATALOG_PATHS,
  SITEMAP_TIER1_STATIC_PATHS,
} from '@/lib/sitemap-tiers';
import { resolveSitemapLastModified } from '@/lib/sitemap-last-modified';

function normUrl(u: string): string {
  return u.replace(/\/$/, '');
}

/** Pages conformité Qualiopi (indicateur 1) — indexables ; date = contenu source. */
const COMPLIANCE_SITEMAP_PATHS = [
  LINKS.informationsReglementaires,
  LINKS.livretAccueilStagiaire,
  LINKS.reglementInterieur,
  LINKS.reclamations,
] as const;

function getComplianceSitemapRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return COMPLIANCE_SITEMAP_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
  }));
}

/**
 * Pages marketing listées explicitement (hors blocs générés depuis données / registres).
 * À tenir à jour lors de l’ajout de nouvelles landing pages publiques.
 */
function getAdditionalMarketingRoutes(baseUrl: string): MetadataRoute.Sitemap {
  const paths: string[] = [
    // N'inclure QUE des URLs canoniques répondant en 200. Jamais d'URL redirigée (3xx) ni de fichier statique (.txt/.pdf).
    LINKS.partenaires,
    LINKS.formationDeveloppementWebIaSansCoder,
    // /formations/plateforme : noindex (hors sitemap)
    LINKS.etudesCasHub,
    LINKS.etudesCasFfbCsfe,
    LINKS.etudesCasCrVocalChantier,
    LINKS.formationIaEtudesPrixChiffrageBtp,
    '/expert-ia-btp',
    '/outils-ia-btp',
    '/outils/cas-usage-ia-btp',
    '/claude-ai-btp',
    LINKS.prendreRdv,
    '/diagnostic-ia-btp',
    '/checklist-ia-btp',
    // /communaute-formateurs : noindex (hors sitemap)
    '/formation-ia-travaux-publics',
    '/ressources',
    LINKS.formationsLinkedInLearning,
    '/ressources/bibliotheque-skills',
    '/ressources/ia-btp',
    '/ressources/ia-btp/10-cas-usage-concrets',
    '/ressources/guide-conducteur-de-travaux',
    LINKS.promptsIaConducteurTravaux,
    '/ressources/guide-maitrise-oeuvre-ia',
    '/ressources/guide-assistants-travaux-ofc',
    '/ressources/bibliotheque-prompts-btp-par-metier',
    '/ressources/guide-claude-btp-ofc',
    '/ressources/guide-dirigeant-btp-ofc',
    '/ressources/guide-chef-de-chantier-ofc',
    '/ressources/guide-rh-btp-ia-ofc',
    '/ressources/guide-charge-affaires-ofc',
    '/ressources/guide-repondre-ao-btp-ofc-2026',
    LINKS.evenementRepondreAoBtp5Etapes,
    LINKS.tutoSkillPic,
    '/formation-ia-btp-ile-de-france',
    '/formation-ia-paris',
    LINKS.formateurIaBtp,
    '/formation-ia-construction',
    LINKS.formations,
    LINKS.formationChatgptBtp,
    LINKS.formationIaConducteurDeTravaux,
    LINKS.formationIaAppelsOffresBtp,
    LINKS.formationMaitriserClaudeAiBtp,
    LINKS.formationClaudeAiBatiment,
    LINKS.formationClaudeAiTravauxPublics,
    LINKS.formationIaBtpParis,
    '/formations/ia-btp-saint-quentin-en-yvelines',
    '/formations/ia-btp-morangis',
    '/formations/ia-btp-longjumeau',
    '/formation-ia',
    '/formation-ia/faq',
    '/formations/ia-pme-btp',
    // Pages conformité : voir getComplianceSitemapRoutes
    '/annuaire-handicap',
    LINKS.qualiopi,
    LINKS.indicateursResultats,
    LINKS.accessibiliteHandicap,
    // /install-pwa : noindex (hors sitemap)
    '/ressources/tutos',
    LINKS.blogGuideSkillIaConducteurTravaux,
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
  }));
}

function buildBlogSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  out.push({
    url: `${baseUrl}/blog`,
    lastModified: resolveSitemapLastModified('/blog'),
  });

  out.push(
    // Articles publiables (MDX + BLOG_ARTICLES) — date = dateModified ?? date publication
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: resolveSitemapLastModified(`/blog/${article.slug}`, { article }),
    })),
  );

  // Pagination `/blog/page/[n]` : noindex + exclue du sitemap (faible valeur crawl).
  // Pagination `/blog/categorie/*/2…` : exclue (seule la page 1 de catégorie reste).

  for (const id of Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]) {
    const pathSlug = BLOG_CATEGORY_PATH_SLUGS[id];
    out.push({
      url: `${baseUrl}/blog/categorie/${pathSlug}`,
      lastModified: resolveSitemapLastModified(`/blog/categorie/${pathSlug}`),
    });
  }

  return out;
}

function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const map = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const e of entries) {
    const key = normUrl(e.url);
    const prev = map.get(key);
    if (!prev) {
      map.set(key, { ...e, url: key });
      continue;
    }
    const lmNew = e.lastModified;
    const lmOld = prev.lastModified;
    if (lmNew && lmOld && lmNew > lmOld) {
      map.set(key, { ...e, url: key });
    }
  }
  return [...map.values()];
}

/** Chemins publics exclus du sitemap (restent indexables via canonical / maillage). */
const SITEMAP_EXCLUDED_LOW_VALUE_PATHS = new Set<string>([
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
]);

/**
 * Préfixes exclus du sitemap : toute URL commençant par l'un de ces préfixes
 * est filtrée (ex. /cours/* — canonical redirigé vers les fiches catalogue).
 */
const SITEMAP_EXCLUDED_PREFIXES = ['/cours/'] as const;

/** Pages noindex exclues du sitemap. */
const SITEMAP_NOINDEX_PATHS = new Set<string>([
  '/communaute-formateurs',
  '/formations/plateforme',
]);

/**
 * Sitemap App Router — `/sitemap.xml` (MetadataRoute.Sitemap).
 * `lastModified` : date de contenu réelle (carte git générée au build, date article,
 * Supabase, tuto, mtime) — jamais `new Date()` / date de build runtime.
 * Pas de `priority` ni `changeFrequency` (Google les ignore).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normUrl(SITE_CONFIG.url);

  const tier1Static: MetadataRoute.Sitemap = SITEMAP_TIER1_STATIC_PATHS.map((path) => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
  }));

  const formationCatalogPriority: MetadataRoute.Sitemap = SITEMAP_FORMATION_CATALOG_PATHS.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: resolveSitemapLastModified(path),
    }),
  );

  const formationCatalog: MetadataRoute.Sitemap = getSitemapCatalogueFormationPaths()
    .filter((path) => !(SITEMAP_FORMATION_CATALOG_PATHS as readonly string[]).includes(path))
    .map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: resolveSitemapLastModified(path),
    }));

  const iaTaskPages: MetadataRoute.Sitemap = getSitemapIaTaskPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
  }));

  // Hubs métier réécrits (indexables) ; les autres `/formation-ia/[slug]` restent noindex
  const formationIaHub: MetadataRoute.Sitemap = getFormationIaHubMetierSitemapPaths().map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: resolveSitemapLastModified(path),
    }),
  );

  const deptLandings: MetadataRoute.Sitemap = getSitemapDepartementPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
  }));

  const metierLandings: MetadataRoute.Sitemap = getSitemapMetierLandingPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
  }));

  const blogEntries = buildBlogSitemapEntries(baseUrl);
  const additional = getAdditionalMarketingRoutes(baseUrl);
  const compliance = getComplianceSitemapRoutes(baseUrl);

  const tutosRessources: MetadataRoute.Sitemap = TUTOS.map((tuto) => ({
    url: `${baseUrl}/ressources/${tuto.slug}`,
    lastModified: resolveSitemapLastModified(`/ressources/${tuto.slug}`, {
      tutoUpdatedAt: tuto.updatedAt,
    }),
  }));

  const merged = dedupeByUrl([
    ...tier1Static,
    ...formationCatalogPriority,
    ...formationCatalog,
    ...iaTaskPages,
    ...metierLandings,
    ...formationIaHub,
    ...deptLandings,
    ...blogEntries,
    ...additional,
    ...compliance,
    ...tutosRessources,
  ]);

  return merged.filter((e) => {
    const pathOnly = normUrl(e.url.replace(baseUrl, '') || '/');
    if (GSC_EXCLUDED_SITEMAP_PATHS.has(pathOnly)) return false;
    if (SITEMAP_EXCLUDED_LOW_VALUE_PATHS.has(pathOnly)) return false;
    if (SITEMAP_NOINDEX_PATHS.has(pathOnly)) return false;
    if (SITEMAP_EXCLUDED_PREFIXES.some((pfx) => pathOnly.startsWith(pfx))) return false;
    // Pagination blog principale : jamais poussée dans le sitemap
    if (/^\/blog\/page\/\d+$/.test(pathOnly)) return false;
    // Pagination catégories blog (page ≥ 2)
    if (/^\/blog\/categorie\/[^/]+\/\d+$/.test(pathOnly)) return false;
    // Fichiers statiques / ancres : jamais dans le sitemap HTML
    if (pathOnly.includes('#')) return false;
    if (/\.(txt|pdf)$/i.test(pathOnly)) return false;
    return true;
  });
}
