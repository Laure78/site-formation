/**
 * Fiche Google Business Profile — identifiant Places (source : redirection Maps).
 *
 * Lien de partage utilisateur : https://share.google/rKcuLq02lXEmPsdrO
 * Lien canonique site (schema) : `SCHEMA_GOOGLE_BUSINESS_PROFILE_URL` → maps.app.goo.gl/qPHKWMAceJegYWg8A
 * Lien dépôt d’avis : `SCHEMA_GOOGLE_REVIEW_SUBMIT_URL` → g.page/r/CW5GeuAB5XBVEBM/review
 * Redirection Maps (2026-03) : coordonnées 48,7759459 · 2,0158343 — cid 0x47e68551fca64273:0x5570e501e07a466e
 *
 * Le `place_id` au format ChIJ… est défini dans `GOOGLE_PLACE_ID` (jamais en dur dans le frontend).
 * Vérification : `node scripts/find-place-id.js` avec `GOOGLE_PLACES_API_KEY`.
 *
 * Prérequis Google Cloud : activer Places API (New) sur le projet lié à la clé.
 * https://console.developers.google.com/apis/api/places.googleapis.com/overview
 */
export const GOOGLE_PLACE_ID_ENV = 'GOOGLE_PLACE_ID' as const;
export const GOOGLE_PLACES_API_KEY_ENV = 'GOOGLE_PLACES_API_KEY' as const;
