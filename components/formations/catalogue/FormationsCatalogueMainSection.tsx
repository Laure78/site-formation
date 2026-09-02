'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { CatalogueBesoinOption } from '@/lib/formations-catalogue-page-config';
import { FormationsCatalogueCard } from '@/components/formations/catalogue/FormationsCatalogueCard';
import { FormationsBesoinSelector } from '@/components/formations/catalogue/FormationsBesoinSelector';
import { LINKS } from '@/lib/internal-links';
import {
  APPLICATION_METIER_NIVEAUX,
  PARCOURS_APPLICATIONS_METIER,
} from '@/lib/parcours-applications-metier-btp-content';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  formations: FormationCatalogueEntry[];
  besoinOptions: readonly CatalogueBesoinOption[];
};

const APP_REFS = new Set(['NIV-06', 'NIV-07', 'NIV-08']);

/** Sélecteur + grille des cartes catalogue (toutes les fiches publiées). */
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
    () => formations.filter((f) => !APP_REFS.has(f.ref)),
    [formations],
  );
  const apps = useMemo(() => {
    const byRef = new Map(formations.filter((f) => APP_REFS.has(f.ref)).map((f) => [f.ref, f]));
    return APPLICATION_METIER_NIVEAUX.map((n) => byRef.get(n.ref)).filter(
      (e): e is FormationCatalogueEntry => Boolean(e),
    );
  }, [formations]);

  const isFiltered = highlightedRefs.length > 0;

  return (
    <>
      <FormationsBesoinSelector
        options={besoinOptions}
        activeBesoinId={activeBesoinId}
        onSelectBesoin={onSelectBesoin}
      />

      <section className="mt-14 scroll-mt-24" aria-labelledby="catalogue-formations-liste">
        <h2 id="catalogue-formations-liste" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
          Les formations disponibles
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          {formations.length} formations catalogue — devis, appels d&apos;offres, chantier, maîtrise
          d&apos;œuvre, Claude et applications métier. Détails pédagogiques sur chaque fiche.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {core.map((entry) => (
            <FormationsCatalogueCard
              key={entry.ref}
              entry={entry}
              highlighted={highlightedRefs.includes(entry.ref)}
              dimmed={isFiltered && !highlightedRefs.includes(entry.ref)}
            />
          ))}
        </div>

        {apps.length > 0 ? (
          <div className="mt-12 scroll-mt-24" id="parcours-applications-metier">
            <h2 className="font-display text-xl font-bold text-ofc-ink md:text-2xl">
              Parcours applications métier BTP
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Progression N1 → N2 → N3 ({PARCOURS_APPLICATIONS_METIER.parcoursCompletDuree}).{' '}
              {PARCOURS_APPLICATIONS_METIER.promesse} Chaque niveau a sa propre fiche et ses prérequis.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <Link href={LINKS.parcoursApplicationsMetierBtp} className={OFC_LINK}>
                Vue d&apos;ensemble du parcours →
              </Link>
            </p>
            <ol className="mt-6 grid gap-6 lg:grid-cols-3">
              {apps.map((entry) => {
                const niveau = APPLICATION_METIER_NIVEAUX.find((n) => n.ref === entry.ref);
                return (
                  <li key={entry.ref}>
                    {niveau ? (
                      <p className="mb-2 text-xs leading-snug text-slate-600">
                        <span className="font-bold uppercase tracking-wide text-ofc-accent">
                          {niveau.progressionLabel}
                        </span>
                        <span className="mt-1 block">Prérequis : {niveau.prerequis}</span>
                      </p>
                    ) : null}
                    <FormationsCatalogueCard
                      entry={entry}
                      highlighted={highlightedRefs.includes(entry.ref)}
                      dimmed={isFiltered && !highlightedRefs.includes(entry.ref)}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </section>
    </>
  );
}
