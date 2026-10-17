import Link from 'next/link';
import { Check } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { JsonLd } from '@/components/JsonLd';
import { LiensConnexes } from '@/components/LiensConnexes';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { RdvLink } from '@/components/RdvLink';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import {
  BUREAU_ETUDES_EN_BREF,
  BUREAU_ETUDES_EXEMPLE_FICTIF,
  BUREAU_ETUDES_FAQ,
  BUREAU_ETUDES_MAILLAGE,
  BUREAU_ETUDES_PREREQUIS,
  BUREAU_ETUDES_PROGRAMME,
  BUREAU_ETUDES_PUBLIC,
  BUREAU_ETUDES_SEO,
  BUREAU_ETUDES_USE_CASES,
  FORMATION_IA_BUREAU_ETUDES_BTP_PATH,
  PROMPT_DEMANDES_CLARIFICATION,
  PROMPT_HYPOTHESES_CHIFFRAGE,
  PROMPT_TABLEAU_EXIGENCES,
  buildBureauEtudesBtpCourseJsonLd,
} from '@/lib/formation-ia-bureau-etudes-btp-landing';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { LINKS } from '@/lib/internal-links';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createMetierBtpPageMetadata("bureau d'études", {
  preferCustomTitle: true,
  title: BUREAU_ETUDES_SEO.title,
  description: BUREAU_ETUDES_SEO.description,
  descriptionFinal: true,
  path: FORMATION_IA_BUREAU_ETUDES_BTP_PATH,
  appendAuthorSuffix: true,
  openGraphType: 'website',
  openGraphTitle: BUREAU_ETUDES_SEO.openGraphTitle,
  keywords: [
    "formation IA bureau d'études BTP",
    'analyse DCE IA bureau études',
    'tableau exigences CCTP',
    'ChatGPT bureau études',
    'formation IA pour le BTP',
  ],
});

const SOMMAIRE = [
  { href: '#cas-usage', label: 'Cas d’usage bureau d’études' },
  { href: '#exemple-fictif', label: 'Exemple pédagogique fictif' },
  { href: '#public', label: 'Public & prérequis' },
  { href: '#programme', label: 'Ce que vous apprenez' },
  { href: '#methode', label: 'Méthode + prompts' },
  { href: '#financement', label: 'Financement' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contacter OFC' },
];

export default function FormationIaBureauEtudesBtpPage() {
  const faqSchema = getFAQSchema([...BUREAU_ETUDES_FAQ]);
  const courseJsonLd = buildBureauEtudesBtpCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-bureau-etudes" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-bureau-etudes" schema={faqSchema} /> : null}

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Bureau d&apos;études</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem] lg:text-2xl lg:leading-tight">
          {BUREAU_ETUDES_SEO.h1}
        </h1>
        <p className="mt-2 text-xl font-medium text-[#377CF3]">
          Croiser le DCE, structurer les exigences, clarifier avant de chiffrer
        </p>

        <EnBref>
          {BUREAU_ETUDES_EN_BREF.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </EnBref>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA aide à structurer la lecture croisée des pièces et les questions au MOE ; elle ne
            remplace ni le calcul technique, ni la conformité réglementaire, ni votre validation avant
            diffusion. Tout chiffre et toute hypothèse restent sous contrôle humain.
          </ShortAnswerBlock>
        </div>

        <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Compléments distincts :</span> métrés / DPGF →{' '}
          <Link href={LINKS.formationIaMetreurEconomisteConstruction} className="font-medium text-[#377CF3] underline">
            page métreur-économiste
          </Link>
          {' · '}
          programme chiffrage →{' '}
          <Link href={LINKS.formationIaEtudesPrixChiffrageBtp} className="font-medium text-[#377CF3] underline">
            études de prix et chiffrage
          </Link>
          . Action Qualiopi de référence (NIV-02) rappelée en bas de page.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <RdvLink
            campaign="formation-ia-bureau-etudes-hero"
            ctaPosition="hero"
            variant="primary"
            className="rounded-lg px-5 py-3"
          />
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:text-[#377CF3]"
          >
            Contacter OFC
          </a>
        </div>

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
            Cas d&apos;usage IA pour bureaux d&apos;études
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Cinq situations typiques — de la lecture du DCE à la note d&apos;arbitrage interne.
          </p>
          <ul className="mt-6 space-y-5">
            {BUREAU_ETUDES_USE_CASES.map((item) => (
              <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="exemple-fictif"
          className="scroll-mt-24 mt-14 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            Exemple pédagogique fictif
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
            {BUREAU_ETUDES_EXEMPLE_FICTIF.titre}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            {BUREAU_ETUDES_EXEMPLE_FICTIF.contexte}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Livrable assisté par l&apos;IA :</strong>{' '}
            {BUREAU_ETUDES_EXEMPLE_FICTIF.livrableIa}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Contrôle humain obligatoire :</strong>{' '}
            {BUREAU_ETUDES_EXEMPLE_FICTIF.controleHumain}
          </p>
        </section>

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            À qui s&apos;adresse cette page ?
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {BUREAU_ETUDES_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {BUREAU_ETUDES_PREREQUIS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que vous travaillez en formation
          </h2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-slate-700">
            {BUREAU_ETUDES_PROGRAMME.map((item) => (
              <li key={item.title}>
                <strong className="text-slate-900">{item.title}</strong>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode — prompts ChatGPT / Claude
          </h2>
          <p className="mt-4 text-slate-600">
            Trois prompts types à adapter sur vos dossiers anonymisés. Toujours croiser avec les pièces
            sources avant diffusion.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            1. Tableau d&apos;exigences à partir du DCE
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_TABLEAU_EXIGENCES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Hypothèses de chiffrage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_HYPOTHESES_CHIFFRAGE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            3. Demandes de clarification
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_DEMANDES_CLARIFICATION}
          </pre>
        </section>

        <FinancementOpcoEtenduCourtBlock className="mt-14" />

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — bureau d&apos;études et IA
          </h2>
          <div className="mt-8 space-y-6">
            {BUREAU_ETUDES_FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  <FAQAnswer content={a} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait />

        <section
          id="contact"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[#377CF3] p-8 text-white md:p-10"
        >
          <h2 className="font-display text-2xl font-bold">Parler de votre besoin études / BE</h2>
          <p className="mt-4 leading-relaxed text-blue-100">
            Décrivez votre structure (bureau d&apos;études, équipe AO) et le nombre de participants.
            Proposition adaptée — financement OPCO possible selon éligibilité.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Contacter OFC
            </Link>
            <RdvLink
              campaign="formation-ia-bureau-etudes-rdv"
              ctaPosition="footer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            />
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
            {' · '}
            {CTA_RDV_LABEL}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA bureau d&apos;études — Île-de-France
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            OFC Création d&apos;Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} ·
            NDA 11788515078 · {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <LiensConnexes currentPath={FORMATION_IA_BUREAU_ETUDES_BTP_PATH} />
        <AllerPlusLoin links={[...BUREAU_ETUDES_MAILLAGE]} />
        <RenvoiFicheCatalogue
          programmeRef="NIV-02"
          contexte="pour les bureaux d'études et les appels d'offres BTP"
        />
      </article>
    </div>
  );
}
