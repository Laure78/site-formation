'use client';

import { CatalogueComplementaryFilters } from '@/components/formations/catalogue-2027/CatalogueComplementaryFilters';
import { FormationsCatalogueNiveauPillFilters } from '@/components/formations/catalogue-2027/FormationsCatalogueNiveauPillFilters';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

/** Filtres catalogue — niveau pédagogique + critères combinables (URL synchronisée). */
export function CatalogueSearchFilters({ filters, onChange }: Props) {
  return (
    <div className="space-y-0">
      <FormationsCatalogueNiveauPillFilters filters={filters} onChange={onChange} />
      <CatalogueComplementaryFilters
        key={filters.q ?? 'sans-recherche'}
        filters={filters}
        onChange={onChange}
      />
    </div>
  );
}
