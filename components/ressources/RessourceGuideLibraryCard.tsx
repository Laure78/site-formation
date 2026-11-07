'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import type { RessourceGuideEntry } from '@/lib/ressources-guides';
import { getRessourcesHubGuideCover } from '@/lib/ressources-hub-photos';
import { getPagePath, sendGa4Event, trackDownloadGuide } from '@/lib/ga4-analytics';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  guide: RessourceGuideEntry;
  variant?: 'featured' | 'compact' | 'row';
};

function fileNameFromHref(href: string): string {
  return href.split('/').pop() ?? 'fichier';
}

function formatFileLabel(guide: RessourceGuideEntry): string {
  if (guide.fileKind === 'excel') return 'Excel gratuit';
  if (guide.fileKind === 'zip') return 'ZIP gratuit';
  return 'PDF gratuit';
}

/** Carte guide — bibliothèque `#guides-pdf`. */
export function RessourceGuideLibraryCard({ guide, variant = 'compact' }: Props) {
  const cover = getRessourcesHubGuideCover(guide.href) ?? guide.thumbnail;
  const formatLabel = formatFileLabel(guide);
  const isFeatured = variant === 'featured';
  const isRow = variant === 'row';

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
    sendGa4Event(guide.fileKind === 'excel' ? 'ressource_excel_download' : 'ressource_pdf_download', {
      page_path: getPagePath(),
      guide_id: guide.href,
    });
  };

  if (isRow) {
    return (
      <article
        className={`ressources-guide-card ${OFC_CARD} flex h-full gap-3 overflow-hidden rounded-xl p-3 motion-reduce:transition-none sm:gap-4 sm:p-4`}
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#E2E8F0] sm:h-24 sm:w-24">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              className="object-cover object-center"
              sizes="96px"
              quality={75}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-1 text-center text-[10px] font-semibold text-slate-500">
              {formatLabel}
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#377CF3]">{guide.categoryLabel}</p>
          <h3 className="mt-1 font-display text-sm font-bold leading-snug text-slate-900 sm:text-base">
            <Link
              href={guide.href}
              onClick={onConsult}
              className="hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              {guide.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {guide.promise}
          </p>
          <p className="mt-2 text-[11px] font-medium text-slate-500">{formatLabel}</p>
          <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-2 sm:flex-row sm:items-center">
            <Link
              href={guide.href}
              onClick={onConsult}
              className="inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-[#377CF3] underline-offset-2 hover:underline sm:text-sm"
            >
              {guide.primaryActionLabel}
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
            <a
              href={guide.pdfHref}
              download
              onClick={onDownload}
              className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-slate-700 underline-offset-2 hover:text-[#377CF3] hover:underline sm:ml-auto sm:text-sm"
            >
              <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {guide.downloadLabel}
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`ressources-guide-card ${OFC_CARD} flex h-full flex-col overflow-hidden motion-reduce:transition-none ${
        isFeatured ? 'rounded-2xl border-t-[3px] border-t-[#377CF3]' : 'rounded-xl'
      }`}
    >
      <div className="relative aspect-video bg-[#E2E8F0]">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            className="object-cover object-[center_22%]"
            sizes={
              isFeatured
                ? '(max-width: 768px) 100vw, 33vw'
                : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            quality={75}
            loading={isFeatured ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {formatLabel} · {guide.categoryLabel}
            </p>
          </div>
        )}
        <span className="absolute left-3 top-3 max-w-[85%] rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#377CF3] shadow-sm">
          {guide.categoryLabel}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${isFeatured ? 'p-5 md:p-6' : 'p-4 md:p-5'}`}>
        {!isFeatured ? (
          <p className="text-xs font-medium leading-snug text-slate-500">{guide.audience}</p>
        ) : null}

        <h3
          className={`font-display font-bold leading-snug text-slate-900 ${
            isFeatured ? 'mt-0 text-xl md:text-[1.35rem]' : 'mt-2 text-lg'
          }`}
        >
          <Link
            href={guide.href}
            onClick={onConsult}
            className="hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {guide.title}
          </Link>
        </h3>

        <p
          className={`flex-1 leading-relaxed text-slate-600 ${
            isFeatured ? 'mt-3 text-sm md:text-base' : 'mt-2 line-clamp-3 text-sm'
          }`}
        >
          {guide.promise}
        </p>

        {isFeatured ? (
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href={guide.href}
              onClick={onConsult}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {guide.primaryActionLabel}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <a
              href={guide.pdfHref}
              download
              onClick={onDownload}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 text-sm sm:ml-auto`}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              {guide.downloadLabel}
            </a>
          </div>
        ) : (
          <>
            <p className="mt-3 text-xs font-medium text-slate-500">{formatLabel}</p>
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
              <Link
                href={guide.href}
                onClick={onConsult}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-4 py-2.5 text-sm`}
              >
                {guide.primaryActionLabel}
              </Link>
              <a
                href={guide.pdfHref}
                download
                onClick={onDownload}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                {guide.downloadLabel}
              </a>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
