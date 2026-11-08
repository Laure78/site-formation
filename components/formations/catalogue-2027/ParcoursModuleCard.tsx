'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import type { CatalogueModule, ParcoursEtape } from '@/data/catalogue-2027';
import {
  libelleDureeModuleHeures,
  libelleNiveauModule,
  libellePrixModuleInter,
} from '@/lib/catalogue-2027/parcours-affichage';
import { PARCOURS_CONTACT_SECTION_ID } from '@/lib/catalogue-2027/parcours-contact-copy';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import { Accordion } from '@/components/readability/Accordion';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ParcoursModuleProgrammeDetail } from './ParcoursModuleProgrammeDetail';
import { useParcoursModuleSelection } from './parcours-module-selection-context';

export type ParcoursModuleCardIllustration = {
  src: string;
  alt: string;
};

type Props = {
  mod: CatalogueModule;
  etape: ParcoursEtape;
  numero: string;
  titleId: string;
  accordionId: string;
  /** Fiche catalogue publiée — sinon masqué. */
  ficheHref: string | null;
  illustration?: ParcoursModuleCardIllustration;
};

const checkboxClass =
  'h-4 w-4 shrink-0 rounded border-slate-300 text-[#377CF3] focus:ring-2 focus:ring-[#377CF3]/40 focus:ring-offset-1';

/**
 * Carte module parcours — en-tête fixe + accordéon programme (ordre A–H) + sélection devis.
 */
export function ParcoursModuleCard({
  mod,
  etape,
  numero,
  titleId,
  accordionId,
  ficheHref,
  illustration,
}: Props) {
  const { isSelected, toggleModule, demandeType } = useParcoursModuleSelection();
  const checked = isSelected(mod.code);
  const selectId = `select-module-${accordionId}`;

  const handleDevis = () => {
    if (!checked && demandeType === 'modules') {
      toggleModule(mod.code);
    }
    scrollToAnchor(PARCOURS_CONTACT_SECTION_ID);
  };

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ring-1 transition-shadow hover:shadow-md ${
        checked ? 'border-[#377CF3] ring-[#377CF3]/25' : 'border-slate-200 ring-slate-50'
      } ${illustration ? 'p-0' : 'p-5'}`}
      aria-labelledby={titleId}
    >
      {illustration ? (
        <div className="relative h-40 w-full shrink-0 bg-slate-100">
          <Image
            src={illustration.src}
            alt={illustration.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className={illustration ? 'flex min-h-0 flex-1 flex-col p-5' : 'flex min-h-0 flex-1 flex-col'}>
        <header className="min-h-[10.75rem]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white"
              aria-hidden
            >
              {numero}
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">{mod.code}</p>
            <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#1D4ED8]">
              {libelleNiveauModule(mod)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-slate-600">
            <span>
              <span className="font-medium text-[#101936]">Durée </span>
              {libelleDureeModuleHeures(mod)}
            </span>
            <span aria-hidden>·</span>
            <span>
              <span className="font-medium text-[#101936]">Prix </span>
              {libellePrixModuleInter(mod)}
            </span>
          </div>

          <h3
            id={titleId}
            className="mt-3 line-clamp-2 min-h-[2.75rem] font-display text-base font-semibold leading-snug text-[#101936]"
          >
            {mod.titre}
          </h3>

          <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm text-slate-600">
            <span className="font-medium text-[#101936]">Objectif — </span>
            {mod.objectifPrincipal}
          </p>

          <div className="mt-3 flex gap-2 text-sm text-slate-600">
            <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <p className="line-clamp-2">
              <span className="font-medium text-[#101936]">Livrable principal — </span>
              {etape.livrable}
            </p>
          </div>
        </header>

        <Accordion
          id={accordionId}
          className="mt-4 shrink-0 rounded-xl border border-slate-100 bg-[#F8FAFC] px-1 text-sm open:bg-white"
          summaryLabel="Programme détaillé et évaluation"
          summaryLabelExpanded="Réduire le programme"
        >
          <p className="mb-3 text-sm text-slate-600">
            Chaque module peut être suivi indépendamment, sous réserve des prérequis pédagogiques et du positionnement du
            parcours.
          </p>
          <ParcoursModuleProgrammeDetail mod={mod} etape={etape} />
        </Accordion>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FAFC] px-3 py-2.5">
          <input
            id={selectId}
            type="checkbox"
            className={checkboxClass}
            checked={checked}
            disabled={demandeType === 'complet'}
            onChange={() => toggleModule(mod.code)}
            aria-describedby={`${selectId}-hint`}
          />
          <label htmlFor={selectId} className="cursor-pointer text-sm text-slate-700">
            Inclure ce module dans ma demande de devis
            <span id={`${selectId}-hint`} className="mt-0.5 block text-xs text-slate-500">
              {libellePrixModuleInter(mod)} — tarif unitaire, sans total parcours.
            </span>
          </label>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <button
            type="button"
            onClick={handleDevis}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm`}
          >
            {CTA_DEVIS_LABEL}
          </button>
          {ficheHref ? (
            <Link
              href={ficheHref}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-1 px-4 py-2.5 text-sm`}
            >
              Voir la fiche module
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
