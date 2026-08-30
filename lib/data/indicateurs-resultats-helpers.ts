/**
 * Helpers d'affichage / FAQ — indicateurs Qualiopi (indicateur 2).
 * Volume formé et satisfaction publiés sur le site.
 */
import {
  formatNoteSatisfactionAffichageComplet,
  formatVolumeProsFormesBtpLibelle,
} from '@/lib/data/indicateurs-resultats-display';

/** Ligne FAQ / meta : volume formé + note sourcée. */
export function formatProsFormesEtNoteQualiopi(): string {
  return `${formatVolumeProsFormesBtpLibelle()} — satisfaction ${formatNoteSatisfactionAffichageComplet()}.`;
}
