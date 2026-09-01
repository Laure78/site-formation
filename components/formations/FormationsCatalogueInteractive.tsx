'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Cpu,
  FileText,
  Users,
  Code2,
  HardHat,
  Landmark,
} from 'lucide-react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  FORMATIONS_CATALOGUE,
  catalogueNiveauLabel,
  catalogueNiveauEtLevel,
  sortFormationsCatalogue,
} from '@/lib/formations-catalogue-display';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import { FormationCatalogueTitle } from '@/components/formations/FormationCatalogueTitle';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { libelleTarifsCarteCatalogue } from '@/lib/tarifs-sessions';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type ProfileId = 'debutant' | 'ao' | 'conduite' | 'claude' | 'moe' | 'applications-metier';

const PROFILE_ICONS = {
  'NIV-01': BookOpen,
  'NIV-02': FileText,
  'NIV-03': HardHat,
  'NIV-04': Cpu,
  'NIV-05': Landmark,
  'NIV-06': Code2,
  'NIV-07': Code2,
  'NIV-08': Code2,
} as const;

const PROFILE_IDS: Record<string, ProfileId> = {
  'NIV-01': 'debutant',
  'NIV-02': 'ao',
  'NIV-03': 'conduite',
  'NIV-04': 'claude',
  'NIV-05': 'moe',
  'NIV-06': 'applications-metier',
  'NIV-07': 'applications-metier',
  'NIV-08': 'applications-metier',
};

function buildProfiles(formations: FormationCatalogueEntry[]) {
  return formations.map((entry) => ({
    id: PROFILE_IDS[entry.ref],
    label: entry.title,
    short: catalogueNiveauLabel(entry.ref),
    icon: PROFILE_ICONS[entry.ref as keyof typeof PROFILE_ICONS],
    refs: [entry.ref],
  }));
}

function FormationCard({
  cours,
  highlighted,
  cardRef,
}: {
  cours: FormationCatalogueEntry;
  highlighted: boolean;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const visuel = cours.visuel;
  const intraUrl = calendlyCatalogueUrl(`intra-${cours.slug}`);
  const isDebutant = cours.level === 'DÉBUTANT';

  return (
    <div
      ref={cardRef}
      id={`formation-card-${cours.ref}`}
      className={`${OFC_CARD} flex flex-col overflow-hidden rounded-[20px] ${
        highlighted ? 'ring-2 ring-[#377CF3] ring-offset-2' : ''
      }`}
    >
      <Link
        href={cours.href}
        className="relative block w-full shrink-0 border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-4"
      >
        <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden sm:max-w-[220px] md:max-w-[240px]">
          <Image
            src={visuel.src}
            alt={visuel.alt}
            title={'title' in visuel && typeof visuel.title === 'string' ? visuel.title : undefined}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 200px, 240px"
          
            quality={70}
            loading="lazy"/>
          <span
            className={`absolute right-0 top-0 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs ${
              isDebutant
                ? 'bg-[#D1FAE5]/90 text-[#047857]'
                : 'bg-[#FED7AA]/90 text-[#C2410C]'
            }`}
          >
            {isDebutant ? 'DÉBUTANT' : 'AVANCÉ'}
          </span>
          <CataloguePriceBadge
            level={cours.level}
            duree={cours.duree}
            labelOverride={cours.tarifParcoursLabel}
            variant="overlay"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col border-t border-[#E2E8F0] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">
          {catalogueNiveauEtLevel(cours.ref, cours.level)}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-semibold leading-snug text-[#0F172A]">
          <FormationCatalogueTitle entry={cours} />
        </h3>
        <p className="mt-2 text-base leading-snug text-[#475569]">{cours.promesse}</p>
        <CataloguePriceBadge
          level={cours.level}
          duree={cours.duree}
          labelOverride={cours.tarifParcoursLabel}
          variant="banner"
          className="mt-4"
        />
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#475569]">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={16} className="shrink-0 text-[#377CF3]" aria-hidden />
            {cours.duree}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={16} className="shrink-0 text-[#377CF3]" aria-hidden />
            {cours.effectif}
          </span>
        </div>
        <hr className="my-5 border-[#E2E8F0]" />
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#377CF3]">Cas d&apos;usage</p>
        <ul className="mt-3 flex-1 space-y-2">
          {cours.casUsageCourts.map((useCase) => (
            <li key={useCase} className="flex gap-2 text-sm leading-relaxed text-[#334155]">
              <Check size={16} className="mt-0.5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={cours.href}
            className={`${OFC_CTA_PRIMARY} gap-2 rounded-lg px-5 py-3 text-sm`}
          >
            Découvrir la formation
            <ArrowRight size={18} aria-hidden />
          </Link>
          <a
            href={intraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#377CF3] px-5 py-3 text-center text-sm font-medium text-[#377CF3] transition hover:bg-[#EFF6FF]"
          >
            Parler de votre besoin
          </a>
        </div>
      </div>
    </div>
  );
}

/** Grille des cartes catalogue — source unique (effectifs, tarifs, liens fiches). */
export function FormationsCatalogueCards({
  formations = FORMATIONS_CATALOGUE,
  highlightedRefs = [],
  setCardRef,
}: {
  formations?: FormationCatalogueEntry[];
  highlightedRefs?: string[];
  setCardRef?: (ref: string) => (el: HTMLDivElement | null) => void;
}) {
  const sorted = sortFormationsCatalogue(formations);
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-2">
      {sorted.map((cours) => (
        <FormationCard
          key={cours.ref}
          cours={cours}
          highlighted={highlightedRefs.includes(cours.ref)}
          cardRef={setCardRef?.(cours.ref)}
        />
      ))}
    </div>
  );
}

export function FormationsCatalogueInteractive({
  formations,
  catalogueCount = formations.length,
}: {
  formations: FormationCatalogueEntry[];
  catalogueCount?: number;
}) {
  const profiles = buildProfiles(formations);
  const refsMap = useRef<Record<string, HTMLDivElement | null>>({});
  const setRef = useCallback((ref: string) => (el: HTMLDivElement | null) => {
    refsMap.current[ref] = el;
  }, []);

  const [activeProfile, setActiveProfile] = useState<ProfileId>('debutant');
  const [highlightedRefs, setHighlightedRefs] = useState<string[]>([]);

  useEffect(() => {
    if (highlightedRefs.length === 0) return;
    const t = window.setTimeout(() => setHighlightedRefs([]), 2000);
    return () => window.clearTimeout(t);
  }, [highlightedRefs]);

  const applyProfile = (id: ProfileId) => {
    setActiveProfile(id);
    const def = profiles.find((p) => p.id === id);
    if (!def || def.refs.length === 0) {
      setHighlightedRefs([]);
      return;
    }
    setHighlightedRefs(def.refs);
    const first = def.refs[0];
    const el = refsMap.current[first];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      <section aria-labelledby="parcours-guide-heading" className="space-y-4">
        <div className="text-center">
          <h2
            id="parcours-guide-heading"
            className="font-display text-2xl font-bold leading-tight text-[#0F172A] sm:text-[1.65rem] md:text-[1.75rem]"
          >
            Quelle formation choisir ?
          </h2>
          <p className="mt-2 text-sm text-[#64748B] sm:text-base">
            Les {catalogueCount} parcours sont affichés ci-dessous — cliquez sur votre profil pour mettre en avant la fiche qui
            vous correspond.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {profiles.map((p) => {
            const Icon = p.icon;
            const isActive = activeProfile === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyProfile(p.id)}
                className={`${OFC_CARD} flex flex-col items-center rounded-xl p-4 text-center sm:p-5 ${
                  isActive ? 'border-[#377CF3] shadow-md' : ''
                }`}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#377CF3] sm:h-11 sm:w-11"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="mt-3 block text-xs font-semibold leading-snug text-[#0F172A] sm:text-sm xl:text-[0.8125rem]">{p.label}</span>
                <span className="mt-1 block text-sm text-[#64748B]">{p.short}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="catalogue-formations-heading" className="space-y-5">
        <div className="text-center">
          <h2 id="catalogue-formations-heading" className="sr-only">
            Catalogue : {catalogueCount} formations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(() => {
              const tarifs = libelleTarifsCarteCatalogue(4);
              return (
                <>
                  <span className="inline-flex rounded-full bg-[#EFF6FF] px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-[#1E40AF]">
                    Intra : {tarifs.intra}
                    <MentionTvaAsterisque />
                  </span>
                  <span className="inline-flex rounded-full bg-[#D1FAE5] px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-[#047857]">
                    Inter : {tarifs.inter}
                    <MentionTvaAsterisque />
                  </span>
                </>
              );
            })()}
          </div>
        </div>
        <FormationsCatalogueCards
          formations={formations}
          highlightedRefs={highlightedRefs}
          setCardRef={setRef}
        />
      </section>
    </div>
  );
}
