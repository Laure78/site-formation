import { basename, dirname } from 'node:path';

/** Chemins jamais notifiables IndexNow. */
const BLOCKED_PATH_PREFIXES = [
  '/api/',
  '/admin/',
  '/acces-admin',
  '/espace-apprenant/',
  '/auth/',
  '/invitation/',
  '/messages',
  '/questionnaire/',
  '/_next/',
] as const;

const BLOCKED_EXACT = new Set([
  '/merci-rdv',
  '/outils/verification-dtu-bework',
  '/ressources/guide-conducteur-de-travaux/merci',
]);

/**
 * Dérive des chemins publics depuis des fichiers modifiés (git diff).
 * Heuristique conservative — une URL par fichier page/contenu identifiable.
 */
export function routesFromChangedFiles(files: readonly string[]): string[] {
  const paths = new Set<string>();

  for (const raw of files) {
    const file = raw.replace(/\\/g, '/');

    const blogMdx = file.match(/^content\/blog\/([^/]+)\.mdx$/);
    if (blogMdx) {
      paths.add(`/blog/${blogMdx[1]}`);
      continue;
    }

    const appPage = file.match(/^app\/(.+\/)?page\.tsx$/);
    if (appPage) {
      const segment = appPage[1]?.replace(/\/$/, '') ?? '';
      if (segment.includes('[') || segment.includes(']')) {
        // Routes dynamiques : pas d’URL sans slug connu
        if (segment.startsWith('blog/')) paths.add('/blog');
        else if (segment.startsWith('formations/')) paths.add('/formations');
        else if (segment.startsWith('ressources/')) paths.add('/ressources');
        continue;
      }
      if (!segment || segment === 'page.tsx') {
        paths.add('/');
      } else {
        paths.add(`/${segment}`);
      }
      continue;
    }

    const appLayout = file.match(/^app\/(.+\/)?layout\.tsx$/);
    if (appLayout) {
      const segment = appLayout[1]?.replace(/\/$/, '') ?? '';
      if (!segment) continue;
      if (segment.includes('[')) continue;
      paths.add(`/${segment}`);
      continue;
    }

    if (file === 'lib/formation-catalogue-visibility.ts' || file.startsWith('data/formations')) {
      paths.add('/formations');
    }
    if (file.startsWith('lib/blog') || file.startsWith('content/blog/')) {
      paths.add('/blog');
    }
    if (file.startsWith('lib/tutos') || file.startsWith('lib/ressources')) {
      paths.add('/ressources');
    }
    if (file === 'lib/sitemap-public-routes.ts' || file === 'lib/internal-links.ts') {
      // Changement global — ne pas spammer ; l’opérateur lance une soumission ciblée
      continue;
    }

    const tutoData = file.match(/^lib\/tutos[^/]*\.ts$/);
    if (tutoData) {
      paths.add('/ressources/tutos');
    }

    const mdxSlug = file.match(/\/([^/]+)\.mdx$/);
    if (mdxDataPath(file) && mdxSlug) {
      paths.add(`/ressources/${mdxSlug[1]}`);
    }
  }

  return [...paths].sort();
}

function mdxDataPath(file: string): boolean {
  return file.startsWith('content/') || file.includes('/ressources/');
}

/** Normalise une URL absolue pour IndexNow. Retourne null si invalide. */
export function normalizeIndexNowUrl(
  input: string,
  origin = 'https://www.laureolivie.fr',
): string | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }

  if (url.protocol !== 'https:') return null;
  if (url.hostname !== 'www.laureolivie.fr') return null;
  if (url.username || url.password) return null;
  if (url.hash) return null;

  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith('utm_') || key.toLowerCase() === 'fbclid') {
      url.searchParams.delete(key);
    }
  }

  let path = url.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/' && path.endsWith('/')) {
    path = path.replace(/\/+$/, '');
  }

  if (BLOCKED_EXACT.has(path)) return null;
  if (BLOCKED_PATH_PREFIXES.some((p) => path.startsWith(p))) return null;
  if (/\.(js|css|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|pdf|xml|txt|map)$/i.test(path)) {
    return null;
  }

  const normalized = `${origin}${path === '/' ? '' : path}`;
  return normalized.replace(/\/$/, '') || origin;
}

export function pathToAbsoluteUrl(path: string, origin = 'https://www.laureolivie.fr'): string | null {
  const p = path.startsWith('/') ? path : `/${path}`;
  return normalizeIndexNowUrl(`${origin}${p}`, origin);
}

export function dedupeValidIndexNowUrls(urls: readonly string[]): string[] {
  const out = new Set<string>();
  for (const raw of urls) {
    const n = normalizeIndexNowUrl(raw);
    if (n) out.add(n);
  }
  return [...out].sort();
}

/** Nom de fichier → slug ressource (utilitaire tests). */
export function slugFromContentPath(filePath: string): string | null {
  const base = basename(filePath).replace(/\.mdx$/, '');
  if (!base || base === 'page') return null;
  const dir = dirname(filePath.replace(/\\/g, '/'));
  if (dir.includes('blog')) return `/blog/${base}`;
  if (dir.includes('ressources')) return `/ressources/${base}`;
  return null;
}
