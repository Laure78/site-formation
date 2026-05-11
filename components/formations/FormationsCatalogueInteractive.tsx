'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Euro,
  FileText,
  Users,
} from 'lucide-react';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { sortFormationsCatalogue, tarifLabel } from '@/lib/formations-catalogue-display';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { TARIF_SESSION_AVANCE_HT, TARIF_SESSION_DEBUTANT_HT } from '@/lib/tarifs-sessions';

type ProfileId = 'debutant' | 'ao';

const PROFILES: {
  id: ProfileId;
  label: string;
  short: string;
  icon: typeof BookOpen;
  refs: string[];
}[] = [
  {
    id: 'debutant',
    label: 'Niveau 1 — bâtiment & travaux publics',
    short: 'NIV-01',
    icon: BookOpen,
    refs: ['NIV-01'],
  },
  {
    id: 'ao',
    label: 'Niveau 2 — appels d’offre BTP',
    short: 'NIV-02',
    icon: FileText,
    refs: ['NIV-02'],
  },
];

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
      className={`flex flex-col overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        highlighted ? 'ring-2 ring-[#377CF3] ring-offset-2' : ''
      }`}
    >
      <Link href={cours.href} className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#F1F5F9]">
        <Image
          src={visuel.src}
          alt={visuel.alt}
          fill
          className="object-cover"
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
      </Link>
      <div className="flex flex-1 flex-col border-t border-[#E2E8F0] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">
          RÉF {cours.ref} · {cours.level}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-semibold leading-snug text-[#0F172A]">
          <Link href={cours.href} className="hover:text-[#377CF3]">
            {cours.title}
          </Link>
        </h3>
        <p className="mt-2 text-base italic leading-snug text-[#475569]">{cours.pitch}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#475569]">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={16} className="shrink-0 text-[#377CF3]" aria-hidden />
            {cours.duree}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={16} className="shrink-0 text-[#377CF3]" aria-hidden />
            {cours.effectif}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#334155]">
            <Euro size={16} className="shrink-0 text-[#377CF3]" aria-hidden />
            {tarifLabel(cours.level)}
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
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[#2563EB]"
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
  const debutants = sorted.filter((c) => c.level === 'DÉBUTANT');
  const avances = sorted.filter((c) => c.level === 'AVANCÉ');

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

  const renderGroup = (badge: ReactNode, list: FormationCatalogueEntry[]) => (
    <div className="space-y-6">
      <div className="flex justify-center">{badge}</div>
        <div className="grid gap-8 sm:grid-cols-2">
        {list.map((cours) => (
          <FormationCard
            key={cours.ref}
            cours={cours}
            highlighted={highlightedRefs.includes(cours.ref)}
            cardRef={setRef(cours.ref)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-20 lg:space-y-24">
      <section aria-labelledby="parcours-guide-heading" className="space-y-6">
        <div className="text-center">
          <h2
            id="parcours-guide-heading"
            className="font-display text-[32px] font-bold leading-tight text-[#0F172A]"
          >
            Quelle formation choisir ?
          </h2>
          <p className="mt-3 text-lg text-[#64748B]">
            Cliquez sur votre profil pour voir les formations recommandées
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {PROFILES.map((p) => {
            const Icon = p.icon;
            const isActive = activeProfile === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyProfile(p.id)}
                className={`flex flex-col items-center rounded-2xl border p-6 text-center transition duration-200 ${
                  isActive
                    ? 'border-[#377CF3] bg-white shadow-md'
                    : 'border-[#E2E8F0] bg-white shadow-sm hover:-translate-y-0.5 hover:border-[#377CF3] hover:shadow-md'
                }`}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#377CF3]"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="mt-4 block text-base font-semibold text-[#0F172A]">{p.label}</span>
                <span className="mt-1 block text-sm text-[#64748B]">{p.short}</span>
              </button>
            );
          })}
        </div>
      </section>

      {renderGroup(
        <span className="inline-flex rounded-full bg-[#D1FAE5] px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-[#047857]">
          Niveau débutant · {TARIF_SESSION_DEBUTANT_HT} € HT / session
        </span>,
        debutants
      )}
      {renderGroup(
        <span className="inline-flex rounded-full bg-[#FED7AA] px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-[#C2410C]">
          Niveau avancé · {TARIF_SESSION_AVANCE_HT} € HT / session
        </span>,
        avances
      )}
    </div>
  );
}
