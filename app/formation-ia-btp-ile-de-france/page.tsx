import Link from 'next/link';
import type { Metadata } from 'next';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQSection } from '@/components/landing/FAQSection';
import { QualiopiSatisfactionSource } from '@/components/formation/QualiopiSatisfactionSource';
import { VoirAussi } from '@/components/VoirAussi';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import {
  buildFormationIaCourseJsonLd,
  getFormationIleDeFrancePageLocalBusinessJsonLd,
  IDF_COURSE_AREA_SERVED_NAMES,
} from '@/lib/seo-formation-ia-schemas';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { voirAussiIdfProps } from '@/lib/voir-aussi';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export const revalidate = 3600;

const PATH = '/formation-ia-btp-ile-de-france';

const META_TITLE = 'Formation IA bâtiment Île-de-France | Laure Olivié';
/** 151 caractères — phrase complète, sans ellipse */
const META_DESCRIPTION =
  'Formation IA appliquée au bâtiment et à la construction en Île-de-France : devis, DCE et CR. Présentiel, Qualiopi, finançable Constructys. RDV gratuit.';

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
    publishedTime: '2026-05-19',
    modifiedTime: '2026-07-14',
    author: 'Laure Olivié',
    section: 'Formation IA appliquée au bâtiment',
  },
  keywords: [
    'formation IA bâtiment Île-de-France',
    'formation IA construction Île-de-France',
    'formation IA BTP IDF',
    'formation ChatGPT bâtiment',
    'Qualiopi Constructys',
  ],
  image: {
    url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
    width: 1024,
    height: 682,
    alt: 'Formation IA bâtiment et construction en Île-de-France — Laure Olivié, Qualiopi',
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
    name: 'Formation IA pour le bâtiment et la construction en Île-de-France',
    description: `${SITE_CONFIG.legalName} : formation IA appliquée au bâtiment et à la construction en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Sessions 4 h en présentiel, Qualiopi. ${FINANCEMENT_FORMULATION_PRUDENTE}`,
    path: PATH,
    areaServed: [...IDF_COURSE_AREA_SERVED_NAMES],
  }),
  about: [
    { '@type': 'Thing', name: 'Bâtiment' },
    { '@type': 'Thing', name: 'Construction' },
    { '@type': 'Thing', name: 'Travaux publics' },
    { '@type': 'Place', name: 'Île-de-France' },
  ],
  keywords:
    'formation IA bâtiment, formation IA construction, formation IA BTP Île-de-France, ChatGPT BTP, Constructys',
};

const FAQ_IDF: FAQItem[] = [
  {
    q: 'Où se déroulent les formations en Île-de-France ?',
    a: `Exclusivement en présentiel en Île-de-France : en intra dans vos locaux ou en inter en salle. Basée à Guyancourt (78), Laure Olivié intervient sur Paris et les départements 75, 77, 78, 91, 92, 93, 94 et 95.`,
  },
  {
    q: 'La formation IA construction est-elle finançable par Constructys ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} Les plafonds et l'éligibilité dépendent de votre situation (entreprise BTP cotisante Constructys). Un devis et une estimation de prise en charge sont transmis après la visio découverte.`,
  },
  {
    q: 'Intervenez-vous à Paris et en petite/grande couronne ?',
    a: `Oui. Les sessions couvrent Paris (75) ainsi que la petite et la grande couronne francilienne (77, 78, 91, 92, 93, 94, 95). Pour un besoin centré sur Paris, voir aussi la page formation IA BTP à Paris.`,
  },
  {
    q: 'Sur quels documents travaille-t-on en formation ?',
    a: `Sur vos documents BTP réels : devis, DCE/CCTP, mémoires techniques, comptes rendus de chantier, DOE et emails. L'objectif est une méthode opérationnelle dès le lendemain, avec validation métier de votre côté.`,
  },
  {
    q: 'Combien de professionnels avez-vous formés ?',
    a: `Plus de ${formatProfessionalsTrainedCount()} professionnels formés, note moyenne ${SOCIAL_PROOF.AVERAGE_RATING}. Organisme OFC Création d'Entreprise, certifié Qualiopi — actions de formation.`,
  },
];

export default function FormationIaBtpIleDeFrancePage() {
  const localBusinessSchema = getFormationIleDeFrancePageLocalBusinessJsonLd();
  const faqSchema = getFAQSchema(FAQ_IDF);

  return (
    <>
      <JsonLd id="schema-formation-idf-course" schema={COURSE_JSON_LD} />
      <JsonLd id="schema-formation-idf-localbusiness" schema={localBusinessSchema} />
      {faqSchema ? <JsonLd id="schema-formation-idf-faq" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: LINKS.home },
                { label: 'Formation IA BTP Île-de-France', href: PATH },
              ]}
            />
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
              Présentiel · Qualiopi · Constructys · Île-de-France
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
              Formation IA pour le bâtiment et la construction en Île-de-France
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Laure Olivié forme les TPE et PME du bâtiment et de la construction en présentiel uniquement, en
              Île-de-France uniquement : devis, DCE, comptes rendus et administratif sur vos documents réels.{' '}
              {formatProfessionalsTrainedCount()} professionnels formés, note {SOCIAL_PROOF.AVERAGE_RATING}. Organisme
              certifié Qualiopi — {FINANCEMENT_FORMULATION_PRUDENTE}
            </p>
            <QualiopiSatisfactionSource className="mt-4" />
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="docs-btp-reels">
          <div className="mx-auto max-w-4xl">
            <h2 id="docs-btp-reels" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Une formation IA sur vos documents BTP réels
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Chaque session de 4 h s&apos;appuie sur vos pièces de chantier et d&apos;études — pas de théorie
              générique. Vous repartez avec une méthode applicable dès le lendemain.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Devis et chiffrage',
                'Analyse DCE / CCTP',
                'Mémoires techniques',
                'Comptes rendus de chantier',
                'DOE et documents de réception',
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

        <section className={OFC_SEC.white} aria-labelledby="intra-inter-idf">
          <div className="mx-auto max-w-4xl">
            <h2 id="intra-inter-idf" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Intra ou inter, partout en Île-de-France
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Sessions <strong>intra</strong> dans vos locaux ou <strong>inter</strong> en salle, sur Paris et les huit
              départements franciliens : 75, 77, 78, 91, 92, 93, 94 et 95. Si votre besoin est centré sur la capitale,
              consultez la{' '}
              <Link href={LINKS.formationParis} className={OFC_LINK} title="Formation IA bâtiment à Paris">
                formation IA bâtiment à Paris
              </Link>
              . Pour choisir le prestataire, découvrez{' '}
              <Link href={LINKS.formateurIaBtp} className={OFC_LINK} title="Formatrice IA spécialisée construction">
                une formatrice IA spécialisée construction
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={OFC_SEC.mutedCompact}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Cadrer votre formation IA en Île-de-France
            </h2>
            <p className="mt-3 text-blue-100">
              30 min en visio : format intra ou inter, financement Constructys selon éligibilité, sans engagement.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="idf-mid-page"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="pourquoi-laure-idf">
          <div className="mx-auto max-w-4xl">
            <h2 id="pourquoi-laure-idf" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Pourquoi Laure Olivié
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Formatrice IA spécialisée BTP depuis 2022, après 10 ans de terrain comme conductrice de travaux (ex-ALIA
              BTP). Références : FFB Grand Paris, {CSFE_NOM_COMPLET}, CNAM Entreprise, instructrice LinkedIn Learning.
              Méthode 100 % pratique, présentiel en Île-de-France.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              En savoir plus sur{' '}
              <Link href={LINKS.aPropos} className={OFC_LINK} title="À propos de Laure Olivié">
                Laure Olivié et OFC Création d&apos;Entreprise
              </Link>
              , ou parcourir les{' '}
              <Link href={LINKS.formations} className={OFC_LINK} title="Catalogue formations IA pour le BTP">
                programmes Qualiopi de 4 h
              </Link>
              .
            </p>
          </div>
        </section>

        <FAQSection
          id="faq-idf"
          title="FAQ"
          subtitle="Réponses concrètes sur le présentiel, le financement et la couverture francilienne."
          items={FAQ_IDF}
        />

        <section id="rdv" className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Réservez votre visio découverte gratuite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Diagnostic de 30 minutes pour choisir la formation IA adaptée à votre équipe du bâtiment ou de la
              construction en Île-de-France.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="idf-footer"
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
            {...voirAussiIdfProps({
              currentPath: PATH,
              excludeHrefs: [
                LINKS.formations,
                LINKS.formationParis,
                LINKS.formateurIaBtp,
                LINKS.aPropos,
              ],
            })}
          />
        </div>
      </article>
    </>
  );
}
