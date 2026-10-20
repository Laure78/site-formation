#!/usr/bin/env node
/**
 * Archive les doublons PNG/JPG listés dans tmp/triage-unreferenced-images.csv
 * (action = archiver_apres_verif) vers public/_archive/images/…
 *
 * Usage : node scripts/archive-duplicate-images.mjs [--dry-run]
 */
import { readFileSync, existsSync, mkdirSync, renameSync, statSync } from 'fs';
import { join, dirname } from 'path';

const ROOT = join(import.meta.dirname, '..');
const ARCHIVE_ROOT = join(ROOT, 'public/_archive/images');
const TRIAGE_CSV = join(ROOT, 'tmp/triage-unreferenced-images.csv');

function parseCsvLine(line) {
  const cols = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') {
      cols.push(cur);
      cur = '';
    } else cur += c;
  }
  cols.push(cur);
  return cols;
}

function main() {
  const dryRun = process.argv.includes('--dry-run');
  if (!existsSync(TRIAGE_CSV)) {
    console.error('Lancer d’abord : node scripts/triage-unreferenced-images.mjs');
    process.exit(1);
  }
  const lines = readFileSync(TRIAGE_CSV, 'utf8').trim().split('\n').slice(1);
  const rows = lines.map((line) => {
    const [url_path, file_path, kb, category, action, note] = parseCsvLine(line);
    return { url_path, file_path, action };
  });
  const targets = rows.filter((r) => r.action === 'archiver_apres_verif');
  let moved = 0;
  let skipped = 0;

  for (const { url_path, file_path } of targets) {
    const abs = join(ROOT, file_path);
    if (!existsSync(abs)) {
      console.log('— absent:', file_path);
      skipped++;
      continue;
    }
    const destRel = file_path.replace(/^public\/images\//, '');
    const destAbs = join(ARCHIVE_ROOT, destRel);
    if (dryRun) {
      console.log('? archiver', url_path, '→', destAbs.replace(ROOT + '/public/', 'public/_archive/images/'));
      continue;
    }
    mkdirSync(dirname(destAbs), { recursive: true });
    renameSync(abs, destAbs);
    moved++;
    console.log('✓', url_path, `(${(statSync(destAbs).size / 1024).toFixed(0)} Ko)`);
  }

  if (!dryRun) {
    console.log(`\n${moved} fichier(s) archivé(s), ${skipped} ignoré(s).`);
    console.log('Les 301 png/jpg → webp dans next.config.ts doivent couvrir ces URL.');
  }
}

main();
