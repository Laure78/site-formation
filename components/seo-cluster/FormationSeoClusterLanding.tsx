import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { RelatedLinks } from '@/components/RelatedLinks';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';
import { getFAQSchema, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import {
  buildFormationFicheCourseJsonLd,
} from '@/lib/schema-formation-course-jsonld';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

function buildCourseJsonLd(config: SeoClusterPageConfig): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    ...buildFormationFicheCourseJsonLd({
      name: config.courseName,
      description: config.seo.description,
      path: config.path,
      instructorName: SCHEMA_PERSON_LAURE.name,
      teaches: [...config.courseTeaches],
    }),
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
      url: `${base}/a-propos`,
      sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: String(TARIF_FORFAIT_DEBUTANT_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl(`${config.campaignSlug}-schema-offer`),
    },
  };
}

function CtaVisioBlock({
  id,
  title,
  subtitle,
  campaign,
  ctaLabel,
}: {
  id: string;
  title: string;
  subtitle: string;
  campaign: string;
  ctaLabel: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white"
    >
      <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-3 leading-relaxed text-blue-100">{subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <CalendlyEmbed
          type="link"
          variant="on-accent"
          ctaPosition="middle"
          campaign={campaign}
          className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
        >
          {ctaLabel}
        </CalendlyEmbed>
        {id === 'cta-final' ? (
          <Link
            href={LINKS.contact}
            className="inline-flex items-center rounded-lg border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Demander le programme
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function FormationSeoClusterLanding({ config }: { config: SeoClusterPageConfig }) {
  const faqSchema = getFAQSchema([...config.faq]);
  const courseJsonLd = buildCourseJsonLd(config);
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: 'Accueil', path: LINKS.home },
    { name: 'Formations IA BTP', path: '/formation-ia-btp' },
    { name: config.h1, path: config.path },
  ]);

  const sommaire = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#cas-usage', label: config.useCasesTitle }, ...(config.publicTargets?.length ? [{ href: '#public', label: 'Public concerné' }] : []), ...(config.specialSection
      ? [{ href: `#${config.specialSection.id}`, label: config.specialSection.title }]
      : []), ...(config.methodology ? [{ href: '#methodologie', label: config.methodology.title }] : []),
    { href: '#faq', label: 'Questions fréquentes' },
    { href: '#a-propos', label: 'Laure Olivié — formatrice' },
    { href: '#rdv', label: 'Prendre rendez-vous' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id={`jsonld-course-${config.campaignSlug}`} schema={courseJsonLd} />
      {faqSchema ? <JsonLd id={`jsonld-faq-${config.campaignSlug}`} schema={faqSchema} /> : null}
      {breadcrumbJsonLd ? (
        <JsonLd id={`jsonld-breadcrumb-${config.campaignSlug}`} schema={breadcrumbJsonLd} />
      ) : null}

      <article>
        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-[#377CF3]">
            {SITE_CONFIG.legalName} · organisme certifié Qualiopi · Présentiel Île-de-France
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {config.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{config.subtitle}</p>

          <div className="mt-8">
            <ShortAnswerBlock>{config.shortAnswer}</ShortAnswerBlock>
          </div>

          <p className="mt-6 text-sm text-slate-600">
            <strong></strong> ·{' '}
            {FINANCEMENT_FORMULATION_PRUDENTE}
          </p>

          <div className="mt-8">
            <CalendlyEmbed
              type="link"
              ctaPosition="hero"
              campaign={`${config.campaignSlug}-intro`}
              className="inline-flex items-center rounded-lg bg-[#377CF3] px-6 py-3.5 font-semibold text-white hover:bg-blue-700"
            >
              {config.primaryCtaLabel}
            </CalendlyEmbed>
          </div>
        </header>

        <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src={config.seo.image.url}
            alt={config.seo.image.alt}
            width={config.seo.image.width}
            height={config.seo.image.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            quality={75}
          />
        </figure>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {sommaire.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[#377CF3] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="introduction" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Introduction</h2>
          {config.introParagraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mt-4 leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
        </section>

        <section id="cas-usage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">{config.useCasesTitle}</h2>
          <ul className="mt-6 space-y-5">
            {config.useCases.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <div>
                  <strong className="text-slate-900">{item.title}</strong>
                  <p className="mt-1 leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {config.publicTargets?.length ? (
          <section id="public" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {config.publicTitle ?? 'Public concerné'}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {config.publicTargets.map((target) => (
                <li
                  key={target}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
                >
                  {target}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {config.specialSection ? (
          <section id={config.specialSection.id} className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {config.specialSection.title}
            </h2>
            {config.specialSection.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="mt-4 leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </section>
        ) : null}

        {config.methodology ? (
          <section id="methodologie" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {config.methodology.title}
            </h2>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700">
              {config.methodology.steps.map((step, index) => (
                <li key={step.title}>
                  <strong className="text-slate-900">
                    {index + 1}. {step.title}
                  </strong>
                  <p className="mt-2 leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {config.catalogueHref ? (
          <p className="mt-10 text-slate-600">
            Programme détaillé :{' '}
            <Link href={config.catalogueHref} className={`font-semibold ${OFC_LINK}`}>
              {config.catalogueLabel ?? 'Voir la fiche catalogue'}
            </Link>
            .
          </p>
        ) : null}

        <div className="mt-14">
          <CtaVisioBlock
            id="cta-milieu"
            title={config.midCtaTitle}
            subtitle={config.midCtaSubtitle}
            campaign={`${config.campaignSlug}-milieu`}
            ctaLabel={config.primaryCtaLabel}
          />
        </div>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Questions fréquentes</h2>
          <dl className="mt-8 space-y-6">
            {config.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Laure Olivié — formatrice IA BTP
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Laure Olivié, formatrice certifiée Qualiopi, accompagne depuis 2021 les professionnels du
            bâtiment et des travaux publics sur l&apos;intelligence artificielle appliquée au terrain :
            chantier, appels d&apos;offres, administratif et communication. Plus de dix ans
            d&apos;expérience en conduite de travaux et travaux publics.
          </p>
          <div className="mt-8">
            <LaureOlivieFormationPortrait />
          </div>
          <p className="mt-6">
            <Link href={LINKS.aPropos} className={`font-semibold ${OFC_LINK}`}>
              Découvrir le parcours complet de Laure Olivié
            </Link>
          </p>
        </section>

        <div className="mt-14">
          <CtaVisioBlock
            id="cta-final"
            title={config.finalCtaTitle}
            subtitle={config.finalCtaSubtitle}
            campaign={`${config.campaignSlug}-final`}
            ctaLabel={config.primaryCtaLabel}
          />
        </div>

        {config.programmeRef ? (
          <section id="rdv" className="scroll-mt-24 mt-14">
            <RenvoiFicheCatalogue programmeRef={config.programmeRef} />
          </section>
        ) : null}

        {config.relatedLinks.length >= 3 ? (
          <RelatedLinks
            path={config.path}
            title="Pages connexes"
            links={config.relatedLinks.map((l) => ({ href: l.href, label: l.label }))}
            className="mt-14"
          />
        ) : null}
      </article>
    </div>
  );
}
