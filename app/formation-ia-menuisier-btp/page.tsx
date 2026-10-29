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
  FORMATION_IA_MENUISIER_BTP_PATH,
  MENUISERIE_AGENCEMENT,
  MENUISERIE_CONFIDENTIALITE,
  MENUISERIE_EN_BREF,
  MENUISERIE_EXEMPLE_FICTIF,
  MENUISERIE_EXTERIEURE,
  MENUISERIE_FAQ,
  MENUISERIE_GESTION_COMMUNE,
  MENUISERIE_INTERIEURE,
  MENUISERIE_MAILLAGE,
  MENUISERIE_PREREQUIS,
  MENUISERIE_PUBLIC,
  MENUISERIE_SEO,
  MENUISERIE_SOURCES_OFFICIELLES,
  PROMPT_AGENCEMENT_BESOINS,
  PROMPT_EXTERIEUR_RELEVE,
  PROMPT_INTERIEUR_DEVIS,
  buildMenuisierBtpCourseJsonLd,
} from '@/lib/formation-ia-menuisier-btp-landing';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { LINKS } from '@/lib/internal-links';
import { getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createMetierBtpPageMetadata('menuiserie', {
  preferCustomTitle: true,
  title: MENUISERIE_SEO.title,
  description: MENUISERIE_SEO.description,
  descriptionFinal: true,
  path: FORMATION_IA_MENUISIER_BTP_PATH,
  openGraphType: 'website',
  openGraphTitle: MENUISERIE_SEO.openGraphTitle,
  keywords: [
    'formation IA entreprise de menuiserie',
    'formation IA menuiserie intérieure',
    'formation IA menuiserie extérieure',
    'formation IA entreprise d’agencement',
    'ChatGPT Claude menuisiers',
    'IA devis menuiserie agencement',
    'formation IA pour le BTP',
  ],
});

const SOMMAIRE = [
  { href: '#interieur', label: 'Menuiserie intérieure' },
  { href: '#exterieur', label: 'Menuiserie extérieure' },
  { href: '#agencement', label: 'Agencement' },
  { href: '#gestion-commune', label: 'Gestion commune' },
  { href: '#exemple-fictif', label: 'Exemple pédagogique fictif' },
  { href: '#confidentialite', label: 'Confidentialité & validation' },
  { href: '#sources', label: 'Sources normatives' },
  { href: '#methode', label: 'Méthode + prompts' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contacter OFC' },
];

function CasSection({
  id,
  titre,
  intro,
  cas,
  livrables,
}: {
  id: string;
  titre: string;
  intro: string;
  cas: readonly { title: string; body: string }[];
  livrables: readonly string[];
}) {
  return (
    <section id={id} className="scroll-mt-24 mt-14">
      <h2 className="font-display text-2xl font-bold text-slate-900">{titre}</h2>
      <p className="mt-4 leading-relaxed text-slate-600">{intro}</p>
      <ul className="mt-6 space-y-5">
        {cas.map((item) => (
          <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
          </li>
        ))}
      </ul>
      <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
        Livrables possibles
      </h3>
      <ul className="mt-4 space-y-2 text-slate-700">
        {livrables.map((l) => (
          <li key={l} className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function FormationIaMenuisierBtpPage() {
  const faqSchema = getFAQSchema([...MENUISERIE_FAQ]);
  const courseJsonLd = buildMenuisierBtpCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-menuiserie" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-menuiserie" schema={faqSchema} /> : null}

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Menuiserie &amp; agencement</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem] lg:text-2xl lg:leading-tight">
          {MENUISERIE_SEO.h1}
        </h1>
        <p className="mt-2 text-xl font-medium text-[#377CF3]">
          Devis, relevés et suivi pose — ChatGPT &amp; Claude sous validation métier
        </p>

        <EnBref>
          {MENUISERIE_EN_BREF.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </EnBref>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA aide à préparer et comparer des documents (devis, relevés, CCTP, CR) à partir de vos
            données. Elle ne valide pas les mesures, les plans de fabrication ni les performances
            techniques — contrôle par le professionnel compétent avant commande ou pose.
          </ShortAnswerBlock>
        </div>

        <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Formation sur vos documents :</span> ateliers
          NIV-01, avec prolongements possibles NIV-02 (AO) et NIV-03 (suivi). Pas de programme catalogue
          « menuiserie » inventé. Distinct de la page charpentier / ossature (lien en FAQ).
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <RdvLink
            campaign="formation-ia-menuiserie-hero"
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

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pour qui — entreprises de menuiserie et d&apos;agencement
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {MENUISERIE_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {MENUISERIE_PREREQUIS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <CasSection
          id="interieur"
          titre={MENUISERIE_INTERIEURE.titre}
          intro={MENUISERIE_INTERIEURE.intro}
          cas={MENUISERIE_INTERIEURE.cas}
          livrables={MENUISERIE_INTERIEURE.livrables}
        />

        <CasSection
          id="exterieur"
          titre={MENUISERIE_EXTERIEURE.titre}
          intro={MENUISERIE_EXTERIEURE.intro}
          cas={MENUISERIE_EXTERIEURE.cas}
          livrables={MENUISERIE_EXTERIEURE.livrables}
        />

        <CasSection
          id="agencement"
          titre={MENUISERIE_AGENCEMENT.titre}
          intro={MENUISERIE_AGENCEMENT.intro}
          cas={MENUISERIE_AGENCEMENT.cas}
          livrables={MENUISERIE_AGENCEMENT.livrables}
        />

        <section id="gestion-commune" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gestion commune — bureau, atelier, AO
          </h2>
          <ul className="mt-6 space-y-5">
            {MENUISERIE_GESTION_COMMUNE.map((item) => (
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
            {MENUISERIE_EXEMPLE_FICTIF.titre}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">{MENUISERIE_EXEMPLE_FICTIF.contexte}</p>
          <div className="mt-4 overflow-x-auto rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
            {MENUISERIE_EXEMPLE_FICTIF.parcours}
          </div>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Contrôle humain obligatoire :</strong>{' '}
            {MENUISERIE_EXEMPLE_FICTIF.controleHumain}
          </p>
        </section>

        <section id="confidentialite" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Confidentialité et validation humaine
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {MENUISERIE_CONFIDENTIALITE.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="sources" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Sources normatives — cadre de référence
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Cette page ne reproduit aucune prescription technique. Les fascicules officiels font foi
            pour la mise en œuvre. OFC ne délivre pas d&apos;avis de conformité. Liens catalogue AFNOR
            pour identifier les textes (accès payant éventuel) :
          </p>
          <ul className="mt-6 space-y-3">
            {MENUISERIE_SOURCES_OFFICIELLES.map((source) => (
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

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode + prompts types
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Trois prompts types. Utilisez uniquement les données fournies ; séparez confirmé,
            hypothèses explicites et manques.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            1. Devis intérieur — désignations
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_INTERIEUR_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Relevé extérieur — fiche exploitable
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_EXTERIEUR_RELEVE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            3. Agencement — cahier des besoins
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_AGENCEMENT_BESOINS}
          </pre>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — formation IA menuiserie et agencement
          </h2>
          <div className="mt-8 space-y-6">
            {MENUISERIE_FAQ.map(({ q, a }) => (
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
            Apportez vos trames de devis, relevés types et modèles de CR. Proposition sur les programmes
            catalogue existants (NIV-01 à NIV-03 selon vos besoins) — financement OPCO possible selon
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
              campaign="formation-ia-menuiserie-rdv"
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
            Formation IA menuiserie &amp; agencement — Île-de-France
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Laure Olivié · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} ·
            NDA 11788515078 · {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <LiensConnexes
          currentPath={FORMATION_IA_MENUISIER_BTP_PATH}
          excludeHrefs={[LINKS.formationIaCharpentierBtp, LINKS.iaDevis, LINKS.claudeAiBtp]}
        />
        <AllerPlusLoin links={[...MENUISERIE_MAILLAGE]} />
        <RenvoiFicheCatalogue
          programmeRef="NIV-01"
          contexte="pour les entreprises de menuiserie et d’agencement"
        />
      </article>
    </div>
  );
}
