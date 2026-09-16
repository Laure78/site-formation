#!/usr/bin/env node
/**
 * Audit inventaire routes publiques vs logique sitemap (sans importer Next/React).
 * Usage: node scripts/audit-sitemap-routes.mjs
 */
import { readdirSync, existsSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function norm(p) {
  if (!p || p === '/') return '/';
  return ('/' + String(p).replace(/^\/+|\/+$/g, '')).replace(/\/+/g, '/') || '/';
}

const PRIVATE = new Set([
  'api', 'admin', 'acces-admin', 'espace-apprenant', 'invitation', 'auth', 'login',
]);
const DYNAMIC_DIR = /^\[.+\]$/;

function walkAppPages(dir, urlParts = []) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const abs = path.join(dir, name);
    let st;
    try { st = statSync(abs); } catch { continue; }
    if (st.isDirectory()) {
      if (name.startsWith('_') || name.startsWith('.') || name.startsWith('(')) continue;
      if (PRIVATE.has(name) || DYNAMIC_DIR.test(name)) continue;
      out.push(...walkAppPages(abs, [...urlParts, name]));
      continue;
    }
    if (/^page\.(tsx|ts|jsx|js)$/.test(name)) {
      out.push(norm(urlParts.length ? '/' + urlParts.join('/') : '/'));
    }
  }
  return out;
}

function read(rel) {
  return readFileSync(path.join(ROOT, rel), 'utf8');
}

/** Extrait slugs `slug: '…'` d’articles TS + fichiers MDX. */
function blogSlugs() {
  const slugs = new Set();
  // MDX
  const mdxDir = path.join(ROOT, 'content/blog');
  if (existsSync(mdxDir)) {
    for (const f of readdirSync(mdxDir)) {
      if (f.endsWith('.mdx')) slugs.add(f.replace(/\.mdx$/, ''));
    }
  }
  // BLOG_ARTICLES / fichiers blog-*.ts — slug: 'x'
  for (const rel of [
    'lib/blog.ts',
    'lib/blog-ia-devis-batiment-chiffrage-automatise.ts',
    'lib/blog-claude-btp-2026-articles.ts',
    'lib/blog-lsr-ao-modules-articles.ts',
    'lib/blog-formation-ia-cctp-pillar.ts',
  ]) {
    if (!existsSync(path.join(ROOT, rel))) continue;
    const txt = read(rel);
    for (const m of txt.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/g)) {
      slugs.add(m[1]);
    }
  }
  // publishable filters — excluded
  let excluded = new Set();
  try {
    const filt = read('lib/blog-publishable-filters.ts');
    for (const m of filt.matchAll(/['"]([a-z0-9-]+)['"]/g)) excluded.add(m[1]);
  } catch { /* ignore */ }
  // Keep all MDX + TS for inventory; sitemap uses getAllArticles which filters
  return [...slugs];
}

function tutoSlugs() {
  const index = read('lib/tutos/index.ts');
  // imports of ./tuto-xxx
  const files = [...index.matchAll(/from '\.\/(tuto-[a-z0-9-]+)'/g)].map((m) => m[1]);
  const slugs = [];
  for (const f of files) {
    const txt = read(`lib/tutos/${f}.ts`);
    const m = txt.match(/slug:\s*['"]([^'"]+)['"]/);
    if (m) slugs.push(m[1]);
  }
  return slugs;
}

function formationIaHubSlugs() {
  const txt = read('lib/seo-formation-ia-hub-data.ts');
  const m = txt.match(/FORMATION_IA_ALL_SLUGS[^=]*=\s*\[([\s\S]*?)\]\s*as/);
  if (!m) return [];
  return [...m[1].matchAll(/['"]([a-z0-9-]+)['"]/g)].map((x) => x[1]);
}

function gscExcluded() {
  const txt = read('lib/gsc-redirects-2026.ts');
  const set = new Set();
  // paths like '/foo'
  for (const m of txt.matchAll(/['"](\/[a-z0-9/_-]+)['"]/g)) {
    if (m[1].includes('*')) continue;
    set.add(norm(m[1]));
  }
  return set;
}

function gscHubMerged() {
  const txt = read('lib/gsc-redirects-2026.ts');
  const m = txt.match(/GSC_HUB_MERGED_SLUGS[^=]*=\s*new Set\(\[([\s\S]*?)\]\)/);
  if (!m) return new Set();
  return new Set([...m[1].matchAll(/['"]([a-z0-9-]+)['"]/g)].map((x) => x[1]));
}

function redirectExactSources() {
  const cfg = read('next.config.ts');
  const set = new Set();
  for (const m of cfg.matchAll(/source:\s*'([^']+)'/g)) {
    const s = m[1];
    if (/[:(*]/.test(s)) continue;
    set.add(norm(s));
  }
  return set;
}

function extractQuotedPaths(txt) {
  return [...txt.matchAll(/['`](\/[a-zA-Z0-9/_-]*)['`]/g)].map((m) => norm(m[1]));
}

/** Reconstruit l’ensemble sitemap à partir des mêmes sources que app/sitemap.ts. */
function rebuildSitemapPaths() {
  const paths = new Set();
  const add = (p) => {
    const n = norm(p);
    if (!n || n.includes('#')) return;
    if (/\.(pdf|txt)$/i.test(n)) return;
    paths.add(n);
  };

  // Tier 1 from sitemap-tiers
  try {
    const tiers = read('lib/sitemap-tiers.ts');
    const m = tiers.match(/SITEMAP_TIER1_STATIC_PATHS[^=]*=\s*\[([\s\S]*?)\]\s*as/);
    if (m) for (const p of extractQuotedPaths(m[1])) add(p);
    const m2 = tiers.match(/SITEMAP_FORMATION_CATALOG_PATHS[^=]*=\s*\[([\s\S]*?)\]\s*as/);
    if (m2) for (const p of extractQuotedPaths(m2[1])) add(p);
  } catch { /* */ }

  // Catalogue formations published — approx: all app/formations/*/page.tsx except plateforme/cities handled separately
  const formDir = path.join(ROOT, 'app/formations');
  if (existsSync(formDir)) {
    for (const name of readdirSync(formDir)) {
      const page = path.join(formDir, name, 'page.tsx');
      if (existsSync(page)) add(`/formations/${name}`);
    }
  }

  // IA tasks
  for (const p of ['/ia-devis-batiment', '/ia-analyse-dce-btp', '/ia-memoire-technique-btp', '/ia-compte-rendu-chantier']) {
    add(p);
  }

  // Départements
  for (const name of readdirSync(path.join(ROOT, 'app')).filter((n) => n.startsWith('formation-ia-btp-'))) {
    if (existsSync(path.join(ROOT, 'app', name, 'page.tsx'))) add(`/${name}`);
  }

  // Métiers formation-ia-*-btp
  for (const name of readdirSync(path.join(ROOT, 'app'))) {
    if (/^formation-ia-.+-btp$/.test(name) && existsSync(path.join(ROOT, 'app', name, 'page.tsx'))) {
      add(`/${name}`);
    }
  }

  // Hub formation-ia/[slug]
  const merged = gscHubMerged();
  const excluded = gscExcluded();
  for (const slug of formationIaHubSlugs()) {
    if (merged.has(slug)) continue;
    const p = `/formation-ia/${slug}`;
    if (!excluded.has(p)) add(p);
  }

  // Blog
  add('/blog');
  for (const slug of blogSlugs()) add(`/blog/${slug}`);

  // Catégories blog — from BLOG_CATEGORY_PATH_SLUGS
  try {
    const urls = read('lib/blog-index-urls.ts');
    const m = urls.match(/BLOG_CATEGORY_PATH_SLUGS[^=]*=\s*\{([\s\S]*?)\}/);
    if (m) {
      for (const sm of m[1].matchAll(/:\s*['"]([a-z0-9-]+)['"]/g)) {
        add(`/blog/categorie/${sm[1]}`);
      }
    }
  } catch { /* */ }

  // Marketing additional from sitemap.ts getAdditionalMarketingRoutes
  const sm = read('app/sitemap.ts');
  const block = sm.match(/function getAdditionalMarketingRoutes[\s\S]*?return entries/);
  if (block) {
    for (const p of extractQuotedPaths(block[0])) add(p);
    // LINKS.xxx won't be in quotes — resolve common LINKS from internal-links for paths used
  }

  // Resolve LINKS used in additional block
  const linksTxt = read('lib/internal-links.ts');
  const links = {};
  for (const m of linksTxt.matchAll(/^\s*([a-zA-Z0-9_]+):\s*'(\/[^']*)'/gm)) {
    links[m[1]] = m[2];
  }
  for (const m of sm.matchAll(/LINKS\.([a-zA-Z0-9_]+)/g)) {
    if (links[m[1]]) add(links[m[1]]);
  }

  // Compliance
  for (const k of ['informationsReglementaires', 'livretAccueilStagiaire', 'reglementInterieur', 'reclamations']) {
    if (links[k]) add(links[k]);
  }

  // Tutos
  for (const slug of tutoSlugs()) add(`/ressources/${slug}`);

  // Filters like sitemap()
  const low = new Set(['/mentions-legales', '/politique-confidentialite', '/cgv']);
  for (const p of [...paths]) {
    if (excluded.has(p) || low.has(p)) paths.delete(p);
    if (/^\/blog\/page\/\d+$/.test(p)) paths.delete(p);
    if (p === '/install-pwa') paths.delete(p);
  }

  return paths;
}

function isNoindex(p) {
  if (p === '/install-pwa') return true;
  if (/^\/blog\/page\/\d+$/.test(p)) return true;
  return false;
}

const NOINDEX_OR_PRIVATE_STATIC = new Set([
  '/install-pwa',
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
  '/cours', // listing — cours individuels via CMS
]);

function main() {
  const staticApp = walkAppPages(path.join(ROOT, 'app')).map(norm);
  const blog = blogSlugs().map((s) => norm(`/blog/${s}`));
  const tutos = tutoSlugs().map((s) => norm(`/ressources/${s}`));
  const hub = formationIaHubSlugs()
    .filter((s) => !gscHubMerged().has(s))
    .map((s) => norm(`/formation-ia/${s}`));

  const allPublic = new Set([...staticApp, ...blog, ...tutos, ...hub]);

  // Expand blog categories from static app (categorie/[id] is dynamic — add from urls file)
  try {
    const urls = read('lib/blog-index-urls.ts');
    const m = urls.match(/BLOG_CATEGORY_PATH_SLUGS[^=]*=\s*\{([\s\S]*?)\}/);
    if (m) {
      for (const sm of m[1].matchAll(/:\s*['"]([a-z0-9-]+)['"]/g)) {
        allPublic.add(norm(`/blog/categorie/${sm[1]}`));
      }
    }
  } catch { /* */ }

  const redirects = redirectExactSources();
  const excluded = gscExcluded();

  const expected = new Set();
  for (const p of allPublic) {
    if (isNoindex(p)) continue;
    if (NOINDEX_OR_PRIVATE_STATIC.has(p)) continue;
    if (excluded.has(p)) continue;
    if (redirects.has(p)) continue;
    if (p.includes('#')) continue;
    if (/\.(pdf|txt)$/i.test(p)) continue;
    // admin-like leftovers
    if (p.startsWith('/admin') || p.startsWith('/api')) continue;
    expected.add(p);
  }

  const sitemapPaths = rebuildSitemapPaths();

  const missing = [...expected].filter((p) => !sitemapPaths.has(p)).sort();
  const extra = [...sitemapPaths].filter((p) => !expected.has(p)).sort();

  // Structural checks on sitemap
  const structural = [];
  for (const p of sitemapPaths) {
    if (p.includes('#')) structural.push(`ancre ${p}`);
    if (/\.(pdf|txt)$/i.test(p)) structural.push(`fichier ${p}`);
    if (redirects.has(p)) structural.push(`redirect ${p}`);
    if (isNoindex(p)) structural.push(`noindex ${p}`);
  }

  console.log('=== 1. INVENTAIRE ROUTES PUBLIQUES ===');
  console.log(`app/ (page.tsx static):     ${staticApp.length}`);
  console.log(`blog slugs:                 ${blog.length}`);
  console.log(`ressources tutos:           ${tutos.length}`);
  console.log(`formation-ia hub slugs:     ${hub.length}`);
  console.log(`union publique dédupliquée: ${allPublic.size}`);
  console.log(`attendues sitemap:          ${expected.size}`);

  console.log('\n=== 2. COMPARAISON SITEMAP ===');
  console.log(`sitemap reconstruit:        ${sitemapPaths.size}`);
  console.log(`problèmes structurels:      ${structural.length}`);
  structural.slice(0, 20).forEach((s) => console.log(`  ! ${s}`));

  console.log(`\nManquantes (${missing.length}):`);
  missing.forEach((p) => console.log(`  - ${p}`));

  console.log(`\nEn trop (${extra.length}):`);
  extra.forEach((p) => console.log(`  + ${p}`));

  console.log('\n=== 3–4. RÈGLES ===');
  console.log('PDF / ancres / noindex / redirects exacts dans sitemap: ' + (structural.length === 0 ? 'OK' : 'À corriger'));
  console.log('lastModified: résolu via resolveSitemapLastModified (git/dates générées/article/tuto) — jamais new Date() au runtime.');

  console.log('\n=== 5. TOTAL FINAL URL SITEMAP ===');
  console.log(sitemapPaths.size);

  const tmp = path.join(ROOT, 'tmp');
  mkdirSync(tmp, { recursive: true });
  writeFileSync(path.join(tmp, 'sitemap-audit-public-routes.txt'), [...allPublic].sort().join('\n') + '\n');
  writeFileSync(path.join(tmp, 'sitemap-audit-sitemap-urls.txt'), [...sitemapPaths].sort().join('\n') + '\n');
  writeFileSync(path.join(tmp, 'sitemap-audit-missing.txt'), missing.join('\n') + (missing.length ? '\n' : ''));
  writeFileSync(path.join(tmp, 'sitemap-audit-extra.txt'), extra.join('\n') + (extra.length ? '\n' : ''));
  console.log('\nListes: tmp/sitemap-audit-*.txt');
}

main();
