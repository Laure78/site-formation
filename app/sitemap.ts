import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { formationsData } from '@/src/data/formations';
import { getAllArticles, BLOG_CATEGORIES, type BlogCategoryId } from '@/lib/blog';
import { FORMATION_IA_ALL_SLUGS } from '@/lib/seo-formation-ia-hub-data';
import { FORMATION_IA_BTP_DEPT_LANDING_PATHS } from '@/lib/formation-ia-btp-departements-config';
import { computeBlogListing } from '@/lib/blog-index-query';
import { BLOG_CATEGORY_PATH_SLUGS } from '@/lib/blog-index-urls';
import { FORMATION_IA_METIER_DYNAMIC_REGISTRY } from '@/lib/formation-ia-metier-dynamic-registry';
import { GSC_EXCLUDED_SITEMAP_PATHS, GSC_HUB_MERGED_SLUGS } from '@/lib/gsc-redirects-2026';
import { TUTOS } from '@/lib/tutos';
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
    { path: LINKS.bework, priority: 0.88, changeFrequency: 'monthly' },
    { path: LINKS.beworkPlateforme, priority: 0.9, changeFrequency: 'weekly' },
    { path: '/llms.txt', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/etudes-de-cas/ffb-csfe', priority: 0.82, changeFrequency: 'monthly' },
    { path: '/expert-ia-btp', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/outils-ia-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/outils/cas-usage-ia-btp', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/claude-ai-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/formation-claude-ai-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/formation-claude-ai-batiment', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/formation-claude-ai-travaux-publics', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/prendre-rdv', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/diagnostic-ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/checklist-ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/communaute-formateurs', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/formation-ia-travaux-publics', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ressources', priority: 0.92, changeFrequency: 'weekly' },
    { path: '/ressources/tutos', priority: 0.91, changeFrequency: 'weekly' },
    { path: '/ressources/ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ressources/ia-btp/10-cas-usage-concrets', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/ressources/guide-conducteur-de-travaux', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/formation-ia-btp-ile-de-france', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/formation-ia-btp', priority: 0.98, changeFrequency: 'weekly' },
    { path: '/formation-ia-btp-paris-2026', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ia-conducteur-travaux', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/formations/ia-btp-paris', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/formations/ia-btp-saint-quentin-en-yvelines', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/formations/ia-btp-morangis', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/formations/ia-btp-longjumeau', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/formations/ia-pme-btp', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/formation-ia', priority: 0.92, changeFrequency: 'weekly' },
    { path: '/formation-ia/faq', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/formation-ia-electricien-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-charpentier-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-ferrailleur-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-couvreur-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-vitrier-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-plombier-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-plaquiste-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-peintre-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-menuisier-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-dirigeant-pme-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-dirigeant-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/formation-ia-conducteur-de-travaux-btp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/formation-ia-charge-affaires-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-assistante-gestion-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-assistante-administrative-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-pisciniste-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-paysagiste-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-macon-paysagiste-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-cloturiste-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-carreleur-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-geometre-tp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-conducteur-engins-tp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-chef-chantier-tp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-canalisateur-tp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-macon-btp', priority: 0.89, changeFrequency: 'monthly' },
    { path: '/formation-ia-etancheur', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/formation-ia-solier-revetements', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cgv', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/reglement-interieur', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/annuaire-handicap', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/install-pwa', priority: 0.7, changeFrequency: 'monthly' },
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
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: resolveSitemapLastModified(`/blog/${article.slug}`, { article }),
      changeFrequency: 'weekly' as const,
      priority: SITEMAP_PRIORITY.blogArticle,
    }))
  );

  const mainListing = computeBlogListing({
    page: 1,
    categoryId: null,
    q: null,
    excludeFeatured: true,
  });
  for (let p = 2; p <= mainListing.totalPages; p++) {
    out.push({
      url: `${baseUrl}/blog/page/${p}`,
      lastModified: resolveSitemapLastModified(`/blog/page/${p}`),
      changeFrequency: 'daily',
      priority: 0.72,
    });
  }

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

  const legalPages = new Set<string>([
    '/mentions-legales',
    '/politique-confidentialite',
    '/cgv',
    '/reglement-interieur',
    '/annuaire-handicap',
  ]);

  if (legalPages.has(pathOnly)) {
    return {
      ...entry,
      priority: 0.6,
      changeFrequency: 'yearly',
    };
  }

  return entry;
}

/**
 * Sitemap App Router — `/sitemap.xml` (MetadataRoute.Sitemap).
 * `lastModified` : date de contenu réelle (git, date article, Supabase, tuto) — pas la date de build.
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

  const formationCatalog: MetadataRoute.Sitemap = Object.keys(formationsData)
    .filter(
      (slug) =>
        !SITEMAP_FORMATION_CATALOG_PATHS.some((p) => p.endsWith(`/${slug}`))
    )
    .map((slug) => ({
      url: `${baseUrl}/formations/${slug}`,
      lastModified: resolveSitemapLastModified(`/formations/${slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.9 as const,
    }));

  const pillarPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ia-devis-batiment`,
      lastModified: resolveSitemapLastModified('/ia-devis-batiment'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/formation-ia-artisans-btp`,
      lastModified: resolveSitemapLastModified('/formation-ia-artisans-btp'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/formations/formation-ia-cctp-analyse-dce-btp`,
      lastModified: resolveSitemapLastModified('/formations/formation-ia-cctp-analyse-dce-btp'),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
  ];

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

  const deptLandings: MetadataRoute.Sitemap = FORMATION_IA_BTP_DEPT_LANDING_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: resolveSitemapLastModified(path),
    changeFrequency: 'weekly' as const,
    priority: 0.88 as const,
  }));

  const dynamicMetierBtp: MetadataRoute.Sitemap = Object.keys(FORMATION_IA_METIER_DYNAMIC_REGISTRY).map(
    (metier) => ({
      url: `${baseUrl}/formation-ia-${metier}-btp`,
      lastModified: resolveSitemapLastModified(`/formation-ia-${metier}-btp`),
      changeFrequency: 'monthly' as const,
      priority: 0.88 as const,
    })
  );

  const blogEntries = buildBlogSitemapEntries(baseUrl);
  const additional = getAdditionalMarketingRoutes(baseUrl);
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
    ...pillarPages,
    ...formationIaHub,
    ...deptLandings,
    ...blogEntries,
    ...additional,
    ...dynamicMetierBtp,
    ...coursEntries,
    ...tutosRessources,
  ]).map((entry) => applySeoPriorityRules(baseUrl, entry));

  return merged.filter((e) => {
    const pathOnly = normUrl(e.url.replace(baseUrl, '') || '/');
    return !GSC_EXCLUDED_SITEMAP_PATHS.has(pathOnly);
  });
}
