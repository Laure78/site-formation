#!/usr/bin/env node
/**
 * Ajoute quality={70|75} et loading="lazy" aux <Image> sans quality.
 * Ne modifie pas les blocs qui ont déjà quality=.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.tsx$/.test(name)) acc.push(p);
  }
  return acc;
}

function patchImageTags(source) {
  return source.replace(/<Image(\s[\s\S]*?)(\/?>)/g, (full, attrs, close) => {
    if (attrs.includes('quality=')) return full;

    const isPriorityFalse = /priority=\{false\}/.test(attrs);
    const hasPriority =
      !isPriorityFalse &&
      (/\bpriority(?=\s|\/?>|\n)/.test(attrs) || /priority=\{[^f]/.test(attrs));

    const indentMatch = attrs.match(/\n(\s+)\S/);
    const indent = indentMatch ? indentMatch[1] : '        ';
    const quality = hasPriority ? 'quality={75}' : 'quality={70}';
    let injected = `\n${indent}${quality}`;
    if (!hasPriority && !attrs.includes('loading=')) {
      injected += `\n${indent}loading="lazy"`;
    }
    return `<Image${attrs}${injected}${close}`;
  });
}

let changed = 0;
for (const root of ['app', 'components']) {
  for (const file of walk(root)) {
    const before = readFileSync(file, 'utf8');
    if (!before.includes('<Image')) continue;
    const after = patchImageTags(before);
    if (after !== before) {
      writeFileSync(file, after);
      changed++;
      console.log('patched', file);
    }
  }
}
console.log('files patched:', changed);
