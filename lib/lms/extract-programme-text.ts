import mammoth from 'mammoth';
import { extractText, getDocumentProxy } from 'unpdf';
import type { AnalyseProgrammeErrorCode } from '@/lib/lms/analyse-programme-schema';

export const PROGRAMME_MAX_BYTES = 12 * 1024 * 1024; // 12 Mo
export const PROGRAMME_MIME = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const;

/** Seuil sous lequel un PDF est considéré comme scan / non textuel. */
const MIN_SELECTABLE_CHARS = 80;

export type ExtractProgrammeOk = {
  ok: true;
  text: string;
  format: 'pdf' | 'docx';
  pageCount?: number;
};

export type ExtractProgrammeErr = {
  ok: false;
  code: AnalyseProgrammeErrorCode;
  message?: string;
};

export type ExtractProgrammeResult = ExtractProgrammeOk | ExtractProgrammeErr;

function normalizeWhitespace(raw: string): string {
  return raw
    .replace(/\u0000/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function detectFormat(
  fileName: string,
  mimeType: string
): 'pdf' | 'docx' | null {
  const lower = fileName.toLowerCase();
  const mime = mimeType.toLowerCase();
  if (lower.endsWith('.pdf') || mime === PROGRAMME_MIME.pdf || mime === 'application/x-pdf') {
    return 'pdf';
  }
  if (
    lower.endsWith('.docx') ||
    mime === PROGRAMME_MIME.docx ||
    (mime === 'application/octet-stream' && lower.endsWith('.docx'))
  ) {
    return 'docx';
  }
  // .doc (ancien Word) non supporté
  if (lower.endsWith('.doc') || mime === 'application/msword') {
    return null;
  }
  return null;
}

async function extractPdfText(buffer: ArrayBuffer): Promise<{ text: string; pageCount: number }> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { totalPages, text } = await extractText(pdf, { mergePages: true });
  const merged = Array.isArray(text) ? text.join('\n\n') : String(text ?? '');
  return { text: normalizeWhitespace(merged), pageCount: totalPages };
}

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
  return normalizeWhitespace(result.value || '');
}

/**
 * Extrait le texte sélectionnable d’un programme PDF ou DOCX.
 * Pas d’OCR : un PDF scanné renvoie l’erreur `pdf_scanne`.
 */
export async function extractProgrammeText(
  file: File
): Promise<ExtractProgrammeResult> {
  if (!file || file.size === 0) {
    return { ok: false, code: 'fichier_vide' };
  }
  if (file.size > PROGRAMME_MAX_BYTES) {
    return {
      ok: false,
      code: 'fichier_vide',
      message: `Fichier trop volumineux (max. ${Math.round(PROGRAMME_MAX_BYTES / (1024 * 1024))} Mo).`,
    };
  }

  const format = detectFormat(file.name || '', file.type || '');
  if (!format) {
    return { ok: false, code: 'format_incompatible' };
  }

  let buffer: ArrayBuffer;
  try {
    buffer = await file.arrayBuffer();
  } catch {
    return { ok: false, code: 'fichier_vide' };
  }

  try {
    if (format === 'pdf') {
      const { text, pageCount } = await extractPdfText(buffer);
      if (text.replace(/\s/g, '').length < MIN_SELECTABLE_CHARS) {
        return { ok: false, code: 'pdf_scanne' };
      }
      return { ok: true, text, format, pageCount };
    }

    const text = await extractDocxText(buffer);
    if (text.replace(/\s/g, '').length < MIN_SELECTABLE_CHARS) {
      return { ok: false, code: 'fichier_vide' };
    }
    return { ok: true, text, format };
  } catch (err) {
    console.error('[extractProgrammeText]', err);
    return { ok: false, code: 'fichier_vide' };
  }
}

/** Tronque le texte pour le prompt IA (garde début + fin). */
export function truncateProgrammeText(text: string, maxChars = 48_000): string {
  if (text.length <= maxChars) return text;
  const head = Math.floor(maxChars * 0.7);
  const tail = maxChars - head - 80;
  return `${text.slice(0, head)}\n\n[… document tronqué …]\n\n${text.slice(-tail)}`;
}
