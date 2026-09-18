'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  CATALOGUE_MENU_LABELS,
  type CatalogueBesoinOption,
} from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueCard } from '@/components/formations/catalogue/FormationsCatalogueCard';
import { FormationsBesoinSelector } from '@/components/formations/catalogue/FormationsBesoinSelector';

type Props = {
  formations: FormationCatalogueEntry[];
  besoinOptions: readonly CatalogueBesoinOption[];
};

/** Sélecteur + grille — formations catalogue publiques (dont développement web IA). */
export function FormationsCatalogueMainSection({ formations, besoinOptions }: Props) {
  const [, startTransition] = useTransition();
  const [activeBesoinId, setActiveBesoinId] = useState<CatalogueBesoinOption['id'] | null>(null);
  const [highlightedRefs, setHighlightedRefs] = useState<readonly string[]>([]);

  const onSelectBesoin = useCallback(
    (id: CatalogueBesoinOption['id'] | null, targetRefs: readonly string[]) => {
      startTransition(() => {
        setActiveBesoinId(id);
        setHighlightedRefs(targetRefs);
      });
    },
    [],
  );

  const core = useMemo(
    () =>
      formations.map((f) => ({
        ...f,
        title: CATALOGUE_MENU_LABELS[f.ref] ?? f.title,
      })),
    [formations],
  );

  const isFiltered = highlightedRefs.length > 0;

  return (
    <>
      <FormationsBesoinSelector
        options={besoinOptions}
        activeBesoinId={activeBesoinId}
        onSelectBesoin={onSelectBesoin}
      />

      <section className="mt-14 scroll-mt-24" aria-labelledby="catalogue-formations-liste">
        <h2 id="catalogue-formations-liste" className="ofc-type-h2 text-ofc-ink text-balance">
          Nos formations
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted md:text-base">
          Formations IA pour le BTP (Qualiopi) et création avec l’IA sans savoir coder.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {core.map((entry) => (
            <FormationsCatalogueCard
              key={entry.ref}
              entry={entry}
              highlighted={highlightedRefs.includes(entry.ref)}
              dimmed={isFiltered && !highlightedRefs.includes(entry.ref)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
