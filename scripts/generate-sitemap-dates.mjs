/**
 * Génère lib/sitemap-dates.generated.json : fichier → date git ISO.
 * Exécuté avant `next build` pour que le sitemap runtime (sans .git) ait les vraies dates de contenu.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'lib/sitemap-dates.generated.json');

const PREFIXES = ['app/', 'lib/', 'src/', 'content/', 'config/', 'components/'];

function generate() {
  /** @type {Record<string, string>} */
  const out = {};
  try {
    const log = execSync("git log --name-only --format='COMMIT %cI'", {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      cwd: root,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let current = null;
    for (const line of log.split('\n')) {
      if (line.startsWith('COMMIT ')) {
        current = line.slice(7).trim();
        continue;
      }
      if (!line || !current || line in out) continue;
      if (!PREFIXES.some((p) => line.startsWith(p))) continue;
      out[line] = current;
    }
  } catch (e) {
    console.warn(
      '[generate-sitemap-dates] git indisponible — fichier vide (repli mtime / fallback au runtime):',
      e instanceof Error ? e.message : e,
    );
  }

  writeFileSync(outFile, `${JSON.stringify(out)}\n`);
  console.log(`[generate-sitemap-dates] ${Object.keys(out).length} fichiers → ${path.relative(root, outFile)}`);
}

generate();
