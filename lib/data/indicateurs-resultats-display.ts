/**
 * Réexport affichage indicateurs — évite les imports circulaires avec `lib/constants.ts`.
 */
export {
  formatDateMiseAJourIndicateurs,
  formatNoteSatisfactionAffichageComplet,
  formatNoteSatisfactionSur5,
  formatPeriodeReferenceAffichage,
  formatTauxPourcentFr,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
