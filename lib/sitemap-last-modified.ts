import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { getAllArticles, type BlogArticle } from '@/lib/blog';

const ROOT = process.cwd();
const gitCache = new Map<string, Date>();

/** Repli stable si git indisponible — évite la date de build (`new Date()`). */
export const SITEMAP_CONTENT_FALLBACK = new Date('2026-04-01');

function normRoutePath(routePath: string): string {
  if (!routePath || routePath === '/') return '/';
  return routePath.startsWith('/') ? routePath.replace(/\/$/, '') || '/' : `/${routePath}`.replace(/\/$/, '');
}

/** Dernière modification git d'un fichier source (cache en mémoire). */
export function getGitContentLastModified(relativePath: string): Date | null {
  const key = relativePath.replace(/\\/g, '/');
  if (gitCache.has(key)) return gitCache.get(key)!;

  const abs = path.join(ROOT, key);
  if (!existsSync(abs)) return null;

  try {
    const iso = execSync(`git log -1 --format=%cI -- ${JSON.stringify(key)}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
      cwd: ROOT,
    }).trim();
    if (!iso) return null;
    const d = new Date(iso);
    gitCache.set(key, d);
    return d;
  } catch {
    return null;
  }
}

function maxDate(...dates: (Date | null | undefined)[]): Date {
  const valid = dates.filter((d): d is Date => d instanceof Date && !Number.isNaN(d.getTime()));
  if (!valid.length) return SITEMAP_CONTENT_FALLBACK;
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

function fromGitFiles(...relativePaths: string[]): Date {
  return maxDate(...relativePaths.map(getGitContentLastModified));
}

let latestBlogContentDate: Date | null = null;

/** Dernière date de contenu blog (dateModified si présent, sinon date de publication). */
export function getLatestBlogContentDate(): Date {
  if (latestBlogContentDate) return latestBlogContentDate;
  let max = 0;
  for (const article of getAllArticles()) {
    const t = getBlogArticleLastModified(article).getTime();
    if (!Number.isNaN(t) && t > max) max = t;
  }
  latestBlogContentDate = max > 0 ? new Date(max) : SITEMAP_CONTENT_FALLBACK;
  return latestBlogContentDate;
}

export function getBlogArticleLastModified(article: BlogArticle): Date {
  return new Date(article.dateModified ?? article.date);
}

const ROUTE_SOURCE_FILES: Record<string, readonly string[]> = {
  '/': ['app/page.tsx'],
  '/formations': ['app/formations/page.tsx', 'src/data/formations.ts'],
  '/a-propos': ['app/a-propos/page.tsx'],
  '/contact': ['app/contact/page.tsx'],
  '/financement-constructys-formation-ia-btp': ['app/financement-constructys-formation-ia-btp/page.tsx'],
  '/llms.txt': ['public/llms.txt'],
  '/claude-ai-btp': ['app/claude-ai-btp/page.tsx'],
  '/outils/cas-usage-ia-btp': ['app/outils/cas-usage-ia-btp/page.tsx'],
  '/outils-ia-btp': ['app/outils-ia-btp/page.tsx'],
  '/formation-claude-ai-btp': ['app/formation-claude-ai-btp/page.tsx'],
  '/formation-claude-ai-batiment': ['app/formation-claude-ai-batiment/page.tsx'],
  '/formation-claude-ai-travaux-publics': ['app/formation-claude-ai-travaux-publics/page.tsx'],
  '/formation-ia-btp-ile-de-france': [
    'app/formation-ia-btp-ile-de-france/page.tsx',
    'lib/formation-ia-btp-departements-config.ts',
  ],
  '/formation-ia-btp': ['app/formation-ia-btp/page.tsx'],
  '/formation-ia-btp-paris-2026': ['app/formation-ia-btp-paris-2026/page.tsx'],
  '/formations/ia-btp-morangis': ['app/formations/ia-btp-morangis/page.tsx', 'lib/formation-cities.ts'],
  '/formations/ia-btp-longjumeau': ['app/formations/ia-btp-longjumeau/page.tsx', 'lib/formation-cities.ts'],
  '/formations/ia-btp-saint-quentin-en-yvelines': [
    'app/formations/ia-btp-saint-quentin-en-yvelines/page.tsx',
    'lib/formation-cities.ts',
  ],
  '/formations/ia-btp-paris': ['app/formations/ia-btp-paris/page.tsx', 'lib/formation-cities.ts'],
  '/formation-ia-conducteur-de-travaux-btp': [
    'app/formation-ia-conducteur-de-travaux-btp/page.tsx',
  ],
  '/formation-ia-dirigeant-btp': ['app/formation-ia-dirigeant-btp/page.tsx'],
  '/formation-ia-assistante-gestion-btp': ['app/formation-ia-assistante-gestion-btp/page.tsx'],
  '/etudes-de-cas/ffb-csfe': ['app/etudes-de-cas/ffb-csfe/page.tsx'],
  '/expert-ia-btp': ['app/expert-ia-btp/page.tsx'],
  '/prendre-rdv': ['app/prendre-rdv/page.tsx'],
  '/diagnostic-ia-btp': ['app/diagnostic-ia-btp/page.tsx'],
  '/checklist-ia-btp': ['app/checklist-ia-btp/page.tsx'],
  '/communaute-formateurs': ['app/communaute-formateurs/page.tsx'],
  '/formation-ia-travaux-publics': ['app/formation-ia-travaux-publics/page.tsx'],
  '/ressources': ['app/ressources/page.tsx', 'lib/tutos/index.ts'],
  '/ressources/tutos': ['app/ressources/tutos/page.tsx', 'lib/tutos/index.ts'],
  '/ressources/ia-btp': ['app/ressources/ia-btp/page.tsx'],
  '/ressources/ia-btp/10-cas-usage-concrets': ['app/ressources/ia-btp/10-cas-usage-concrets/page.tsx'],
  '/ressources/guide-conducteur-de-travaux': ['app/ressources/guide-conducteur-de-travaux/page.tsx'],
  '/formation-ia': ['app/formation-ia/page.tsx'],
  '/formation-ia/faq': ['app/formation-ia/faq/page.tsx'],
  '/ia-devis-batiment': ['app/ia-devis-batiment/page.tsx'],
  '/formation-ia-artisans-btp': ['app/formation-ia-artisans-btp/page.tsx'],
  '/formations/formation-ia-cctp-analyse-dce-btp': ['app/formations/formation-ia-cctp-analyse-dce-btp/page.tsx'],
  '/formations/ia-batiment-travaux-publics': [
    'app/formations/ia-batiment-travaux-publics/page.tsx',
    'src/data/formations.ts',
  ],
  '/formations/ia-appels-offre-btp': ['app/formations/ia-appels-offre-btp/page.tsx', 'src/data/formations.ts'],
  '/formations/ia-conduite-travaux-suivi-chantier': [
    'app/formations/ia-conduite-travaux-suivi-chantier/page.tsx',
    'lib/formations-catalogue-display.ts',
  ],
  '/mentions-legales': ['app/mentions-legales/page.tsx'],
  '/politique-confidentialite': ['app/politique-confidentialite/page.tsx'],
  '/cgv': ['app/cgv/page.tsx'],
  '/reglement-interieur': ['app/reglement-interieur/page.tsx'],
  '/annuaire-handicap': ['app/annuaire-handicap/page.tsx'],
  '/install-pwa': ['app/install-pwa/page.tsx'],
};

/**
 * Résout la date de dernière modification réelle d'une route publique.
 * Priorité : date explicite > date article > git sur fichiers source > repli stable.
 */
export function resolveSitemapLastModified(
  routePath: string,
  opts?: {
    explicit?: Date;
    article?: BlogArticle;
    tutoUpdatedAt?: string;
    supabaseUpdatedAt?: string | null;
  }
): Date {
  if (opts?.explicit) return opts.explicit;
  if (opts?.article) return getBlogArticleLastModified(opts.article);
  if (opts?.tutoUpdatedAt) return new Date(opts.tutoUpdatedAt);
  if (opts?.supabaseUpdatedAt) return new Date(opts.supabaseUpdatedAt);

  const p = normRoutePath(routePath);

  if (p === '/blog' || p.startsWith('/blog/page/') || p.startsWith('/blog/categorie/')) {
    return getLatestBlogContentDate();
  }

  const mapped = ROUTE_SOURCE_FILES[p];
  if (mapped) return fromGitFiles(...mapped);

  if (p.startsWith('/formations/')) {
    const slug = p.slice('/formations/'.length);
    return fromGitFiles(`app/formations/${slug}/page.tsx`, 'src/data/formations.ts');
  }

  if (/^\/formation-ia-[^/]+-btp$/.test(p)) {
    const metier = p.replace('/formation-ia-', '').replace(/-btp$/, '');
    return fromGitFiles(
      `app/formation-ia-${metier}-btp/page.tsx`,
      'lib/formation-ia-metier-btp-config.ts',
      'lib/formation-ia-metier-eight-rich.ts',
      'lib/formation-ia-metier-dynamic-registry.ts'
    );
  }

  if (p.startsWith('/formation-ia-btp-')) {
    return fromGitFiles(`app${p}/page.tsx`, 'lib/formation-ia-btp-departements-config.ts');
  }

  if (p.startsWith('/formation-ia/')) {
    return fromGitFiles(`app/formation-ia/[slug]/page.tsx`, 'lib/seo-formation-ia-hub-data.ts');
  }

  if (p.startsWith('/ressources/')) {
    const slug = p.slice('/ressources/'.length);
    return fromGitFiles(`app/ressources/${slug}/page.tsx`, 'lib/tutos/index.ts');
  }

  if (p.startsWith('/cours/')) {
    return fromGitFiles('app/cours/[slug]/page.tsx');
  }

  const genericPage = `app${p}/page.tsx`;
  const gitDate = getGitContentLastModified(genericPage);
  if (gitDate) return gitDate;

  return SITEMAP_CONTENT_FALLBACK;
}
