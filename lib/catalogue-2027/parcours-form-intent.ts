/** Intention du formulaire contact sur une fiche ou le hub parcours métiers. */
export type ParcoursFormIntent = 'programme' | 'devis';

export const PARCOURS_FORM_INTENT_OBJET: Record<
  ParcoursFormIntent,
  'choix-formation' | 'devis'
> = {
  programme: 'choix-formation',
  devis: 'devis',
};
