'use client';

import { useMemo, useState } from 'react';
import { DOMAINES_CATALOGUE_2027, type DomaineId } from '@/data/catalogue-2027';
import { FormateurCard } from '@/components/formateurs/FormateurCard';
import type { FormateurProfile } from '@/lib/formateurs';
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
    if (domaineId === 'all') return formateurs;
    return formateurs.filter((f) => f.domaineIds.includes(domaineId));
  }, [formateurs, domaineId]);

  const filterId = 'formateurs-filtre-domaine';

  return (
    <div>
      <div className="mt-8 rounded-ofc-lg border border-ofc-border bg-white p-4 md:p-5">
        <label htmlFor={filterId} className="block text-sm font-medium text-ofc-ink">
          Filtrer par domaine du catalogue
        </label>
        <select
          id={filterId}
          value={domaineId}
          onChange={(e) => setDomaineId(e.target.value as DomaineId | 'all')}
          className="mt-2 w-full max-w-md rounded-lg border border-ofc-border-strong bg-ofc-canvas px-3 py-2.5 text-sm text-ofc-ink focus:border-ofc-accent focus:outline-none focus:ring-2 focus:ring-ofc-accent/30"
        >
          <option value="all">Tous les domaines ({formateurs.length})</option>
          {domainesAvecFormateurs.map((d) => (
            <option key={d.id} value={d.id}>
              {d.titre}
            </option>
          ))}
        </select>
        <p className="mt-3 text-sm text-ofc-ink-muted" aria-live="polite">
          {filtered.length} formateur{filtered.length > 1 ? 's' : ''}{' '}
          {filtered.length > 1 ? 'affichés' : 'affiché'}
        </p>
      </div>

      <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {filtered.map((f, index) => (
          <li
            key={f.id}
            id={f.slug}
            className="scroll-mt-28 min-w-0 motion-safe:animate-[ofc-hero-enter_0.45s_ease-out_both]"
            style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
          >
            <FormateurCard formateur={f} variant="catalogue-hub" />
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-ofc-ink-muted">
          Aucun formateur pour ce domaine. Choisissez un autre filtre.
        </p>
      ) : null}

      <h2 className={`${OFC_TYPE_H3} sr-only`}>Grille des formateurs filtrée</h2>
    </div>
  );
}
