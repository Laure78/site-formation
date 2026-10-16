import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Racine du dépôt (parent de `lib/`) — fiable en scripts Node, pas toujours après bundling Turbopack. */
const REPO_ROOT_FROM_MODULE = join(dirname(fileURLToPath(import.meta.url)), '..');

const GENERATED_MARKER = join('content', 'generated');

function hasGeneratedArticlesDir(root: string): boolean {
  return existsSync(join(root, GENERATED_MARKER));
}

/**
 * Répertoire de travail pour lire `content/generated`, etc.
 * Turbopack peut placer `process.cwd()` hors du dépôt (lockfile parent) : on remonte et teste les emplacements usuels.
 */
export function getRepoRoot(): string {
  const envRoot = process.env.SITE_REPO_ROOT?.trim();
  if (envRoot && hasGeneratedArticlesDir(envRoot)) {
    return envRoot;
  }

  let dir = process.cwd();
  for (let i = 0; i < 12; i++) {
    if (hasGeneratedArticlesDir(dir)) {
      return dir;
    }
    const nestedCandidates = [
      join(dir, 'site-formation'),
      join(dir, 'Documents', 'site-formation'),
    ];
    for (const nested of nestedCandidates) {
      if (hasGeneratedArticlesDir(nested)) {
        return nested;
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  if (hasGeneratedArticlesDir(REPO_ROOT_FROM_MODULE)) {
    return REPO_ROOT_FROM_MODULE;
  }

  return process.cwd();
}
