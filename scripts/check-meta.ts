/**
 * Audit SEO — title ≤ 60 car., description 140–160 car., sans ellipse finale.
 * Usage : npx tsx scripts/check-meta.ts
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildTitle, stripBrandSuffix } from '../utils/metadata';
import { enrichPageDescription } from '../lib/meta-description';
import {
  A_PROPOS_PAGE_META_DESCRIPTION,
  A_PROPOS_PAGE_META_TITLE,
} from '../lib/a-propos-page-config';

const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 160;
const ROOT = join(process.cwd(), 'app');

type Issue = { kind: 'title' | 'description'; message: string };

type Row = {
  path: string;
  file: string;
  title: string;
  titleLen: number;
  description: string;
  descLen: number;
  issues: Issue[];
  skipped?: string;
};

/** Symboles connus hors page.tsx (sources canoniques). */
const GLOBAL_SYMBOLS: Record<string, string> = {
  A_PROPOS_PAGE_META_TITLE,
  A_PROPOS_PAGE_META_DESCRIPTION,
};

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (name === 'page.tsx' || name === 'page.ts') acc.push(p);
  }
  return acc;
}

function routeFromFile(file: string): string {
  let rel = relative(ROOT, file).replace(/\\/g, '/');
  rel = rel.replace(/\/page\.tsx?$/, '');
  if (!rel || rel === 'page.tsx' || rel === 'page.ts') return '/';
  return `/${rel.replace(/\/\([^)]+\)/g, '')}`;
}

function unwrapStringLiteral(raw: string): string | null {
  const t = raw.trim();
  const q = t[0];
  if (q !== "'" && q !== '"' && q !== '`') return null;
  if (t.includes('${')) return null;
  if (q === '`') {
    const end = t.lastIndexOf('`');
    if (end <= 0) return null;
    return t.slice(1, end).replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const end = t.indexOf(q, 1);
  if (end < 0) return null;
  return t.slice(1, end).replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function resolveConstValue(text: string, name: string): string | null {
  if (GLOBAL_SYMBOLS[name]) return GLOBAL_SYMBOLS[name];
  const re = new RegExp(
    `(?:export\\s+)?const\\s+${name}\\s*=\\s*([\\s\\S]*?);`,
    'm',
  );
  const m = text.match(re);
  if (!m) return null;
  const rhs = m[1].trim();
  if (rhs.startsWith("'") || rhs.startsWith('"') || rhs.startsWith('`')) {
    return unwrapStringLiteral(rhs.split(/\s+as\s+const/)[0].trim());
  }
  return null;
}

function extractMetadataCall(text: string): string | null {
  const re = /(?:createPageMetadata|buildMetadata|buildPageMetadata)\s*\(\s*\{([\s\S]*?)\}\s*\)/;
  const m = text.match(re);
  return m?.[1] ?? null;
}

function parseImports(text: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /import\s+\{([^}]+)\}\s+from\s+['"]@\/([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    for (const part of m[1].split(',')) {
      const sym = part.trim().split(/\s+as\s+/)[0]?.trim();
      if (sym) map.set(sym, m[2]);
    }
  }
  return map;
}

const libCache = new Map<string, Record<string, unknown>>();

async function loadLibExport(modulePath: string, symbol: string): Promise<string | null> {
  if (GLOBAL_SYMBOLS[symbol]) return GLOBAL_SYMBOLS[symbol];
  let mod = libCache.get(modulePath);
  if (!mod) {
    const abs = join(process.cwd(), modulePath.replace(/^lib\//, 'lib/'));
    const url = pathToFileURL(abs.endsWith('.ts') ? abs : `${abs}.ts`).href;
    try {
      mod = (await import(url)) as Record<string, unknown>;
      libCache.set(modulePath, mod);
    } catch {
      return null;
    }
  }
  const v = mod[symbol];
  return typeof v === 'string' ? v : null;
}

async function resolveSymbol(text: string, id: string): Promise<string | null> {
  const local = resolveConstValue(text, id);
  if (local) return local;
  if (GLOBAL_SYMBOLS[id]) return GLOBAL_SYMBOLS[id];
  const imports = parseImports(text);
  const mod = imports.get(id);
  if (mod) return loadLibExport(mod, id);
  return null;
}

function extractAbsoluteTitleOverride(text: string): string | null {
  const m = text.match(/title\s*:\s*\{\s*absolute\s*:\s*([A-Z_][A-Z0-9_]*)\s*\}/);
  if (!m) return null;
  return resolveConstValue(text, m[1]);
}

function hasDescriptionFinal(scope: string): boolean {
  return /descriptionFinal\s*:\s*true/.test(scope);
}

function descriptionEndsWithEllipse(desc: string): boolean {
  const d = desc.trim();
  return d.endsWith('…') || d.endsWith('...');
}

async function analyzePage(file: string): Promise<Row> {
  const text = readFileSync(file, 'utf8');
  const path = routeFromFile(file);
  const relFile = relative(process.cwd(), file);

  if (
    !/export\s+const\s+metadata/.test(text) &&
    /export\s+(async\s+)?function\s+generateMetadata/.test(text)
  ) {
    return {
      path,
      file: relFile,
      title: '—',
      titleLen: 0,
      description: '—',
      descLen: 0,
      issues: [],
      skipped: 'generateMetadata (dynamique)',
    };
  }

  if (!/export\s+const\s+metadata/.test(text)) {
    return {
      path,
      file: relFile,
      title: '—',
      titleLen: 0,
      description: '—',
      descLen: 0,
      issues: [],
      skipped: 'metadata absente',
    };
  }

  const scope = extractMetadataCall(text) ?? text;

  const titleSegment =
    (await resolveFromField(text, scope, 'titleAbsolute')) ??
    (await resolveFromField(text, scope, 'title'));
  const descriptionRaw = await resolveFromField(text, scope, 'description');
  const ogDesc = await resolveFromField(text, scope, 'openGraphDescription');
  const finalFlag = hasDescriptionFinal(scope);

  let title =
    extractAbsoluteTitleOverride(text) ??
    (titleSegment ? buildTitle(stripBrandSuffix(titleSegment)) : null);

  if (!title) {
    const names = [
      'HOME_META_TITLE_ABSOLUTE',
      'PAGE_TITLE',
      'META_TITLE',
      'SEO_TITLE',
    ];
    for (const n of names) {
      const v = resolveConstValue(text, n);
      if (v) {
        title = v.includes('| Laure Olivi') ? v : buildTitle(stripBrandSuffix(v));
        break;
      }
    }
  }

  let description = ogDesc ?? descriptionRaw ?? null;
  if (description && !ogDesc && !finalFlag) {
    description = enrichPageDescription(description);
  }

  const issues: Issue[] = [];

  if (!title) {
    issues.push({ kind: 'title', message: 'title non extrait' });
  } else if (title.length > TITLE_MAX) {
    issues.push({
      kind: 'title',
      message: `title ${title.length} car. (> ${TITLE_MAX})`,
    });
  }

  if (!description) {
    issues.push({ kind: 'description', message: 'description non extraite' });
  } else {
    if (description.length < DESC_MIN || description.length > DESC_MAX) {
      issues.push({
        kind: 'description',
        message: `description ${description.length} car. (hors ${DESC_MIN}–${DESC_MAX})`,
      });
    }
    if (descriptionEndsWithEllipse(description)) {
      issues.push({
        kind: 'description',
        message: 'description se termine par une ellipse',
      });
    }
  }

  return {
    path,
    file: relFile,
    title: title ?? '—',
    titleLen: title?.length ?? 0,
    description: description ?? '—',
    descLen: description?.length ?? 0,
    issues,
  };
}

async function resolveFromField(
  fileText: string,
  scope: string,
  field: string,
): Promise<string | null> {
  const re = new RegExp(`${field}\\s*:\\s*([^,\\n]+)`, 'm');
  const m = scope.match(re);
  if (!m) return null;
  const raw = m[1].trim().replace(/,$/, '');
  const lit = unwrapStringLiteral(raw);
  if (lit) return lit;
  if (/^[A-Z_][A-Z0-9_]*$/.test(raw)) {
    return (
      resolveConstValue(fileText, raw) ??
      (await resolveSymbol(fileText, raw))
    );
  }
  return null;
}

async function main(): Promise<void> {
  const files = walk(ROOT);
  const rows: Row[] = [];
  for (const file of files) {
    rows.push(await analyzePage(file));
  }

  const flagged = rows.filter((r) => r.issues.length > 0);
  const skipped = rows.filter((r) => r.skipped);

  console.log(`\n=== check-meta — ${files.length} routes ===\n`);
  console.log(
    `Conformes (extrait statique) : ${rows.length - flagged.length - skipped.length} | hors limites : ${flagged.length} | ignorées : ${skipped.length}\n`,
  );

  if (flagged.length === 0) {
    console.log('Aucune anomalie sur les pages à metadata statique.');
  } else {
    for (const r of flagged.sort((a, b) => a.path.localeCompare(b.path))) {
      console.log(`${r.path}  (${r.file})`);
      console.log(`  title (${r.titleLen}) : ${r.title}`);
      console.log(`  desc  (${r.descLen}) : ${r.description}`);
      for (const i of r.issues) {
        console.log(`  → [${i.kind}] ${i.message}`);
      }
      console.log('');
    }
  }

  if (skipped.length > 0) {
    console.log('--- Routes non auditées (metadata dynamique ou absente) ---');
    for (const r of skipped.sort((a, b) => a.path.localeCompare(b.path))) {
      console.log(`  ${r.path} — ${r.skipped}`);
    }
  }

  writeFileSync(
    'scripts/check-meta-report.json',
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        rules: { titleMax: TITLE_MAX, descMin: DESC_MIN, descMax: DESC_MAX },
        flagged: flagged.map((r) => ({
          path: r.path,
          file: r.file,
          title: r.title,
          titleLen: r.titleLen,
          description: r.description,
          descLen: r.descLen,
          issues: r.issues.map((i) => i.message),
        })),
        skippedCount: skipped.length,
      },
      null,
      2,
    ),
  );
  console.log('\nRapport JSON → scripts/check-meta-report.json');

  if (flagged.length > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
