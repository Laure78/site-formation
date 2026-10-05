/**
 * Widget avis Google gratuit (Trustindex) — alternative sans Places API / sans facturation Google.
 *
 * Configurer `NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID` avec l’ID fourni par Trustindex
 * (extrait du code d’intégration : loader.js?XXXX).
 */
export const TRUSTINDEX_WIDGET_ID_ENV = 'NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID' as const;

export function getTrustindexWidgetId(): string | null {
  const id = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID?.trim();
  return id && id.length > 0 ? id : null;
}

export function hasTrustindexWidget(): boolean {
  return getTrustindexWidgetId() !== null;
}

export function getTrustindexLoaderSrc(widgetId: string): string {
  return `https://cdn.trustindex.io/loader.js?${encodeURIComponent(widgetId)}`;
}
