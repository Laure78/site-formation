'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useId, useRef, useState } from 'react';
import {
  Award,
  CalendarClock,
  Clock,
  Layers3,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { CtaDevis } from '@/components/CtaDevis';
import { trackContactCtaClick } from '@/lib/ga4-analytics';
import { ParcoursFormationModulesList } from '@/components/formations/ParcoursFormationModulesList';
import { getAccueilParcoursOffre } from '@/lib/accueil-offre-catalogue';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import {
  getParcoursMetiersPublicsOrdered,
  PARCOURS_METIERS_PAGE_ORDER,
} from '@/lib/parcours-metiers-public';
import {
  PARCOURS_DOCUMENTS_METIER,
  PARCOURS_METIERS_CARD_IMAGE,
  PARCOURS_METIERS_ACCROCHE,
  PARCOURS_METIERS_HERO,
  PARCOURS_METIERS_SECTION,
  PARCOURS_METIERS_TRUST,
} from '@/lib/parcours-metiers-page-content';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import type { AccueilParcoursOffreCard } from '@/lib/accueil-offre-catalogue';
import type { ParcoursId } from '@/data/catalogue-2027';

const LAYOUT_SPAN: Partial<Record<ParcoursId, string>> = {
  'dirigeant-pme-btp': 'lg:col-span-2',
  'charge-affaires-btp': 'lg:col-span-2',
  'conducteur-de-travaux': 'lg:col-span-2',
  'chef-de-chantier': 'lg:col-span-3',
  'assistant-de-gestion-btp': 'lg:col-span-3',
  'referent-ia-btp': 'lg:col-span-6',
};

function parcoursCardsData(): AccueilParcoursOffreCard[] {
  const byId = new Map(getAccueilParcoursOffre({ preview: true }).map((p) => [p.id, p]));
  return PARCOURS_METIERS_PAGE_ORDER.map((id) => byId.get(id)).filter(
    (p): p is AccueilParcoursOffreCard => p != null,
  );
}

function ParcoursMetierDetailPanel({ parcours }: { parcours: AccueilParcoursOffreCard }) {
  const computed = getParcoursMetiersPublicsOrdered().find((p) => p.id === parcours.id);
  const ficheHref = parcoursHref(parcours.id);

  return (
    <div
      id={`parcours-detail-${parcours.id}`}
      className="scroll-mt-28 rounded-xl border border-[#DAE3F0] bg-[#F8FAFC] p-5 sm:p-6"
      role="region"
      aria-labelledby={`parcours-detail-title-${parcours.id}`}
    >
      <h3 id={`parcours-detail-title-${parcours.id}`} className={`${OFC_TYPE_H3} text-pretty`}>
        {parcours.titre} — programme
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{parcours.objectif}</p>
      {computed?.competencesVisees?.length ? (
        <div className="mt-4">
          <p className="text-sm font-semibold text-ofc-ink">Compétences visées</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ofc-ink-muted">
            {computed.competencesVisees.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <ParcoursFormationModulesList etapes={parcours.etapes} className="mt-5" />
      {computed?.publicCible ? (
        <p className="mt-4 text-sm text-ofc-ink-muted">
          <span className="font-medium text-ofc-ink">Public :</span> {computed.publicCible}
        </p>
      ) : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={ficheHref}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 items-center justify-center gap-2 px-5 py-2.5 text-sm`}
        >
          Fiche parcours complète
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
        <CtaDevis
          href={catalogueDemandeHref({
            formationOuParcours: `Parcours ${parcours.titre}`,
            nature: 'devis',
            metier: computed?.metierId,
          })}
          variant="secondary"
          className="inline-flex min-h-10 items-center justify-center px-5 py-2.5 text-sm"
        />
      </div>
    </div>
  );
}

type ParcoursCardProps = {
  parcours: AccueilParcoursOffreCard;
  layout: 'vertical' | 'horizontal';
  expanded: boolean;
  onToggle: () => void;
  controlsId: string;
};

function ParcoursMetierCard({
  parcours,
  layout,
  expanded,
  onToggle,
  controlsId,
}: ParcoursCardProps) {
  const image = PARCOURS_METIERS_CARD_IMAGE[parcours.id];
  const accroche = PARCOURS_METIERS_ACCROCHE[parcours.id] ?? parcours.benefice;
  const isHorizontal = layout === 'horizontal';

  const imageBlock = image ? (
    <div
      className={`relative overflow-hidden bg-[#EAF3FF] ${
        isHorizontal ? 'min-h-[12rem] w-full shrink-0 sm:min-h-0 sm:w-[42%]' : 'aspect-[16/10] w-full'
      }`}
    >
      <span className="absolute left-3 top-3 z-10 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#081A3D] shadow-sm">
        Ouverture 2027
      </span>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover object-center motion-reduce:transition-none"
        sizes={
          isHorizontal
            ? '(max-width: 640px) 100vw, 40vw'
            : '(max-width: 1024px) 50vw, 33vw'
        }
      />
    </div>
  ) : null;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-[#DAE3F0] bg-white shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none ${
        isHorizontal ? 'sm:flex-row' : ''
      }`}
    >
      {imageBlock}
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${isHorizontal ? 'justify-center' : ''}`}>
        <h3 className={`${OFC_TYPE_H3} text-pretty text-[#081A3D]`}>{parcours.titre}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{accroche}</p>
        {parcours.dureeLabel ? (
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-[#081A3D]">
            <Clock className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            {parcours.dureeLabel}
          </p>
        ) : null}
        <div className="mt-auto pt-5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#377CF3] hover:text-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            aria-expanded={expanded}
            aria-controls={controlsId}
            onClick={onToggle}
          >
            Découvrir le parcours
            <ArrowRight
              className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${
                expanded ? 'rotate-90' : ''
              }`}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ParcoursMetiersPage() {
  const parcours = parcoursCardsData();
  const [expandedId, setExpandedId] = useState<ParcoursId | null>(null);
  const detailRefs = useRef<Partial<Record<ParcoursId, HTMLDivElement | null>>>({});
  const listInstanceId = useId();

  const toggleParcours = useCallback((id: ParcoursId) => {
    setExpandedId((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        requestAnimationFrame(() => {
          detailRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
      return next;
    });
  }, []);

  const devisParcoursHref = catalogueDemandeHref({
    formationOuParcours: 'Parcours métiers IA BTP',
    nature: 'devis',
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[80rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-14 lg:px-8">
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#377CF3]">
              {PARCOURS_METIERS_HERO.badge}
            </p>
            <h1 className="ofc-type-hero mt-5 max-w-xl text-balance text-[#081A3D]">
              {PARCOURS_METIERS_HERO.h1}
            </h1>
            <p className="ofc-type-lead mt-4 max-w-lg text-ofc-ink-muted">{PARCOURS_METIERS_HERO.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`#${PARCOURS_METIERS_SECTION.id}`}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Découvrir les parcours
              </Link>
              <CtaVisio
                src="parcours-metiers-hero"
                className="inline-flex min-h-11 items-center justify-center px-6 py-3"
              />
            </div>
          </div>
          <div className="relative min-h-[16rem] lg:min-h-[22rem]">
            <div className="absolute right-0 top-3 z-10 flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#081A3D] shadow-md">
              <MapPin className="h-3.5 w-3.5 text-[#377CF3]" aria-hidden />
              {PARCOURS_METIERS_HERO.lieuBadge}
            </div>
            <div className="relative h-full min-h-[16rem] overflow-hidden lg:min-h-[22rem] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
              <Image
                src={PARCOURS_METIERS_HERO.imageSrc}
                alt={PARCOURS_METIERS_HERO.imageAlt}
                fill
                priority
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section
        className="border-y border-[#DAE3F0] bg-[#EAF3FF]/60"
        aria-label="Points de confiance"
      >
        <ul className="mx-auto flex max-w-[80rem] list-none flex-col divide-y divide-[#DAE3F0] sm:flex-row sm:divide-x sm:divide-y-0 px-4 sm:px-6 lg:px-8">
          {PARCOURS_METIERS_TRUST.map((item) => {
            const Icon =
              item.id === 'qualiopi' ? Award : item.id === 'cas' ? Layers3 : CalendarClock;
            return (
              <li
                key={item.id}
                className="flex flex-1 items-start gap-3 px-0 py-4 sm:px-6 sm:py-5 first:sm:pl-0 last:sm:pr-0"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#377CF3] shadow-sm">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#081A3D]">{item.title}</p>
                  {item.detail ? (
                    <p className="mt-1 text-xs leading-relaxed text-ofc-ink-muted">{item.detail}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Grille parcours */}
      <section
        id={PARCOURS_METIERS_SECTION.id}
        className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] bg-white py-12 sm:py-14"
        aria-labelledby="parcours-metiers-grid-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <h2 id="parcours-metiers-grid-title" className={`${OFC_TYPE_H2} text-center text-[#081A3D]`}>
            {PARCOURS_METIERS_SECTION.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-ofc-ink-muted">
            {PARCOURS_METIERS_SECTION.subtitle}
          </p>

          <ul className="mt-10 grid list-none gap-5 lg:grid-cols-6 lg:gap-6">
            {parcours.map((p) => {
              const span = LAYOUT_SPAN[p.id] ?? 'lg:col-span-2';
              const horizontal = p.id === 'referent-ia-btp';
              const controlsId = `${listInstanceId}-detail-${p.id}`;
              const expanded = expandedId === p.id;

              return (
                <li key={p.id} id={p.id} className={`min-w-0 scroll-mt-28 ${span}`}>
                  <ParcoursMetierCard
                    parcours={p}
                    layout={horizontal ? 'horizontal' : 'vertical'}
                    expanded={expanded}
                    onToggle={() => toggleParcours(p.id)}
                    controlsId={controlsId}
                  />
                  {expanded ? (
                    <div
                      ref={(el) => {
                        detailRefs.current[p.id] = el;
                      }}
                      id={controlsId}
                      className="mt-4"
                    >
                      <ParcoursMetierDetailPanel parcours={p} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Documents métier */}
      <section
        className="bg-[#081A3D] py-12 sm:py-14"
        aria-labelledby="parcours-documents-metier-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <h2
            id="parcours-documents-metier-title"
            className={`${OFC_TYPE_H2} text-center text-white text-balance`}
          >
            Des formations centrées sur vos documents métier
          </h2>
          <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PARCOURS_DOCUMENTS_METIER.map((tile) => (
              <li key={tile.id}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[3/4]">
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#081A3D]/95 via-[#081A3D]/40 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm">
                      <tile.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="text-base font-semibold text-white">{tile.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-[#DAE3F0] bg-white py-12 sm:py-14" aria-labelledby="parcours-cta-final-title">
        <div className="mx-auto flex max-w-[80rem] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
          <div className="min-w-0 border-l-4 border-[#377CF3] pl-5">
            <h2 id="parcours-cta-final-title" className={`${OFC_TYPE_H2} text-[#081A3D] text-pretty`}>
              Construisons le parcours adapté à vos équipes
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ofc-ink-muted">
              <MapPin className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Présentiel en Île-de-France
            </p>
          </div>
          <Link
            href={devisParcoursHref}
            data-cta="devis"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 shrink-0 items-center justify-center px-8 py-3 text-base`}
            onClick={() => trackContactCtaClick('devis')}
          >
            Demander un programme ou un devis
          </Link>
        </div>
      </section>
    </>
  );
}
