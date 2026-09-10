/** Slug fichier sûr, ordre préservé via préfixe numérique externe. */

export function slugify(input: string, maxLen = 80): string {
  const base = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLen)
    .replace(/-+$/g, '');
  return base || 'sans-titre';
}

export function padOrder(n: number, width = 2): string {
  return String(n).padStart(width, '0');
}

/**
 * Retire query/hash potentiellement sensibles d’une URL pour le manifeste.
 * Conserve l’origine + chemin.
 */
export function sanitizeUrlForManifest(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    // Ne pas conserver de jetons dans query/hash
    u.search = '';
    u.hash = '';
    return u.toString();
  } catch {
    // URL relative ou invalide : tronquer les query strings
    return raw.split('?')[0].split('#')[0] || null;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
