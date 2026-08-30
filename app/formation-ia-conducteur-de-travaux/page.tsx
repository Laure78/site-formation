import Link from 'next/link';
import { FormationSeoClusterLanding } from '@/components/seo-cluster/FormationSeoClusterLanding';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import {
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
} from '@/lib/formation-ia-conducteur-de-travaux-landing';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import {
  FORMATION_COURSE_DURATION_ISO,
  FORMATION_COURSE_MODE_ONSITE,
} from '@/lib/schema-formation-course-jsonld';
import { SCHEMA_ORGANIZATION_OFC, SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import {
  CONDUCTEUR_FAQ_EXTRA,
  CONDUCTEUR_PROMPTS,
  ETUDE_CAS_FFB_CSFE_PARAGRAPHS,
  PROMPTS_SECTION_INTRO,
} from '@/lib/formation-ia-conducteur-de-travaux-extra-content';
import {
  CONDUCTEUR_TRAVAUX_HERO_PROOF_ITEMS,
  ProofStats,
} from '@/components/ProofStats';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const revalidate = 3600;

const PAGE_TITLE = 'Formation IA Conducteur de Travaux BTP | Laure Olivié';
const PAGE_DESCRIPTION =
  'Formation IA conducteur de travaux : comptes rendus, PPSPS, DOE, analyse CCTP et courriers chantier. Présentiel Île-de-France, organisme certifié Qualiopi.';

const COURSE_SCHEMA_NAME = "L'IA appliquée à la conduite de travaux";

const GAINS_TACHES_ROWS = [
  ['CR de chantier', '1 h 30', '15 min'],
  ['PPSPS', '4 h', '45 min'],
  ['DUERP', '2 h', '30 min'],
  ['OS et réserves', '1 h', '10 min'],
  ['Relance sous-traitant', '20 min', '3 min'],
] as const;

const PAGE_CONFIG: SeoClusterPageConfig = {
  ...FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG,
  faq: [...FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.faq, ...CONDUCTEUR_FAQ_EXTRA],
};

const SOMMAIRE_AFTER_USAGES = [
  { href: '#gains-taches', label: 'Ce que l\u2019IA fait gagner, tâche par tâche' },
  { href: '#prompts', label: '8 prompts prêts à l\u2019emploi' },
  { href: '#etude-cas', label: 'Étude de cas — sessions FFB et CSFE' },
] as const;

export const metadata = createPageMetadata({
  title: 'Formation IA Conducteur de Travaux BTP',
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
  openGraphTitle: PAGE_TITLE,
  openGraphDescription: PAGE_DESCRIPTION,
  keywords: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.keywords,
  image: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.image,
  appendAuthorSuffix: false,
});

function stripJsonLdContext(node: Record<string, unknown>): Record<string, unknown> {
  const { '@context': _ctx, ...rest } = node;
  return rest;
}

/** @graph unique — Course + FAQPage + BreadcrumbList (données visibles sur la page). */
function buildFormationIaConducteurDeTravauxJsonLdGraph(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const pageUrl = `${base}${FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH}`;

  const course: Record<string, unknown> = {
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: COURSE_SCHEMA_NAME,
    description: PAGE_CONFIG.shortAnswer,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: FORMATION_COURSE_MODE_ONSITE,
        courseWorkload: FORMATION_COURSE_DURATION_ISO,
        location: {
          '@type': 'Place',
          name: 'Île-de-France, FR',
        },
      },
    ],
    offers: {
      '@type': 'Offer',
      price: String(TARIF_FORFAIT_DEBUTANT_HT),
      priceCurrency: 'EUR',
    },
  };

  const faqSchema = getFAQSchema([...PAGE_CONFIG.faq]);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: LINKS.home },
    { name: 'Formations', path: LINKS.formations },
    { name: 'Formation IA Conducteur de Travaux', path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH },
  ]);

  const graph: Record<string, unknown>[] = [course];
  if (faqSchema) {
    graph.push(stripJsonLdContext(faqSchema as Record<string, unknown>));
  }
  if (breadcrumbSchema) {
    graph.push(stripJsonLdContext(breadcrumbSchema as Record<string, unknown>));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function ConducteurDeTravauxExtraSections() {
  return (
    <>
      <section id="gains-taches" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Ce que l&apos;IA fait gagner, tâche par tâche
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
            <caption className="sr-only">
              Gains de temps IA pour conducteur de travaux — avant et après formation
            </caption>
            <thead>
              <tr className="bg-slate-100">
                <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">
                  Tâche
                </th>
                <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">
                  Sans IA
                </th>
                <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">
                  Avec IA
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {GAINS_TACHES_ROWS.map(([tache, sansIa, avecIa]) => (
                <tr key={tache}>
                  <td className="border border-slate-200 p-3">{tache}</td>
                  <td className="border border-slate-200 p-3">{sansIa}</td>
                  <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{avecIa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Gains observés chez les entreprises formées. Ils varient selon l&apos;organisation et le niveau de
          pratique.
        </p>
      </section>

      <section id="prompts" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">8 prompts prêts à l&apos;emploi</h2>
        <p className="mt-3 leading-relaxed text-slate-600">{PROMPTS_SECTION_INTRO}</p>
        {CONDUCTEUR_PROMPTS.map((prompt, index) => (
          <div key={prompt.title} className="mt-8">
            <h3 className="font-display text-xl font-semibold text-slate-900">{prompt.title}</h3>
            {/* PROMPT_{index + 1} — marqueur éditorial */}
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
              {prompt.body}
            </pre>
          </div>
        ))}
      </section>

      <section id="etude-cas" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Étude de cas — sessions avec la FFB et la CSFE
        </h2>
        {ETUDE_CAS_FFB_CSFE_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="mt-4 leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
        <p className="mt-6">
          <Link href={LINKS.etudesCas} className="font-semibold text-[#377CF3] underline hover:no-underline">
            Lire l&apos;étude de cas FFB &amp; CSFE
          </Link>
        </p>
      </section>
    </>
  );
}

export default function FormationIaConducteurDeTravauxPage() {
  const jsonLdGraph = buildFormationIaConducteurDeTravauxJsonLdGraph();

  return (
    <>
      <JsonLd id="jsonld-formation-ia-conducteur-de-travaux-graph" data={jsonLdGraph} />
      <FormationSeoClusterLanding
        config={PAGE_CONFIG}
        suppressJsonLd
        afterH1={
          <div className="mt-6">
            <ProofStats
              items={CONDUCTEUR_TRAVAUX_HERO_PROOF_ITEMS}
              className="overflow-hidden rounded-2xl border border-slate-200"
            />
          </div>
        }
        afterUseCases={<ConducteurDeTravauxExtraSections />}
        sommaireAfterUseCases={SOMMAIRE_AFTER_USAGES}
      />
    </>
  );
}
