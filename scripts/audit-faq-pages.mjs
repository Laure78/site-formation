#!/usr/bin/env node
/**
 * Audit FAQ — compte les sources FAQ exportées, doublons de questions, pages sans FAQ.
 * Usage : node scripts/audit-faq-pages.mjs
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const FAQ_MIN = 3;

function walk(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules' || n === '.next') continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx?|mjs)$/.test(n)) acc.push(p);
  }
  return acc;
}

function extractExportedFaqArrays(text, file) {
  const out = [];
  const re = /export const (FAQ_[A-Z0-9_]+|ETUDES_DE_CAS_FAQ|DEV_WEB_IA_FAQ)\s*(?::[^=]+)?=\s*\[/g;
  let m;
  while ((m = re.exec(text))) {
    const name = m[1];
    const start = m.index;
    const slice = text.slice(start, start + 12000);
    const items = [];
    for (const qm of slice.matchAll(/\bq:\s*(?:['"`]|["'])([^'"`\n]{12,}?)(?:['"`]|["'])/g)) {
      items.push(qm[1].trim());
    }
    if (items.length) out.push({ file, name, count: items.length, questions: items });
  }
  return out;
}

function extractGetFaqFunctions(text, file) {
  const out = [];
  if (/export function getFaq[A-Z]/.test(text)) {
    out.push({ file, name: 'getFaq*()', note: 'dynamique — vérifier manuellement' });
  }
  return out;
}

const sources = [];
for (const f of [...walk(join(ROOT, 'lib')), ...walk(join(ROOT, 'app'))]) {
  const text = readFileSync(f, 'utf8');
  sources.push(...extractExportedFaqArrays(text, relative(ROOT, f)));
  sources.push(...extractGetFaqFunctions(text, relative(ROOT, f)));
}

const questionToUrls = new Map();
for (const s of sources) {
  for (const q of s.questions || []) {
    const key = q.toLowerCase().replace(/\s+/g, ' ');
    if (!questionToUrls.has(key)) questionToUrls.set(key, []);
    questionToUrls.get(key).push(`${s.file} (${s.name})`);
  }
}

const dupes = [...questionToUrls.entries()].filter(([, locs]) => locs.length > 1);
const short = sources.filter((s) => s.count != null && s.count > 0 && s.count < FAQ_MIN);

console.log(`Sources FAQ exportées : ${sources.filter((s) => s.count).length}`);
console.log(`Questions dupliquées (exactes) : ${dupes.length}`);
console.log(`Blocs FAQ < ${FAQ_MIN} questions : ${short.length}`);

if (dupes.length) {
  console.log('\n--- Doublons (extrait) ---');
  for (const [q, locs] of dupes.slice(0, 15)) {
    console.log(`• ${q.slice(0, 70)}… → ${locs.join(' | ')}`);
  }
}

writeFileSync(
  join(ROOT, 'scripts/audit-faq-pages-report.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), sources, dupes: dupes.map(([q, locs]) => ({ q, locs })), short }, null, 2),
);
console.log('\nRapport → scripts/audit-faq-pages-report.json');
