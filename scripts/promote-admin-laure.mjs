/**
 * Raccourci : promotion admin pour contact@laureolivie.fr
 *
 * Équivalent à :
 *   node --env-file=.env.local scripts/promote-admin-email.mjs --name 'Laure Olivié' contact@laureolivie.fr
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const childArgs = [
  path.join(dir, 'promote-admin-email.mjs'),
  '--name',
  'Laure Olivié',
  'contact@laureolivie.fr',
  ...process.argv.slice(2),
];

const result = spawnSync(process.execPath, childArgs, {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? 1);
