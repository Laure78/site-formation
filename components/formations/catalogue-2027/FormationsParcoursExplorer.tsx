'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  METIERS_CATALOGUE_2027,
  formatPrixInterHt,
  libelleJoursFormation,
  type MetierId,
  type ParcoursComputed,
} from '@/data/catalogue-2027';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  parcours: readonly ParcoursComputed[];
};

export function FormationsParcoursExplorer({ parcours }: Props) {
  const [metierActif, setMetierActif] = useState<MetierId | 'all'>('all');

  const highlightedId = useMemo(() => {
    if (metierActif === 'all') return null;
    return METIERS_CATALOGUE_2027.find((m) => m.id === metierActif)?.parcoursId ?? null;
  }, [metierActif]);

  const ordered = useMemo(() => {
    if (!highlightedId) return [...parcours];
    return [...parcours].sort((a, b) => {
      if (a.id === highlightedId) return -1;
      if (b.id === highlightedId) return 1;
      return 0;
    });
  }, [parcours, highlightedId]);

  return (
    <section id="trouver-mon-parcours" className="scroll-mt-24" aria-labelledby="parcours-metiers-title">
      {/* Ancres SEO legacy du hub /formations */}
      <span id="catalogue-niveaux" className="sr-only" />
      <span id="catalogue-besoin-selector" className="sr-only" />
      <span id="catalogue-positionnement" className="sr-only" />
      <span id="catalogue-gammes" className="sr-only" />
      <div className="max-w-3xl">
        <h2 id="parcours-metiers-title" className="ofc-type-h2 text-ofc-ink">
          Parcours métiers — ouverture prévue en 2027
        </h2>
        <p className="mt-3 text-ofc-ink-muted">
          Parcours modulaires par fonction. Les formations IA du catalogue restent disponibles dès
          maintenant — filtres par niveau ci-dessus. Sélectionnez un métier pour repérer le parcours
          correspondant.
        </p>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrer les parcours par métier"
      >
        <button
          type="button"
          onClick={() => setMetierActif('all')}
          className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            metierActif === 'all'
              ? 'border-[#377CF3] bg-[#377CF3] text-white'
              : 'border-[#CBD5E1] bg-white text-ofc-ink hover:border-[#377CF3]'
          }`}
          aria-pressed={metierActif === 'all'}
        >
          Voir tous les parcours
        </button>
        {METIERS_CATALOGUE_2027.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMetierActif(m.id)}
            className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              metierActif === m.id
                ? 'border-[#377CF3] bg-[#377CF3] text-white'
                : 'border-[#CBD5E1] bg-white text-ofc-ink hover:border-[#377CF3]'
            }`}
            aria-pressed={metierActif === m.id}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ordered.map((p) => {
          const highlight = highlightedId === p.id;
          const metierLabel =
            METIERS_CATALOGUE_2027.find((m) => m.id === p.metierId)?.label ?? p.titre;
          return (
            <article
              key={p.id}
              id={`parcours-card-${p.id}`}
              className={`flex flex-col border bg-white p-5 transition-shadow ${
                highlight
                  ? 'border-[#377CF3] shadow-md ring-2 ring-[#377CF3]/30'
                  : 'border-[#E2E8F0]'
              }`}
              aria-current={highlight ? 'true' : undefined}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                {metierLabel}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-ofc-ink">{p.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{p.benefice}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div>
                  <dt className="text-ofc-ink-muted">Modules</dt>
                  <dd className="font-semibold text-ofc-ink">{p.moduleCount}</dd>
                </div>
                <div>
                  <dt className="text-ofc-ink-muted">Durée</dt>
                  <dd className="font-semibold text-ofc-ink">
                    {p.dureeHeures} h · {libelleJoursFormation(p.joursFormation)}
                  </dd>
                </div>
                <div>
                  <dt className="text-ofc-ink-muted">Prix inter</dt>
                  <dd className="font-semibold text-ofc-ink">
                    {formatPrixInterHt(p.prixInterHt)} / participant
                  </dd>
                </div>
                <div>
                  <dt className="text-ofc-ink-muted">Disponibilité</dt>
                  <dd className="font-semibold text-ofc-ink">
                    {p.mentionDisponibilite
                      ? 'Modules IA dispo. · Parcours 2027'
                      : libelleDisponibilite(p.disponibilite)}
                  </dd>
                </div>
              </dl>
              {p.mentionDisponibilite ? (
                <p className="mt-3 text-xs text-ofc-ink-muted">{p.mentionDisponibilite}</p>
              ) : null}
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  href={parcoursHref(p.id)}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                >
                  Voir les étapes du parcours
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ofc-ink-muted">
        Calendrier et dates de session : sur devis ou lors de l’inscription — présentiel en
        Île-de-France.
      </p>
      <div className="mt-4">
        <a href="#catalogue-modules" className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 px-4 py-2 text-sm`}>
          Voir le catalogue des modules
        </a>
      </div>
    </section>
  );
}
