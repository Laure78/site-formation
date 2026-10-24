import { Suspense } from 'react';
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '@/lib/catalogue-formation-schedule';
import {
  CATALOGUE_COMPLEMENTARY_ENTRIES,
  CATALOGUE_THEMATIQUE_IDS,
  FORMATION_METIERS,
  FORMATION_THEMATIQUE_PRINCIPALE,
  type CatalogueThematiqueId,
} from '@/lib/catalogue-thematiques-btp';
import type { MetierId } from '@/data/catalogue-2027';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { FormationsCatalogueToolbar } from '@/components/formations/catalogue-2027/FormationsCatalogueToolbar';
import { FormationsCatalogueReassuranceLine } from '@/components/formations/catalogue-2027/FormationsCatalogueReassuranceLine';
import { FormationsCatalogueQuickPills } from '@/components/formations/catalogue-2027/FormationsCatalogueQuickPills';

function collectMetierOptions(refs: string[]): MetierId[] {
  const set = new Set<MetierId>();
  for (const ref of refs) {
    for (const id of FORMATION_METIERS[ref as FormationCatalogueCode] ?? []) {
      set.add(id);
    }
  }
  for (const c of CATALOGUE_COMPLEMENTARY_ENTRIES) {
    for (const id of c.metiers) set.add(id);
  }
  return [...set];
}

function collectThematiqueOptions(refs: string[]): CatalogueThematiqueId[] {
  const set = new Set<CatalogueThematiqueId>();
  for (const ref of refs) {
    const th = FORMATION_THEMATIQUE_PRINCIPALE[ref as FormationCatalogueCode];
    if (th) set.add(th);
  }
  for (const c of CATALOGUE_COMPLEMENTARY_ENTRIES) {
    set.add(c.thematique);
  }
  return CATALOGUE_THEMATIQUE_IDS.filter((id) => set.has(id));
}

export function FormationsCatalogueSearchHeader() {
  const availableEntries = getCataloguePageCoreFormations();
  const upcomingEntries = getUpcomingCatalogueFormationEntries();

  const allRefs = [
    ...availableEntries.map((e) => e.ref),
    ...upcomingEntries.map((e) => e.ref),
  ];
  const metierOptions = collectMetierOptions(allRefs);
  const thematiqueOptions = collectThematiqueOptions(allRefs);

  return (
    <div className="space-y-0">
      <Suspense fallback={null}>
        <FormationsCatalogueToolbar
          metierOptions={metierOptions}
          thematiqueOptions={thematiqueOptions}
        />
      </Suspense>
      <FormationsCatalogueReassuranceLine />
      <FormationsCatalogueQuickPills />
    </div>
  );
}
