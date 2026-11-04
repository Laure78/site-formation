import { RESSOURCES_HUB_SPOTLIGHT_IDS } from '@/lib/ressources-catalog';
import {
  getGuidesLibraryEntries,
  type GuideLibraryFilterId,
  type RessourceGuideEntry,
} from '@/lib/ressources-guides';

function guideIdFromHref(href: string): string {
  return href
    .replace(/^\/ressources\//, '')
    .replace(/^\//, '')
    .replace(/\//g, '-');
}

/** Trois guides « à la une » — ordre stable du hub. */
export function getHubFeaturedGuides(): readonly RessourceGuideEntry[] {
  const guides = getGuidesLibraryEntries();
  const picked: RessourceGuideEntry[] = [];
  for (const id of RESSOURCES_HUB_SPOTLIGHT_IDS) {
    const guide = guides.find((g) => guideIdFromHref(g.href) === id);
    if (guide) picked.push(guide);
  }
  return picked;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim();
}

/** Recherche hub — titres, promesses, audience, catégories, highlights. */
export function matchesGuideHubSearch(guide: RessourceGuideEntry, rawQuery: string): boolean {
  const q = normalizeText(rawQuery);
  if (!q) return true;
  const haystack = normalizeText(
    [
      guide.title,
      guide.promise,
      guide.description,
      guide.audience,
      guide.categoryLabel,
      ...guide.highlights,
      ...guide.categories,
    ].join(' '),
  );
  return q.split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}

export function filterGuidesHub(
  guides: readonly RessourceGuideEntry[],
  options: {
    category: GuideLibraryFilterId | 'tous';
    query: string;
  },
): readonly RessourceGuideEntry[] {
  let list = guides;
  if (options.category !== 'tous') {
    const category = options.category;
    list = list.filter((g) => g.categories.includes(category));
  }
  if (options.query.trim()) {
    list = list.filter((g) => matchesGuideHubSearch(g, options.query));
  }
  return list;
}
