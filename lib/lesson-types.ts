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
