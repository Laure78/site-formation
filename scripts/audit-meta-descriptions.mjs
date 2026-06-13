#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const MAX = 160;
const patterns = [
  /metaDescription:\s*['"`]([^'"`]+)['"`]/g,
  /description:\s*['"`]([^'"`]{40,})['"`]/g,
  /META_DESCRIPTION\s*=\s*['"`]([^'"`]+)['"`]/g,
  /_META_DESCRIPTION\s*=\s*[`'"]([^`'"]+)[`'"]/g,
];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name === 'node_modules' || name === '.next') continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|mjs)$/.test(name)) acc.push(p);
  }
  return acc;
}

const issues = [];
for (const file of [...walk('app'), ...walk('lib')]) {
  const text = readFileSync(file, 'utf8');
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      const desc = m[1].replace(/\\n/g, ' ').trim();
      if (desc.length > MAX) {
        issues.push({ file, len: desc.length, desc: desc.slice(0, 90) + '…' });
      }
    }
  }
}

issues.sort((a, b) => b.len - a.len);
console.log(`Descriptions > ${MAX} car. : ${issues.length}`);
for (const i of issues.slice(0, 40)) {
  console.log(`${i.len}\t${i.file}\n  ${i.desc}\n`);
}
