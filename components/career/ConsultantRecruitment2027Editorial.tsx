import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  Briefcase,
  Building2,
  Calculator,
  ClipboardList,
  HardHat,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  DEVENEZ_CONSULTANT_BTP_REQUIREMENT,
  DEVENEZ_CONSULTANT_COMPETENCES,
  DEVENEZ_CONSULTANT_MISSION,
  DEVENEZ_CONSULTANT_MODALITES,
  DEVENEZ_CONSULTANT_PROFILS,
} from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

const PROFIL_ICONS: LucideIcon[] = [HardHat, Calculator, Building2, ClipboardList];
const COMPETENCE_ICONS: LucideIcon[] = [Sparkles, ShieldCheck, Lock, Users];
const MODALITE_ICONS: LucideIcon[] = [Briefcase, MapPin, ClipboardList];

const MISSION_IMAGE = PHOTOS.recrutementFormateursMissionIaBtp2027;

function SectionShell({
  tone,
  children,
  labelledBy,
}: {
  tone: 'white' | 'muted';
  children: ReactNode;
  labelledBy: string;
}) {
  return (
    <section
      className={ofcSectionClasses({ tone, size: 'compact', divide: true })}
      aria-labelledby={labelledBy}
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>{children}</div>
    </section>
  );
}

export function ConsultantRecruitmentBtpRequirementSection() {
  const R = DEVENEZ_CONSULTANT_BTP_REQUIREMENT;

  return (
    <SectionShell tone="muted" labelledBy="btp-requirement-heading">
      <div
        className={`rounded-xl border border-[#377CF3]/20 bg-white px-5 py-6 sm:px-7 sm:py-7 ${DEVENEZ_CONSULTANT_PROSE}`}
      >
        <h2 id="btp-requirement-heading" className={OFC_TYPE_H2}>
          {R.heading}
        </h2>
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-900">{R.lead}</p>
        {R.body.map((paragraph) => (
          <p key={paragraph} className="mt-3 text-base leading-relaxed text-slate-700">
            {paragraph}
          </p>
        ))}
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3.5">
          <p className="text-base font-semibold text-slate-900">{R.reassuranceTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{R.reassuranceBody}</p>
        </div>
      </div>
    </SectionShell>
  );
}

export function ConsultantRecruitmentProfilsSection() {
  const P = DEVENEZ_CONSULTANT_PROFILS;

  return (
    <SectionShell tone="white" labelledBy="profils-recherches">
      <h2
        id="profils-recherches"
        className={`${OFC_TYPE_H2} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      >
        {P.heading}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {P.cards.map((card, index) => {
          const Icon = PROFIL_ICONS[index] ?? HardHat;
          return (
            <li
              key={card.title}
              className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40"
            >
              <Icon className="h-7 w-7 text-[#377CF3]" aria-hidden />
              <h3 className={`${OFC_TYPE_H3} mt-3 text-lg`}>{card.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-600">
                {card.roles.map((role) => (
                  <li key={role} className="flex gap-2">
                    <span className="text-[#377CF3]" aria-hidden>
                      ·
                    </span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className={`mt-5 text-sm leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
        {P.footnote}
      </p>
    </SectionShell>
  );
}

export function ConsultantRecruitmentMissionSection() {
  const M = DEVENEZ_CONSULTANT_MISSION;

  return (
    <SectionShell tone="muted" labelledBy="mission-formateur-heading">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,20rem)] lg:items-start lg:gap-8">
        <div className="min-w-0">
          <h2 id="mission-formateur-heading" className={OFC_TYPE_H2}>
            {M.heading}
          </h2>
          <p className={`mt-3 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
            {M.intro}
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {M.domains.map((domain) => (
              <li
                key={domain.num}
                className="rounded-lg border border-slate-200/90 bg-white p-4 sm:p-5"
              >
                <span
                  className="font-display text-sm font-bold tracking-wide text-[#377CF3]"
                  aria-hidden
                >
                  {domain.num}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-slate-900">
                  {domain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{domain.body}</p>
              </li>
            ))}
          </ol>
          <p className={`mt-5 text-base font-medium leading-relaxed text-slate-800 ${DEVENEZ_CONSULTANT_PROSE}`}>
            {M.conclusion}
          </p>
        </div>
        <figure className="relative mt-6 overflow-hidden rounded-xl border border-slate-200 lg:mt-2">
          <Image
            src={MISSION_IMAGE.src}
            alt={MISSION_IMAGE.alt}
            width={MISSION_IMAGE.width}
            height={MISSION_IMAGE.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </figure>
      </div>
    </SectionShell>
  );
}

export function ConsultantRecruitmentCompetencesSection() {
  const C = DEVENEZ_CONSULTANT_COMPETENCES;

  return (
    <SectionShell tone="white" labelledBy="competences-attendues-heading">
      <h2 id="competences-attendues-heading" className={OFC_TYPE_H2}>
        {C.heading}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {C.items.map((item, index) => {
          const Icon = COMPETENCE_ICONS[index] ?? Sparkles;
          return (
            <li
              key={item.title}
              className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50/40 p-4 sm:p-5"
            >
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#377CF3]" aria-hidden />
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}

export function ConsultantRecruitmentModalitesSection() {
  const M = DEVENEZ_CONSULTANT_MODALITES;

  return (
    <SectionShell tone="muted" labelledBy="modalites-collaboration-heading">
      <h2 id="modalites-collaboration-heading" className={OFC_TYPE_H2}>
        {M.heading}
      </h2>
      <ol className="mt-5 grid gap-3 md:grid-cols-3">
        {M.items.map((item, index) => {
          const Icon = MODALITE_ICONS[index] ?? Briefcase;
          return (
            <li
              key={item.title}
              className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-[#377CF3]" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
              </div>
              <h3 className="mt-2 font-display text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          );
        })}
      </ol>
      <p className={`mt-5 text-sm leading-relaxed text-slate-700 ${DEVENEZ_CONSULTANT_PROSE}`}>
        {M.footnote}
      </p>
    </SectionShell>
  );
}
