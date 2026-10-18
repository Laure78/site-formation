'use client';

import { useId } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { FormationNiveau } from '@/data/formations';
import { METIERS_CATALOGUE_2027, type MetierId } from '@/data/catalogue-2027';
import {
  CATALOGUE_THEMATIQUES,
  type CatalogueThematiqueId,
} from '@/lib/catalogue-thematiques-btp';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';

type Props = {
  filters: FormationsIaFilterParams;
  metierOptions: readonly MetierId[];
  thematiqueOptions: readonly CatalogueThematiqueId[];
  onChange: (next: Partial<FormationsIaFilterParams>) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

type FilterFieldsProps = Omit<Props, 'mobileOpen' | 'onMobileOpenChange'> & {
  idPrefix: string;
};

function FilterFields({
  idPrefix,
  filters,
  metierOptions,
  thematiqueOptions,
  onChange,
}: FilterFieldsProps) {
  const niveauId = `${idPrefix}-niveau`;
  const thematiqueId = `${idPrefix}-thematique`;
  const metierId = `${idPrefix}-metier`;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <label htmlFor={niveauId} className="text-sm font-semibold text-ofc-ink">
          Niveau
        </label>
        <select
          id={niveauId}
          value={filters.niveau ?? ''}
          onChange={(e) =>
            onChange({
              niveau: e.target.value ? (Number(e.target.value) as FormationNiveau) : undefined,
            })
          }
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Tous les niveaux</option>
          {FORMATIONS_NIVEAUX_IA.map((n) => (
            <option key={n.niveau} value={n.niveau}>
              {n.labelComplet}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={thematiqueId} className="text-sm font-semibold text-ofc-ink">
          Thématique
        </label>
        <select
          id={thematiqueId}
          value={filters.thematique ?? ''}
          onChange={(e) =>
            onChange({
              thematique: (e.target.value || undefined) as CatalogueThematiqueId | undefined,
            })
          }
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Toutes les thématiques</option>
          {CATALOGUE_THEMATIQUES.filter((t) => thematiqueOptions.includes(t.id)).map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      {metierOptions.length > 0 ? (
        <div>
          <label htmlFor={metierId} className="text-sm font-semibold text-ofc-ink">
            Métier
          </label>
          <select
            id={metierId}
            value={filters.metier ?? ''}
            onChange={(e) =>
              onChange({
                metier: (e.target.value || undefined) as MetierId | undefined,
              })
            }
            className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            <option value="">Tous les métiers</option>
            {METIERS_CATALOGUE_2027.filter((m) => metierOptions.includes(m.id)).map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
}

export function CatalogueSearchFilters(props: Props) {
  const baseId = useId();
  const { filters, mobileOpen, onMobileOpenChange } = props;

  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.niveau) {
    const def = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === filters.niveau);
    activeChips.push({
      key: 'niveau',
      label: def?.labelComplet ?? `Niveau ${filters.niveau}`,
      clear: () => props.onChange({ niveau: undefined }),
    });
  }
  if (filters.thematique) {
    const th = CATALOGUE_THEMATIQUES.find((t) => t.id === filters.thematique);
    activeChips.push({
      key: 'thematique',
      label: th?.title ?? filters.thematique,
      clear: () => props.onChange({ thematique: undefined }),
    });
  }
  if (filters.metier) {
    const m = METIERS_CATALOGUE_2027.find((x) => x.id === filters.metier);
    activeChips.push({
      key: 'metier',
      label: m?.label ?? filters.metier,
      clear: () => props.onChange({ metier: undefined }),
    });
  }
  if (filters.q) {
    activeChips.push({
      key: 'q',
      label: `Recherche : ${filters.q}`,
      clear: () => props.onChange({ q: undefined }),
    });
  }

  return (
    <div className="mt-6">
      <div className="hidden md:block">
        <FilterFields idPrefix={`${baseId}-desktop`} {...props} />
      </div>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => onMobileOpenChange(true)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          aria-expanded={mobileOpen}
          aria-controls={`${baseId}-filters-panel`}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filtrer
          {activeChips.length > 0 ? (
            <span className="rounded-full bg-ofc-accent px-2 py-0.5 text-xs font-bold text-white">
              {activeChips.length}
            </span>
          ) : null}
        </button>

        {mobileOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-slate-900/40"
              aria-label="Fermer les filtres"
              onClick={() => onMobileOpenChange(false)}
            />
            <div
              id={`${baseId}-filters-panel`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${baseId}-filters-title`}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl motion-safe:animate-[header-mobile-drawer-in_0.24s_var(--ofc-ease-out)_both]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 id={`${baseId}-filters-title`} className="font-display text-lg font-bold text-ofc-ink">
                  Filtres
                </h3>
                <button
                  type="button"
                  onClick={() => onMobileOpenChange(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="mt-4">
                <FilterFields idPrefix={`${baseId}-mobile`} {...props} />
              </div>
              <button
                type="button"
                onClick={() => onMobileOpenChange(false)}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-ofc-accent px-4 py-3 text-sm font-semibold text-white hover:bg-ofc-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
              >
                Afficher les résultats
              </button>
            </div>
          </>
        ) : null}
      </div>

      {activeChips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Filtres actifs">
          {activeChips.map((chip) => (
            <li key={chip.key}>
              <button
                type="button"
                onClick={chip.clear}
                className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-medium text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
              >
                <span className="truncate">{chip.label}</span>
                <X className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="sr-only">Retirer le filtre</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
