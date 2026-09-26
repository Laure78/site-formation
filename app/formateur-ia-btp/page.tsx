import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/landing/FAQSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { EnBref } from '@/app/components/EnBref';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
import { buildOrganizationOfcSchemaNode } from '@/lib/schema-organization-global';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import type { FAQItem } from '@/lib/faq';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';

export const revalidate = 3600;

const PATH = '/formateur-ia-btp';
const PAGE_INNER = OFC_SECTION_INNER;

/** Segment sans suffixe — `buildMetadata` ajoute « | Laure Olivié ». */
const META_TITLE = 'Formateur IA bâtiment Île-de-France';
/** 153 car. — intention « formateur » + IDF, sans ellipse */
const META_DESCRIPTION = `Formateur IA BTP en Île-de-France : Laure Olivié anime une formation IA pour le BTP sur devis, DCE et chantier. Qualiopi OFC, présentiel. RDV découverte.`;

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
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

const USAGES_IA_BTP = [
  'Devis et chiffrage',
  'Analyse DCE / CCTP',
  'Mémoires techniques',
  'Comptes rendus de chantier',
  'Emails et relances',
  'Documents administratifs',
] as const;

const FAQ_FORMATEUR: FAQItem[] = [
  {
    q: 'Comment choisir un formateur IA pour le BTP ?',
    a: `Privilégiez un profil qui connaît le chantier (devis, DCE, CCTP, mémoire technique) et qui forme en présentiel sur vos documents — pas une formation IA généraliste. Vérifiez Qualiopi, les références professionnelles (fédérations, OPCO) et la possibilité d'un financement selon éligibilité. Laure Olivié combine ${formatAnneesExperienceBTP()} et une pratique IA depuis 2022.`,
  },
  {
    q: 'Formateur IA bâtiment ou formatrice : quelle différence ?',
    a: `La requête « formateur IA » désigne souvent le prestataire, homme ou femme. Laure Olivié est formatrice IA spécialisée bâtiment et construction : c'est le même métier, avec une expertise BTP concrète (Ancienne dirigeante d’une entreprise de travaux publics). Le choix se joue sur le terrain, la méthode et les preuves — pas sur le genre du titre.`,
  },
  {
    q: 'Intervenez-vous à Paris intra-muros ?',
    a: `Oui. Sessions en présentiel à Paris (intra ou inter) pour les entreprises et chantiers parisiens. Pour la petite et grande couronne, voir aussi la couverture ${IDF_ZONE_INTERVENTION}.`,
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
          <div
            className={`${PAGE_INNER} lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,22rem)] lg:items-start lg:gap-10 xl:gap-12`}
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
                {SITE_CONFIG.legalName} · Formatrice Qualiopi · Présentiel Île-de-France
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
                Formatrice IA spécialisée bâtiment et construction en Île-de-France
              </h1>
              <EnBref className="mt-4">
                <p>
                  Laure Olivié forme les professionnels du BTP à l&apos;intelligence artificielle sur leurs
                  documents réels — devis, DCE, mémoires techniques, comptes rendus de chantier. Ancienne
                  dirigeante d’une entreprise de travaux publics, elle intervient via OFC Création
                  d&apos;Entreprise, certifié Qualiopi, en présentiel intra ou inter.
                </p>
              </EnBref>
              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                Vous cherchez un formateur IA pour le bâtiment ou la construction, à Paris ou en
                Île-de-France ? Laure Olivié forme vos équipes en présentiel, sur vos vrais documents.
              </p>
            </div>

            <aside
              className="mt-8 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 sm:p-6 lg:mt-1"
              aria-labelledby="formateur-synthese-title"
            >
              <h2 id="formateur-synthese-title" className="font-display text-base font-bold text-slate-900">
                En synthèse
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-snug text-slate-700">
                <li>
                  <span className="font-semibold text-slate-900">Qualiopi</span> — actions de formation
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Présentiel</span> — {IDF_ZONE_INTERVENTION}
                </li>
                <li>
                  <span className="font-semibold text-slate-900">{formatAnneesExperienceBTP()}</span> sur le
                  terrain BTP
                </li>
                <li>Formations IA BTP depuis 2022</li>
              </ul>
              <div className="mt-5">
                <CalendlyEmbed
                  type="link"
                  variant="primary"
                  campaign="formateur-hero"
                  ctaPosition="hero"
                  className="inline-flex w-full items-center justify-center px-4 py-2.5 text-sm sm:w-auto"
                />
              </div>
            </aside>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="profil-rare">
          <div className={`${PAGE_INNER} lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14`}>
            <div className="min-w-0">
              <h2 id="profil-rare" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Un profil rare : {formatAnneesExperienceBTP()} + expertise IA
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Avant ChatGPT et Claude AI, Laure Olivié a dirigé une entreprise de travaux publics (ex-ALIA
                BTP) : plannings, sous-traitance, suivi de chantier, pression des délais.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Fondatrice de {SITE_CONFIG.legalName}, elle forme depuis 2022 des TPE et PME du BTP — une
                formatrice qui parle le langage du terrain, pas seulement celui des outils.
              </p>
            </div>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 lg:mt-0 lg:border-l-[3px] lg:border-l-[#377CF3] lg:pl-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
                Ce que cela change en session
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                <li>Exemples tirés du chantier, pas de jargon startup.</li>
                <li>Cas concrets : DCE, devis, CR, administratif.</li>
                <li>Validation métier systématique avant envoi client.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="ce-que-change">
          <div className={`${PAGE_INNER} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 xl:gap-14`}>
            <div className="min-w-0">
              <h2 id="ce-que-change" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Ce qu&apos;un formateur IA spécialisé BTP change pour vos équipes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Pas de PowerPoint générique : on applique l&apos;IA à vos documents métier. Les gains sont
                concrets — temps récupéré, livrables plus propres — avec une{' '}
                <strong>validation métier</strong> avant tout envoi client ou maître d&apos;ouvrage.
              </p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0">
              {USAGES_IA_BTP.map((item) => (
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
          <div className={`${PAGE_INNER} rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10 md:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10`}>
            <div className="min-w-0 lg:max-w-2xl">
              <h2 className="font-display text-xl font-bold md:text-2xl">
                Échanger 30 min sur votre besoin de formation
              </h2>
              <p className="mt-3 text-blue-100">
                Visio découverte gratuite — public, format intra/inter, financement OPCO possible selon
                éligibilité.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="formateur-mid-page"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              />
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="ou-intervient">
          <div className={`${PAGE_INNER} lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,22rem)] lg:gap-10 xl:gap-12`}>
            <div className="min-w-0">
              <h2 id="ou-intervient" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Où intervient votre formatrice IA BTP
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Présentiel uniquement · Île-de-France uniquement. Sessions <strong>intra</strong> (dans vos
                locaux) ou <strong>inter</strong> en salle — {IDF_ZONE_INTERVENTION}.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Pour choisir un programme précis, parcourez les{' '}
                <Link href={LINKS.formations} className={OFC_LINK}>
                  parcours catalogue — organisme certifié Qualiopi
                </Link>
                .
              </p>
            </div>
            <nav
              className="mt-6 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 lg:mt-0"
              aria-label="Zones et pages utiles"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Aller plus loin</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href={LINKS.formationIleDeFrance} className={OFC_LINK}>
                    Couverture présentiel francilienne
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.formationParis} className={OFC_LINK}>
                    Sessions IA à Paris intra-muros
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.financement} className={OFC_LINK}>
                    Financement OPCO Constructys
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="references-preuves">
          <div className={`${PAGE_INNER} lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-14`}>
            <div className="min-w-0">
              <h2 id="references-preuves" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Références et preuves
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Organisme certifié Qualiopi — actions de formation. {FINANCEMENT_FORMULATION_PRUDENTE}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Parcours détaillé sur la page{' '}
                <Link href={LINKS.aPropos} className={OFC_LINK}>
                  à propos de Laure Olivié
                </Link>
                .
              </p>
            </div>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 lg:mt-0">
              <h3 className="text-sm font-semibold text-slate-900">Références professionnelles</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[
                  'FFB Grand Paris',
                  CSFE_NOM_COMPLET,
                  'CNAM Entreprise',
                  'Le Moniteur Formations',
                  'LinkedIn Learning',
                ].map((label) => (
                  <li
                    key={label}
                    className="rounded-lg border border-slate-200 bg-[#F2F2F2] px-3 py-1.5 text-xs font-medium text-slate-800 sm:text-sm"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FAQSection
          id="faq-formateur"
          title="FAQ"
          subtitle="Choisir un formateur / une formatrice IA pour le BTP — réponses claires."
          items={FAQ_FORMATEUR}
          layout="wide"
        />

        <RelatedLinks path={LINKS.formateurIaBtp} layout="wide" />

        <section id="rdv" className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className={`${PAGE_INNER} lg:flex lg:items-center lg:justify-between lg:gap-10 lg:text-left`}>
            <div className="min-w-0 text-center lg:text-left">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Prendre rendez-vous</h2>
              <p className="mx-auto mt-4 max-w-2xl text-blue-100 lg:mx-0">
                30 minutes pour vérifier que Laure Olivié est le bon prestataire formateur / formatrice IA
                pour votre équipe bâtiment ou construction.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 justify-center lg:mt-0 lg:justify-end">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="formateur-footer"
                ctaPosition="footer"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-50"
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
