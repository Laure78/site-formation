/**
 * Grille catalogue `/formations` — lignes et compteur (SSR + client).
 */
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { CatalogueComplementaryEntry } from '@/lib/catalogue-thematiques-btp';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';
import {
  filterAvailableFormationsIaEntries,
  filterComplementaryFormationsIaEntries,
  countVisibleFormationsIaCatalogue,
} from '@/lib/catalogue-formations-ia-filter';

export type CatalogueGridRow =
  | { kind: 'ia'; key: string; entry: FormationCatalogueEntry; upcoming?: boolean }
  | { kind: 'complementary'; key: string; item: CatalogueComplementaryEntry };

export function buildFormationsCatalogueGridRows(
  availableEntries: readonly FormationCatalogueEntry[],
  upcomingEntries: readonly FormationCatalogueEntry[],
  filters: FormationsIaFilterParams,
): CatalogueGridRow[] {
  const filteredAvailable = filterAvailableFormationsIaEntries(availableEntries, filters);
  const filteredUpcoming = filterAvailableFormationsIaEntries(upcomingEntries, filters);
  const filteredComplementary = filterComplementaryFormationsIaEntries(filters);

  const rows: CatalogueGridRow[] = [];
  for (const entry of filteredAvailable) {
    rows.push({ kind: 'ia', key: entry.ref, entry });
  }
  for (const entry of filteredUpcoming) {
    rows.push({ kind: 'ia', key: `${entry.ref}-upcoming`, entry, upcoming: true });
  }
  for (const item of filteredComplementary) {
    rows.push({ kind: 'complementary', key: item.id, item });
  }
  return rows;
}

/** Nombre d’entrées visibles dans la grille (filtres appliqués). */
export function countFormationsCatalogueGridResults(
  availableEntries: readonly FormationCatalogueEntry[],
  upcomingEntries: readonly FormationCatalogueEntry[],
  filters: FormationsIaFilterParams,
): number {
  return countVisibleFormationsIaCatalogue(availableEntries, upcomingEntries, filters);
}

/** Libellé unique pour le compteur catalogue (évite des chiffres codés en dur). */
export function formatFormationsCatalogueGridCount(count: number): string {
  if (count === 0) return 'Aucun résultat';
  if (count === 1) return '1 résultat affiché';
  return `${count} résultats affichés`;
}
