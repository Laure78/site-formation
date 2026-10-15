import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Package } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { SchemaHowTo } from '@/components/seo/SchemaHowTo';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_ORGANIZATION_OFC, SCHEMA_PERSON_LAURE } from '@/lib/schema-constants';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import {
  ANTHROPIC_SKILLS_DOCS,
  SKILLS_CLAUDE_BTP_CARDS,
  SKILLS_CLAUDE_BTP_CONTROLES,
  SKILLS_CLAUDE_BTP_IMAGE,
  SKILLS_CLAUDE_BTP_INSTALL_STEPS,
  SKILLS_CLAUDE_BTP_INTRO,
  SKILLS_CLAUDE_BTP_META,
  SKILLS_CLAUDE_BTP_PREPARER,
  SKILLS_VS_PROMPT_PROJET,
} from '@/lib/skills-claude-btp-content';

export const revalidate = 3600;

const PATH = LINKS.skillsClaudeBtp;
const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${PATH}`;

const META_TITLE = SKILLS_CLAUDE_BTP_META.title;
const META_DESCRIPTION = SKILLS_CLAUDE_BTP_META.description;

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
    url: SKILLS_CLAUDE_BTP_IMAGE.src,
    width: SKILLS_CLAUDE_BTP_IMAGE.width,
    height: SKILLS_CLAUDE_BTP_IMAGE.height,
    alt: SKILLS_CLAUDE_BTP_IMAGE.alt,
  },
});

const btnPack =
  'inline-flex min-h-12 w-full max-w-xl items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_28px_-10px_rgba(55,124,243,0.35)] transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:text-lg';
const btnCard =
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#377CF3] bg-white px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';
const linkClass =
  'font-medium text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

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
      about: { '@type': 'Thing', name: 'Skills Claude BTP' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${BASE}${SKILLS_CLAUDE_BTP_IMAGE.src}`,
        width: SKILLS_CLAUDE_BTP_IMAGE.width,
        height: SKILLS_CLAUDE_BTP_IMAGE.height,
        caption: SKILLS_CLAUDE_BTP_IMAGE.alt,
      },
      author: SCHEMA_PERSON_LAURE,
      publisher: SCHEMA_ORGANIZATION_OFC,
    },
    {
      '@type': 'LearningResource',
      '@id': `${CANONICAL}#resource`,
      name: SKILLS_CLAUDE_BTP_META.h1,
      description: META_DESCRIPTION,
      url: CANONICAL,
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      learningResourceType: 'Guide',
      educationalLevel: 'beginner',
      author: SCHEMA_PERSON_LAURE,
      provider: SCHEMA_ORGANIZATION_OFC,
      about: [
        { '@type': 'Thing', name: 'Skills Claude BTP' },
        { '@type': 'Thing', name: 'Assistants IA pour le bâtiment' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: BASE,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Skills Claude BTP',
          item: CANONICAL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${CANONICAL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu’est-ce qu’un Skill Claude ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: SKILLS_CLAUDE_BTP_INTRO.definition,
          },
        },
        {
          '@type': 'Question',
          name: 'Comment créer et utiliser un Skill Claude pour le BTP ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Téléchargez un .zip sur cette page, importez-le via Personnalisation → Compétences sur claude.ai, activez-le puis joignez votre document métier. Vérifiez toujours les résultats avant usage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels contrôles effectuer sur les résultats d’un Skill ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: SKILLS_CLAUDE_BTP_CONTROLES.join(' '),
          },
        },
      ],
    },
  ],
};

export default function SkillsClaudeBtpPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-skills-claude-btp-page" data={pageJsonLd} />
      <SchemaHowTo
        name="Importer un skill Claude pour le BTP"
        description="Importer un skill Claude (.zip) sur claude.ai via Personnalisation → Compétences, puis l’utiliser en joignant un document métier BTP."
        totalTime="PT5M"
        steps={[...SKILLS_CLAUDE_BTP_INSTALL_STEPS]}
      />

      <header className="border-b border-slate-200 bg-[#F2F2F2]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">
            {SKILLS_CLAUDE_BTP_META.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {SKILLS_CLAUDE_BTP_META.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-800 md:text-lg">
            {SKILLS_CLAUDE_BTP_INTRO.definition}
          </p>
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-slate-700">
            <p>{SKILLS_CLAUDE_BTP_INTRO.contexte}</p>
            <p>{SKILLS_CLAUDE_BTP_INTRO.auteur}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#usages-btp"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              Voir les exemples BTP
            </a>
            <a
              href="#tuto-importer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#377CF3] bg-white px-5 py-2.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              Comment créer et utiliser un Skill
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="qu-est-ce-qu-un-skill"
          className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8"
          aria-labelledby="definition-skill-heading"
        >
          <h2
            id="definition-skill-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Qu’est-ce qu’un Skill Claude ?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            Pour automatiser les tâches administratives BTP sans tout retaper, il faut
            distinguer trois notions. Sources officielles Anthropic&nbsp;:{' '}
            <ExternalLinkAnchor href={ANTHROPIC_SKILLS_DOCS.overview.href} className={linkClass}>
              {ANTHROPIC_SKILLS_DOCS.overview.label}
            </ExternalLinkAnchor>
            {' · '}
            <ExternalLinkAnchor href={ANTHROPIC_SKILLS_DOCS.explained.href} className={linkClass}>
              {ANTHROPIC_SKILLS_DOCS.explained.label}
            </ExternalLinkAnchor>
            .
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {SKILLS_VS_PROMPT_PROJET.map((item) => (
              <li
                key={item.term}
                className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5"
              >
                <h3 className="font-display text-base font-bold text-slate-900">{item.term}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            Pour installer l’environnement Claude (Projets, Skills, connecteurs) côté BTP,
            consultez aussi le{' '}
            <Link href={LINKS.guideClaudeBtpOfc} className={linkClass}>
              guide Claude BTP — Projets, Skills et connecteurs
            </Link>
            .
          </p>
        </section>

        <section
          id="usages-btp"
          className="scroll-mt-28 border-y border-slate-200 bg-[#F2F2F2]"
          aria-labelledby="usages-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <h2
              id="usages-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Quels usages pour une entreprise du BTP ?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Cinq Skills Claude BTP prêts à importer — exemples pédagogiques à adapter à vos
              méthodes. Complétez les zones métier de votre entreprise. Voir aussi la{' '}
              <Link href={LINKS.bibliothequeSkills} className={linkClass}>
                bibliothèque de skills Claude BTP
              </Link>
              .
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {SKILLS_CLAUDE_BTP_CARDS.map((skill) => (
                <li
                  key={skill.slug}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 md:p-6"
                >
                  <h3 className="font-display text-base font-bold text-slate-900 break-all">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                    {skill.metier}
                  </p>
                  <dl className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                    <div>
                      <dt className="font-semibold text-slate-900">Document fourni</dt>
                      <dd className="mt-0.5">{skill.document}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">Tâche confiée</dt>
                      <dd className="mt-0.5">{skill.tache}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">Résultat attendu</dt>
                      <dd className="mt-0.5">{skill.resultat}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">Vérification humaine</dt>
                      <dd className="mt-0.5">{skill.verification}</dd>
                    </div>
                  </dl>
                  <a
                    href={`/skills/${skill.slug}.zip`}
                    className={`${btnCard} mt-5`}
                    download
                  >
                    <Download size={16} aria-hidden />
                    Télécharger
                  </a>
                </li>
              ))}
            </ul>

            <div id="pack-complet" className="mt-10 flex justify-center scroll-mt-28">
              <a href={LINKS.skillsClaudeBtpPackComplet} className={btnPack} download>
                <Package size={22} aria-hidden />
                Télécharger le pack complet
              </a>
            </div>
          </div>
        </section>

        <section
          id="tuto-importer"
          className="scroll-mt-28"
          aria-labelledby="installer-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <h2
              id="installer-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Comment créer et utiliser un Skill ?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Pour créer un Skill Claude à partir de vos consignes, partez d’une tâche
              répétitive, rédigez les étapes dans un SKILL.md, testez sur un vrai document,
              puis ajustez. Pour démarrer vite, importez l’un des .zip ci-dessus.
            </p>

            <ol className="mt-8 space-y-4">
              {SKILLS_CLAUDE_BTP_INSTALL_STEPS.map((step, index) => (
                <li
                  key={step.name}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5"
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
                    <p className="mt-1 text-base leading-relaxed text-slate-700">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={SKILLS_CLAUDE_BTP_IMAGE.src}
                alt={SKILLS_CLAUDE_BTP_IMAGE.alt}
                width={SKILLS_CLAUDE_BTP_IMAGE.width}
                height={SKILLS_CLAUDE_BTP_IMAGE.height}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <figcaption className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600 md:px-5">
                {SKILLS_CLAUDE_BTP_IMAGE.caption}
              </figcaption>
            </figure>

            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Pour industrialiser Projets, Skills et Cowork en formation présentielle
              Île-de-France&nbsp;:{' '}
              <Link href={LINKS.formationMaitriserClaudeAiBtp} className={linkClass}>
                formation Maîtriser Claude AI pour le BTP
              </Link>
              . Vue d’ensemble Claude côté bâtiment&nbsp;:{' '}
              <Link href={LINKS.claudeAiBtp} className={linkClass}>
                Claude AI pour le BTP
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          id="preparer-documents"
          className="border-y border-slate-200 bg-[#F2F2F2]"
          aria-labelledby="preparer-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
            <h2
              id="preparer-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Quels documents et consignes préparer ?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Avant de créer un Skill Claude ou d’adapter un exemple, rassemblez&nbsp;:
            </p>
            <ul className="mt-6 space-y-3">
              {SKILLS_CLAUDE_BTP_PREPARER.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 md:text-base"
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
              Méthode courte&nbsp;: choisir une tâche → définir les consignes → tester →
              ajuster.
            </p>
          </div>
        </section>

        <section
          className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-14 lg:px-8"
          aria-labelledby="controles-heading"
        >
          <div
            role="note"
            className="rounded-2xl border-2 border-[#377CF3]/25 bg-[#EFF6FF] p-6 md:p-8"
          >
            <h2
              id="controles-heading"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              Quels contrôles effectuer sur les résultats ?
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {SKILLS_CLAUDE_BTP_CONTROLES.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="border-t border-slate-200 bg-[#377CF3]"
          aria-labelledby="cta-formations-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
            <h2
              id="cta-formations-heading"
              className="font-display text-2xl font-bold text-white md:text-3xl"
            >
              Passer à la formation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg">
              Formation intra ou inter en présentiel en Île-de-France. Prise en charge
              OPCO/Constructys selon éligibilité. Organisme certifié Qualiopi. Assistants IA
              pour le bâtiment&nbsp;: programmes catalogue pour créer et industrialiser vos
              Skills.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={LINKS.formations}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#377CF3] transition-colors hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Voir le catalogue des formations
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
