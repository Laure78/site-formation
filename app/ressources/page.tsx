import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { TUTOS } from '@/lib/tutos';
import { TutosGroupedByCategory } from '@/components/ressources/TutosGroupedByCategory';
import { RessourcesThematicHub } from '@/components/ressources/RessourcesThematicHub';
import { RessourcesGuidesSection } from '@/components/ressources/RessourcesGuidesSection';
import { RessourcesHero } from '@/components/ressources/RessourcesHero';
import { RessourcesLexiqueSection } from '@/components/ressources/RessourcesLexiqueSection';
import { RessourcesTutosNav } from '@/components/ressources/RessourcesTutosNav';
import { RESSOURCES_LEXIQUE } from '@/lib/ressources-lexique';

const PATH = '/ressources';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

export const metadata: Metadata = createPageMetadata({
  title: 'Ressources IA BTP — tutos, guides & lexique gratuit',
  description:
    'Tutos PDF, guides et lexique BTP gratuit : 146 termes, flashcards, quiz, parcours marchés publics et chantier. Sans inscription. Laure Olivié (Qualiopi).',
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Ressources gratuites IA BTP — tutos, guides & lexique',
  openGraphDescription:
    'Tutos PDF Claude, guides MOE/CDT et lexique BTP interactif (parcours, flashcards, quiz). 100 % gratuit, sans inscription.',
  appendAuthorSuffix: false,
  image: {
    url: '/images/ressources-gratuites-ia-btp-hero-2026.png',
    width: 1024,
    height: 1024,
    alt: 'Ressources gratuites IA BTP : tutos PDF, guides, lexique chantier et marchés publics par Laure Olivié (Qualiopi)',
  },
});

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${CANONICAL}#collection`,
      name: 'Ressources gratuites IA BTP — Laure Olivié',
      description:
        "Tutos PDF, guides, lexique BTP interactif et fiches pratiques pour appliquer l'IA dans ton entreprise BTP : skills Claude métier, vocabulaire chantier, veille appels d'offres, DUERP, PPSPS, mémoire technique.",
      url: CANONICAL,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', name: 'laureolivie.fr', url: SITE_CONFIG.url },
      mainEntity: {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: TUTOS.length + 1,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'WebApplication',
              '@id': `${RESSOURCES_LEXIQUE.url}#webapp`,
              name: RESSOURCES_LEXIQUE.schemaName,
              url: RESSOURCES_LEXIQUE.url,
            },
          },
          ...TUTOS.map((t, idx) => ({
            '@type': 'ListItem',
            position: idx + 2,
            url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.ressources}/${t.slug}`,
            name: t.title,
          })),
        ],
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${RESSOURCES_LEXIQUE.url}#webapp`,
      name: RESSOURCES_LEXIQUE.schemaName,
      url: RESSOURCES_LEXIQUE.url,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      description: RESSOURCES_LEXIQUE.schemaDescription,
      inLanguage: 'fr-FR',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Gratuit, sans inscription.',
      },
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.name,
        url: `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos`,
      },
      provider: {
        '@type': 'Organization',
        name: "OFC Création d'Entreprise",
        url: SITE_CONFIG.url,
      },
    },
    {
      '@type': 'LearningResource',
      '@id': `${CANONICAL}#lexique-learning-resource`,
      name: 'Lexique BTP gratuit — vocabulaire chantier et marchés publics',
      url: RESSOURCES_LEXIQUE.url,
      description: RESSOURCES_LEXIQUE.schemaDescription,
      learningResourceType: 'Interactive Resource',
      educationalLevel: 'beginner',
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.name,
        url: `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos`,
      },
      provider: {
        '@type': 'Organization',
        name: "OFC Création d'Entreprise",
        url: SITE_CONFIG.url,
      },
    },
  ],
};

export default function RessourcesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-ressources-collection" schema={collectionJsonLd} />

      <RessourcesHero />

      <RessourcesThematicHub />

      <RessourcesLexiqueSection />

      <RessourcesGuidesSection />

      <section id="tutoriels-pdf" className="scroll-mt-28 bg-[#F2F2F2] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-2 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Tutoriels PDF par thème</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Parcours pas à pas signés OFC — lis en ligne ou télécharge le PDF directement.
            </p>
          </div>

          <RessourcesTutosNav />

          <div className="mt-6 md:mt-8">
            <TutosGroupedByCategory tutos={TUTOS} badgeMode="offert" />
          </div>
        </div>
      </section>

      <section
        id="aller-plus-loin"
        className="scroll-mt-28 border-t border-slate-200 bg-gradient-to-br from-[#377CF3] to-[#2d66d6] py-14 text-white md:py-16"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
            <CalendarCheck size={14} aria-hidden />
            Prochaine étape
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">Envie d&apos;aller plus loin ?</h2>
          <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
            Les tutos t&apos;ont mis le pied à l&apos;étrier. Pour passer au niveau supérieur — skill construit sur ta
            vraie entreprise, équipe formée — découvre les programmes catalogue, financement possible selon éligibilité
            (Constructys) / OPCO.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={LINKS.prendreRdv}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[0.95rem] font-semibold text-[#377CF3] shadow-lg transition hover:bg-[#F2F2F2]"
            >
              Prendre un rendez-vous découverte
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href={LINKS.diagnostic}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-3 text-[0.95rem] font-semibold text-white transition hover:bg-white/10"
            >
              Diagnostic IA BTP offert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
