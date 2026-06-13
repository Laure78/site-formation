import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { TUTOS } from '@/lib/tutos';
import { TutosGroupedByCategory } from '@/components/ressources/TutosGroupedByCategory';
import { RessourcesThematicHub } from '@/components/ressources/RessourcesThematicHub';
import { RessourcesHero } from '@/components/ressources/RessourcesHero';
import { RessourcesTutosNav } from '@/components/ressources/RessourcesTutosNav';

const PATH = '/ressources';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

export const metadata: Metadata = createPageMetadata({
  title: 'Ressources gratuites IA BTP : tutos, guides et fiches pratiques',
  description:
    'Formation IA pour le BTP : tutos PDF gratuits Claude (DUERP, PPSPS, CR, DCE). Guides OFC Qualiopi, téléchargement libre.',
  path: PATH,
  openGraphType: 'website',
  appendAuthorSuffix: false,
});

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${CANONICAL}#collection`,
  name: 'Ressources gratuites IA BTP — Laure Olivié',
  description:
    "Tutos PDF, guides et fiches pratiques pour appliquer l'IA dans ton entreprise BTP : skills Claude métier, automatisation, veille appels d'offres, DUERP, PPSPS, mémoire technique.",
  url: CANONICAL,
  inLanguage: 'fr-FR',
  isPartOf: { '@type': 'WebSite', name: 'laureolivie.fr', url: SITE_CONFIG.url },
  mainEntity: {
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: TUTOS.length,
    itemListElement: TUTOS.map((t, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.ressources}/${t.slug}`,
      name: t.title,
    })),
  },
};

export default function RessourcesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-ressources-collection" schema={collectionJsonLd} />

      <RessourcesHero />

      <RessourcesThematicHub />

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
