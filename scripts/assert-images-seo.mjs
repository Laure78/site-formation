#!/usr/bin/env node
/**
 * Garde-fou CI — images SEO (alts, chemins centralisés).
 * Usage : node scripts/assert-images-seo.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const PHOTO_ALT_MAX = 125;

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

function fail(msg) {
  console.error('assert-images-seo:', msg);
  process.exit(1);
}

function auditLibAlts() {
  const libDir = join(ROOT, 'lib');
  const tooLong = [];
  for (const file of walk(libDir)) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/alt:\s*['"`]([^'"`]+)['"`]/g)) {
      if (m[1].length > PHOTO_ALT_MAX) {
        tooLong.push({ file: file.replace(ROOT + '/', ''), alt: m[1].slice(0, 80) });
      }
    }
  }
  return tooLong;
}

function hardcodedAppImages() {
  const hits = [];
  for (const file of walk(join(ROOT, 'app'))) {
    if (!/\.tsx$/.test(file)) continue;
    const rel = file.replace(ROOT + '/', '');
    const src = readFileSync(file, 'utf8');
    if (!src.includes('/images/')) continue;
    if (src.includes('PHOTOS.') || src.includes("@/lib/photos")) continue;
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      if (/src=["'{]\/?images\//.test(line)) {
        hits.push(`${rel}:${i + 1}`);
      }
    });
  }
  return hits;
}

function componentAltIssues() {
  const allow = ['app/admin/', 'app/outils/demo-cursor-vitrine-ffb/', 'components/ui/OfcYouTubeEmbed.tsx'];
  const issues = [];
  for (const file of walk(join(ROOT, 'components'))) {
    if (!/\.tsx$/.test(file)) continue;
    const rel = file.replace(ROOT + '/', '');
    const src = readFileSync(file, 'utf8');
    if (!src.includes('<Image') && !src.includes('<img')) continue;
    for (const m of src.matchAll(/<Image[\s\S]*?\/?>/g)) {
      const block = m[0];
      const line = src.slice(0, m.index).split('\n').length;
      if (!/\balt=/.test(block)) issues.push(`${rel}:${line} missing-alt`);
      else if (
        /alt=\{?\s*['"]\s*['"]\s*\}?/.test(block) &&
        !allow.some((p) => rel.includes(p))
      ) {
        issues.push(`${rel}:${line} empty-alt`);
      }
    }
  }
  return issues;
}

const tooLong = auditLibAlts();
if (tooLong.length) {
  fail(`Alts lib/ > ${PHOTO_ALT_MAX} car. : ${JSON.stringify(tooLong.slice(0, 5))}`);
}

const hardcoded = hardcodedAppImages();
if (hardcoded.length) {
  fail(`Chemins /images/ en dur dans app/ (utiliser PHOTOS) : ${hardcoded.join(', ')}`);
}

const comp = componentAltIssues();
if (comp.length) {
  fail(`Composants Image : ${comp.join(', ')}`);
}

console.log('assert-images-seo: OK');
