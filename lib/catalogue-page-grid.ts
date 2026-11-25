/**
 * Grille catalogue `/formations` — lignes et compteur (SSR + client).
 */
import { getFormationByCode } from '@/data/formations';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { CatalogueComplementaryEntry } from '@/lib/catalogue-thematiques-btp';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';
import {
  filterAvailableFormationsIaEntries,
  filterComplementaryFormationsIaEntries,
  countVisibleFormationsIaCatalogue,
} from '@/lib/catalogue-formations-ia-filter';
import { CATALOGUE_PUBLIC_REFS } from '@/lib/formations-catalogue-page-config';

export type CatalogueGridRow =
  | { kind: 'ia'; key: string; entry: FormationCatalogueEntry; upcoming?: boolean }
  | { kind: 'complementary'; key: string; item: CatalogueComplementaryEntry };

function catalogueRefSortIndex(ref: string): number {
  const index = CATALOGUE_PUBLIC_REFS.indexOf(ref as (typeof CATALOGUE_PUBLIC_REFS)[number]);
  return index === -1 ? 999 : index;
}

/** Tri pédagogique : niveau 1 → 2 → 3, puis ordre catalogue public. */
export function sortCatalogueIaEntries(
  entries: readonly FormationCatalogueEntry[],
): FormationCatalogueEntry[] {
  return [...entries].sort((a, b) => {
    const na = getFormationByCode(a.ref)?.niveau ?? 99;
    const nb = getFormationByCode(b.ref)?.niveau ?? 99;
    if (na !== nb) return na - nb;
    return catalogueRefSortIndex(a.ref) - catalogueRefSortIndex(b.ref);
  });
}

export function buildFormationsCatalogueGridRows(
  availableEntries: readonly FormationCatalogueEntry[],
  upcomingEntries: readonly FormationCatalogueEntry[],
  filters: FormationsIaFilterParams,
): CatalogueGridRow[] {
  let filteredAvailable = filterAvailableFormationsIaEntries(availableEntries, filters);
  let filteredUpcoming = filterAvailableFormationsIaEntries(upcomingEntries, filters);
  const filteredComplementary = filterComplementaryFormationsIaEntries(filters);

  if (filters.disponibilite === 'disponible') {
    filteredUpcoming = [];
  } else if (filters.disponibilite === 'ouverture-2027') {
    filteredAvailable = [];
  }

  filteredAvailable = sortCatalogueIaEntries(filteredAvailable);
  filteredUpcoming = sortCatalogueIaEntries(filteredUpcoming);

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
