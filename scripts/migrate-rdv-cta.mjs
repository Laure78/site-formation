#!/usr/bin/env node
/**
 * Migration CTA RDV — remplace #rdv et libellés hétérogènes par LINKS.prendreRdv + CTA_RDV_LABEL.
 * Exclut diagnostic-ia-btp et guides PDF.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const EXT = new Set(['.tsx', '.ts']);
const SKIP = new Set(['node_modules', '.next', '.git', 'scripts/migrate-rdv-cta.mjs']);

const RDV_LABEL = 'Réservez votre visio découverte gratuite';

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
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

let changed = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel === 'components/CtaRdv.tsx') continue;
  if (rel.startsWith('app/prendre-rendez-vous')) continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Sommaire / nav items
  content = content.replace(
    /\{\s*href:\s*['"]#rdv['"],\s*label:\s*['"][^'"]*['"]\s*\}/g,
    `{ href: LINKS.prendreRdv, label: CTA_RDV_LABEL }`,
  );

  // Inline anchor links (simple pattern)
  content = content.replace(
    /<a\s+href="#rdv"\s+className="([^"]+)"\s*>\s*[\s\S]*?<\/a>/g,
    '<CtaRdv variant="inline" origin="page-inline-rdv" className="$1" />',
  );

  content = content.replace(/href=\{LINKS\.accueilRdv\}/g, 'href={LINKS.prendreRdv}');
  content = content.replace(/href=["']\/#rdv["']/g, 'href={LINKS.prendreRdv}');
  content = content.replace(/href=["']#rdv["']/g, 'href={LINKS.prendreRdv}');

  if (content !== original) {
    if (content.includes('CTA_RDV_LABEL') && !content.includes("from '@/components/CtaRdv'")) {
      content = ensureImport(content, "import { CTA_RDV_LABEL } from '@/components/CtaRdv';\n");
    }
    if (content.includes('<CtaRdv') && !content.includes("from '@/components/CtaRdv'")) {
      content = ensureImport(
        content,
        "import { CtaRdv, CTA_RDV_LABEL } from '@/components/CtaRdv';\n",
      );
    }
    if (
      (content.includes('LINKS.prendreRdv') || content.includes('CTA_RDV_LABEL')) &&
      !content.includes("from '@/lib/internal-links'") &&
      !content.includes('LINKS.')
    ) {
      /* already has LINKS via other imports often */
    }
    if (content.includes('LINKS.prendreRdv') && !content.match(/import[\s\S]*LINKS[\s\S]*internal-links/)) {
      content = ensureImport(content, "import { LINKS } from '@/lib/internal-links';\n");
    }
    fs.writeFileSync(file, content);
    changed++;
    console.log('updated:', rel);
  }
}

console.log(`\n${changed} fichier(s) modifié(s).`);
