import type { DomaineCatalogue } from './types';

export const DOMAINES_CATALOGUE_2027: readonly DomaineCatalogue[] = [
  {
    id: 'direction',
    numero: 1,
    titre: 'Direction et gestion de PME',
    description: 'Prix de revient, marges, trésorerie, développement commercial et déploiement de l’IA.',
  },
  {
    id: 'commercial',
    numero: 2,
    titre: 'Commercial et marchés de travaux',
    description: 'Devis, négociations, marchés publics, mémoire technique, avenants et sous-traitance.',
  },
  {
    id: 'travaux',
    numero: 3,
    titre: 'Préparation et conduite de travaux',
    description: 'Passation, planning, coûts, réunions de chantier et réception.',
  },
  {
    id: 'management',
    numero: 4,
    titre: 'Encadrement et management',
    description: 'Chef d’équipe, management de chantier, tensions et intégration.',
  },
  {
    id: 'administration',
    numero: 5,
    titre: 'Administration et RH du BTP',
    description: 'Administratif chantier, facturation électronique, recrutement et bases de la paie.',
  },
  {
    id: 'technique-qualite-prevention',
    numero: 6,
    titre: 'Technique, qualité et prévention',
    description: 'Prévention sur chantier, exigences énergétiques et non-conformités.',
  },
  {
    id: 'numerique-ia',
    numero: 7,
    titre: 'Numérique, IA et outils métier',
    description: 'Bases de l’IA, appels d’offres, Claude, applications métier, Excel, BIM et usages terrain.',
  },
] as const;
