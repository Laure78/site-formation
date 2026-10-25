/**
 * Écrit public/llms.txt depuis lib/llms-txt-content.ts.
 */
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

execSync(
  `npx tsx -e "import { writeFileSync } from 'fs'; import { buildLlmsTxtContent } from './lib/llms-txt-content.ts'; writeFileSync('public/llms.txt', buildLlmsTxtContent(), 'utf8');"`,
  { cwd: projectRoot, stdio: 'inherit' },
);

console.log('[llms:sync] public/llms.txt mis à jour');
