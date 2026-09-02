/**
 * Réexport affichage indicateurs — évite les imports circulaires avec `lib/constants.ts`.
 */
export {
  formatDateMiseAJourIndicateurs,
  formatNoteSatisfactionAffichageComplet,
  formatNoteSatisfactionSur5,
  formatPeriodeReferenceAffichage,
  formatVolumeProsFormesBtpLibelle,
  INDICATEUR_NON_PUBLIE_LIBELLE,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
