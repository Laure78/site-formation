#!/usr/bin/env node
/**
 * Inventaire des CTA vers /prendre-rdv et /contact.
 * Signale les libellés non canoniques et les liens sans CtaVisio / CtaDevis.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.next', '.git', 'dist']);
const CANON_VISIO = 'Réservez votre visio découverte gratuite';
const CANON_DEVIS = 'Demander un devis';

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.(tsx|ts|jsx)$/.test(name)) files.push(full);
  }
  return files;
}

const hrefRe =
  /(?:href=\{[^}]*\}|href=["'`][^"'`]*(?:prendre-rdv|\/contact)[^"'`]*["'`])/g;

const rows = [];

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith('scripts/')) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('prendre-rdv') && !content.includes('/contact')) continue;
  if (!content.includes('prendre-rdv') && !content.match(/LINKS\.contact/)) continue;

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      !line.includes('prendre-rdv') &&
      !line.includes('/contact') &&
      !line.includes('LINKS.contact') &&
      !line.includes('prendreRdv')
    ) {
      continue;
    }
    if (!/href|label:|CTA_|CtaVisio|CtaDevis|CtaRdv/.test(line)) continue;

    const usesVisio = /CtaVisio/.test(content.slice(0, content.indexOf(line) + line.length));
    const usesDevis = /CtaDevis/.test(content.slice(0, content.indexOf(line) + line.length));
    const isRdv = /prendre-rdv|prendreRdv/.test(line);
    const isContact = /\/contact|LINKS\.contact/.test(line);

    let flag = '';
    if (isRdv && !/CtaVisio|CtaRdv/.test(line) && /Link|<a/.test(lines[i - 1] ?? line + lines[i + 1])) {
      flag = '→ migrer CtaVisio';
    }
    if (isContact && /Link|<a/.test(line) && !/CtaDevis/.test(line) && /objet=|Demander|devis|contact/i.test(line)) {
      if (/>[^<]{3,}/.test(lines.slice(i, i + 3).join(' '))) flag = flag || '→ migrer CtaDevis?';
    }
    if (/Échanger sur|Prendre rendez|Être conseill|Réserver ma visio/i.test(line)) {
      flag = 'libellé non canonique';
    }
    if (/label:\s*['"][^'"]+['"]/.test(line) && isRdv) {
      const m = line.match(/label:\s*['"]([^'"]+)['"]/);
      if (m && m[1] !== CANON_VISIO) flag = `label RDV: « ${m[1]} »`;
    }

    if (flag || (isRdv && /Link|href/.test(line))) {
      rows.push({ rel, line: i + 1, text: line.trim().slice(0, 120), flag });
    }
  }
}

rows.sort((a, b) => a.rel.localeCompare(b.rel) || a.line - b.line);
console.log(`# Audit CTA — ${rows.length} entrées (${new Date().toISOString().slice(0, 10)})\n`);
console.log(`Canonique visio : « ${CANON_VISIO} » (CtaVisio + clic_visio)`);
console.log(`Canonique devis : « ${CANON_DEVIS} » (CtaDevis + contact)\n`);

for (const r of rows) {
  console.log(`${r.rel}:${r.line}${r.flag ? ` [${r.flag}]` : ''}`);
  console.log(`  ${r.text}\n`);
}
