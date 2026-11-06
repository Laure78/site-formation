'use client';

import { FormationsCatalogueNiveauPillFilters } from '@/components/formations/catalogue-2027/FormationsCatalogueNiveauPillFilters';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

/** Filtres catalogue — pills par niveau maquette (Toutes / Débutant / Avancé / Approfondi). */
export function CatalogueSearchFilters({ filters, onChange }: Props) {
  return <FormationsCatalogueNiveauPillFilters filters={filters} onChange={onChange} />;
}
