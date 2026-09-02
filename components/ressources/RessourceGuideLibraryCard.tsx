'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import type { RessourceGuideEntry } from '@/lib/ressources-guides';
import { getPagePath, sendGa4Event, trackDownloadGuide } from '@/lib/ga4-analytics';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  guide: RessourceGuideEntry;
};

function fileNameFromHref(href: string): string {
  return href.split('/').pop() ?? 'fichier';
}

/** Carte guide — bibliothèque `#guides-pdf`. */
export function RessourceGuideLibraryCard({ guide }: Props) {
  const isExcel = guide.fileKind === 'excel';
  const formatLabel = isExcel
    ? 'Excel gratuit · Sans inscription'
    : 'PDF gratuit · Sans inscription';

  const onConsult = () => {
    sendGa4Event('ressource_guide_consult', {
      page_path: getPagePath(),
      guide_id: guide.href,
    });
  };

  const onDownload = () => {
    trackDownloadGuide({
      guide_type: 'guide',
      file_name: fileNameFromHref(guide.pdfHref),
    });
    sendGa4Event(isExcel ? 'ressource_excel_download' : 'ressource_pdf_download', {
      page_path: getPagePath(),
      guide_id: guide.href,
    });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-[#F2F2F2]">
        {guide.thumbnail ? (
          <Image
            src={guide.thumbnail.src}
            alt=""
            width={guide.thumbnail.width}
            height={guide.thumbnail.height}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={70}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- logo SVG léger décoratif */}
            <img src="/logo-lo.svg" alt="" width={48} height={48} className="opacity-80" />
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {isExcel ? 'Excel' : 'PDF'} · {guide.categoryLabel}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="w-fit rounded-full bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#377CF3]">
          {guide.categoryLabel}
        </span>

        <p className="mt-3 text-xs font-medium leading-snug text-slate-500">{guide.audience}</p>

        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900 md:text-xl">
          <Link href={guide.href} onClick={onConsult} className="hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]">
            {guide.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{guide.promise}</p>

        <ul className="mt-4 space-y-1.5" aria-label="Contenu du guide">
          {guide.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs font-medium text-slate-500">{formatLabel}</p>

        <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4">
          <Link
            href={guide.href}
            onClick={onConsult}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm`}
          >
            {guide.primaryActionLabel}
          </Link>
          <a
            href={guide.pdfHref}
            download
            onClick={onDownload}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-4 py-2.5 text-sm`}
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            {guide.downloadLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
