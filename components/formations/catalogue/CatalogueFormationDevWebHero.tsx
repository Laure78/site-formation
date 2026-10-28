import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock, MapPin, Users, Code2 } from 'lucide-react';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  DEV_WEB_IA_BADGE_NOUVELLE,
  DEV_WEB_IA_CTA_PRIMARY_LABEL,
  DEV_WEB_IA_CTA_SECONDARY_LABEL,
  DEV_WEB_IA_HERO_BENEFIT_CARDS,
  DEV_WEB_IA_HERO_EYEBROW,
  DEV_WEB_IA_HERO_FACTS,
  DEV_WEB_IA_INTRO,
  DEV_WEB_IA_INTRO_CLARIFIER,
  DEV_WEB_IA_SUBTITLE,
  DEV_WEB_IA_FORMATION_TITRE_COURT,
  DEV_WEB_IA_HERO_REASSURANCES,
  devWebIaPrimaryCtaHref,
  devWebIaSecondaryCtaHref,
} from '@/lib/formation-developpement-web-ia-content';
import { LINKS } from '@/lib/internal-links';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');

const FACT_ICONS = [Clock, MapPin, Users, Code2] as const;

/** Hero NIV-10 — outil métier BTP sur mesure avec l’IA, sans coder. */
export function CatalogueFormationDevWebHero() {
  return (
    <section
      className="border-b border-slate-200 bg-gradient-to-b from-[#F2F2F2] to-white px-4 py-10 md:py-14"
      aria-labelledby="dev-web-ia-h1"
    >
      <div className="mx-auto max-w-6xl">
        <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
          Catalogue des formations IA pour le BTP
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,400px)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className={OFC_EYEBROW}>{DEV_WEB_IA_HERO_EYEBROW}</p>
              <span className="rounded-full bg-[#377CF3] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                {DEV_WEB_IA_BADGE_NOUVELLE}
              </span>
            </div>

            <h1
              id="dev-web-ia-h1"
              className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 text-balance md:text-[1.75rem] lg:text-2xl lg:leading-[1.2]"
            >
              {CATALOGUE_SEO.h1}
            </h1>

            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-800 md:text-xl">
              {DEV_WEB_IA_SUBTITLE}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
              {DEV_WEB_IA_INTRO}
            </p>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-slate-900">
              {DEV_WEB_IA_INTRO_CLARIFIER}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {DEV_WEB_IA_HERO_REASSURANCES.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {DEV_WEB_IA_HERO_BENEFIT_CARDS.map((card) => (
                <li key={card.num}>
                  <article className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#377CF3]">
                      {card.num} — {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{card.texte}</p>
                  </article>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={devWebIaPrimaryCtaHref()}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 py-3.5 text-base sm:w-auto`}
              >
                {DEV_WEB_IA_CTA_PRIMARY_LABEL}
              </Link>
              <Link
                href={devWebIaSecondaryCtaHref()}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 py-3.5 text-base sm:w-auto`}
              >
                {DEV_WEB_IA_CTA_SECONDARY_LABEL}
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 text-sm font-medium text-slate-800">
              {DEV_WEB_IA_HERO_FACTS.map((fact, index) => {
                const Icon = FACT_ICONS[index] ?? Clock;
                return (
                  <li key={fact} className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#377CF3]" aria-hidden />
                    {fact}
                  </li>
                );
              })}
            </ul>

            <FormationHeroOutilsNote catalogueRef="NIV-10" className="mt-6" />
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-28">
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.07)]">
              <Image
                src={CATALOGUE_VISUEL.src}
                alt={CATALOGUE_VISUEL.alt}
                title={
                  'title' in CATALOGUE_VISUEL && typeof CATALOGUE_VISUEL.title === 'string'
                    ? CATALOGUE_VISUEL.title
                    : DEV_WEB_IA_FORMATION_TITRE_COURT
                }
                width={CATALOGUE_VISUEL.width}
                height={CATALOGUE_VISUEL.height}
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="h-auto w-full object-cover"
              />
              <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
                Exemple pédagogique d&apos;outil métier BTP conçu avec l&apos;IA — interface fictive à
                titre illustratif.
              </figcaption>
            </figure>
            <p className="text-sm">
              <a href="#informations-pratiques" className={OFC_LINK}>
                Informations réglementaires Qualiopi
              </a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
