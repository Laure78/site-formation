/**
 * Widget Elfsight « Google Reviews » — page `/avis-clients`.
 *
 * **Configuration :** dans le tableau de bord Elfsight, copiez l’identifiant du widget
 * (partie UUID de la classe `elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
 * et renseignez-le dans `.env.local` :
 *
 * ```env
 * NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * ```
 *
 * Le script officiel Elfsight est chargé côté client uniquement après consentement cookies
 * (voir `ElfsightGoogleReviewsWidget`). Ne jamais inventer d’identifiant ni simuler des avis.
 */

/** Script plateforme Elfsight (code d’installation officiel). */
export const ELFSIGHT_PLATFORM_SCRIPT_SRC =
  'https://static.elfsight.com/platform/platform.js' as const;

const ENV_APP_ID = 'NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID';

/**
 * Identifiant du widget Elfsight (UUID). Vide tant que le code d’intégration n’est pas configuré.
 */
export function getElfsightGoogleReviewsAppId(): string {
  const raw =
    typeof process !== 'undefined' ? process.env[ENV_APP_ID]?.trim() : undefined;
  if (!raw) return '';
  return raw.replace(/^elfsight-app-/, '');
}

export function isElfsightGoogleReviewsConfigured(): boolean {
  return getElfsightGoogleReviewsAppId().length > 0;
}

/** Classe DOM attendue par Elfsight pour ce widget. */
export function getElfsightGoogleReviewsAppClassName(): string {
  const id = getElfsightGoogleReviewsAppId();
  return id ? `elfsight-app-${id}` : '';
}
