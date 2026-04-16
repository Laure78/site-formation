/**
 * Option B — Témoignages JSON-LD (Review) pour le bloc « schema-home-localbusiness-reviews ».
 *
 * Renseigner uniquement des avis réels, vérifiables (ex. copie conforme d’un avis Google Business
 * avec accord, ou témoignage signé), avec identité complète. Ne pas inventer de noms ou de dates.
 *
 * Ensuite : passer `HOME_USE_VERIFIED_REVIEWS_IN_JSON_LD` à `true` dans
 * `lib/schema-home-organization.ts` (le schéma accueil utilise déjà
 * `getHomeOrganizationLocalBusinessEnrichmentJsonLdResolved()`).
 */

export type HomeVerifiedReviewForSchema = {
  /** Nom et prénom tels qu’ils peuvent être vérifiés (ex. avis public Google) */
  authorName: string;
  /** Entreprise ou fonction permettant d’identifier le client */
  companyName: string;
  /** Date de publication de l’avis (ISO 8601, ex. 2024-11-08) */
  datePublished: string;
  /** Texte de l’avis (citation fidèle) */
  reviewBody: string;
  /** Note sur 5 */
  ratingValue: number;
};

/**
 * À remplacer par 3 témoignages réels (voir commentaire en tête de fichier).
 * Tant que les valeurs ci-dessous sont des placeholders, ne pas activer l’option B en production.
 */
export const HOME_VERIFIED_REVIEWS_FOR_SCHEMA: HomeVerifiedReviewForSchema[] = [
  {
    authorName: '[À remplacer — Prénom Nom]',
    companyName: '[À remplacer — Entreprise]',
    datePublished: '2024-01-15',
    reviewBody:
      '[À remplacer — citation exacte de l’avis ou du témoignage autorisé, sans invention.]',
    ratingValue: 5,
  },
  {
    authorName: '[À remplacer — Prénom Nom]',
    companyName: '[À remplacer — Entreprise]',
    datePublished: '2024-03-22',
    reviewBody:
      '[À remplacer — citation exacte de l’avis ou du témoignage autorisé, sans invention.]',
    ratingValue: 5,
  },
  {
    authorName: '[À remplacer — Prénom Nom]',
    companyName: '[À remplacer — Entreprise]',
    datePublished: '2024-06-10',
    reviewBody:
      '[À remplacer — citation exacte de l’avis ou du témoignage autorisé, sans invention.]',
    ratingValue: 5,
  },
];
