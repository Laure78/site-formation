'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormationsCatalogueGridCard } from '@/components/formations/catalogue/FormationsCatalogueGridCard';
import { FormationsCatalogueComplementaryCard } from '@/components/formations/catalogue/FormationsCatalogueComplementaryCard';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { parseFormationsIaFilters } from '@/lib/catalogue-filter-url';
import {
  filterAvailableFormationsIaEntries,
  filterComplementaryFormationsIaEntries,
  countVisibleFormationsIaCatalogue,
  formationsIaHasActiveFilters,
} from '@/lib/catalogue-formations-ia-filter';

type Props = {
  availableEntries: readonly FormationCatalogueEntry[];
  upcomingEntries: readonly FormationCatalogueEntry[];
};

export function FormationsCatalogueFilteredGrid({
  availableEntries,
  upcomingEntries,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFormationsIaFilters(searchParams),
    [searchParams],
  );

  const filteredAvailable = useMemo(
    () => filterAvailableFormationsIaEntries(availableEntries, filters),
    [availableEntries, filters],
  );
  const filteredUpcoming = useMemo(
    () => filterAvailableFormationsIaEntries(upcomingEntries, filters),
    [upcomingEntries, filters],
  );
  const filteredComplementary = useMemo(
    () => filterComplementaryFormationsIaEntries(filters),
    [filters],
  );
  const totalVisible = useMemo(
    () =>
      countVisibleFormationsIaCatalogue(availableEntries, upcomingEntries, filters),
    [availableEntries, upcomingEntries, filters],
  );
  const hasActiveFilters = formationsIaHasActiveFilters(filters);

  const resetFilters = () => {
    router.replace('/formations#catalogue-formations', { scroll: false });
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-ofc-ink-muted" aria-live="polite">
          {totalVisible === 1
            ? '1 formation affichée'
            : `${totalVisible} formations affichées`}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-10 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="text-base font-medium text-ofc-ink">
            Aucune formation ne correspond à vos critères.
          </p>
          <p className="mt-2 text-sm text-ofc-ink-muted">
            Modifiez vos critères ou réinitialisez les filtres.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            >
              Réinitialiser les filtres
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {filteredAvailable.length > 0 ? (
            <section aria-labelledby="catalogue-disponibles-title">
              <h3
                id="catalogue-disponibles-title"
                className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
              >
                Formations disponibles
              </h3>
              <ul className="mt-6 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredAvailable.map((entry) => (
                  <li key={entry.ref} className="min-w-0">
                    <FormationsCatalogueGridCard entry={entry} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {filteredUpcoming.length > 0 ? (
            <section aria-labelledby="catalogue-a-venir-title">
              <h3
                id="catalogue-a-venir-title"
                className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
              >
                Formations à venir
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-ofc-ink-muted">
                Programmes dont l’ouverture est programmée — contactez-nous pour être informé ou
                réserver une session intra.
              </p>
              <ul className="mt-6 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredUpcoming.map((entry) => (
                  <li key={entry.ref} className="min-w-0">
                    <FormationsCatalogueGridCard entry={entry} upcoming />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {filteredComplementary.length > 0 ? (
            <section aria-labelledby="catalogue-autres-metiers-title">
              <h3
                id="catalogue-autres-metiers-title"
                className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
              >
                Autres formations métiers BTP
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-ofc-ink-muted">
                Programmes complémentaires sur mesure — pages dédiées par métier, distinctes des
                sessions catalogue Qualiopi ci-dessus.
              </p>
              <ul className="mt-6 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredComplementary.map((item) => (
                  <li key={item.id} className="min-w-0">
                    <FormationsCatalogueComplementaryCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </>
  );
}
