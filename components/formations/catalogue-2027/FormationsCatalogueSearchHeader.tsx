import { Suspense } from 'react';
import { FormationsCatalogueToolbar } from '@/components/formations/catalogue-2027/FormationsCatalogueToolbar';
import { FormationsCatalogueReassuranceLine } from '@/components/formations/catalogue-2027/FormationsCatalogueReassuranceLine';

export function FormationsCatalogueSearchHeader() {
  return (
    <div className="space-y-0">
      <Suspense fallback={null}>
        <FormationsCatalogueToolbar />
      </Suspense>
      <FormationsCatalogueReassuranceLine />
    </div>
  );
}
