'use client';

import { useMemo, useState } from 'react';
import { DOMAINES_CATALOGUE_2027, type DomaineId } from '@/data/catalogue-2027';
import { FormateurCard } from '@/components/formateurs/FormateurCard';
import type { FormateurProfile } from '@/lib/formateurs';
import { cn } from '@/lib/cn';
import { OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type Props = {
  formateurs: readonly FormateurProfile[];
};

export function FormateursCatalogueHub({ formateurs }: Props) {
  const [domaineId, setDomaineId] = useState<DomaineId | 'all'>('all');

  const domainesAvecFormateurs = useMemo(() => {
    const ids = new Set<DomaineId>();
    for (const f of formateurs) {
      for (const d of f.domaineIds) ids.add(d);
    }
    return DOMAINES_CATALOGUE_2027.filter((d) => ids.has(d.id));
  }, [formateurs]);

  const filtered = useMemo(() => {
    const list =
      domaineId === 'all'
        ? formateurs
        : formateurs.filter((f) => f.domaineIds.includes(domaineId));
    const laure = list.find((f) => f.id === 'laure-olivie');
    const rest = list.filter((f) => f.id !== 'laure-olivie');
    return laure ? [laure, ...rest] : rest;
  }, [formateurs, domaineId]);

  const filterId = 'formateurs-filtre-domaine';
  const oddCount = filtered.length % 2 === 1;

  return (
    <div id="formateurs-profiles">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h2 className={OFC_TYPE_H3}>Profils et programmes</h2>
          <p className="mt-1 max-w-2xl text-base text-ofc-ink-muted">
            Filtrez par domaine du catalogue pour afficher les intervenants concernés.
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <label htmlFor={filterId} className="sr-only">
            Filtrer par domaine du catalogue
          </label>
          <select
            id={filterId}
            value={domaineId}
            onChange={(e) => setDomaineId(e.target.value as DomaineId | 'all')}
            className="w-full rounded-lg border border-ofc-border-strong bg-white px-3 py-2.5 text-base text-ofc-ink focus:border-ofc-accent focus:outline-none focus:ring-2 focus:ring-ofc-accent/30"
          >
            <option value="all">Tous les domaines ({formateurs.length})</option>
            {domainesAvecFormateurs.map((d) => (
              <option key={d.id} value={d.id}>
                {d.titre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-ofc-ink-muted" aria-live="polite">
        {filtered.length} formateur{filtered.length > 1 ? 's' : ''}{' '}
        {filtered.length > 1 ? 'affichés' : 'affiché'}
      </p>

      <ul className="mt-6 grid list-none gap-5 lg:grid-cols-2 lg:gap-6">
        {filtered.map((f, index) => {
          const isLastOdd = oddCount && index === filtered.length - 1;
          return (
            <li
              key={f.id}
              id={f.slug}
              className={cn(
                'scroll-mt-28 min-w-0 motion-safe:animate-[ofc-hero-enter_0.45s_ease-out_both]',
                isLastOdd && 'lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-xl',
              )}
              style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
            >
              <FormateurCard
                formateur={f}
                variant="catalogue-hub"
                portraitPriority={index === 0}
              />
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-base text-ofc-ink-muted">
          Aucun formateur pour ce domaine. Choisissez un autre filtre.
        </p>
      ) : null}
    </div>
  );
}
