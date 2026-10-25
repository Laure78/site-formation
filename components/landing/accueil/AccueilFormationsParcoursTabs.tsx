'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useId, useState } from 'react';
import { TrainingCard } from '@/components/ui/TrainingCard';
import type { AccueilFormationCarte } from '@/lib/accueil-config';
import type { AccueilParcoursOffreCard } from '@/lib/accueil-offre-catalogue';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type TabId = 'niveau' | 'metier';

type Props = {
  formations: readonly AccueilFormationCarte[];
  parcours: readonly AccueilParcoursOffreCard[];
  formationTarifs: Readonly<Record<string, string>>;
};

function formationCtaLabel(titre: string): string {
  return `Voir le programme — ${titre}`;
}

function parcoursCtaLabel(titre: string): string {
  return `Voir le parcours — ${titre}`;
}

/** Sélecteur Par niveau | Par métier — une seule grille de cartes à la fois. */
export function AccueilFormationsParcoursTabs({
  formations,
  parcours,
  formationTarifs,
}: Props) {
  const showParcoursTab = parcours.length > 0;
  const [tab, setTab] = useState<TabId>('niveau');
  const tablistId = useId();

  return (
    <div>
      {showParcoursTab ? (
      <div
        role="tablist"
        id={tablistId}
        aria-label="Choisir une entrée catalogue"
        className="flex gap-1 overflow-x-auto rounded-ofc-pill border border-ofc-border bg-white p-1 [scrollbar-width:none] sm:inline-flex sm:overflow-visible"
      >
        {(
          [
            ['niveau', 'Par niveau'],
            ['metier', 'Par métier'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${tablistId}-${id}`}
            aria-selected={tab === id}
            aria-controls={`${tablistId}-panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
            className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-ofc-pill px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              tab === id
                ? 'bg-[#377CF3] text-white'
                : 'text-ofc-ink-muted hover:bg-ofc-accent-soft hover:text-ofc-accent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      ) : null}

      <div
        role="tabpanel"
        id={`${tablistId}-panel-niveau`}
        aria-labelledby={showParcoursTab ? `${tablistId}-niveau` : undefined}
        hidden={showParcoursTab && tab !== 'niveau'}
        className={showParcoursTab ? 'mt-8' : undefined}
      >
        {(!showParcoursTab || tab === 'niveau') ? (
          <div className="grid items-stretch gap-5 sm:grid-cols-2">
            {formations.map((f) => {
              const cta = formationCtaLabel(f.titre);
              const tarif = f.code ? formationTarifs[f.code] : undefined;
              return (
                <TrainingCard
                  key={f.href}
                  href={f.href}
                  titre={f.titre}
                  benefice={f.benefice}
                  niveau={f.niveau}
                  duree={f.duree}
                  publicCible={f.publicCible}
                  format={f.format}
                  prixLabel={tarif}
                  ctaLabel={cta}
                  ctaAriaLabel={cta}
                  titleAs="h3"
                  className="h-full"
                />
              );
            })}
          </div>
        ) : null}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-metier`}
        aria-labelledby={`${tablistId}-metier`}
        hidden={tab !== 'metier'}
        className="mt-8"
      >
        {tab === 'metier' ? (
          <ul className="grid list-none gap-4 sm:grid-cols-2">
            {parcours.map((p) => {
              const cta = parcoursCtaLabel(p.titreCarte);
              return (
                <li key={p.id}>
                  <article className={`${OFC_CARD} flex h-full flex-col p-5 sm:p-6`}>
                    <p className="text-xs font-semibold text-ofc-accent">{p.niveauEntree}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-ofc-ink">
                      {p.titreCarte}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">
                      {p.usagesIa.slice(0, 2).join(' · ')}.
                    </p>
                    {p.dureeLabel ? (
                      <p className="mt-3 text-sm text-ofc-ink-muted">
                        <span className="font-semibold text-ofc-ink">Durée — </span>
                        {p.dureeLabel} · {p.disponibiliteLabel}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-ofc-ink-muted">{p.disponibiliteLabel}</p>
                    )}
                    <Link
                      href={p.href}
                      aria-label={cta}
                      className={`${OFC_LINK} mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold`}
                    >
                      <span>{cta}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <p className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-6 py-3 text-sm font-semibold`}
        >
          Voir toutes les formations
        </Link>
        <Link href={LINKS.formationsOrientation} className={`${OFC_LINK} text-sm font-semibold`}>
          Questionnaire : quelle formation choisir ?
        </Link>
      </p>
    </div>
  );
}
