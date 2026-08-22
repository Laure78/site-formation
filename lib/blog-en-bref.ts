import type { BlogArticle } from '@/lib/blog';

/** Normalise le frontmatter `enBref` (string ou string[]). */
export function normalizeEnBref(value?: string | string[] | null): string[] | null {
  if (value == null) return null;
  const items = (Array.isArray(value) ? value : [value])
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length ? items : null;
}

/** « En bref » — frontmatter MDX/JSON ou section legacy titre « En bref ». */
export function resolveArticleEnBref(article: Pick<BlogArticle, 'enBref' | 'sections'>): string[] | null {
  const fromField = normalizeEnBref(article.enBref);
  if (fromField) return fromField;

  const section = article.sections.find(
    (s) => s.type === 'list' && s.title?.trim().toLowerCase() === 'en bref',
  );
  if (!section || !Array.isArray(section.content)) return null;

  return normalizeEnBref(section.content.filter((x): x is string => typeof x === 'string'));
}

/** Retire la section liste « En bref » du corps si affichée sous le H1. */
export function filterArticleSectionsForDisplay(
  sections: BlogArticle['sections'],
  enBrefUnderH1: string[] | null,
): BlogArticle['sections'] {
  if (!enBrefUnderH1?.length) return sections;
  return sections.filter(
    (s) => !(s.type === 'list' && s.title?.trim().toLowerCase() === 'en bref'),
  );
}
