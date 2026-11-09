import type { ParcoursId } from '@/data/catalogue-2027';

/**
 * PDF programme parcours métier complet — uniquement si le fichier est publié et à jour.
 * Aucun PDF consolidé par parcours au catalogue 2027 (demande via formulaire).
 */
export function getParcoursProgrammePdfHref(_parcoursId: ParcoursId): string | null {
  return null;
}
