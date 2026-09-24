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

  // Séparer les formations par niveau
  const formationsNiveau1 = useMemo(
    () => core.filter((f) => f.ref === 'NIV-01'),
    [core],
  );

  const formationsNiveau2 = useMemo(
    () => core.filter((f) => f.ref !== 'NIV-01'),
    [core],
  );

  const isFiltered = highlightedRefs.length > 0;

  return (
    <>
      <FormationsBesoinSelector
        options={besoinOptions}
        activeBesoinId={activeBesoinId}
        onSelectBesoin={onSelectBesoin}
      />

      <div className="mt-14 space-y-16">
        {/* Niveau 1 — Débutant */}
        {formationsNiveau1.length > 0 && (
          <section className="scroll-mt-24" aria-labelledby="catalogue-niveau-1">
            <div className="mb-6 border-b border-ofc-blue/20 pb-3">
              <h2 id="catalogue-niveau-1" className="ofc-type-h2 text-ofc-ink">
                Niveau 1 — Débutant
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
                Découvrir l'intelligence artificielle et ses applications concrètes dans le BTP.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {formationsNiveau1.map((entry) => (
                <FormationsCatalogueCard
                  key={entry.ref}
                  entry={entry}
                  highlighted={highlightedRefs.includes(entry.ref)}
                  dimmed={isFiltered && !highlightedRefs.includes(entry.ref)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Niveau 2 — Intermédiaire */}
        {formationsNiveau2.length > 0 && (
          <section className="scroll-mt-24" aria-labelledby="catalogue-niveau-2">
            <div className="mb-6 border-b border-ofc-blue/20 pb-3">
              <h2 id="catalogue-niveau-2" className="ofc-type-h2 text-ofc-ink">
                Niveau 2 — Intermédiaire
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
                Formations métier spécialisées et déploiement d'outils IA dans votre entreprise.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {formationsNiveau2.map((entry) => (
                <FormationsCatalogueCard
                  key={entry.ref}
                  entry={entry}
                  highlighted={highlightedRefs.includes(entry.ref)}
                  dimmed={isFiltered && !highlightedRefs.includes(entry.ref)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
