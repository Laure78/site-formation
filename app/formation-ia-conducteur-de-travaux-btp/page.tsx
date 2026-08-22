import { CtaButton } from '@/components/CtaButton';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { LiensConnexes } from '@/components/LiensConnexes';
import { CONDUCTEUR_TRAVAUX_RELATED } from '@/lib/contextual-internal-links';
import {
  EFFECTIF_GROUPE_MAX,
  TARIF_FORFAIT_DEBUTANT_HT,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { PreuveSociale } from '@/components/PreuveSociale';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import {
  CDT_BTP_EN_BREF,
  CDT_BTP_FAQ,
  CDT_BTP_OBJECTIFS,
  CDT_BTP_PREREQUIS,
  CDT_BTP_PROGRAMME,
  CDT_BTP_PUBLIC,
  CDT_BTP_USE_CASES,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO,
  PROMPT_CR_CDT,
  PROMPT_DCE_CDT,
  buildConducteurDeTravauxBtpCourseJsonLd,
} from '@/lib/formation-ia-conducteur-de-travaux-btp-landing';


import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const metadata = createMetierBtpPageMetadata('conducteur de travaux', {
  title: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.title,
  description: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.description,
  path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH,
  openGraphType: 'website',
  appendAuthorSuffix: false,
  descriptionFinal: true,
  image: {
    url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
    width: 1024,
    height: 682,
    alt: 'Laure Olivié, formatrice IA BTP — session formation conducteurs de travaux, échange en présentiel',
  },
});

const SOMMAIRE = [
  { href: '#cas-usage', label: 'Cas d’usage IA chantier' },
  { href: '#le-probleme', label: 'Pourquoi l’IA aide le conducteur de travaux' },
  { href: '#public', label: 'Public & prérequis' },
  { href: '#programme', label: 'Ce que vous apprenez' },
  { href: '#methode', label: 'Méthode + prompts terrain' },
  { href: '#resultats', label: 'Gains de temps mesurés' },
  { href: '#faq', label: 'FAQ' },
  { href: '#rdv', label: 'Visio découverte gratuite 30 min' },
];

const METHODE_ETAPES = [
  {
    title: 'Capturer l’information sur le terrain',
    body: 'Notes vocales, photos commentées, listes à puces dans le carnet ou sur smartphone — l’IA part de votre matière brute, pas d’un modèle générique.',
  },
  {
    title: 'Structurer avec un prompt métier BTP',
    body: 'Contexte chantier, lot, MOA/MOE, vocabulaire DTU/OS/DCE : le prompt cadré produit un brouillon exploitable (CR, mail, PPSPS, synthèse DCE).',
  },
  {
    title: 'Relire, corriger, valider',
    body: '3 à 5 minutes de relecture humaine avant envoi ou diffusion. Vous restez responsable du fond et de la signature — l’IA ne remplace pas le jugement terrain.',
  },
];

export default function FormationIaConducteurDeTravauxBtpPage() {
  const faqSchema = getFAQSchema([...CDT_BTP_FAQ]);
  const courseJsonLd = buildConducteurDeTravauxBtpCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-conducteur-de-travaux-btp" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-conducteur-de-travaux-btp" schema={faqSchema} /> : null}

      <article>
        <header>
          <MetierIdfPresentielLine className="mb-4" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.h1}
          </h1>

          <PreuveSociale className="mt-6" />

          <EnBref>
            {CDT_BTP_EN_BREF.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </EnBref>

          <p className="mt-4 text-lg text-slate-600">
            Sessions en présentiel en Île-de-France — Laure Olivié · {SITE_CONFIG.legalName} · Qualiopi ·
            Financement OPCO possible selon éligibilité
          </p>

          <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-medium text-slate-900">Session catalogue (conversion) :</span>{' '}
            <Link
              href={LINKS.formationConduiteTravauxSuiviChantier}
              className="font-medium text-[#377CF3] hover:underline"
            >
              Formation NIV-03 — IA conduite de travaux &amp; suivi chantier (skills Claude)
            </Link>
            . Cette page est un guide métier ; la fiche programme détaillé est sur le catalogue.
          </p>

          <figure className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/btp-conducteur-plans.png"
              alt="Conducteur de travaux BTP avec plans de chantier — analyse DCE et comptes rendus"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            
              quality={75}/>
          </figure>

          <div className="mt-8">
            <ShortAnswerBlock>
              Dans le BTP, le conducteur de travaux pilote préparation, coordination, documents techniques, CR,
              anomalies, délais et sécurité. L’IA (ChatGPT, Claude…) accélère analyse, synthèse et rédaction — sans
              remplacer votre expertise. Pour la session certifiante skills Claude, voir la{' '}
              <Link
                href={LINKS.formationConduiteTravauxSuiviChantier}
                className="font-medium text-[#377CF3] hover:underline"
              >
                fiche formation NIV-03 conduite de travaux
              </Link>
              .
            </ShortAnswerBlock>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <RdvLink
              campaign="formation-ia-conducteur-de-travaux-btp-hero"
              ctaPosition="hero"
              ctaId="hero"
              variant="primary"
              className="rounded-lg px-5 py-3"
            >
              Réserver une visio découverte gratuite
            </RdvLink>
            <Link
              href={LINKS.formationConduiteTravauxSuiviChantier}
              className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              Voir la formation NIV-03
            </Link>
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

        <section id="cas-usage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage concrets pour conducteurs de travaux
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Situations métier remontées en tête de page : ce que vous travaillez vraiment en session et au retour
            chantier.
          </p>
          <ul className="mt-6 space-y-5">
            {CDT_BTP_USE_CASES.map((item) => (
              <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600">
            Programme catalogue{' '}
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="font-semibold text-[#377CF3] underline"
            >
              NIV-01 — L&apos;IA au service des pros du bâtiment et des travaux publics
            </Link>{' '}
            ({formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT · {EFFECTIF_GROUPE_MAX} participants max · 4 h).
          </p>
        </section>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi l&apos;IA est utile pour un conducteur de travaux
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Une grande partie du temps bureau sert à collecter, vérifier, reformuler et transmettre de
            l&apos;information : CR, relances, PPSPS, lecture DCE, courriers MOA/MOE. L&apos;IA accélère la
            préparation, l&apos;analyse et la formalisation — elle ne prend pas les décisions à votre place.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Lors des sessions avec la <strong>FFB Grand Paris</strong> et la{' '}
            <strong>FFB Île-de-France</strong>, les conducteurs formés ciblent les mêmes usages : CR hebdomadaires,
            mails de relance, documents QSE et synthèses avant réunion de lancement.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {[
              'Résumer des documents longs et extraire les clauses importantes',
              'Transformer des notes terrain en rapport ou CR structuré',
              'Préparer une checklist chantier ou une synthèse pour la direction',
              'Comparer deux documents (ex. CCTP / DTU) et formuler des points de vigilance',
              'Capitaliser l’expertise des conducteurs seniors via un assistant interne',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            À qui s&apos;adresse cette formation ?
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {CDT_BTP_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {CDT_BTP_PREREQUIS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que vous apprenez pendant la formation
          </h2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-slate-700">
            {CDT_BTP_PROGRAMME.map((item) => (
              <li key={item.title}>
                <strong className="text-slate-900">{item.title}</strong>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Objectifs en fin de formation
          </h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {CDT_BTP_OBJECTIFS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Visio découverte gratuite — 30 minutes
          </h2>
          <p className="mt-3 leading-relaxed text-blue-100">
            Échangeons sur vos CR, PPSPS et dossiers chantier : j&apos;identifie les usages IA qui vous feront
            gagner le plus de temps dès la première semaine.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink
              campaign="formation-ia-conducteur-de-travaux-btp-milieu"
              ctaPosition="middle"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
            >
              Réserver ma visio gratuite →
            </RdvLink>
            <CtaButton origin="formation-ia-conducteur-de-travaux-btp-milieu-page" className="inline-flex items-center rounded-lg border-2 border-white/80 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ouvrir Calendly
            </CtaButton>
          </div>
        </section>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode en 3 étapes — avec 2 prompts BTP terrain
          </h2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-slate-700">
            {METHODE_ETAPES.map((step) => (
              <li key={step.title}>
                <strong className="text-slate-900">{step.title}</strong>
                <p className="mt-2 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — CR de chantier depuis dictée
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_CR_CDT}
          </pre>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — Synthèse DCE / CCTP pour réunion de lancement
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_DCE_CDT}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains de temps mesurés — formations OFC
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Gains de temps IA pour conducteur de travaux BTP</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Document</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['CR de réunion chantier', '90 min', '8 min', '−91 %'],
                  ['PPSPS (trame chantier)', '4 h', '45 min', '−81 %'],
                  ['Mail relance MOE / ST', '25 min', '4 min', '−84 %'],
                  ['Synthèse extrait DCE', '50 min', '8 min', '−84 %'],
                  ['Courrier / OS formel', '30 min', '6 min', '−80 %'],
                ].map(([doc, sans, avec, gain]) => (
                  <tr key={doc as string}>
                    <td className="border border-slate-200 p-3">{doc}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-semibold">
                  <td className="border border-slate-200 p-3">Semaine type (5 usages)</td>
                  <td className="border border-slate-200 p-3">≈ 10 h</td>
                  <td className="border border-slate-200 p-3">≈ 1 h 30</td>
                  <td className="border border-slate-200 p-3 text-[#377CF3]">≈ 2 h/jour</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DisclaimerGains className="mt-4" />
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ conducteurs de travaux</h2>
          <dl className="mt-8 space-y-8">
            {CDT_BTP_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <RelatedLinks
          path={LINKS.formationConducteurTravaux}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={[LINKS.formationConduiteTravauxSuiviChantier, LINKS.financement]}
        />

        <LaureOlivieFormationPortrait />
        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre visio découverte gratuite — 30 min
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Identifions ensemble les documents chantier (CR, PPSPS, DCE, relances) où l&apos;IA vous fera gagner le
            plus de temps. Gratuit, sans engagement — session catalogue finançable Constructys selon éligibilité.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink
              campaign="formation-ia-conducteur-de-travaux-btp-rdv-final"
              ctaPosition="footer"
              className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]"
            >
              Prendre rendez-vous — visio gratuite 30 min
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <CtaButton origin="formation-ia-conducteur-de-travaux-btp-rdv-final" className="text-[#377CF3] underline"
            >
              Lien Calendly direct
            </CtaButton>
            {' · '}
            <Link href={LINKS.formationConduiteTravauxSuiviChantier} className="text-[#377CF3] underline">
              Programme NIV-03 — conduite de travaux
            </Link>
            {' · '}
            <Link href={LINKS.financement} className="text-[#377CF3] underline">
              Financement Constructys
            </Link>
          </p>
        </section>

        <ContextualLinksSection
          title="Aller plus loin"
          subtitle="Catalogue, ressources gratuites et articles pour conducteurs de travaux BTP."
          links={CONDUCTEUR_TRAVAUX_RELATED.filter(
            (l) => !getClusterRelatedHrefs(LINKS.formationConducteurTravaux).includes(l.href)
          )}
          tone="muted"
        />

        <LiensConnexes
          currentPath={FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH}
          excludeHrefs={CONDUCTEUR_TRAVAUX_RELATED.map((l) => l.href)}
          />

        <RenvoiFicheCatalogue programmeRef="NIV-01" />

        <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>Laure Olivié — Formatrice IA pour les pros du BTP, OFC Création d&apos;Entreprise</p>
          <p>Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
          <p>
            laureolivie@yahoo.fr ·{' '}
            <a href="/" className="underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
