'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { ChevronDown, RotateCcw, Search, X } from 'lucide-react';
import { RessourceCard } from '@/components/ressources/RessourceCard';
import type {
  RessourceAudienceId,
  RessourceCatalogEntry,
  RessourceFormatId,
  RessourceNeedId,
} from '@/lib/ressources-catalog';
import {
  RESSOURCE_AUDIENCE_FILTERS,
  RESSOURCE_FORMAT_FILTERS,
  RESSOURCE_NEED_FILTERS,
  RESSOURCES_HUB_INITIAL_VISIBLE,
  RESSOURCES_HUB_LOAD_MORE_STEP,
  scoreRessourceSearch,
} from '@/lib/ressources-catalog';
import { LINKS } from '@/lib/internal-links';
import { RessourcesMaquetteSectionTitle } from '@/components/ressources/RessourcesMaquetteSectionTitle';
import { CtaVisio } from '@/components/CtaVisio';

type Props = {
  resources: readonly RessourceCatalogEntry[];
  initialSearch?: string;
  /** Recherche synchronisée avec le bandeau transversal du hub. */
  hubQuery?: string;
  onHubQueryChange?: (query: string) => void;
  variant?: 'default' | 'dark';
};

type FilterState = {
  query: string;
  needs: Set<RessourceNeedId>;
  formats: Set<RessourceFormatId>;
  audiences: Set<RessourceAudienceId>;
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim();
}

function matchesQuery(resource: RessourceCatalogEntry, query: string): boolean {
  if (!query) return true;
  const haystack = normalizeText(
    [
      resource.title,
      resource.shortDescription,
      resource.topic,
      resource.format,
      ...resource.useCases,
      ...resource.needs,
      ...resource.audiences,
    ].join(' '),
  );
  return query.split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}

function parseUrlFilters(search: string): Partial<FilterState> {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const needs = new Set<RessourceNeedId>();
  const formats = new Set<RessourceFormatId>();
  const audiences = new Set<RessourceAudienceId>();

  for (const id of params.getAll('besoin')) {
    if (RESSOURCE_NEED_FILTERS.some((f) => f.id === id)) needs.add(id as RessourceNeedId);
  }
  for (const id of params.getAll('format')) {
    if (RESSOURCE_FORMAT_FILTERS.some((f) => f.id === id)) formats.add(id as RessourceFormatId);
  }
  for (const id of params.getAll('metier')) {
    if (RESSOURCE_AUDIENCE_FILTERS.some((f) => f.id === id)) audiences.add(id as RessourceAudienceId);
  }

  return {
    query: params.get('q') ?? '',
    needs,
    formats,
    audiences,
  };
}

function buildUrlFromFilters(state: FilterState): string {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set('q', state.query.trim());
  for (const id of state.needs) params.append('besoin', id);
  for (const id of state.formats) params.append('format', id);
  for (const id of state.audiences) params.append('metier', id);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

function FilterGroup<T extends string>({
  legend,
  options,
  selected,
  onToggle,
  collapsedDefault = false,
  tone = 'light',
}: {
  legend: string;
  options: readonly { id: T; label: string }[];
  selected: Set<T>;
  onToggle: (id: T) => void;
  collapsedDefault?: boolean;
  tone?: 'light' | 'dark';
}) {
  const [open, setOpen] = useState(!collapsedDefault);
  const contentId = useId();
  const isDark = tone === 'dark';

  return (
    <fieldset
      className={`rounded-xl border p-4 ${
        isDark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white'
      }`}
    >
      <legend className="sr-only">{legend}</legend>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 text-left md:pointer-events-none"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {legend}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition md:hidden ${open ? 'rotate-180' : ''} ${
            isDark ? 'text-white/70' : 'text-slate-500'
          }`}
          aria-hidden
        />
      </button>
      <div id={contentId} className={`mt-3 flex flex-wrap gap-2 ${open ? '' : 'hidden md:flex'}`}>
        {options.map((option) => {
          const active = selected.has(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.id)}
              className={`min-h-[44px] rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 motion-reduce:transition-none ${
                active
                  ? isDark
                    ? 'bg-[#377CF3] text-white ring-2 ring-[#377CF3] ring-offset-2 ring-offset-[#071D45]'
                    : 'bg-[#377CF3] text-white ring-2 ring-[#377CF3] ring-offset-1'
                  : isDark
                    ? 'border border-white/20 bg-transparent text-white/90 hover:border-white/40 hover:bg-white/10'
                    : 'bg-[#F8FAFC] text-slate-700 hover:bg-[#EFF6FF] hover:text-[#377CF3]'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function RessourcesHubLibrary({
  resources,
  initialSearch = '',
  hubQuery,
  onHubQueryChange,
  variant = 'default',
}: Props) {
  const searchInputId = useId();
  const resultsLiveId = useId();
  const parsedInitial = parseUrlFilters(initialSearch);
  const [, startTransition] = useTransition();

  const [localQuery, setLocalQuery] = useState(parsedInitial.query ?? '');
  const queryControlled = hubQuery !== undefined;
  const query = queryControlled ? hubQuery : localQuery;
  const setQuery = (value: string) => {
    if (queryControlled) onHubQueryChange?.(value);
    else setLocalQuery(value);
  };
  const [needs, setNeeds] = useState<Set<RessourceNeedId>>(parsedInitial.needs ?? new Set());
  const [formats, setFormats] = useState<Set<RessourceFormatId>>(parsedInitial.formats ?? new Set());
  const [audiences, setAudiences] = useState<Set<RessourceAudienceId>>(
    parsedInitial.audiences ?? new Set(),
  );
  const [visibleCount, setVisibleCount] = useState(RESSOURCES_HUB_INITIAL_VISIBLE);
  const skipUrlSync = useRef(true);

  const filterState: FilterState = useMemo(
    () => ({ query, needs, formats, audiences }),
    [query, needs, formats, audiences],
  );

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    const matched = resources.filter((resource) => {
      if (q && !matchesQuery(resource, q)) return false;
      if (needs.size > 0 && !resource.needs.some((n) => needs.has(n))) return false;
      if (formats.size > 0 && !formats.has(resource.resourceType as RessourceFormatId)) return false;
      if (audiences.size > 0 && !resource.audiences.some((a) => audiences.has(a))) return false;
      return true;
    });

    if (!q) {
      return matched.slice().sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return matched
      .map((resource) => ({ resource, score: scoreRessourceSearch(resource, q) }))
      .sort((a, b) => b.score - a.score || a.resource.sortOrder - b.resource.sortOrder)
      .map((item) => item.resource);
  }, [resources, query, needs, formats, audiences]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const syncUrl = useCallback((state: FilterState) => {
    const next = buildUrlFromFilters(state);
    const current = window.location.search;
    const normalizedCurrent = current === '' ? '' : current;
    if (next !== normalizedCurrent) {
      window.history.replaceState(null, '', `${window.location.pathname}${next}`);
    }
  }, []);

  useEffect(() => {
    if (skipUrlSync.current) {
      skipUrlSync.current = false;
      return;
    }
    syncUrl(filterState);
  }, [filterState, syncUrl]);

  useEffect(() => {
    setVisibleCount(RESSOURCES_HUB_INITIAL_VISIBLE);
  }, [query, needs, formats, audiences]);

  const toggleSet = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    startTransition(() => setter(next));
  };

  const resetFilters = () => {
    startTransition(() => {
      setQuery('');
      setNeeds(new Set());
      setFormats(new Set());
      setAudiences(new Set());
    });
  };

  const hasActiveFilters =
    query.trim().length > 0 || needs.size > 0 || formats.size > 0 || audiences.size > 0;

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];
  for (const id of needs) {
    const label = RESSOURCE_NEED_FILTERS.find((f) => f.id === id)?.label ?? id;
    activeChips.push({
      key: `need-${id}`,
      label,
      onRemove: () => toggleSet(needs, id, setNeeds),
    });
  }
  for (const id of formats) {
    const label = RESSOURCE_FORMAT_FILTERS.find((f) => f.id === id)?.label ?? id;
    activeChips.push({
      key: `format-${id}`,
      label,
      onRemove: () => toggleSet(formats, id, setFormats),
    });
  }
  for (const id of audiences) {
    const label = RESSOURCE_AUDIENCE_FILTERS.find((f) => f.id === id)?.label ?? id;
    activeChips.push({
      key: `audience-${id}`,
      label,
      onRemove: () => toggleSet(audiences, id, setAudiences),
    });
  }

  const isDark = variant === 'dark';

  return (
    <section
      id="bibliotheque-ressources"
      aria-labelledby="ressources-library-heading"
      className={`scroll-mt-28 border-t border-slate-100 bg-[#F8FAFC] py-10 md:py-14 ${
        isDark ? 'ressources-hub-tutos' : ''
      }`}
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <RessourcesMaquetteSectionTitle
            id="ressources-library-heading"
            title="Tutoriels, skills et outils"
            description="Tutoriels étape par étape, skills Claude et outils pratiques. Les guides métier complets sont regroupés dans la section « Tous les guides et outils »."
          />
          <span className="inline-flex w-fit items-center rounded-full border border-[#BFDBFE] bg-white px-3 py-1 text-sm font-semibold text-[#377CF3]">
            {resources.length} ressources
          </span>
        </div>

        <div id="recherche-ressources" className="scroll-mt-28 space-y-4">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 focus-within:ring-2 ${
              isDark
                ? 'border-white/20 bg-white/10 focus-within:border-white/40 focus-within:ring-white/20'
                : 'border-slate-200 bg-[#F8FAFC] focus-within:border-[#377CF3] focus-within:ring-[#377CF3]/20'
            }`}
          >
            <Search
              className={`h-5 w-5 shrink-0 ${isDark ? 'text-white/70' : 'text-[#377CF3]'}`}
              aria-hidden
            />
            <label htmlFor={searchInputId} className="sr-only">
              Rechercher une ressource
            </label>
            <input
              id={searchInputId}
              type="search"
              value={query}
              onChange={(e) => startTransition(() => setQuery(e.target.value))}
              placeholder="Rechercher : DCE, PPSPS, compte rendu, devis, prompt…"
              autoComplete="off"
              className={`min-w-0 flex-1 bg-transparent text-base outline-none ${
                isDark
                  ? 'text-white placeholder:text-white/50'
                  : 'text-slate-900 placeholder:text-slate-400'
              }`}
            />
            {query ? (
              <button
                type="button"
                onClick={() => startTransition(() => setQuery(''))}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg ${
                  isDark
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-slate-500 hover:bg-white hover:text-slate-700'
                }`}
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <FilterGroup
              legend="Par besoin"
              options={RESSOURCE_NEED_FILTERS}
              selected={needs}
              onToggle={(id) => toggleSet(needs, id, setNeeds)}
              collapsedDefault
              tone={isDark ? 'dark' : 'light'}
            />
            <FilterGroup
              legend="Par format"
              options={RESSOURCE_FORMAT_FILTERS}
              selected={formats}
              onToggle={(id) => toggleSet(formats, id, setFormats)}
              collapsedDefault
              tone={isDark ? 'dark' : 'light'}
            />
            <FilterGroup
              legend="Par métier"
              options={RESSOURCE_AUDIENCE_FILTERS}
              selected={audiences}
              onToggle={(id) => toggleSet(audiences, id, setAudiences)}
              collapsedDefault
              tone={isDark ? 'dark' : 'light'}
            />
          </div>

          {activeChips.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Filtres actifs">
              {activeChips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3 text-xs font-medium ${
                      isDark
                        ? 'border-white/25 bg-white/10 text-[#BFDBFE]'
                        : 'border-[#377CF3]/30 bg-[#EFF6FF] text-[#377CF3]'
                    }`}
                  >
                    {chip.label}
                    <X className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only">Retirer le filtre {chip.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              id={resultsLiveId}
              className={`text-sm ${isDark ? 'text-white/75' : 'text-slate-600'}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {filtered.length === resources.length
                ? `${resources.length} ressources affichées`
                : `${filtered.length} ressource${filtered.length > 1 ? 's' : ''} sur ${resources.length}`}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#377CF3] ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-[#EFF6FF]'
                }`}
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Tout effacer
              </button>
            ) : null}
          </div>
        </div>

        {/* Liens crawlables hors JS — première vague visible aussi sans filtre */}
        <noscript>
          <ul className="mt-8 grid list-none gap-2 text-sm text-[#377CF3]">
            {resources.map((resource) => (
              <li key={`noscript-${resource.id}`}>
                <a href={resource.viewUrl}>{resource.title}</a>
              </li>
            ))}
          </ul>
        </noscript>

        {filtered.length === 0 ? (
          <div
            className={`mt-10 rounded-2xl border border-dashed px-6 py-12 text-center ${
              isDark
                ? 'border-white/25 bg-white/5'
                : 'border-slate-200 bg-[#F8FAFC]'
            }`}
          >
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Aucune ressource ne correspond à ces critères
            </h3>
            <p className={`mt-2 text-sm ${isDark ? 'text-white/75' : 'text-slate-600'}`}>
              Essayez un autre mot-clé ou réinitialisez les filtres pour afficher toute la bibliothèque.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d66d6]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Réinitialiser les filtres
              </button>
              <Link
                href={LINKS.blog}
                className="inline-flex min-h-[44px] items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#377CF3]/40 hover:text-[#377CF3]"
              >
                Voir le blog
              </Link>
            </div>
            <div className="mt-4 flex justify-center">
              <CtaVisio
                src="cmp-ressources-bibliotheque-empty"
                variant="secondary"
                className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm"
              />
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-8 grid list-none gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((resource) => (
                <li key={resource.id}>
                  <RessourceCard resource={resource} />
                </li>
              ))}
            </ul>
            {hasMore ? (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((n) => n + RESSOURCES_HUB_LOAD_MORE_STEP)
                  }
                  className={`inline-flex min-h-[44px] items-center justify-center rounded-xl border px-6 py-2.5 text-sm font-semibold transition duration-200 motion-reduce:transition-none ${
                    isDark
                      ? 'border-white/25 bg-white/10 text-white hover:bg-white/15'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-[#377CF3]/40 hover:text-[#377CF3]'
                  }`}
                >
                  Voir les {filtered.length} tutoriels ({filtered.length - visibleCount} restantes)
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
