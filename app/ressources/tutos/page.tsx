import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { TUTOS, TUTO_CATEGORY_META, TUTO_CATEGORY_ORDER } from '@/lib/tutos';
import { TutosGroupedByCategory } from '@/components/ressources/TutosGroupedByCategory';

const PATH = LINKS.ressourcesTutos;
const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${PATH}`;

function tutoPageHref(slug: string): string {
  return `${LINKS.ressources}/${slug}`;
}

function pdfHref(pdfFile: string): string {
  return `${LINKS.ressources}/pdf/${pdfFile}`;
}

export const metadata: Metadata = createPageMetadata({
  title: 'Tutos PDF IA BTP gratuits — Claude & DCE',
  description:
    'Tutos PDF Claude & ChatGPT BTP : mémoire technique, analyse DCE, DOE, DUERP, PPSPS, chantier — gratuit. Formation IA appliquée au bâtiment — Laure Olivié.',
  path: PATH,
  openGraphType: 'website',
  appendAuthorSuffix: false,
});

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${CANONICAL}#collection`,
  name: 'Tutos PDF gratuits IA BTP — Laure Olivié',
  description:
    'Index de tous les tutoriels PDF Claude et IA pour le BTP : appels d\'offres, chantier, prévention, mémoire technique, veille DCE.',
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
      url: `${BASE}${tutoPageHref(t.slug)}`,
      name: t.title,
    })),
  },
};

export default function RessourcesTutosIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-tutos-index-collection" schema={collectionJsonLd} />

      <section className="border-b border-slate-200 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
                Index des parcours gratuits · {TUTOS.length} tutos
              </p>
              <h1 className="mt-1.5 font-display text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                Tous les tutos PDF IA BTP (Claude et ChatGPT)
              </h1>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                Page web ou PDF direct — sans inscription.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 text-sm">
              <Link
                href={LINKS.ressources}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:border-[#377CF3] hover:text-[#377CF3]"
              >
                <ArrowRight size={14} className="rotate-180" aria-hidden />
                Hub ressources
              </Link>
              <Link
                href={LINKS.financement}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:border-[#377CF3] hover:text-[#377CF3]"
              >
                Financement
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="liste-tutos" className="scroll-mt-24 py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="sr-only">
            Liste des {TUTOS.length} tutoriels répartis en {TUTO_CATEGORY_ORDER.length} rubriques
          </h2>
          <nav
            aria-label="Accès rapide aux rubriques de tutos"
            className="mb-6 flex flex-wrap gap-2"
          >
            {TUTO_CATEGORY_ORDER.map((id) => {
              const meta = TUTO_CATEGORY_META[id];
              const count = TUTOS.filter((t) => t.category === id).length;
              if (count === 0) return null;
              return (
                <a
                  key={id}
                  href={`#${meta.sectionId}`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:border-[#377CF3] hover:text-[#377CF3] md:text-sm"
                >
                  {meta.pillLabel}
                  <span className="ml-1 text-slate-400">({count})</span>
                </a>
              );
            })}
          </nav>
          <TutosGroupedByCategory
            tutos={TUTOS}
            badgeMode="indexed"
            readLinkLabel="Ouvrir la page du tuto"
            compact
          />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-slate-700">
            Ces tutos complètent une{' '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
              formation IA pour les pros du BTP Qualiopi — présentiel uniquement · Île-de-France uniquement
            </Link>
            — financement possible selon éligibilité (OPCO Constructys) selon éligibilité.
          </p>
        </div>
      </section>
    </div>
  );
}
