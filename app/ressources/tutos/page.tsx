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
  title: 'Tutos PDF IA BTP gratuits : Claude, mémoire technique, DCE',
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
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 md:pb-14 md:pt-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="min-w-0">
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
                Index des parcours gratuits
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
                Tous les tutos PDF IA BTP (Claude et ChatGPT)
              </h1>
              <p className="mt-4 max-w-none text-lg leading-relaxed text-slate-700">
                Clique sur un tuto pour ouvrir la page web complète (étapes + FAQ) ou télécharge
                directement le PDF. Sans inscription — OFC Création d&apos;Entreprise · Qualiopi.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <Link
                  href={LINKS.ressources}
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:border-[#377CF3] hover:text-[#377CF3]"
                >
                  <ArrowRight size={16} className="rotate-180" aria-hidden />
                  Hub ressources général
                </Link>
                <Link
                  href={LINKS.financement}
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:border-[#377CF3] hover:text-[#377CF3]"
                >
                  Financement formation IA pour le BTP
                </Link>
              </div>
            </div>
            <aside
              aria-label="Synthèse de l&apos;index tutos"
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm lg:sticky lg:top-28 xl:top-32"
            >
              <p className="text-sm font-semibold text-[#377CF3]">En un coup d&apos;œil</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                <li>
                  <strong className="text-slate-900">{TUTOS.length} parcours</strong> avec page dédiée et fichier PDF
                  aligné dessus.
                </li>
                <li>
                  Quatre rubriques : marchés publics, chantier &amp; livrables, prévention &amp; conformité,
                  productivité — repères aussi en jetons sous le titre ci-dessous.
                </li>
                <li>
                  Même périmètre sur le{' '}
                  <Link href={LINKS.skillIaConducteurTravaux} className="font-medium text-[#377CF3] hover:underline">
                    guide PDF conducteurs de travaux
                  </Link>
                  {' '}
                  (ressource compilée séparément).
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="sr-only">
            Liste des {TUTOS.length} tutoriels répartis en {TUTO_CATEGORY_ORDER.length} rubriques
          </h2>
          <nav
            aria-label="Accès rapide aux rubriques de tutos"
            className="mb-14 flex flex-wrap gap-2"
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
          />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-slate-700">
            Ces tutos complètent une{' '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
              formation IA pour les pro du BTP Qualiopi en présentiel ou visio
            </Link>
            — financement possible selon éligibilité (OPCO Constructys) selon éligibilité.
          </p>
        </div>
      </section>
    </div>
  );
}
