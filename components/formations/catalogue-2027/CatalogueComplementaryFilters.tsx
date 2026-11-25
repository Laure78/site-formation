'use client';

import { useEffect, useId, useState } from 'react';
import type { FormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';
import { CATALOGUE_THEMATIQUES } from '@/lib/catalogue-thematiques-btp';
import { METIERS_CATALOGUE_2027 } from '@/data/catalogue-2027/metiers';

type Props = {
  filters: FormationsCataloguePageFilters;
  onChange: (next: Partial<FormationsCataloguePageFilters>) => void;
};

export function CatalogueComplementaryFilters({ filters, onChange }: Props) {
  const searchId = useId();
  const [queryDraft, setQueryDraft] = useState(filters.q ?? '');

  useEffect(() => {
    const trimmed = queryDraft.trim();
    if (trimmed === (filters.q ?? '')) return;
    const timeout = window.setTimeout(() => {
      onChange({ q: trimmed.length > 0 ? trimmed : undefined });
    }, 320);
    return () => window.clearTimeout(timeout);
  }, [queryDraft, filters.q, onChange]);

  return (
    <div className="mt-5 space-y-4 rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Affiner la recherche</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-4">
          <label htmlFor={searchId} className="block text-sm font-medium text-[#101936]">
            Mot-clé
          </label>
          <input
            id={searchId}
            type="search"
            value={queryDraft}
            onChange={(e) => setQueryDraft(e.target.value)}
            placeholder="Ex. Claude, devis, maîtrise d’œuvre…"
            className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#101936] placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor={`${searchId}-thematique`} className="block text-sm font-medium text-[#101936]">
            Thématique
          </label>
          <select
            id={`${searchId}-thematique`}
            value={filters.thematique ?? ''}
            onChange={(e) =>
              onChange({ thematique: e.target.value ? (e.target.value as typeof filters.thematique) : undefined })
            }
            className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#101936] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <option value="">Toutes les thématiques</option>
            {CATALOGUE_THEMATIQUES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${searchId}-metier`} className="block text-sm font-medium text-[#101936]">
            Métier
          </label>
          <select
            id={`${searchId}-metier`}
            value={filters.metier ?? ''}
            onChange={(e) =>
              onChange({ metier: e.target.value ? (e.target.value as typeof filters.metier) : undefined })
            }
            className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#101936] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <option value="">Tous les métiers</option>
            {METIERS_CATALOGUE_2027.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${searchId}-dispo`} className="block text-sm font-medium text-[#101936]">
            Disponibilité
          </label>
          <select
            id={`${searchId}-dispo`}
            value={filters.disponibilite ?? ''}
            onChange={(e) =>
              onChange({
                disponibilite:
                  e.target.value === 'disponible' || e.target.value === 'ouverture-2027'
                    ? e.target.value
                    : undefined,
              })
            }
            className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#101936] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <option value="">Toutes</option>
            <option value="disponible">Disponibles maintenant</option>
            <option value="ouverture-2027">Ouvertures à venir</option>
          </select>
        </div>

        <div>
          <span className="block text-sm font-medium text-[#101936]">Durée</span>
          <div className="mt-1 flex flex-wrap gap-2" role="group" aria-label="Filtrer par durée">
            {(
              [
                { key: 'all', label: 'Toutes', duree: undefined },
                { key: '4', label: '4 h', duree: 4 as const },
                { key: '7', label: '7 h', duree: 7 as const },
                { key: '14', label: '14 h', duree: 14 as const },
              ] as const
            ).map((opt) => {
              const active = (filters.duree ?? null) === (opt.duree ?? null);
              return (
                <button
                  key={opt.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ duree: opt.duree })}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                    active
                      ? 'border-[#377CF3] bg-[#377CF3] text-white'
                      : 'border-[#E2E8F0] bg-white text-[#101936] hover:border-[#377CF3]/40'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}