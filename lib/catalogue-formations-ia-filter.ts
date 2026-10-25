/**
 * Filtrage catalogue « Formations IA disponibles » — partagé SSR / client.
 */
import { getFormationByCode } from '@/data/formations';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { MetierId } from '@/data/catalogue-2027';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';
import {
  CATALOGUE_COMPLEMENTARY_ENTRIES,
  getCatalogueComplementaryEntriesForCataloguePage,
  FORMATION_METIERS,
  FORMATION_THEMATIQUE_PRINCIPALE,
} from '@/lib/catalogue-thematiques-btp';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  complementaryEntryMatchesSearchQuery,
  formationRefMatchesSearchQuery,
} from '@/lib/catalogue-formation-text-search';

export function formationRefMatchesFormationsIaFilters(
  ref: string,
  filters: FormationsIaFilterParams,
): boolean {
  const f = getFormationByCode(ref);
  if (!f) return false;
  if (filters.niveau && f.niveau !== filters.niveau) return false;
  if (filters.metier) {
    const metiers = FORMATION_METIERS[ref as FormationCatalogueCode];
    if (!metiers?.includes(filters.metier as MetierId)) return false;
  }
  if (filters.thematique) {
    const th = FORMATION_THEMATIQUE_PRINCIPALE[ref as FormationCatalogueCode];
    if (th !== filters.thematique) return false;
  }
  if (filters.q && !formationRefMatchesSearchQuery(ref, filters.q)) return false;
  return true;
}

export function complementaryEntryMatchesFormationsIaFilters(
  item: (typeof CATALOGUE_COMPLEMENTARY_ENTRIES)[number],
  filters: FormationsIaFilterParams,
): boolean {
  if (filters.niveau) return false;
  if (filters.thematique && item.thematique !== filters.thematique) return false;
  if (filters.metier && !item.metiers.includes(filters.metier as MetierId)) return false;
  if (filters.q && !complementaryEntryMatchesSearchQuery(item, filters.q)) return false;
  return true;
}

export function filterAvailableFormationsIaEntries(
  entries: readonly FormationCatalogueEntry[],
  filters: FormationsIaFilterParams,
): FormationCatalogueEntry[] {
  return entries.filter((e) => formationRefMatchesFormationsIaFilters(e.ref, filters));
}

export function filterComplementaryFormationsIaEntries(
  filters: FormationsIaFilterParams,
): (typeof CATALOGUE_COMPLEMENTARY_ENTRIES)[number][] {
  return getCatalogueComplementaryEntriesForCataloguePage().filter((c) =>
    complementaryEntryMatchesFormationsIaFilters(c, filters),
  );
}

export function countVisibleFormationsIaCatalogue(
  available: readonly FormationCatalogueEntry[],
  upcoming: readonly FormationCatalogueEntry[],
  filters: FormationsIaFilterParams,
): number {
  const a = filterAvailableFormationsIaEntries(available, filters).length;
  const u = filterAvailableFormationsIaEntries(upcoming, filters).length;
  const c = filterComplementaryFormationsIaEntries(filters).length;
  return a + u + c;
}

export function formationsIaHasActiveFilters(filters: FormationsIaFilterParams): boolean {
  return Boolean(filters.niveau);
}
