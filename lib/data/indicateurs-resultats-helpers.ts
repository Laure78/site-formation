/**
 * Helpers d’affichage / FAQ — indicateurs Qualiopi (indicateur 2).
 * Effectif formé volontairement non publié (audit Qualiopi).
 */
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats-display';

/** Ligne FAQ / meta : note sourcée (sans effectif formé). */
export function formatProsFormesEtNoteQualiopi(): string {
  return formatNoteSatisfactionAffichageComplet();
}
