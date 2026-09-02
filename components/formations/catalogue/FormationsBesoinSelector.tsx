'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId } from 'react';
import {
  catalogueCardAnchorId,
  type CatalogueBesoinOption,
} from '@/lib/formations-catalogue-page-config';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  options: readonly CatalogueBesoinOption[];
  activeBesoinId: CatalogueBesoinOption['id'] | null;
  onSelectBesoin: (id: CatalogueBesoinOption['id'] | null, targetRefs: readonly string[]) => void;
};

/**
 * Sélecteur par besoin — ancres HTML utilisables sans JS ;
 * filtre / mise en évidence côté section catalogue.
 */
export function FormationsBesoinSelector({ options, activeBesoinId, onSelectBesoin }: Props) {
  const liveId = useId();

  const selectBesoin = useCallback(
    (id: CatalogueBesoinOption['id'], targetRefs: readonly string[]) => {
      const next = activeBesoinId === id ? null : id;
      onSelectBesoin(next, next ? targetRefs : []);
      if (next && targetRefs[0]) {
        const el = document.getElementById(catalogueCardAnchorId(targetRefs[0]));
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [activeBesoinId, onSelectBesoin],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const besoin = params.get('besoin') as CatalogueBesoinOption['id'] | null;
    if (!besoin) return;
    const option = options.find((o) => o.id === besoin);
    if (option) onSelectBesoin(option.id, option.targetRefs);
    // Lecture initiale URL uniquement
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, []);

  return (
    <section
      id="catalogue-besoin-selector"
      className="scroll-mt-24"
      aria-labelledby="catalogue-besoin-heading"
    >
      <h2 id="catalogue-besoin-heading" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
        Quelle formation correspond à votre besoin ?
      </h2>
      <p id={liveId} className="mt-2 text-sm text-slate-600" aria-live="polite">
        {activeBesoinId
          ? `Filtre actif : ${options.find((o) => o.id === activeBesoinId)?.label ?? activeBesoinId}`
          : 'Sélectionnez un besoin pour mettre en avant les formations concernées.'}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const href = `#${catalogueCardAnchorId(option.targetRefs[0] ?? 'NIV-01')}`;
          const isActive = activeBesoinId === option.id;
          return (
            <Link
              key={option.id}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                selectBesoin(option.id, option.targetRefs);
                const url = new URL(window.location.href);
                if (activeBesoinId === option.id) url.searchParams.delete('besoin');
                else url.searchParams.set('besoin', option.id);
                window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
              }}
              aria-pressed={isActive}
              className={`${OFC_CARD} flex h-full flex-col p-4 text-left transition ${
                isActive ? 'ring-2 ring-ofc-accent ring-offset-2' : ''
              }`}
            >
              <span className="font-display text-sm font-bold text-ofc-ink">{option.label}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {option.description}
              </span>
              <span className={`mt-3 text-xs font-semibold ${OFC_LINK}`}>
                {isActive ? 'Afficher tout le catalogue' : 'Voir les formations →'}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
