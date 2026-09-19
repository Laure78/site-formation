'use client';

import {
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FileType,
  Link2,
  Video,
} from 'lucide-react';
import { YouTubeOrVideoEmbed } from '@/components/YouTubeOrVideoEmbed';
import {
  isGoogleDocsUrl,
  isSpreadsheetUrl,
  lienButtonLabel,
  type LessonTypeValue,
} from '@/lib/lesson-types';

function fileNameFromUrl(url: string): string {
  try {
    const path = new URL(url, 'https://example.com').pathname;
    const last = path.split('/').filter(Boolean).pop();
    if (last) return decodeURIComponent(last);
  } catch {
    /* ignore */
  }
  return url.length > 48 ? `${url.slice(0, 45)}…` : url;
}

/** Transforme une URL Google Docs/Sheets partageable en URL visionneuse embarquable. */
export function toGoogleEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('docs.google.com')) return null;
    const parts = u.pathname.split('/').filter(Boolean);
    // docs.google.com/spreadsheets/d/ID/... ou document/d/ID/...
    const dIndex = parts.indexOf('d');
    if (dIndex < 0 || !parts[dIndex + 1]) return null;
    const id = parts[dIndex + 1];
    if (parts[0] === 'spreadsheets') {
      return `https://docs.google.com/spreadsheets/d/${id}/preview`;
    }
    if (parts[0] === 'document') {
      return `https://docs.google.com/document/d/${id}/preview`;
    }
    return null;
  } catch {
    return null;
  }
}

function isPdfUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return lower.includes('.pdf') || lower.includes('application/pdf');
}

type Props = {
  type: LessonTypeValue;
  contentUrl?: string | null;
  contentText?: string | null;
  title?: string;
};

/**
 * Carte fichier + visionneuse (PDF iframe, Google Docs/Sheets, vidéo).
 * Utilisée côté admin (aperçu) et réutilisable ailleurs.
 */
export function LessonMediaPreview({
  type,
  contentUrl,
  contentText,
  title = 'Ressource',
}: Props) {
  const url = contentUrl?.trim() || '';

  if (type === 'texte') {
    if (!contentText?.trim()) {
      return (
        <EmptyState message="Aucun contenu texte pour cette leçon." />
      );
    }
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
        {contentText}
      </div>
    );
  }

  if (type === 'quiz') {
    return <EmptyState message="Quiz — pas de fichier à prévisualiser." />;
  }

  if (!url) {
    return (
      <EmptyState
        message={
          type === 'pdf'
            ? 'Aucun PDF configuré.'
            : type === 'video'
              ? 'Aucune vidéo configurée.'
              : 'Aucun lien configuré.'
        }
      />
    );
  }

  const googleEmbed = toGoogleEmbedUrl(url);
  const showPdfViewer = type === 'pdf' || (type === 'lien' && isPdfUrl(url));
  const Icon =
    type === 'video'
      ? Video
      : type === 'pdf' || isPdfUrl(url)
        ? FileType
        : isSpreadsheetUrl(url)
          ? FileSpreadsheet
          : isGoogleDocsUrl(url)
            ? FileText
            : Link2;

  const kindLabel =
    type === 'video'
      ? 'Vidéo'
      : showPdfViewer
        ? 'PDF'
        : isSpreadsheetUrl(url)
          ? 'Tableau'
          : isGoogleDocsUrl(url)
            ? 'Document'
            : 'Lien';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Carte fichier */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F766E] shadow-sm ring-1 ring-slate-200">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {fileNameFromUrl(url)}
          </p>
          <p className="text-xs text-slate-500">
            {kindLabel}
            {title ? ` · ${title}` : ''}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ExternalLink size={16} strokeWidth={1.5} />
          {type === 'lien' ? lienButtonLabel(url) : 'Ouvrir'}
        </a>
      </div>

      {/* Visionneuse */}
      {type === 'video' ? (
        <div className="bg-black p-2 sm:p-4">
          <YouTubeOrVideoEmbed url={url} />
        </div>
      ) : showPdfViewer ? (
        <>
          <iframe
            src={`${url}#view=FitH`}
            title={`Aperçu PDF — ${title}`}
            className="h-[min(70vh,720px)] w-full min-h-[360px] border-0 bg-white"
          />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-[#0F766E] hover:bg-slate-100"
          >
            Ouvrir le PDF dans un nouvel onglet
          </a>
        </>
      ) : googleEmbed ? (
        <>
          <iframe
            src={googleEmbed}
            title={`Aperçu — ${title}`}
            className="h-[min(70vh,720px)] w-full min-h-[360px] border-0 bg-white"
            allow="fullscreen"
          />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-[#0F766E] hover:bg-slate-100"
          >
            Ouvrir dans Google
          </a>
        </>
      ) : (
        <div className="px-5 py-8 text-center text-sm text-slate-600">
          <p>Aperçu embarqué indisponible pour ce type de lien.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-[#0F766E] hover:underline"
          >
            <ExternalLink size={16} strokeWidth={1.5} />
            {lienButtonLabel(url)}
          </a>
          {contentText?.trim() ? (
            <p className="mt-4 whitespace-pre-wrap text-left text-slate-600">
              {contentText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}
