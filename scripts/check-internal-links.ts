/**
 * Vérifie la cohérence ancre ↔ title des liens blog internes.
 *
 * Scope : liens vers `/blog/[slug]` (articles), dans les objets
 * `{ href, title|titre|label }` et les liens Markdown `[ancre](/blog/…)`.
 *
 * Usage : `npx tsx scripts/check-internal-links.ts`
 * Exit 1 si incohérence.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import matter from 'gray-matter';

type Issue = {
  file: string;
  href: string;
  anchor: string;
  expectedTitle: string;
};

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'lib', 'content'];

function walk(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === 'dist') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|mdx|md)$/.test(name)) acc.push(p);
  }
  return acc;
}

function normalizeAnchorText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, "'")
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(s: string): string[] {
  return normalizeAnchorText(s)
    .replace(/-/g, ' ')
    .replace(/\bh\/semaine\b/g, 'h semaine')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^(l|d|qu|n|s|c|j|m|t)'/, ''))
    .filter((t) => t.length >= 2);
}

/** Radical approximatif FR (suffisant pour analyser/automatiser/gagner…). */
function stemFr(t: string): string {
  let s = t;
  if (s.endsWith('ation') && s.length > 7) return s.slice(0, -5); // formation → form… rough
  if (s.endsWith('ement') && s.length > 8) s = s.slice(0, -5);
  if (s.endsWith('er') && s.length > 4) s = s.slice(0, -2);
  else if (s.endsWith('es') && s.length > 4) s = s.slice(0, -2);
  else if (s.endsWith('e') && s.length > 4) s = s.slice(0, -1);
  return s;
}

function anchorMatchesTitle(anchor: string, title: string): boolean {
  const a = normalizeAnchorText(anchor);
  const t = normalizeAnchorText(title);
  if (!a || !t) return false;
  if (a === t) return true;
  const a2 = a.replace(/(\d)\s+h\b/g, '$1h');
  const t2 = t.replace(/(\d)\s+h\b/g, '$1h');
  if (a2 === t2) return true;
  if (t2.startsWith(a2) && a2.length >= 28) return true;
  if (a2.startsWith(t2) && t2.length >= 28) return true;
  if ((a2.includes(t2) || t2.includes(a2)) && Math.min(a2.length, t2.length) >= 32) {
    return true;
  }

  const at = tokens(anchor).map(stemFr);
  const tt = tokens(title).map(stemFr);
  if (at.length < 2 || tt.length < 2) return false;
  const setT = new Set(tt);
  const overlap = at.filter((x) => setT.has(x)).length;
  const strong = at.filter((x) => x.length >= 3 && !['les', 'des', 'une', 'aux', 'pour', 'avec', 'dans', 'sur', 'par'].includes(x));
  if (strong.length >= 2 && strong.every((x) => setT.has(x))) return true;
  return overlap / tt.length >= 0.55 && overlap >= 3;
}

function unquote(raw: string): string {
  return raw.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
}

/** Extrait slug → title depuis lib/blog.ts. */
function extractTitlesFromBlogTs(source: string): Map<string, string> {
  const map = new Map<string, string>();
  const blocks = source.split(/\{\s*\n\s*slug:\s*/);
  for (const block of blocks.slice(1)) {
    const slugM = block.match(/^['"]([^'"]+)['"]/);
    if (!slugM) continue;
    const slug = slugM[1];
    const titleConcat = block.match(
      /\btitle:\s*\n\s*'([^']*)'\s*,?\s*\n\s*'([^']*)'/,
    );
    let title = '';
    if (titleConcat) {
      title = `${titleConcat[1]}${titleConcat[2]}`;
    } else {
      const titleSimple = block.match(
        /\btitle:\s*(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)")/,
      );
      if (titleSimple) title = unquote(titleSimple[1] ?? titleSimple[2] ?? '');
    }
    if (slug && title) map.set(`/blog/${slug}`, title);
  }
  return map;
}

function extractTitlesFromMdxDir(dir: string): Map<string, string> {
  const map = new Map<string, string>();
  if (!existsSync(dir)) return map;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.mdx')) continue;
    const raw = readFileSync(join(dir, name), 'utf8');
    try {
      const { data } = matter(raw);
      const slug =
        typeof data.slug === 'string' ? data.slug : name.replace(/\.mdx$/, '');
      const title = typeof data.title === 'string' ? data.title : '';
      if (slug && title) map.set(`/blog/${slug}`, title);
    } catch {
      /* ignore */
    }
  }
  return map;
}

function loadLinksMap(): Record<string, string> {
  const source = readFileSync(join(ROOT, 'lib/internal-links.ts'), 'utf8');
  const out: Record<string, string> = {};
  const re = /(\w+)\s*:\s*'(\/[^']*)'/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) out[m[1]] = m[2];
  return out;
}

function buildTitleMap(): Map<string, string> {
  const map = new Map<string, string>();
  const blogTs = readFileSync(join(ROOT, 'lib/blog.ts'), 'utf8');
  for (const [k, v] of extractTitlesFromBlogTs(blogTs)) map.set(k, v);
  for (const [k, v] of extractTitlesFromMdxDir(join(ROOT, 'content/blog'))) {
    map.set(k, v);
  }
  return map;
}

function isBlogArticlePath(href: string): boolean {
  return /^\/blog\/[a-z0-9][a-z0-9-]+$/i.test(href);
}

function resolveHref(raw: string, linksByKey: Record<string, string>): string | null {
  const lit = raw.match(/^['"`](\/[^'"`]+)['"`]$/);
  if (lit) return lit[1].split(/[?#]/)[0];
  const link = raw.match(/^LINKS\.(\w+)$/);
  if (link && linksByKey[link[1]]) return linksByKey[link[1]].split(/[?#]/)[0];
  return null;
}

/**
 * Parcourt les littéraux d’objets `{ … }` de profondeur 1 contenant
 * un href blog + un champ title|titre|label.
 */
function extractObjectPairs(
  source: string,
  linksByKey: Record<string, string>,
): Array<{ anchor: string; href: string }> {
  const out: Array<{ anchor: string; href: string }> = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        const block = source.slice(start, i + 1);
        // Un seul niveau : ignorer les blocs trop gros (composants)
        if (block.length < 1200) {
          const hrefM = block.match(/(?:href|to)\s*:\s*(LINKS\.\w+|['"`]\/[^'"`]+['"`])/);
          const titleM = block.match(
            /(?:title|titre|label)\s*:\s*(?:\n\s*)?(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)"|`([^`]*)`)/,
          );
          if (hrefM && titleM) {
            const href = resolveHref(hrefM[1], linksByKey);
            const anchor = unquote(titleM[1] ?? titleM[2] ?? titleM[3] ?? '');
            if (href && isBlogArticlePath(href) && anchor) {
              out.push({ href, anchor });
            }
          }
        }
        start = -1;
      }
    }
  }
  return out;
}

function extractMarkdownBlogLinks(
  source: string,
): Array<{ anchor: string; href: string }> {
  const out: Array<{ anchor: string; href: string }> = [];
  const md = /\[([^\]]+)\]\((\/blog\/[^)\s#?]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = md.exec(source)) !== null) {
    const href = m[2].split(/[?#]/)[0];
    if (!isBlogArticlePath(href)) continue;
    out.push({ anchor: m[1].trim(), href });
  }
  return out;
}

function main(): void {
  const titleByPath = buildTitleMap();
  const linksByKey = loadLinksMap();
  const issues: Issue[] = [];

  const cr = titleByPath.get('/blog/compte-rendu-chantier-ia-automatiser-gagner-temps');
  const five = titleByPath.get('/blog/5-cas-usage-chatgpt-artisans-btp');
  if (!cr || !five) {
    console.error('ÉCHEC — titres blog CR / 5 cas introuvables.');
    process.exit(1);
  }

  const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
  for (const file of files) {
    if (file.includes('/content/generated/')) continue;
    const source = readFileSync(file, 'utf8');
    const rel = relative(ROOT, file);
    const pairs = [
      ...extractObjectPairs(source, linksByKey),
      ...extractMarkdownBlogLinks(source),
    ];

    for (const { anchor, href } of pairs) {
      // Ancres intentionnellement courtes / contextuelles (pas un titre de page)
      if (anchor.length < 20) continue;
      if (
        /^(article|tuto|guide|voir|lire|méthode|landing|cas d)/i.test(anchor) &&
        anchor.length < 36
      ) {
        continue;
      }
      const expected = titleByPath.get(href);
      if (!expected) continue;
      if (anchorMatchesTitle(anchor, expected)) continue;
      issues.push({ file: rel, href, anchor, expectedTitle: expected });
    }
  }

  const seen = new Set<string>();
  const unique = issues.filter((i) => {
    const k = `${i.file}|${i.href}|${i.anchor}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // Toujours afficher le cas CR vs 5-cas s’il reste une collision câblée
  const collision = unique.filter(
    (i) =>
      (i.href === '/blog/5-cas-usage-chatgpt-artisans-btp' &&
        /compte[- ]?rendu/i.test(i.anchor)) ||
      (i.href === '/blog/compte-rendu-chantier-ia-automatiser-gagner-temps' &&
        /5 cas/i.test(i.anchor)),
  );

  if (unique.length === 0) {
    console.log(
      `OK — check-internal-links (${titleByPath.size} articles, 0 incohérence ancre/title).`,
    );
    process.exit(0);
  }

  console.error(`ÉCHEC — ${unique.length} incohérence(s) ancre ↔ title blog :\n`);
  for (const i of unique) {
    const flag = collision.includes(i) ? ' [COLLISION CR↔5 cas]' : '';
    console.error(`- ${i.file}${flag}`);
    console.error(`  href     : ${i.href}`);
    console.error(`  ancre    : « ${i.anchor} »`);
    console.error(`  attendu  : « ${i.expectedTitle} »\n`);
  }
  process.exit(1);
}

main();
