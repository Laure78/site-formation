import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { PromptCopiableBlock } from '@/components/prompts-ia-conducteur-travaux/PromptCopiableBlock';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  PROMPTS_IA_CONDUCTEUR_INTRO,
  PROMPTS_IA_CONDUCTEUR_SECTIONS,
  PROMPTS_IA_CONDUCTEUR_TRAVAUX_PATH,
} from '@/lib/prompts-ia-conducteur-travaux-content';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE = '20 prompts IA pour conducteur de travaux | Laure Olivié';
const PAGE_DESCRIPTION =
  '20 prompts IA conducteur de travaux BTP : CR, PPSPS, réserves, courriers MOE. Copier-coller ChatGPT et Claude — formation IA pour le BTP.';

const FORMATION_LINKS = [
  {
    text: 'Découvrir la formation IA conducteur de travaux — programme et cas d\u2019usage terrain',
  },
  {
    text: 'Voir la fiche formation IA pour conducteurs de travaux (présentiel Île-de-France)',
  },
  {
    text: 'Approfondir avec la formation conducteur de travaux et les exercices sur vos documents',
  },
] as const;

export const metadata = createPageMetadata({
  title: '20 prompts IA pour conducteur de travaux',
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: PROMPTS_IA_CONDUCTEUR_TRAVAUX_PATH,
  openGraphTitle: PAGE_TITLE,
  openGraphDescription: PAGE_DESCRIPTION,
  keywords: [
    'prompts IA conducteur de travaux',
    'ChatGPT conducteur de travaux',
    'prompts chantier BTP',
    'formation IA pour le BTP',
    'compte rendu chantier IA',
    'PPSPS IA',
  ],
  appendAuthorSuffix: false,
});

export default function PromptsIaConducteurTravauxPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: LINKS.home },
    { name: 'Ressources', path: LINKS.ressources },
    { name: '20 prompts IA conducteur de travaux', path: PROMPTS_IA_CONDUCTEUR_TRAVAUX_PATH },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      {breadcrumbSchema ? (
        <JsonLd id="jsonld-breadcrumb-prompts-ia-conducteur-travaux" schema={breadcrumbSchema} />
      ) : null}

      <article>
        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-[#377CF3]">
            Ressources · conducteur de travaux · prompts copiables
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            20 prompts IA pour conducteurs de travaux (à copier-coller)
          </h1>
          {PROMPTS_IA_CONDUCTEUR_INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="mt-4 leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}
        </header>

        {PROMPTS_IA_CONDUCTEUR_SECTIONS.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">{section.title}</h2>
            {section.prompts.map((prompt) => (
              <PromptCopiableBlock
                key={prompt.title}
                title={prompt.title}
                body={prompt.body}
                outcome={prompt.outcome}
              />
            ))}
            {sectionIndex < FORMATION_LINKS.length ? (
              <p className="mt-8 text-sm leading-relaxed text-slate-600">
                <Link href={LINKS.formationIaConducteurDeTravaux} className={`font-semibold ${OFC_LINK}`}>
                  {FORMATION_LINKS[sectionIndex].text}
                </Link>
                .
              </p>
            ) : null}
          </section>
        ))}

        <section
          id="rdv"
          className="scroll-mt-24 mt-16 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white"
        >
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Échanger sur vos usages IA en conduite de travaux
          </h2>
          <p className="mt-3 leading-relaxed text-blue-100">
            30 minutes pour cadrer vos priorités : CR, documents réglementaires, communication MOE ou sous-traitants.
            Visio découverte gratuite, sans engagement.
          </p>
          <div className="mt-6">
            <CalendlyEmbed
              type="link"
              variant="on-accent"
              ctaPosition="footer"
              campaign="prompts-ia-conducteur-travaux-footer"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
            >
              Prendre un rendez-vous découverte
            </CalendlyEmbed>
          </div>
        </section>
      </article>
    </div>
  );
}
