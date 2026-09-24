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

type NiveauFilter = 'all' | 'niveau-1' | 'niveau-2';

const NIVEAU_TABS: { id: NiveauFilter; label: string }[] = [
  { id: 'all', label: 'Toutes les formations' },
  { id: 'niveau-1', label: 'Niveau 1' },
  { id: 'niveau-2', label: 'Niveau 2' },
];

/** Sélecteur + filtre niveau + grille — formations catalogue publiques. */
export function FormationsCatalogueMainSection({ formations, besoinOptions }: Props) {
  const [, startTransition] = useTransition();
  const [activeBesoinId, setActiveBesoinId] = useState<CatalogueBesoinOption['id'] | null>(null);
  const [highlightedRefs, setHighlightedRefs] = useState<readonly string[]>([]);
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('all');

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

  const formationsNiveau1 = useMemo(
    () => core.filter((f) => f.ref === 'NIV-01'),
    [core],
  );

  const formationsNiveau2 = useMemo(
    () => core.filter((f) => f.ref !== 'NIV-01'),
    [core],
  );

  const isFiltered = highlightedRefs.length > 0;

  const showNiveau1 = niveauFilter === 'all' || niveauFilter === 'niveau-1';
  const showNiveau2 = niveauFilter === 'all' || niveauFilter === 'niveau-2';

  return (
    <>
      <FormationsBesoinSelector
        options={besoinOptions}
        activeBesoinId={activeBesoinId}
        onSelectBesoin={onSelectBesoin}
      />

      {/* Parcours niveaux — bloc visuel + filtre */}
      <div className="mt-14" id="catalogue-niveaux">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Niveau 1</p>
            <p className="mt-1 font-display text-base font-bold text-ofc-ink">
              Découvrir et prendre en main l&apos;IA
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Pour comprendre les fondamentaux et utiliser l&apos;IA dans ses premières tâches professionnelles.
            </p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Niveau 2</p>
            <p className="mt-1 font-display text-base font-bold text-ofc-ink">
              Appliquer l&apos;IA à son métier
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Pour utiliser l&apos;IA sur des processus BTP précis : DCE, chantier, maîtrise d&apos;œuvre, assistants IA, Claude ou création d&apos;outils.
            </p>
          </div>
        </div>

        {/* Filtre niveau */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par niveau">
          {NIVEAU_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={niveauFilter === tab.id}
              onClick={() => setNiveauFilter(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                niveauFilter === tab.id
                  ? 'bg-[#377CF3] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-14">
        {/* Niveau 1 */}
        {showNiveau1 && formationsNiveau1.length > 0 && (
          <section className="scroll-mt-24" aria-labelledby="catalogue-niveau-1">
            <h2 id="catalogue-niveau-1" className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
              Niveau 1 — Fondamentaux
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Découvrir l&apos;intelligence artificielle et ses applications concrètes dans le BTP.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

        {/* Niveau 2 */}
        {showNiveau2 && formationsNiveau2.length > 0 && (
          <section className="scroll-mt-24" aria-labelledby="catalogue-niveau-2">
            <h2 id="catalogue-niveau-2" className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
              Niveau 2 — Perfectionnement
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Formations métier spécialisées et déploiement d&apos;outils IA dans votre entreprise.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
