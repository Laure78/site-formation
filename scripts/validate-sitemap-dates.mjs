/**
 * Échoue si > 20 % des URL du sitemap partagent la même date lastModified.
 * Usage : node scripts/validate-sitemap-dates.mjs (après generate-sitemap-dates).
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runner = path.join(projectRoot, 'scripts/validate-sitemap-dates-run.ts');

const raw = execFileSync(
  process.execPath,
  [path.join(projectRoot, 'node_modules/tsx/dist/cli.mjs'), runner],
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
