/** Limite SERP Google — meta description (caractères affichés, espaces inclus). */
export const META_DESCRIPTION_MAX = 160;

/** Limite recommandée — balise title HTML. */
export const META_TITLE_MAX = 65;

/** Au moins une de ces expressions doit figurer dans les meta descriptions des pages clés. */
export const META_DESCRIPTION_SEO_PHRASES = [
  'formation IA pour le BTP',
  'formation IA appliquée au bâtiment',
  'formation IA pour les pro du BTP',
  'ChatGPT BTP',
] as const;

/**
 * Tronque proprement une meta description (mot entier, ellipse si besoin).
 */
export function clampMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;

  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, max - 1);
  return `${cut.replace(/[,;:.\s-]+$/u, '')}…`;
}

/**
 * Construit une meta description ≤ 160 car. (phrase SEO incluse si absente du texte source).
 */
export function buildMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const base = text.replace(/\s+/g, ' ').trim();
  const hasSeoPhrase = META_DESCRIPTION_SEO_PHRASES.some((p) =>
    base.toLowerCase().includes(p.toLowerCase()),
  );
  const withSeo = hasSeoPhrase ? base : `${base} Formation IA pour le BTP.`;
  return clampMetaDescription(withSeo, max);
}

/** Meta description géo département — villes courtes (ex. « Versailles, SQY »). */
export function buildDeptMetaDescription(
  departementNom: string,
  deptCode: string,
  villesCourtes: string,
): string {
  return buildMetaDescription(
    `Formation IA pour le BTP en ${departementNom} (${deptCode}) : ${villesCourtes}. Qualiopi, Constructys, présentiel.`,
  );
}
