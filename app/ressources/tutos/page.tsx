import Link from 'next/link';
import type { Metadata } from 'next';
import { Download, ArrowRight, Clock } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { TUTOS } from '@/lib/tutos';

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
    'Tutos PDF Claude & ChatGPT BTP : mémoire technique, analyse DCE, DOE, DUERP, PPSPS, chantier — gratuit. Formation IA BTP — Laure Olivié.',
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
                  Financement formation IA BTP
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
                  Thématiques : appels d&apos;offres, chantier (CR, retard), HSE (DUERP, PPSPS), livraison (DOE, PV réserves){' '}
                  — prompts prêts à adapter.
                </li>
                <li>
                  Même périmètre sur le{' '}
                  <Link href={LINKS.skillIaConducteurTravaux} className="font-medium text-[#377CF3] hover:underline">
                    pack PDF conducteurs de travaux
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
          <h2 className="sr-only">Liste des {TUTOS.length} tutoriels</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TUTOS.map((tuto, index) => (
              <div key={tuto.slug}>
                <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                    <Clock size={14} aria-hidden />
                    {tuto.totalTimeMinutes} min · Tutoriel {index + 1}/{TUTOS.length}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-tight text-slate-900 md:text-[1.125rem] lg:text-xl">
                    <Link
                      href={tutoPageHref(tuto.slug)}
                      className="bg-gradient-to-r from-[#377CF3] to-[#377CF3] bg-[length:0_2px] bg-bottom bg-no-repeat transition-[background-size] group-hover:bg-[length:100%_2px]"
                    >
                      {tuto.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {tuto.cardSummary}
                  </p>
                  <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
                    <Link
                      href={tutoPageHref(tuto.slug)}
                      className="inline-flex items-center justify-between gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6]"
                    >
                      Ouvrir la page du tuto
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                    <a
                      href={pdfHref(tuto.pdfFile)}
                      download
                      className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#377CF3] hover:bg-[#D4E3FC]/30"
                    >
                      Télécharger le PDF
                      <Download size={16} aria-hidden />
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-slate-700">
            Ces tutos complètent une{' '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
              formation IA BTP Qualiopi en présentiel ou visio
            </Link>
            — finançable OPCO Constructys selon éligibilité.
          </p>
        </div>
      </section>
    </div>
  );
}
