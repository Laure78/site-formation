'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  CATALOGUE_MENU_LABELS,
  type CatalogueBesoinOption,
} from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueCard } from '@/components/formations/catalogue/FormationsCatalogueCard';
import { FormationsBesoinSelector } from '@/components/formations/catalogue/FormationsBesoinSelector';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_FORMATION_TITRE } from '@/lib/bework-programmes';
import { PHOTOS } from '@/lib/photos';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type Props = {
  formations: FormationCatalogueEntry[];
  besoinOptions: readonly CatalogueBesoinOption[];
};

/** Sélecteur + grille — uniquement les 6 formations IA BTP + BeWork. */
export function FormationsCatalogueMainSection({ formations, besoinOptions }: Props) {
  const [, startTransition] = useTransition();
  const [activeBesoinId, setActiveBesoinId] = useState<CatalogueBesoinOption['id'] | null>(null);
  const [highlightedRefs, setHighlightedRefs] = useState<readonly string[]>([]);

  const onSelectBesoin = useCallback(
    (id: CatalogueBesoinOption['id'] | null, targetRefs: readonly string[]) => {
      startTransition(() => {
        setActiveBesoinId(id);
        setHighlightedRefs(targetRefs);
      });
    },
    [],
  );

  const core = useMemo(
    () =>
      formations.map((f) => ({
        ...f,
        title: CATALOGUE_MENU_LABELS[f.ref] ?? f.title,
      })),
    [formations],
  );

  const isFiltered = highlightedRefs.length > 0;
  const beworkDimmed = isFiltered;
  const beworkVisuel = PHOTOS.beworkHeroBureauChantier;

  return (
    <>
      <FormationsBesoinSelector
        options={besoinOptions}
        activeBesoinId={activeBesoinId}
        onSelectBesoin={onSelectBesoin}
      />

      <section className="mt-14 scroll-mt-24" aria-labelledby="catalogue-formations-liste">
        <h2 id="catalogue-formations-liste" className="ofc-type-h2 text-ofc-ink text-balance">
          Nos formations
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted md:text-base">
          Six formations IA pour le BTP (Qualiopi) et BeWork — développement web avec l’IA sans savoir
          coder.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {core.map((entry) => (
            <FormationsCatalogueCard
              key={entry.ref}
              entry={entry}
              highlighted={highlightedRefs.includes(entry.ref)}
              dimmed={isFiltered && !highlightedRefs.includes(entry.ref)}
            />
          ))}

          <article
            id="formation-card-bework"
            className={`${OFC_CARD} flex h-full scroll-mt-28 flex-col overflow-hidden p-0 ${
              beworkDimmed ? 'opacity-45' : ''
            }`}
          >
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={beworkVisuel.src}
                  alt={beworkVisuel.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                />
              </div>
            </figure>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-ofc-accent">BeWork</p>
              <h3 className={`${OFC_TYPE_H3} mt-2 text-balance`}>
                Développement web avec l’IA — BeWork
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {BEWORK_FORMATION_TITRE}. Parcours 7&nbsp;h ou 14&nbsp;h, sans prérequis en
                programmation.
              </p>
              <div className="mt-auto pt-5">
                <Link href={LINKS.bework} className={OFC_CTA_PRIMARY}>
                  Découvrir BeWork
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
