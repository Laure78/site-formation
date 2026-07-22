import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/landing/FAQSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { QualiopiSatisfactionSource } from '@/components/formation/QualiopiSatisfactionSource';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
import { buildOrganizationOfcSchemaNode } from '@/lib/schema-organization-global';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import type { FAQItem } from '@/lib/faq';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

export const revalidate = 3600;

const PATH = '/formateur-ia-btp';

/** Segment sans suffixe — `buildMetadata` ajoute « | Laure Olivié ». */
const META_TITLE = 'Formateur IA bâtiment Île-de-France';
/** 156 car. — intention « formateur » + IDF, sans ellipse */
const META_DESCRIPTION =
  'Formateur IA BTP Île-de-France : Laure Olivié forme vos équipes en présentiel sur devis, DCE et chantier. Qualiopi, OFC. 1 592 pros, 4,85/5. RDV découverte.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-07-14',
    modifiedTime: '2026-07-14',
    author: 'Laure Olivié',
    section: 'Formateur IA BTP',
  },
  keywords: [
    'formateur IA bâtiment',
    'formateur IA construction',
    'formatrice IA BTP',
    'formateur IA Paris',
    'formateur IA Île-de-France',
    'Laure Olivié',
  ],
  image: {
    url: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
    width: 1200,
    height: 630,
    alt: 'Laure Olivié, formatrice IA bâtiment et construction — OFC Qualiopi',
  },
});

const FAQ_FORMATEUR: FAQItem[] = [
  {
    q: 'Comment choisir un formateur IA pour le BTP ?',
    a: `Privilégiez un profil qui connaît le chantier (devis, DCE, CCTP, mémoire technique) et qui forme en présentiel sur vos documents — pas une formation IA généraliste. Vérifiez Qualiopi, les références professionnelles (fédérations, OPCO) et la possibilité d'un financement selon éligibilité. Laure Olivié combine 10 ans de terrain BTP et une pratique IA depuis 2022.`,
  },
  {
    q: 'Formateur IA bâtiment ou formatrice : quelle différence ?',
    a: `La requête « formateur IA » désigne souvent le prestataire, homme ou femme. Laure Olivié est formatrice IA spécialisée bâtiment et construction : c'est le même métier, avec une expertise BTP concrète (ex-conductrice de travaux). Le choix se joue sur le terrain, la méthode et les preuves — pas sur le genre du titre.`,
  },
  {
    q: 'Intervenez-vous à Paris intra-muros ?',
    a: `Oui. Sessions en présentiel à Paris (intra dans vos locaux ou inter en salle) pour les entreprises et chantiers parisiens. Pour la petite et grande couronne, voir aussi la couverture Île-de-France (75 à 95).`,
  },
  {
    q: 'Formez-vous en construction / travaux publics aussi ?',
    a: `Oui. Le public vise le bâtiment, la construction (gros œuvre, second œuvre) et les travaux publics : dirigeants, conducteurs de travaux, chargés d'affaires, équipes études et supports. On adapte les cas (DCE, chiffrage, CR, administratif) à votre métier.`,
  },
];

export default function FormateurIaBtpPage() {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const personSchema = {
    '@context': 'https://schema.org',
    ...buildPersonLaureSchemaNode({
      personId: `${base}/formateur-ia-btp#person`,
      pageUrl: `${base}/formateur-ia-btp`,
      organizationId: `${base}/#organization`,
    }),
  };
  const organizationSchema = {
    '@context': 'https://schema.org',
    ...buildOrganizationOfcSchemaNode({
      organizationId: `${base}/#organization`,
      personId: `${base}/formateur-ia-btp#person`,
    }),
  };
  const faqSchema = getFAQSchema(FAQ_FORMATEUR);

  return (
    <>
      <JsonLd id="schema-formateur-ia-btp-person" schema={personSchema} />
      <JsonLd id="schema-formateur-ia-btp-organization" schema={organizationSchema} />
      {faqSchema ? <JsonLd id="schema-formateur-ia-btp-faq" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
              {SITE_CONFIG.legalName} · Formatrice Qualiopi · Présentiel Île-de-France
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
              Formatrice IA spécialisée bâtiment et construction en Île-de-France
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Vous cherchez un formateur IA pour le bâtiment ou la construction, à Paris ou en Île-de-France ?
              Laure Olivié forme vos équipes en présentiel, sur vos vrais documents.
            </p>
            <QualiopiSatisfactionSource className="mt-4" />
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="profil-rare">
          <div className="mx-auto max-w-4xl">
            <h2 id="profil-rare" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Un profil rare : 10 ans de terrain BTP + expertise IA
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Avant de former à ChatGPT et Claude AI, Laure Olivié a été <strong>conductrice de travaux</strong>{' '}
              (ex-ALIA BTP) : plannings, sous-traitance, suivi de chantier, pression des délais. Aujourd&apos;hui
              dirigeante de {SITE_CONFIG.legalName}, elle forme depuis 2022 des TPE et PME du BTP — un formateur /
              une formatrice qui parle le langage du terrain, pas seulement celui des outils.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="ce-que-change">
          <div className="mx-auto max-w-4xl">
            <h2 id="ce-que-change" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Ce qu&apos;un formateur IA spécialisé BTP change pour vos équipes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Pas de PowerPoint générique : on applique l&apos;IA à vos devis, DCE/CCTP, mémoires techniques,
              comptes rendus de chantier et administratif. Les gains sont concrets — temps récupéré, documents
              plus propres — avec une <strong>validation métier</strong> de votre côté avant tout envoi client ou
              maître d&apos;ouvrage.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Devis et chiffrage',
                'Analyse DCE / CCTP',
                'Mémoires techniques',
                'Comptes rendus de chantier',
                'Emails et relances',
                'Documents administratifs',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm font-medium text-slate-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={OFC_SEC.mutedCompact}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Échanger 30 min sur votre besoin de formation
            </h2>
            <p className="mt-3 text-blue-100">
              Visio découverte gratuite — public, format intra/inter, financement OPCO possible selon éligibilité.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="formateur-mid-page"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="ou-intervient">
          <div className="mx-auto max-w-4xl">
            <h2 id="ou-intervient" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Où intervient votre formatrice IA BTP
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Présentiel uniquement · Île-de-France uniquement. Sessions <strong>intra</strong> dans vos locaux ou{' '}
              <strong>inter</strong> en salle — Paris (75) et départements 77, 78, 91, 92, 93, 94, 95. Détail région :{' '}
              <Link href={LINKS.formationIleDeFrance} className={OFC_LINK}>
                couverture présentiel francilienne
              </Link>
              . Focus capital :{' '}
              <Link href={LINKS.formationParis} className={OFC_LINK}>
                sessions IA dans Paris intra-muros
              </Link>
              . Pour choisir un programme précis, voir les{' '}
              <Link href={LINKS.formations} className={OFC_LINK}>
                parcours catalogue Qualiopi
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="references-preuves">
          <div className="mx-auto max-w-4xl">
            <h2 id="references-preuves" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Références et preuves
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {formatProfessionalsTrainedCount()} professionnels formés, note moyenne {SOCIAL_PROOF.AVERAGE_RATING}.
              Organisme certifié Qualiopi — actions de formation. {FINANCEMENT_FORMULATION_PRUDENTE} Références : FFB
              Grand Paris, {CSFE_NOM_COMPLET}, CNAM Entreprise, Lefebvre Dalloz, instructrice LinkedIn Learning.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Parcours détaillé sur la page{' '}
              <Link href={LINKS.aPropos} className={OFC_LINK}>
                à propos de Laure Olivié
              </Link>
              .
            </p>
          </div>
        </section>

        <FAQSection
          id="faq-formateur"
          title="FAQ"
          subtitle="Choisir un formateur / une formatrice IA pour le BTP — réponses claires."
          items={FAQ_FORMATEUR}
        />

        <RelatedLinks path={LINKS.formateurIaBtp} />

        <section id="rdv" className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Réservez votre visio découverte gratuite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              30 minutes pour vérifier que Laure Olivié est le bon prestataire formateur / formatrice IA pour votre
              équipe bâtiment ou construction.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="formateur-footer"
                ctaPosition="footer"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Réservez votre visio découverte gratuite
              </CalendlyEmbed>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
