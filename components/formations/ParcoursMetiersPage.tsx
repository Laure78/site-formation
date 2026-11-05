import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Calendar,
  Clock,
  Layers3,
  MapPin,
} from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { getAccueilParcoursOffre } from '@/lib/accueil-offre-catalogue';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { PARCOURS_METIERS_PAGE_ORDER } from '@/lib/parcours-metiers-public';
import {
  PARCOURS_DOCUMENTS_METIER,
  PARCOURS_METIERS_ACCROCHE,
  PARCOURS_METIERS_CARD_IMAGE,
  PARCOURS_METIERS_HERO,
  PARCOURS_METIERS_SECTION,
  PARCOURS_METIERS_TRUST,
} from '@/lib/parcours-metiers-page-content';
import { PHOTOS } from '@/lib/photos';
import type { AccueilParcoursOffreCard } from '@/lib/accueil-offre-catalogue';
const PARCOURS_CTA_PRIMARY =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#086BFF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-[background-color,transform] duration-200 hover:bg-[#0658d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086BFF] motion-reduce:transition-none active:scale-[0.98]';

const PARCOURS_CTA_SECONDARY =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#071A42]/15 bg-white px-6 py-3 text-sm font-semibold text-[#071A42] transition-colors duration-200 hover:border-[#071A42]/25 hover:bg-[#F2F7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086BFF] motion-reduce:transition-none';

function parcoursCardsData(): AccueilParcoursOffreCard[] {
  const byId = new Map(getAccueilParcoursOffre({ preview: true }).map((p) => [p.id, p]));
  return PARCOURS_METIERS_PAGE_ORDER.map((id) => byId.get(id)).filter(
    (p): p is AccueilParcoursOffreCard => p != null,
  );
}

function ParcoursMaquetteSectionHeading({
  id,
  title,
  subtitle,
  className = '',
}: {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className="mt-1.5 block h-9 w-1 shrink-0 rotate-[18deg] rounded-full bg-[#086BFF]"
          aria-hidden
        />
        <div className="min-w-0">
          <h2 id={id} className="text-pretty text-2xl font-bold tracking-tight text-[#071A42] sm:text-[1.65rem]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#475569] sm:text-[0.9375rem]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function ParcoursMetierCard({ parcours }: { parcours: AccueilParcoursOffreCard }) {
  const image = PARCOURS_METIERS_CARD_IMAGE[parcours.id];
  const accroche = PARCOURS_METIERS_ACCROCHE[parcours.id] ?? parcours.benefice;
  const ficheHref = parcoursHref(parcours.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-[box-shadow,transform] duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)]">
      {image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAF3FF]">
          <span className="absolute left-3 top-3 z-10 rounded-md bg-[#086BFF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            Ouverture 2027
          </span>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold text-pretty text-[#071A42]">{parcours.titre}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#475569]">{accroche}</p>
        {parcours.dureeLabel ? (
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-[#071A42]">
            <Clock className="h-4 w-4 shrink-0 text-[#086BFF]" aria-hidden />
            {parcours.dureeLabel}
          </p>
        ) : null}
        <div className="mt-auto pt-5">
          <Link
            href={ficheHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#086BFF] transition-colors hover:text-[#0658d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086BFF]"
          >
            Découvrir le parcours
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

function trustIcon(id: string) {
  if (id === 'qualiopi') return Award;
  if (id === 'cas') return Layers3;
  return MapPin;
}

export function ParcoursMetiersPage() {
  const parcours = parcoursCardsData();
  const ctaChantier = PHOTOS.accueilCtaFinalChantier;

  return (
    <div className="parcours-metiers-maquette bg-white text-[#071A42]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F2F7FF] via-[#F8FAFF] to-white">
        <div className="mx-auto grid max-w-[80rem] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center px-4 py-10 sm:px-6 lg:min-h-[26rem] lg:max-w-none lg:px-8 lg:py-12">
            <p className="inline-flex w-fit rounded-full bg-[#086BFF] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-white sm:text-[11px]">
              {PARCOURS_METIERS_HERO.badge}
            </p>
            <h1 className="ofc-type-hero mt-5 max-w-xl text-balance text-[#071A42]">
              {PARCOURS_METIERS_HERO.h1Before}
              <span className="text-[#086BFF]">{PARCOURS_METIERS_HERO.h1Highlight}</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#475569]">
              {PARCOURS_METIERS_HERO.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={`#${PARCOURS_METIERS_SECTION.id}`} className={PARCOURS_CTA_PRIMARY}>
                Découvrir les parcours
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <CtaVisio
                src="parcours-metiers-hero"
                variant="secondary"
                className={PARCOURS_CTA_SECONDARY}
                leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
              />
            </div>
            <ul className="mt-8 flex list-none flex-col gap-4 border-t border-[#E2E8F0]/80 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {PARCOURS_METIERS_TRUST.map((item) => {
                const Icon = trustIcon(item.id);
                return (
                  <li key={item.id} className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#086BFF] shadow-sm ring-1 ring-[#E2E8F0]">
                      <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-[#071A42]">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative min-h-[16rem] lg:min-h-[26rem]">
            <div className="absolute inset-y-0 left-0 z-[1] hidden w-16 bg-gradient-to-r from-[#F8FAFF] to-transparent lg:block" aria-hidden />
            <div className="relative h-full min-h-[16rem] overflow-hidden lg:absolute lg:inset-0 lg:min-h-0 lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
              <Image
                src={PARCOURS_METIERS_HERO.imageSrc}
                alt={PARCOURS_METIERS_HERO.imageAlt}
                fill
                priority
                className="object-cover object-[center_22%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grille parcours */}
      <section
        id={PARCOURS_METIERS_SECTION.id}
        className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] bg-white py-12 sm:py-16"
        aria-labelledby="parcours-metiers-grid-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <ParcoursMaquetteSectionHeading
            id="parcours-metiers-grid-title"
            title={PARCOURS_METIERS_SECTION.title}
            subtitle={PARCOURS_METIERS_SECTION.subtitle}
          />

          <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {parcours.map((p) => (
              <li key={p.id} id={p.id} className="min-w-0 scroll-mt-28">
                <ParcoursMetierCard parcours={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Documents métier */}
      <section
        className="border-t border-[#E2E8F0] bg-[#F2F7FF]/40 py-12 sm:py-16"
        aria-labelledby="parcours-documents-metier-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <ParcoursMaquetteSectionHeading
            id="parcours-documents-metier-title"
            title="Des formations centrées sur vos documents métier"
          />
          <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {PARCOURS_DOCUMENTS_METIER.map((tile) => (
              <li key={tile.id}>
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_4px_18px_rgba(15,23,42,0.05)] transition-[box-shadow,transform] duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(15,23,42,0.09)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF3FF]">
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex items-center gap-3 border-t border-[#E2E8F0] px-4 py-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2F7FF] text-[#086BFF]">
                      <tile.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="text-sm font-semibold text-[#071A42] sm:text-[0.9375rem]">{tile.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bandeau conversion */}
      <section className="overflow-hidden" aria-labelledby="parcours-cta-final-title">
        <div className="mx-auto grid max-w-[80rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
          <div className="flex flex-col justify-center bg-[#F2F7FF] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <h2
              id="parcours-cta-final-title"
              className="max-w-md text-pretty text-2xl font-bold tracking-tight text-[#071A42] sm:text-[1.65rem]"
            >
              Construisons le parcours adapté à vos équipes
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#475569]">
              <MapPin className="h-4 w-4 shrink-0 text-[#086BFF]" aria-hidden />
              Présentiel en Île-de-France
            </p>
            <div className="mt-6">
              <CtaVisio
                src="parcours-metiers-cta-final"
                className={PARCOURS_CTA_PRIMARY}
                leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
              />
            </div>
          </div>
          <div className="relative min-h-[12rem] sm:min-h-[14rem] lg:min-h-[16rem]">
            <Image
              src={ctaChantier.src}
              alt={ctaChantier.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
