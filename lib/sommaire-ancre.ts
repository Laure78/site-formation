import GithubSlugger from 'github-slugger';

export type SommaireAncreItem = {
  label: string;
  anchor: string;
};

/** Nombre minimal de H2 pour afficher le sommaire (articles « longs »). */
export const SOMMAIRE_MIN_H2_COUNT = 3;

/**
 * Slug stable — aligné sur `rehype-slug` / GitHub Slugger (ids des H2 MDX).
 * Réutiliser le même slugger pour une série de titres afin de dédupliquer `-1`, `-2`…
 */
export function slugifyHeading(text: string, slugger?: GithubSlugger): string {
  const s = slugger ?? new GithubSlugger();
  return s.slug(text.replace(/\s+#+\s*$/, '').trim());
}

/** Construit le sommaire à partir de libellés H2 (ancres optionnelles pour cas particuliers). */
export function buildSommaireFromHeadings(
  headings: readonly string[],
  anchorOverrides?: Readonly<Record<string, string>>
): SommaireAncreItem[] {
  const slugger = new GithubSlugger();
  return headings.map((label) => ({
    label,
    anchor: anchorOverrides?.[label] ?? slugifyHeading(label, slugger),
  }));
}

/** Extrait les H2 d’un corps MDX/Markdown — ids alignés sur `rehype-slug`. */
export function extractH2SommaireFromMarkdown(markdownBody: string): SommaireAncreItem[] {
  const slugger = new GithubSlugger();
  const items: SommaireAncreItem[] = [];
  for (const line of markdownBody.split('\n')) {
    const m = /^##\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const label = m[1].replace(/\s+#+\s*$/, '').trim();
    items.push({ label, anchor: slugifyHeading(label, slugger) });
  }
  return items;
}

/** Sommaire à partir des titres de sections JSON (`lib/blog`). */
export function buildSommaireFromSectionTitles(
  sections: readonly { title?: string }[],
  anchorOverrides?: Readonly<Record<string, string>>
): SommaireAncreItem[] {
  const slugger = new GithubSlugger();
  const items: SommaireAncreItem[] = [];
  for (const section of sections) {
    if (!section.title?.trim()) continue;
    const label = section.title.trim();
    items.push({
      label,
      anchor: anchorOverrides?.[label] ?? slugifyHeading(label, slugger),
    });
  }
  return items;
}

export function shouldShowSommaireAncre(items: readonly SommaireAncreItem[]): boolean {
  return items.length >= SOMMAIRE_MIN_H2_COUNT;
}

export function sommaireItemsToAnchorMap(
  items: readonly SommaireAncreItem[]
): Record<string, string> {
  return Object.fromEntries(items.map(({ label, anchor }) => [label, anchor]));
}
