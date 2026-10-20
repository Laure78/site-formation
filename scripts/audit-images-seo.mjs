#!/usr/bin/env node
/**
 * Audit SEO images — alts, noms de fichiers, références public/images.
 * Usage :
 *   node scripts/audit-images-seo.mjs [--json tmp/audit-images-seo.json]
 *   node scripts/audit-images-seo.mjs [--csv tmp/audit-images-inventory.csv]
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, extname, basename, relative } from 'path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif', '.svg']);

const GENERIC_NAME =
  /^(img|image|photo|pic|banner|hero|slide|asset|untitled|capture|screenshot|final)[-_0-9.]*$/i;
const AUTO_NAME = /^(IMG_|DSC_|PXL_|photo-final|image\d)/i;
const PHOTO_ALT_MAX = 125;
/** Pages outils / admin : alt="" accepté si décoratif. */
const EMPTY_ALT_ALLOWLIST = [
  'app/admin/',
  'app/outils/demo-cursor-vitrine-ffb/',
  'components/ui/OfcYouTubeEmbed.tsx',
  'components/ressources/RessourceGuideLibraryCard.tsx',
];

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
  for (const rootFile of ['next.config.ts', 'vercel.json']) {
    const p = join(ROOT, rootFile);
    if (existsSync(p)) code.push(p);
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
    } else if (
      /alt=\{?\s*['"]\s*['"]\s*\}?/.test(block) &&
      !/decorative|aria-hidden/.test(block) &&
      !EMPTY_ALT_ALLOWLIST.some((p) => file.includes(p))
    ) {
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

function extractLibAlts() {
  const libDir = join(ROOT, 'lib');
  const files = walk(libDir).filter((p) => p.endsWith('.ts') || p.endsWith('.tsx'));
  const entries = [];
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/alt:\s*['"`]([^'"`]+)['"`]/g)) {
      entries.push({ alt: m[1], file: file.replace(ROOT + '/', '') });
    }
  }
  return entries;
}

function extractPhotosAlts() {
  const path = join(ROOT, 'lib/photos.ts');
  if (!existsSync(path)) return { alts: [], duplicates: [], tooLong: [] };
  const src = readFileSync(path, 'utf8');
  const alts = [...src.matchAll(/alt:\s*['"`]([^'"`]+)['"`]/g)].map((m) => m[1]);
  const counts = new Map();
  for (const a of alts) counts.set(a, (counts.get(a) ?? 0) + 1);
  const duplicates = [...counts.entries()].filter(([, n]) => n > 1);
  const tooLong = alts.filter((a) => a.length > PHOTO_ALT_MAX).map((alt) => ({ alt, length: alt.length }));
  return { altCount: alts.length, duplicates, tooLong };
}

function auditLibAltLength(entries) {
  return entries
    .filter((e) => e.alt.length > PHOTO_ALT_MAX)
    .map((e) => ({ file: e.file, length: e.alt.length, alt: e.alt.slice(0, 90) + '…' }));
}

function findHardcodedAppImages() {
  const appDir = join(ROOT, 'app');
  const hits = [];
  for (const file of walk(appDir)) {
    if (!/\.tsx$/.test(file)) continue;
    const rel = file.replace(ROOT + '/', '');
    const src = readFileSync(file, 'utf8');
    if (!src.includes('src="/images/') && !src.includes("src={'/images/")) continue;
    if (src.includes('PHOTOS.') || src.includes("@/lib/photos")) continue;
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      if (/src=["'{]\/?images\//.test(line)) {
        hits.push({ file: rel, line: i + 1, snippet: line.trim().slice(0, 100) });
      }
    });
  }
  return hits;
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

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Map URL `/images/...` → alt canonique (lib + HTML). */
function buildSrcToAltMap(codeFiles) {
  const map = new Map();
  for (const abs of codeFiles) {
    const file = abs.replace(ROOT + '/', '');
    const src = readFileSync(abs, 'utf8');
    for (const m of src.matchAll(
      /src:\s*['"](\/images[^'"]+)['"][\s\S]{0,500}?alt:\s*['"]([^'"]+)['"]/g,
    )) {
      map.set(m[1], { alt: m[2], source: file });
    }
    for (const m of src.matchAll(
      /alt:\s*['"]([^'"]+)['"][\s\S]{0,500}?src:\s*['"](\/images[^'"]+)['"]/g,
    )) {
      if (!map.has(m[2])) map.set(m[2], { alt: m[1], source: file });
    }
    for (const m of src.matchAll(/<img[^>]*\ssrc=["'](\/images[^"']+)["'][^>]*>/gi)) {
      const block = m[0];
      const path = m[1];
      const altM = block.match(/\balt=["']([^"']*)["']/i);
      if (altM && !map.has(path)) map.set(path, { alt: altM[1], source: file });
    }
    for (const m of src.matchAll(/!\[[^\]]*\]\((\/images[^)]+)\)/g)) {
      if (!map.has(m[1])) map.set(m[1], { alt: '', source: file });
    }
    for (const m of src.matchAll(/cover:\s*(\/images[^\s\n]+)/g)) {
      if (!map.has(m[1])) map.set(m[1], { alt: '(couverture article)', source: file });
    }
  }
  return map;
}

function findImageReferences(publicUrlPath, codeFileEntries) {
  const hits = [];
  const variants = [
    publicUrlPath,
    publicUrlPath.replace(/^\//, ''),
    encodeURI(publicUrlPath),
    basename(publicUrlPath),
  ];
  for (const [file, content] of codeFileEntries) {
    if (variants.some((v) => v.length > 8 && content.includes(v))) {
      hits.push(file);
    } else if (content.includes(publicUrlPath)) {
      hits.push(file);
    }
  }
  return [...new Set(hits)];
}

function refsToUsageHint(refs) {
  const hints = new Set();
  for (const r of refs) {
    const page = r.match(/^app\/(.+)\/page\.(tsx|jsx|mdx)$/);
    if (page) hints.add(`/${page[1]}`);
    else if (r.startsWith('content/blog/')) hints.add(`blog:${basename(r, extname(r))}`);
    else if (r === 'lib/photos.ts') hints.add('source PHOTOS');
    else if (r.includes('next.config')) hints.add('redirect/next.config');
    else if (r.startsWith('components/')) hints.add('composant partagé');
    else if (r.startsWith('lib/')) hints.add('donnée lib');
  }
  return [...hints].join(' | ') || '(aucune ref code)';
}

function inferRole(publicUrlPath, alt, referenced) {
  if (!referenced) return 'non référencé (legacy/OG?)';
  if (!alt || alt === '(couverture article)') return 'sociale / couverture';
  if (/^Logo /i.test(alt)) return 'logo partenaire';
  if (/Portrait|formatrice|formateur/i.test(alt)) return 'portrait';
  if (/Schéma|Infographie|Slide|Capture|Programme/i.test(alt)) return 'illustration';
  return 'informative';
}

async function buildInventoryRows(imageFiles, codeFiles) {
  const codeEntries = codeFiles.map((f) => [f.replace(ROOT + '/', ''), readFileSync(f, 'utf8')]);
  const altMap = buildSrcToAltMap(codeFiles);
  const rows = [];

  for (const abs of imageFiles) {
    const urlPath = abs.replace(join(ROOT, 'public'), '').replace(/\\/g, '/');
    const st = statSync(abs);
    const refs = findImageReferences(urlPath, codeEntries);
    const metaEntry = altMap.get(urlPath);
    let width = '';
    let height = '';
    let format = extname(abs).slice(1).toLowerCase();
    try {
      const meta = await sharp(abs).metadata();
      width = meta.width ?? '';
      height = meta.height ?? '';
      if (meta.format) format = meta.format;
    } catch {
      /* svg ou illisible */
    }
    const alt = metaEntry?.alt ?? '';
    rows.push({
      page_usage: refsToUsageHint(refs),
      url_public: `https://www.laureolivie.fr${urlPath}`,
      file_path: relative(ROOT, abs),
      file_name: basename(abs),
      bytes: st.size,
      kb: (st.size / 1024).toFixed(1),
      width,
      height,
      format,
      alt,
      alt_source: metaEntry?.source ?? '',
      referencing_files: refs.slice(0, 12).join('; ') + (refs.length > 12 ? ` (+${refs.length - 12})` : ''),
      referenced: refs.length > 0 ? 'oui' : 'non',
      role: inferRole(urlPath, alt, refs.length > 0),
    });
  }
  return rows.sort((a, b) => b.bytes - a.bytes);
}

function writeInventoryCsv(rows, outPath) {
  const headers = [
    'page_usage',
    'url_public',
    'file_path',
    'file_name',
    'bytes',
    'kb',
    'width',
    'height',
    'format',
    'alt',
    'alt_source',
    'referencing_files',
    'referenced',
    'role',
  ];
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(','));
  }
  writeFileSync(join(ROOT, outPath), `${lines.join('\n')}\n`, 'utf8');
}

async function main() {
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
  const libAlts = extractLibAlts();
  const libAltTooLong = auditLibAltLength(libAlts);
  const badNames = auditFilenames(imageFiles);
  const unreferenced = findUnreferencedImages(imageFiles, codeContents);
  const hardcodedAppImages = findHardcodedAppImages();

  const report = {
    generatedAt: new Date().toISOString(),
    publicImageCount: imageFiles.length,
    photosTsAltCount: photos.altCount,
    duplicateAltsInPhotosTs: photos.duplicates?.map(([alt, count]) => ({ alt, count })) ?? [],
    photosTsAltsTooLong: photos.tooLong ?? [],
    libAltTooLongCount: libAltTooLong.length,
    libAltTooLongSample: libAltTooLong.slice(0, 20),
    hardcodedAppImages,
    componentIssues,
    badFilenames: badNames,
    badFilenamesBlogSlidesOnly: badNames.filter((b) => b.rel.includes('/blog/')),
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
  console.log('  dont slides blog (legacy, alt OK)', report.badFilenamesBlogSlidesOnly.length);
  console.log('Alts lib/ > 125 car.', report.libAltTooLongCount);
  console.log('Images /images/ en dur dans app/ (hors PHOTOS)', report.hardcodedAppImages.length);
  console.log('Fichiers sans référence détectée', report.unreferencedCount);
  if (report.componentIssues.length) {
    console.log('\nExemples composants :');
    report.componentIssues.slice(0, 15).forEach((i) => console.log(' -', i.type, i.file, i.line));
  }

  const csvArg = process.argv.indexOf('--csv');
  if (csvArg >= 0 && process.argv[csvArg + 1]) {
    const rows = await buildInventoryRows(imageFiles, codeFiles);
    const out = process.argv[csvArg + 1];
    writeInventoryCsv(rows, out);
    const heavy = rows.filter((r) => r.bytes > 500 * 1024).length;
    console.log(`\nInventaire CSV : ${out} (${rows.length} lignes, ${heavy} > 500 Ko)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
