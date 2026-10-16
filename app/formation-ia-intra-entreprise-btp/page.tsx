import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  CalendarRange,
  CheckCircle2,
  FileStack,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FormationCharteIaBtpRessourceAside } from '@/components/formations/FormationCharteIaBtpRessourceAside';
import {
  INTRA_BENEFICES,
  INTRA_CAS_USAGE,
  INTRA_CONFIDENTIALITE,
  INTRA_CONTACT,
  INTRA_ETAPES,
  INTRA_FAQ,
  INTRA_FORMATS,
  INTRA_HERO_FACTS,
  INTRA_META,
  INTRA_PATH,
  INTRA_PRATIQUE,
  INTRA_PROGRESSION,
  INTRA_PROGRESSION_EXEMPLE,
  INTRA_PROGRESSION_NOTE,
  INTRA_REF_CPB,
  INTRA_VALIDATION_NOTE,
} from '@/lib/formation-ia-intra-entreprise-btp-content';
import { getFormationIaIntraEntrepriseBtpJsonLd } from '@/lib/schema-formation-ia-intra-entreprise-btp';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: INTRA_META.title,
  titleAbsolute: INTRA_META.title,
  description: INTRA_META.description,
  descriptionFinal: true,
  path: INTRA_PATH,
  appendAuthorSuffix: false,
  openGraphTitle: INTRA_META.title,
  openGraphDescription: INTRA_META.description,
  keywords: [
    'formation IA intra-entreprise BTP',
    'formation IA en entreprise BTP',
    'formation IA sur mesure BTP',
    'former ses équipes à l’IA Île-de-France',
    'formation IA pour le BTP',
  ],
});

const BENEFICE_ICONS = [FileStack, Layers, Users, CheckCircle2] as const;

export default function FormationIaIntraEntrepriseBtpPage() {
  return (
    <>
      <JsonLd id="schema-formation-ia-intra-entreprise-btp" data={getFormationIaIntraEntrepriseBtpJsonLd()} />

      {/* A — Hero */}
      <section className="border-b border-[#E2E8F0] bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className={`${OFC_EYEBROW} text-[#377CF3]`}>{INTRA_META.eyebrow}</p>
          <h1 className={`${OFC_TYPE_HERO} mt-3 max-w-3xl`}>{INTRA_META.h1}</h1>
          <p className={`${OFC_TYPE_LEAD} mt-5 max-w-2xl text-[#475569]`}>{INTRA_META.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {INTRA_HERO_FACTS.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-medium text-[#334155]"
              >
                {fact}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={LINKS.prendreRdv} className={`${OFC_CTA_PRIMARY} min-h-[44px] justify-center`}>
              Construire mon projet de formation
            </Link>
            <a href="#deux-formats" className={`${OFC_CTA_SECONDARY} min-h-[44px] justify-center`}>
              Comparer les deux formats
            </a>
          </div>
        </div>
      </section>

      {/* B — Deux formats */}
      <section
        id="deux-formats"
        className="scroll-mt-24 border-b border-[#E2E8F0] bg-white"
        aria-labelledby="deux-formats-title"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="deux-formats-title" className={OFC_TYPE_H2}>
            Une formation du catalogue ou un parcours sur mesure
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {INTRA_FORMATS.map((format) => (
              <article
                key={format.id}
                className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 md:p-8"
              >
                <h3 className={OFC_TYPE_H3}>{format.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#475569]">{format.text}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {format.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#334155]">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={format.ctaHref}
                  className={`${OFC_CTA_PRIMARY} mt-6 min-h-[44px] w-full justify-center sm:w-auto`}
                >
                  {format.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* C — Bénéfices */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC]" aria-labelledby="benefices-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="benefices-title" className={OFC_TYPE_H2}>
            Travaillez sur ce que vos équipes produisent chaque jour
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {INTRA_BENEFICES.map((item, index) => {
              const Icon = BENEFICE_ICONS[index] ?? CheckCircle2;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden strokeWidth={1.75} />
                  <h3 className="mt-3 font-display text-lg font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* D — Cas d’usage */}
      <section className="border-b border-[#E2E8F0] bg-white" aria-labelledby="cas-usage-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="cas-usage-title" className={OFC_TYPE_H2}>
            Quels usages souhaitez-vous développer ?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTRA_CAS_USAGE.map((card) => (
              <article
                key={card.href}
                className="flex h-full flex-col rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
              >
                <h3 className="font-display text-base font-bold text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">{card.text}</p>
                <Link href={card.href} className={`${OFC_LINK} mt-4 text-sm font-semibold`}>
                  {card.linkLabel}
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[#64748B]">{INTRA_VALIDATION_NOTE}</p>
        </div>
      </section>

      {/* E — Progression */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC]" aria-labelledby="progression-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="progression-title" className={OFC_TYPE_H2}>
            Construisez une progression adaptée à votre équipe
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {INTRA_PROGRESSION.map((step) => (
              <li
                key={step.niveau}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                  Niveau {step.niveau}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-[#0F172A]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{step.text}</p>
                <p className="mt-3 text-sm font-semibold text-[#334155]">{step.duree}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#475569]">{INTRA_PROGRESSION_NOTE}</p>
          <p className="mt-3 max-w-3xl rounded-xl border border-dashed border-[#CBD5E1] bg-white px-4 py-3 text-sm leading-relaxed text-[#64748B]">
            {INTRA_PROGRESSION_EXEMPLE}
          </p>
        </div>
      </section>

      {/* F — Déroulement */}
      <section className="border-b border-[#E2E8F0] bg-white" aria-labelledby="deroulement-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="deroulement-title" className={OFC_TYPE_H2}>
            De votre besoin à la mise en pratique
          </h2>
          <ol className="mt-8 space-y-4">
            {INTRA_ETAPES.map((etape) => (
              <li
                key={etape.n}
                className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#377CF3] font-display text-sm font-bold text-white"
                  aria-hidden
                >
                  {etape.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0F172A]">{etape.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{etape.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* G — Confidentialité */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC]" aria-labelledby="confidentialite-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#377CF3]" aria-hidden />
            <div>
              <h2 id="confidentialite-title" className={OFC_TYPE_H2}>
                {INTRA_CONFIDENTIALITE.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569]">
                {INTRA_CONFIDENTIALITE.lead}
              </p>
              <ul className="mt-5 space-y-2">
                {INTRA_CONFIDENTIALITE.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-[#334155]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* H — Référence CPB */}
      <section className="border-b border-[#E2E8F0] bg-white" aria-labelledby="reference-cpb-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="reference-cpb-title" className={OFC_TYPE_H2}>
            Une référence de formation
          </h2>
          <article className="mt-8 max-w-2xl rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 md:p-8">
            <div className="flex h-16 items-center justify-center rounded-lg bg-white px-4">
              <Image
                src={INTRA_REF_CPB.logoSrc}
                alt={INTRA_REF_CPB.logoAlt}
                width={INTRA_REF_CPB.logoWidth}
                height={INTRA_REF_CPB.logoHeight}
                className="h-12 w-auto max-w-full object-contain"
                sizes="200px"
                loading="lazy"
              />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-[#0F172A]">{INTRA_REF_CPB.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#475569]">{INTRA_REF_CPB.text}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href={INTRA_REF_CPB.programmeHref}
                className={`${OFC_CTA_PRIMARY} min-h-[44px] justify-center`}
              >
                {INTRA_REF_CPB.programmeLabel}
              </Link>
              <ExternalLinkAnchor
                href={INTRA_REF_CPB.officialHref}
                className={`${OFC_CTA_SECONDARY} min-h-[44px] justify-center`}
              >
                {INTRA_REF_CPB.officialLabel}
              </ExternalLinkAnchor>
            </div>
          </article>
        </div>
      </section>

      {/* I — Infos pratiques */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC]" aria-labelledby="pratique-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <CalendarRange className="mt-1 h-7 w-7 shrink-0 text-[#377CF3]" aria-hidden />
            <div className="min-w-0 flex-1">
              <h2 id="pratique-title" className={OFC_TYPE_H2}>
                {INTRA_PRATIQUE.title}
              </h2>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {INTRA_PRATIQUE.items.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-5"
                  >
                    <dt className="text-sm font-semibold text-[#0F172A]">{item.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#475569]">{item.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#475569]">
                {INTRA_PRATIQUE.financement}{' '}
                <Link href={INTRA_PRATIQUE.financementHref} className={OFC_LINK}>
                  {INTRA_PRATIQUE.financementLabel}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* J — FAQ */}
      <FAQSection
        items={[...INTRA_FAQ]}
        title="Questions fréquentes"
        subtitle="Réponses courtes sur l’organisation d’une formation IA en entreprise."
      />

      {/* K — Contact final */}
      <section
        id="contact-projet"
        className="scroll-mt-24 border-b border-[#E2E8F0] bg-[#377CF3]"
        aria-labelledby="contact-projet-title"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 h-7 w-7 shrink-0 text-white" aria-hidden />
            <div>
              <h2 id="contact-projet-title" className="font-display text-2xl font-bold text-white md:text-2xl">
                {INTRA_CONTACT.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
                {INTRA_CONTACT.text}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={INTRA_CONTACT.mailtoHref}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {INTRA_CONTACT.mailtoLabel}
                </a>
                <p className="text-sm text-white/90">
                  {INTRA_CONTACT.mailtoSecondaryLabel} :{' '}
                  <span className="font-semibold text-white">{CONTACT.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <FormationCharteIaBtpRessourceAside className="mb-10" />
        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue des formations IA pour le BTP' },
            { href: LINKS.parcoursMetiers, label: 'Parcours métiers — programmes par fonction' },
            { href: LINKS.financement, label: 'Financement OPCO Constructys — selon éligibilité' },
            { href: LINKS.prendreRdv, label: 'Échanger sur votre besoin — visio découverte' },
            { href: LINKS.contact, label: 'Contact et devis intra-entreprise' },
          ]}
        />
      </div>
    </>
  );
}
