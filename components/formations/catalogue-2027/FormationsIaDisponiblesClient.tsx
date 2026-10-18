'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { FormationsCatalogueGridCard } from '@/components/formations/catalogue/FormationsCatalogueGridCard';
import { FormationsCatalogueComplementaryCard } from '@/components/formations/catalogue/FormationsCatalogueComplementaryCard';
import { CatalogueSearchFilters } from '@/components/formations/catalogue-2027/CatalogueSearchFilters';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { MetierId } from '@/data/catalogue-2027';
import {
  buildFormationsIaHref,
  parseFormationsIaFilters,
} from '@/lib/catalogue-filter-url';
import {
  CATALOGUE_COMPLEMENTARY_ENTRIES,
  CATALOGUE_THEMATIQUE_IDS,
  FORMATION_METIERS,
  FORMATION_THEMATIQUE_PRINCIPALE,
  type CatalogueThematiqueId,
} from '@/lib/catalogue-thematiques-btp';
import { getFormationByCode } from '@/data/formations';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  complementaryEntryMatchesSearchQuery,
  formationRefMatchesSearchQuery,
} from '@/lib/catalogue-formation-text-search';

type Props = {
  availableEntries: readonly FormationCatalogueEntry[];
  upcomingEntries: readonly FormationCatalogueEntry[];
};

function entryMatchesFilters(
  ref: string,
  filters: ReturnType<typeof parseFormationsIaFilters>,
): boolean {
  const f = getFormationByCode(ref);
  if (!f) return false;
  if (filters.niveau && f.niveau !== filters.niveau) return false;
  if (filters.metier) {
    const metiers = FORMATION_METIERS[ref as FormationCatalogueCode];
    if (!metiers?.includes(filters.metier as MetierId)) return false;
  }
  if (filters.thematique) {
    const th = FORMATION_THEMATIQUE_PRINCIPALE[ref as FormationCatalogueCode];
    if (th !== filters.thematique) return false;
  }
  if (filters.q && !formationRefMatchesSearchQuery(ref, filters.q)) return false;
  return true;
}

function complementaryMatches(
  item: (typeof CATALOGUE_COMPLEMENTARY_ENTRIES)[number],
  filters: ReturnType<typeof parseFormationsIaFilters>,
): boolean {
  if (filters.niveau) return false;
  if (filters.thematique && item.thematique !== filters.thematique) return false;
  if (filters.metier && !item.metiers.includes(filters.metier as MetierId)) return false;
  if (filters.q && !complementaryEntryMatchesSearchQuery(item, filters.q)) return false;
  return true;
}

function collectMetierOptions(refs: string[]): MetierId[] {
  const set = new Set<MetierId>();
  for (const ref of refs) {
    for (const id of FORMATION_METIERS[ref as FormationCatalogueCode] ?? []) {
      set.add(id);
    }
  }
  for (const c of CATALOGUE_COMPLEMENTARY_ENTRIES) {
    for (const id of c.metiers) set.add(id);
  }
  return [...set];
}

function collectThematiqueOptions(refs: string[]): CatalogueThematiqueId[] {
  const set = new Set<CatalogueThematiqueId>();
  for (const ref of refs) {
    const th = FORMATION_THEMATIQUE_PRINCIPALE[ref as FormationCatalogueCode];
    if (th) set.add(th);
  }
  for (const c of CATALOGUE_COMPLEMENTARY_ENTRIES) {
    set.add(c.thematique);
  }
  return CATALOGUE_THEMATIQUE_IDS.filter((id) => set.has(id));
}

export function FormationsIaDisponiblesClient({ availableEntries, upcomingEntries }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFormationsIaFilters(searchParams),
    [searchParams],
  );

  const [query, setQuery] = useState(filters.q ?? '');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(filters.q ?? '');
  }, [filters.q]);

  useEffect(() => {
    if (pathname !== '/formations') return;
    const target = buildFormationsIaHref({
      ...filters,
      q: query.trim() || undefined,
    });
    const targetPath = target.split('#')[0] ?? target;
    const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    if (targetPath !== currentPath) {
      router.replace(target, { scroll: false });
    }
  }, [query, filters, pathname, router, searchParams]);

  const allRefs = useMemo(
    () => [
      ...availableEntries.map((e) => e.ref),
      ...upcomingEntries.map((e) => e.ref),
    ],
    [availableEntries, upcomingEntries],
  );

  const metierOptions = useMemo(() => collectMetierOptions(allRefs), [allRefs]);
  const thematiqueOptions = useMemo(() => collectThematiqueOptions(allRefs), [allRefs]);

  const filteredAvailable = useMemo(
    () => availableEntries.filter((e) => entryMatchesFilters(e.ref, filters)),
    [availableEntries, filters],
  );

  const filteredUpcoming = useMemo(
    () => upcomingEntries.filter((e) => entryMatchesFilters(e.ref, filters)),
    [upcomingEntries, filters],
  );

  const filteredComplementary = useMemo(
    () => CATALOGUE_COMPLEMENTARY_ENTRIES.filter((c) => complementaryMatches(c, filters)),
    [filters],
  );

  const totalVisible =
    filteredAvailable.length + filteredUpcoming.length + filteredComplementary.length;

  const hasActiveFilters = Boolean(
    filters.niveau || filters.thematique || filters.metier || filters.q,
  );

  const applyFilterChange = (next: Partial<typeof filters>) => {
    router.replace(
      buildFormationsIaHref({
        ...filters,
        ...next,
        q: query.trim() || undefined,
      }),
      { scroll: false },
    );
  };

  const reset = () => {
    setQuery('');
    setMobileFiltersOpen(false);
    router.replace('/formations#catalogue-formations', { scroll: false });
  };

  const submitSearch = () => {
    router.replace(
      buildFormationsIaHref({
        ...filters,
        q: query.trim() || undefined,
      }),
      { scroll: false },
    );
  };

  useEffect(() => {
    if (pathname !== '/formations') return;
    if (!hasActiveFilters) return;
    const el = document.getElementById('catalogue-formations');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filters.metier, filters.niveau, filters.thematique, filters.q, hasActiveFilters, pathname]);

  return (
    <>
      <form
        role="search"
        className="mt-8 max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }}
      >
        <div className="relative flex items-center rounded-full border border-[#E2E8F0] bg-white pl-4 pr-1.5">
          <label htmlFor="catalogue-formations-search" className="sr-only">
            Rechercher une formation, un métier ou un sujet
          </label>
          <input
            id="catalogue-formations-search"
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une formation, un métier ou un sujet…"
            autoComplete="off"
            className="min-h-11 flex-1 border-0 bg-transparent py-2.5 pr-2 text-sm text-ofc-ink placeholder:text-ofc-ink-muted/80 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ofc-accent text-white hover:bg-ofc-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            aria-label="Lancer la recherche"
          >
            <Search className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </form>

      <CatalogueSearchFilters
        filters={filters}
        metierOptions={metierOptions}
        thematiqueOptions={thematiqueOptions}
        onChange={applyFilterChange}
        mobileOpen={mobileFiltersOpen}
        onMobileOpenChange={setMobileFiltersOpen}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-ofc-ink-muted" aria-live="polite">
          {totalVisible === 1
            ? '1 formation affichée'
            : `${totalVisible} formations affichées`}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-10 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            Réinitialiser
          </button>
        ) : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="text-base text-ofc-ink-muted">
            Aucune formation ne correspond à votre recherche. Essayez un autre mot-clé ou
            réinitialisez les filtres.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={reset}
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
              <h3 id="catalogue-disponibles-title" className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
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
              <h3 id="catalogue-a-venir-title" className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
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
