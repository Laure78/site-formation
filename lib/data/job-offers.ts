/**
 * Offres d’emploi publiées sur laureolivie.fr — source unique.
 * N’ajouter que des postes réellement ouverts (`published: true`).
 */

export type JobOffer = {
  id: string;
  slug: string;
  title: string;
  contractType: string;
  location: string;
  missionSummary: string;
  /** Corps détaillé (page `/emplois/[slug]`) — texte brut ou paragraphes séparés par \n\n */
  description?: string;
  published: boolean;
};

/** Offres salariées — tableau vide tant qu’aucun recrutement n’est actif. */
export const JOB_OFFERS: readonly JobOffer[] = [];

export function getPublishedJobOffers(): readonly JobOffer[] {
  return JOB_OFFERS.filter((o) => o.published);
}

export function getJobOfferBySlug(slug: string): JobOffer | undefined {
  return JOB_OFFERS.find((o) => o.slug === slug && o.published);
}
