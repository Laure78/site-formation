'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { catalogueCardAnchorId, type CatalogueBesoinOption } from '@/lib/formations-catalogue-page-config';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  options: readonly CatalogueBesoinOption[];
  onHighlightRef?: (ref: string | null) => void;
};

/**
 * Sélecteur par besoin — ancres HTML (#formation-card-*) utilisables sans JS ;
 * surclassement visuel optionnel au clic.
 */
export function FormationsBesoinSelector({ options, onHighlightRef }: Props) {
  const [activeId, setActiveId] = useState<CatalogueBesoinOption['id'] | null>(null);

  const selectBesoin = useCallback(
    (id: CatalogueBesoinOption['id'], targetRef: string) => {
      setActiveId(id);
      onHighlightRef?.(targetRef);
      const el = document.getElementById(catalogueCardAnchorId(targetRef));
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    [onHighlightRef],
  );

  useEffect(() => {
    if (!activeId) return;
    const t = window.setTimeout(() => {
      setActiveId(null);
      onHighlightRef?.(null);
    }, 2500);
    return () => window.clearTimeout(t);
  }, [activeId, onHighlightRef]);

  return (
    <section
      id="catalogue-besoin-selector"
      className="scroll-mt-24"
      aria-labelledby="catalogue-besoin-heading"
    >
      <h2 id="catalogue-besoin-heading" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
        Quelle formation correspond à votre besoin ?
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {options.map((option) => {
          const href = `#${catalogueCardAnchorId(option.targetRef)}`;
          const isActive = activeId === option.id;
          return (
            <Link
              key={option.id}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                selectBesoin(option.id, option.targetRef);
              }}
              className={`${OFC_CARD} flex h-full flex-col p-4 text-left transition ${
                isActive ? 'ring-2 ring-ofc-accent ring-offset-2' : ''
              }`}
            >
              <span className="font-display text-sm font-bold text-ofc-ink">{option.label}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {option.description}
              </span>
              <span className={`mt-3 text-xs font-semibold ${OFC_LINK}`}>Voir la formation →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
