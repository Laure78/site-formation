'use client';

import { useMemo, useState } from 'react';
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

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const pushFilters = (next: FormationsCataloguePageFilters) => {
    if (pathname !== '/formations') return;
    router.replace(buildFormationsCataloguePageHref(next), { scroll: false });
  };

  const applyFilterChange = (next: Partial<FormationsCataloguePageFilters>) => {
    pushFilters({
      ...filters,
      ...next,
    });
  };

  return (
    <CatalogueSearchFilters
      filters={filters}
      onChange={applyFilterChange}
      mobileOpen={mobileFiltersOpen}
      onMobileOpenChange={setMobileFiltersOpen}
    />
  );
}
