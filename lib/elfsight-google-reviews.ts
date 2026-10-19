/**
 * Widget Elfsight « Google Reviews » — page `/avis-clients`.
 *
 * **Configuration (au choix) :**
 * 1. `.env.local` : `NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID=uuid`
 * 2. `.env.local` : coller le code Elfsight dans `NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_EMBED`
 * 3. Fichier `config/elfsight-google-reviews.embed` (copie de l’exemple `.example`)
 *
 * Le script Elfsight est chargé côté client uniquement après consentement cookies.
 */

import { normalizeElfsightAppId } from '@/lib/elfsight-extract-app-id';

/** Script plateforme Elfsight (code d’installation officiel). */
export const ELFSIGHT_PLATFORM_SCRIPT_SRC =
  'https://static.elfsight.com/platform/platform.js' as const;

const ENV_APP_ID = 'NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID';

/** Identifiant du widget Elfsight (UUID). Vide tant que le code d’intégration n’est pas configuré. */
export function getElfsightGoogleReviewsAppId(): string {
  if (typeof process === 'undefined') return '';
  return normalizeElfsightAppId(process.env[ENV_APP_ID]);
}

export function isElfsightGoogleReviewsConfigured(): boolean {
  return getElfsightGoogleReviewsAppId().length > 0;
}

/** Classe DOM attendue par Elfsight pour ce widget. */
export function getElfsightGoogleReviewsAppClassName(): string {
  const id = getElfsightGoogleReviewsAppId();
  return id ? `elfsight-app-${id}` : '';
}
