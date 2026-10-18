'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { CatalogueSearchFilters } from '@/components/formations/catalogue-2027/CatalogueSearchFilters';
import type { MetierId } from '@/data/catalogue-2027';
import {
  buildFormationsIaHref,
  parseFormationsIaFilters,
  type FormationsIaFilterParams,
} from '@/lib/catalogue-filter-url';
import type { CatalogueThematiqueId } from '@/lib/catalogue-thematiques-btp';

type Props = {
  metierOptions: MetierId[];
  thematiqueOptions: CatalogueThematiqueId[];
  /** Filtres issus du rendu serveur (URL courante). */
  serverFilters: FormationsIaFilterParams;
};

export function FormationsCatalogueToolbar({
  metierOptions,
  thematiqueOptions,
  serverFilters,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clientFilters = useMemo(
    () => parseFormationsIaFilters(searchParams),
    [searchParams],
  );
  const filters = clientFilters;

  const [query, setQuery] = useState(serverFilters.q ?? '');
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

  const hasActiveFilters = Boolean(
    filters.niveau || filters.thematique || filters.metier || filters.q,
  );

  const applyFilterChange = (next: Partial<FormationsIaFilterParams>) => {
    router.replace(
      buildFormationsIaHref({
        ...filters,
        ...next,
        q: query.trim() || undefined,
      }),
      { scroll: false },
    );
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
    </>
  );
}
