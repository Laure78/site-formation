#!/usr/bin/env node
/**
 * Retire 4,85/5 et références satisfaction marketing du code public.
 * Ne touche pas app/indicateurs-resultats/ ni lib/constants.ts (source Qualiopi).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.next']);
const SKIP_PREFIX = ['app/indicateurs-resultats/', 'app/admin/'];

const REPLACEMENTS = [
  [/\$\{PREUVES\.satisfaction\}/g, ''],
  [/\$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/\$\{PROOF\.note\}/g, ''],
  [/\$\{siteStats\.noteMoyenneAffichee\}/g, ''],
  [/,\s*note \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/,\s*note \{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/,\s*\$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/ · \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/ · \{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/ · Note \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/ · Note \{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/,\s*\$\{PROOF\.note\}/g, ''],
  [/ · \$\{PROOF\.note\}/g, ''],
  [/ · \{PROOF\.note\}/g, ''],
  [/note moyenne \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/note moyenne \{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/note \{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/note \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/Note \{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/Note \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/\$\{SOCIAL_PROOF\.AVERAGE_RATING\} satisfaction/g, ''],
  [/\$\{SOCIAL_PROOF\.AVERAGE_RATING\}\/5/g, ''],
  [/ · \$\{SOCIAL_PROOF\.AVERAGE_RATING\} ·/g, ' ·'],
  [/,\s*note moyenne de \$\{SOCIAL_PROOF\.AVERAGE_RATING\}/g, ''],
  [/note de satisfaction de \{siteStats\.noteMoyenneAffichee\}/g, 'indicateurs publiés sur la page dédiée'],
  [/note de satisfaction \{siteStats\.noteMoyenneAffichee\}/g, 'indicateurs publiés sur la page dédiée'],
  [/✓ \{siteStats\.noteMoyenneAffichee\}/g, ''],
  [/ · ✓ \{siteStats\.noteMoyenneAffichee\}/g, ''],
  [/4,85\/5/g, ''],
  [/4\.85\/5/g, ''],
  [/note 4,85\/5/gi, ''],
  [/note moyenne 4,85/gi, ''],
  [/,\s*4,85\/5/g, ''],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_PREFIX.some((p) => rel.startsWith(p))) continue;
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?)$/.test(name)) files.push(full);
  }
  return files;
}

const MUST_MATCH = /AVERAGE_RATING|PREUVES\.satisfaction|PROOF\.note|noteMoyenneAffichee|4[,.]85\/5|4[,.]85/;

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.endsWith('lib/constants.ts') || file.endsWith('lib/readability-presets.ts')) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (!MUST_MATCH.test(content)) continue;
  let next = content;
  for (const [re, rep] of REPLACEMENTS) next = next.replace(re, rep);
  if (next !== content) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(path.relative(ROOT, file));
  }
}
console.log(`\n${changed} fichier(s) code mis à jour.`);
