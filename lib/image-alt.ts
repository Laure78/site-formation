/**
 * Conventions alt images site laureolivie.fr :
 * - ≤ 125 caractères, décrire ce qu'on voit, 1 mot-clé max intégré naturellement
 * - Interdit : préfixes « image de / photo de » ; queues SEO « — formation IA BTP, Île-de-France »
 * - Images purement décoratives : alt=""
 */

export const PHOTO_ALT_MAX = 125;

export function clampPhotoAlt(text: string, max = PHOTO_ALT_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, max - 1);
  return `${cut.replace(/[,;:\s-]+$/u, '')}…`;
}

/** Alt Open Graph article blog — ne pas recopier le titre seul. */
export function buildBlogArticleOgImageAlt(articleTitle: string): string {
  return clampPhotoAlt(
    `Visuel de l'article « ${articleTitle.trim()} » — blog formation IA pour le BTP, Laure Olivié`,
  );
}

/** Normalise un alt source : retire préfixes interdits et queues SEO automatiques. */
export function normalizePhotoAlt(baseAlt: string): string {
  let out = baseAlt.replace(/\s+/g, ' ').trim();
  out = out.replace(/^(image|photo|illustration) de\s+/i, '');
  out = out.replace(/\s*—\s*formation IA[^.]*$/i, '');
  out = out.replace(/,\s*(Paris et IDF|Paris IDF|Île-de-France|Guyancourt \(78\))$/i, '');
  out = out.replace(/\s*—\s*formation…$/i, '');
  return clampPhotoAlt(out);
}
