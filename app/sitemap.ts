import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';
import { formationsData } from '@/src/data/formations';
import { getAllArticles } from '@/lib/blog';
import { FORMATION_IA_ALL_SLUGS } from '@/lib/seo-formation-ia-hub-data';

function normUrl(u: string): string {
  return u.replace(/\/$/, '');
}

/** Routes additionnelles (hors blocs prioritaires) — dédoublonnées par URL. */
function getLegacyRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/etudes-de-cas/ffb-csfe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    { url: `${baseUrl}/expert-ia-btp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    {
      url: `${baseUrl}/outils-ia-btp`,
      lastModified: new Date('2026-04-10'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/claude-ai-btp`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: `${baseUrl}/auteur/laure-olivie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/prendre-rdv`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/diagnostic-ia-btp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/checklist-ia-btp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/checklist-prompts-btp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${baseUrl}/communaute-formateurs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    {
      url: `${baseUrl}/formation-ia-travaux-publics`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: `${baseUrl}/financement-constructys-100-ia-btp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.88 },
    { url: `${baseUrl}/ressources/ia-btp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    {
      url: `${baseUrl}/ressources/ia-btp/10-cas-usage-concrets`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/formation-ia-btp-ile-de-france`,
      lastModified: new Date('2026-05-19'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formation-ia-btp`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/repondre-appels-offres-ia-btp`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/formation-ia-appels-offres-btp`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${baseUrl}/formations/ia-btp-paris`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    {
      url: `${baseUrl}/formations/ia-btp-yvelines-78`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formations/ia-btp-saint-quentin-en-yvelines`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/formation-ia-btp-yvelines`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${baseUrl}/formations/ia-btp-lyon`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/formations/ia-btp-bordeaux`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/formations/ia-btp-lille`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/formations/ia-pme-btp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/formation-ia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.92 },
    { url: `${baseUrl}/formation-ia/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.88 },
    ...FORMATION_IA_ALL_SLUGS.map((slug) => ({
      url: `${baseUrl}/formation-ia/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: slug === 'btp-paris' ? 0.93 : 0.86,
    })),
    {
      url: `${baseUrl}/formation-chatgpt-artisan-electricien`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/formation-ia-electricien-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-charpentier-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-ferrailleur-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-etancheur-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-couvreur-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-vitrier-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-plombier-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-plaquiste-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-peintre-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-menuisier-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-dirigeant-pme-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-conducteur-travaux-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-conducteur-travaux`,
      lastModified: new Date('2026-05-19'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formation-ia-charge-affaires-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-assistante-administrative-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-pisciniste-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-paysagiste-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-macon-paysagiste-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-cloturiste-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-carreleur-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-geometre-tp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-conducteur-engins-tp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-chef-chantier-tp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-canalisateur-tp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    {
      url: `${baseUrl}/formation-ia-macon-btp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.89,
    },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cgv`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/reglement-interieur`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/offres`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/annuaire-handicap`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/install-pwa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}

/**
 * Sitemap App Router — exposé sur `/sitemap.xml` (MetadataRoute.Sitemap).
 *
 * Priorités demandées :
 * - 1.0 + weekly : accueil, formations (index), à propos, contact, financement
 * - 0.9 + monthly : chaque `/formations/[slug]` du catalogue (`formationsData`)
 * - 0.8 + weekly : pages piliers métier
 * - 0.7 + daily : articles `/blog/[slug]` (lastModified = date de publication)
 * - index blog : daily
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = normUrl(SITE_CONFIG.url);
  const ts = new Date();

  const tier1Static: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: ts, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/formations`, lastModified: ts, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/a-propos`, lastModified: ts, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/contact`, lastModified: ts, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${baseUrl}/financement-constructys-formation-ia-btp`,
      lastModified: ts,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const formationCatalog: MetadataRoute.Sitemap = Object.keys(formationsData).map((slug) => ({
    url: `${baseUrl}/formations/${slug}`,
    lastModified: ts,
    changeFrequency: 'monthly' as const,
    priority: 0.9 as const,
  }));

  const pillarPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ia-devis-batiment`, lastModified: ts, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ia-conducteur-travaux`, lastModified: ts, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/formation-ia-artisans-btp`, lastModified: ts, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: ts, changeFrequency: 'daily', priority: 0.75 },
  ];

  const blogArticles: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'daily' as const,
    priority: 0.7 as const,
  }));

  const prioritized = [
    ...tier1Static,
    ...formationCatalog,
    ...pillarPages,
    ...blogIndex,
    ...blogArticles,
  ];

  const taken = new Set(prioritized.map((e) => normUrl(e.url)));

  const legacyFiltered = getLegacyRoutes(baseUrl).filter((e) => !taken.has(normUrl(e.url)));

  return [...prioritized, ...legacyFiltered];
}
