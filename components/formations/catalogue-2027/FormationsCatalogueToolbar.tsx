'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CatalogueSearchFilters } from '@/components/formations/catalogue-2027/CatalogueSearchFilters';
import {
  buildFormationsCataloguePageHref,
  parseFormationsCataloguePageFilters,
  type FormationsCataloguePageFilters,
} from '@/lib/catalogue-filter-url';

export function FormationsCatalogueToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFormationsCataloguePageFilters(searchParams),
    [searchParams],
  );

  const pushFilters = (next: FormationsCataloguePageFilters) => {
    if (pathname !== '/formations') return;
    router.replace(buildFormationsCataloguePageHref(next), { scroll: false });
  };

  const applyFilterChange = (next: Partial<FormationsCataloguePageFilters>) => {
    const merged: FormationsCataloguePageFilters = { ...filters, ...next };
    const clearIfUndefined = (
      key: keyof FormationsCataloguePageFilters,
    ) => {
      if (key in next && next[key] === undefined) {
        delete merged[key];
      }
    };
    clearIfUndefined('niveau');
    clearIfUndefined('duree');
    clearIfUndefined('thematique');
    clearIfUndefined('metier');
    clearIfUndefined('disponibilite');
    clearIfUndefined('q');
    clearIfUndefined('segment');
    pushFilters(merged);
  };

  return (
    <CatalogueSearchFilters filters={filters} onChange={applyFilterChange} />
  );
}
