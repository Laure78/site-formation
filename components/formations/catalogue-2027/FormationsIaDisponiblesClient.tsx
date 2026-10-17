'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  ComplementaryCatalogueRow,
  FormationCatalogueRow,
} from '@/components/formations/catalogue-2027/FormationCatalogueRow';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { MetierId } from '@/data/catalogue-2027';
import {
  buildFormationsIaHref,
  parseFormationsIaFilters,
} from '@/lib/catalogue-filter-url';
import {
  CATALOGUE_COMPLEMENTARY_ENTRIES,
  CATALOGUE_THEMATIQUES,
  FORMATION_METIERS,
  FORMATION_THEMATIQUE_PRINCIPALE,
} from '@/lib/catalogue-thematiques-btp';
import { getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import {
  complementaryEntryMatchesSearchQuery,
  formationRefMatchesSearchQuery,
} from '@/lib/catalogue-formation-text-search';

type Props = {
  entries: readonly FormationCatalogueEntry[];
};

function entryMatchesFilters(
  ref: string,
  filters: ReturnType<typeof parseFormationsIaFilters>,
): boolean {
  const f = getFormationByCode(ref);
  if (!f) return false;
  if (filters.niveau && f.niveau !== filters.niveau) return false;
  if (filters.metier) {
    const metiers = FORMATION_METIERS[ref as keyof typeof FORMATION_METIERS];
    if (!metiers?.includes(filters.metier as MetierId)) return false;
  }
  if (filters.thematique) {
    const th =
      FORMATION_THEMATIQUE_PRINCIPALE[ref as keyof typeof FORMATION_THEMATIQUE_PRINCIPALE];
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

export function FormationsIaDisponiblesClient({ entries }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFormationsIaFilters(searchParams),
    [searchParams],
  );

  const [query, setQuery] = useState(filters.q ?? '');

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

  const filteredQualiopi = useMemo(
    () => entries.filter((e) => entryMatchesFilters(e.ref, filters)),
    [entries, filters],
  );

  const filteredComplementary = useMemo(
    () => CATALOGUE_COMPLEMENTARY_ENTRIES.filter((c) => complementaryMatches(c, filters)),
    [filters],
  );

  const totalVisible = filteredQualiopi.length + filteredComplementary.length;

  const rubriquesVisibles = useMemo(() => {
    return CATALOGUE_THEMATIQUES.map((rubrique) => {
      const qualiopi = filteredQualiopi
        .filter(
          (e) =>
            FORMATION_THEMATIQUE_PRINCIPALE[
              e.ref as keyof typeof FORMATION_THEMATIQUE_PRINCIPALE
            ] === rubrique.id,
        )
        .sort((a, b) => {
          const na = getFormationByCode(a.ref)?.niveau ?? 2;
          const nb = getFormationByCode(b.ref)?.niveau ?? 2;
          if (na !== nb) return na - nb;
          return a.ref.localeCompare(b.ref, 'fr');
        });
      const complement = filteredComplementary.filter((c) => c.thematique === rubrique.id);
      return { rubrique, qualiopi, complement };
    }).filter((g) => g.qualiopi.length > 0 || g.complement.length > 0);
  }, [filteredQualiopi, filteredComplementary]);

  useEffect(() => {
    if (pathname !== '/formations') return;
    if (!filters.niveau && !filters.thematique && !filters.metier && !filters.q) return;
    const el = document.getElementById('catalogue-formations');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filters.metier, filters.niveau, filters.thematique, filters.q, pathname]);

  const reset = () => {
    setQuery('');
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

  const hasActiveFilters =
    Boolean(filters.niveau || filters.thematique || filters.metier || filters.q);

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
            Rechercher une formation IA BTP
          </label>
          <input
            id="catalogue-formations-search"
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : devis, appels d’offres, chantier, ChatGPT, Claude…"
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

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-ofc-ink-muted" aria-live="polite">
          {totalVisible} formation{totalVisible > 1 ? 's' : ''} affichée
          {totalVisible > 1 ? 's' : ''}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-10 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink"
          >
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="text-base text-ofc-ink-muted">
            Aucune formation ne correspond à ces critères
            {filters.q ? (
              <>
                {' '}
                pour « <span className="font-medium text-ofc-ink">{filters.q}</span> »
              </>
            ) : null}
            . Modifiez votre recherche, élargissez les filtres ou{' '}
            <Link href={LINKS.contact} className="font-semibold text-ofc-accent hover:underline">
              contactez-nous pour être conseillé
            </Link>
            .
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40"
            >
              Effacer la recherche et les filtres
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {rubriquesVisibles.map(({ rubrique, qualiopi, complement }) => (
            <section
              key={rubrique.id}
              id={`catalogue-thematique-${rubrique.id}`}
              className="scroll-mt-28"
              aria-labelledby={`thematique-${rubrique.id}-title`}
            >
              <h3
                id={`thematique-${rubrique.id}-title`}
                className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
              >
                {rubrique.title}
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-ofc-ink-muted md:text-base">
                {rubrique.description}
              </p>
              <ul className="mt-6 rounded-xl border border-[#E2E8F0] bg-white px-4 md:px-6">
                {qualiopi.map((entry) => (
                  <FormationCatalogueRow key={entry.ref} entry={entry} />
                ))}
                {complement.map((c) => (
                  <ComplementaryCatalogueRow
                    key={c.id}
                    title={c.title}
                    promesse={c.promesse}
                    href={c.href}
                    dureeLabel={c.dureeLabel}
                    disponibiliteLabel={c.disponibiliteLabel}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
