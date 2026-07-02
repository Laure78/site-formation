import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { BibliothequeSkillsContent } from '@/components/ressources/BibliothequeSkillsContent';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { SKILL_INSTALL_TUTORIAL } from '@/lib/bibliotheque-skills/tutorial';
import { BIBLIOTHEQUE_BEWORK_COUNT, BIBLIOTHEQUE_SKILLS, BIBLIOTHEQUE_SKILLS_COUNT, BIBLIOTHEQUE_TUTO_COUNT } from '@/lib/bibliotheque-skills';

const PATH = '/ressources/bibliotheque-skills';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

export const metadata: Metadata = createPageMetadata({
  title: 'Bibliothèque skills Claude BTP — téléchargement .skill & .md',
  description: `${BIBLIOTHEQUE_SKILLS_COUNT} skills BTP : ${BIBLIOTHEQUE_BEWORK_COUNT} prêts à importer (.skill) + ${BIBLIOTHEQUE_TUTO_COUNT} tutos pour les créer. CR, DCE, mémoire technique, PPSPS, DOE.`,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Bibliothèque skills Claude BTP — .skill & .md gratuits',
  openGraphDescription:
    'Skills chantier et marchés publics signés BeWork : télécharge le .skill et importe dans Claude.ai ou Claude Code.',
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
        'Téléchargement gratuit de skills métier BTP au format .skill et .md — chantier, marchés publics, réception, administratif.',
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
          url: `${SITE_CONFIG.url.replace(/\/$/, '')}${s.skillUrl}`,
        })),
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${CANONICAL}#howto`,
      name: 'Installer un skill Claude BTP (.skill)',
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

export default function BibliothequeSkillsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-bibliotheque-skills" schema={collectionJsonLd} />

      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link
            href={LINKS.ressources}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#377CF3] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour aux ressources
          </Link>
          <Link href={LINKS.prendreRdv} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#377CF3]">
            Formation sur mesure
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">Ressource gratuite · BeWork</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Bibliothèque skills Claude BTP
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          {BIBLIOTHEQUE_SKILLS_COUNT} assistants métier : {BIBLIOTHEQUE_BEWORK_COUNT} skills BeWork à importer dans
          Claude.ai ou Claude Code, et {BIBLIOTHEQUE_TUTO_COUNT} tutos pas à pas issus des{' '}
          <Link href={LINKS.ressources} className="font-semibold text-[#377CF3] hover:underline">
            ressources gratuites
          </Link>
          .
        </p>

        <div className="mt-10">
          <BibliothequeSkillsContent />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-[#F8FAFC] px-4 py-8 text-center text-sm text-slate-600">
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
