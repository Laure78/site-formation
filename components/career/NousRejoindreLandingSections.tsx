import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileSearch,
  FileStack,
  FolderOpen,
  HardHat,
  Info,
  Laptop,
  MapPin,
  ScrollText,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import {
  CONSULTANT_COMPETENCES_RECHERCHEES,
  NOUS_REJOINDRE_COMPETENCES,
  NOUS_REJOINDRE_CONVERSION,
  NOUS_REJOINDRE_FORMATEUR_HERO,
  NOUS_REJOINDRE_INFO_STRIP,
  NOUS_REJOINDRE_LANDING_PROFILS,
  NOUS_REJOINDRE_MISSION_LANDING,
  NOUS_REJOINDRE_PROFILS,
} from '@/lib/consultant-recruitment-content';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_TYPE_BODY,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

const H = NOUS_REJOINDRE_FORMATEUR_HERO;
const HERO_IMAGE = PHOTOS.recrutementFormateursIaBtpHero2027;
const COMPETENCES_IMAGE = PHOTOS.recrutementCompetencesChantier;

const HERO_HIGHLIGHT_ICONS: Record<(typeof H.heroHighlights)[number]['key'], LucideIcon> = {
  lieu: MapPin,
  modalite: Users,
  remuneration: Wallet,
};

const INFO_STRIP_ICONS: Record<(typeof NOUS_REJOINDRE_INFO_STRIP)[number]['key'], LucideIcon> = {
  missions: Briefcase,
  catalogue: Calendar,
  presentiel: Users,
  idf: MapPin,
};

const PROFIL_CARD_ICONS = [HardHat, FileStack, Users, Laptop] as const;

const MISSION_ICONS: Record<
  (typeof NOUS_REJOINDRE_MISSION_LANDING.applications)[number]['key'],
  LucideIcon
> = {
  devis: FileStack,
  dce: ScrollText,
  memoire: FileSearch,
  cr: ClipboardCheck,
  planning: CalendarDays,
  admin: FolderOpen,
};

function photoForKey(key: keyof typeof PHOTOS) {
  return PHOTOS[key];
}

export function NousRejoindreHeroSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: true })}
      aria-labelledby="nous-rejoindre-formateur-h1"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <p className={`${OFC_EYEBROW} uppercase tracking-[0.12em]`}>{H.eyebrow}</p>
            <h1 id="nous-rejoindre-formateur-h1" className={`${OFC_TYPE_HERO} mt-3 text-pretty`}>
              {H.h1}
            </h1>
            <p className="mt-4 text-xl font-semibold leading-snug text-slate-900 text-pretty sm:text-2xl">
              Vous connaissez le BTP et utilisez <span className="text-[#377CF3]">l’IA</span> ?
            </p>
            <p className={`${OFC_TYPE_BODY} mt-3 max-w-none text-ofc-ink-muted text-pretty`}>
              {H.intro}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#377CF3]/30 bg-[#377CF3]/8 px-4 py-2 text-sm font-semibold text-slate-900">
              <Check className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              {H.experienceBadge}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-700">
              {H.heroHighlights.map(({ label, key }) => {
                const Icon = HERO_HIGHLIGHT_ICONS[key];
                return (
                  <li key={key} className="inline-flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-[#377CF3]" aria-hidden />
                    {label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={LINKS.devenezConsultant}
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

          <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50 shadow-md shadow-slate-200/50">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
              priority
            />
            <figcaption className="absolute top-4 right-4 flex items-center gap-2 rounded-lg border border-white/80 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#377CF3]" aria-hidden />
              {H.imageBadge}
            </figcaption>
          </figure>
        </div>

        <aside
          className="mt-6 rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-3.5 text-sm leading-relaxed text-slate-700 sm:px-5"
          aria-label="En bref"
        >
          <p>
            <span className="font-semibold text-slate-900">En bref — </span>
            {H.enBref}
          </p>
        </aside>
      </div>
    </section>
  );
}

export function NousRejoindreInfoStrip() {
  return (
    <div className="border-y border-slate-200/80 bg-[#F2F2F2]/70">
      <div className={`${RECRUITMENT_PAGE_INNER} py-5 sm:py-6`}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {NOUS_REJOINDRE_INFO_STRIP.map(({ label, key }) => {
            const Icon = INFO_STRIP_ICONS[key];
            return (
              <li key={key} className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#377CF3] shadow-sm ring-1 ring-slate-200/80">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-slate-800">{label}</span>
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
  const condition = NOUS_REJOINDRE_PROFILS;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="profils-recherches"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2
          id="profils-recherches"
          className={`${OFC_TYPE_H2} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
        >
          {P.heading}
        </h2>
        <ul className="mt-6 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {P.cards.map((card, index) => {
            const Icon = PROFIL_CARD_ICONS[index] ?? HardHat;
            const photo = photoForKey(card.photoKey);
            return (
              <li
                key={card.title}
                className="group ofc-card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#377CF3]/15 bg-white p-0"
              >
                <div className="flex flex-1 flex-col p-5 pb-4">
                  <Icon className="h-7 w-7 text-[#377CF3]" aria-hidden />
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                </div>
                <div className="relative mt-auto aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 px-4 py-3.5 sm:px-5">
          <p className="text-base font-semibold text-slate-900">{condition.conditionLead}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{condition.conditionDetail}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{P.extraNote}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{condition.footnote}</p>
      </div>
    </section>
  );
}

export function NousRejoindreMissionSection() {
  const M = NOUS_REJOINDRE_MISSION_LANDING;

  return (
    <section
      className={`${ofcSectionClasses({ tone: 'soft', size: 'compact', divide: true })} bg-[#377CF3]/[0.06]`}
      aria-labelledby="mission-formateur-landing"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2 id="mission-formateur-landing" className={OFC_TYPE_H2}>
          Transmettre <span className="text-[#377CF3]">l’IA</span> appliquée aux métiers du BTP
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{M.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {M.applications.map(({ title, key }) => {
            const Icon = MISSION_ICONS[key];
            return (
              <li
                key={key}
                className="flex items-start gap-3 rounded-xl border border-white/80 bg-white p-4 shadow-sm shadow-slate-200/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#377CF3]/20 bg-[#377CF3]/5">
                  <Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                </span>
                <span className="pt-1.5 text-sm font-semibold leading-snug text-slate-900">{title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function NousRejoindreCompetencesSection() {
  const C = NOUS_REJOINDRE_COMPETENCES;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="competences-attendues-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(240px,22rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/90">
            <Image
              src={COMPETENCES_IMAGE.src}
              alt={COMPETENCES_IMAGE.alt}
              width={COMPETENCES_IMAGE.width}
              height={COMPETENCES_IMAGE.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 352px"
            />
          </figure>
          <div className="min-w-0">
            <h2 id="competences-attendues-heading" className={OFC_TYPE_H2}>
              Les compétences recherchées
            </h2>
            <ul className="mt-5 space-y-3">
              {CONSULTANT_COMPETENCES_RECHERCHEES.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3 rounded-xl border border-[#377CF3]/25 bg-[#377CF3]/5 px-4 py-4 sm:px-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <div>
                <p className="text-base font-semibold text-slate-900">{C.reassuranceTitle}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{C.reassuranceBody}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NousRejoindreConversionBand() {
  const C = NOUS_REJOINDRE_CONVERSION;
  const mailto = formateurRecruitmentMailtoHref();

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="nous-rejoindre-conversion-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <div className="overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="nous-rejoindre-conversion-heading" className="font-display text-2xl font-bold text-balance sm:text-3xl">
              {C.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-200 sm:text-lg">{C.lead}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.devenezConsultant}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-slate-900 motion-safe:transition-colors motion-safe:duration-200 hover:bg-slate-100"
              >
                {C.ctaLabel}
                <span aria-hidden> →</span>
              </Link>
              <a
                href={mailto}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
              >
                <span aria-hidden>✉</span>
                {RECRUITMENT.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
