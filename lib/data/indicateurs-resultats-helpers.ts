/**
 * Helpers d'affichage / FAQ — indicateurs Qualiopi (indicateur 2).
 * Note de satisfaction uniquement (effectif formé non publié — périmètre ambigu).
 */
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats-display';

/** Ligne FAQ / meta : note sourcée (sans volume formé). */
export function formatProsFormesEtNoteQualiopi(): string {
  return `Satisfaction ${formatNoteSatisfactionAffichageComplet()}.`;
}
