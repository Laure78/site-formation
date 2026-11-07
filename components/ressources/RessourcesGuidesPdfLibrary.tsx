'use client';

import { useId, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { CtaVisio } from '@/components/CtaVisio';
import { RessourceGuideLibraryCard } from '@/components/ressources/RessourceGuideLibraryCard';
import {
  GUIDE_LIBRARY_FILTERS,
  type GuideLibraryFilterId,
  type RessourceGuideEntry,
} from '@/lib/ressources-guides';
import { LINKS } from '@/lib/internal-links';
import { filterGuidesHub } from '@/lib/ressources-hub-utils';
import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  RESSOURCES_HUB_SECTION_FEATURED_EYEBROW,
  RESSOURCES_HUB_SECTION_GUIDES_EYEBROW,
} from '@/lib/ressources-catalog';
import { getPagePath, sendGa4Event } from '@/lib/ga4-analytics';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

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

  const trackFormations = () => {
    sendGa4Event('ressource_guides_cta_formations', { page_path: getPagePath() });
  };

  const trackRdv = () => {
    sendGa4Event('ressource_guides_cta_rdv', { page_path: getPagePath() });
  };

  const filterLabel =
    categoryFilter !== 'tous'
      ? GUIDE_LIBRARY_FILTERS.find((f) => f.id === categoryFilter)?.label ?? categoryFilter
      : null;

  return (
    <div id="guides-pdf" className="scroll-mt-28 bg-white">
      {featuredVisible.length > 0 ? (
        <div className="ressources-hub-featured border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-[#F8FAFC]/90">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:pb-12 md:pt-10 lg:px-8">
          <header className="mb-6 max-w-3xl">
            <Eyebrow className="mb-2 text-[#377CF3]">{RESSOURCES_HUB_SECTION_FEATURED_EYEBROW}</Eyebrow>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-[1.65rem]">
              Guides métier à la une
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              Trois ressources pour démarrer sur les appels d&apos;offres, la conduite de travaux et
              les skills Claude.
            </p>
          </header>
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

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:pb-12 md:pt-10 lg:px-8">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Eyebrow className="mb-2 text-[#377CF3]">{RESSOURCES_HUB_SECTION_GUIDES_EYEBROW}</Eyebrow>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-[1.65rem]">
              Tous les guides et outils
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Consultez en ligne ou téléchargez directement — sans inscription.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-3 py-1 text-sm font-semibold text-[#377CF3]">
            {visible.length} ressource{visible.length > 1 ? 's' : ''}
          </span>
        </header>

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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visible.map((guide) => (
              <RessourceGuideLibraryCard key={guide.href} guide={guide} variant="compact" />
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

        <aside
          className="ressources-hub-mid-cta mt-12 rounded-2xl border border-slate-200 border-l-[3px] border-l-[#377CF3] bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]/50 p-6 text-center shadow-sm md:p-8"
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
            <CtaVisio
              src="ressources-guides-pdf"
              variant="secondary"
              onClick={trackRdv}
              className="inline-flex min-h-11 items-center justify-center px-6 py-3"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
