import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Calculator,
  Check,
  ClipboardList,
  FileStack,
  FolderOpen,
  HardHat,
  HardHat as HardHatIcon,
  MapPin,
  ScrollText,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import {
  CONSULTANT_COMPETENCES_RECHERCHEES,
  NOUS_REJOINDRE_AVANTAGES,
  NOUS_REJOINDRE_COMPETENCES,
  NOUS_REJOINDRE_FORMATEUR_HERO,
  NOUS_REJOINDRE_INFO_STRIP,
  NOUS_REJOINDRE_LANDING_PROFILS,
  NOUS_REJOINDRE_MISSION_LANDING,
} from '@/lib/consultant-recruitment-content';
import { getConsultantParcoursMetiersOptions } from '@/lib/consultant-parcours-metiers-options';
import { getRecruitmentFormationFormatBuckets } from '@/lib/consultant-formations-ia-options';
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
const PARCOURS_CARD_IMAGE = PHOTOS.recrutementParcoursMetiersCarte2027;
const FORMATIONS_CARD_IMAGE = PHOTOS.recrutementFormationsIaBtpCarte2027;
const PROFILS_IMAGE = PHOTOS.recrutementProfilsEquipe2027;

const RECRUITMENT_ACCENT = 'text-[#377CF3]';
const RECRUITMENT_SOFT_BG = 'bg-[#EAF3FF]';
const RECRUITMENT_INK = 'text-[#101936]';
const RECRUITMENT_NAVY = 'bg-[#101936]';

const INFO_STRIP_ICONS: Record<(typeof NOUS_REJOINDRE_INFO_STRIP)[number]['key'], LucideIcon> = {
  experience: HardHat,
  missions: Wallet,
  presentiel: MapPin,
  catalogue: Calendar,
};

const PROFIL_CARD_ICONS = [HardHatIcon, Calculator, Briefcase, Users] as const;

const MISSION_ICONS: Record<
  (typeof NOUS_REJOINDRE_MISSION_LANDING.casPratiques)[number]['key'],
  LucideIcon
> = {
  devis: Calculator,
  dce: ScrollText,
  cctp: FileStack,
  chantier: HardHat,
  cr: ClipboardList,
  doe: FolderOpen,
};

const PARCOURS_RECRUTEMENT_ORDER = [
  'conducteur-de-travaux',
  'charge-affaires-btp',
  'assistant-de-gestion-btp',
  'dirigeant-pme-btp',
  'referent-ia-btp',
] as const;

function candidatureHref(category?: 'parcours-metiers' | 'formations-ia-btp') {
  if (!category) return LINKS.nousRejoindreCandidatureFormateur;
  return `${LINKS.nousRejoindre}?animer=${category}#candidature-formateur`;
}

function SectionTitleUnderline({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="text-center">
      <h2 id={id} className={`${OFC_TYPE_H2} ${RECRUITMENT_INK}`}>
        {children}
      </h2>
      <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />
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
              {H.h1Line1}
              <br />
              {H.h1Line2}
              <br />
              <span className={RECRUITMENT_ACCENT}>{H.h1Line3}</span>
            </h1>
            <p className={`${OFC_TYPE_BODY} mt-4 max-w-none text-ofc-ink-muted text-pretty`}>
              {H.intro}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={LINKS.nousRejoindreCandidatureFormateur}
                className={`${OFC_CTA_PRIMARY} motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                {H.primaryCtaLabel}
              </Link>
              <a
                href="#missions-formateur"
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
        <ul className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {NOUS_REJOINDRE_INFO_STRIP.map(({ label, key }, index) => {
            const Icon = INFO_STRIP_ICONS[key];
            const isLast = index === NOUS_REJOINDRE_INFO_STRIP.length - 1;
            return (
              <li
                key={key}
                className={`flex min-w-0 items-center justify-center gap-2.5 px-2 text-center lg:px-4 ${
                  !isLast ? 'lg:border-r lg:border-[#377CF3]/15' : ''
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

export function NousRejoindreMissionsCardsSection() {
  const parcoursById = new Map(getConsultantParcoursMetiersOptions().map((p) => [p.id, p]));
  const parcoursList = PARCOURS_RECRUTEMENT_ORDER.map((id) => parcoursById.get(id)).filter(
    (p): p is NonNullable<typeof p> => p != null,
  );
  const formatBuckets = getRecruitmentFormationFormatBuckets();

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="missions-recrutement-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <SectionTitleUnderline id="missions-recrutement-heading">
          Deux types de missions à animer
        </SectionTitleUnderline>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600">
          Parcours métiers sur plusieurs jours ou sessions opérationnelles de 4 h à 14 h — vous
          pouvez candidater pour l&apos;une ou les deux catégories.
        </p>

        <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-2">
          <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={PARCOURS_CARD_IMAGE.src}
                alt={PARCOURS_CARD_IMAGE.alt}
                width={PARCOURS_CARD_IMAGE.width}
                height={PARCOURS_CARD_IMAGE.height}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">
                Parcours métiers BTP + IA
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#101936]">
                Transmettre une filière métier complète
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {parcoursList.map((p) => (
                  <li key={p.id} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
                    <span>{p.titre}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={candidatureHref('parcours-metiers')}
                className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold`}
              >
                Candidater — parcours métiers
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </article>

          <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={FORMATIONS_CARD_IMAGE.src}
                alt={FORMATIONS_CARD_IMAGE.alt}
                width={FORMATIONS_CARD_IMAGE.width}
                height={FORMATIONS_CARD_IMAGE.height}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">
                Formations IA BTP
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#101936]">
                Animer des sessions opérationnelles
              </h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                {formatBuckets.map((bucket) => (
                  <li key={bucket.key}>
                    <p className="font-semibold text-slate-800">
                      {bucket.title} : {bucket.dureeLabel}
                    </p>
                    <p className="mt-0.5 text-slate-500">
                      {bucket.formations.map((f) => f.titre).join(' · ')}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href={candidatureHref('formations-ia-btp')}
                className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold`}
              >
                Candidater — formations IA BTP
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function NousRejoindreProfilsSection() {
  const P = NOUS_REJOINDRE_LANDING_PROFILS;

  return (
    <section
      className={`${ofcSectionClasses({ tone: 'soft', size: 'compact', divide: true })} ${RECRUITMENT_SOFT_BG}`}
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
        <ul className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.cards.map((card, index) => {
            const Icon = PROFIL_CARD_ICONS[index] ?? HardHat;
            return (
              <li
                key={card.title}
                className="flex min-w-0 flex-col rounded-2xl border border-white/80 bg-white p-5 shadow-sm"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${RECRUITMENT_SOFT_BG}`}
                >
                  <Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                </span>
                <h3 className={`mt-3 font-display text-lg font-bold ${RECRUITMENT_INK}`}>
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-slate-600">{card.description}</p>
              </li>
            );
          })}
        </ul>
        <figure className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200/80 shadow-md">
          <Image
            src={PROFILS_IMAGE.src}
            alt={PROFILS_IMAGE.alt}
            width={PROFILS_IMAGE.width}
            height={PROFILS_IMAGE.height}
            className="aspect-[21/9] w-full object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1120px"
          />
        </figure>
      </div>
    </section>
  );
}

export function NousRejoindreMissionSection() {
  const M = NOUS_REJOINDRE_MISSION_LANDING;

  return (
    <section
      id="missions-formateur"
      className={`${ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)] ${RECRUITMENT_NAVY} text-white`}
      aria-labelledby="mission-formateur-landing"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2
          id="mission-formateur-landing"
          className="text-center font-display text-2xl font-bold leading-tight text-balance sm:text-3xl"
        >
          {M.heading}
        </h2>
        <ul className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {M.casPratiques.map(({ title, key }) => {
            const Icon = MISSION_ICONS[key];
            return (
              <li
                key={key}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center"
              >
                <Icon className="h-7 w-7 text-[#7EB4FF]" aria-hidden />
                <span className="text-sm font-semibold leading-snug">{title}</span>
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
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="competences-attendues-heading" className={`${OFC_TYPE_H2} ${RECRUITMENT_INK}`}>
              Compétences attendues
            </h2>
            <div className="mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />
            <ul className="mt-5 space-y-3">
              {CONSULTANT_COMPETENCES_RECHERCHEES.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                <span>{C.bullets[4]}</span>
              </li>
            </ul>
            <p className="mt-4 rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold text-[#101936]">{C.reassuranceTitle}</span>
              {' — '}
              {C.reassuranceBody}
            </p>
          </div>

          <div>
            <h2 className={`${OFC_TYPE_H2} ${RECRUITMENT_INK}`}>
              Pourquoi rejoindre notre organisme ?
            </h2>
            <div className="mt-3 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {NOUS_REJOINDRE_AVANTAGES.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4"
                >
                  <p className="text-sm font-semibold text-[#101936]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Section salariée retirée du hub formateurs — emplois via JobOffersSection. */
export function NousRejoindreCandidatureSection(_props: { hasJobOffers: boolean }) {
  return null;
}

/** @deprecated Conversion intégrée au hero et aux cartes missions. */
export function NousRejoindreConversionBand() {
  return null;
}
