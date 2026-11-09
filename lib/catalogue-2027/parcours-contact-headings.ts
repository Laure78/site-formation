import type { ParcoursFormIntent } from '@/lib/catalogue-2027/parcours-form-intent';

export const PARCOURS_CONTACT_HEADINGS: Record<
  ParcoursFormIntent,
  { title: string; lead: string }
> = {
  programme: {
    title: 'Recevoir le programme',
    lead:
      'Précisez le parcours ou les modules : nous vous envoyons le programme détaillé par email après étude de votre demande (pas d’envoi automatique sans validation).',
  },
  devis: {
    title: 'Demander un devis',
    lead:
      'Précisez le parcours ou le module concerné. Pas de pièces confidentielles de chantier dans ce formulaire.',
  },
};
