import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FAQSection } from '@/components/landing/FAQSection';
import { RdvBookingFlowIsland } from '@/components/prendre-rendez-vous/RdvBookingFlowIsland';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  FAQ_PRENDRE_RDV_PAGE,
  PRENDRE_RDV_APRES,
  PRENDRE_RDV_AUDIENCE_CARDS,
  PRENDRE_RDV_AUDIENCE_TITLE,
  PRENDRE_RDV_CONTACT_HREF,
  PRENDRE_RDV_CTA_PRIMARY,
  PRENDRE_RDV_CTA_SECONDARY,
  PRENDRE_RDV_DEVIS_FORMULATION,
  PRENDRE_RDV_EMAIL,
  PRENDRE_RDV_FORM_ANCHOR,
  PRENDRE_RDV_FORM_SUBTITLE,
  PRENDRE_RDV_FORM_TITLE,
  PRENDRE_RDV_FORMATIONS_HREF,
  PRENDRE_RDV_GEO_NOTE,
  PRENDRE_RDV_H1,
  PRENDRE_RDV_META_DESCRIPTION,
  PRENDRE_RDV_PAGE_TITLE,
  PRENDRE_RDV_PRIVACY_HREF,
  PRENDRE_RDV_PROCESS_STEPS,
  PRENDRE_RDV_PROCESS_TITLE,
  PRENDRE_RDV_PROOFS,
  PRENDRE_RDV_REASSURANCE,
  PRENDRE_RDV_SUBTITLE,
  PRENDRE_RDV_USE_CASES_LINE,
} from '@/lib/prendre-rendez-vous-page-config';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';

const RdvStickyMobileCta = dynamic(
  () =>
    import('@/components/prendre-rendez-vous/RdvStickyMobileCta').then((m) => ({
      default: m.RdvStickyMobileCta,
    })),
  { ssr: false },
);

export const revalidate = 3600;

const baseUrl = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const pageUrl = `${baseUrl}/prendre-rendez-vous`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...createPageMetadata({
      title: PRENDRE_RDV_PAGE_TITLE,
      titleAbsolute: PRENDRE_RDV_PAGE_TITLE,
      description: PRENDRE_RDV_META_DESCRIPTION,
      descriptionFinal: true,
      path: '/prendre-rendez-vous',
      appendAuthorSuffix: false,
      openGraphTitle: PRENDRE_RDV_PAGE_TITLE,
      openGraphDescription: PRENDRE_RDV_META_DESCRIPTION,
      robots: { index: true, follow: true },
    }),
    alternates: {
      canonical: pageUrl,
      languages: { 'fr-FR': pageUrl },
    },
  };
}

export default function PrendreRendezVousPage() {
  const faqSchema = getFAQSchema([...FAQ_PRENDRE_RDV_PAGE]);

  const pageGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Prendre rendez-vous',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: PRENDRE_RDV_PAGE_TITLE,
        description: PRENDRE_RDV_META_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#organization` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        dateModified: getPillarPageContentUpdatedAt('/prendre-rendez-vous'),
        mainEntity: faqSchema ? { '@id': `${pageUrl}#faq` } : undefined,
      },
      ...(faqSchema
        ? [
            {
              ...(() => {
                const rest = { ...(faqSchema as Record<string, unknown>) };
                delete rest['@context'];
                return rest;
              })(),
              '@id': `${pageUrl}#faq`,
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-[80vh] pb-20 md:pb-0">
      <JsonLd id="schema-prendre-rendez-vous" data={pageGraph} />

      {/* ——— Hero compact ——— */}
      <header className={OFC_SEC.whiteMesh}>
        <div className={`${OFC_SECTION_INNER} max-w-2xl pb-10 pt-10 md:pb-14 md:pt-14`}>
          <h1 className="font-display text-[1.75rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {PRENDRE_RDV_H1}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-snug text-slate-600 sm:text-lg">
            {PRENDRE_RDV_SUBTITLE}
          </p>
          <p className="mt-3 text-sm font-medium text-slate-700">{PRENDRE_RDV_USE_CASES_LINE}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`#${PRENDRE_RDV_FORM_ANCHOR}`}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 w-full items-center justify-center px-6 sm:w-auto`}
            >
              {PRENDRE_RDV_CTA_PRIMARY}
            </a>
            <Link
              href={PRENDRE_RDV_FORMATIONS_HREF}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 w-full items-center justify-center px-6 sm:w-auto`}
            >
              {PRENDRE_RDV_CTA_SECONDARY}
            </Link>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600">{PRENDRE_RDV_REASSURANCE}</p>

          {/* Preuves — 3 max, CSS only */}
          <ul className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {PRENDRE_RDV_PROOFS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ——— À qui ——— */}
      <section className="border-t border-slate-100 bg-[#F2F2F2]" aria-labelledby="rdv-audience">
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <h2 id="rdv-audience" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            {PRENDRE_RDV_AUDIENCE_TITLE}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {PRENDRE_RDV_AUDIENCE_CARDS.map((card) => (
              <li
                key={card.title}
                className="rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 transition-colors hover:border-[var(--accent)]/40"
              >
                <p className="font-semibold text-slate-900">{card.title}</p>
                <p className="mt-0.5 text-sm text-slate-600">{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Ce que vous obtenez ——— */}
      <section className="bg-white" aria-labelledby="rdv-process">
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <h2 id="rdv-process" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            {PRENDRE_RDV_PROCESS_TITLE}
          </h2>
          <ol className="mt-8 space-y-6">
            {PRENDRE_RDV_PROCESS_STEPS.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white"
                  aria-hidden
                >
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 max-w-prose text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Formulaire (îlot client différé) ——— */}
      <section
        className="scroll-mt-24 border-t border-slate-100 bg-[#F8FAFC]"
        id={PRENDRE_RDV_FORM_ANCHOR}
        aria-labelledby="rdv-agenda"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <h2 id="rdv-agenda" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            {PRENDRE_RDV_FORM_TITLE}
          </h2>
          <p className="mt-2 max-w-prose text-sm text-slate-600">{PRENDRE_RDV_FORM_SUBTITLE}</p>
          <div className="mx-auto mt-8 max-w-[720px]">
            <RdvBookingFlowIsland />
          </div>
        </div>
      </section>

      {/* ——— Après / secours ——— */}
      <section className="bg-white" aria-labelledby="rdv-apres">
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-14`}>
          <h2 id="rdv-apres" className="font-display text-lg font-bold text-slate-900 md:text-xl">
            Après la réservation
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-slate-700">
            {PRENDRE_RDV_APRES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-600">{PRENDRE_RDV_DEVIS_FORMULATION}</p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-slate-900">
              Aucun créneau ne vous convient ?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Décrivez brièvement votre besoin : réponse par email.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={PRENDRE_RDV_CONTACT_HREF}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5`}
              >
                Envoyer une demande
              </Link>
              <a
                href={`mailto:${PRENDRE_RDV_EMAIL}`}
                className={`${OFC_LINK} inline-flex min-h-11 items-center text-sm`}
              >
                {PRENDRE_RDV_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FAQ bas de page (SEO) ——— */}
      <section className="border-t border-slate-100 bg-[#F2F2F2]">
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-14`}>
          <FAQSection
            items={[...FAQ_PRENDRE_RDV_PAGE]}
            title="Questions fréquentes"
            subtitle="Gratuité, déroulement, absence de créneau."
          />
          <p className="mt-8 max-w-prose text-xs leading-relaxed text-slate-500">
            {PRENDRE_RDV_GEO_NOTE}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Vos données servent uniquement à préparer l’échange.{' '}
            <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </section>

      <RdvStickyMobileCta />
    </main>
  );
}
