import { CtaButton } from '@/components/CtaButton';
import { BookOpen, Download, Package, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import { BibliothequeSkillsContent } from '@/components/ressources/BibliothequeSkillsContent';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { SKILL_INSTALL_TUTORIAL } from '@/lib/bibliotheque-skills/tutorial';
import {
  BIBLIOTHEQUE_BEWORK_COUNT,
  BIBLIOTHEQUE_SKILLS,
  BIBLIOTHEQUE_SKILLS_COUNT,
  BIBLIOTHEQUE_TUTO_COUNT,
} from '@/lib/bibliotheque-skills';

const PATH = LINKS.bibliothequeSkills;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

const PAGE_META_DESCRIPTION =
  'Claude AI BTP — bibliothèque skills gratuits : CR, DCE, mémoire technique, PPSPS et DOE au format .skill. OFC Qualiopi, présentiel IDF. Téléchargez maintenant.';

export const metadata: Metadata = createPageMetadata({
  title: 'Bibliothèque skills Claude BTP — téléchargement .skill & .md',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Bibliothèque skills Claude BTP — .skill & .md gratuits',
  openGraphDescription: PAGE_META_DESCRIPTION,
  appendAuthorSuffix: false,
});

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${CANONICAL}#collection`,
      name: 'Bibliothèque skills Claude BTP',
      description:
        'Téléchargement gratuit de skills métier BTP au format .skill — chantier, marchés publics, réception, administratif.',
      url: CANONICAL,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', name: 'laureolivie.fr', url: SITE_CONFIG.url },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: BIBLIOTHEQUE_SKILLS.length,
        itemListElement: BIBLIOTHEQUE_SKILLS.map((s, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: s.name,
          url: s.skillUrl
            ? `${SITE_CONFIG.url.replace(/\/$/, '')}${s.skillUrl}`
            : s.tutoUrl
              ? `${SITE_CONFIG.url.replace(/\/$/, '')}${s.tutoUrl}`
              : CANONICAL,
        })),
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${CANONICAL}#howto`,
      name: 'Téléverser un skill Claude BTP (.skill)',
      description:
        'Télécharger un skill depuis la bibliothèque BeWork et l\'importer dans Claude.ai ou Claude Code.',
      step: SKILL_INSTALL_TUTORIAL.steps.map((s) => ({
        '@type': 'HowToStep',
        position: s.n,
        name: s.title,
        text: s.text,
      })),
    },
  ],
};

const HERO_STATS = [
  { icon: Download, value: String(BIBLIOTHEQUE_SKILLS_COUNT), label: 'skills au total' },
  { icon: Package, value: String(BIBLIOTHEQUE_BEWORK_COUNT), label: 'fichiers .skill' },
  { icon: BookOpen, value: String(BIBLIOTHEQUE_TUTO_COUNT), label: 'tutos PDF' },
] as const;

export default function BibliothequeSkillsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-bibliotheque-skills" schema={collectionJsonLd} />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Ressource gratuite · BeWork
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Bibliothèque skills Claude BTP
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Skills métier prêts à importer et tutos pas à pas pour le BTP. Gratuit, sans inscription.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {HERO_STATS.map(({ icon: Icon, value, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#F8FAFC] px-4 py-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <Icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <BibliothequeSkillsContent />
        </div>
      </main>

      <MaillageRessourceFromConfig
        config={getMaillageRessourceConfig(PATH)!}
        currentPath={PATH}
        layout="narrow"
      />

      <section className="border-t border-slate-200 bg-white px-4 py-10" aria-labelledby="cta-calendly-skills">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="cta-calendly-skills" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Passer à la pratique en formation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Installer ces skills sur vos dossiers réels en présentiel Île-de-France — Qualiopi, Constructys selon
            éligibilité.
          </p>
          <CtaButton origin="ressources-bibliotheque-skills-final" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]" />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600">
        <p>
          Skills issus de{' '}
          <a href="https://app.laureolivie.fr" className="font-semibold text-[#377CF3] hover:underline">
            BeWork
          </a>{' '}
          — plateforme entreprises BTP. Contenus pédagogiques signés Laure Olivié (OFC, Qualiopi).
        </p>
      </footer>
    </div>
  );
}
