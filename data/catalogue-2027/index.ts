export * from './types';
export * from './tarifs';
export * from './domaines';
export * from './modules';
export * from './parcours';
export * from './metiers';
export * from './mapping-legacy';
export * from './sous-domaines-ia-chantier';

export const CATALOGUE_2027_POSITIONNEMENT = {
  marque: 'Laure Olivié',
  introductionMarque:
    'Laure Olivié accompagne les PME du bâtiment et des travaux publics en Île-de-France dans le développement des compétences de leurs équipes : direction, commercial, conduite de travaux, encadrement et gestion. L’intelligence artificielle est intégrée aux modules lorsque son usage répond au besoin métier.',
  h1: 'Formations et parcours métiers BTP en Île-de-France',
  intro:
    'Formez chaque métier de votre PME. Parcours progressifs ou modules ciblés — dont organisation de chantier et prévention avec l’IA (ChatGPT, Claude), en présentiel Île-de-France.',
  ctaParcours: 'Trouver mon parcours',
  ctaEquipe: 'Former mon équipe',
} as const;

export const CATALOGUE_2027_INFOS_PRATIQUES = {
  modalite: 'Présentiel en Île-de-France',
  interLieu: 'Inter à Guyancourt ou dans les locaux d’un partenaire',
  intraLieu: 'Intra dans les locaux de l’entreprise',
  effectifHabituel: '6 à 12 participants',
  effectifNum04: '4 à 8 participants (NUM-04)',
  effectifIntraMin: 'Intra à partir de 4 participants',
  delaiMinimum: 'Délai minimum annoncé : 15 jours',
  positionnement: 'Positionnement et évaluation des acquis',
  attestations: 'Attestation de fin de formation et certificat de réalisation',
  financement:
    'Une prise en charge OPCO peut être étudiée selon votre situation et les critères du financeur.',
  subrogation:
    'Absence de subrogation : l’entreprise règle l’organisme puis demande le remboursement selon l’accord de son financeur. Le remboursement n’est pas garanti.',
  intraTarif: 'Intraentreprise et plan de formation : sur devis',
  pasCpf: 'Ces formations ne sont pas éligibles au CPF.',
} as const;
