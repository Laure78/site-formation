'use client';

import { useId, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { RessourceGuideLibraryCard } from '@/components/ressources/RessourceGuideLibraryCard';
import { RessourcesMaquetteSectionTitle } from '@/components/ressources/RessourcesMaquetteSectionTitle';
import {
  GUIDE_LIBRARY_FILTERS,
  type GuideLibraryFilterId,
  type RessourceGuideEntry,
} from '@/lib/ressources-guides';
import { LINKS } from '@/lib/internal-links';
import { filterGuidesHub } from '@/lib/ressources-hub-utils';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  guides: readonly RessourceGuideEntry[];
  featuredGuides: readonly RessourceGuideEntry[];
  hubQuery: string;
  categoryFilter: GuideLibraryFilterId | 'tous';
  onCategoryFilterChange?: (id: GuideLibraryFilterId | 'tous') => void;
};

/**
 * Bibliothèque guides — à la une + grille complète.
 * Filtres métier pilotés par le bandeau supérieur (`RessourcesHubMain`).
 */
export function RessourcesGuidesPdfLibrary({
  guides,
  featuredGuides,
  hubQuery,
  categoryFilter,
  onCategoryFilterChange,
}: Props) {
  const liveId = useId();
  const [, startTransition] = useTransition();

  const visible = useMemo(
    () => filterGuidesHub(guides, { category: categoryFilter, query: hubQuery }),
    [guides, categoryFilter, hubQuery],
  );

  const featuredVisible = useMemo(() => {
    if (hubQuery.trim() || categoryFilter !== 'tous') {
      return featuredGuides.filter(
        (g) => visible.some((v) => v.href === g.href),
      );
    }
    return featuredGuides;
  }, [featuredGuides, visible, hubQuery, categoryFilter]);

  const filterLabel =
    categoryFilter !== 'tous'
      ? GUIDE_LIBRARY_FILTERS.find((f) => f.id === categoryFilter)?.label ?? categoryFilter
      : null;

  return (
    <div id="guides-pdf" className="scroll-mt-28 bg-white">
      {featuredVisible.length > 0 ? (
        <div className="ressources-hub-featured border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-[80rem] px-4 pb-10 pt-4 sm:px-6 md:pb-12 lg:px-8">
          <RessourcesMaquetteSectionTitle
            id="ressources-featured-heading"
            className="mb-6"
            title="Les ressources à la une"
            description="Trois ressources pour démarrer : appels d&apos;offres, conduite de travaux et skills Claude BTP."
          />
          <ul className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featuredVisible.map((guide) => (
              <li key={`featured-${guide.href}`} className="min-w-0">
                <RessourceGuideLibraryCard guide={guide} variant="featured" />
              </li>
            ))}
          </ul>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-[80rem] px-4 pb-10 pt-8 sm:px-6 md:pb-12 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <RessourcesMaquetteSectionTitle
            id="ressources-all-guides-heading"
            title="Tous les guides et outils"
            description="Consultez en ligne ou téléchargez directement — sans inscription."
          />
          <span className="inline-flex items-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-sm font-semibold text-[#377CF3]">
            {visible.length} ressource{visible.length > 1 ? 's' : ''}
          </span>
        </div>

        <p id={liveId} className="sr-only" aria-live="polite">
          {visible.length} ressource{visible.length > 1 ? 's' : ''} disponible
          {visible.length > 1 ? 's' : ''}
          {filterLabel ? ` — filtre « ${filterLabel} »` : ''}
          {hubQuery.trim() ? ` — recherche « ${hubQuery.trim()} »` : ''}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-[#F8FAFC] px-6 py-12 text-center">
            <h3 className="font-medium text-slate-900">Aucun guide ne correspond à ces critères</h3>
            <p className="mt-2 text-sm text-slate-600">
              Modifiez la recherche ou choisissez « Tous » dans les filtres métier.
            </p>
            {onCategoryFilterChange ? (
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    onCategoryFilterChange('tous');
                  })
                }
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d66d6]"
              >
                Réinitialiser les filtres guides
              </button>
            ) : null}
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
            {visible.map((guide) => (
              <RessourceGuideLibraryCard key={guide.href} guide={guide} variant="row" />
            ))}
          </div>
        )}

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

      </div>
    </div>
  );
}
