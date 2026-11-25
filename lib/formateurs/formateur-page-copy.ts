import type { FormateurProfile } from '@/lib/formateurs/types';

/** Bloc « En bref » — 2–3 phrases factuelles, citables (GEO). */
export function formateurProfileEnBref(formateur: FormateurProfile): string {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  return `${fullName} forme les professionnels du BTP pour OFC Création d’Entreprise (marque commerciale Laure Olivié), organisme certifié Qualiopi. ${formateur.intitule}. Formations IA en présentiel en Île-de-France uniquement.`;
}