import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { getAllArticles, BLOG_CATEGORIES, type BlogCategoryId } from '@/lib/blog';
import { FORMATION_IA_ALL_SLUGS } from '@/lib/seo-formation-ia-hub-data';
import { computeBlogListing } from '@/lib/blog-index-query';
import { BLOG_CATEGORY_PATH_SLUGS } from '@/lib/blog-index-urls';
import { GSC_EXCLUDED_SITEMAP_PATHS, GSC_HUB_MERGED_SLUGS } from '@/lib/gsc-redirects-2026';
import { TUTOS } from '@/lib/tutos';
import {
  getSitemapCatalogueFormationPaths,
  getSitemapDepartementPaths,
  getSitemapIaTaskPaths,
  getSitemapMetierLandingPaths,
} from '@/lib/sitemap-public-routes';
import {
  resolveSitemapPriority,
  SITEMAP_FORMATION_CATALOG_PATHS,
  SITEMAP_PRIORITY,
  SITEMAP_TIER1_STATIC_PATHS,
  normSitemapPath,
} from '@/lib/sitemap-tiers';
import { resolveSitemapLastModified } from '@/lib/sitemap-last-modified';

function normUrl(u: string): string {
  return u.replace(/\/$/, '');
}

/** Entrées `/cours/[slug]` — cours publiés (Supabase, clé anon, sans cookies). */
async function getCoursSitemapEntries(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('courses')
      .select('slug, updated_at')
      .eq('published', true);
    if (error || !data?.length) return [];
    return data.map((c) => {
      const slug = c.slug as string;
      return {
        url: `${baseUrl}/cours/${slug}`,
        lastModified: resolveSitemapLastModified(`/cours/${slug}`, {
          supabaseUpdatedAt: c.updated_at as string | null,
        }),
        changeFrequency: 'weekly' as const,
        priority: 0.75 as const,
      };
    });
  } catch {
    return [];
  }
}

/** Pages conformité Qualiopi (indicateur 1) — indexables, priorité crawl modérée. */
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
    changeFrequency: 'yearly' as const,
    priority: 0.3 as const,
  }));
}

/**
 * Pages marketing listées explicitement (hors blocs générés depuis données / registres).
 * À tenir à jour lors de l’ajout de nouvelles landing pages publiques.
 */
function getAdditionalMarketingRoutes(baseUrl: string): MetadataRoute.Sitemap {
  const entries: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    // N'inclure QUE des URLs canoniques répondant en 200. Jamais d'URL redirigée (3xx) ni de fichier statique (.txt/.pdf).
    { path: LINKS.partenaires, priority: 0.88, changeFrequency: 'monthly' },
    { path: LINKS.bework, priority: 0.88, changeFrequency: 'monthly' },
    { path: LINKS.beworkPlateforme, priority: 0.9, changeFrequency: 'weekly' },
    { path: LINKS.formationPlateforme, priority: 0.9, changeFrequency: 'weekly' },
    { path: LINKS.authConnexion, priority: 0.85, changeFrequency: 'monthly' },
    { path: LINKS.etudesCasHub, priority: 0.82, changeFrequency: 'monthly' },
    { path: LINKS.etudesCasFfbCsfe, priority: 0.82, changeFrequency: 'monthly' },
    { path: LINKS.etudesCasCrVocalChantier, priority: 0.8, changeFrequency: 'monthly' },
    { path: LINKS.formationIaEtudesPrixChiffrageBtp, priority: 0.88, changeFrequency: 'monthly' },
    { path: '/expert-ia-btp', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/outils-ia-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/outils/cas-usage-ia-btp', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/claude-ai-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/prendre-rendez-vous', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/diagnostic-ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/checklist-ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/communaute-formateurs', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/formation-ia-travaux-publics', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ressources', priority: 0.92, changeFrequency: 'weekly' },
    { path: LINKS.formationsLinkedInLearning, priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ressources/bibliotheque-skills', priority: 0.91, changeFrequency: 'weekly' },
    { path: '/ressources/ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ressources/ia-btp/10-cas-usage-concrets', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/ressources/guide-conducteur-de-travaux', priority: 0.9, changeFrequency: 'weekly' },
    { path: LINKS.promptsIaConducteurTravaux, priority: 0.88, changeFrequency: 'weekly' },
    { path: '/ressources/guide-maitrise-oeuvre-ia', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/ressources/guide-assistants-travaux-ofc', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/bibliotheque-prompts-btp-par-metier', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/guide-claude-btp-ofc', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/guide-dirigeant-btp-ofc', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/guide-chef-de-chantier-ofc', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/guide-rh-btp-ia-ofc', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/guide-charge-affaires-ofc', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/ressources/guide-repondre-ao-btp-ofc-2026', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/formation-ia-btp-ile-de-france', priority: 0.9, changeFrequency: 'weekly' },
    /** Pilier SEO Paris — priorité 0.9 (alignée `SITEMAP_PRIORITY.metier` via applySeoPriorityRules). */
    { path: '/formation-ia-paris', priority: SITEMAP_PRIORITY.metier, changeFrequency: 'weekly' },
    { path: LINKS.formateurIaBtp, priority: 0.88, changeFrequency: 'monthly' },
    { path: '/formation-ia-construction', priority: 0.92, changeFrequency: 'monthly' },
    { path: '/formation-ia-btp', priority: 0.95, changeFrequency: 'weekly' },
    { path: LINKS.formationChatgptBtp, priority: 0.92, changeFrequency: 'monthly' },
    { path: LINKS.formationIaConducteurDeTravaux, priority: 0.92, changeFrequency: 'monthly' },
    { path: LINKS.formationIaAppelsOffresBtp, priority: 0.92, changeFrequency: 'monthly' },
    { path: LINKS.formationClaudeBtp, priority: 0.92, changeFrequency: 'monthly' },
    { path: LINKS.formationIaEntrepriseBatimentParis, priority: 0.9, changeFrequency: 'weekly' },
    { path: '/formations/ia-btp-saint-quentin-en-yvelines', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/formations/ia-btp-morangis', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/formations/ia-btp-longjumeau', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/formation-ia', priority: 0.92, changeFrequency: 'weekly' },
    { path: '/formation-ia/faq', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/formations/ia-pme-btp', priority: 0.85, changeFrequency: 'monthly' },
    // Pages conformité : voir getComplianceSitemapRoutes (priorité 0.3)
    { path: '/annuaire-handicap', priority: 0.5, changeFrequency: 'yearly' },
    { path: LINKS.qualiopi, priority: 0.55, changeFrequency: 'yearly' },
    { path: LINKS.indicateursResultats, priority: 0.5, changeFrequency: 'yearly' },
    { path: LINKS.accessibiliteHandicap, priority: 0.5, changeFrequency: 'yearly' },
    { path: '/install-pwa', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/ressources/tutos', priority: 0.88, changeFrequency: 'weekly' },
  ];

  return entries.map((e) => ({
    url: `${baseUrl}${e.path}`,
    lastModified: resolveSitemapLastModified(e.path),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}

function buildBlogSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  out.push({
    url: `${baseUrl}/blog`,
    lastModified: resolveSitemapLastModified('/blog'),
    changeFrequency: 'weekly',
    priority: SITEMAP_PRIORITY.tier1Static,
  });

  out.push(
    // Articles publiables (MDX + BLOG_ARTICLES) — inclut notamment deux sujets distincts :
    // /blog/compte-rendu-chantier-ia-automatiser-gagner-temps (guide CR dédié)
    // /blog/5-cas-usage-chatgpt-artisans-btp (panorama 5 cas ChatGPT — dont CR en 1 point)
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: resolveSitemapLastModified(`/blog/${article.slug}`, { article }),
      changeFrequency: 'weekly' as const,
      priority: SITEMAP_PRIORITY.blogArticle,
    }))
  );

  // Pagination `/blog/page/[n]` : indexable mais exclue du sitemap (faible valeur crawl).

  for (const id of Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]) {
    const pathSlug = BLOG_CATEGORY_PATH_SLUGS[id];
    const { totalPages } = computeBlogListing({
      page: 1,
      categoryId: id,
      q: null,
      excludeFeatured: false,
    });
    out.push({
      url: `${baseUrl}/blog/categorie/${pathSlug}`,
      lastModified: resolveSitemapLastModified(`/blog/categorie/${pathSlug}`),
      changeFrequency: 'daily',
      priority: 0.68,
    });
    for (let p = 2; p <= totalPages; p++) {
      out.push({
        url: `${baseUrl}/blog/categorie/${pathSlug}/${p}`,
        lastModified: resolveSitemapLastModified(`/blog/categorie/${pathSlug}/${p}`),
        changeFrequency: 'daily',
        priority: 0.66,
      });
    }
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
    const pNew = e.priority ?? 0;
    const pOld = prev.priority ?? 0;
    const lmNew = e.lastModified;
    const lmOld = prev.lastModified;
    if (pNew > pOld) {
      map.set(key, { ...e, url: key });
    } else if (pNew === pOld && lmNew && lmOld && lmNew > lmOld) {
      map.set(key, { ...e, url: key });
    }
  }
  return [...map.values()];
}

function applySeoPriorityRules(
  baseUrl: string,
  entry: MetadataRoute.Sitemap[number]
): MetadataRoute.Sitemap[number] {
  const pathOnly = normSitemapPath(entry.url.replace(baseUrl, '') || '/');
  const tierRule = resolveSitemapPriority(pathOnly);

  if (tierRule) {
    return {
      ...entry,
      priority: tierRule.priority,
      changeFrequency: tierRule.changeFrequency,
    };
  }

  if (pathOnly === '/annuaire-handicap') {
    return {
      ...entry,
      priority: 0.5,
      changeFrequency: 'yearly',
    };
  }

  return entry;
}

/** Chemins publics exclus du sitemap (restent indexables via canonical). */
const SITEMAP_EXCLUDED_LOW_VALUE_PATHS = new Set<string>([
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
]);

/**
 * Sitemap App Router — `/sitemap.xml` (MetadataRoute.Sitemap).
 * `lastModified` : date de contenu réelle (carte git générée au build, date article,
 * Supabase, tuto, mtime) — jamais la date de build runtime.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normUrl(SITE_CONFIG.url);

  const tier1Static: MetadataRoute.Sitemap = SITEMAP_TIER1_STATIC_PATHS.map((path) => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_PRIORITY.tier1Static,
  }));

  const formationCatalogPriority: MetadataRoute.Sitemap = SITEMAP_FORMATION_CATALOG_PATHS.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: resolveSitemapLastModified(path),
      changeFrequency: 'monthly' as const,
      priority: SITEMAP_PRIORITY.formationCatalog,
    })
  );

  const formationCatalog: MetadataRoute.Sitemap = getSitemapCatalogueFormationPaths()
    .filter((path) => !(SITEMAP_FORMATION_CATALOG_PATHS as readonly string[]).includes(path))
    .map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: resolveSitemapLastModified(path),
      changeFrequency: 'monthly' as const,
      priority: 0.9 as const,
    }));

  const iaTaskPages: MetadataRoute.Sitemap = getSitemapIaTaskPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
    changeFrequency: 'weekly' as const,
    priority: 0.8 as const,
  }));

  const formationIaHub: MetadataRoute.Sitemap = FORMATION_IA_ALL_SLUGS.filter(
    (slug) =>
      !GSC_HUB_MERGED_SLUGS.has(slug) &&
      !GSC_EXCLUDED_SITEMAP_PATHS.has(`/formation-ia/${slug}`)
  ).map((slug) => ({
    url: `${baseUrl}/formation-ia/${slug}`,
    lastModified: resolveSitemapLastModified(`/formation-ia/${slug}`),
    changeFrequency: 'monthly' as const,
    priority: slug === 'btp-paris' ? 0.93 : 0.86,
  }));

  const deptLandings: MetadataRoute.Sitemap = getSitemapDepartementPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_PRIORITY.geoSatellite,
  }));

  const metierLandings: MetadataRoute.Sitemap = getSitemapMetierLandingPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
    changeFrequency: 'monthly' as const,
    priority: 0.88 as const,
  }));

  const blogEntries = buildBlogSitemapEntries(baseUrl);
  const additional = getAdditionalMarketingRoutes(baseUrl);
  const compliance = getComplianceSitemapRoutes(baseUrl);
  const coursEntries = await getCoursSitemapEntries(baseUrl);

  const tutosRessources: MetadataRoute.Sitemap = TUTOS.map((tuto) => ({
    url: `${baseUrl}/ressources/${tuto.slug}`,
    lastModified: resolveSitemapLastModified(`/ressources/${tuto.slug}`, {
      tutoUpdatedAt: tuto.updatedAt,
    }),
    changeFrequency: 'monthly' as const,
    priority: 0.8 as const,
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
    ...coursEntries,
    ...tutosRessources,
  ]).map((entry) => applySeoPriorityRules(baseUrl, entry));

  return merged.filter((e) => {
    const pathOnly = normUrl(e.url.replace(baseUrl, '') || '/');
    if (GSC_EXCLUDED_SITEMAP_PATHS.has(pathOnly)) return false;
    if (SITEMAP_EXCLUDED_LOW_VALUE_PATHS.has(pathOnly)) return false;
    // Pagination blog principale : jamais poussée dans le sitemap
    if (/^\/blog\/page\/\d+$/.test(pathOnly)) return false;
    // Fichiers statiques : jamais dans le sitemap HTML
    if (/\.(txt|pdf)$/i.test(pathOnly)) return false;
    return true;
  });
}
