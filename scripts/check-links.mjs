#!/usr/bin/env node
/**
 * Audit liens internes : 404, URL redirigée, hors sitemap.
 * Sitemap : fetch LOCAL_URL/sitemap.xml (ou prod en secours).
 * Analyse statique : href="/…" dans app, components, lib, content.
 *
 * Usage : npm run check:links
 *         LOCAL_URL=http://localhost:3000 npm run check:links
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SCAN_DIRS = ['app', 'components', 'lib', 'content'];
const LOCAL_URL = (process.env.LOCAL_URL || 'http://localhost:3000').replace(/\/$/, '');
const PROD_ORIGIN = 'https://www.laureolivie.fr';

function norm(p) {
  if (!p || p === '/') return '/';
  const withoutHash = p.split('#')[0] ?? p;
  const withoutQuery = withoutHash.split('?')[0] ?? withoutHash;
  return ('/' + withoutQuery.replace(/^\/+|\/+$/g, '')).replace(/\/+/g, '/') || '/';
}

function loadRedirectSources() {
  const cfg = readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  const sources = new Set();
  for (const m of cfg.matchAll(/source:\s*'([^']+)'/g)) {
    const s = m[1];
    if (s.includes(':') || s.includes('*') || s.includes('(')) continue;
    sources.add(norm(s));
  }
  return sources;
}

const DYNAMIC_DIR = /^\[.+\]$/;
const PRIVATE = new Set(['api', 'admin', 'acces-admin', 'espace-apprenant', 'invitation', 'auth', 'login']);

function walkAppPages(dir, urlParts = []) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (name.startsWith('_') || name.startsWith('.')) continue;
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

function blogSlugs() {
  const slugs = new Set();
  const mdxDir = path.join(ROOT, 'content/blog');
  if (existsSync(mdxDir)) {
    for (const f of readdirSync(mdxDir)) {
      if (f.endsWith('.mdx')) slugs.add(f.replace(/\.mdx$/, ''));
    }
  }
  for (const rel of ['lib/blog.ts', 'lib/blog-claude-btp-2026-articles.ts', 'lib/blog-lsr-ao-modules-articles.ts']) {
    const abs = path.join(ROOT, rel);
    if (!existsSync(abs)) continue;
    const txt = readFileSync(abs, 'utf8');
    for (const m of txt.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/g)) slugs.add(m[1]);
  }
  return [...slugs];
}

function walkFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkFiles(p, acc);
    else if (/\.(tsx?|mdx|md|jsx)$/.test(name)) acc.push(p);
  }
  return acc;
}

function extractInternalHrefs(source) {
  const hrefs = [];
  const patterns = [
    /href\s*=\s*["'](\/[^"'#?][^"']*)["']/g,
    /href:\s*["'](\/[^"'#?][^"']*)["']/g,
    /\]\(\/(?!\/)([^)\s#?]+)\)/g,
  ];
  for (const re of patterns) {
    for (const m of source.matchAll(re)) {
      const raw = re === patterns[2] ? `/${m[1]}` : m[1];
      if (raw.startsWith('//')) continue;
      hrefs.push(norm(raw));
    }
  }
  return hrefs;
}

async function fetchSitemapPaths(base) {
  try {
    const res = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return null;
    const xml = await res.text();
    const set = new Set();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        set.add(norm(new URL(m[1]).pathname));
      } catch {
        set.add(norm(m[1].replace(PROD_ORIGIN, '')));
      }
    }
    return set;
  } catch {
    return null;
  }
}

function buildKnown200() {
  const known = new Set(walkAppPages(path.join(ROOT, 'app')));
  for (const slug of blogSlugs()) known.add(norm(`/blog/${slug}`));
  return known;
}

function classifyHref(href, from, redirectSources, sitemapPaths, known200) {
  const issues = [];
  if (href.startsWith('/api/') || href.startsWith('/admin') || href.startsWith('/auth')) return issues;
  if (/\.(pdf|png|jpe?g|webp|svg|ico|xml|txt)$/i.test(href)) return issues;

  if (redirectSources.has(href)) {
    issues.push({ kind: 'redirect-source', href, from });
    return issues;
  }

  const exists = known200.has(href) || sitemapPaths.has(href);
  if (!exists) {
    issues.push({ kind: '404', href, from, detail: 'Route inconnue' });
    return issues;
  }

  if (!sitemapPaths.has(href) && !href.startsWith('/blog/categorie/')) {
    issues.push({ kind: 'hors-sitemap', href, from, detail: 'Valide mais absent du sitemap' });
  }
  return issues;
}

function dedupe(issues) {
  const map = new Map();
  for (const i of issues) map.set(`${i.kind}|${i.href}|${i.from}`, i);
  return [...map.values()].sort((a, b) => a.href.localeCompare(b.href));
}

async function serverReachable() {
  try {
    const res = await fetch(`${LOCAL_URL}/`, { redirect: 'manual', signal: AbortSignal.timeout(4000) });
    return res.status > 0;
  } catch {
    return false;
  }
}

async function crawl(sitemapPaths, redirectSources, known200) {
  const issues = [];
  const paths = [...sitemapPaths].sort();
  for (let i = 0; i < paths.length; i += 5) {
    const batch = paths.slice(i, i + 5);
    await Promise.all(
      batch.map(async (pagePath) => {
        try {
          const res = await fetch(`${LOCAL_URL}${pagePath}`, {
            redirect: 'manual',
            signal: AbortSignal.timeout(20000),
          });
          if (res.status !== 200) return;
          const html = await res.text();
          for (const m of html.matchAll(/href\s*=\s*["'](\/[^"'#?][^"']*)["']/gi)) {
            const href = norm(m[1]);
            issues.push(...classifyHref(href, `[HTML] ${pagePath}`, redirectSources, sitemapPaths, known200));
          }
        } catch {
          /* ignore */
        }
      }),
    );
  }
  return issues;
}

async function main() {
  console.log('\n🔗 check:links — audit maillage interne\n');

  const redirectSources = loadRedirectSources();
  let sitemapPaths = await fetchSitemapPaths(LOCAL_URL);
  let sitemapSource = LOCAL_URL;
  if (!sitemapPaths?.size) {
    sitemapPaths = await fetchSitemapPaths(PROD_ORIGIN);
    sitemapSource = PROD_ORIGIN;
  }
  if (!sitemapPaths?.size) {
    sitemapPaths = buildKnown200();
    sitemapSource = '(fallback routes app + blog)';
  }

  const known200 = buildKnown200();
  console.log(`   Sitemap : ${sitemapPaths.size} URLs (${sitemapSource})`);
  console.log(`   Redirect sources : ${redirectSources.size}`);
  console.log(`   Routes connues : ${known200.size}\n`);

  const staticIssues = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walkFiles(path.join(ROOT, dir))) {
      const rel = path.relative(ROOT, file);
      const src = readFileSync(file, 'utf8');
      for (const href of extractInternalHrefs(src)) {
        staticIssues.push(...classifyHref(href, rel, redirectSources, sitemapPaths, known200));
      }
    }
  }

  let crawlIssues = [];
  if (await serverReachable()) {
    console.log(`   Crawl HTML : ${LOCAL_URL}\n`);
    crawlIssues = await crawl(sitemapPaths, redirectSources, known200);
  } else {
    console.log(`   Crawl HTML : ignoré (${LOCAL_URL} injoignable)\n`);
  }

  const all = dedupe([...staticIssues, ...crawlIssues]);
  const byKind = {
    '404': all.filter((i) => i.kind === '404'),
    'redirect-source': all.filter((i) => i.kind === 'redirect-source'),
    'hors-sitemap': all.filter((i) => i.kind === 'hors-sitemap'),
  };

  for (const kind of ['404', 'redirect-source', 'hors-sitemap']) {
    const list = byKind[kind];
    console.log(`── ${kind} (${list.length}) ──`);
    if (!list.length) {
      console.log('   (aucun)\n');
      continue;
    }
    for (const i of list.slice(0, 100)) {
      console.log(`   ${i.href}`);
      console.log(`      depuis : ${i.from}`);
      if (i.detail) console.log(`      note   : ${i.detail}`);
    }
    if (list.length > 100) console.log(`   … +${list.length - 100} autres`);
    console.log('');
  }

  const fail = byKind['404'].length + byKind['redirect-source'].length;
  console.log(
    fail === 0
      ? '✅ Aucun 404 ni lien vers URL redirigée.\n'
      : `❌ ${fail} problème(s) bloquant(s).\n`,
  );
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
