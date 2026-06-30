import {
  buildIdfDeptMetaDescription,
  hasSeoGeoSignal,
  SEO_GEO_REGION,
} from '@/lib/seo-geo-keywords';

/** Limite SERP Google — meta description (caractères affichés, espaces inclus). */
export const META_DESCRIPTION_MAX = 160;

/** Limite recommandée — balise title HTML. */
export const META_TITLE_MAX = 65;

/** Au moins une de ces expressions doit figurer dans les meta descriptions des pages clés. */
export const META_DESCRIPTION_SEO_PHRASES = [
  'formation IA pour le BTP',
  'formation IA appliquée au bâtiment',
  'formation IA pour les pro du BTP',
  'formation IA travaux publics',
  'ChatGPT BTP',
] as const;

export function clampMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;

  const window = normalized.slice(0, max);
  const lastPeriod = window.lastIndexOf('.');
  if (lastPeriod >= Math.floor(max * 0.45)) {
    return window.slice(0, lastPeriod + 1).trim();
  }

  const slice = normalized.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, max);
  const trimmed = cut.replace(/[,;:.\s-]+$/u, '').trim();
  return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
}

export function buildMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const base = text.replace(/\s+/g, ' ').trim();
  const hasSeoPhrase = META_DESCRIPTION_SEO_PHRASES.some((p) =>
    base.toLowerCase().includes(p.toLowerCase()),
  );
  const withSeo = hasSeoPhrase ? base : `${base} Formation IA pour le BTP.`;
  return clampMetaDescription(withSeo, max);
}

export function buildDeptMetaDescription(
  departementNom: string,
  deptCode: string,
  villesCourtes: string,
): string {
  return buildMetaDescription(
    buildIdfDeptMetaDescription(departementNom, deptCode, villesCourtes),
  );
}

/** Enrichit description page : phrase SEO obligatoire + ancrage GEO IDF si page formation. */
export function enrichPageDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const withSeo = buildMetaDescription(text, max);
  const lower = withSeo.toLowerCase();
  const isFormationContext =
    lower.includes('btp') ||
    lower.includes('bâtiment') ||
    lower.includes('formation') ||
    lower.includes('chatgpt') ||
    lower.includes('claude') ||
    lower.includes('qualiopi') ||
    lower.includes('constructys') ||
    lower.includes('ia ') ||
    lower.includes('intelligence artificielle');
  if (!isFormationContext || hasSeoGeoSignal(withSeo)) return withSeo;
  const withGeo = `${withSeo.replace(/\.\s*$/, '')}, ${SEO_GEO_REGION}.`;
  return clampMetaDescription(withGeo, max);
}
