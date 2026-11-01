'use client';

import { CatalogueNiveauPillFilters } from '@/components/formations/catalogue-2027/CatalogueNiveauPillFilters';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

/** Filtres catalogue — pills niveau (desktop + mobile). */
export function CatalogueSearchFilters({ filters, onChange }: Props) {
  return <CatalogueNiveauPillFilters filters={filters} onChange={onChange} />;
}
