import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Check,
  ClipboardList,
  FileStack,
  HardHat,
  Layers,
  MapPin,
  ScrollText,
  Sparkles,
  BookOpen,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { FormateurShowcaseCard } from '@/components/formateurs/FormateurShowcaseCard';
import { RevealGroupShell, RevealShell } from '@/components/motion/RevealShell';
import { CONTACT } from '@/lib/constants';
import type { FormateurProfile } from '@/lib/formateurs';
import {
  FORMATEURS_INFO_STRIP,
  FORMATEURS_METIERS_SECTION,
  FORMATEURS_PAGE_HERO,
  FORMATEURS_PEDAGOGIE_SECTION,
  FORMATEURS_PRIMARY_CTA,
  FORMATEURS_RECRUTEMENT_BAND,
  FORMATEURS_TEAM_SECTION,
} from '@/lib/formateurs/page-content';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_BODY,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const ACCENT = 'text-[#377CF3]';
const INK = 'text-[#101936]';
const ORANGE_BAR = 'bg-[#F59E0B]';
const SOFT_BG = 'bg-[#F2F2F2]';
const STRIP_BG = 'bg-[#F8FAFC]';

const HERO_IMAGE = PHOTOS.formationsCatalogueHero2026;
const PEDAGOGIE_IMAGE = PHOTOS.accueilFormationIaBtpSallePresentiel2026;
const METIERS_BG_IMAGE = PHOTOS.accueilIaAppliqueeChantierBtp2026;
const RECRUTEMENT_IMAGE = PHOTOS.recrutementCandidatureFormateur2027;

const INFO_STRIP_ICONS: Record<(typeof FORMATEURS_INFO_STRIP)[number]['key'], LucideIcon> = {
  metier: HardHat,
  cas: ClipboardList,
  presentiel: Users,
  idf: MapPin,
};

const METIER_ICONS: Record<(typeof FORMATEURS_METIERS_SECTION.items)[number]['key'], LucideIcon> =
  {
    devis: FileStack,
    dce: ScrollText,
    conduite: HardHat,
    doc: ClipboardList,
    ia: Brain,
  };

const HERO_BADGE_ICONS: Record<(typeof FORMATEURS_PAGE_HERO.badges)[number]['key'], LucideIcon> =
  {
    expertise: Check,
    ia: Layers,
    idf: MapPin,
  };

function SectionTitleUnderline({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="text-center">
      <div className={`mx-auto mb-3 h-1 w-12 rounded-full ${ORANGE_BAR}`} aria-hidden />
      <h2 id={id} className={`${OFC_TYPE_H2} ${INK}`}>
        {children}
      </h2>
    </div>
  );
}

export function FormateursHeroSection() {
  const H = FORMATEURS_PAGE_HERO;

  return (
    <section
      className={`${ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })} formateurs-page-hero overflow-hidden`}
      aria-labelledby="formateurs-h1"
    >
      <div className={OFC_SECTION_INNER}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          <RevealShell className="min-w-0" as="div">
            <p
              className={`inline-block rounded-full bg-[#EAF3FF] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${INK}`}
            >
              {H.eyebrow}
            </p>
            <div className={`mt-4 h-1 w-10 rounded-full ${ORANGE_BAR}`} aria-hidden />
            <h1 id="formateurs-h1" className={`${OFC_TYPE_HERO} mt-3 text-pretty ${INK}`}>
              {H.titleBefore}
              <span className={ACCENT}>{H.titleHighlight}</span>
              {H.titleAfter}
            </h1>
            <p className={`${OFC_TYPE_BODY} mt-4 max-w-none text-ofc-ink-muted text-pretty`}>
              {H.intro}
            </p>

            <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              {H.badges.map(({ key, label }) => {
                const Icon = HERO_BADGE_ICONS[key];
                return (
                  <li
                    key={key}
                    className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold text-slate-700"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/12 text-[#377CF3] motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-105"
                      aria-hidden
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    {label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={H.primaryCtaHash}
                className={`${OFC_CTA_PRIMARY} motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:hover:scale-[1.02] inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold shadow-md shadow-[#377CF3]/20`}
              >
                <Users className="h-4 w-4 shrink-0" aria-hidden />
                {H.primaryCtaLabel}
              </Link>
              <Link
                href={LINKS.formations}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                <BookOpen className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                {H.secondaryCtaLabel}
              </Link>
            </div>
          </RevealShell>

          <RevealShell className="relative min-w-0 lg:pl-2" delay={80} as="figure">
            <div className="formateurs-hero-image relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-xl shadow-slate-300/30">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                className="aspect-[4/3] h-auto w-full object-cover lg:aspect-[5/4] lg:min-h-[340px]"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <figcaption className="absolute top-4 right-4 flex items-center gap-2 rounded-lg border border-white/90 bg-white/95 px-3 py-2 text-sm font-semibold text-[#101936] shadow-md backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#377CF3]" aria-hidden />
                {H.imageBadge}
              </figcaption>
            </div>
          </RevealShell>
        </div>
      </div>
    </section>
  );
}

export function FormateursInfoStrip() {
  return (
    <div className={`border-y border-slate-200/80 ${STRIP_BG}`}>
      <div className={`${OFC_SECTION_INNER} py-5 sm:py-6`}>
        <ul className="grid grid-cols-2 gap-4 sm:flex sm:items-stretch sm:justify-between sm:gap-0">
          {FORMATEURS_INFO_STRIP.map(({ label, key }, index) => {
            const Icon = INFO_STRIP_ICONS[key];
            const isLast = index === FORMATEURS_INFO_STRIP.length - 1;
            return (
              <li
                key={key}
                className={`flex min-w-0 items-center justify-center gap-3 px-3 py-1 text-center sm:flex-1 sm:px-5 ${
                  !isLast ? 'sm:border-r sm:border-slate-200' : ''
                }`}
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-[#377CF3] motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-110"
                  aria-hidden
                  strokeWidth={2}
                />
                <span className="text-sm font-semibold text-[#101936] sm:text-[15px]">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

type TeamSectionProps = {
  formateurs: readonly FormateurProfile[];
};

export function FormateursTeamSection({ formateurs }: TeamSectionProps) {
  const T = FORMATEURS_TEAM_SECTION;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="formateurs-team-heading"
    >
      <div className={OFC_SECTION_INNER}>
        <div
          id="formateurs-profiles"
          className="scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)] h-0 overflow-hidden"
          aria-hidden
        />
        <div id={T.id} className="scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]">
          <SectionTitleUnderline id="formateurs-team-heading">{T.heading}</SectionTitleUnderline>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600">
            {T.intro}
          </p>

          <ul className="mt-10 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {formateurs.map((f, index) => (
              <RevealShell
                key={f.id}
                as="li"
                id={f.slug}
                delay={index * 50}
                className="scroll-mt-[var(--site-header-height)] min-w-0"
              >
                <FormateurShowcaseCard formateur={f} portraitPriority={index < 4} />
              </RevealShell>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FormateursMetiersSection() {
  const M = FORMATEURS_METIERS_SECTION;

  return (
    <section
      className="relative overflow-hidden bg-[#101936] py-12 md:py-14"
      aria-labelledby="formateurs-metiers-heading"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52%,28rem)] lg:block">
        <Image
          src={METIERS_BG_IMAGE.src}
          alt=""
          width={METIERS_BG_IMAGE.width}
          height={METIERS_BG_IMAGE.height}
          className="h-full w-full object-cover object-center opacity-35"
          sizes="520px"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#101936] via-[#101936]/85 to-transparent"
          aria-hidden
        />
      </div>

      <div className={`${OFC_SECTION_INNER} relative`}>
        <div className="text-center">
          <div className={`mx-auto mb-3 h-1 w-12 rounded-full ${ORANGE_BAR}`} aria-hidden />
          <h2 id="formateurs-metiers-heading" className={`${OFC_TYPE_H2} text-white text-pretty`}>
            {M.heading}
          </h2>
        </div>

        <RevealGroupShell
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
          staggerMs={40}
        >
          {M.items.map(({ key, title, href }) => {
            const Icon = METIER_ICONS[key];
            return (
              <Link
                key={key}
                href={href}
                className="group flex min-h-[8.5rem] flex-col items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 p-4 text-center backdrop-blur-[2px] motion-safe:transition-[transform,background-color,border-color] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-white/35 motion-safe:hover:bg-white/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white motion-safe:transition-colors motion-safe:duration-200 motion-safe:group-hover:bg-white/15">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold leading-snug text-white">{title}</span>
              </Link>
            );
          })}
        </RevealGroupShell>
      </div>
    </section>
  );
}

export function FormateursPedagogieSection() {
  const P = FORMATEURS_PEDAGOGIE_SECTION;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="formateurs-pedagogie-heading"
    >
      <div className={OFC_SECTION_INNER}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
          <RevealShell
            className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/40"
            as="figure"
          >
            <Image
              src={PEDAGOGIE_IMAGE.src}
              alt={PEDAGOGIE_IMAGE.alt}
              width={PEDAGOGIE_IMAGE.width}
              height={PEDAGOGIE_IMAGE.height}
              className="aspect-[4/3] h-auto w-full object-cover lg:aspect-[5/4]"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </RevealShell>

          <RevealShell delay={60} className="min-w-0">
            <div className={`h-1 w-10 rounded-full ${ORANGE_BAR}`} aria-hidden />
            <h2
              id="formateurs-pedagogie-heading"
              className={`${OFC_TYPE_H2} mt-3 ${INK} text-pretty`}
            >
              {P.heading}
            </h2>
            <ul className="mt-6 space-y-4">
              {P.points.map((point) => (
                <li key={point} className="flex gap-3 text-base leading-relaxed text-slate-700">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-white"
                    aria-hidden
                  >
                    <Check className="h-4 w-4" strokeWidth={2.75} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-slate-600">{P.body}</p>
          </RevealShell>
        </div>
      </div>
    </section>
  );
}

export function FormateursPrimaryCtaSection() {
  const C = FORMATEURS_PRIMARY_CTA;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: false })}
      aria-labelledby="formateurs-primary-cta"
    >
      <div className={OFC_SECTION_INNER}>
        <RevealShell distance={12}>
          <div
            className={`flex flex-col gap-6 rounded-2xl border border-slate-200/80 ${SOFT_BG} px-6 py-8 sm:px-8 md:flex-row md:items-center md:gap-8 md:py-9 lg:gap-10`}
          >
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#377CF3] shadow-sm ring-1 ring-slate-200/80"
              aria-hidden
            >
              <CalendarDays className="h-7 w-7" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <h2
                id="formateurs-primary-cta"
                className="font-display text-xl font-bold text-pretty text-[#101936] md:text-2xl"
              >
                {C.heading}
              </h2>
              <p className="text-base leading-relaxed text-slate-600">{C.body}</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-block text-sm font-semibold text-[#377CF3] underline decoration-[#377CF3]/30 underline-offset-2 hover:decoration-[#377CF3]"
              >
                {CONTACT.email}
              </a>
            </div>
            <div className="shrink-0 md:self-center">
              <CtaVisio
                src={C.visioSrc}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border-0 bg-[#377CF3] px-6 py-3 text-center text-sm font-semibold text-white shadow-md shadow-[#377CF3]/25 hover:bg-[#2d6ad8] sm:w-auto sm:text-base"
              />
            </div>
          </div>
        </RevealShell>
      </div>
    </section>
  );
}

export function FormateursRecrutementBandSection() {
  const R = FORMATEURS_RECRUTEMENT_BAND;

  return (
    <section
      className={`border-t border-slate-200/80 ${STRIP_BG}`}
      aria-labelledby="formateurs-recrutement-band"
    >
      <div className={`${OFC_SECTION_INNER} py-10 md:py-12`}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <RevealShell className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 shadow-md" as="figure">
            <Image
              src={RECRUTEMENT_IMAGE.src}
              alt={RECRUTEMENT_IMAGE.alt}
              width={RECRUTEMENT_IMAGE.width}
              height={RECRUTEMENT_IMAGE.height}
              className="aspect-[4/3] h-auto w-full object-cover lg:aspect-[3/2]"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </RevealShell>

          <RevealShell delay={60} className="min-w-0">
            <div className={`h-1 w-10 rounded-full ${ORANGE_BAR}`} aria-hidden />
            <h2
              id="formateurs-recrutement-band"
              className={`${OFC_TYPE_H2} mt-3 ${INK} text-pretty`}
            >
              {R.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{R.body}</p>
            <Link
              href={LINKS.nousRejoindre}
              className={`${OFC_CTA_PRIMARY} mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold sm:w-auto`}
            >
              {R.ctaLabel}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </RevealShell>
        </div>
      </div>
    </section>
  );
}
