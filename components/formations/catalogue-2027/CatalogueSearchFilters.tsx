'use client';

import { useId } from 'react';
import { X } from 'lucide-react';
import type { FormationNiveau } from '@/data/formations';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

function NiveauSelect({
  id,
  filters,
  onChange,
}: {
  id: string;
  filters: FormationsCataloguePageFilters;
  onChange: Props['onChange'];
}) {
  return (
    <div className="max-w-md">
      <label htmlFor={id} className="text-sm font-semibold text-ofc-ink">
        Niveau
      </label>
      <select
        id={id}
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
  );
}

export function CatalogueSearchFilters(props: Props) {
  const baseId = useId();
  const { filters, mobileOpen, onMobileOpenChange, onChange } = props;

  const niveauLabel = filters.niveau
    ? FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === filters.niveau)?.labelComplet ??
      `Niveau ${filters.niveau}`
    : null;

  return (
    <div className="mt-6">
      <div className="hidden md:block">
        <NiveauSelect id={`${baseId}-desktop-niveau`} filters={filters} onChange={onChange} />
      </div>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => onMobileOpenChange(true)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          aria-expanded={mobileOpen}
          aria-controls={`${baseId}-filters-panel`}
        >
          Filtrer par niveau{niveauLabel ? ` : ${niveauLabel}` : ''}
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
                  Niveau
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
                <NiveauSelect id={`${baseId}-mobile-niveau`} filters={filters} onChange={onChange} />
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

      {niveauLabel ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Filtre actif">
          <li>
            <button
              type="button"
              onClick={() => onChange({ niveau: undefined })}
              className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-medium text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            >
              <span className="truncate">{niveauLabel}</span>
              <X className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="sr-only">Retirer le filtre niveau</span>
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
