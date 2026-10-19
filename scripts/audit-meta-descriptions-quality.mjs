#!/usr/bin/env node
/**
 * Contrôle qualité meta descriptions — aligné runtime (appendAuthorSuffix défaut false,
 * enrichPageDescription si pas descriptionFinal).
 *
 * Usage : node scripts/audit-meta-descriptions-quality.mjs [--json]
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ROOT = process.cwd();

const GENERIC_PATTERNS = [
  /découvrez nos solutions innovantes/i,
  /leader de la formation ia/i,
  /révolutionnez votre entreprise/i,
  /meilleure formation ia/i,
  /résultats garantis/i,
  /100\s*%\s*finanç/i,
  /financement garanti/i,
  /1\s*592|1500\+|1\s*500\+/i,
  /conductrice de travaux/i,
  /\b10 ans\b/i,
  /tarif journalier/i,
  /\bartisans\b.*mot-clé/i,
];

const FORBIDDEN_WORDS = [
  'GERESO',
  'ARFBABOF',
  'FSE+',
  'Mon Compte Formation',
  'Lefebvre Dalloz',
];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function parseStringAt(s, i) {
  if (i >= s.length) return [null, i];
  const q = s[i];
  if (!"'\"`".includes(q)) return [null, i];
  i += 1;
  let out = '';
  while (i < s.length) {
    const c = s[i];
    if (q === '`' && c === '$' && s[i + 1] === '{') return [null, i];
    if (c === '\\' && i + 1 < s.length) {
      out += s[i + 1];
      i += 2;
      continue;
    }
    if (c === q) return [out, i + 1];
    out += c;
    i += 1;
  }
  return [null, i];
}

function extractCreatePageMetadataBlock(text, startIdx) {
  const sub = text.slice(startIdx);
  const m = sub.match(/createPageMetadata\s*\(\s*\{/);
  if (!m) return null;
  let i = m.index + m[0].length - 1;
  let depth = 0;
  const start = i;
  while (i < sub.length) {
    if (sub[i] === '{') depth++;
    else if (sub[i] === '}') {
      depth--;
      if (depth === 0) return sub.slice(start, i + 1);
    }
    i++;
  }
  return null;
}

function parseDescriptionFromBlock(block) {
  let appendAuthorSuffix = false;
  const aps = block.match(/appendAuthorSuffix\s*:\s*(true|false)/);
  if (aps) appendAuthorSuffix = aps[1] === 'true';

  let descriptionFinal = false;
  const df = block.match(/descriptionFinal\s*:\s*(true|false)/);
  if (df) descriptionFinal = df[1] === 'true';

  const dm = block.match(/\bdescription\s*:/);
  if (!dm) return null;
  let j = dm.index + dm[0].length;
  while (j < block.length && /[\s\n]/.test(block[j])) j++;
  if (block.startsWith('withOgDescriptionSuffix', j)) {
    const p = block.indexOf('(', j) + 1;
    let k = p;
    while (k < block.length && /[\s\n]/.test(block[k])) k++;
    const [s] = parseStringAt(block, k);
    return s ? { raw: s, appendAuthorSuffix, descriptionFinal } : null;
  }
  const idM = block.slice(j).match(/^([A-Z_][A-Za-z0-9_]*)/);
  if (idM) return { ref: idM[1], appendAuthorSuffix, descriptionFinal };
  const [s] = parseStringAt(block, j);
  return s ? { raw: s, appendAuthorSuffix, descriptionFinal } : null;
}

const libCache = new Map();

function loadLibFile(rel) {
  const base = rel.replace(/^@\//, 'lib/');
  const candidates = [base, `${base}.ts`, `${base}.tsx`];
  for (const key of candidates) {
    if (libCache.has(key)) {
      const hit = libCache.get(key);
      if (hit) return hit;
      continue;
    }
    try {
      const t = readFileSync(join(ROOT, key), 'utf8');
      libCache.set(key, t);
      return t;
    } catch {
      libCache.set(key, null);
    }
  }
  return null;
}

function importedLibTexts(pageText) {
  const out = [];
  for (const m of pageText.matchAll(
    /from\s+['"]@\/([^'"]+)['"]/g,
  )) {
    const t = loadLibFile(m[1]);
    if (t) out.push(t);
  }
  return out;
}

function resolveConst(text, name, extraScopes = []) {
  const scopes = [text, ...extraScopes];
  for (const scope of scopes) {
    if (!scope) continue;
    const re = new RegExp(
      `(?:export\\s+)?const\\s+${name}\\s*=\\s*([\\s\\S]*?)(?:\\s+as\\s+const)?\\s*;`,
    );
    const m = scope.match(re);
    if (!m) continue;
    const tail = m[1].trim();
    if ((tail.startsWith("'") || tail.startsWith('"') || tail.startsWith('`')) && !tail.includes('${')) {
      const [s] = parseStringAt(tail, 0);
      if (s) return s;
    }
    let j = m.index + m[0].length;
    while (j < scope.length && /[\s\n]/.test(scope[j])) j++;
    const [s] = parseStringAt(scope, j);
    if (s) return s;
  }
  return null;
}

function pathFromPage(file) {
  let rel = relative(join(ROOT, 'app'), file).replace(/\\/g, '/');
  rel = rel.replace(/\/page\.tsx$/, '');
  if (!rel || rel === 'page.tsx') return '/';
  return (
    '/' +
    rel
      .split('/')
      .filter((s) => !(s.startsWith('(') && s.endsWith(')')))
      .join('/')
  );
}

function normalizeForCompare(s) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function jaccardWords(a, b) {
  const wa = new Set(normalizeForCompare(a).split(/\s+/));
  const wb = new Set(normalizeForCompare(b).split(/\s+/));
  let inter = 0;
  for (const w of wa) if (wb.has(w)) inter++;
  const union = wa.size + wb.size - inter;
  return union ? inter / union : 0;
}

/** Lazy-load enrich si tsx disponible */
let enrichPageDescription = (t) => t.replace(/\s+/g, ' ').trim();
try {
  const mod = require('../lib/meta-description.ts');
  enrichPageDescription = mod.enrichPageDescription;
} catch {
  // fallback sans enrich
}

const AUTHOR_SUFFIX = 'Laure Olivié, formatrice IA pour le BTP';

function finalDescription(raw, appendAuthorSuffix, descriptionFinal) {
  let d = raw.trim();
  if (appendAuthorSuffix && !d.includes(AUTHOR_SUFFIX)) {
    const sep = d.endsWith('.') ? ' ' : '. ';
    d = `${d}${sep}${AUTHOR_SUFFIX}.`;
  }
  if (descriptionFinal) return d.replace(/\s+/g, ' ').trim();
  return enrichPageDescription(d);
}

const rows = [];

for (const file of walk(join(ROOT, 'app')).filter((f) => f.endsWith('page.tsx'))) {
  const text = readFileSync(file, 'utf8');
  const url = pathFromPage(file);
  if (!/createPageMetadata|buildMetadata|generateMetadata/.test(text)) continue;

  const blocks = [];
  let idx = 0;
  while (true) {
    const pos = text.indexOf('createPageMetadata', idx);
    if (pos === -1) break;
    const block = extractCreatePageMetadataBlock(text, pos);
    if (block) blocks.push(block);
    idx = pos + 1;
  }
  const bm = text.match(/buildMetadata\s*\(\s*\{/g);
  if (bm) {
    for (const m of text.matchAll(/buildMetadata\s*\(\s*\{/g)) {
      const block = extractCreatePageMetadataBlock(text, m.index);
      if (block) blocks.push(block);
    }
  }

  for (const block of blocks) {
    const parsed = parseDescriptionFromBlock(block);
    if (!parsed) continue;
    let raw = parsed.raw;
    if (parsed.ref) {
      raw = resolveConst(text, parsed.ref, importedLibTexts(text));
      if (!raw) {
        rows.push({
          url,
          file: relative(ROOT, file),
          status: 'ref_unresolved',
          ref: parsed.ref,
        });
        continue;
      }
    }
    const desc = finalDescription(raw, parsed.appendAuthorSuffix, parsed.descriptionFinal);
    const problems = [];
    if (!desc) problems.push('vide');
    if (desc.length < 100) problems.push(`courte (${desc.length})`);
    if (desc.length > 165) problems.push(`longue (${desc.length})`);
    if (desc && !/[.!?]$/.test(desc.trim())) problems.push('sans ponctuation');
    for (const p of GENERIC_PATTERNS) {
      if (p.test(desc)) problems.push(`générique/${p.source.slice(0, 30)}`);
    }
    for (const w of FORBIDDEN_WORDS) {
      if (desc.includes(w)) problems.push(`interdit:${w}`);
    }
    rows.push({
      url,
      file: relative(ROOT, file),
      description: desc,
      length: desc.length,
      descriptionFinal: parsed.descriptionFinal,
      appendAuthorSuffix: parsed.appendAuthorSuffix,
      problems,
      status: problems.length ? 'issue' : 'ok',
    });
  }
}

// Blog JSON
for (const file of walk(join(ROOT, 'content/generated')).filter((f) =>
  f.endsWith('.json'),
)) {
  try {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    const desc = (data.description || '').trim();
    if (!desc) continue;
    const problems = [];
    if (desc.length < 100) problems.push(`courte (${desc.length})`);
    if (desc.length > 165) problems.push(`longue (${desc.length})`);
    rows.push({
      url: `/blog/${data.slug || '?'}`,
      file: relative(ROOT, file),
      description: desc,
      length: desc.length,
      problems,
      status: problems.length ? 'issue' : 'ok',
    });
  } catch {
    /* skip */
  }
}

const ok = rows.filter((r) => r.status === 'ok');
const issues = rows.filter((r) => r.status === 'issue' || r.status === 'ref_unresolved');

const descMap = new Map();
for (const r of rows) {
  if (!r.description) continue;
  const key = normalizeForCompare(r.description);
  if (!descMap.has(key)) descMap.set(key, []);
  descMap.get(key).push(r.url);
}
const exactDupes = [...descMap.entries()].filter(([, urls]) => urls.length > 1);

const similarPairs = [];
const withDesc = rows.filter((r) => r.description && r.length > 80);
for (let i = 0; i < withDesc.length; i++) {
  for (let j = i + 1; j < withDesc.length; j++) {
    const sim = jaccardWords(withDesc[i].description, withDesc[j].description);
    if (sim >= 0.85 && withDesc[i].url !== withDesc[j].url) {
      similarPairs.push({
        sim: sim.toFixed(2),
        a: withDesc[i].url,
        b: withDesc[j].url,
      });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    analyzed: rows.length,
    ok: ok.length,
    issues: issues.length,
    exactDuplicates: exactDupes.length,
    similarPairs: similarPairs.length,
  },
  exactDuplicates: exactDupes.map(([d, urls]) => ({
    urls,
    preview: d.slice(0, 100),
  })),
  similarPairs: similarPairs.slice(0, 50),
  issues: issues.sort((a, b) => a.url.localeCompare(b.url)),
};

writeFileSync(
  join(ROOT, 'scripts/audit-meta-descriptions-quality.json'),
  JSON.stringify(report, null, 2),
);

console.log(`Analysé: ${report.totals.analyzed} | OK: ${report.totals.ok} | Problèmes: ${report.totals.issues}`);
console.log(`Doublons exacts: ${report.totals.exactDuplicates} | Paires très similaires (≥85%): ${report.totals.similarPairs}`);
if (issues.length) {
  console.log('\n--- Problèmes (extrait) ---');
  for (const r of issues.slice(0, 40)) {
    console.log(`${r.url}\t${r.problems?.join(', ') || r.status}\t${(r.description || r.ref || '').slice(0, 90)}`);
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report.totals));
}
