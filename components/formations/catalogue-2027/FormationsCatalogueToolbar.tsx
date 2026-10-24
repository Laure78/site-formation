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
};

export function FormationsCatalogueToolbar({
  metierOptions,
  thematiqueOptions,
}: Props) {
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

  const pushFilters = (next: FormationsIaFilterParams) => {
    if (pathname !== '/formations') return;
    router.replace(buildFormationsIaHref(next), { scroll: false });
  };

  const applyFilterChange = (next: Partial<FormationsIaFilterParams>) => {
    pushFilters({
      ...filters,
      ...next,
      q: query.trim() || undefined,
    });
  };

  const submitSearch = () => {
    pushFilters({
      ...filters,
      q: query.trim() || undefined,
    });
  };

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
