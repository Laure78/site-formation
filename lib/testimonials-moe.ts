/**
 * Avis cabinets MOE — source vide tant qu’aucun retour n’est validé pour publication.
 * Ne pas inventer de témoignages.
 */
export type MoeCabinetTestimonial = {
  id: string;
  /** Raison sociale ou libellé anonymisé validé. */
  organization: string;
  quote: string;
  role?: string;
};

export const TESTIMONIALS_MOE: readonly MoeCabinetTestimonial[] = [];