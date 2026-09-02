#!/usr/bin/env node
/** Strip enfants morts (multiligne) + footers AllerPlusLoin multilignes. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.next', '.git']);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.tsx$/.test(name)) files.push(full);
  }
  return files;
}

function ensureImport(content, line) {
  if (content.includes(line.trim())) return content;
  const m = content.match(/^import .+;\n/m);
  if (m) return content.slice(0, m.index + m[0].length) + line + content.slice(m.index + m[0].length);
  return line + content;
}

function stripChildren(content, tag) {
  return content.replace(new RegExp(`<${tag}([\\s\\S]*?)>([\\s\\S]*?)<\\/${tag}>`, 'g'), (full, attrs, inner) => {
    if (!inner.trim()) return full;
    if (tag === 'CalendlyEmbed' && /type\s*=\s*['"]inline['"]/.test(attrs)) return full;
    return `<${tag}${attrs.trimEnd()} />`;
  });
}

let n = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel === 'components/CtaRdv.tsx') continue;

  let c = fs.readFileSync(file, 'utf8');
  const orig = c;

  for (const tag of ['RdvLink', 'CTACalendly', 'CtaButton']) c = stripChildren(c, tag);
  c = stripChildren(c, 'CalendlyEmbed');

  // Footers multilignes buildSiteCalendlyCtaUrl
  c = c.replace(
    /href:\s*buildSiteCalendlyCtaUrl\([^)]+\),\s*\n\s*label:\s*['"][^'"]*['"]/g,
    'href: LINKS.prendreRdv, label: CTA_RDV_LABEL',
  );
  c = c.replace(
    /href:\s*allerPlusCalendlyHref,\s*label:\s*['"]Prendre rendez-vous['"]/g,
    'href: LINKS.prendreRdv, label: CTA_RDV_LABEL',
  );

  if (c !== orig) {
    if (c.includes('CTA_RDV_LABEL') && !c.includes("from '@/components/CtaRdv'")) {
      c = ensureImport(c, "import { CTA_RDV_LABEL } from '@/components/CtaRdv';\n");
    }
    if (c.includes('LINKS.prendreRdv') && !/import[\s\S]*LINKS[\s\S]*internal-links/.test(c)) {
      c = ensureImport(c, "import { LINKS } from '@/lib/internal-links';\n");
    }
    fs.writeFileSync(file, c);
    n++;
    console.log(rel);
  }
}
console.log(`${n} fichiers`);
