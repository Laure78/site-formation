/**
 * Contrôles bloquants — `public/llms.txt` (aligné sur `lib/llms-txt-content.ts`).
 * Usage : `node scripts/assert-llms-txt.mjs`
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const llmsPath = path.join(projectRoot, 'public/llms.txt');

const FORBIDDEN = ['Guyancourt', '4,85', '1 592', 'conductrice', '100 %'];

const content = readFileSync(llmsPath, 'utf8');

for (const term of FORBIDDEN) {
  assert.equal(
    content.includes(term),
    false,
    `public/llms.txt ne doit pas contenir « ${term} »`,
  );
}

const expected = execSync(
  `npx tsx -e "import { buildLlmsTxtContent } from './lib/llms-txt-content.ts'; process.stdout.write(buildLlmsTxtContent());"`,
  { cwd: projectRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
);

assert.equal(
  content,
  expected,
  'public/llms.txt désynchronisé — exécuter npm run llms:sync',
);

console.log('assert-llms-txt : OK');
