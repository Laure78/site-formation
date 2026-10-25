/**
 * Échoue si > 20 % des URL du sitemap partagent la même date lastModified.
 * Usage : node scripts/validate-sitemap-dates.mjs (après generate-sitemap-dates).
 */
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const raw = execSync(
  `npx tsx -e "
import sitemap from './app/sitemap.ts';
const entries = await sitemap();
const byDay = new Map();
for (const e of entries) {
  const d = e.lastModified instanceof Date ? e.lastModified.toISOString().slice(0, 10) : String(e.lastModified).slice(0, 10);
  byDay.set(d, (byDay.get(d) ?? 0) + 1);
}
const total = entries.length;
const sorted = [...byDay.entries()].sort((a,b)=>b[1]-a[1]);
const [topDay, topCount] = sorted[0] ?? ['', 0];
const ratio = total ? topCount / total : 0;
console.log(JSON.stringify({ total, topDay, topCount, ratio, distribution: Object.fromEntries(sorted.slice(0, 5)) }));
if (ratio > 0.2) process.exit(1);
"`,
  { cwd: projectRoot, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 },
);

const summary = JSON.parse(raw.trim().split('\n').pop());
console.log('[validate-sitemap-dates]', summary);
if (summary.ratio > 0.2) {
  console.error(
    `[validate-sitemap-dates] Échec : ${summary.topCount}/${summary.total} URL (${(summary.ratio * 100).toFixed(1)} %) ont la date ${summary.topDay} (> 20 %).`,
  );
  process.exit(1);
}
