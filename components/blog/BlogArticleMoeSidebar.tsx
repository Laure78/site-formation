import Link from 'next/link';
import { TableOfContents, type TocEntry } from '@/components/blog/TableOfContents';
import { LINKS } from '@/lib/internal-links';

type Props = {
  toc: TocEntry[];
};

/** Colonne gauche : sommaire (non sticky) + encart formation MOE. */
export function BlogArticleMoeSidebar({ toc }: Props) {
  return (
    <div className="mb-10 flex w-full flex-col gap-6 lg:mb-0 lg:w-[260px] lg:shrink-0">
      <TableOfContents items={toc} className="rounded-2xl border-0" />
      <aside
        className="rounded-2xl bg-[#377CF3] p-5 text-white shadow-sm"
        aria-labelledby="sidebar-formation-moe"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Formation</p>
        <h2 id="sidebar-formation-moe" className="mt-2 font-display text-lg font-bold leading-snug">
          L&apos;IA au service des maîtres d&apos;œuvre
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/90">4 h · présentiel en Île-de-France</p>
        <Link
          href={LINKS.formationIaMaitriseOeuvre}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#377CF3] hover:bg-slate-50"
        >
          En savoir plus
        </Link>
      </aside>
    </div>
  );
}
