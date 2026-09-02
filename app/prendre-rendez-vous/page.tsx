import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSection } from '@/components/landing/FAQSection';
import { PrendreRdvAgenda } from '@/components/prendre-rendez-vous/PrendreRdvAgenda';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  FAQ_PRENDRE_RDV_PAGE,
  PRENDRE_RDV_AGENDA_POINTS,
  PRENDRE_RDV_APRES,
  PRENDRE_RDV_CHECKLIST,
  PRENDRE_RDV_CONTACT_HREF,
  PRENDRE_RDV_DEVIS_FORMULATION,
  PRENDRE_RDV_EMAIL,
  PRENDRE_RDV_H1,
  PRENDRE_RDV_META_DESCRIPTION,
  PRENDRE_RDV_PAGE_TITLE,
  PRENDRE_RDV_PRIVACY_HREF,
  PRENDRE_RDV_REASSURANCE,
  PRENDRE_RDV_SUBTITLE,
} from '@/lib/prendre-rendez-vous-page-config';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';

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
    <div className="min-h-[80vh]">
      <JsonLd id="schema-prendre-rendez-vous" data={pageGraph} />

      <section className={OFC_SEC.whiteMesh}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          {/* 1 — Hero */}
          <header>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {PRENDRE_RDV_H1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {PRENDRE_RDV_SUBTITLE}
            </p>
            <p className="mt-3 text-sm font-medium text-slate-700">{PRENDRE_RDV_REASSURANCE}</p>
          </header>

          {/* 2 — Ce que nous aborderons */}
          <section className="mt-12" aria-labelledby="rdv-aborderons">
            <h2 id="rdv-aborderons" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Ce que nous aborderons
            </h2>
            <ul className="mt-5 space-y-4">
              {PRENDRE_RDV_AGENDA_POINTS.map((point) => (
                <li key={point.title}>
                  <p className="font-semibold text-slate-900">{point.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{point.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-600">
              Aucun document confidentiel n’est nécessaire pour ce premier échange.
            </p>
          </section>

          {/* 3 — Avant de réserver */}
          <section className="mt-12" aria-labelledby="rdv-preparer">
            <h2 id="rdv-preparer" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Avant de réserver
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Préparez ces éléments — sans envoyer de DCE, données personnelles sensibles, documents de
              chantier ou information médicale via Calendly.
            </p>
            <ul className="mt-5 list-inside list-disc space-y-2 text-sm text-slate-700">
              {PRENDRE_RDV_CHECKLIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 4 — Agenda */}
          <section className="mt-12 scroll-mt-24" id="agenda" aria-labelledby="rdv-agenda">
            <h2 id="rdv-agenda" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Choisir un créneau
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Un seul agenda — visio ou téléphone selon le créneau Calendly.
            </p>
            <div className="mt-6">
              <PrendreRdvAgenda />
            </div>
          </section>

          {/* 5 — Après la réservation */}
          <section className="mt-12" aria-labelledby="rdv-apres">
            <h2 id="rdv-apres" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Après la réservation
            </h2>
            <ul className="mt-5 list-inside list-disc space-y-2 text-sm text-slate-700">
              {PRENDRE_RDV_APRES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">{PRENDRE_RDV_DEVIS_FORMULATION}</p>
          </section>

          {/* 6 — Aucun créneau */}
          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8" aria-labelledby="rdv-aucun-creneau">
            <h2 id="rdv-aucun-creneau" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Aucun créneau ne vous convient ?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Décrivez brièvement votre besoin : nous vous répondrons par email.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={PRENDRE_RDV_CONTACT_HREF}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Envoyer votre demande
              </Link>
              <a href={`mailto:${PRENDRE_RDV_EMAIL}`} className={`${OFC_LINK} inline-flex min-h-11 items-center`}>
                {PRENDRE_RDV_EMAIL}
              </a>
            </div>
          </section>

          {/* 7 — FAQ */}
          <div className="mt-12">
            <FAQSection
              items={[...FAQ_PRENDRE_RDV_PAGE]}
              title="Questions fréquentes"
              subtitle="Gratuité, déroulement, absence de créneau."
            />
          </div>

          <p className="mt-10 text-xs text-slate-500">
            Service de réservation opéré par Calendly (sous-traitant). Détails :{' '}
            <Link href={PRENDRE_RDV_PRIVACY_HREF} className={OFC_LINK}>
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
