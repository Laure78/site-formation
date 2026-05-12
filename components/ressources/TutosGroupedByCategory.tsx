import Link from 'next/link';
import { ArrowRight, Clock, Download } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import type { TutoData } from '@/lib/tutos/types';
import { TUTO_CATEGORY_META, TUTO_CATEGORY_ORDER } from '@/lib/tutos/types';

type BadgeMode = 'offert' | 'indexed';

function badgeForTuto(mode: BadgeMode, tuto: TutoData, indexInCat: number, totalInCat: number): string {
  if (mode === 'offert') {
    return `${tuto.totalTimeMinutes} min · Tuto offert`;
  }
  return `${tuto.totalTimeMinutes} min · ${indexInCat + 1}/${totalInCat} dans cette rubrique`;
}

function TutoCard({
  tuto,
  badgeLine,
  readLinkLabel,
}: {
  tuto: TutoData;
  badgeLine: string;
  readLinkLabel: string;
}) {
  const tutoUrl = `${LINKS.ressources}/${tuto.slug}`;
  const pdfUrl = `${LINKS.ressources}/pdf/${tuto.pdfFile}`;

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
        <Clock size={14} aria-hidden />
        {badgeLine}
      </div>
      <h3 className="mt-3 font-display text-xl font-bold leading-tight text-slate-900">
        <Link
          href={tutoUrl}
          className="bg-gradient-to-r from-[#377CF3] to-[#377CF3] bg-[length:0_2px] bg-bottom bg-no-repeat transition-[background-size] group-hover:bg-[length:100%_2px]"
        >
          {tuto.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{tuto.cardSummary}</p>
      <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
        <Link
          href={tutoUrl}
          className="inline-flex items-center justify-between gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6]"
        >
          {readLinkLabel}
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
}

/** Grille des tutos groupée par rubrique (hub `/ressources` et index `/ressources/tutos`). */
export function TutosGroupedByCategory({
  tutos,
  badgeMode,
  readLinkLabel = 'Lire le tuto',
}: {
  tutos: ReadonlyArray<TutoData>;
  badgeMode: BadgeMode;
  /** Libellé du bouton principal (page tutos vs hub ressources). */
  readLinkLabel?: string;
}) {
  return (
    <div className="space-y-16 md:space-y-20">
      {TUTO_CATEGORY_ORDER.map((catId) => {
        const meta = TUTO_CATEGORY_META[catId];
        const items = tutos.filter((t) => t.category === catId);
        if (items.length === 0) return null;

        return (
          <section
            key={catId}
            id={meta.sectionId}
            className="scroll-mt-28"
            aria-labelledby={`${meta.sectionId}-heading`}
          >
            <div className="mb-8 max-w-3xl border-b border-slate-200 pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rubrique</p>
              <h2
                id={`${meta.sectionId}-heading`}
                className="mt-2 font-display text-2xl font-bold text-slate-900 md:text-3xl"
              >
                {meta.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{meta.description}</p>
              <p className="mt-3 text-xs text-slate-500">
                {items.length} tuto{items.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tuto, indexInCat) => (
                <TutoCard
                  key={tuto.slug}
                  tuto={tuto}
                  badgeLine={badgeForTuto(badgeMode, tuto, indexInCat, items.length)}
                  readLinkLabel={readLinkLabel}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
