#!/usr/bin/env node
/**
 * Retire les mentions « 4,85/5 » / satisfaction marketing du contenu public.
 * Conserve app/indicateurs-resultats/ et données sources config/qualiopi.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.git', '.next']);
const SKIP_PATH_PREFIX = [
  'app/indicateurs-resultats/',
  'app/admin/',
  'scripts/audit-page-metadata',
];

const EXT = new Set(['.mdx', '.json', '.md']);

const REPLACEMENTS = [
  [/,\s*note\s+moyenne\s+4[,.]85\s*\/\s*5/gi, ''],
  [/,\s*4[,.]85\s*\/\s*5/gi, ''],
  [/,\s*note\s+4[,.]85\s*\/\s*5/gi, ''],
  [/note\s+moyenne\s+4[,.]85\s*\/\s*5/gi, ''],
  [/note\s+4[,.]85\s*\/\s*5/gi, ''],
  [/4[,.]85\s*\/\s*5\s+de\s+satisfaction\s+moyenne/gi, ''],
  [/4[,.]85\s*\/\s*5\s+de\s+satisfaction/gi, ''],
  [/4[,.]85\s*\/\s*5/g, ''],
  [/,\s*note\s+moyenne\s+de\s+satisfaction\s+de\s+4[,.]85\s*\/\s*5/gi, ''],
  [/·\s*4[,.]85\s*\/\s*5/g, ''],
  [/,\s*1\s*500\+\s*pros\s+formés,\s*4[,.]85\s*\/\s*5/gi, ', 1 500+ pros formés'],
  [/1\s*500\+\s*pros\s+formés\s*·\s*4[,.]85\s*\/\s*5/gi, '1 500+ pros formés'],
  [/plus\s+de\s+1\s*500\s+professionnels\s+formés,\s*note\s+moyenne\s+4[,.]85\s*\/\s*5/gi, 'plus de 1 500 professionnels formés'],
  [/plus\s+de\s+1\s*500\s+professionnels\s+formés,\s*4[,.]85\s*\/\s*5/gi, 'plus de 1 500 professionnels formés'],
  [/plus\s+de\s+1\s*500\s+professionnels\s+formés\s*—\s*note\s+4[,.]85\s*\/\s*5/gi, 'plus de 1 500 professionnels formés'],
  [/,\s*note\s+moyenne\s+\*\*4[,.]85\s*\/\s*5\*\*/gi, ''],
  [/note\s+moyenne\s+\*\*4[,.]85\s*\/\s*5\*\*/gi, ''],
  [/,\s*note\s+\*\*4[,.]85\s*\/\s*5\*\*/gi, ''],
  [/Finançable Constructys\.\s*Laure Olivié,\s*1\s*500\+\s*pros formés,\s*4[,.]85\s*\/\s*5\./gi, 'Laure Olivié, 1 500+ pros formés.'],
  [/,\s*4[,.]85\s*\/\s*5\./g, '.'],
  [/,\s*4[,.]85\s*\/\s*5\s*·/g, ' ·'],
  [/·\s*4[,.]85\s*\/\s*5\s*·/g, ' ·'],
  [/,\s*note\s+moyenne\s+\*\*4[,.]85\/5\*\*/gi, ''],
  [/note\s+moyenne\s+de\s+satisfaction\s+de\s+4[,.]85\s*\/\s*5/gi, ''],
  [/avec\s+une\s+\*\*note\s+moyenne\s+de\s+satisfaction\s+de\s+4[,.]85\s*\/\s*5\*\*/gi, ''],
  [/note\s+moyenne\s+\*\*4[,.]85\/5\*\*/gi, ''],
  [/,\s*4[,.]85\/5\s+de\s+satisfaction/gi, ''],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_PATH_PREFIX.some((p) => rel.startsWith(p))) continue;
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name))) files.push(full);
  }
  return files;
}

let n = 0;
for (const file of walk(ROOT)) {
  let c = fs.readFileSync(file, 'utf8');
  const o = c;
  for (const [re, rep] of REPLACEMENTS) c = c.replace(re, rep);
  if (c !== o) {
    fs.writeFileSync(file, c);
    n++;
    console.log(relPath(file));
  }
}

function relPath(f) {
  return path.relative(ROOT, f);
}

console.log(`\n${n} fichier(s) contenu mis à jour.`);
