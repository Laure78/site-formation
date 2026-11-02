import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Brain,
  Briefcase,
  Check,
  ClipboardList,
  FileStack,
  HardHat,
  Layers,
  MapPin,
  ScrollText,
  Sparkles,
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
const SOFT_BG = 'bg-[#EAF3FF]';

const HERO_IMAGE = PHOTOS.formationsCatalogueHero2026;
const PEDAGOGIE_IMAGE = PHOTOS.accueilFormationIaBtpSallePresentiel2026;

const INFO_STRIP_ICONS: Record<(typeof FORMATEURS_INFO_STRIP)[number]['key'], LucideIcon> = {
  metier: Briefcase,
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
      <h2 id={id} className={`${OFC_TYPE_H2} ${INK}`}>
        {children}
      </h2>
      <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />
    </div>
  );
}

export function FormateursHeroSection() {
  const H = FORMATEURS_PAGE_HERO;

  return (
    <section
      className={`${ofcSectionClasses({ tone: 'white', size: 'compact', mesh: true })} formateurs-page-hero`}
      aria-labelledby="formateurs-h1"
    >
      <div className={OFC_SECTION_INNER}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          <RevealShell className="min-w-0" as="div">
            <p
              className={`inline-block rounded-full ${SOFT_BG} px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${INK}`}
            >
              {H.eyebrow}
            </p>
            <h1 id="formateurs-h1" className={`${OFC_TYPE_HERO} mt-4 text-pretty ${INK}`}>
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
                  <li key={key} className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold text-slate-700">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/12 text-[#377CF3]"
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
                className={`${OFC_CTA_PRIMARY} motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                {H.primaryCtaLabel}
                <span aria-hidden> →</span>
              </Link>
              <Link
                href={LINKS.formations}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                {H.secondaryCtaLabel}
              </Link>
            </div>
          </RevealShell>

          <RevealShell className="relative min-w-0" delay={80} as="figure">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-lg shadow-slate-200/40">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                className="aspect-[4/3] h-auto w-full object-cover lg:aspect-auto lg:min-h-[320px]"
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
    <div className={`border-y border-[#377CF3]/10 ${SOFT_BG}`}>
      <div className={`${OFC_SECTION_INNER} py-4 sm:py-5`}>
        <ul className="grid grid-cols-2 gap-y-4 sm:flex sm:items-center sm:justify-between sm:gap-0">
          {FORMATEURS_INFO_STRIP.map(({ label, key }, index) => {
            const Icon = INFO_STRIP_ICONS[key];
            const isLast = index === FORMATEURS_INFO_STRIP.length - 1;
            return (
              <li
                key={key}
                className={`flex min-w-0 items-center justify-center gap-2.5 px-2 text-center sm:flex-1 sm:px-4 ${
                  !isLast ? 'sm:border-r sm:border-[#377CF3]/15' : ''
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                <span className="text-sm font-semibold text-[#101936]">{label}</span>
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

          <ul className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formateurs.map((f, index) => (
              <RevealShell
                key={f.id}
                as="li"
                id={f.slug}
                delay={index * 50}
                className="scroll-mt-[var(--site-header-height)] min-w-0"
              >
                <FormateurShowcaseCard formateur={f} portraitPriority={index < 2} />
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
      className={`${ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })} ${SOFT_BG}`}
      aria-labelledby="formateurs-metiers-heading"
    >
      <div className={OFC_SECTION_INNER}>
        <SectionTitleUnderline id="formateurs-metiers-heading">{M.heading}</SectionTitleUnderline>

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
                className="group flex min-h-[7.5rem] flex-col items-center justify-center gap-3 rounded-xl border border-slate-200/90 bg-white p-4 text-center shadow-sm motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#377CF3]/30 motion-safe:hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3] motion-safe:transition-colors motion-safe:group-hover:bg-[#377CF3]/15">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold leading-snug text-[#101936]">{title}</span>
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
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <RevealShell className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 shadow-md" as="figure">
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
            <h2 id="formateurs-pedagogie-heading" className={`${OFC_TYPE_H2} ${INK} text-pretty`}>
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
          <div className="relative overflow-hidden rounded-2xl bg-[#101936] px-6 py-8 text-white sm:px-8 md:px-10 md:py-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 85% 0%, rgba(55,124,243,0.35), transparent 55%)',
              }}
              aria-hidden
            />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_auto] lg:items-center lg:gap-6 xl:gap-10">
              <h2
                id="formateurs-primary-cta"
                className="font-display text-xl font-bold text-pretty md:text-2xl lg:max-w-sm"
              >
                {C.heading}
              </h2>
              <p className="text-base leading-relaxed text-white/85 lg:max-w-md">{C.body}</p>
              <div className="flex flex-col items-start gap-3 lg:items-end lg:justify-self-end">
                <CtaVisio
                  src={C.visioSrc}
                  className="inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-5 py-3 text-center text-sm font-semibold text-[#377CF3] shadow-md hover:bg-slate-100 sm:w-auto sm:text-base"
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm font-semibold text-white/90 underline decoration-white/40 underline-offset-2 hover:text-white hover:decoration-white"
                >
                  {CONTACT.email}
                </a>
              </div>
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
      className={`border-t border-[#377CF3]/10 ${SOFT_BG}`}
      aria-labelledby="formateurs-recrutement-band"
    >
      <div className={`${OFC_SECTION_INNER} py-8 md:py-10`}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-8">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#377CF3]/12 text-[#377CF3]"
              aria-hidden
            >
              <Users className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <h2 id="formateurs-recrutement-band" className={`${OFC_TYPE_H2} ${INK} text-pretty`}>
              {R.heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:max-w-md">{R.body}</p>
          <Link
            href={LINKS.nousRejoindre}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold lg:w-auto lg:justify-self-end`}
          >
            {R.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
