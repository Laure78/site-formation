/**
 * Activation de la maquette formateurs (profils de démonstration).
 *
 * Règles strictes :
 * - Jamais via paramètre d’URL public.
 * - Jamais en production.
 * - Développement local uniquement (`NODE_ENV === 'development'`).
 *
 * Une balise noindex ne rend pas une prévisualisation privée.
 */
export function isFormateursDemoPreviewEnabled(): boolean {
  return process.env.NODE_ENV === 'development';
}

export const FORMATEURS_DEMO_PREVIEW_BANNER =
  'Prévisualisation — données de démonstration' as const;
