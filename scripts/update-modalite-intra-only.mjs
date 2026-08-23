#!/usr/bin/env node
/**
 * Remplace les mentions inter/intra par la modalité unique intra-entreprise.
 * Exclut faux positifs (interne, intervention, international, #334155, R4121, etc.).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const EXT = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.txt']);
const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  'scripts/audit-page-metadata-report.json',
  'scripts/audit-page-metadata-real.json',
]);

const REPLACEMENTS = [
  [/intra dans vos locaux ou inter en salle/gi, 'intra-entreprise, dans vos locaux'],
  [/inter en salle ou intra dans vos locaux/gi, 'intra-entreprise, dans vos locaux'],
  [/inter en salle ou intra dans vos locaux franciliens/gi, 'intra-entreprise, dans vos locaux'],
  [/dans vos locaux ou en salle Paris et toute l'Île-de-France/gi, 'intra-entreprise, dans vos locaux en Île-de-France'],
  [/dans vos locaux ou en salle Paris/gi, 'intra-entreprise, dans vos locaux'],
  [/en salle Paris et toute l'Île-de-France/gi, 'intra-entreprise, dans vos locaux en Île-de-France'],
  [/en salle inter/gi, 'intra-entreprise, dans vos locaux'],
  [/ou en salle inter/gi, ''],
  [/sessions inter ou intra/gi, 'sessions intra-entreprise, dans vos locaux'],
  [/sessions inter et intra/gi, 'sessions intra-entreprise, dans vos locaux'],
  [/inter et intra/gi, 'intra-entreprise, dans vos locaux'],
  [/intra et inter/gi, 'intra-entreprise, dans vos locaux'],
  [/intra ou inter/gi, 'intra-entreprise, dans vos locaux'],
  [/inter ou intra/gi, 'intra-entreprise, dans vos locaux'],
  [/Intra ou inter/g, 'Intra-entreprise, dans vos locaux'],
  [/Inter ou intra/g, 'Intra-entreprise, dans vos locaux'],
  [/Format inter ou intra/gi, 'Format intra-entreprise, dans vos locaux'],
  [/format inter ou intra/gi, 'format intra-entreprise, dans vos locaux'],
  [/Inter-entreprise et intra-entreprise/gi, 'Intra-entreprise'],
  [/intra-entreprise ou inter-entreprises/gi, 'intra-entreprise, dans vos locaux'],
  [/intra-entreprise ou inter-entreprise/gi, 'intra-entreprise, dans vos locaux'],
  [/Présentiel — Île-de-France uniquement \(intra ou inter\)/g, 'Présentiel — Île-de-France uniquement (intra-entreprise, dans vos locaux)'],
  [/100 % présentiel — intra-entreprise ou inter-entreprises/g, '100 % présentiel — intra-entreprise, dans vos locaux'],
  [/Présentiel — intra ou inter selon convention/g, 'Présentiel — intra-entreprise, dans vos locaux'],
  [/organise des sessions inter à Paris et en proche banlieue\./g, 'anime des sessions intra-entreprise, dans vos locaux, en Île-de-France.'],
  [/Category: 'Inter-entreprises'/g, "category: 'Intra-entreprise'"],
  [/category: 'Inter-entreprises'/g, "category: 'Intra-entreprise'"],
  [/name: 'Choisir le format inter ou intra'/g, "name: 'Organiser une session intra-entreprise'"],
  [/name: 'Session inter-entreprises — présentiel'/g, "name: 'Session intra-entreprise — présentiel'"],
  [/Option 2 — Session inter-entreprises/g, 'Session intra-entreprise, dans vos locaux'],
  [/Format inter ou intra entreprise/g, 'Format intra-entreprise, dans vos locaux'],
  [/inter en salle ou intra/gi, 'intra-entreprise, dans vos locaux'],
  [/\(inter ou intra\)/gi, '(intra-entreprise, dans vos locaux)'],
  [/inter-entreprises où des professionnels/gi, 'intra-entreprise où des professionnels'],
];

function shouldSkip(filePath) {
  const rel = path.relative(ROOT, filePath);
  if (rel.includes('update-modalite-intra-only.mjs')) return true;
  if (rel.startsWith('scripts/audit-page-metadata')) return true;
  if (rel.endsWith('.pdf')) return true;
  if (rel.includes('public/formations/') && rel.endsWith('.pdf')) return true;
  if (rel.includes('public/presentation-formations.html')) return true;
  if (rel.includes('public/ressources/skills/verification-dtu')) return true;
  return false;
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_DIRS.has(name) || SKIP_DIRS.has(rel)) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name)) && !shouldSkip(full)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [re, rep] of REPLACEMENTS) {
    content = content.replace(re, rep);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    changed++;
    console.log('updated:', path.relative(ROOT, file));
  }
}
console.log(`\n${changed} fichier(s) modifié(s).`);
