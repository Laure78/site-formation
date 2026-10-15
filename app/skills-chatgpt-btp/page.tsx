import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Package } from 'lucide-react';
import { CopyPromptButton } from '@/components/CopyPromptButton';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { SchemaHowTo } from '@/components/seo/SchemaHowTo';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_ORGANIZATION_OFC, SCHEMA_PERSON_LAURE } from '@/lib/schema-constants';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import {
  OPENAI_SKILLS_DOCS,
  SKILLS_CHATGPT_BENEFICES,
  SKILLS_CHATGPT_BTP_CARDS,
  SKILLS_CHATGPT_BTP_IMAGE,
  SKILLS_CHATGPT_BTP_META,
  SKILLS_CHATGPT_COMPARATIF,
  SKILLS_CHATGPT_DOWNLOADS,
  SKILLS_CHATGPT_FAQ,
  SKILLS_CHATGPT_GENERATOR_PROMPT,
  SKILLS_CHATGPT_BTP_INTRO,
  SKILLS_CHATGPT_PERSONNALISER,
  SKILLS_CHATGPT_STEPS,
} from '@/lib/skills-chatgpt-btp-content';

export const revalidate = 3600;

const PATH = LINKS.skillsChatgptBtp;
const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${PATH}`;

const META_TITLE = SKILLS_CHATGPT_BTP_META.title;
const META_DESCRIPTION = SKILLS_CHATGPT_BTP_META.description;

export const metadata: Metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  image: {
    url: SKILLS_CHATGPT_BTP_IMAGE.src,
    width: SKILLS_CHATGPT_BTP_IMAGE.width,
    height: SKILLS_CHATGPT_BTP_IMAGE.height,
    alt: SKILLS_CHATGPT_BTP_IMAGE.alt,
  },
});

const btnPrimary =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';
const btnSecondary =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#377CF3] bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';
const btnPack =
  'inline-flex min-h-12 w-full max-w-xl items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_28px_-10px_rgba(55,124,243,0.35)] transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:text-lg';
const linkClass =
  'font-medium text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

const TOC = [
  { href: '#a-quoi-sert', label: 'À quoi sert un Skill' },
  { href: '#creer-skill', label: 'Créer en 5 étapes' },
  { href: '#six-skills', label: '6 Skills BTP' },
  { href: '#telechargements', label: 'Téléchargements' },
  { href: '#personnaliser', label: 'Personnaliser' },
  { href: '#faq', label: 'FAQ' },
  { href: '#formation', label: 'Formation' },
] as const;

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: META_TITLE,
      description: META_DESCRIPTION,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', name: SITE_CONFIG.name, url: BASE },
      about: { '@type': 'Thing', name: 'Skills ChatGPT BTP' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${BASE}${SKILLS_CHATGPT_BTP_IMAGE.src}`,
        width: SKILLS_CHATGPT_BTP_IMAGE.width,
        height: SKILLS_CHATGPT_BTP_IMAGE.height,
        caption: SKILLS_CHATGPT_BTP_IMAGE.alt,
      },
      author: SCHEMA_PERSON_LAURE,
      publisher: SCHEMA_ORGANIZATION_OFC,
    },
    {
      '@type': 'LearningResource',
      '@id': `${CANONICAL}#resource`,
      name: SKILLS_CHATGPT_BTP_META.h1,
      description: META_DESCRIPTION,
      url: CANONICAL,
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      learningResourceType: 'Guide',
      educationalLevel: 'beginner',
      author: SCHEMA_PERSON_LAURE,
      provider: SCHEMA_ORGANIZATION_OFC,
      about: [
        { '@type': 'Thing', name: 'Skills ChatGPT BTP' },
        { '@type': 'Thing', name: 'Assistants ChatGPT bâtiment' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Skills ChatGPT BTP', item: CANONICAL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${CANONICAL}#faq-schema`,
      mainEntity: SKILLS_CHATGPT_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

export default function SkillsChatgptBtpPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-skills-chatgpt-btp-page" data={pageJsonLd} />
      <SchemaHowTo
        name="Créer un Skill ChatGPT pour le BTP"
        description="Vérifier l’accès, préparer la tâche, rédiger le SKILL.md, importer ou configurer, puis tester et mettre à jour."
        totalTime="PT30M"
        steps={SKILLS_CHATGPT_STEPS.map((s) => ({ name: s.name, text: s.text }))}
      />

      <header className="border-b border-slate-200 bg-[#F2F2F2]">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-start md:py-14 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">
              {SKILLS_CHATGPT_BTP_META.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {SKILLS_CHATGPT_BTP_META.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-800 md:text-lg">
              {SKILLS_CHATGPT_BTP_INTRO.lead}
            </p>
            <p className="mt-3 text-sm font-medium text-slate-600">
              {SKILLS_CHATGPT_BTP_INTRO.disclaimer}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {SKILLS_CHATGPT_BTP_INTRO.auteur}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={SKILLS_CHATGPT_DOWNLOADS.tutorielPdf} className={btnPrimary} download>
                <Download size={16} aria-hidden />
                Télécharger le tutoriel PDF
              </a>
              <a href="#six-skills" className={btnSecondary}>
                Découvrir les 6 Skills BTP
              </a>
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={SKILLS_CHATGPT_BTP_IMAGE.src}
              alt={SKILLS_CHATGPT_BTP_IMAGE.alt}
              width={SKILLS_CHATGPT_BTP_IMAGE.width}
              height={SKILLS_CHATGPT_BTP_IMAGE.height}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 360px"
              priority
            />
            <figcaption className="border-t border-slate-100 px-3 py-2 text-xs text-slate-500">
              {SKILLS_CHATGPT_BTP_IMAGE.caption}
            </figcaption>
          </figure>
        </div>
      </header>

      <nav
        className="border-b border-slate-200 bg-white"
        aria-label="Sommaire de la page"
      >
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {TOC.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-slate-200 bg-[#F2F2F2] px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#377CF3] hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section
          id="a-quoi-sert"
          className="scroll-mt-28 mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8"
          aria-labelledby="a-quoi-sert-heading"
        >
          <h2
            id="a-quoi-sert-heading"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            À quoi sert un Skill ChatGPT dans le BTP ?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            Un Skill ChatGPT BTP est une procédure écrite une fois (fichier SKILL.md, souvent
            livré en .zip) que ChatGPT peut appliquer lorsqu’il reconnaît votre demande —
            synthétiser un CR, comparer des devis fournisseurs, préparer une causerie. Cela aide
            à automatiser les tâches administratives BTP sans tout retaper, sans remplacer le
            contrôle humain.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SKILLS_CHATGPT_BENEFICES.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm leading-relaxed text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-lg font-bold text-slate-900">
            Prompt, Skill, GPT personnalisé ou Projet ?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Sources officielles&nbsp;:{' '}
            <ExternalLinkAnchor href={OPENAI_SKILLS_DOCS.skillsHelp.href} className={linkClass}>
              {OPENAI_SKILLS_DOCS.skillsHelp.label}
            </ExternalLinkAnchor>
            {' · '}
            <ExternalLinkAnchor href={OPENAI_SKILLS_DOCS.projects.href} className={linkClass}>
              {OPENAI_SKILLS_DOCS.projects.label}
            </ExternalLinkAnchor>
            {' · '}
            <ExternalLinkAnchor href={OPENAI_SKILLS_DOCS.gpts.href} className={linkClass}>
              {OPENAI_SKILLS_DOCS.gpts.label}
            </ExternalLinkAnchor>
            .
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">
                Comparatif Prompt, Skill, GPT personnalisé et Projet ChatGPT
              </caption>
              <thead className="bg-[#F2F2F2] text-slate-900">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Notion
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Rôle
                  </th>
                </tr>
              </thead>
              <tbody>
                {SKILLS_CHATGPT_COMPARATIF.map((row) => (
                  <tr key={row.term} className="border-t border-slate-200">
                    <th scope="row" className="px-4 py-3 align-top font-semibold text-slate-900">
                      {row.term}
                    </th>
                    <td className="px-4 py-3 text-slate-700">{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="creer-skill"
          className="scroll-mt-28 border-y border-slate-200 bg-[#F2F2F2]"
          aria-labelledby="creer-skill-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <h2
              id="creer-skill-heading"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Créer son Skill en cinq étapes
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Tutoriel Skills ChatGPT — méthode issue du PDF OFC, alignée sur la documentation
              OpenAI. Les libellés d’interface peuvent varier selon le compte.
            </p>
            <ol className="mt-8 space-y-4">
              {SKILLS_CHATGPT_STEPS.map((step, index) => (
                <li
                  key={step.name}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#377CF3] font-display text-lg font-bold text-white"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-slate-900">
                      {step.name}
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-slate-700">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Prompt générateur de Skill
                </h3>
                <CopyPromptButton
                  text={SKILLS_CHATGPT_GENERATOR_PROMPT}
                  label="Copier le prompt"
                />
              </div>
              <p className="mt-2 text-sm text-slate-600">
                À coller dans ChatGPT (avec skill-creator si disponible). Conservez les champs
                entre crochets à personnaliser. Les cas fictifs servent à découvrir la méthode ;
                avant un usage opérationnel, testez aussi sur des dossiers représentatifs
                autorisés.
              </p>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-[#F2F2F2] p-4 text-xs leading-relaxed text-slate-800 md:text-sm">
                {SKILLS_CHATGPT_GENERATOR_PROMPT}
              </pre>
              <p className="mt-3 text-xs text-slate-500">
                Voir aussi{' '}
                <ExternalLinkAnchor href={OPENAI_SKILLS_DOCS.buildSkills.href} className={linkClass}>
                  {OPENAI_SKILLS_DOCS.buildSkills.label}
                </ExternalLinkAnchor>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          id="six-skills"
          className="scroll-mt-28 mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          aria-labelledby="six-skills-heading"
        >
          <h2
            id="six-skills-heading"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Six Skills BTP à télécharger
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Modèles de Skills BTP complémentaires (budget, fournisseurs, factures, sécurité…).
            Chaque archive contient un SKILL.md à importer individuellement.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {SKILLS_CHATGPT_BTP_CARDS.map((skill) => (
              <li
                key={skill.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6"
              >
                <h3 className="font-display text-base font-bold text-slate-900">{skill.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                  {skill.public}
                </p>
                <dl className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                  <div>
                    <dt className="font-semibold text-slate-900">Tâche</dt>
                    <dd className="mt-0.5">{skill.tache}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Documents nécessaires</dt>
                    <dd className="mt-0.5">{skill.documents}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Livrables préparés</dt>
                    <dd className="mt-0.5">{skill.livrables}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Exemple de demande</dt>
                    <dd className="mt-0.5 italic">« {skill.exemple} »</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Limite</dt>
                    <dd className="mt-0.5">{skill.limite}</dd>
                  </div>
                </dl>
                <a href={skill.zipHref} className={`${btnSecondary} mt-5 w-full`} download>
                  <Download size={16} aria-hidden />
                  Télécharger le ZIP
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="telechargements"
          className="scroll-mt-28 border-y border-slate-200 bg-[#F2F2F2]"
          aria-labelledby="telechargements-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
            <h2
              id="telechargements-heading"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Télécharger les ressources
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Décompressez le pack complet pour retrouver les six archives individuelles. Suivez
              ensuite la procédure d’import de votre environnement. Le pack global n’est pas un
              skill unique à importer d’un seul coup.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-4 sm:items-start">
              <a href={SKILLS_CHATGPT_DOWNLOADS.tutorielPdf} className={btnPrimary} download>
                <Download size={16} aria-hidden />
                Tutoriel PDF (9 pages)
              </a>
              <a href={SKILLS_CHATGPT_DOWNLOADS.packComplet} className={btnPack} download>
                <Package size={22} aria-hidden />
                Pack complet — 6 Skills ZIP
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Page sœur Claude (méthode et 5 autres exemples)&nbsp;:{' '}
              <Link href={LINKS.skillsClaudeBtp} className={linkClass}>
                Skills Claude pour le BTP
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          id="personnaliser"
          className="scroll-mt-28 mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8"
          aria-labelledby="personnaliser-heading"
        >
          <h2
            id="personnaliser-heading"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Personnaliser et vérifier
          </h2>
          <ul className="mt-6 space-y-3">
            {SKILLS_CHATGPT_PERSONNALISER.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm leading-relaxed text-slate-700 md:text-base"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            Un Skill ne garantit pas la confidentialité à lui seul. Vérifiez les paramètres du
            compte, les accès et la politique de l’entreprise avant de joindre des documents
            sensibles.
          </p>
        </section>

        <section
          id="faq"
          className="scroll-mt-28 border-y border-slate-200 bg-[#F2F2F2]"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
            <h2
              id="faq-heading"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Questions fréquentes
            </h2>
            <ul className="mt-8 space-y-4">
              {SKILLS_CHATGPT_FAQ.map((item) => (
                <li
                  key={item.q}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <h3 className="font-display text-base font-bold text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="formation"
          className="scroll-mt-28 bg-[#377CF3]"
          aria-labelledby="formation-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
            <h2
              id="formation-heading"
              className="font-display text-2xl font-bold text-white md:text-3xl"
            >
              Créez vos assistants IA sur vos propres documents BTP
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg">
              Apprenez à structurer vos consignes, adapter vos modèles et tester vos assistants
              sur vos tâches métier. Formation en présentiel en Île-de-France.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`${LINKS.formations}#skills-metiers-btp`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#377CF3] transition-colors hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Découvrir la formation assistants IA
              </Link>
              <Link
                href={LINKS.prendreRdv}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Échanger sur les besoins de mon équipe
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
