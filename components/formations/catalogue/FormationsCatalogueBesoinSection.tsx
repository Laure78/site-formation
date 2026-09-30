'use client';

import type { CatalogueBesoinOption } from '@/lib/formations-catalogue-page-config';
import { FormationsBesoinSelector } from '@/components/formations/catalogue/FormationsBesoinSelector';
import { useFormationsCatalogueBesoin } from '@/components/formations/catalogue/FormationsCatalogueBesoinContext';

type Props = {
  options: readonly CatalogueBesoinOption[];
};

/** Sélecteur par besoin — en bas de page catalogue (après le contenu principal). */
export function FormationsCatalogueBesoinSection({ options }: Props) {
  const { activeBesoinId, onSelectBesoin } = useFormationsCatalogueBesoin();

  return (
    <div className="mt-16 border-t border-slate-200 pt-16">
      <FormationsBesoinSelector
        options={options}
        activeBesoinId={activeBesoinId}
        onSelectBesoin={onSelectBesoin}
        placement="bottom"
      />
    </div>
  );
}
