/**
 * Audit sitemap vs routes publiques indexables.
 * Usage : npx tsx scripts/audit-sitemap-routes.ts
 */
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import sitemap from '../app/sitemap';
import { getAllArticles, BLOG_CATEGORIES, type BlogCategoryId } from '../lib/blog';
import { BLOG_CATEGORY_PATH_SLUGS } from '../lib/blog-index-urls';
import { computeBlogListing } from '../lib/blog-index-query';
import { TUTOS } from '../lib/tutos';
import { FORMATION_IA_ALL_SLUGS } from '../lib/seo-formation-ia-hub-data';
import { GSC_EXCLUDED_SITEMAP_PATHS, GSC_HUB_MERGED_SLUGS } from '../lib/gsc-redirects-2026';
import {
  getSitemapCatalogueFormationPaths,
  getSitemapDepartementPaths,
  getSitemapIaTaskPaths,
  getSitemapMetierLandingPaths,
} from '../lib/sitemap-public-routes';
import { DEPARTEMENT_PAGE_PATHS } from '../lib/departement-pages';
import { FORMATION_IA_METIER_DYNAMIC_REGISTRY } from '../lib/formation-ia-metier-dynamic-registry';

const ROOT = process.cwd();

function norm(p: string): string {
  if (!p || p === '/') return '/';
  return ('/' + p.replace(/^\/+|\/+$/g, '')).replace(/\/+/g, '/') || '/';
}

/** Segments dynamiques Next (exclus de l’inventaire static). */
const DYNAMIC_DIR = /^\[.+\]$/;
const PRIVATE_SEGMENTS = new Set([
  'api',
  'admin',
  'acces-admin',
  'espace-apprenant',
  'invitation',
  'auth',
  'login',
  '(auth)',
  '(admin)',
]);

function walkAppPages(dir: string, urlParts: string[] = []): string[] {
  const out: string[] = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (name.startsWith('_') || name.startsWith('.')) continue;
      if (PRIVATE_SEGMENTS.has(name)) continue;
      if (DYNAMIC_DIR.test(name)) continue; // expansés à part
      out.push(...walkAppPages(abs, [...urlParts, name]));
      continue;
    }
    if (name === 'page.tsx' || name === 'page.ts' || name === 'page.jsx') {
      const p = urlParts.length === 0 ? '/' : '/' + urlParts.join('/');
      out.push(norm(p));
    }
  }
  return out;
}

/** Routes explicitement noindex (metadata robots.index: false). */
const KNOWN_NOINDEX = new Set<string>([
  '/install-pwa',
  // pagination blog principale (n ≥ 2) — pattern
]);

function isNoindexPath(p: string): boolean {
  if (KNOWN_NOINDEX.has(p)) return true;
  if (/^\/blog\/page\/\d+$/.test(p) && p !== '/blog/page/1') return true;
  return false;
}

/** Collecte sources de redirect depuis next.config.ts (source: '...'). */
function loadRedirectSources(): Set<string> {
  const cfg = readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  const sources = new Set<string>();
  for (const m of cfg.matchAll(/source:\s*'([^']+)'/g)) {
    const s = m[1];
    // ignore wildcards for exact inventory match
    if (s.includes(':') || s.includes('*') || s.includes('(')) continue;
    sources.add(norm(s));
  }
  return sources;
}

function expandPublicDynamic(): string[] {
  const out: string[] = [];

  // Blog articles
  for (const a of getAllArticles()) {
    out.push(norm(`/blog/${a.slug}`));
  }

  // Blog catégories (+ pagination — indexables sauf si noindex)
  for (const id of Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]) {
    const pathSlug = BLOG_CATEGORY_PATH_SLUGS[id];
    out.push(norm(`/blog/categorie/${pathSlug}`));
    const { totalPages } = computeBlogListing({
      page: 1,
      categoryId: id,
      q: null,
      excludeFeatured: false,
    });
    for (let p = 2; p <= totalPages; p++) {
      out.push(norm(`/blog/categorie/${pathSlug}/${p}`));
    }
  }

  // Tutos ressources
  for (const t of TUTOS) {
    out.push(norm(`/ressources/${t.slug}`));
  }

  // Formation-ia hub slugs
  for (const slug of FORMATION_IA_ALL_SLUGS) {
    if (GSC_HUB_MERGED_SLUGS.has(slug)) continue;
    out.push(norm(`/formation-ia/${slug}`));
  }

  // Départements
  for (const p of DEPARTEMENT_PAGE_PATHS) out.push(norm(p));

  // Métiers dynamiques registry
  for (const metier of Object.keys(FORMATION_IA_METIER_DYNAMIC_REGISTRY)) {
    out.push(norm(`/formation-ia-${metier}-btp`));
  }

  // Catalogue / ia tasks / metier from sitemap helpers (canonical registries)
  out.push(...getSitemapCatalogueFormationPaths().map(norm));
  out.push(...getSitemapIaTaskPaths().map(norm));
  out.push(...getSitemapMetierLandingPaths().map(norm));
  out.push(...getSitemapDepartementPaths().map(norm));

  return out;
}

/** Pages à exclure du « doit être dans le sitemap » même si publiques. */
const EXCLUDE_FROM_EXPECTED = new Set<string>([
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
  '/install-pwa',
  // espaces non marketing
  '/cours', // listing éventuellement privé — slugs via supabase only in sitemap
]);

async function main() {
  const staticApp = walkAppPages(path.join(ROOT, 'app'));
  const dynamic = expandPublicDynamic();
  const redirectSources = loadRedirectSources();

  const allPublic = new Set<string>();
  for (const p of [...staticApp, ...dynamic]) {
    if (p.includes('#')) continue;
    if (/\.(pdf|txt)$/i.test(p)) continue;
    allPublic.add(norm(p));
  }

  // Expected indexable candidates for sitemap
  const expected = new Set<string>();
  for (const p of allPublic) {
    if (isNoindexPath(p)) continue;
    if (EXCLUDE_FROM_EXPECTED.has(p)) continue;
    if (GSC_EXCLUDED_SITEMAP_PATHS.has(p)) continue;
    if (redirectSources.has(p)) continue;
    if (/^\/blog\/page\/\d+$/.test(p)) continue;
    expected.add(p);
  }

  const entries = await sitemap();
  const sitemapPaths = new Set<string>();
  const problems: string[] = [];

  for (const e of entries) {
    try {
      const u = new URL(e.url);
      const p = norm(u.pathname);
      if (u.hash) problems.push(`ANCRE: ${e.url}`);
      if (/\.(pdf|txt)$/i.test(p)) problems.push(`FICHIER STATIQUE: ${p}`);
      if (redirectSources.has(p)) problems.push(`REDIRECT SOURCE DANS SITEMAP: ${p}`);
      if (GSC_EXCLUDED_SITEMAP_PATHS.has(p)) problems.push(`GSC EXCLUDED: ${p}`);
      if (isNoindexPath(p)) problems.push(`NOINDEX: ${p}`);
      sitemapPaths.add(p);
    } catch {
      problems.push(`URL INVALIDE: ${e.url}`);
    }
  }

  const missing = [...expected].filter((p) => !sitemapPaths.has(p)).sort();
  const extra = [...sitemapPaths].filter((p) => !expected.has(p)).sort();

  // lastModified sanity: none should be ~now (build date) — check vs fallback & articles
  const now = Date.now();
  let lmSuspicious = 0;
  for (const e of entries) {
    const lm = e.lastModified ? new Date(e.lastModified as Date).getTime() : 0;
    if (lm > now - 60_000 && lm <= now + 60_000) lmSuspicious++;
  }

  console.log('=== INVENTAIRE ROUTES PUBLIQUES ===');
  console.log(`app/ page.tsx (static): ${staticApp.length}`);
  console.log(`expansions dynamiques (blog/tutos/hub/…): ${dynamic.length}`);
  console.log(`union dédupliquée: ${allPublic.size}`);
  console.log(`candidates sitemap (indexables, hors noindex/redirect/légal): ${expected.size}`);

  console.log('\n=== SITEMAP ACTUEL ===');
  console.log(`entrées: ${sitemapPaths.size}`);
  console.log(`problèmes structurels: ${problems.length}`);
  for (const p of problems.slice(0, 30)) console.log(`  ! ${p}`);

  console.log(`\n=== MANQUANTES (${missing.length}) — dans inventaire indexable, absentes du sitemap ===`);
  for (const p of missing.slice(0, 80)) console.log(`  - ${p}`);
  if (missing.length > 80) console.log(`  … +${missing.length - 80}`);

  console.log(`\n=== EN TROP (${extra.length}) — dans sitemap, hors inventaire attendu ===`);
  for (const p of extra.slice(0, 80)) console.log(`  + ${p}`);
  if (extra.length > 80) console.log(`  … +${extra.length - 80}`);

  console.log(`\n=== lastModified ===`);
  console.log(`entrées avec lastModified ≈ maintenant (±60s): ${lmSuspicious}`);

  console.log(`\n=== TOTAL FINAL SITEMAP ===`);
  console.log(sitemapPaths.size);

  // Write full lists for inspection
  const reportDir = path.join(ROOT, 'tmp');
  try {
    const { mkdirSync, writeFileSync } = await import('node:fs');
    mkdirSync(reportDir, { recursive: true });
    writeFileSync(
      path.join(reportDir, 'sitemap-audit-public-routes.txt'),
      [...allPublic].sort().join('\n') + '\n'
    );
    writeFileSync(
      path.join(reportDir, 'sitemap-audit-sitemap-urls.txt'),
      [...sitemapPaths].sort().join('\n') + '\n'
    );
    writeFileSync(
      path.join(reportDir, 'sitemap-audit-missing.txt'),
      missing.join('\n') + (missing.length ? '\n' : '')
    );
    writeFileSync(
      path.join(reportDir, 'sitemap-audit-extra.txt'),
      extra.join('\n') + (extra.length ? '\n' : '')
    );
    console.log('\nFichiers écrits dans tmp/sitemap-audit-*.txt');
  } catch (e) {
    console.warn('Écriture rapport tmp/ échouée', e);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
