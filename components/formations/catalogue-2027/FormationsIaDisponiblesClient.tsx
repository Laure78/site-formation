'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ComplementaryCatalogueRow,
  FormationCatalogueRow,
} from '@/components/formations/catalogue-2027/FormationCatalogueRow';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { FormationNiveau } from '@/data/formations';
import { METIERS_CATALOGUE_2027, type MetierId } from '@/data/catalogue-2027';
import {
  buildFormationsIaHref,
  parseFormationsIaFilters,
} from '@/lib/catalogue-filter-url';
import {
  CATALOGUE_COMPLEMENTARY_ENTRIES,
  CATALOGUE_PREREQUIS_NIVEAU_NOTE,
  CATALOGUE_THEMATIQUES,
  FORMATION_METIERS,
  FORMATION_THEMATIQUE_PRINCIPALE,
  type CatalogueThematiqueId,
} from '@/lib/catalogue-thematiques-btp';
import { getFormationNiveauIaDefinition } from '@/lib/formations-niveaux-ia';
import { getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';

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
  return true;
}

function complementaryMatches(
  item: (typeof CATALOGUE_COMPLEMENTARY_ENTRIES)[number],
  filters: ReturnType<typeof parseFormationsIaFilters>,
): boolean {
  if (filters.niveau) return false;
  if (filters.thematique && item.thematique !== filters.thematique) return false;
  if (filters.metier && !item.metiers.includes(filters.metier as MetierId)) return false;
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
    if (!filters.niveau && !filters.thematique && !filters.metier) return;
    const el = document.getElementById('catalogue-formations');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filters.metier, filters.niveau, filters.thematique, pathname]);

  const setFilters = (next: Partial<typeof filters>) => {
    router.replace(buildFormationsIaHref({ ...filters, ...next }), { scroll: false });
  };

  const reset = () => {
    router.replace('/formations#catalogue-formations', { scroll: false });
  };

  const toggleNiveau = (niveau: FormationNiveau) => {
    setFilters({ niveau: filters.niveau === niveau ? undefined : niveau });
  };

  const toggleThematique = (thematique: CatalogueThematiqueId) => {
    setFilters({
      thematique: filters.thematique === thematique ? undefined : thematique,
    });
  };

  const toggleMetier = (metier: MetierId) => {
    setFilters({ metier: filters.metier === metier ? undefined : metier });
  };

  const niveaux: FormationNiveau[] = [1, 2, 3];

  return (
    <>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {niveaux.map((n) => {
          const def = getFormationNiveauIaDefinition(n);
          const active = filters.niveau === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => toggleNiveau(n)}
              aria-pressed={active}
              className={`rounded-xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                active
                  ? 'border-[#377CF3] bg-[#377CF3]/10 ring-1 ring-[#377CF3]/30'
                  : 'border-[#E2E8F0] bg-white hover:border-[#377CF3]/40'
              }`}
            >
              <span className="font-display text-sm font-bold text-ofc-ink">
                {def.labelComplet}
              </span>
              <span className="mt-1 block text-sm font-semibold text-ofc-accent">
                {def.accrocheNiveau}
              </span>
              <span className="mt-2 block text-xs leading-relaxed text-ofc-ink-muted">
                {def.descriptionMenu} · {def.accueilDuree}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-ofc-ink-muted">{CATALOGUE_PREREQUIS_NIVEAU_NOTE}</p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par thématique">
        {CATALOGUE_THEMATIQUES.map((t) => {
          const active = filters.thematique === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => toggleThematique(t.id)}
              aria-pressed={active}
              className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                active
                  ? 'border-[#377CF3] bg-[#377CF3] text-white'
                  : 'border-[#CBD5E1] bg-white text-ofc-ink hover:border-[#377CF3]'
              }`}
            >
              {t.title}
            </button>
          );
        })}
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrer par métier"
      >
        {METIERS_CATALOGUE_2027.map((m) => {
          const active = filters.metier === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleMetier(m.id)}
              aria-pressed={active}
              className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                active
                  ? 'border-[#377CF3] bg-[#377CF3]/10 text-[#2563EB]'
                  : 'border-[#CBD5E1] bg-white text-ofc-ink hover:border-[#377CF3]/40'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-ofc-ink-muted" aria-live="polite">
          {totalVisible} formation{totalVisible > 1 ? 's' : ''} affichée
          {totalVisible > 1 ? 's' : ''}
        </p>
        {filters.niveau || filters.thematique || filters.metier ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-10 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink"
          >
            Réinitialiser
          </button>
        ) : null}
      </div>

      {totalVisible === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="text-base text-ofc-ink-muted">
            Aucune formation ne correspond à ces critères. Modifiez vos filtres ou{' '}
            <Link href={LINKS.contact} className="font-semibold text-ofc-accent hover:underline">
              contactez-nous pour être conseillé
            </Link>
            .
          </p>
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
