'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { CATALOGUE_MENU_LABELS } from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueCard } from '@/components/formations/catalogue/FormationsCatalogueCard';
import { LINKS } from '@/lib/internal-links';

type Props = {
  formations: FormationCatalogueEntry[];
};

type NiveauFilter = 'all' | 'niveau-1' | 'niveau-2' | 'niveau-3';

const NIVEAU_TABS: { id: NiveauFilter; label: string }[] = [
  { id: 'all', label: 'Toutes les formations' },
  { id: 'niveau-1', label: 'Niveau 1' },
  { id: 'niveau-2', label: 'Niveau 2' },
  { id: 'niveau-3', label: 'Niveau 3' },
];

/** Sélecteur + filtre niveau + grille — formations catalogue publiques. */
export function FormationsCatalogueMainSection({ formations }: Props) {
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('all');

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

  const formationsNiveau3 = useMemo(
    () => core.filter((f) => f.ref === 'NIV-10'),
    [core],
  );

  const formationsNiveau2 = useMemo(
    () => core.filter((f) => f.ref !== 'NIV-01' && f.ref !== 'NIV-10'),
    [core],
  );

  const showNiveau1 = niveauFilter === 'all' || niveauFilter === 'niveau-1';
  const showNiveau2 = niveauFilter === 'all' || niveauFilter === 'niveau-2';
  const showNiveau3 = niveauFilter === 'all' || niveauFilter === 'niveau-3';

  function goToNiveau(filter: NiveauFilter, sectionId: string) {
    setNiveauFilter(filter);
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
  }

  return (
    <>
      {/* Parcours niveaux — cartes cliquables */}
      <div className="mt-0" id="catalogue-niveaux">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={LINKS.formationIaBtpNiveau1BatimentTp}
            className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 text-left transition hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Niveau 1</p>
            <p className="mt-1 font-display text-base font-bold text-ofc-ink">
              Initiation
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Découvrir et utiliser l&apos;IA générative dans les tâches professionnelles du BTP.
            </p>
          </Link>
          <button
            type="button"
            onClick={() => goToNiveau('niveau-2', 'catalogue-niveau-2')}
            className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Niveau 2</p>
            <p className="mt-1 font-display text-base font-bold text-ofc-ink">
              Perfectionnement
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Approfondir l&apos;utilisation de l&apos;IA, créer des assistants personnalisés et
              développer des workflows métier.
            </p>
          </button>
          <button
            type="button"
            onClick={() => goToNiveau('niveau-3', 'catalogue-niveau-3')}
            className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5 text-left transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Niveau 3</p>
            <p className="mt-1 font-display text-base font-bold text-ofc-ink">
              Création et déploiement
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Concevoir, développer, tester et déployer ses propres applications et outils métier
              BTP avec l&apos;IA, sans être développeur.
            </p>
          </button>
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
              Niveau 1 — Initiation
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Découvrir et utiliser l&apos;IA générative dans les tâches professionnelles du BTP.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {formationsNiveau1.map((entry) => (
                <FormationsCatalogueCard key={entry.ref} entry={entry} />
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
              Approfondir l&apos;utilisation de l&apos;IA, créer des assistants personnalisés et
              développer des workflows métier.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {formationsNiveau2.map((entry) => (
                <FormationsCatalogueCard key={entry.ref} entry={entry} />
              ))}
            </div>
          </section>
        )}

        {/* Niveau 3 */}
        {showNiveau3 && formationsNiveau3.length > 0 && (
          <section className="scroll-mt-24" aria-labelledby="catalogue-niveau-3">
            <h2 id="catalogue-niveau-3" className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
              Niveau 3 — Création et déploiement
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Concevoir, développer, tester et déployer ses propres applications et outils métier
              BTP avec l&apos;IA, sans être développeur.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {formationsNiveau3.map((entry) => (
                <FormationsCatalogueCard key={entry.ref} entry={entry} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
