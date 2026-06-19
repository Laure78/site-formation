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
  HardHat,
} from 'lucide-react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  CATALOGUE_FORMATIONS_COUNT,
  FORMATIONS_CATALOGUE,
  sortFormationsCatalogue,
} from '@/lib/formations-catalogue-display';
import { LaunchPriceBadge } from '@/components/formations/LaunchPriceBadge';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { TARIF_SESSION_AVANCE_HT, TARIF_SESSION_DEBUTANT_HT, formatTarifHt } from '@/lib/tarifs-sessions';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type ProfileId = 'debutant' | 'ao' | 'conduite' | 'claude';

const PROFILE_ICONS = {
  'NIV-01': BookOpen,
  'NIV-02': FileText,
  'NIV-03': HardHat,
  'NIV-04': Cpu,
} as const;

const PROFILE_IDS: Record<string, ProfileId> = {
  'NIV-01': 'debutant',
  'NIV-02': 'ao',
  'NIV-03': 'conduite',
  'NIV-04': 'claude',
};

const PROFILES = FORMATIONS_CATALOGUE.map((entry) => ({
  id: PROFILE_IDS[entry.ref],
  label: entry.title,
  short: entry.ref,
  icon: PROFILE_ICONS[entry.ref as keyof typeof PROFILE_ICONS],
  refs: [entry.ref],
}));

function FormationCard({
  cours,
  highlighted,
  cardRef,
}: {
  cours: FormationCatalogueEntry;
  highlighted: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
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
      <Link href={cours.href} className="relative block aspect-square w-full shrink-0 overflow-hidden bg-[#F1F5F9]">
        <Image
          src={visuel.src}
          alt={visuel.alt}
          title={'title' in visuel && typeof visuel.title === 'string' ? visuel.title : undefined}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${
            isDebutant
              ? 'bg-[#D1FAE5]/90 text-[#047857]'
              : 'bg-[#FED7AA]/90 text-[#C2410C]'
          }`}
        >
          {isDebutant ? 'DÉBUTANT' : 'AVANCÉ'}
        </span>
        <CataloguePriceBadge
          level={cours.level}
          launchPrice={cours.launchPrice}
          variant="overlay"
        />
      </Link>
      <div className="flex flex-1 flex-col border-t border-[#E2E8F0] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">
          RÉF {cours.ref} · {cours.level}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-semibold leading-snug text-[#0F172A]">
          <Link href={cours.href} className={OFC_LINK}>
            {cours.title}
          </Link>
        </h3>
        <p className="mt-2 text-base italic leading-snug text-[#475569]">{cours.pitch}</p>
        <CataloguePriceBadge
          level={cours.level}
          launchPrice={cours.launchPrice}
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
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#377CF3]">Objectifs pédagogiques</p>
        <ul className="mt-3 flex-1 space-y-2">
          {cours.objectifs.map((obj) => (
            <li key={obj} className="flex gap-2 text-sm leading-relaxed text-[#334155]">
              <Check size={16} className="mt-0.5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={cours.href}
            className={`${OFC_CTA_PRIMARY} gap-2 rounded-lg px-5 py-3 text-sm`}
          >
            Voir la fiche formation
            <ArrowRight size={18} aria-hidden />
          </Link>
          <a
            href={cours.programmePdfHref}
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-slate-300 bg-white px-5 py-3 text-center text-sm font-medium text-[#0F172A] transition hover:border-[#377CF3] hover:text-[#377CF3]"
          >
            Télécharger le programme (PDF)
          </a>
          <a
            href={intraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-[#377CF3] px-5 py-3 text-center text-sm font-medium text-[#377CF3] transition hover:bg-[#EFF6FF]"
          >
            Demander une session intra
          </a>
        </div>
      </div>
    </div>
  );
}

export function FormationsCatalogueInteractive({
  formations,
}: {
  formations: FormationCatalogueEntry[];
}) {
  const sorted = sortFormationsCatalogue(formations);
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
    const def = PROFILES.find((p) => p.id === id);
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
            Les {CATALOGUE_FORMATIONS_COUNT} parcours sont affichés ci-dessous — cliquez sur votre profil pour mettre en avant la fiche qui
            vous correspond.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILES.map((p) => {
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
                <span className="mt-3 block text-sm font-semibold leading-snug text-[#0F172A] sm:text-base">{p.label}</span>
                <span className="mt-1 block text-sm text-[#64748B]">{p.short}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="catalogue-formations-heading" className="space-y-5">
        <div className="text-center">
          <h2 id="catalogue-formations-heading" className="sr-only">
            Catalogue : {CATALOGUE_FORMATIONS_COUNT} formations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex rounded-full bg-[#D1FAE5] px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-[#047857]">
              Niveau 1 · {formatTarifHt(TARIF_SESSION_DEBUTANT_HT)} € HT / session · NIV-01
            </span>
            <span className="inline-flex rounded-full bg-[#FED7AA] px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-[#C2410C]">
              Niveau 2 · {formatTarifHt(TARIF_SESSION_AVANCE_HT)} € HT / session · NIV-02, NIV-03, NIV-04
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          {sorted.map((cours) => (
            <FormationCard
              key={cours.ref}
              cours={cours}
              highlighted={highlightedRefs.includes(cours.ref)}
              cardRef={setRef(cours.ref)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
