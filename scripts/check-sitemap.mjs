#!/usr/bin/env node
/**
 * check:sitemap — vérifie que chaque URL du sitemap :
 *   1. répond en HTTP 200 (pas de 3xx, 4xx, 5xx) ;
 *   2. a un <link rel="canonical"> qui pointe vers elle-même.
 *
 * Requiert un serveur Next.js local (npm run dev / npm run start).
 * Usage : LOCAL_URL=http://localhost:3000 node scripts/check-sitemap.mjs
 */

const LOCAL_URL = (process.env.LOCAL_URL || 'http://localhost:3000').replace(/\/$/, '');
const PROD_ORIGIN = 'https://www.laureolivie.fr';

function norm(url) {
  return url.replace(/\/$/, '') || '/';
}

async function fetchSitemapUrls() {
  const res = await fetch(`${LOCAL_URL}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Impossible de récupérer le sitemap : HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urls = [];
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    urls.push(m[1]);
  }
  return urls;
}

async function checkUrl(sitemapUrl) {
  const localPath = sitemapUrl.replace(PROD_ORIGIN, '');
  const localUrl = `${LOCAL_URL}${localPath}`;
  const errors = [];

  let res;
  try {
    res = await fetch(localUrl, { redirect: 'manual' });
  } catch (err) {
    return { url: sitemapUrl, errors: [`fetch échoué : ${err.message}`] };
  }

  if (res.status !== 200) {
    errors.push(`status ${res.status} (attendu 200)`);
  }

  if (res.status === 200) {
    const html = await res.text();
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    if (canonicalMatch) {
      const canonical = norm(canonicalMatch[1]);
      const expected = norm(sitemapUrl);
      if (canonical !== expected) {
        errors.push(`canonical ${canonical} ≠ URL sitemap ${expected}`);
      }
    }
  }

  return { url: sitemapUrl, errors };
}

async function main() {
  console.log(`\n🔍 check:sitemap — serveur local : ${LOCAL_URL}\n`);

  let urls;
  try {
    urls = await fetchSitemapUrls();
  } catch (err) {
    console.error(`❌ ${err.message}`);
    console.error('   → Lancez le serveur avec "npm run dev" ou "npm run start" avant de relancer.\n');
    process.exit(1);
  }

  console.log(`   ${urls.length} URLs dans le sitemap\n`);

  const concurrency = 5;
  const results = [];
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  const failures = results.filter((r) => r.errors.length > 0);

  if (failures.length === 0) {
    console.log(`✅ ${urls.length} URLs vérifiées — aucune erreur.\n`);
    process.exit(0);
  }

  console.log(`❌ ${failures.length} erreur(s) sur ${urls.length} URLs :\n`);
  for (const f of failures) {
    console.log(`   ${f.url}`);
    for (const e of f.errors) {
      console.log(`     → ${e}`);
    }
  }
  console.log('');
  process.exit(1);
}

main();
