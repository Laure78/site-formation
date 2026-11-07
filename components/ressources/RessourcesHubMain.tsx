'use client';

import { useId, useMemo, useState, useTransition } from 'react';
import { Search, X } from 'lucide-react';
import { RessourcesGuidesPdfLibrary } from '@/components/ressources/RessourcesGuidesPdfLibrary';
import { RessourcesHubLibrary } from '@/components/ressources/RessourcesHubLibrary';
import type { RessourceCatalogEntry } from '@/lib/ressources-catalog';
import type { RessourceGuideEntry } from '@/lib/ressources-guides';
import { GUIDE_LIBRARY_FILTERS } from '@/lib/ressources-guides';
import type { GuideLibraryFilterId } from '@/lib/ressources-guides';
import { getHubFeaturedGuides } from '@/lib/ressources-hub-utils';

type Props = {
  guides: readonly RessourceGuideEntry[];
  libraryResources: readonly RessourceCatalogEntry[];
  initialSearch?: string;
};

/** Orchestration client hub — recherche transversale, filtres guides et bibliothèque tutos. */
export function RessourcesHubMain({ guides, libraryResources, initialSearch = '' }: Props) {
  const searchInputId = useId();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(
      initialSearch.startsWith('?') ? initialSearch.slice(1) : initialSearch,
    );
    return params.get('q') ?? '';
  });
  const [guideCategory, setGuideCategory] = useState<GuideLibraryFilterId | 'tous'>('tous');

  const featuredGuides = useMemo(() => getHubFeaturedGuides(), []);

  const selectCategory = (id: GuideLibraryFilterId | 'tous') => {
    startTransition(() => setGuideCategory(id));
  };

  return (
    <>
      <section
        aria-label="Recherche et filtres"
        className="border-b border-slate-100 bg-white py-6 md:py-8"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#377CF3] focus-within:ring-2 focus-within:ring-[#377CF3]/20">
            <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
            <label htmlFor={searchInputId} className="sr-only">
              Rechercher une ressource IA BTP
            </label>
            <input
              id={searchInputId}
              type="search"
              value={query}
              onChange={(e) => startTransition(() => setQuery(e.target.value))}
              placeholder="Rechercher : DCE, PPSPS, devis, compte rendu, prompt…"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => startTransition(() => setQuery(''))}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div
            role="group"
            aria-label="Filtrer les guides par métier ou besoin"
            className="mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]"
          >
            {GUIDE_LIBRARY_FILTERS.map((option) => {
              const active = guideCategory === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectCategory(option.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] motion-reduce:transition-none ${
                    active
                      ? 'border-[#377CF3] bg-[#377CF3] text-white shadow-sm'
                      : 'border-slate-200 bg-[#F8FAFC] text-slate-700 hover:border-[#377CF3]/40 hover:text-[#377CF3]'
                  }`}
                >
                  {option.label}
                  {active ? <span className="sr-only"> (filtre actif)</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <RessourcesGuidesPdfLibrary
        guides={guides}
        featuredGuides={featuredGuides}
        hubQuery={query}
        categoryFilter={guideCategory}
        onCategoryFilterChange={(id) => startTransition(() => setGuideCategory(id))}
      />

      <RessourcesHubLibrary
        resources={libraryResources}
        initialSearch={initialSearch}
        hubQuery={query}
        onHubQueryChange={setQuery}
        variant="default"
      />
    </>
  );
}
