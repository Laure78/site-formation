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
  FORMATION_IA_METALLERIE_SERRURERIE_BTP_PATH,
  METALLERIE_EN_BREF,
  METALLERIE_EXEMPLE_FICTIF,
  METALLERIE_FAQ,
  METALLERIE_MAILLAGE,
  METALLERIE_PREREQUIS,
  METALLERIE_PROGRAMME,
  METALLERIE_PUBLIC,
  METALLERIE_SEO,
  METALLERIE_SOURCES_OFFICIELLES,
  METALLERIE_USE_CASES,
  PROMPT_DEMANDE_CLIENT,
  PROMPT_DESIGNATIONS_DEVIS,
  PROMPT_SUIVI_FAB_POSE,
  buildMetallerieSerrurerieBtpCourseJsonLd,
} from '@/lib/formation-ia-metallerie-serrurerie-btp-landing';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { LINKS } from '@/lib/internal-links';
import { getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createMetierBtpPageMetadata('métallerie', {
  preferCustomTitle: true,
  title: METALLERIE_SEO.title,
  description: METALLERIE_SEO.description,
  descriptionFinal: true,
  path: FORMATION_IA_METALLERIE_SERRURERIE_BTP_PATH,
  appendAuthorSuffix: true,
  openGraphType: 'website',
  openGraphTitle: METALLERIE_SEO.openGraphTitle,
  keywords: [
    'formation IA métallerie',
    'formation IA entreprise de serrurerie',
    'IA serrurerie BTP',
    'ChatGPT devis métallerie',
    'IA garde-corps documentation',
    'formation IA pour le BTP',
  ],
});

const SOMMAIRE = [
  { href: '#cas-usage', label: 'Cas d’usage métallerie & serrurerie' },
  { href: '#exemple-fictif', label: 'Exemple pédagogique fictif' },
  { href: '#sources', label: 'Sources officielles' },
  { href: '#public', label: 'Public & prérequis' },
  { href: '#programme', label: 'Ce que vous travaillez' },
  { href: '#methode', label: 'Méthode + prompts' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contacter OFC' },
];

export default function FormationIaMetallerieSerrurerieBtpPage() {
  const faqSchema = getFAQSchema([...METALLERIE_FAQ]);
  const courseJsonLd = buildMetallerieSerrurerieBtpCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-metallerie" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-metallerie" schema={faqSchema} /> : null}

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Métallerie &amp; serrurerie</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
          {METALLERIE_SEO.h1}
        </h1>
        <p className="mt-2 text-xl font-medium text-[#377CF3]">
          Documents, devis et suivi atelier — sans calcul de résistance par l&apos;IA
        </p>

        <EnBref>
          {METALLERIE_EN_BREF.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </EnBref>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA structure demandes, désignations et suivis à partir de vos données validées. Elle
            ne produit pas de calculs de résistance, n&apos;invente pas de dimensions réglementaires et
            n&apos;affirme aucune conformité sans contrôle professionnel.
          </ShortAnswerBlock>
        </div>

        <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Formation sur vos documents :</span> session
          catalogue NIV-01 (rappel Qualiopi en bas de page). Pas de programme « métallerie » catalogue
          inventé. Usages CCTP / suivi aussi disponibles en NIV-02 et NIV-03 selon vos dossiers.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <RdvLink
            campaign="formation-ia-metallerie-hero"
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
            Cas d&apos;usage : formation IA métallerie et serrurerie
          </h2>
          <ul className="mt-6 space-y-5">
            {METALLERIE_USE_CASES.map((item) => (
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
            {METALLERIE_EXEMPLE_FICTIF.titre}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">{METALLERIE_EXEMPLE_FICTIF.contexte}</p>
          <div className="mt-4 overflow-x-auto rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
            {METALLERIE_EXEMPLE_FICTIF.livrableIa}
          </div>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Contrôle humain obligatoire :</strong>{' '}
            {METALLERIE_EXEMPLE_FICTIF.controleHumain}
          </p>
        </section>

        <section id="sources" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Sources officielles — garde-corps (habitation)
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Toute affirmation sur les hauteurs réglementaires en bâtiment d&apos;habitation doit être
            recoupée sur les textes officiels. OFC ne délivre pas d&apos;avis de conformité. Pour les
            ERP et autres destinations, d&apos;autres règles peuvent s&apos;appliquer — faites valider
            par une personne compétente.
          </p>
          <ul className="mt-6 space-y-3">
            {METALLERIE_SOURCES_OFFICIELLES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#377CF3] underline hover:no-underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            À qui s&apos;adresse cette page ?
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {METALLERIE_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {METALLERIE_PREREQUIS.map((line) => (
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
            {METALLERIE_PROGRAMME.map((item) => (
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
            Trois prompts types. Utilisez uniquement les dimensions et caractéristiques fournies ;
            séparez confirmé et à vérifier.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            1. Structurer une demande client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_DEMANDE_CLIENT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Désignations de devis (données validées)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_DESIGNATIONS_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            3. Suivi fabrication / livraison / pose
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_SUIVI_FAB_POSE}
          </pre>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — formation IA métallerie et serrurerie
          </h2>
          <div className="mt-8 space-y-6">
            {METALLERIE_FAQ.map(({ q, a }) => (
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
          <h2 className="font-display text-2xl font-bold">
            Formation sur les documents de votre entreprise
          </h2>
          <p className="mt-4 leading-relaxed text-blue-100">
            Décrivez vos ouvrages (garde-corps, portes techniques, serrurerie…) et vos documents types.
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
              campaign="formation-ia-metallerie-rdv"
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
            Formation IA métallerie &amp; serrurerie — Île-de-France
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            OFC Création d&apos;Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} ·
            NDA 11788515078 · {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <LiensConnexes currentPath={FORMATION_IA_METALLERIE_SERRURERIE_BTP_PATH} />
        <AllerPlusLoin links={[...METALLERIE_MAILLAGE]} />
        <RenvoiFicheCatalogue
          programmeRef="NIV-01"
          contexte="pour les entreprises de métallerie et de serrurerie"
        />
      </article>
    </div>
  );
}
