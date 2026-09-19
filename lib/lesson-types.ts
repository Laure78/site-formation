/** Types de leçon LMS (alignés sur la contrainte SQL `lessons_type_check`). */
export const LESSON_TYPES = [
  { value: 'video', label: 'Vidéo YouTube ou autre' },
  { value: 'texte', label: 'Texte' },
  { value: 'pdf', label: 'Slides PDF' },
  { value: 'lien', label: 'Lien Excel / Google Sheets / Docs' },
  { value: 'quiz', label: 'Quiz' },
] as const;

export type LessonTypeValue = (typeof LESSON_TYPES)[number]['value'];

export function lessonUsesContentUrl(type: LessonTypeValue): boolean {
  return type === 'video' || type === 'pdf' || type === 'lien';
}

export function isSpreadsheetUrl(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes('docs.google.com/spreadsheets') ||
    u.includes('excel.office.com') ||
    u.includes('onedrive.live.com') ||
    u.includes('sharepoint.com') ||
    u.endsWith('.xlsx') ||
    u.endsWith('.xls') ||
    u.endsWith('.csv')
  );
}

export function isGoogleDocsUrl(url: string): boolean {
  return url.toLowerCase().includes('docs.google.com/document');
}

export function lienButtonLabel(url: string): string {
  if (isSpreadsheetUrl(url)) return 'Ouvrir le tableau';
  if (isGoogleDocsUrl(url)) return 'Ouvrir le document';
  return 'Ouvrir le lien';
}

/** Ressource Excel / Sheets (fichier local ou lien Google). */
export function isSpreadsheetResource(opts: {
  fileUrl?: string | null;
  fileType?: string | null;
  title?: string | null;
}): boolean {
  const t = (opts.fileType ?? '').toLowerCase();
  const u = (opts.fileUrl ?? '').toLowerCase();
  const title = (opts.title ?? '').toLowerCase();
  if (t === 'xlsx' || t === 'xls' || t === 'csv') return true;
  if (u.endsWith('.xlsx') || u.endsWith('.xls') || u.endsWith('.csv')) return true;
  if (isSpreadsheetUrl(opts.fileUrl ?? '')) return true;
  if (title.includes('.xlsx') || title.includes('.xls') || title.includes('base de prompt')) {
    return Boolean(opts.fileUrl);
  }
  return false;
}

/**
 * URL de téléchargement Excel :
 * - fichier .xlsx local / CDN → tel quel
 * - Google Sheets → export xlsx
 */
export function spreadsheetDownloadUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  try {
    if (trimmed.includes('docs.google.com/spreadsheets')) {
      const u = new URL(trimmed);
      const parts = u.pathname.split('/').filter(Boolean);
      const dIndex = parts.indexOf('d');
      const id = dIndex >= 0 ? parts[dIndex + 1] : null;
      if (id) {
        return `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`;
      }
    }
  } catch {
    /* ignore */
  }
  return trimmed;
}

