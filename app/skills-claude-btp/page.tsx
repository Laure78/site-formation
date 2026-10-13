import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, Package } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { SchemaHowTo } from '@/components/seo/SchemaHowTo';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PATH = LINKS.skillsClaudeBtp;
const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${PATH}`;

const META_TITLE = 'Skills Claude gratuits pour le BTP | Laure Olivié';
const META_DESCRIPTION =
  '5 skills Claude gratuits pour le BTP : CCTP, CR chantier, devis, courriers. Issus de la formation IA pour le BTP. Téléchargez et importez sur claude.ai.';

export const metadata: Metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'skills Claude BTP',
    'Claude AI bâtiment',
    'formation IA pour le BTP',
    'ChatGPT BTP',
    'assistant IA chantier',
  ],
});

const SKILLS = [
  {
    slug: 'analyse-cctp-gros-oeuvre',
    title: 'analyse-cctp-gros-oeuvre',
    metier: "Chargé d'études, conducteur de travaux",
    description:
      'Analyse un CCTP : exigences, risques, questions à la MOE.',
  },
  {
    slug: 'actions-compte-rendu-chantier',
    title: 'actions-compte-rendu-chantier',
    metier: 'Conducteur de travaux',
    description:
      "Extrait les actions qui/quoi/quand d'un CR de chantier.",
  },
  {
    slug: 'controle-devis-oublis',
    title: 'controle-devis-oublis',
    metier: "Chargé d'études de prix, dirigeant",
    description: 'Contrôle un devis et repère les oublis avant envoi.',
  },
  {
    slug: 'courriers-relances-btp',
    title: 'courriers-relances-btp',
    metier: 'Assistante, comptable, conducteur',
    description: 'Rédige courriers et relances.',
  },
  {
    slug: 'methodologie-execution-gros-oeuvre',
    title: 'methodologie-execution-gros-oeuvre',
    metier: 'Directeur technique',
    description: "Structure une méthodologie d'exécution.",
  },
] as const;

const INSTALL_STEPS = [
  {
    name: 'Ouvrir les Skills dans Claude',
    text: 'Sur claude.ai, ouvrez Paramètres → Skills (ou Fonctionnalités / Capacités → Skills).',
  },
  {
    name: 'Importer le fichier .zip',
    text: 'Cliquez sur Importer un skill et sélectionnez le fichier .zip du skill choisi (ou le pack complet, skill par skill).',
  },
  {
    name: 'Activer et utiliser',
    text: 'Activez le skill, puis utilisez-le en joignant votre document (CCTP, CR, devis, courrier…).',
  },
] as const;

const btnPack =
  'inline-flex min-h-12 w-full max-w-xl items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_28px_-10px_rgba(55,124,243,0.35)] transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:text-lg';
const btnCard =
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#377CF3] bg-white px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

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
      about: { '@type': 'Thing', name: 'Skills Claude AI pour le BTP' },
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
  ],
};

export default function SkillsClaudeBtpPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-skills-claude-btp-page" data={pageJsonLd} />
      <SchemaHowTo
        name="Installer un skill Claude pour le BTP"
        description="Importer un skill Claude (.zip) sur claude.ai en 3 étapes, puis l’utiliser en joignant un document métier BTP."
        totalTime="PT3M"
        steps={[...INSTALL_STEPS]}
      />

      <header className="border-b border-slate-200 bg-[#F2F2F2]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">
            Ressources gratuites · Claude AI
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            5 Skills Claude gratuits pour les entreprises du BTP
          </h1>
          <div className="mt-5 max-w-3xl space-y-3 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>
              Ces skills sont issus de la formation «&nbsp;Créer des assistants IA avec
              Claude&nbsp;» animée le 9 octobre 2026 dans une entreprise de gros œuvre de
              l&apos;Essonne.
            </p>
            <p>
              Autour de la table&nbsp;: dirigeant, directeur technique, conducteurs de
              travaux, assistante, comptable et chargé d&apos;études de prix.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section
          className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          aria-labelledby="skills-grid-heading"
        >
          <h2
            id="skills-grid-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Les 5 skills à télécharger
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Chaque fichier .zip s&apos;importe dans Claude. Complétez ensuite les zones
            métier de votre entreprise. Voir aussi la{' '}
            <Link
              href={LINKS.bibliothequeSkills}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              bibliothèque de skills Claude BTP
            </Link>
            .
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((skill) => (
              <li
                key={skill.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5"
              >
                <h3 className="font-display text-base font-bold text-slate-900 break-all">
                  {skill.title}
                </h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                  {skill.metier}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                  {skill.description}
                </p>
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
        </section>

        <section
          id="installer"
          className="border-y border-slate-200 bg-[#F2F2F2]"
          aria-labelledby="installer-heading"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <h2
              id="installer-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Installer en 3 étapes
            </h2>
            <ol className="mt-8 space-y-5">
              {INSTALL_STEPS.map((step, index) => (
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
                    <p className="mt-1 text-base leading-relaxed text-slate-700">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Pour aller plus loin sur Claude dans le BTP&nbsp;:{' '}
              <Link
                href={LINKS.formationMaitriserClaudeAiBtp}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                formation Maîtriser Claude AI pour le BTP
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          aria-labelledby="methode-heading"
        >
          <div
            role="note"
            className="rounded-2xl border-2 border-[#377CF3]/25 bg-[#EFF6FF] p-6 md:p-8"
          >
            <h2
              id="methode-heading"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              La méthode
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-800 md:text-lg">
              Choisir une tâche → Définir les consignes → Tester → Ajuster.
            </p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700 md:text-base">
              Toujours vérifier les sources et les résultats avant utilisation.
            </p>
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
              OPCO/Constructys selon éligibilité. Organisme certifié Qualiopi.
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
