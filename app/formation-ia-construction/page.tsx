import Link from 'next/link';
import { CtaButton } from '@/components/CtaButton';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { Check } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { EnBref } from '@/app/components/EnBref';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { FormationPartenairesMention } from '@/components/formations/FormationPartenairesMention';
import { LiensConnexes } from '@/components/LiensConnexes';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { PreuveSociale } from '@/components/PreuveSociale';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { phraseSessionCataloguePresentielIdf } from '@/lib/catalogue-duree-copy';
import { MODALITE_FORMATIONS_STANDARD } from '@/lib/tarifs-sessions';
import {
  CONSTRUCTION_CONTROLE_CONFIDENTIALITE,
  CONSTRUCTION_FAQ,
  CONSTRUCTION_PROBLEM_POINTS,
  CONSTRUCTION_PROGRAMMES_ORIENTATION,
  CONSTRUCTION_PUBLICS,
  CONSTRUCTION_SOLUTION_POINTS,
  CONSTRUCTION_ZONE_INTERVENTION,
  FORMATION_IA_CONSTRUCTION_PATH,
  FORMATION_IA_CONSTRUCTION_SEO,
  METHODE_ETAPES_CONSTRUCTION,
  PROMPT_CHIFFRAGE_CONSTRUCTION,
  PROMPT_DCE_CONSTRUCTION,
  PROMPT_MEMOIRE_TECHNIQUE_CONSTRUCTION,
  buildFormationIaConstructionBreadcrumbJsonLd,
  buildFormationIaConstructionCourseJsonLd,
} from '@/lib/formation-ia-construction-landing';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: FORMATION_IA_CONSTRUCTION_SEO.title,
  description: FORMATION_IA_CONSTRUCTION_SEO.description,
  path: FORMATION_IA_CONSTRUCTION_PATH,
  appendAuthorSuffix: false,
  openGraphType: 'website',
  image: {
    url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
    width: 1024,
    height: 682,
    alt: 'Laure Olivié, formatrice IA construction — session en présentiel Île-de-France',
  },
  keywords: [
    'formation IA construction',
    'formation IA entreprise générale',
    'formation IA MOE BET',
    'formation ChatGPT construction',
    'OPCO Constructys',
    'Qualiopi',
    'Île-de-France',
    'Laure Olivié',
  ],
});

const SOMMAIRE = [
  { href: '#publics', label: 'Publics et usages métier' },
  { href: '#probleme', label: 'La charge documentaire en construction' },
  { href: '#solution', label: "L'IA au service des équipes études et travaux" },
  { href: '#programmes', label: 'Choisir le programme adapté' },
  { href: '#zone-idf', label: 'Présentiel en Île-de-France' },
  { href: '#methode', label: 'Méthode en 3 étapes + 3 prompts' },
  { href: '#controle', label: 'Contrôle humain et confidentialité' },
  { href: '#faq', label: 'Questions fréquentes' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

function CtaVisioBlock({
  id,
  title,
  subtitle,
  campaign,
}: {
  id: string;
  title: string;
  subtitle: string;
  campaign: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white"
    >
      <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-3 leading-relaxed text-blue-100">{subtitle}</p>
      <div className="mt-6">
        <CalendlyEmbed
          type="link"
          variant="on-accent"
          ctaPosition="middle"
          campaign={campaign}
          className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
         />
      </div>
    </section>
  );
}

export default function FormationIaConstructionPage() {
  const faqSchema = getFAQSchema([...CONSTRUCTION_FAQ]);
  const courseJsonLd = buildFormationIaConstructionCourseJsonLd();
  const breadcrumbJsonLd = buildFormationIaConstructionBreadcrumbJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-formation-ia-construction" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-formation-ia-construction" schema={faqSchema} /> : null}
      <JsonLd id="jsonld-breadcrumb-formation-ia-construction" schema={breadcrumbJsonLd} />

      <article>
        <header>
          <MetierIdfPresentielLine className="mb-4" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem] lg:text-2xl lg:leading-tight">
            {FORMATION_IA_CONSTRUCTION_SEO.h1}
          </h1>
          <ContentUpdatedLine
            date={getPillarPageContentUpdatedAt(FORMATION_IA_CONSTRUCTION_PATH)}
            className="mt-2 text-xs text-slate-500"
          />
          <p className="mt-4 text-lg text-slate-600">
            Formation à l&apos;intelligence artificielle pour la construction : devis, analyse de DCE,
            mémoires techniques et comptes rendus — en présentiel en Île-de-France, pour les équipes
            du BTP et de la construction.
          </p>

          <PreuveSociale className="mt-6" />

          <EnBref>
            <p>
              Laure Olivié (OFC Création d&apos;Entreprise, Qualiopi) forme les professionnels de la
              construction à ChatGPT et Claude sur leurs documents réels. Sessions intra ou inter,{' '}
              {phraseSessionCataloguePresentielIdf()}. {FINANCEMENT_FORMULATION_PRUDENTE}
            </p>
          </EnBref>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={LINKS.formations}
              className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2a63d4]"
            >
              Voir les programmes
            </Link>
            <Link
              href={LINKS.contact}
              className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              Demander un devis
            </Link>
            <CtaButton
              origin="formation-ia-construction-hero"
              variant="unstyled"
              className="inline-flex items-center rounded-lg border border-[#377CF3] px-5 py-3 text-sm font-semibold text-[#377CF3] hover:bg-blue-50"
            />
          </div>

          <div className="mt-8">
            <ShortAnswerBlock>
              Cette page oriente vers le catalogue{' '}
              <Link href={LINKS.formationIaBtp} className="font-medium text-[#377CF3] hover:underline">
                formation IA BTP
              </Link>{' '}
              : mêmes modules en présentiel en Île-de-France, avec exercices sur devis, DCE/CCTP,
              mémoires techniques et CR de chantier — relecture humaine obligatoire.
            </ShortAnswerBlock>
          </div>
        </header>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[#377CF3] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="publics" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">À qui s&apos;adressent ces formations ?</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Les programmes du catalogue couvrent les fonctions qui produisent ou valident les documents de
            chantier et d&apos;études — du dirigeant de PME au bureau d&apos;études, sans prérequis technique
            sur l&apos;IA.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            {CONSTRUCTION_PUBLICS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La charge documentaire des entreprises de construction
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Dans une ETI ou une entreprise générale de construction, les équipes études, affaires et
            direction travaux consacrent une part croissante de leur temps à la production documentaire :
            lecture de DCE, rédaction de mémoires techniques, chiffrage DPGF, comptes rendus de réunion
            MOA/MOE et reporting direction. Sur un marché groupé, un chargé d&apos;affaires peut passer{' '}
            <strong>2 jours entiers</strong> sur un seul dossier de candidature — sans compter le
            chiffrage.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Les BET et bureaux d&apos;études font face à la même pression : synthèses techniques,
            notes de calcul commentées, courriers de coordination et réponses aux marchés publics. Le
            problème n&apos;est pas le manque d&apos;expertise — c&apos;est le temps absorbé par la{' '}
            <em>mise en forme</em> et la <em>rédaction</em> de documents que vos équipes savent déjà
            produire.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            L&apos;intelligence artificielle générative (ChatGPT, Claude) ne remplace pas l&apos;ingénieur,
            le métreur ou le conducteur de travaux. Elle accélère la structuration, la synthèse et la
            rédaction — sous réserve de validation humaine sur chaque document contractuel.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {CONSTRUCTION_PROBLEM_POINTS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            L&apos;IA au service des équipes études et travaux
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Cette formation est conçue pour les <strong>entreprises de construction</strong>, les{' '}
            <strong>entreprises générales TCE</strong>, les <strong>maîtres d&apos;œuvre</strong> et les{' '}
            <strong>BET</strong> qui veulent industrialiser leurs usages IA sur des cas concrets : DCE,
            appels d&apos;offres, chiffrage et coordination chantier. 70 % du temps est consacré à des
            exercices sur vos documents réels.
          </p>
          <ol className="mt-6 list-decimal space-y-5 pl-5 leading-relaxed text-slate-700">
            {CONSTRUCTION_SOLUTION_POINTS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> — {item.body}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-slate-600">
            {MODALITE_FORMATIONS_STANDARD} Vue d&apos;ensemble :{' '}
            <Link href={LINKS.formations} className="font-semibold text-[#377CF3] underline">
              catalogue des formations IA pour le BTP
            </Link>
            .
          </p>
        </section>

        <section id="programmes" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Comment choisir le programme adapté ?
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Chaque fiche précise durée, effectif et prérequis. Le{' '}
            <Link href={LINKS.parcoursMetiers} className="font-medium text-[#377CF3] hover:underline">
              parcours métiers
            </Link>{' '}
            aide à orienter par fonction ; la visio découverte permet de cadrer une session intra ou une
            inscription inter.
          </p>
          <ul className="mt-6 space-y-5">
            {CONSTRUCTION_PROGRAMMES_ORIENTATION.map((item) => (
              <li
                key={item.href}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-2 text-sm text-slate-600">{item.programme}</p>
                <Link href={item.href} className="mt-3 inline-block text-sm font-semibold text-[#377CF3] hover:underline">
                  Voir la fiche programme →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="zone-idf" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Zone d&apos;intervention et modalités réelles
          </h2>
          <dl className="mt-6 space-y-4 text-slate-700">
            <div>
              <dt className="font-semibold text-slate-900">Zone d&apos;intervention</dt>
              <dd className="mt-1">{CONSTRUCTION_ZONE_INTERVENTION.zone} — présentiel uniquement.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Siège administratif OFC</dt>
              <dd className="mt-1">{CONSTRUCTION_ZONE_INTERVENTION.siegeAdministratif}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Lieux de session</dt>
              <dd className="mt-1">{CONSTRUCTION_ZONE_INTERVENTION.lieuxSessions}</dd>
            </div>
          </dl>
          <p className="mt-6 text-slate-600">
            Pour le maillage régional (départements, Paris) :{' '}
            <Link href={LINKS.formationIleDeFrance} className="font-medium text-[#377CF3] hover:underline">
              formations en présentiel en Île-de-France
            </Link>
            .
          </p>
        </section>

        <div className="mt-14">
          <CtaVisioBlock
            id="cta-milieu"
            title="Visio découverte gratuite — 30 minutes"
            subtitle="Échangeons sur vos DCE, mémoires techniques et processus chiffrage : identifions les usages IA qui feront gagner le plus de temps à vos équipes études et travaux."
            campaign="formation-ia-construction-milieu"
          />
        </div>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode en 3 étapes — avec 3 prompts construction
          </h2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-slate-700">
            {METHODE_ETAPES_CONSTRUCTION.map((step) => (
              <li key={step.title}>
                <strong className="text-slate-900">{step.title}</strong>
                <p className="mt-2 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — Synthèse DCE / CCTP pour réunion de lancement
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_DCE_CONSTRUCTION}
          </pre>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — Mémoire technique entreprise générale
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_MEMOIRE_TECHNIQUE_CONSTRUCTION}
          </pre>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 3 — Structuration DPGF et points de vigilance chiffrage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_CHIFFRAGE_CONSTRUCTION}
          </pre>
        </section>

        <section id="controle" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Contrôle humain et confidentialité
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            En construction, un document erroné a des conséquences contractuelles. Les formations OFC
            insistent sur la validation métier et le cadre d&apos;usage des outils IA.
          </p>
          <ol className="mt-6 list-decimal space-y-5 pl-5 text-slate-700">
            {CONSTRUCTION_CONTROLE_CONFIDENTIALITE.map((item) => (
              <li key={item.title}>
                <strong className="text-slate-900">{item.title}</strong>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Questions fréquentes</h2>
          <dl className="mt-8 space-y-8">
            {CONSTRUCTION_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <LaureOlivieFormationPortrait
          contextLine="Formatrice IA spécialisée construction et BTP — entreprises générales, MOE, BET et directions travaux."
        />

        <section id="rdv" className="scroll-mt-24 mt-14">
          <CtaVisioBlock
            id="cta-final"
            title="Prendre rendez-vous — 30 min"
            subtitle="Cadrons ensemble vos enjeux DCE, chiffrage et coordination : format intra (dans vos locaux) ou inter, éligibilité Constructys, profils à former. Sans engagement."
            campaign="formation-ia-construction-final"
          />
          <p className="mt-6 text-sm text-slate-600">
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#377CF3] underline">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="not-prose mt-14 border-t border-slate-200 pt-10">
          <h2 className="font-display text-xl font-bold text-slate-900">Formations complémentaires</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>
              <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
                Catalogue des formations IA pour le BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationIaAppelsOffresBtp} className="text-[#377CF3] hover:underline">
                Formation IA appels d&apos;offres et DCE BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationIaBtpParis} className="text-[#377CF3] hover:underline">
                Formation IA BTP à Paris (75)
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationIleDeFrance} className="text-[#377CF3] hover:underline">
                Formations IA en présentiel en Île-de-France
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationConducteurTravaux} className="text-[#377CF3] hover:underline">
                Formation IA pour conducteurs de travaux BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.blogFormationIaBtpGuide2026} className="text-[#377CF3] hover:underline">
                Guide blog : formation IA appliquée au bâtiment 2026
              </Link>
            </li>
          </ul>
        </section>

        <LiensConnexes
          currentPath={FORMATION_IA_CONSTRUCTION_PATH}
          excludeHrefs={[
            LINKS.formations,
            LINKS.formationIaBtpParis,
            LINKS.formationConducteurTravaux,
            LINKS.formationIleDeFrance,
            LINKS.formationIaAppelsOffresBtp,
          ]}
        />

        <FormationPartenairesMention className="!max-w-none !px-0" />

        <footer className="mt-10 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>
            {SITE_CONFIG.name} — {SITE_CONFIG.legalName}
          </p>
          <RenvoiFicheCatalogue programmeRef="NIV-01" />

          <p>Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
        </footer>
      </article>
    </div>
  );
}
