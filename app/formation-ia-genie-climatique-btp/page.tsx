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
  FORMATION_IA_GENIE_CLIMATIQUE_BTP_PATH,
  GENIE_CLIMATIQUE_EN_BREF,
  GENIE_CLIMATIQUE_EXEMPLE_FICTIF,
  GENIE_CLIMATIQUE_FAQ,
  GENIE_CLIMATIQUE_MAILLAGE,
  GENIE_CLIMATIQUE_PREREQUIS,
  GENIE_CLIMATIQUE_PROGRAMME,
  GENIE_CLIMATIQUE_PUBLIC,
  GENIE_CLIMATIQUE_SEO,
  GENIE_CLIMATIQUE_USE_CASES,
  PROMPT_CCTP_EQUIPEMENTS,
  PROMPT_COMPARE_FICHES,
  PROMPT_RAPPORT_INTERVENTION,
  buildGenieClimatiqueBtpCourseJsonLd,
} from '@/lib/formation-ia-genie-climatique-btp-landing';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { LINKS } from '@/lib/internal-links';
import { getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createMetierBtpPageMetadata('génie climatique', {
  title: GENIE_CLIMATIQUE_SEO.title,
  description: GENIE_CLIMATIQUE_SEO.description,
  descriptionFinal: true,
  path: FORMATION_IA_GENIE_CLIMATIQUE_BTP_PATH,
  appendAuthorSuffix: true,
  openGraphType: 'website',
  openGraphTitle: GENIE_CLIMATIQUE_SEO.openGraphTitle,
  keywords: [
    'formation IA génie climatique',
    'formation IA chauffagiste',
    'IA entreprise CVC',
    'ChatGPT CVC',
    'IA fiches techniques chauffage',
    'formation IA pour le BTP',
  ],
});

const SOMMAIRE = [
  { href: '#difference-plombier', label: 'Génie climatique vs plombier' },
  { href: '#cas-usage', label: 'Cas d’usage CVC / chauffagiste' },
  { href: '#exemple-fictif', label: 'Exemple pédagogique fictif' },
  { href: '#public', label: 'Public & prérequis' },
  { href: '#programme', label: 'Ce que vous travaillez' },
  { href: '#methode', label: 'Méthode + prompts' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contacter OFC' },
];

export default function FormationIaGenieClimatiqueBtpPage() {
  const faqSchema = getFAQSchema([...GENIE_CLIMATIQUE_FAQ]);
  const courseJsonLd = buildGenieClimatiqueBtpCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-genie-climatique" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-genie-climatique" schema={faqSchema} /> : null}

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Génie climatique &amp; CVC</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
          {GENIE_CLIMATIQUE_SEO.h1}
        </h1>
        <p className="mt-2 text-xl font-medium text-[#377CF3]">
          IA entreprise CVC : documents, fiches techniques et suivi — pas de dimensionnement autonome
        </p>

        <EnBref>
          {GENIE_CLIMATIQUE_EN_BREF.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </EnBref>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA aide à synthétiser et comparer des informations déjà présentes dans vos documents.
            Elle ne dimensionne pas, ne valide pas une performance énergétique et ne prescrit pas
            d&apos;équipement. Toute conclusion technique reste sous validation du professionnel
            compétent.
          </ShortAnswerBlock>
        </div>

        <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Formation adaptée à l&apos;entreprise :</span>{' '}
          session catalogue NIV-01 (bases documentaires BTP) — rappel Qualiopi en bas de page. Usages
          CCTP / DOE aussi présents en NIV-02 et NIV-03. Aucun programme « CVC spécialisé » inventé.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <RdvLink
            campaign="formation-ia-genie-climatique-hero"
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

        <section id="difference-plombier" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Une page pour génie climatique, CVC et chauffagiste entreprise
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Pas de landings séparées « clim », « CVC » et « chauffagiste » : même intention
            documentaire. La page plomberie sanitaire reste le point d&apos;entrée pour le sanitaire
            et le DTU 60 (lien en FAQ).
          </p>
        </section>

        <section id="cas-usage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage : formation IA génie climatique et CVC
          </h2>
          <ul className="mt-6 space-y-5">
            {GENIE_CLIMATIQUE_USE_CASES.map((item) => (
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
            {GENIE_CLIMATIQUE_EXEMPLE_FICTIF.titre}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            {GENIE_CLIMATIQUE_EXEMPLE_FICTIF.contexte}
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
            {GENIE_CLIMATIQUE_EXEMPLE_FICTIF.livrableIa}
          </div>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Contrôle humain obligatoire :</strong>{' '}
            {GENIE_CLIMATIQUE_EXEMPLE_FICTIF.controleHumain}
          </p>
        </section>

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            À qui s&apos;adresse cette page ?
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {GENIE_CLIMATIQUE_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {GENIE_CLIMATIQUE_PREREQUIS.map((line) => (
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
            {GENIE_CLIMATIQUE_PROGRAMME.map((item) => (
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
            Trois prompts types. Citez toujours le document source ; laissez vides les champs absents.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            1. CCTP → exigences par équipement
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_CCTP_EQUIPEMENTS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Comparer deux fiches techniques
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_COMPARE_FICHES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            3. Rapport d&apos;intervention à partir de notes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_RAPPORT_INTERVENTION}
          </pre>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — formation IA génie climatique, chauffagiste et CVC
          </h2>
          <div className="mt-8 space-y-6">
            {GENIE_CLIMATIQUE_FAQ.map(({ q, a }) => (
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
          <h2 className="font-display text-2xl font-bold">Parler de votre entreprise CVC</h2>
          <p className="mt-4 leading-relaxed text-blue-100">
            Décrivez votre structure (génie climatique, chauffage, maintenance) et vos documents types.
            Proposition sur les programmes catalogue existants — financement OPCO possible selon
            éligibilité.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Contacter OFC
            </Link>
            <RdvLink
              campaign="formation-ia-genie-climatique-rdv"
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
            Formation IA génie climatique — Île-de-France
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            OFC Création d&apos;Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} ·
            NDA 11788515078 · {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <LiensConnexes currentPath={FORMATION_IA_GENIE_CLIMATIQUE_BTP_PATH} />
        <AllerPlusLoin links={[...GENIE_CLIMATIQUE_MAILLAGE]} />
        <RenvoiFicheCatalogue
          programmeRef="NIV-01"
          contexte="pour les entreprises de génie climatique, CVC et chauffage"
        />
      </article>
    </div>
  );
}
