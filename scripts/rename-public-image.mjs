#!/usr/bin/env node
/**
 * Renomme un fichier sous public/ et met à jour les références dans le dépôt.
 *
 * Usage :
 *   node scripts/rename-public-image.mjs public/images/old-name.png public/images/new-name.webp
 *
 * Puis vérifier : npm run audit:images-seo
 */
import { readFileSync, writeFileSync, renameSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { execSync } from 'child_process';

const ROOT = join(import.meta.dirname, '..');
const [fromArg, toArg] = process.argv.slice(2);

if (!fromArg || !toArg) {
  console.error('Usage: node scripts/rename-public-image.mjs <from> <to>');
  process.exit(1);
}

const fromAbs = join(ROOT, fromArg.replace(/^\//, ''));
const toAbs = join(ROOT, toArg.replace(/^\//, ''));

if (!existsSync(fromAbs)) {
  console.error('Fichier source introuvable:', fromAbs);
  process.exit(1);
}

renameSync(fromAbs, toAbs);

const fromWeb = '/' + relative(join(ROOT, 'public'), fromAbs).replace(/\\/g, '/');
const toWeb = '/' + relative(join(ROOT, 'public'), toAbs).replace(/\\/g, '/');

const files = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

let changed = 0;
for (const rel of files) {
  if (rel.startsWith('public/') && rel.endsWith(fromAbs.split('/public/')[1])) continue;
  const abs = join(ROOT, rel);
  let src;
  try {
    src = readFileSync(abs, 'utf8');
  } catch {
    continue;
  }
  if (!src.includes(fromWeb) && !src.includes(fromArg)) continue;
  const next = src.split(fromWeb).join(toWeb).split(fromArg).join(toArg.replace(/^\//, ''));
  if (next !== src) {
    writeFileSync(abs, next);
    changed++;
    console.log('updated', rel);
  }
}

console.log('Renommé:', fromWeb, '→', toWeb);
console.log('Fichiers code mis à jour:', changed);
