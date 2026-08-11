#!/usr/bin/env node
/**
 * Audit métadonnées des page.tsx (sources) — title / description / problèmes.
 * Simule buildBrandedTitle + enrichPageDescription pour les pages via buildMetadata.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Chargement via tsx register si disponible — sinon logique locale
const BRAND = ' | Laure Olivié';
const TITLE_MAX = 60;
const SEG_MAX = TITLE_MAX - BRAND.length;
const DESC_MIN = 150;
const DESC_MAX = 160;

function stripBrand(t) {
  return t.replace(/\s*\|\s*Laure\s+Olivi[ée].*$/i, '').trim();
}

function truncateSegment(clean, max = SEG_MAX) {
  if (clean.length <= max) return clean.replace(/\s+(?:de|du|des|la|le|les|pour|et|ou|à|en|un|une|d)\s*$/i, '').trim();
  let cut = clean.slice(0, max).trimEnd();
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) cut = cut.slice(0, lastSpace).trimEnd();
  return cut.replace(/\s+(?:de|du|des|la|le|les|pour|et|ou|à|en|un|une|d)\s*$/i, '').trim();
}

function brandedTitle(raw) {
  const clean = stripBrand(raw);
  const truncated = truncateSegment(clean);
  return `${truncated}${BRAND}`;
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (name === 'page.tsx' || name === 'page.ts') acc.push(p);
  }
  return acc;
}

function pathFromFile(file) {
  let rel = relative('app', file).replace(/\\/g, '/');
  rel = rel.replace(/\/page\.tsx?$/, '');
  if (rel === 'page.tsx' || rel === 'page.ts' || rel === '.') return '/';
  return '/' + rel.replace(/\/\([^)]+\)/g, ''); // strip route groups
}

function extractStringConst(text, names) {
  for (const name of names) {
    const re = new RegExp(
      `(?:export\\s+)?(?:const|let)\\s+${name}\\s*=\\s*([\\\`'"])([\\s\\S]*?)\\1`,
    );
    const m = text.match(re);
    if (m) return m[2].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return null;
}

function extractMetadataField(text, field) {
  // metadata object inline
  const patterns = [
    new RegExp(`${field}\\s*:\\s*([\\\`'"])([\\s\\S]*?)\\1`, 'g'),
  ];
  // Prefer createPageMetadata / buildMetadata call args
  const callMatch = text.match(
    /(?:createPageMetadata|buildMetadata|buildPageMetadata)\s*\(\s*\{([\s\S]*?)\}\s*\)/,
  );
  const scope = callMatch ? callMatch[1] : text;
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(scope))) {
      const val = m[2].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
      if (field === 'title' && val.length < 5) continue;
      if (field === 'description' && val.length < 20) continue;
      if (val.includes('${')) continue; // template — skip dynamic
      return val;
    }
  }
  return null;
}

function usesBuildMetadata(text) {
  return /createPageMetadata|buildMetadata|buildPageMetadata/.test(text);
}

function hasDescriptionFinal(text) {
  return /descriptionFinal\s*:\s*true/.test(text);
}

function problemsFor({ url, titleRaw, titleFinal, descRaw, descFinal, usesHelper, descFinalFlag }) {
  const problems = [];
  if (!titleRaw && !titleFinal) problems.push('title manquant');
  if (!descRaw && !descFinal) problems.push('description manquante');

  const t = titleFinal || (titleRaw ? brandedTitle(titleRaw) : '');
  if (t) {
    if (t.length > TITLE_MAX) problems.push(`title trop long (${t.length}>${TITLE_MAX})`);
    if (!t.endsWith(BRAND.trim()) && !t.includes('| Laure Olivi')) {
      problems.push('suffixe | Laure Olivié absent');
    }
    if (titleRaw && stripBrand(titleRaw).length > SEG_MAX) {
      problems.push(`title source tronqué au build (${stripBrand(titleRaw).length}>${SEG_MAX} segment)`);
    }
  }

  const d = descFinal || descRaw || '';
  if (d) {
    if (d.length < DESC_MIN) problems.push(`description trop courte (${d.length}<${DESC_MIN})`);
    if (d.length > DESC_MAX) problems.push(`description trop longue (${d.length}>${DESC_MAX})`);
    if (/\.\.\.|…$/.test(d) || d.includes('…')) problems.push('ellipse dans description');
    if (!/[.!?]$/.test(d.trim())) problems.push('description sans ponctuation finale');
  }

  if (usesHelper && !/path\s*:/.test(
    textHasPath(url),
  )) {
    // checked elsewhere
  }

  return problems;
}

function textHasPath(_url) {
  return 'path:';
}

const pages = walk('app');
const rows = [];

for (const file of pages) {
  const text = readFileSync(file, 'utf8');
  const url = pathFromFile(file);

  // Skip API-like / dynamic-only without static metadata
  if (!/export\s+const\s+metadata|export\s+async\s+function\s+generateMetadata|export\s+function\s+generateMetadata/.test(text)) {
    rows.push({
      url,
      file,
      title: '(generateMetadata dynamique / absent)',
      titleLen: 0,
      desc: '(dynamique / absent)',
      descLen: 0,
      problems: ['metadata non-statique (generateMetadata ou absent)'],
      skipFix: true,
    });
    continue;
  }

  const titleConst =
    extractStringConst(text, [
      'META_TITLE_ABSOLUTE',
      'META_TITLE',
      'SEO_TITLE',
      'PAGE_TITLE',
      'HOME_META_TITLE',
      'FORMATIONS_HTML_TITLE',
      'A_PROPOS_META_TITLE',
      'FINANCEMENT_META_TITLE',
    ]) || extractMetadataField(text, 'titleAbsolute') || extractMetadataField(text, 'title');

  const descConst =
    extractStringConst(text, [
      'META_DESCRIPTION',
      'SEO_DESCRIPTION',
      'PAGE_DESCRIPTION',
      'HOME_META_DESCRIPTION',
    ]) || extractMetadataField(text, 'description');

  const helper = usesBuildMetadata(text);
  const finalFlag = hasDescriptionFinal(text);

  let titleFinal = null;
  let descFinal = null;

  if (titleConst) {
    titleFinal = helper || /titleAbsolute|absolute/.test(text)
      ? brandedTitle(titleConst)
      : // raw Next title + layout template
        (stripBrand(titleConst) + BRAND);
    // If already absolute via buildMetadata
    if (helper) titleFinal = brandedTitle(titleConst);
  }

  if (descConst) {
    descFinal = descConst;
    // Without descriptionFinal, enrich can change length — flag if out of range as-is
    // We don't reimplement enrich fully; flag source length issues
  }

  const problems = [];
  if (!titleConst) problems.push('title source non extrait');
  if (!descConst) problems.push('description source non extraite');

  if (titleConst) {
    const seg = stripBrand(titleConst);
    const final = brandedTitle(titleConst);
    if (seg.length > SEG_MAX) problems.push(`title segment trop long (${seg.length}>${SEG_MAX}) → troncature`);
    if (final.length > TITLE_MAX) problems.push(`title final trop long (${final.length})`);
  }

  if (descConst) {
    if (descConst.length < DESC_MIN) problems.push(`desc trop courte (${descConst.length})`);
    if (descConst.length > DESC_MAX) problems.push(`desc trop longue (${descConst.length})`);
    if (descConst.includes('…') || descConst.includes('...')) problems.push('ellipse');
    if (!/[.!?]$/.test(descConst.trim())) problems.push('pas de ponctuation finale');
    if (!finalFlag && helper && descConst.length < DESC_MIN) {
      problems.push('sans descriptionFinal — enrich peut modifier');
    }
  }

  // canonical: buildMetadata sets it; raw Metadata may miss it
  if (!helper && !/alternates\s*:|canonical/.test(text)) {
    problems.push('canonical absent (pas via buildMetadata)');
  }
  if (!helper && !/openGraph/.test(text)) {
    problems.push('openGraph absent');
  }
  if (!helper && !/twitter/.test(text)) {
    problems.push('twitter absent');
  }

  rows.push({
    url,
    file: relative('.', file),
    title: titleConst || '—',
    titleFinal: titleConst ? brandedTitle(titleConst) : '—',
    titleLen: titleConst ? brandedTitle(titleConst).length : 0,
    segLen: titleConst ? stripBrand(titleConst).length : 0,
    desc: descConst || '—',
    descLen: descConst ? descConst.length : 0,
    problems: problems.length ? problems : [],
    helper,
    finalFlag,
  });
}

const withIssues = rows.filter((r) => r.problems.length > 0);
const fixable = withIssues.filter((r) => !r.skipFix && (r.title !== '—' || r.desc !== '—'));

console.log(`Pages: ${rows.length} | avec problèmes: ${withIssues.length} | fixables source: ${fixable.length}`);
console.log('\n=== TABLEAU PROBLÈMES ===\n');
console.log('| URL | title (final) | len | description | len | problème |');
console.log('|---|---|---:|---|---:|---|');
for (const r of withIssues.sort((a, b) => a.url.localeCompare(b.url))) {
  const t = (r.titleFinal || r.title).replace(/\|/g, '\\|').slice(0, 70);
  const d = (r.desc || '—').replace(/\|/g, '\\|').slice(0, 70);
  const p = r.problems.join('; ').replace(/\|/g, '\\|');
  console.log(`| ${r.url} | ${t} | ${r.titleLen} | ${d} | ${r.descLen} | ${p} |`);
}

writeFileSync(
  'scripts/audit-page-metadata-report.json',
  JSON.stringify({ generatedAt: new Date().toISOString(), rows, withIssues }, null, 2),
);
console.log('\nRapport JSON → scripts/audit-page-metadata-report.json');
