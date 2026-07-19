import Link from 'next/link';
import type { Metadata } from 'next';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import { QualiopiSatisfactionSource } from '@/components/formation/QualiopiSatisfactionSource';
import { InfosQualiopiLanding } from '@/components/formation/InfosQualiopi';
import { VoirAussi } from '@/components/VoirAussi';
import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  buildFormationIaCourseJsonLd,
  buildFormationIaDeptPageLocalBusinessJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { voirAussiDepartementProps } from '@/lib/voir-aussi';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { GEO_FORMATION_PARIS_75 } from '@/lib/geo-formation-config';
import { getDeptLocalSeoContent } from '@/lib/formation-ia-btp-dept-local-content';

export const revalidate = 3600;

const PATH = '/formation-ia-btp-paris';

const META_TITLE = 'Formation IA bâtiment Paris | Laure Olivié';
/** 159 caractères — phrase complète */
const META_DESCRIPTION =
  'Formation IA bâtiment et construction à Paris : devis, DCE, CR en présentiel intra dans vos locaux parisiens. Qualiopi, Constructys. Visio découverte gratuite.';

const pageMetadataBase = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-06-02',
    modifiedTime: '2026-07-14',
    author: SITE_CONFIG.name,
    section: 'Formation IA BTP Paris',
  },
  keywords: [
    'formation IA bâtiment Paris',
    'formation IA construction Paris',
    'formation IA BTP Paris',
    'ChatGPT chantier Paris',
    'Qualiopi Constructys',
  ],
  image: {
    url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
    width: 1024,
    height: 682,
    alt: 'Formation IA bâtiment et construction à Paris — Laure Olivié, présentiel Qualiopi',
  },
});

export const metadata: Metadata = {
  ...pageMetadataBase,
  title: { absolute: META_TITLE },
  alternates: {
    ...pageMetadataBase.alternates,
    canonical: PATH,
  },
};

const COURSE_JSON_LD = {
  ...buildFormationIaCourseJsonLd({
    name: 'Formation IA bâtiment et construction à Paris',
    description: META_DESCRIPTION,
    path: PATH,
    areaServed: ['Paris', 'Paris (75)', ...GEO_FORMATION_PARIS_75.villes],
  }),
  about: [
    { '@type': 'Thing', name: 'Bâtiment' },
    { '@type': 'Thing', name: 'Construction' },
    { '@type': 'Place', name: 'Paris' },
  ],
  keywords:
    'formation IA bâtiment Paris, formation IA construction Paris, bâtiment, construction, ChatGPT BTP Paris, présentiel Onsite',
};

const FAQ_PARIS: FAQItem[] = (
  getDeptLocalSeoContent('75')?.faq.map(({ q, a }) => ({ q, a })) ?? []
).concat([
  {
    q: 'La formation couvre-t-elle le bâtiment et la construction à Paris ?',
    a: 'Oui. Sessions pour entreprises du bâtiment et de la construction parisiennes : devis, DCE, mémoires techniques, comptes rendus — sur vos documents réels, en présentiel intra-muros.',
  },
]);

export default function FormationIaBtpParisPage() {
  const localBusinessJsonLd = buildFormationIaDeptPageLocalBusinessJsonLd({
    path: PATH,
    departementNom: 'Paris',
    deptCode: '75',
    description: META_DESCRIPTION,
  });
  const faqSchema = getFAQSchema(FAQ_PARIS);

  return (
    <>
      <JsonLd id="schema-geo-course-75" schema={COURSE_JSON_LD} />
      <JsonLd id="schema-geo-localbusiness-75" schema={localBusinessJsonLd} />
      {faqSchema ? <JsonLd id="schema-geo-faq-75" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-6xl">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: LINKS.home },
                { label: 'Formation IA BTP Paris', href: PATH },
              ]}
            />
            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:gap-12">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
                  Paris (75) · Intra-muros · Présentiel · Qualiopi
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
                  Formation IA bâtiment et construction à Paris
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Pour les entreprises et chantiers <strong>parisiens</strong> — sièges et équipes basés à Paris
                  intra-muros (20 arrondissements). Session de 4 h en présentiel dans vos locaux : devis, DCE/CCTP,
                  mémoires techniques et comptes rendus sur vos documents de construction réels.{' '}
                  {formatProfessionalsTrainedCount()} pros formés, note {SOCIAL_PROOF.AVERAGE_RATING}. Qualiopi —{' '}
                  {FINANCEMENT_FORMULATION_PRUDENTE}
                </p>
                <QualiopiSatisfactionSource className="mt-4" />
                <p className="mt-6 text-base leading-relaxed text-slate-600">
                  Vous êtes en petite ou grande couronne ? Voir la{' '}
                  <Link href={LINKS.formationIleDeFrance} className={OFC_LINK}>
                    formation IA BTP en Île-de-France
                  </Link>
                  . Pour comparer les parcours, consultez le{' '}
                  <Link href={LINKS.formations} className={OFC_LINK}>
                    catalogue formation IA pour le BTP
                  </Link>
                  .
                </p>
              </div>
              <aside className="mx-auto w-full max-w-[320px] shrink-0 lg:mx-0 lg:max-w-none">
                <OfcPromoVideoEmbed
                  variant="heroColumn"
                  alt="Formation IA BTP à Paris — présentiel intra, session 4 h"
                />
              </aside>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="paris-docs-construction">
          <div className="mx-auto max-w-4xl">
            <h2
              id="paris-docs-construction"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Une formation IA pour les entreprises de construction parisiennes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              À Paris, le bâtiment et la construction cumulent contraintes de site occupé, copropriétés,
              accès difficiles et écriture contractuelle dense. On travaille sur vos pièces locales — pas sur
              des cas génériques IDF.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Devis et chiffrage de rénovation parisienne',
                'DCE / CCTP de marchés parisiens',
                'Mémoires techniques & réponses',
                'CR de chantier en site occupé',
                'DOE et courriers MOA / syndic',
                'Emails et relances clients',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="paris-arrondissements">
          <div className="mx-auto max-w-4xl">
            <h2
              id="paris-arrondissements"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Intra dans vos locaux — tous les arrondissements
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Sessions <strong>intra</strong> chez vous à Paris, ou <strong>inter</strong> en salle intramuros.
              Zones fréquemment demandées :
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {GEO_FORMATION_PARIS_75.villes.map((zone) => (
                <li
                  key={zone}
                  className="rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm text-slate-800"
                >
                  {zone}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Animée par{' '}
              <Link href={LINKS.formateurIaBtp} className={OFC_LINK}>
                une formatrice IA spécialisée construction
              </Link>{' '}
              (Laure Olivié — 10 ans de terrain, ex-conductrice de travaux).
            </p>
          </div>
        </section>

        <section className={OFC_SEC.mutedCompact}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Cadrer votre session IA à Paris
            </h2>
            <p className="mt-3 text-blue-100">
              30 min en visio : format intra parisien, financement Constructys selon éligibilité, sans
              engagement.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="paris-mid-page"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <InfosQualiopiLanding formationTitle="Formation IA BTP Paris (75)" />

        <FAQSection
          id="faq-paris"
          title="FAQ"
          subtitle="Sessions IA à Paris pour le bâtiment et la construction — réponses concrètes."
          items={FAQ_PARIS}
        />

        <section id="rdv" className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Réservez votre visio découverte gratuite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Diagnostic 30 min pour une formation IA adaptée à votre équipe parisienne du bâtiment ou de la
              construction.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="paris-footer"
                ctaPosition="footer"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Réservez votre visio découverte gratuite
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10">
          <VoirAussi
            {...voirAussiDepartementProps({
              currentPath: PATH,
              excludeHrefs: [
                LINKS.formationIleDeFrance,
                LINKS.formateurIaBtp,
                LINKS.formations,
              ],
            })}
          />
        </div>
      </article>
    </>
  );
}
