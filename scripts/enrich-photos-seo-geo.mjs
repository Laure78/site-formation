#!/usr/bin/env node
/** Enrichit les alt dans lib/photos.ts — SEO + GEO IDF. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_PATH = path.join(__dirname, '../lib/photos.ts');
const PHOTO_ALT_MAX = 125;

function pickGeoAltSuffix(seed) {
  const options = ['Paris IDF', 'Île-de-France', 'Paris et IDF', 'Guyancourt (78)'];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % options.length;
  return options[h];
}

function hasSeoFormationKeyword(text) {
  const lower = text.toLowerCase();
  return (
    lower.includes('formation ia') ||
    lower.includes('ia btp') ||
    lower.includes('ia bâtiment') ||
    lower.includes('travaux publics') ||
    lower.includes('chatgpt btp') ||
    lower.includes('intelligence artificielle')
  );
}

function hasSeoGeoSignal(text) {
  const lower = text.toLowerCase();
  return (
    lower.includes('paris') ||
    lower.includes('île-de-france') ||
    lower.includes('ile-de-france') ||
    /\bidf\b/.test(lower) ||
    lower.includes('guyancourt') ||
    lower.includes('versailles') ||
    /\b(75|77|78|91|92|93|94|95)\b/.test(lower)
  );
}

function clampPhotoAlt(text, max = PHOTO_ALT_MAX) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, max - 1);
  return `${cut.replace(/[,;:\s-]+$/u, '')}…`;
}

function enrichPhotoAlt(baseAlt, seed = baseAlt) {
  const trimmed = baseAlt.replace(/\s+/g, ' ').trim();
  if (/^logo\s/i.test(trimmed) || trimmed.startsWith('Logo Qualiopi')) return trimmed;
  let out = trimmed;
  if (!hasSeoFormationKeyword(out)) out = `${out} — formation IA BTP`;
  if (!hasSeoGeoSignal(out)) {
    const candidate = `${out}, ${pickGeoAltSuffix(seed)}`;
    out = candidate.length <= PHOTO_ALT_MAX ? candidate : out;
  }
  return clampPhotoAlt(out);
}

function extractAlt(block) {
  for (const re of [/alt:\s*\n\s*(['"])((?:\\.|(?!\1).)*)\1/s, /alt:\s*(['"])((?:\\.|(?!\1).)*)\1/s]) {
    const m = block.match(re);
    if (m) {
      const quote = m[1];
      return { full: m[0], value: m[2].replace(new RegExp(`\\\\${quote}`, 'g'), quote) };
    }
  }
  return null;
}

let content = fs.readFileSync(PHOTOS_PATH, 'utf8');
let altCount = 0;
const blockRe = /(\n\s{2}[a-zA-Z0-9]+:\s*\{[\s\S]*?\n\s{2}\},?)/g;

content = content.replace(blockRe, (block) => {
  const altInfo = extractAlt(block);
  if (!altInfo) return block;
  const enriched = enrichPhotoAlt(altInfo.value);
  if (enriched === altInfo.value) return block;
  altCount++;
  const indentMatch = altInfo.full.match(/^(\s*)alt:/m);
  const indent = indentMatch ? indentMatch[1] : '    ';
  return block.replace(altInfo.full, `${indent}alt: ${JSON.stringify(enriched)}`);
});

fs.writeFileSync(PHOTOS_PATH, content);
console.log(`photos.ts — ${altCount} alt enrichis.`);
