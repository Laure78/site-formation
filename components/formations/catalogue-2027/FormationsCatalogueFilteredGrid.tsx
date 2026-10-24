'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormationsCatalogueGridCard } from '@/components/formations/catalogue/FormationsCatalogueGridCard';
import { FormationsCatalogueComplementaryCard } from '@/components/formations/catalogue/FormationsCatalogueComplementaryCard';
import { FormationsCatalogueModuleGridCard } from '@/components/formations/catalogue-2027/FormationsCatalogueModuleGridCard';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { parseFormationsIaFilters } from '@/lib/catalogue-filter-url';
import {
  filterAvailableFormationsIaEntries,
  filterComplementaryFormationsIaEntries,
  formationsIaHasActiveFilters,
} from '@/lib/catalogue-formations-ia-filter';
import { filterCatalogueModules } from '@/lib/catalogue-2027/search-modules';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { HEADER_PRIMARY_CTA_HREF } from '@/lib/header-cta';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const PAGE_SIZE = 12;

type Props = {
  availableEntries: readonly FormationCatalogueEntry[];
  upcomingEntries: readonly FormationCatalogueEntry[];
};

function matchesDisponibiliteIa(
  ref: string,
  upcoming: boolean,
  filter: 'disponible' | 'ouverture-2027' | undefined,
): boolean {
  if (!filter) return true;
  if (filter === 'ouverture-2027') return upcoming;
  return !upcoming;
}

export function FormationsCatalogueFilteredGrid(props: Props) {
  const searchParams = useSearchParams();
  return (
    <FormationsCatalogueFilteredGridInner
      key={searchParams.toString()}
      {...props}
    />
  );
}

function FormationsCatalogueFilteredGridInner({
  availableEntries,
  upcomingEntries,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFormationsIaFilters(searchParams),
    [searchParams],
  );

  const vue = filters.vue ?? 'tout';
  const showIa = vue === 'ia' || vue === 'tout';
  const showModules = vue === 'modules' || vue === 'tout';

  const filteredAvailable = useMemo(
    () =>
      showIa
        ? filterAvailableFormationsIaEntries(availableEntries, filters).filter((e) =>
            matchesDisponibiliteIa(e.ref, false, filters.disponibilite),
          )
        : [],
    [availableEntries, filters, showIa],
  );
  const filteredUpcoming = useMemo(
    () =>
      showIa
        ? filterAvailableFormationsIaEntries(upcomingEntries, filters).filter((e) =>
            matchesDisponibiliteIa(e.ref, true, filters.disponibilite),
          )
        : [],
    [upcomingEntries, filters, showIa],
  );
  const filteredComplementary = useMemo(
    () => (showIa ? filterComplementaryFormationsIaEntries(filters) : []),
    [filters, showIa],
  );

  const filteredModules = useMemo(() => {
    if (!showModules) return [];
    return filterCatalogueModules({
      query: filters.q,
      domaineId: filters.domaine ?? 'all',
      metierId: filters.metier ?? 'all',
      disponibilite: filters.disponibilite ?? 'all',
      dureeHeures: filters.duree ?? 'all',
    });
  }, [filters, showModules]);

  const totalVisible =
    filteredAvailable.length +
    filteredUpcoming.length +
    filteredComplementary.length +
    filteredModules.length;

  const hasActiveFilters = formationsIaHasActiveFilters(filters);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allItems = useMemo(() => {
    type Row =
      | { kind: 'ia'; key: string; entry: FormationCatalogueEntry; upcoming?: boolean }
      | { kind: 'complementary'; key: string; item: (typeof filteredComplementary)[number] }
      | { kind: 'module'; key: string; module: (typeof filteredModules)[number] };

    const rows: Row[] = [];
    for (const entry of filteredAvailable) {
      rows.push({ kind: 'ia', key: entry.ref, entry });
    }
    for (const entry of filteredUpcoming) {
      rows.push({ kind: 'ia', key: `${entry.ref}-upcoming`, entry, upcoming: true });
    }
    for (const item of filteredComplementary) {
      rows.push({ kind: 'complementary', key: item.id, item });
    }
    for (const mod of filteredModules) {
      rows.push({ kind: 'module', key: mod.code, module: mod });
    }
    return rows;
  }, [filteredAvailable, filteredUpcoming, filteredComplementary, filteredModules]);

  const visibleRows = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  const resetFilters = () => {
    router.replace('/formations#catalogue-formations', { scroll: false });
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-ofc-ink-muted" aria-live="polite">
          {totalVisible === 1
            ? '1 résultat affiché'
            : `${totalVisible} résultats affichés`}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="text-base font-medium text-ofc-ink">Aucune formation ne correspond à vos critères.</p>
          <p className="mt-2 text-sm text-ofc-ink-muted">
            Élargissez la recherche, réinitialisez les filtres ou échangez avec Laure pour cadrer votre
            besoin.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-11 items-center rounded-lg border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40"
              >
                Réinitialiser les filtres
              </button>
            ) : null}
            <Link
              href={`${HEADER_PRIMARY_CTA_HREF}?src=catalogue-vide`}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold`}
            >
              Échanger avec Laure
            </Link>
            <Link
              href={catalogueDemandeHref({ formationOuParcours: 'Catalogue formations', nature: 'devis' })}
              className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold text-[#377CF3] underline"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleRows.map((row) => (
              <li key={row.key} className="min-w-0">
                {row.kind === 'ia' ? (
                  <FormationsCatalogueGridCard entry={row.entry} upcoming={row.upcoming} />
                ) : row.kind === 'complementary' ? (
                  <FormationsCatalogueComplementaryCard item={row.item} />
                ) : (
                  <FormationsCatalogueModuleGridCard module={row.module} />
                )}
              </li>
            ))}
          </ul>

          {hasMore ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="inline-flex min-h-11 items-center rounded-lg border border-[#CBD5E1] bg-white px-6 py-2.5 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                Voir plus ({allItems.length - visibleCount} restants)
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
