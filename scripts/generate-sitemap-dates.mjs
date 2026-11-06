/**
 * Génère lib/sitemap-dates.generated.json : fichier → date ISO de dernière modification.
 * - Préférence : historique git (vraie date de commit par fichier).
 * - Sans dépôt git (Docker/Railway) : repli sur la date mtime des fichiers sources.
 * Exécuté avant `next build` pour que le sitemap runtime ait des dates cohérentes.
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'lib/sitemap-dates.generated.json');

const PREFIXES = ['app/', 'lib/', 'src/', 'content/', 'config/', 'components/'];

/** Dossiers à ne pas parcourir (artefacts, deps locales rares sous ces préfixes). */
const SKIP_DIR_NAMES = new Set([
  'node_modules',
  '.next',
  'dist',
  'build',
  '.turbo',
  '.git',
]);

/**
 * @param {string} dir — chemin absolu
 * @param {(absPath: string, relKey: string) => void} onFile
 */
function walkSourceFiles(dir, onFile) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (SKIP_DIR_NAMES.has(e.name)) continue;
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkSourceFiles(abs, onFile);
    } else if (e.isFile()) {
      const relKey = path.relative(root, abs).replace(/\\/g, '/');
      onFile(abs, relKey);
    }
  }
}

/** Remplit la carte à partir des mtime — utile en CI sans `.git`. */
function collectMtimeDates() {
  /** @type {Record<string, string>} */
  const out = {};
  for (const prefix of PREFIXES) {
    const base = path.join(root, prefix);
    if (!existsSync(base)) continue;
    walkSourceFiles(base, (abs, relKey) => {
      try {
        const st = statSync(abs);
        out[relKey] = st.mtime.toISOString();
      } catch {
        /* fichier supprimé entre-temps */
      }
    });
  }
  return out;
}

function collectGitDates() {
  /** @type {Record<string, string>} */
  const out = {};
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
  return out;
}

function generate() {
  /** @type {Record<string, string>} */
  let out = {};

  try {
    out = collectGitDates();
  } catch (e) {
    console.warn(
      '[generate-sitemap-dates] git indisponible — repli mtime:',
      e instanceof Error ? e.message : e,
    );
  }

  if (Object.keys(out).length === 0) {
    out = collectMtimeDates();
    console.log(
      `[generate-sitemap-dates] ${Object.keys(out).length} fichiers (mtime, sans git) → ${path.relative(root, outFile)}`,
    );
  } else {
    console.log(
      `[generate-sitemap-dates] ${Object.keys(out).length} fichiers (git) → ${path.relative(root, outFile)}`,
    );
  }

  writeFileSync(outFile, `${JSON.stringify(out)}\n`);
}

generate();
