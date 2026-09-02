#!/usr/bin/env node
/**
 * Migration CTA RDV v2 — libellés unifiés, suppression enfants morts, footers AllerPlusLoin.
 * Exclut : diagnostic-ia-btp, guides PDF, Calendly inline / widget iframe.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const EXT = new Set(['.tsx', '.ts']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git']);
const SKIP_FILES = new Set([
  'components/CtaRdv.tsx',
  'scripts/migrate-rdv-cta.mjs',
  'scripts/migrate-rdv-cta-v2.mjs',
]);

const RDV_LABEL = 'Réservez votre visio découverte gratuite';
const FOOTER_RE =
  /\{\s*href:\s*buildSiteCalendlyCtaUrl\([^)]+\),\s*label:\s*['"][^'"]*['"]\s*(?:,\s*external:\s*true)?\s*\}/g;
const FOOTER_REPL = `{ href: LINKS.prendreRdv, label: CTA_RDV_LABEL }`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name))) files.push(full);
  }
  return files;
}

function ensureImport(content, importLine) {
  if (content.includes(importLine.trim())) return content;
  const m = content.match(/^import .+;\n/m);
  if (m) {
    const idx = content.indexOf(m[0]) + m[0].length;
    return content.slice(0, idx) + importLine + content.slice(idx);
  }
  return importLine + content;
}

function stripTagChildren(content, tag) {
  const re = new RegExp(`<${tag}([^>/]*?)>[\\s\\S]*?<\\/${tag}>`, 'g');
  return content.replace(re, (match, attrs) => {
    if (match.includes('type="inline"') || match.includes("type='inline'")) return match;
    return `<${tag}${attrs} />`;
  });
}

let changed = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (SKIP_FILES.has(rel)) continue;
  if (rel.startsWith('app/prendre-rendez-vous/')) continue;
  if (rel === 'app/diagnostic-ia-btp/page.tsx') continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Sommaire #rdv seul (pas #rdv-1, #rdv-audit)
  content = content.replace(
    /\{\s*href:\s*['"]#rdv['"],\s*label:\s*[^}]+\}/g,
    `{ href: LINKS.prendreRdv, label: CTA_RDV_LABEL }`,
  );

  // Footers AllerPlusLoin
  content = content.replace(FOOTER_RE, FOOTER_REPL);

  // Labels hétérogènes dans tableaux href LINKS.prendreRdv
  content = content.replace(
    /\{\s*href:\s*LINKS\.prendreRdv,\s*label:\s*['"](?:Prendre rendez-vous|Prendre RDV|Réserver[^'"]*|Ouvrir Calendly[^'"]*)['"]\s*\}/g,
    `{ href: LINKS.prendreRdv, label: CTA_RDV_LABEL }`,
  );

  // Libellés seo-architecture / formations
  content = content.replace(
    /label:\s*['"]Prendre rendez-vous['"],\s*href:\s*LINKS\.prendreRdv/g,
    `label: '${RDV_LABEL}', href: LINKS.prendreRdv`,
  );

  // Enfants morts
  for (const tag of ['RdvLink', 'CTACalendly']) {
    content = stripTagChildren(content, tag);
  }
  content = stripTagChildren(content, 'CalendlyEmbed');

  // ChatWidget
  content = content.replace(
    /\{\s*label:\s*['"]Prendre rendez-vous['"],\s*href:\s*CHAT_WIDGET_RDV/g,
    `{ label: '${RDV_LABEL}', href: CHAT_WIDGET_RDV`,
  );

  // FAQ / blog HTML anchors (texte unifié, href inchangé)
  content = content.replace(
    /<a href="\$\{LINKS\.prendreRdv\}">prendre rendez-vous<\/a>/gi,
    `<a href="\${LINKS.prendreRdv}">${RDV_LABEL}</a>`,
  );
  content = content.replace(
    /<a href="\$\{LINKS\.prendreRdv\}">prise de rendez-vous<\/a>/gi,
    `<a href="\${LINKS.prendreRdv}">${RDV_LABEL}</a>`,
  );
  content = content.replace(
    /<a href="\$\{LINKS\.prendreRdv\}">rendez-vous découverte<\/a>/gi,
    `<a href="\${LINKS.prendreRdv}">${RDV_LABEL}</a>`,
  );
  content = content.replace(
    /<a href="\/prendre-rendez-vous"[^>]*>Prendre rendez-vous[^<]*<\/a>/gi,
    `<a href="/prendre-rendez-vous">${RDV_LABEL}</a>`,
  );

  if (content !== original) {
    if (content.includes('CTA_RDV_LABEL') && !content.includes("from '@/components/CtaRdv'")) {
      content = ensureImport(content, "import { CTA_RDV_LABEL } from '@/components/CtaRdv';\n");
    }
    if (
      content.includes('LINKS.prendreRdv') &&
      !content.match(/import[\s\S]*LINKS[\s\S]*internal-links/)
    ) {
      content = ensureImport(content, "import { LINKS } from '@/lib/internal-links';\n");
    }
    fs.writeFileSync(file, content);
    changed++;
    console.log('updated:', rel);
  }
}

console.log(`\n${changed} fichier(s) modifié(s).`);
