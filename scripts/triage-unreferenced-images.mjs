#!/usr/bin/env node
/**
 * Tri des images public/ sans référence code détectée.
 * Usage : node scripts/triage-unreferenced-images.mjs [--csv tmp/triage-unreferenced-images.csv]
 */
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'fs';
import { join, extname, basename, dirname } from 'path';

const ROOT = join(import.meta.dirname, '..');
const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif', '.svg']);

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    try {
      const st = statSync(p);
      if (st.isDirectory()) walk(p, acc);
      else acc.push(p);
    } catch {
      /* ignore */
    }
  }
  return acc;
}

function scanCodeBlob() {
  const roots = ['app', 'components', 'lib', 'src', 'data', 'content', 'contenu', 'public'];
  const files = [];
  for (const r of roots) walk(join(ROOT, r), files);
  const extra = ['next.config.ts', 'vercel.json', 'public/llms.txt', 'PERFORMANCE-AUDIT.md'];
  for (const e of extra) {
    const p = join(ROOT, e);
    if (existsSync(p)) files.push(p);
  }
  return files.filter((p) => /\.(tsx|ts|jsx|js|mdx|css|scss|json|txt|md)$/.test(p) || p.endsWith('next.config.ts')).map((p) => ({
    path: p.replace(ROOT + '/', ''),
    content: readFileSync(p, 'utf8'),
  }));
}

function parseRedirectPaths(nextConfigSrc) {
  const sources = new Set();
  const destinations = new Set();
  for (const m of nextConfigSrc.matchAll(/source:\s*'(\/images[^']+)'/g)) sources.add(m[1]);
  for (const m of nextConfigSrc.matchAll(/destination:\s*'(\/images[^']+)'/g)) destinations.add(m[1]);
  return { sources, destinations };
}

function isReferenced(urlPath, blob) {
  const variants = [urlPath, urlPath.replace(/^\//, ''), encodeURI(urlPath), basename(urlPath)];
  return variants.some((v) => v.length > 4 && blob.includes(v));
}

function siblingVariants(absPath) {
  const dir = dirname(absPath);
  const base = basename(absPath, extname(absPath));
  const exts = ['.webp', '.jpg', '.jpeg', '.png'];
  return exts
    .map((e) => join(dir, base + e))
    .filter((p) => p !== absPath && existsSync(p));
}

function categorize(urlPath, absPath, ctx) {
  const { blob, redirectSources, redirectDestinations } = ctx;
  const st = statSync(absPath);
  const ext = extname(absPath).toLowerCase();
  const name = basename(absPath);

  if (isReferenced(urlPath, blob)) {
    return { category: 'REFERENCE_ETENDUE', action: 'conserver', note: 'Référencé hors scan audit standard' };
  }
  if (redirectSources.has(urlPath)) {
    return {
      category: 'REDIRECT_SOURCE',
      action: 'conserver_ou_archiver',
      note: 'URL source 301 — fichier optionnel si redirect Next actif ; garder si doute',
    };
  }
  if (redirectDestinations.has(urlPath)) {
    return { category: 'REDIRECT_CIBLE', action: 'conserver', note: 'Cible de redirection 301' };
  }

  const siblings = siblingVariants(absPath);
  const siblingRefs = siblings.filter((s) => {
    const rel = s.replace(join(ROOT, 'public'), '').replace(/\\/g, '/');
    return isReferenced(rel, blob);
  });

  if (siblings.length && siblingRefs.length) {
    const heavier = ext === '.png' || ext === '.jpg' || ext === '.jpeg';
    if (heavier) {
      return {
        category: 'DOUBLON_FORMAT',
        action: 'archiver_apres_verif',
        note: `Variante référencée : ${siblingRefs.map((s) => basename(s)).join(', ')}`,
      };
    }
    return { category: 'DOUBLON_FORMAT', action: 'conserver', note: 'Format alternatif ; sibling référencé' };
  }

  if (/^slide-\d+\.png$/i.test(name) || /^slide-\d+\.png$/i.test(urlPath)) {
    return { category: 'BLOG_SLIDE_LEGACY', action: 'conserver', note: 'Slide legacy ; webp + 301 en place' };
  }

  if (urlPath.includes('/og/') || name.includes('-og.')) {
    return { category: 'OPEN_GRAPH', action: 'conserver', note: 'Visuel OG / réseaux — vérifier metadata pages' };
  }

  if (urlPath.includes('/blog/') && (ext === '.png' || ext === '.webp')) {
    return { category: 'BLOG_ASSET', action: 'verifier_manuel', note: 'Asset blog — peut être embed HTML uniquement' };
  }

  if (st.size < 80 * 1024 && (name.startsWith('favicon') || name.includes('icon'))) {
    return { category: 'ICON', action: 'conserver', note: 'Icône / favicon' };
  }

  return { category: 'ORPHELIN', action: 'verifier_manuel', note: 'Aucune ref ni redirect — tri manuel avant suppression' };
}

function csvEscape(v) {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function main() {
  const code = scanCodeBlob();
  const blob = code.map((c) => c.content).join('\n');
  const nextPath = join(ROOT, 'next.config.ts');
  const { sources: redirectSources, destinations: redirectDestinations } = parseRedirectPaths(
    readFileSync(nextPath, 'utf8'),
  );

  const ctx = { blob, redirectSources, redirectDestinations };
  const images = walk(join(ROOT, 'public')).filter((p) => IMAGE_EXT.has(extname(p).toLowerCase()));

  const rows = [];
  for (const abs of images) {
    const urlPath = abs.replace(join(ROOT, 'public'), '').replace(/\\/g, '/');
    const inCode = isReferenced(urlPath, blob);
    if (inCode) continue;

    const st = statSync(abs);
    const { category, action, note } = categorize(urlPath, abs, ctx);
    rows.push({
      url_path: urlPath,
      file_path: abs.replace(ROOT + '/', ''),
      kb: (st.size / 1024).toFixed(1),
      category,
      action,
      note,
    });
  }

  rows.sort((a, b) => Number(b.kb) - Number(a.kb));

  const summary = {};
  for (const r of rows) summary[r.category] = (summary[r.category] ?? 0) + 1;

  const outArg = process.argv.indexOf('--csv');
  const outFile = outArg >= 0 ? process.argv[outArg + 1] : 'tmp/triage-unreferenced-images.csv';
  const headers = ['url_path', 'file_path', 'kb', 'category', 'action', 'note'];
  const lines = [headers.join(','), ...rows.map((r) => headers.map((h) => csvEscape(r[h])).join(','))];
  writeFileSync(join(ROOT, outFile), `${lines.join('\n')}\n`, 'utf8');

  console.log(`Non référencés (scan élargi) : ${rows.length}`);
  console.log('Par catégorie :');
  Object.entries(summary)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, n]) => console.log(`  ${k}: ${n}`));
  console.log(`\nExport : ${outFile}`);

  const archivable = rows.filter((r) => r.action === 'archiver_apres_verif');
  const orphanHeavy = rows.filter((r) => r.category === 'ORPHELIN' && Number(r.kb) > 200);
  if (archivable.length) {
    console.log(`\nCandidats archivage (doublon format, sibling référencé) : ${archivable.length}`);
    archivable.slice(0, 8).forEach((r) => console.log(`  - ${r.url_path} (${r.kb} Ko)`));
  }
  if (orphanHeavy.length) {
    console.log(`\nOrphelins > 200 Ko (${orphanHeavy.length}) — priorité revue manuelle :`);
    orphanHeavy.slice(0, 10).forEach((r) => console.log(`  - ${r.url_path} (${r.kb} Ko)`));
  }
}

main();
