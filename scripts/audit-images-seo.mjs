#!/usr/bin/env node
/**
 * Audit SEO images — alts, noms de fichiers, références public/images.
 * Usage : node scripts/audit-images-seo.mjs [--json tmp/audit-images-seo.json]
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const ROOT = join(import.meta.dirname, '..');
const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif', '.svg']);

const GENERIC_NAME =
  /^(img|image|photo|pic|banner|hero|slide|asset|untitled|capture|screenshot|final)[-_0-9.]*$/i;
const AUTO_NAME = /^(IMG_|DSC_|PXL_|photo-final|image\d)/i;

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

function listPublicImages() {
  const publicDir = join(ROOT, 'public');
  return walk(publicDir).filter((p) => IMAGE_EXT.has(extname(p).toLowerCase()));
}

function scanCodeFiles() {
  const roots = ['app', 'components', 'lib', 'src', 'data', 'content', 'contenu'];
  const code = [];
  for (const r of roots) {
    walk(join(ROOT, r)).forEach((p) => {
      if (/\.(tsx|ts|jsx|js|mdx|css|scss)$/.test(p)) code.push(p);
    });
  }
  return code;
}

function extractImageTags(source, file) {
  const issues = [];
  const imageBlocks = [...source.matchAll(/<Image[\s\S]*?\/?>/g)];
  for (const m of imageBlocks) {
    const block = m[0];
    const line = source.slice(0, m.index).split('\n').length;
    if (!/\balt=/.test(block)) {
      issues.push({ type: 'missing-alt', file, line, snippet: block.slice(0, 80) });
    } else if (/alt=\{?\s*['"]\s*['"]\s*\}?/.test(block) && !/decorative|aria-hidden/.test(block)) {
      issues.push({ type: 'empty-alt', file, line, note: 'alt vide — vérifier si décoratif' });
    }
  }
  const imgs = [...source.matchAll(/<img[\s\S]*?\/?>/gi)];
  for (const m of imgs) {
    const block = m[0];
    const line = source.slice(0, m.index).split('\n').length;
    if (!/\balt=/.test(block)) {
      issues.push({ type: 'missing-alt-img', file, line });
    }
  }
  return issues;
}

function extractPhotosAlts() {
  const path = join(ROOT, 'lib/photos.ts');
  if (!existsSync(path)) return { alts: [], duplicates: [] };
  const src = readFileSync(path, 'utf8');
  const alts = [...src.matchAll(/alt:\s*['"`]([^'"`]+)['"`]/g)].map((m) => m[1]);
  const counts = new Map();
  for (const a of alts) counts.set(a, (counts.get(a) ?? 0) + 1);
  const duplicates = [...counts.entries()].filter(([, n]) => n > 1);
  return { altCount: alts.length, duplicates };
}

function auditFilenames(files) {
  const bad = [];
  for (const abs of files) {
    const rel = abs.replace(join(ROOT, 'public') + '/', '');
    const name = basename(abs, extname(abs));
    if (/[A-Z]/.test(basename(abs))) bad.push({ rel, reason: 'majuscules' });
    if (/\s/.test(basename(abs))) bad.push({ rel, reason: 'espaces' });
    if (/[àâäéèêëïîôùûüç]/i.test(basename(abs))) bad.push({ rel, reason: 'accents' });
    if (GENERIC_NAME.test(name)) bad.push({ rel, reason: 'nom générique' });
    if (AUTO_NAME.test(basename(abs))) bad.push({ rel, reason: 'nom automatique' });
  }
  return bad;
}

function findUnreferencedImages(imageFiles, codeContents) {
  const blob = codeContents.join('\n');
  const unref = [];
  for (const abs of imageFiles) {
    const rel = abs.replace(join(ROOT, 'public'), '').replace(/\\/g, '/');
    const variants = [rel, rel.replace(/^\//, ''), encodeURI(rel)];
    if (!variants.some((v) => blob.includes(v))) {
      unref.push(rel);
    }
  }
  return unref;
}

function main() {
  const imageFiles = listPublicImages();
  const codeFiles = scanCodeFiles();
  const codeContents = codeFiles.map((f) => readFileSync(f, 'utf8'));
  const componentIssues = [];
  for (const file of codeFiles) {
    if (!/\.(tsx|jsx)$/.test(file)) continue;
    const src = readFileSync(file, 'utf8');
    if (!src.includes('<Image') && !src.includes('<img')) continue;
    componentIssues.push(...extractImageTags(src, file.replace(ROOT + '/', '')));
  }

  const photos = extractPhotosAlts();
  const badNames = auditFilenames(imageFiles);
  const unreferenced = findUnreferencedImages(imageFiles, codeContents);

  const report = {
    generatedAt: new Date().toISOString(),
    publicImageCount: imageFiles.length,
    photosTsAltCount: photos.altCount,
    duplicateAltsInPhotosTs: photos.duplicates?.map(([alt, count]) => ({ alt, count })) ?? [],
    componentIssues,
    badFilenames: badNames,
    unreferencedCount: unreferenced.length,
    unreferencedSample: unreferenced.slice(0, 30),
  };

  const jsonArg = process.argv.indexOf('--json');
  if (jsonArg >= 0 && process.argv[jsonArg + 1]) {
    writeFileSync(join(ROOT, process.argv[jsonArg + 1]), JSON.stringify(report, null, 2));
  }

  console.log('Images public/', report.publicImageCount);
  console.log('Alts dans lib/photos.ts', report.photosTsAltCount);
  console.log('Doublons ALT (photos.ts)', report.duplicateAltsInPhotosTs.length);
  console.log('Problèmes composants (Image/img)', report.componentIssues.length);
  console.log('Noms de fichiers à améliorer', report.badFilenames.length);
  console.log('Fichiers sans référence détectée', report.unreferencedCount);
  if (report.componentIssues.length) {
    console.log('\nExemples composants :');
    report.componentIssues.slice(0, 15).forEach((i) => console.log(' -', i.type, i.file, i.line));
  }
}

main();
