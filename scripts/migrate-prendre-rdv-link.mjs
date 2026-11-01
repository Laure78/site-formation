#!/usr/bin/env node
/** Remplace <Link href={LINKS.prendreRdv}…> par <CtaVisio src="…" … /> (composants + app). */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.next', '.git', 'CtaVisio.tsx', 'CtaRdv.tsx', 'RdvLink.tsx']);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.tsx$/.test(name)) files.push(full);
  }
  return files;
}

function slugFromPath(rel) {
  return rel
    .replace(/\.tsx$/, '')
    .replace(/\//g, '-')
    .replace(/^app-/, '')
    .replace(/^components-/, 'cmp-');
}

function ensureImports(content, needsDevis) {
  let c = content;
  if (!c.includes("from '@/components/CtaVisio'")) {
    const m = c.match(/^import .+;\n/m);
    const line = "import { CtaVisio } from '@/components/CtaVisio';\n";
    c = m ? c.slice(0, m.index + m[0].length) + line + c.slice(m.index + m[0].length) : line + c;
  }
  if (needsDevis && !c.includes("from '@/components/CtaDevis'")) {
    const m = c.match(/^import .+;\n/m);
    const line = "import { CtaDevis } from '@/components/CtaDevis';\n";
    c = m ? c.slice(0, m.index + m[0].length) + line + c.slice(m.index + m[0].length) : line + c;
  }
  return c;
}

const patterns = [
  {
    re: /<Link\s+href=\{LINKS\.prendreRdv\}\s+className=\{([^}]+)\}\s*>\s*[\s\S]*?<\/Link>/g,
    repl: (src, cls) => `<CtaVisio src="${src}" className={${cls}} />`,
  },
  {
    re: /<Link\s+href=\{\`\$\{LINKS\.prendreRdv\}\?src=([^`]+)\`\}\s+className=\{([^}]+)\}\s*[^>]*>\s*[\s\S]*?<\/Link>/g,
    repl: (src, cls) => `<CtaVisio src="${src}" className={${cls}} />`,
  },
  {
    re: /<Link\s+href=\{LINKS\.prendreRdv\}\s+className="([^"]+)"\s*>\s*[\s\S]*?<\/Link>/g,
    repl: (src, cls) => `<CtaVisio src="${src}" className="${cls}" />`,
  },
];

let n = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith('scripts/')) continue;
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('prendreRdv') && !c.includes('prendre-rdv')) continue;
  const orig = c;
  const defaultSrc = slugFromPath(rel);

  c = c.replace(
    /<Link\s+href=\{\`\$\{LINKS\.prendreRdv\}\?src=([^`]+)\`\}\s+className=\{([^}]+)\}\s*[^>]*>\s*[\s\S]*?<\/Link>/g,
    (_, src, cls) => `<CtaVisio src="${src}" className={${cls}} />`,
  );
  c = c.replace(
    /<Link\s+href=\{LINKS\.prendreRdv\}\s+className=\{(`[^`]+`|[^}]+)\}\s*>\s*[\s\S]*?<\/Link>/g,
    (_, cls) => `<CtaVisio src="${defaultSrc}" className={${cls}} />`,
  );
  c = c.replace(
    /<Link\s+href="\/contact"\s+className="([^"]+)"\s*>\s*[\s\S]*?<\/Link>/g,
    (_, cls) => `<CtaDevis href="/contact" className="${cls}" />`,
  );
  c = c.replace(
    /<Link\s+href="\/contact"\s+className=\{([^}]+)\}\s*>\s*[\s\S]*?<\/Link>/g,
    (_, cls) => `<CtaDevis href="/contact" className={${cls}} />`,
  );
  c = c.replace(
    /<Link\s+href=\{LINKS\.prendreRdv\}\s+className="([^"]+)"\s*>\s*[\s\S]*?<\/Link>/g,
    (_, cls) => `<CtaVisio src="${defaultSrc}" className="${cls}" />`,
  );

  const needsDevis = c.includes('CtaDevis') && !orig.includes('CtaDevis');
  if (c !== orig) {
    c = ensureImports(c, needsDevis);
    fs.writeFileSync(file, c);
    n++;
    console.log(rel);
  }
}
console.log(`${n} fichiers`);
