import Image from 'next/image';
import { BookOpen, ChevronDown, LayoutGrid, Waypoints } from 'lucide-react';
import { FormationsContact2027 } from '@/components/formations/catalogue-2027/FormationsContact2027';
import { ParcoursMetierCard } from '@/components/formations/catalogue-2027/ParcoursMetierCard';
import { ParcoursMetiersHubModalitesPratiques } from '@/components/formations/catalogue-2027/ParcoursMetiersHubModalitesPratiques';
import { PARCOURS_HUB_CONTACT_COPY } from '@/lib/catalogue-2027/parcours-contact-copy';
import { ParcoursMetiersHubHeroCtas } from '@/components/formations/ParcoursMetiersHubCtas';
import { ParcoursMetiersHubCtaFinal } from '@/components/formations/ParcoursMetiersHubCtaFinal';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { getParcoursMetiersPublicsOrdered } from '@/lib/parcours-metiers-public';
import {
  PARCOURS_CAS_USAGE_SECTION,
  PARCOURS_DOCUMENTS_METIER,
  PARCOURS_METIERS_CARD_DESCRIPTION,
  PARCOURS_METIERS_FAQ,
  PARCOURS_METIERS_HERO,
  PARCOURS_METIERS_MODULARITE_SECTION,
  PARCOURS_METIERS_SECTION,
} from '@/lib/parcours-metiers-page-content';
import { PARCOURS_METIERS_HUB_GEO } from '@/lib/catalogue-2027/parcours-geo-intros';

function ParcoursSectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header>
      <h2 id={id} className="ofc-type-h2 text-[#101936]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{subtitle}</p>
      ) : null}
    </header>
  );
}

const MODULARITE_ICONS = {
  'parcours-complet': BookOpen,
  'module-a-la-carte': LayoutGrid,
  'parcours-personnalise': Waypoints,
} as const;

export function ParcoursMetiersPage() {
  const parcours = getParcoursMetiersPublicsOrdered();

  return (
    <div className="overflow-x-hidden bg-white pb-12 text-[#101936]">
      {/* Hero — aligné fiche parcours (conducteur) */}
      <section className="border-b border-slate-100 bg-white" aria-labelledby="parcours-metiers-hero-title">
        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#377CF3]">
              {PARCOURS_METIERS_HERO.badge}
            </p>
            <h1 id="parcours-metiers-hero-title" className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {PARCOURS_METIERS_HERO.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{PARCOURS_METIERS_HERO.intro}</p>
            <ParcoursMetiersHubHeroCtas />
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

      {/* Modularité courte */}
      <section
        id={PARCOURS_METIERS_MODULARITE_SECTION.id}
        className="border-b border-slate-100 bg-[#F8FAFC] py-12 sm:py-14"
        aria-labelledby="parcours-metiers-modularite-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <ParcoursSectionHeading
            id="parcours-metiers-modularite-title"
            title={PARCOURS_METIERS_MODULARITE_SECTION.title}
            subtitle={PARCOURS_METIERS_MODULARITE_SECTION.intro}
          />
          <ul className="mt-8 grid list-none gap-4 sm:grid-cols-3">
            {PARCOURS_METIERS_MODULARITE_SECTION.options.map((opt) => {
              const Icon = MODULARITE_ICONS[opt.id as keyof typeof MODULARITE_ICONS] ?? BookOpen;
              return (
                <li key={opt.id} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-50">
                    <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                      <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-[#101936]">{opt.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{opt.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Grille — 5 métiers */}
      <section
        id={PARCOURS_METIERS_SECTION.id}
        className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.75rem)] py-12 sm:py-16"
        aria-labelledby="parcours-metiers-grid-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <ParcoursSectionHeading
            id="parcours-metiers-grid-title"
            title={PARCOURS_METIERS_SECTION.title}
            subtitle={`${PARCOURS_METIERS_SECTION.subtitle} ${PARCOURS_METIERS_HUB_GEO.grid}`}
          />
          <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {parcours.map((p) => (
              <li key={p.id} className="flex min-h-0 min-w-0">
                <ParcoursMetierCard
                  parcours={p}
                  description={PARCOURS_METIERS_CARD_DESCRIPTION[p.id]}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cas d’usage */}
      <section
        id={PARCOURS_CAS_USAGE_SECTION.id}
        className="border-t border-slate-100 bg-white py-12 sm:py-16"
        aria-labelledby="parcours-cas-usage-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <ParcoursSectionHeading
            id="parcours-cas-usage-title"
            title={PARCOURS_CAS_USAGE_SECTION.title}
            subtitle={`${PARCOURS_CAS_USAGE_SECTION.subtitle} ${PARCOURS_METIERS_HUB_GEO.casUsage}`}
          />
          <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PARCOURS_DOCUMENTS_METIER.map((tile) => (
              <li key={tile.id} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex items-center gap-3 border-t border-slate-100 px-4 py-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#377CF3]">
                      <tile.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="text-sm font-semibold text-[#101936]">{tile.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ParcoursMetiersHubModalitesPratiques />

      <FAQSchema
        id="schema-parcours-metiers-faq"
        items={PARCOURS_METIERS_FAQ.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />

      <section
        className="border-t border-slate-100 bg-[#F8FAFC] py-12 sm:py-16"
        aria-labelledby="parcours-metiers-faq-title"
      >
        <div className="mx-auto max-w-[48rem] px-4 sm:px-6 lg:px-8">
          <ParcoursSectionHeading
            id="parcours-metiers-faq-title"
            title="Questions fréquentes"
            subtitle={PARCOURS_METIERS_HUB_GEO.modalites}
          />
          <div className="mt-8 space-y-3">
            {PARCOURS_METIERS_FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
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
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <FormationsContact2027
            formationHint="Parcours métiers BTP — catalogue 2027"
            initialObjet="devis"
            initialMetier={PARCOURS_HUB_CONTACT_COPY.participantRoleDefault}
            messagePlaceholder={PARCOURS_HUB_CONTACT_COPY.messagePlaceholder}
            needExample={PARCOURS_HUB_CONTACT_COPY.needExample}
            parcoursMetiersContext
          />
        </div>
      </section>

      <ParcoursMetiersHubCtaFinal />
    </div>
  );
}
