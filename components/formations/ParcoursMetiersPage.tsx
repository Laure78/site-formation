import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ParcoursHubContactProvider } from '@/components/formations/parcours-hub-contact-context';
import { ParcoursMetiersHubContactSection } from '@/components/formations/ParcoursMetiersHubContactSection';
import { ParcoursMetiersHubContactBand } from '@/components/formations/ParcoursMetiersHubContactBand';
import { ParcoursMetiersHubHeroActions } from '@/components/formations/ParcoursMetiersHubHeroActions';
import { ParcoursMetierCard } from '@/components/formations/catalogue-2027/ParcoursMetierCard';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { getParcoursMetiersPublicsOrdered } from '@/lib/parcours-metiers-public';
import { LINKS } from '@/lib/internal-links';
import { cn } from '@/lib/cn';
import {
  PARCOURS_METIERS_AVANTAGES_SECTION,
  PARCOURS_METIERS_FAQ,
  PARCOURS_METIERS_HERO,
  PARCOURS_METIERS_HUB_INDICATEURS,
  PARCOURS_METIERS_PEDAGOGIE,
  PARCOURS_METIERS_SECTION,
} from '@/lib/parcours-metiers-page-content';

function HubSectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <header className="text-center md:text-left">
      <h2 id={id} className="ofc-type-h2 inline-block text-[#101936]">
        {title}
      </h2>
      <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#377CF3] md:mx-0" aria-hidden />
    </header>
  );
}

const PARCOURS_GRID_LAYOUT: Record<number, string> = {
  0: 'xl:col-span-2',
  1: 'xl:col-span-2',
  2: 'xl:col-span-2',
  3: 'xl:col-span-2 xl:col-start-2',
  4: 'xl:col-span-2',
};

export function ParcoursMetiersPage() {
  const parcours = getParcoursMetiersPublicsOrdered();

  return (
    <ParcoursHubContactProvider>
      <div className="overflow-x-hidden bg-white pb-12 text-[#101936]">
        {/* Hero + fil d'Ariane (aligné fiche parcours) */}
        <section className="border-b border-slate-100 bg-white" aria-labelledby="parcours-metiers-hero-title">
          <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-slate-600" aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                <li>
                  <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
                    Accueil
                  </Link>
                </li>
                <li className="text-slate-400" aria-hidden>
                  /
                </li>
                <li className="font-medium text-[#101936]" aria-current="page">
                  Parcours métiers
                </li>
              </ol>
            </nav>
          </div>

          <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#377CF3]">
                {PARCOURS_METIERS_HERO.badge}
              </p>
              <h1 id="parcours-metiers-hero-title" className="ofc-type-hero mt-4 text-balance text-[#101936]">
                {PARCOURS_METIERS_HERO.h1}
              </h1>
              <p className="ofc-type-lead mt-4 text-balance text-[#101936]">{PARCOURS_METIERS_HERO.lead}</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{PARCOURS_METIERS_HERO.intro}</p>
              <ParcoursMetiersHubHeroActions className="mt-8" />
            </div>
            <div className="relative min-h-0 w-full">
              <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={PARCOURS_METIERS_HERO.imageSrc}
                    alt={PARCOURS_METIERS_HERO.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* Bandeau d'informations */}
        <section
          className="border-b border-slate-100 bg-white py-8 sm:py-10"
          aria-labelledby="parcours-metiers-indicateurs-title"
        >
          <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
            <h2 id="parcours-metiers-indicateurs-title" className="sr-only">
              Informations sur les parcours métiers
            </h2>
            <ul className="grid list-none grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              {PARCOURS_METIERS_HUB_INDICATEURS.map((item) => (
                <li key={item.id} className="h-full">
                  <div className="flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 shadow-sm">
                    <item.Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="text-sm font-semibold leading-snug text-[#101936]">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Avantages */}
        <section
          id={PARCOURS_METIERS_AVANTAGES_SECTION.id}
          className="border-b border-slate-100 bg-white py-12 sm:py-14"
          aria-labelledby="parcours-metiers-avantages-title"
        >
          <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
            <HubSectionHeading id="parcours-metiers-avantages-title" title={PARCOURS_METIERS_AVANTAGES_SECTION.title} />
            <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARCOURS_METIERS_AVANTAGES_SECTION.cards.map((card) => (
                <li key={card.id} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50">
                    <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                      <card.Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-[#101936]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Grille — 5 parcours (3 + 2) */}
        <section
          id={PARCOURS_METIERS_SECTION.id}
          className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.75rem)] py-12 sm:py-16"
          aria-labelledby="parcours-metiers-grid-title"
        >
          <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
            <HubSectionHeading id="parcours-metiers-grid-title" title={PARCOURS_METIERS_SECTION.title} />
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-600 md:mx-0 md:text-left">
              {PARCOURS_METIERS_SECTION.subtitle}
            </p>
            <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-6">
              {parcours.map((p, index) => (
                <li
                  key={p.id}
                  className={cn('flex min-h-0 min-w-0', PARCOURS_GRID_LAYOUT[index] ?? 'xl:col-span-2')}
                >
                  <ParcoursMetierCard parcours={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pédagogie */}
        <section
          id={PARCOURS_METIERS_PEDAGOGIE.id}
          className="mx-auto max-w-[80rem] px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8"
          aria-labelledby="parcours-metiers-pedagogie-title"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0" aria-hidden>
              <Image
                src={PARCOURS_METIERS_PEDAGOGIE.backgroundSrc}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 80rem"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0B1F4F]/92" />
            </div>
            <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
              <h2 id="parcours-metiers-pedagogie-title" className="ofc-type-h2 text-white">
                {PARCOURS_METIERS_PEDAGOGIE.title}
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PARCOURS_METIERS_PEDAGOGIE.items.map((item) => (
                  <li key={item.id} className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <item.Icon className="h-7 w-7 text-white" aria-hidden />
                    <p className="mt-3 text-sm font-semibold leading-snug text-white">{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ParcoursMetiersHubContactBand />

        <section className="border-t border-slate-100 bg-[#F8FAFC] py-12 sm:py-16">
          <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
            <ParcoursMetiersHubContactSection />
          </div>
        </section>

        <FAQSchema
          id="schema-parcours-metiers-faq"
          items={PARCOURS_METIERS_FAQ.map((item) => ({
            question: item.q,
            answer: item.a,
          }))}
        />

        {/* FAQ */}
        <section
          className="border-t border-slate-100 bg-white py-12 sm:py-16"
          aria-labelledby="parcours-metiers-faq-title"
        >
          <div className="mx-auto max-w-[48rem] px-4 sm:px-6 lg:px-8">
            <HubSectionHeading id="parcours-metiers-faq-title" title="Questions fréquentes" />
            <div className="mt-8 space-y-3">
              {PARCOURS_METIERS_FAQ.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-[#101936] sm:text-base">
                    <span>{item.q}</span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-slate-600">
              <Link href={LINKS.formations} className="font-semibold text-[#377CF3] underline underline-offset-2">
                Voir le catalogue des formations
              </Link>
            </p>
          </div>
        </section>
      </div>
    </ParcoursHubContactProvider>
  );
}
