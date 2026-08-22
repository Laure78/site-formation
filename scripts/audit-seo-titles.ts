#!/usr/bin/env npx tsx
/**
 * Audit des titres SEO : segment ≤ 40 car., total (segment + suffixe) ≤ 60 car.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import {
  buildTitle,
  BRAND_TITLE_SUFFIX,
  SEO_TITLE_MAX_LENGTH,
  SEO_TITLE_SEGMENT_MAX_LENGTH,
  stripBrandSuffix,
  truncateForBrandedTitle,
} from '../utils/metadata';

type Entry = {
  path: string;
  source: string;
  segment: string;
  htmlTitle: string;
  segmentLen: number;
  totalLen: number;
  truncated: boolean;
};

function walk(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name === 'node_modules' || name === '.next') continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|mdx)$/.test(name)) acc.push(p);
  }
  return acc;
}

function add(entries: Entry[], path: string, source: string, rawTitle: string) {
  const segment = stripBrandSuffix(rawTitle.trim());
  const htmlTitle = buildTitle(segment);
  const truncated = segment !== truncateForBrandedTitle(segment);
  entries.push({
    path,
    source,
    segment,
    htmlTitle,
    segmentLen: truncateForBrandedTitle(segment).length,
    totalLen: htmlTitle.length,
    truncated,
  });
}

const entries: Entry[] = [];

// createPageMetadata / titleAbsolute dans app + lib + components
const titlePatterns = [
  /titleAbsolute:\s*['"`]([^'"`]+)['"`]/g,
  /title:\s*['"`]([^'"`]{8,})['"`]/g,
  /SEO_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /META_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /HOME_META_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /PAGE_META_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /PAGE_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /A_PROPOS_META_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /FINANCEMENT_META_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
  /FORMATIONS_HTML_TITLE\s*=\s*['"`]([^'"`]+)['"`]/g,
];

for (const file of [...walk('app'), ...walk('lib'), ...walk('components')]) {
  const text = readFileSync(file, 'utf8');
  if (!text.includes('createPageMetadata') && !text.includes('titleAbsolute') && !text.includes('SEO_TITLE')) {
    continue;
  }
  for (const re of titlePatterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      const raw = m[1].replace(/\\'/g, "'").trim();
      if (raw.includes('${') || raw.length < 8) continue;
      const route = file.replace(/^app/, '').replace(/\/page\.tsx$/, '').replace(/\.tsx$/, '') || '/';
      add(entries, route, file, raw);
    }
  }
}

// Blog MDX
for (const file of walk('content/blog')) {
  if (!file.endsWith('.mdx')) continue;
  const { data } = matter(readFileSync(file, 'utf8'));
  const slug = file.replace(/^content\/blog\//, '').replace(/\.mdx$/, '');
  const raw = (data.seoTitle ?? data.title) as string;
  if (raw) add(entries, `/blog/${slug}`, file, raw);
}

// Dédupliquer par path+segment
const seen = new Set<string>();
const unique = entries.filter((e) => {
  const k = `${e.path}|${e.segment}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const overTotal = unique.filter((e) => e.totalLen > SEO_TITLE_MAX_LENGTH);
const overSegment = unique.filter((e) => e.segment.length > SEO_TITLE_SEGMENT_MAX_LENGTH);
const truncated = unique.filter((e) => e.truncated);

console.log(`Suffixe : "${BRAND_TITLE_SUFFIX}" (${BRAND_TITLE_SUFFIX.length} car.)`);
console.log(`Budget segment : ${SEO_TITLE_SEGMENT_MAX_LENGTH} car. | Total max : ${SEO_TITLE_MAX_LENGTH} car.\n`);
console.log(`Titres audités : ${unique.length}`);
console.log(`Total > ${SEO_TITLE_MAX_LENGTH} : ${overTotal.length}`);
console.log(`Segment source > ${SEO_TITLE_SEGMENT_MAX_LENGTH} : ${overSegment.length}`);
console.log(`Tronqués automatiquement : ${truncated.length}\n`);

if (overTotal.length) {
  console.log('=== ERREUR : total > 60 ===');
  for (const e of overTotal) {
    console.log(`${e.totalLen}\t${e.path}\n  ${e.htmlTitle}\n`);
  }
}

console.log('=== Segments > 40 car. (à raccourcir à la source) ===');
overSegment
  .sort((a, b) => b.segment.length - a.segment.length)
  .forEach((e) => {
    console.log(
      `${e.segment.length} → ${e.segmentLen} (+${BRAND_TITLE_SUFFIX.length} = ${e.totalLen})\t${e.path}\n  source: ${e.segment.slice(0, 70)}${e.segment.length > 70 ? '…' : ''}\n  final:  ${e.htmlTitle}\n`,
    );
  });
