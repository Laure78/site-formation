'use client';

import { CatalogueDureePillFilters } from '@/components/formations/catalogue-2027/CatalogueDureePillFilters';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

/** Filtres catalogue — pills niveau (desktop + mobile). */
export function CatalogueSearchFilters({ filters, onChange }: Props) {
  return <CatalogueDureePillFilters filters={filters} onChange={onChange} />;
}
