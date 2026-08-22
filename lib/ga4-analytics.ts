/**
 * GA4 — événements personnalisés laureolivie.fr
 *
 * Chargement gtag : `components/analytics/GoogleAnalytics.tsx` (next/script, afterInteractive).
 *
 * Conversions à activer dans GA4 Admin → Événements → marquer comme conversion :
 * - `cta_rdv_click` (paramètres : origin, page_path)
 * - `download_guide` (paramètres : guide_type, file_name, page_path)
 * - `blog_read_complete` (paramètres : article_slug, page_path)
 *
 * Enregistrer les paramètres personnalisés comme dimensions (Admin → Définitions personnalisées).
 */

export type DownloadGuideType =
  | 'guide_conducteur_travaux'
  | 'programme'
  | 'checklist'
  | 'guide';

type Ga4ParamValue = string | number | boolean;

function cleanParams(params: Record<string, Ga4ParamValue | undefined>): Record<string, Ga4ParamValue> {
  return Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, Ga4ParamValue] => entry[1] !== undefined),
  ) as Record<string, Ga4ParamValue>;
}

/** Envoie un événement GA4 via gtag + dataLayer (compatibilité GTM). */
export function sendGa4Event(
  eventName: string,
  params: Record<string, Ga4ParamValue | undefined> = {},
): void {
  if (typeof window === 'undefined') return;

  const payload = cleanParams(params);

  const w = window as Window & {
    dataLayer?: Record<string, Ga4ParamValue>[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, ...payload });

  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, payload);
  }
}

export function getPagePath(): string {
  if (typeof window === 'undefined') return 'unknown';
  return window.location.pathname;
}

/** Conversion — clic CTA prise de RDV (vers `/prendre-rendez-vous`). */
export function trackCtaRdvClick(origin: string, pagePath: string): void {
  sendGa4Event('cta_rdv_click', { origin, page_path: pagePath });
}

/** Conversion — téléchargement PDF guide / programme / checklist. */
export function trackDownloadGuide(params: {
  guide_type: DownloadGuideType;
  file_name: string;
  page_path?: string;
}): void {
  sendGa4Event('download_guide', {
    guide_type: params.guide_type,
    file_name: params.file_name,
    page_path: params.page_path ?? getPagePath(),
  });
}

/** Conversion — article blog lu à ≥ 90 % de scroll. */
export function trackBlogReadComplete(articleSlug: string, pagePath?: string): void {
  sendGa4Event('blog_read_complete', {
    article_slug: articleSlug,
    page_path: pagePath ?? getPagePath(),
  });
}

/** Infère le type de ressource à partir de l’URL / nom de fichier. */
export function classifyPdfDownload(
  href: string,
  downloadAttr?: string | null,
): { guide_type: DownloadGuideType; file_name: string } {
  const fileName = (downloadAttr || href.split('/').pop() || 'unknown').split('?')[0];
  const haystack = `${href} ${fileName}`.toLowerCase();

  if (
    haystack.includes('pack_cdt') ||
    haystack.includes('conducteur') ||
    haystack.includes('guide-conducteur')
  ) {
    return { guide_type: 'guide_conducteur_travaux', file_name: fileName };
  }

  if (haystack.includes('checklist') || haystack.includes('prompts-chatgpt')) {
    return { guide_type: 'checklist', file_name: fileName };
  }

  if (
    haystack.includes('programme') ||
    haystack.includes('program_') ||
    haystack.includes('niv-') ||
    haystack.includes('support_complementaire')
  ) {
    return { guide_type: 'programme', file_name: fileName };
  }

  return { guide_type: 'guide', file_name: fileName };
}
