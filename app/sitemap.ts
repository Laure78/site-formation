import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '@/lib/seo';
import { formationsData } from '@/src/data/formations';
import { getAllArticles, BLOG_CATEGORIES, type BlogCategoryId } from '@/lib/blog';
import { FORMATION_IA_ALL_SLUGS } from '@/lib/seo-formation-ia-hub-data';
import { FORMATION_IA_BTP_DEPT_LANDING_PATHS } from '@/lib/formation-ia-btp-departements-config';
import { computeBlogListing } from '@/lib/blog-index-query';
import { BLOG_CATEGORY_PATH_SLUGS } from '@/lib/blog-index-urls';
import { FORMATION_IA_METIER_DYNAMIC_REGISTRY } from '@/lib/formation-ia-metier-dynamic-registry';
import { GSC_EXCLUDED_SITEMAP_PATHS, GSC_HUB_MERGED_SLUGS } from '@/lib/gsc-redirects-2026';

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
    return data.map((c) => ({
      url: `${baseUrl}/cours/${c.slug as string}`,
      lastModified: c.updated_at ? new Date(c.updated_at as string) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75 as const,
    }));
  } catch {
    return [];
  }
}

/**
 * Pages marketing listées explicitement (hors blocs générés depuis données / registres).
 * À tenir à jour lors de l’ajout de nouvelles landing pages publiques.
 */
function getAdditionalMarketingRoutes(baseUrl: string, now: Date): MetadataRoute.Sitemap {
  const entries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date }[] = [
    { path: '/llms.txt', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/etudes-de-cas/ffb-csfe', priority: 0.82, changeFrequency: 'monthly' },
    { path: '/expert-ia-btp', priority: 0.85, changeFrequency: 'monthly' },
    {
      path: '/outils-ia-btp',
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-10'),
    },
    {
      path: '/claude-ai-btp',
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-12'),
    },
    {
      path: '/formation-claude-ai-btp',
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: new Date(),
    },
    {
      path: '/formation-claude-ai-batiment',
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-21'),
    },
    {
      path: '/formation-claude-ai-travaux-publics',
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-21'),
    },
    { path: '/prendre-rdv', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/diagnostic-ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/checklist-ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/checklist-prompts-btp', priority: 0.88, changeFrequency: 'weekly' },
    { path: '/communaute-formateurs', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/formation-ia-travaux-publics', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/financement-constructys-100-ia-btp', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/ressources/ia-btp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ressources/ia-btp/10-cas-usage-concrets', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/ressources/skill-ia-conducteur-travaux', priority: 0.9, changeFrequency: 'weekly' },
    {
      path: '/formation-ia-btp-ile-de-france',
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: new Date('2026-05-19'),
    },
    { path: '/formation-ia-btp', priority: 0.98, changeFrequency: 'weekly' },
    {
      path: '/formation-ia-btp-paris-2026',
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: new Date(),
    },
    { path: '/formation-ia-analyse-cctp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/formation-ia-et-chatgpt', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ia-conducteur-travaux', priority: 0.88, changeFrequency: 'monthly' },
    {
      path: '/formation-ia-appels-offres-btp',
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: new Date('2026-05-01'),
    },
    { path: '/formations/ia-btp-paris', priority: 0.9, changeFrequency: 'weekly' },
    {
      path: '/formations/ia-btp-saint-quentin-en-yvelines',
      priority: 0.88,
      changeFrequency: 'weekly',
    },
    { path: '/formation-ia-btp-yvelines', priority: 0.9, changeFrequency: 'weekly' },
    {
      path: '/formations/ia-btp-morangis',
      priority: 0.88,
      changeFrequency: 'weekly',
      lastModified: new Date('2026-04-15'),
    },
    {
      path: '/formations/ia-btp-longjumeau',
      priority: 0.88,
      changeFrequency: 'weekly',
      lastModified: new Date('2026-04-15'),
    },
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
    {
      path: '/formation-ia-dirigeant-btp',
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-19'),
    },
    {
      path: '/formation-ia-conducteur-travaux',
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-05-19'),
    },
    { path: '/formation-ia-charge-affaires-btp', priority: 0.89, changeFrequency: 'monthly' },
    {
      path: '/formation-ia-assistante-gestion-btp',
      priority: 0.89,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-17'),
    },
    { path: '/formation-ia-assistante-administrative-btp', priority: 0.89, changeFrequency: 'monthly' },
    {
      path: '/formation-ia-assistante-btp',
      priority: 0.89,
      changeFrequency: 'monthly',
      lastModified: new Date('2026-04-17'),
    },
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
    // Pages métier canoniques (sans suffixe) — landings B1 partagées via FormationMetierB1Page
    // Note : canalisateur/paysagiste/peintre-batiment/platriste redirigent 301 vers leurs variantes
    // suffixées plus matures (cf. gscRedirects2026April), donc exclues du sitemap.
    { path: '/formation-ia-etancheur', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/formation-ia-solier-revetements', priority: 0.88, changeFrequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cgv', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/reglement-interieur', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/offres', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/annuaire-handicap', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/install-pwa', priority: 0.7, changeFrequency: 'monthly' },
  ];

  return entries.map((e) => ({
    url: `${baseUrl}${e.path}`,
    lastModified: e.lastModified ?? now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}

function buildBlogSitemapEntries(baseUrl: string, now: Date): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  out.push({
    url: `${baseUrl}/blog`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.75,
  });

  out.push(
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'daily' as const,
      priority: 0.7 as const,
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
      lastModified: now,
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
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.68,
    });
    for (let p = 2; p <= totalPages; p++) {
      out.push({
        url: `${baseUrl}/blog/categorie/${pathSlug}/${p}`,
        lastModified: now,
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
  const pathOnly = normUrl(entry.url.replace(baseUrl, '') || '/');

  const mainPages = new Set<string>(['/', '/formations', '/blog', '/a-propos', '/prendre-rdv']);
  const legalPages = new Set<string>([
    '/mentions-legales',
    '/politique-confidentialite',
    '/cgv',
    '/reglement-interieur',
    '/annuaire-handicap',
  ]);

  if (mainPages.has(pathOnly)) {
    return {
      ...entry,
      priority: 1.0,
      changeFrequency: 'weekly',
    };
  }

  // Articles blog (/blog/[slug]) : priorité contenu
  if (pathOnly.startsWith('/blog/') && !pathOnly.includes('/categorie/')) {
    return {
      ...entry,
      priority: 0.8,
      changeFrequency: 'weekly',
    };
  }

  // Pages métier (/formation-ia-[metier] ou /formation-ia-[metier]-btp)
  if (/^\/formation-ia-[^/]+$/.test(pathOnly) || /^\/formation-ia-[^/]+-btp$/.test(pathOnly)) {
    return {
      ...entry,
      priority: 0.8,
      changeFrequency: 'monthly',
    };
  }

  // Pages financement
  if (pathOnly.includes('financement-constructys')) {
    return {
      ...entry,
      priority: 0.8,
      changeFrequency: 'monthly',
    };
  }

  // Pages légales et secondaires
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
 * Sources : catalogue formations, hub /formation-ia/[slug], landings départements, blog (+ pagination + catégories),
 * pages marketing, cours en ligne (Supabase), métiers dynamiques `formation-ia-[metier]-btp` (registre).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normUrl(SITE_CONFIG.url);
  const now = new Date();

  const tier1Static: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/formations`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${baseUrl}/financement-constructys-formation-ia-btp`,
      lastModified: new Date('2026-04-18'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  const formationCatalog: MetadataRoute.Sitemap = Object.keys(formationsData).map((slug) => ({
    url: `${baseUrl}/formations/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9 as const,
  }));

  const pillarPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ia-devis-batiment`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/formation-ia-artisans-btp`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${baseUrl}/formations/formation-ia-cctp-analyse-dce-btp`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
  ];

  const formationIaHub: MetadataRoute.Sitemap = FORMATION_IA_ALL_SLUGS.filter(
    (slug) => !GSC_HUB_MERGED_SLUGS.has(slug)
  ).map((slug) => ({
    url: `${baseUrl}/formation-ia/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: slug === 'btp-paris' ? 0.93 : 0.86,
  }));

  const deptLandings: MetadataRoute.Sitemap = FORMATION_IA_BTP_DEPT_LANDING_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-04-16'),
    changeFrequency: 'weekly' as const,
    priority: 0.88 as const,
  }));

  const dynamicMetierBtp: MetadataRoute.Sitemap = Object.keys(FORMATION_IA_METIER_DYNAMIC_REGISTRY).map(
    (metier) => ({
      url: `${baseUrl}/formation-ia-${metier}-btp`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.88 as const,
    })
  );

  const blogEntries = buildBlogSitemapEntries(baseUrl, now);
  const additional = getAdditionalMarketingRoutes(baseUrl, now);
  const coursEntries = await getCoursSitemapEntries(baseUrl);

  const merged = dedupeByUrl([
    ...tier1Static,
    ...formationCatalog,
    ...pillarPages,
    ...formationIaHub,
    ...deptLandings,
    ...blogEntries,
    ...additional,
    ...dynamicMetierBtp,
    ...coursEntries,
  ]).map((entry) => applySeoPriorityRules(baseUrl, entry));

  return merged.filter((e) => {
    const pathOnly = normUrl(e.url.replace(baseUrl, '') || '/');
    return !GSC_EXCLUDED_SITEMAP_PATHS.has(pathOnly);
  });
}
