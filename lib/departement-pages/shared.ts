/**
 * Contenus partagés — identiques sur toutes les pages département.
 * Ne pas reformuler par département (réutilisation assumée, pas de paraphrase mécanique).
 */
import type { DepartementTemoignage } from '@/lib/departement-pages/types';

export const DEPARTEMENT_CAS_USAGE_STANDARD: readonly string[] = [
  'Structurer devis et relances à partir de notes terrain — chiffrage définitif validé en interne.',
  'Accélérer comptes rendus et synthèses hebdomadaires de chantier — relecture avant envoi MOE/MOA.',
  'Préparer brouillons de mémoires techniques et réponses aux marchés — exigences CCTP listées.',
  'Rédiger courriers récurrents (fournisseurs, sous-traitants) avec un ton homogène.',
  'Reformuler tableaux de suivi et plannings à partir de vos données — sans données perso non anonymisées.',
];

/**
 * Témoignages région IDF — jeu unique réutilisé sur les 8 pages département.
 * Attributions volontairement non géolocalisées (pas de ville / département inventé).
 */
export const TEMOIGNAGES_REGION_IDF: readonly DepartementTemoignage[] = [
  {
    text: `On cherchait un format court sans jargon tech. En quatre heures, on a posé des prompts sur nos vrais modèles de devis : le gain a été visible dès la semaine suivante sur les relances clients.`,
    attribution: `Chef d'entreprise — PME BTP, Île-de-France`,
  },
  {
    text: `Nos conducteurs de travaux traînaient les comptes rendus. La méthode dictée → structuration avec relecture humaine nous a permis de fermer le sujet sans recruter.`,
    attribution: `Conducteur de travaux — PME BTP, Île-de-France`,
  },
  {
    text: `Le côté financement Constructys nous a rassurés : on a eu les éléments pour monter le dossier avec notre référent OPCO, sans refaire le monde.`,
    attribution: `Responsable administratif — PME BTP, Île-de-France`,
  },
];

/** @deprecated Alias — préférer `TEMOIGNAGES_REGION_IDF`. */
export const DEPARTEMENT_TEMOIGNAGES_PARTAGES = TEMOIGNAGES_REGION_IDF;

export const DEPARTEMENT_FORMATRICE_GUYANCOURT = {
  title: 'Formatrice basée à Guyancourt (78)',
  body: `Laure Olivié (OFC Création d'Entreprise) forme les équipes BTP à ChatGPT et Claude AI depuis Guyancourt. Sessions de 4 h en présentiel uniquement, en Île-de-France uniquement — intra dans vos locaux ou inter en salle. Déplacements et logistique sont précisés au devis, après un échange découverte de 30 minutes.`,
} as const;
