import type { RessourceCatalogEntry } from '@/lib/ressources-catalog';
import type { RessourceGuideEntry } from '@/lib/ressources-guides';

/** Compteurs affichés sur le hub — dérivés des listes réellement rendues. */
export function getRessourcesHubDisplayCounts(
  guides: readonly RessourceGuideEntry[],
  libraryResources: readonly RessourceCatalogEntry[],
) {
  return {
    guides: guides.length,
    complementary: libraryResources.length,
  } as const;
}
