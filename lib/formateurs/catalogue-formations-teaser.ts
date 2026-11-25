/**
 * Teaser formateurs — page /formations uniquement (spécialité courte, sans dupliquer le hub).
 */
import { getFormateursHubProfiles } from '@/lib/formateurs/get-formateurs';
import type { FormateurId, FormateurProfile } from '@/lib/formateurs/types';

/** Spécialités courtes — alignées sur /formateurs (specialites / parcours), formulées pour le catalogue. */
export const FORMATEUR_CATALOGUE_TEASER_SPECIALTY: Record<FormateurId, string> = {
  'laure-olivie': 'Intelligence artificielle appliquée au BTP.',
  'thomas-garnier': 'Devis et mémoires techniques.',
  'marc-delcourt': 'Gestion, prix de revient et trésorerie.',
  'christophe-delgery': 'IA appliquée au BTP — appels d’offres, conformité et chantier.',
  'manuel-gomez': 'Intelligence artificielle appliquée aux métiers du bâtiment et des travaux publics.',
};

export function getFormateursCatalogueTeaserProfiles(): readonly FormateurProfile[] {
  return getFormateursHubProfiles();
}

export function formateurCatalogueTeaserSpecialty(formateur: FormateurProfile): string {
  return (
    FORMATEUR_CATALOGUE_TEASER_SPECIALTY[formateur.id] ??
    formateur.specialites[0] ??
    formateur.intitule
  );
}

/** Alt portrait — le nom est déjà dans le H3 adjacent. */
export function formateurCatalogueTeaserPortraitAlt(formateur: FormateurProfile): string {
  if (formateur.portrait.kind === 'initials') {
    return formateur.portrait.label;
  }
  return `Portrait — ${formateur.prenom} ${formateur.nom}`;
}
