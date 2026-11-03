import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Calendar,
  Check,
  ClipboardCheck,
  FileStack,
  HardHat,
  Info,
  Laptop,
  Mail,
  MapPin,
  Monitor,
  ScrollText,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import {
  CONSULTANT_COMPETENCES_RECHERCHEES,
  NOUS_REJOINDRE_CANDIDATURE_PATHS,
  NOUS_REJOINDRE_COMPETENCES,
  NOUS_REJOINDRE_CONVERSION,
  NOUS_REJOINDRE_FORMATEUR_HERO,
  NOUS_REJOINDRE_INFO_STRIP,
  NOUS_REJOINDRE_LANDING_PROFILS,
  NOUS_REJOINDRE_MISSION_LANDING,
  NOUS_REJOINDRE_MODALITES,
  NOUS_REJOINDRE_PROFILS,
} from '@/lib/consultant-recruitment-content';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_BODY,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

const H = NOUS_REJOINDRE_FORMATEUR_HERO;
const HERO_IMAGE = PHOTOS.recrutementFormateursIaBtpHero2027;
const MISSION_BG = PHOTOS.recrutementFormateursMissionIaBtp2027;

const RECRUITMENT_ACCENT = 'text-[#377CF3]';
const RECRUITMENT_SOFT_BG = 'bg-[#EAF3FF]';
const RECRUITMENT_INK = 'text-[#101936]';

const HERO_HIGHLIGHT_ICONS: Record<(typeof H.heroHighlights)[number]['key'], LucideIcon> = {
  lieu: MapPin,
  modalite: Monitor,
  remuneration: Wallet,
};

const INFO_STRIP_ICONS: Record<(typeof NOUS_REJOINDRE_INFO_STRIP)[number]['key'], LucideIcon> = {
  missions: Briefcase,
  catalogue: Calendar,
  presentiel: Users,
  idf: MapPin,
};

const PROFIL_CARD_ICONS = [HardHat, FileStack, Users, Laptop] as const;

const MISSION_FEATURED_ICONS: Record<
  (typeof NOUS_REJOINDRE_MISSION_LANDING.featuredApplications)[number]['key'],
  LucideIcon
> = {
  devis: FileStack,
  dce: ScrollText,
  cr: ClipboardCheck,
};

const MODALITE_ICONS = [UserCheck, MapPin, Building2, Calendar] as const;

function photoForKey(key: keyof typeof PHOTOS) {
  return PHOTOS[key];
}

function SectionTitleUnderline({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="text-center">
      <h2 id={id} className={`${OFC_TYPE_H2} ${RECRUITMENT_INK}`}>
        {children}
      </h2>
      <div
        className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]"
        aria-hidden
      />
    </div>
  );
}

function CandidatureConversionRow({ className = '' }: { className?: string }) {
  const mailto = formateurRecruitmentMailtoHref();
  return (
    <div
      className={`flex flex-col items-stretch gap-4 rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:px-6 ${className}`}
    >
      <Link
        href={LINKS.nousRejoindreCandidatureFormateur}
        className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold sm:flex-none motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02]`}
      >
        {NOUS_REJOINDRE_CONVERSION.ctaLabel}
        <span aria-hidden> →</span>
      </Link>
      <span className="hidden h-8 w-px shrink-0 bg-slate-200 sm:block" aria-hidden />
      <a
        href={mailto}
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 text-base font-semibold text-slate-800 underline-offset-4 hover:text-[#377CF3] hover:underline sm:flex-none"
      >
        <Mail className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
        {RECRUITMENT.email}
      </a>
    </div>
  );
}

export function NousRejoindreHeroSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: true })}
      aria-labelledby="nous-rejoindre-formateur-h1"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          <div className="min-w-0">
            <p
              className={`inline-block rounded-md ${RECRUITMENT_SOFT_BG} px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#101936]`}
            >
              {H.eyebrow}
            </p>
            <h1
              id="nous-rejoindre-formateur-h1"
              className={`${OFC_TYPE_HERO} mt-4 text-pretty ${RECRUITMENT_INK}`}
            >
              Vous connaissez le BTP et utilisez <span className={RECRUITMENT_ACCENT}>l’IA</span>{' '}
              ?
            </h1>
            <p className={`${OFC_TYPE_BODY} mt-4 max-w-none text-ofc-ink-muted text-pretty`}>
              {H.intro}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#377CF3]/25 bg-[#377CF3]/10 px-4 py-2 text-sm font-semibold text-[#101936]">
              <Check className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              {H.experienceBadge}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {H.heroHighlights.map(({ label, key }) => {
                const Icon = HERO_HIGHLIGHT_ICONS[key];
                return (
                  <li
                    key={key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
                  >
                    <Icon className="h-3.5 w-3.5 text-slate-500" aria-hidden />
                    {label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={LINKS.nousRejoindreCandidatureFormateur}
                className={`${OFC_CTA_PRIMARY} motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                {H.primaryCtaLabel}
                <span aria-hidden> →</span>
              </Link>
              <a
                href="#profils-recherches"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                {H.secondaryCtaLabel}
              </a>
            </div>
          </div>

          <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-lg shadow-slate-200/40">
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
          </figure>
        </div>
      </div>
    </section>
  );
}

export function NousRejoindreInfoStrip() {
  return (
    <div className={`border-y border-[#377CF3]/10 ${RECRUITMENT_SOFT_BG}`}>
      <div className={`${RECRUITMENT_PAGE_INNER} py-4 sm:py-5`}>
        <ul className="grid grid-cols-2 gap-y-4 sm:flex sm:items-center sm:justify-between sm:gap-0">
          {NOUS_REJOINDRE_INFO_STRIP.map(({ label, key }, index) => {
            const Icon = INFO_STRIP_ICONS[key];
            const isLast = index === NOUS_REJOINDRE_INFO_STRIP.length - 1;
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

export function NousRejoindreProfilsSection() {
  const P = NOUS_REJOINDRE_LANDING_PROFILS;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="profils-recherches-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <div
          id="profils-recherches"
          className="scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]"
        >
          <SectionTitleUnderline id="profils-recherches-heading">{P.heading}</SectionTitleUnderline>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600">
            {P.subtitle}
          </p>
        </div>
        <ul className="mt-8 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {P.cards.map((card, index) => {
            const Icon = PROFIL_CARD_ICONS[index] ?? HardHat;
            const photo = photoForKey(card.photoKey);
            return (
              <li
                key={card.title}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:shadow-md"
              >
                <div className="flex flex-1 flex-col p-5 pb-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${RECRUITMENT_SOFT_BG}`}
                  >
                    <Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                  </span>
                  <h3 className={`mt-3 font-display text-lg font-bold ${RECRUITMENT_INK}`}>
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-slate-600">{card.description}</p>
                </div>
                <div className="relative mt-auto aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-center text-sm leading-relaxed text-slate-600">{P.extraNote}</p>
      </div>
    </section>
  );
}

export function NousRejoindreMissionSection() {
  const M = NOUS_REJOINDRE_MISSION_LANDING;

  return (
    <section
      className={`${ofcSectionClasses({ tone: 'soft', size: 'compact', divide: true })} relative overflow-hidden ${RECRUITMENT_SOFT_BG}`}
      aria-labelledby="mission-formateur-landing"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
      >
        <Image
          src={MISSION_BG.src}
          alt=""
          aria-hidden
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className={`${RECRUITMENT_PAGE_INNER} relative`}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(240px,34%)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="min-w-0 lg:pt-2">
            <h2 id="mission-formateur-landing" className={`font-display text-2xl font-bold leading-tight sm:text-3xl ${RECRUITMENT_INK} text-balance`}>
              Votre mission : transmettre{' '}
              <span className={RECRUITMENT_ACCENT}>l’IA</span> appliquée au BTP
            </h2>
            <div className="mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />
            <p className="mt-4 text-base leading-relaxed text-slate-600">{M.intro}</p>
          </div>
          <ul className="grid min-w-0 gap-3 sm:grid-cols-3">
            {M.featuredApplications.map(({ title, key }) => {
              const Icon = MISSION_FEATURED_ICONS[key];
              return (
                <li
                  key={key}
                  className="flex min-h-[88px] flex-col justify-center gap-2 rounded-xl border border-white/90 bg-white p-4 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                  <span className="text-sm font-semibold leading-snug text-[#101936]">{title}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-6 text-sm font-medium text-slate-700">
          Autres usages métier de l’IA en formation :{' '}
          <span className="font-normal text-slate-600">{M.otherUsages.join(' · ')}</span>
        </p>

        <CandidatureConversionRow className="mt-8" />
      </div>
    </section>
  );
}

export function NousRejoindreCompetencesSection() {
  const C = NOUS_REJOINDRE_COMPETENCES;
  const condition = NOUS_REJOINDRE_PROFILS;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="competences-attendues-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <SectionTitleUnderline id="competences-attendues-heading">
          Compétences et conditions
        </SectionTitleUnderline>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600">
          Expérience métier, pratique de l’IA et cadre des missions indépendantes en présentiel.
        </p>

        <div className="mt-10 grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="font-display text-lg font-bold text-[#101936]">Critères recherchés</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-1">
              {CONSULTANT_COMPETENCES_RECHERCHEES.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-700"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{condition.conditionLead}</p>
            <div className="mt-4 flex gap-3 rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 px-4 py-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-[#101936]">{C.reassuranceTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{C.reassuranceBody}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-[#101936]">Modalités</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {NOUS_REJOINDRE_MODALITES.map((item, index) => {
                const Icon = MODALITE_ICONS[index] ?? Briefcase;
                return (
                  <li
                    key={item.title}
                    className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-[#101936]">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{condition.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NousRejoindreCandidatureSection({ hasJobOffers }: { hasJobOffers: boolean }) {
  const P = NOUS_REJOINDRE_CANDIDATURE_PATHS;

  return (
    <section
      id="parcours-candidature"
      className={`${ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="parcours-candidature-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <SectionTitleUnderline id="parcours-candidature-heading">{P.heading}</SectionTitleUnderline>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600">{P.subtitle}</p>

        <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-[#377CF3]/20 bg-white p-6 shadow-sm">
            <span
              className={`inline-flex w-fit rounded-md ${RECRUITMENT_SOFT_BG} px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#377CF3]`}
            >
              Parcours A
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-[#101936]">{P.formateur.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {P.formateur.description}
            </p>
            <Link
              href={LINKS.nousRejoindreCandidatureFormateur}
              className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold`}
            >
              {P.formateur.ctaLabel}
              <span aria-hidden> →</span>
            </Link>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <span className="inline-flex w-fit rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
              Parcours B
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-[#101936]">{P.salarie.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {P.salarie.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#job-offers-heading"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold sm:flex-none`}
              >
                {P.salarie.ctaOffersLabel}
              </a>
              <Link
                href={LINKS.nousRejoindreCandidatureSpontanee}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-[#377CF3]/40 sm:flex-none"
              >
                {P.salarie.ctaSpontaneeLabel}
              </Link>
            </div>
            {!hasJobOffers ? (
              <p className="mt-3 text-xs text-slate-500">
                Aucune offre salariée publiée pour le moment.
              </p>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Conversion intégrée à la section mission — conservé pour compatibilité éventuelle. */
export function NousRejoindreConversionBand() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-label="Candidature formateur"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <CandidatureConversionRow />
      </div>
    </section>
  );
}
