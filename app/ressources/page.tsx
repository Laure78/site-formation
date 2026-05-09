import Link from 'next/link';
import type { Metadata } from 'next';
import { Download, ArrowRight, Clock, Sparkles, BookOpen } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { TUTOS } from '@/lib/tutos';

const PATH = '/ressources';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

export const metadata: Metadata = createPageMetadata({
  title: 'Ressources gratuites IA BTP : tutos, guides et fiches pratiques',
  description:
    "Tutos PDF et guides IA pour le BTP : skills Claude (DUERP, PPSPS, mémoire technique, CR chantier...), Dispatch, veille DCE. Téléchargements gratuits par Laure Olivié.",
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
      url: `${SITE_CONFIG.url.replace(/\/$/, '')}/ressources/${t.slug}`,
      name: t.title,
    })),
  },
};

export default function RessourcesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-ressources-collection" schema={collectionJsonLd} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-16 md:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
            Tutos & Guides offerts
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
            Ressources gratuites IA BTP
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
            Tutos PDF, guides et fiches pratiques pour appliquer l&apos;IA dans ton entreprise BTP.
            Téléchargement libre, sans inscription. Tous les contenus sont signés Laure Olivié,
            formatrice IA × BTP — OFC Création d&apos;Entreprise (Qualiopi).
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link
              href={LINKS.formations}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              <Sparkles size={16} aria-hidden /> Voir les formations
            </Link>
            <Link
              href={LINKS.financement}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              Financement Constructys
            </Link>
            <Link
              href={LINKS.skillIaConducteurTravaux}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              Guide 1er Skill IA
            </Link>
            <Link
              href={LINKS.blog}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              <BookOpen size={16} aria-hidden />
              Blog formation IA BTP
            </Link>
            <Link
              href={LINKS.claudeAiBtp}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              <Sparkles size={16} aria-hidden />
              Guide Claude AI BTP
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TUTOS.map((tuto) => {
              const tutoUrl = `/ressources/${tuto.slug}`;
              const pdfUrl = `/ressources/pdf/${tuto.pdfFile}`;
              return (
                <article
                  key={tuto.slug}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                    <Clock size={14} aria-hidden />
                    {tuto.totalTimeMinutes} min · Tuto offert
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold leading-tight text-slate-900">
                    <Link
                      href={tutoUrl}
                      className="bg-gradient-to-r from-[#377CF3] to-[#377CF3] bg-[length:0_2px] bg-bottom bg-no-repeat transition-[background-size] group-hover:bg-[length:100%_2px]"
                    >
                      {tuto.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {tuto.cardSummary}
                  </p>
                  <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
                    <Link
                      href={tutoUrl}
                      className="inline-flex items-center justify-between gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6]"
                    >
                      Lire le tuto
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                    <a
                      href={pdfUrl}
                      download
                      className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#377CF3] hover:bg-[#D4E3FC]/30"
                    >
                      Télécharger le PDF
                      <Download size={16} aria-hidden />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Envie d&apos;aller plus loin ?
          </h2>
          <p className="mt-3 text-slate-700">
            Les tutos t&apos;ont mis le pied à l&apos;étrier. Pour passer au niveau supérieur — skill construit
            sur ta vraie entreprise, équipe formée — découvre les programmes Niveau 2, finançables
            Constructys / OPCO.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={LINKS.formations}
              className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-sm hover:bg-[#2d66d6]"
            >
              Voir le catalogue formations
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href={LINKS.financement}
              className="inline-flex items-center gap-2 rounded-xl border border-[#377CF3] bg-white px-6 py-3 text-[0.95rem] font-semibold text-[#377CF3] hover:bg-[#D4E3FC]/30"
            >
              Financement Constructys / OPCO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
