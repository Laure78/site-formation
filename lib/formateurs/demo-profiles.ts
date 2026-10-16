/**
 * Profils de démonstration — maquette privée uniquement.
 * Ne pas importer hors de `getVisibleFormateurs` / helpers gated.
 * Ne constitue pas une preuve de compétence en IA.
 */
import type { FormateurProfile } from '@/lib/formateurs/types';

/**
 * Associations catalogue (codes NIV réels) — maquette uniquement.
 * Ne modifie pas les affectations de sessions LMS.
 */
export const DEMO_FORMATEURS: readonly FormateurProfile[] = [
  {
    id: 'julien-morel',
    slug: 'julien-morel',
    prenom: 'Julien',
    nom: 'Morel',
    intitule: 'Conducteur de travaux — préparation et suivi de chantier',
    parcours:
      'Ancien conducteur de travaux en entreprise générale, Julien a coordonné la préparation des chantiers, le suivi des équipes et les échanges avec les sous-traitants. Son approche pédagogique s’appuie sur les situations du terrain et la structuration des documents de suivi.',
    specialites: [
      'Préparation de chantier',
      'Coordination des intervenants',
      'Comptes rendus et suivi des actions',
    ],
    domaineIds: ['travaux', 'management'],
    formationCodes: ['NIV-03', 'NIV-05'],
    portrait: {
      kind: 'initials',
      initials: 'JM',
      label: 'Avatar graphique — Julien Morel',
    },
    status: 'demo',
  },
  {
    id: 'claire-delmas',
    slug: 'claire-delmas',
    prenom: 'Claire',
    nom: 'Delmas',
    intitule: 'Chargée d’affaires — études commerciales et relation client',
    parcours:
      'Issue d’une entreprise de second œuvre, Claire a accompagné les affaires depuis l’analyse du besoin jusqu’au suivi des travaux. Elle privilégie des méthodes concrètes pour structurer les offres, clarifier les échanges et suivre les engagements.',
    specialites: [
      'Analyse des besoins clients',
      'Devis et propositions commerciales',
      'Suivi des affaires et relances',
    ],
    domaineIds: ['commercial'],
    formationCodes: ['NIV-01'],
    portrait: {
      kind: 'initials',
      initials: 'CD',
      label: 'Avatar graphique — Claire Delmas',
    },
    status: 'demo',
  },
  {
    id: 'nicolas-perrin',
    slug: 'nicolas-perrin',
    prenom: 'Nicolas',
    nom: 'Perrin',
    intitule: 'Technicien de bureau d’études — analyse technique et études de prix',
    parcours:
      'Ancien technicien de bureau d’études, Nicolas a travaillé sur l’analyse des dossiers techniques et la préparation des éléments de chiffrage. Il transmet une méthode de lecture, de classement et de vérification des informations utiles aux études.',
    specialites: [
      'Analyse des pièces techniques',
      'Études de prix',
      'Préparation des réponses aux appels d’offres',
    ],
    domaineIds: ['commercial', 'numerique-ia'],
    formationCodes: ['NIV-02'],
    portrait: {
      kind: 'initials',
      initials: 'NP',
      label: 'Avatar graphique — Nicolas Perrin',
    },
    status: 'demo',
  },
  {
    id: 'sophie-laurent',
    slug: 'sophie-laurent',
    prenom: 'Sophie',
    nom: 'Laurent',
    intitule: 'Ancienne dirigeante de PME BTP — organisation et pilotage',
    parcours:
      'Ancienne dirigeante d’une PME du bâtiment, Sophie a piloté l’activité commerciale, l’organisation des équipes et le suivi administratif des opérations. Elle aborde la formation à partir des décisions et des contraintes quotidiennes des responsables d’entreprise.',
    specialites: [
      'Organisation de l’entreprise',
      'Pilotage de l’activité',
      'Coordination des fonctions commerciales, administratives et travaux',
    ],
    domaineIds: ['direction', 'administration'],
    formationCodes: ['NIV-04'],
    portrait: {
      kind: 'initials',
      initials: 'SL',
      label: 'Avatar graphique — Sophie Laurent',
    },
    status: 'demo',
  },
] as const;
