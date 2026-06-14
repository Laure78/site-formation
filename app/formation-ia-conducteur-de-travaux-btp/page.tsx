import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { CONDUCTEUR_TRAVAUX_RELATED } from '@/lib/contextual-internal-links';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_DEBUTANT_HT ,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  CDT_BTP_FAQ,
  CDT_BTP_USE_CASES,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO,
  PROMPT_CR_CDT,
  PROMPT_DCE_CDT,
  buildConducteurDeTravauxBtpBreadcrumbJsonLd,
  buildConducteurDeTravauxBtpCourseJsonLd,
} from '@/lib/formation-ia-conducteur-de-travaux-btp-landing';

const CALENDLY_MID = buildSiteCalendlyCtaUrl(
  'formation-ia-conducteur-de-travaux-btp-milieu-page'
);
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl(
  'formation-ia-conducteur-de-travaux-btp-rdv-final'
);

export const metadata = createPageMetadata({
  title: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.title,
  titleAbsolute: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.title,
  description: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.description,
  path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH,
  openGraphType: 'article',
  appendAuthorSuffix: false,
  openGraphTitle: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.title,
  openGraphDescription: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.description,
  article: {
    publishedTime: '2026-06-02',
    modifiedTime: '2026-06-02',
    author: 'Laure Olivié',
    section: 'Formation IA pour les pro du BTP',
  },
  image: {
    url: '/images/hero-accueil-formation-ia-btp-echange-2026.png',
    width: 1024,
    height: 682,
    alt: 'Laure Olivié, formatrice IA BTP — session formation conducteurs de travaux, échange en présentiel',
  },
});

const SOMMAIRE = [
  { href: '#le-probleme', label: 'La journée d’un conducteur de travaux avant l’IA' },
  { href: '#cas-usage', label: '5 cas d’usage IA pour ce métier' },
  { href: '#methode', label: 'Méthode en 3 étapes + prompts terrain' },
  { href: '#resultats', label: 'Gains de temps mesurés' },
  { href: '#faq', label: 'FAQ conducteurs de travaux' },
  { href: '#a-propos', label: 'Laure Olivié — formatrice' },
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
  const breadcrumbJsonLd = buildConducteurDeTravauxBtpBreadcrumbJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-conducteur-de-travaux-btp" schema={courseJsonLd} />
      <JsonLd id="jsonld-breadcrumb-conducteur-de-travaux-btp" schema={breadcrumbJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-conducteur-de-travaux-btp" schema={faqSchema} /> : null}

      <article>
        <header>
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
                  Formations
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-medium text-slate-800">Formation IA Conducteur de Travaux</li>
            </ol>
          </nav>

          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Laure Olivié · {SITE_CONFIG.legalName} · Qualiopi · Finançable Constructys · Île-de-France
          </p>

          <figure className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/btp-conducteur-plans.png"
              alt="Conducteur de travaux BTP avec plans de chantier — formation IA pour CR, PPSPS et analyse DCE"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </figure>

          <div className="mt-8">
            <ShortAnswerBlock>
              Comptes rendus, relances, PPSPS, analyse DCE : les conducteurs de travaux consacrent{' '}
              <strong>2 à 3 h par jour</strong> à l’administratif de chantier. Avec ChatGPT et Claude AI,
              vous structurez vos documents en quelques minutes — formation certifiée{' '}
              <strong>Qualiopi</strong>, éligible <strong>Constructys</strong> selon dossier.{' '}
              <strong>+{formatProfessionalsTrainedCount()} professionnels</strong> formés, note{' '}
              {SOCIAL_PROOF.AVERAGE_RATING}.
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

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La journée d&apos;un conducteur de travaux avant l&apos;IA
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Entre deux visites de chantier, vous enchaînez comptes rendus, relances sous-traitants,
            mise à jour du planning, préparation du PPSPS, lecture d&apos;extraits DCE et courriers
            MOA/MOE. Personne d&apos;autre ne peut produire ces documents à votre place — mais leur{' '}
            <em>rédaction</em> et leur <em>mise en forme</em> absorbent{' '}
            <strong>2 à 3 h par jour ouvré</strong> (35 à 40 % du temps bureau).
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Lors des sessions avec la <strong>FFB Grand Paris</strong> et la{' '}
            <strong>FFB Île-de-France</strong>, les conducteurs de travaux formés décrivent la même
            charge : CR hebdomadaires, mails de relance, documents QSE et synthèses avant réunion de
            lancement — autant de tâches structurables par l&apos;IA, sous réserve de votre relecture.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {[
              'CR hebdomadaire : 90 min en moyenne',
              'PPSPS ou mise à jour QSE : demi-journée à journée',
              'Relances et mails MOE : 20 à 30 min par courrier',
              'Lecture DCE / CCTP avant réunion : 45 min à 1 h',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="cas-usage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            5 cas d&apos;usage IA pour conducteurs de travaux
          </h2>
          <ol className="mt-6 list-decimal space-y-5 pl-5 leading-relaxed text-slate-700">
            {CDT_BTP_USE_CASES.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> — {item.body}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-slate-600">
            Programme catalogue{' '}
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className="font-semibold text-[#377CF3] underline">
              NIV-01 — L&apos;IA au service des pros du bâtiment et des travaux publics
            </Link>{' '}
            ({formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT · {EFFECTIF_GROUPE_MAX} participants max · 4 h).
          </p>
        </section>

        <section className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Visio découverte gratuite — 30 minutes
          </h2>
          <p className="mt-3 leading-relaxed text-blue-100">
            Échangeons sur vos CR, PPSPS et dossiers chantier : nous identifions les usages IA qui vous
            feront gagner le plus de temps dès la première semaine.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink
              campaign="formation-ia-conducteur-de-travaux-btp-milieu"
              ctaPosition="middle"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
            >
              Réserver ma visio gratuite →
            </RdvLink>
            <a
              href={CALENDLY_MID}
              className="inline-flex items-center rounded-lg border-2 border-white/80 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir Calendly
            </a>
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

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Laure Olivié est formatrice IA et ChatGPT pour les entreprises du bâtiment et des travaux
            publics. Plus de <strong>10 ans d&apos;expérience terrain</strong> en conduite de chantier
            et travaux publics : elle connaît la réalité des CR, des relances et des dossiers QSE — pas
            un discours générique sur l&apos;IA.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Elle a formé des équipes pour la <strong>FFB Grand Paris</strong>, la{' '}
            <strong>FFB Île-de-France</strong>, le <strong>CSFE</strong>,{' '}
            <strong>CNAM Entreprise</strong> et <strong>Lefebvre Dalloz</strong>. Sessions en
            présentiel en Île-de-France, intra ou inter.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-800">
            +{formatProfessionalsTrainedCount()} professionnels formés · Note {SOCIAL_PROOF.AVERAGE_RATING}{' '}
            · Certifiée Qualiopi · OFC Création d&apos;Entreprise
          </p>
          <p className="mt-4">
            <Link href={LINKS.aPropos} className="font-semibold text-[#377CF3] underline hover:no-underline">
              Voir le parcours complet →
            </Link>
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre visio découverte gratuite — 30 min
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Identifions ensemble les documents chantier (CR, PPSPS, DCE, relances) où l&apos;IA vous
            fera gagner le plus de temps. Gratuit, sans engagement — session catalogue NIV-01 finançable
            Constructys selon éligibilité.
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
            <a
              href={CALENDLY_FINAL}
              className="text-[#377CF3] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lien Calendly direct
            </a>
            {' · '}
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className="text-[#377CF3] underline">
              Programme NIV-01
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
          links={CONDUCTEUR_TRAVAUX_RELATED}
          tone="muted"
        />

        <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>Laure Olivié — Formatrice IA pour les pro du BTP, OFC Création d&apos;Entreprise</p>
          <p>Certifiée Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
          <p>
            laureolivie@yahoo.fr ·{' '}
            <a href="https://www.laureolivie.fr" className="underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
