#!/usr/bin/env node
/** Remplace les <Link href={LINKS.contact}>…</Link> par <CtaDevis … />. */
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

const linkRe =
  /<Link\s+href=\{(LINKS\.contact)\}\s+className=\{([^}]+)\}\s*>\s*[\s\S]*?<\/Link>/g;

const linkRe2 =
  /<Link\s+href="\/contact"\s+className=\{([^}]+)\}\s*>\s*[\s\S]*?<\/Link>/g;

const linkRe3 =
  /<Link\s+href=\{LINKS\.contact\}\s+className="([^"]+)"\s*>\s*[\s\S]*?<\/Link>/g;

function ensureImport(content) {
  if (content.includes("from '@/components/CtaDevis'")) return content;
  const m = content.match(/^import .+;\n/m);
  const line = "import { CtaDevis } from '@/components/CtaDevis';\n";
  if (m) return content.slice(0, m.index + m[0].length) + line + content.slice(m.index + m[0].length);
  return line + content;
}

let n = 0;
for (const file of walk(path.join(ROOT, 'app'))) {
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = c.replace(linkRe, '<CtaDevis href={$1} className={$2} />');
  c = c.replace(linkRe2, '<CtaDevis href="/contact" className={$1} />');
  c = c.replace(linkRe3, '<CtaDevis className="$1" />');
  if (c !== orig) {
    c = ensureImport(c);
    fs.writeFileSync(file, c);
    n++;
    console.log(path.relative(ROOT, file));
  }
}

for (const file of walk(path.join(ROOT, 'components'))) {
  if (file.includes('CtaDevis.tsx')) continue;
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = c.replace(linkRe, '<CtaDevis href={$1} className={$2} />');
  c = c.replace(linkRe2, '<CtaDevis href="/contact" className={$1} />');
  c = c.replace(linkRe3, '<CtaDevis className="$1" />');
  if (c !== orig) {
    c = ensureImport(c);
    fs.writeFileSync(file, c);
    n++;
    console.log(path.relative(ROOT, file));
  }
}

console.log(`${n} fichiers mis à jour`);
