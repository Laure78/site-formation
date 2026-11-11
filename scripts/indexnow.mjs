#!/usr/bin/env node
/**
 * IndexNow — envoie toutes les URL du sitemap www.laureolivie.fr à l’API Bing/IndexNow.
 *
 * Prérequis : fichier clé à la racine du site public/{INDEXNOW_KEY}.txt (déjà versionné).
 *
 * Usage :
 *   node scripts/indexnow.mjs
 *   SITEMAP_URL=https://www.laureolivie.fr/sitemap.xml node scripts/indexnow.mjs
 *   INDEXNOW_KEY=… node scripts/indexnow.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const HOST = 'www.laureolivie.fr';
const ORIGIN = `https://${HOST}`;
const DEFAULT_KEY = 'e05un916c5fd0496fbfbun9c2d975712b4';
const INDEXNOW_KEY = (process.env.INDEXNOW_KEY?.trim() || DEFAULT_KEY).trim();
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10_000;

function loadKeyFromPublic() {
  try {
    const p = join(ROOT, 'public', `${INDEXNOW_KEY}.txt`);
    return readFileSync(p, 'utf8').trim() || INDEXNOW_KEY;
  } catch {
    return INDEXNOW_KEY;
  }
}

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, { headers: { Accept: 'application/xml,text/xml' } });
  if (!res.ok) {
    throw new Error(`Sitemap inaccessible : ${sitemapUrl} (HTTP ${res.status})`);
  }
  const xml = await res.text();
  const urls = [];
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    const u = m[1].trim();
    if (u.startsWith(`${ORIGIN}/`) || u.startsWith(ORIGIN)) urls.push(u.split('#')[0]);
  }
  return [...new Set(urls)];
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function submitBatch(urls, key) {
  const body = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList: urls,
  };
  const res = await fetch(INDEXNOW_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return res;
}

async function main() {
  const key = loadKeyFromPublic();
  const sitemapUrl = (process.env.SITEMAP_URL || `${ORIGIN}/sitemap.xml`).trim();
  console.log(`IndexNow — hôte ${HOST}`);
  console.log(`Clé         : ${key}`);
  console.log(`Fichier clé : ${ORIGIN}/${key}.txt`);
  console.log(`Sitemap     : ${sitemapUrl}`);

  const urls = await fetchSitemapUrls(sitemapUrl);
  if (!urls.length) {
    console.error('Aucune URL dans le sitemap.');
    process.exit(1);
  }
  if (urls.length > MAX_URLS) {
    console.warn(`Attention : ${urls.length} URL — envoi par lots de ${MAX_URLS}`);
  }

  const batches = chunk(urls, MAX_URLS);
  let ok = 0;
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const res = await submitBatch(batch, key);
    const label = batches.length > 1 ? ` (lot ${i + 1}/${batches.length})` : '';
    console.log(`POST ${batch.length} URL${label} → HTTP ${res.status} ${res.statusText || ''}`.trim());
    if (res.status === 200 || res.status === 202) ok += batch.length;
    else {
      const text = await res.text().catch(() => '');
      if (text) console.error(text.slice(0, 500));
      process.exit(1);
    }
  }
  console.log(`Terminé : ${ok} URL soumises à IndexNow.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
