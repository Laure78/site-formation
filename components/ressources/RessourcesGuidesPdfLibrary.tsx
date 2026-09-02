'use client';

import { useId, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { RessourceGuideLibraryCard } from '@/components/ressources/RessourceGuideLibraryCard';
import {
  GUIDE_LIBRARY_FILTERS,
  filterGuidesByCategory,
  type GuideLibraryFilterId,
  type RessourceGuideEntry,
} from '@/lib/ressources-guides';
import { LINKS } from '@/lib/internal-links';
import { getPagePath, sendGa4Event } from '@/lib/ga4-analytics';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  guides: readonly RessourceGuideEntry[];
};

const REASSURANCE = [
  'Gratuit',
  'Sans inscription',
  'PDF et Excel',
  'Cas d’usage BTP',
  'Prompts directement applicables',
] as const;

/**
 * Bibliothèque guides — filtres métier + grille.
 * Sans JS : toutes les cartes restent visibles.
 */
export function RessourcesGuidesPdfLibrary({ guides }: Props) {
  const [, startTransition] = useTransition();
  const [filter, setFilter] = useState<GuideLibraryFilterId | 'tous'>('tous');
  const liveId = useId();
  const filtersId = useId();

  const visible = useMemo(
    () => filterGuidesByCategory(guides, filter),
    [guides, filter],
  );

  const selectFilter = (id: GuideLibraryFilterId | 'tous') => {
    startTransition(() => setFilter(id));
    sendGa4Event('ressource_guides_filter', {
      page_path: getPagePath(),
      filter_id: id,
    });
  };

  const trackFormations = () => {
    sendGa4Event('ressource_guides_cta_formations', { page_path: getPagePath() });
  };

  const trackRdv = () => {
    sendGa4Event('ressource_guides_cta_rdv', { page_path: getPagePath() });
  };

  return (
    <div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        Sélectionnez votre métier ou votre besoin. Consultez le guide en ligne ou téléchargez
        directement le fichier, sans inscription.
      </p>

      <p className="mt-4 text-xs font-medium text-slate-600 md:text-sm">
        {REASSURANCE.join(' · ')}
      </p>

      <div className="mt-8">
        <p id={filtersId} className="text-sm font-semibold text-slate-900">
          Filtrer par métier ou besoin
        </p>
        <div
          role="group"
          aria-labelledby={filtersId}
          className="mt-3 flex flex-wrap gap-2"
        >
          {GUIDE_LIBRARY_FILTERS.map((option) => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectFilter(option.id)}
                className={`min-h-11 rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                  active
                    ? 'border-[#377CF3] bg-[#377CF3] text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-[#377CF3]/50 hover:text-[#377CF3]'
                }`}
              >
                {option.label}
                {active ? <span className="sr-only"> (filtre actif)</span> : null}
              </button>
            );
          })}
        </div>
        <p id={liveId} className="mt-3 text-sm text-slate-600" aria-live="polite">
          {visible.length} ressource{visible.length > 1 ? 's' : ''} disponible
          {visible.length > 1 ? 's' : ''}
          {filter !== 'tous'
            ? ` — filtre « ${GUIDE_LIBRARY_FILTERS.find((f) => f.id === filter)?.label ?? filter} »`
            : ''}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((guide) => (
          <RessourceGuideLibraryCard key={guide.href} guide={guide} />
        ))}
      </div>

      {/* Fallback crawl / no-JS : toutes les ressources restent listées hors filtre client */}
      <noscript>
        <ul className="mt-6 space-y-2 text-sm">
          {guides.map((g) => (
            <li key={`ns-${g.href}`}>
              <a href={g.href}>{g.title}</a>
              {' — '}
              <a href={g.pdfHref}>{g.downloadLabel}</a>
            </li>
          ))}
        </ul>
      </noscript>

      <p className="mt-10 text-center text-sm text-slate-600">
        Vous cherchez un tutoriel pour une tâche précise ?{' '}
        <Link
          href={`${LINKS.ressources}?format=tutoriel#bibliotheque-ressources`}
          className={OFC_LINK}
        >
          Voir les tutoriels PDF
        </Link>
      </p>

      <aside
        className="mt-12 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 text-center md:p-8"
        aria-labelledby="guides-pdf-cta-heading"
      >
        <h3 id="guides-pdf-cta-heading" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
          Vous souhaitez adapter ces méthodes à votre entreprise ?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Travaillez sur vos propres DCE, devis, comptes rendus et documents de chantier pendant une
          formation IA BTP opérationnelle.
        </p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={LINKS.formations}
            onClick={trackFormations}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Découvrir les formations IA BTP
          </Link>
          <Link
            href={LINKS.prendreRdv}
            onClick={trackRdv}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Réserver une visio découverte
          </Link>
        </div>
      </aside>
    </div>
  );
}
