'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { CatalogueBesoinOption } from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueCard } from '@/components/formations/catalogue/FormationsCatalogueCard';
import { FormationsBesoinSelector } from '@/components/formations/catalogue/FormationsBesoinSelector';
import { showParcoursApplicationsMetierBandeau } from '@/lib/formations-catalogue-page-config';
import { LINKS } from '@/lib/internal-links';
import { PARCOURS_APPLICATIONS_METIER } from '@/lib/parcours-applications-metier-btp-content';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  formations: FormationCatalogueEntry[];
  besoinOptions: readonly CatalogueBesoinOption[];
};

/** Sélecteur + grille des cartes catalogue. */
export function FormationsCatalogueMainSection({ formations, besoinOptions }: Props) {
  const [highlightedRef, setHighlightedRef] = useState<string | null>(null);

  return (
    <>
      <FormationsBesoinSelector options={besoinOptions} onHighlightRef={setHighlightedRef} />

      <section className="mt-14 scroll-mt-24" aria-labelledby="catalogue-formations-liste">
        <h2 id="catalogue-formations-liste" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
          Les formations IA BTP
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Cinq parcours Qualiopi en présentiel — devis, appels d&apos;offres, chantier, maîtrise
          d&apos;œuvre et déploiement avancé de l&apos;IA. Détails pédagogiques sur chaque fiche.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {formations.map((entry) => (
            <FormationsCatalogueCard
              key={entry.ref}
              entry={entry}
              highlighted={highlightedRef === entry.ref}
            />
          ))}
        </div>

        {showParcoursApplicationsMetierBandeau() ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <p className="font-display text-base font-semibold text-ofc-ink">
              Parcours applications métier BTP
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {PARCOURS_APPLICATIONS_METIER.promesse} — {PARCOURS_APPLICATIONS_METIER.parcoursCompletDuree}{' '}
              en 3 niveaux.
            </p>
            <Link href={LINKS.parcoursApplicationsMetierBtp} className={`mt-4 inline-flex text-sm font-semibold ${OFC_LINK}`}>
              Voir le parcours applications métier →
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
