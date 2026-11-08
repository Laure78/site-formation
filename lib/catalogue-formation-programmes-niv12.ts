import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

/** Programme NIV-12 — source programme_OFC_NIV-12_IA_MOE_CCTP_DPGF_20261104.pdf */
export const NIV12_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'SÉQUENCE 1 — Cadrage, confidentialité et prise en main',
    meta: '15 min',
    objectifs: [
      'Projets partagés, connecteurs, confidentialité et RGPD',
      'Littératie IA : obligation de maîtrise de l’IA (art. 4 du règlement UE 2024/1689)',
      'Méthode de prompt CRAFT : Contexte – Rôle – Action – Format – Ton',
    ],
    livrable: 'Règles d’usage de l’IA du cabinet',
  },
  {
    heading: 'SÉQUENCE 2 — Un projet IA par client ou par opération',
    meta: '25 min',
    objectifs: [
      'Contrat cadre ou marché, CCTP types, base sécurité incendie et accessibilité PMR, charte graphique',
      'Instructions permanentes : rôle, vocabulaire, règles de contrôle, données interdites',
      'Partage du projet au sein de l’équipe selon l’outil et l’abonnement',
    ],
    livrable: 'Projet client / opération prêt à l’emploi',
  },
  {
    heading: 'SÉQUENCE 3 — CCTP, descriptif et sécurité incendie',
    meta: '40 min',
    objectifs: [
      'CCTP à partir du contrat cadre ou des pièces du maître d’ouvrage',
      'Descriptif de travaux et notice de sécurité incendie à partir de la base du cabinet',
    ],
    controlesHumains:
      'références normatives et réglementaires vérifiées sur les textes, aucune conformité délivrée par l’IA',
    livrable: 'Trame de CCTP + descriptif de travaux',
  },
  {
    heading: 'SÉQUENCE 4 — Métré, DPGF et analyse des offres',
    meta: '40 min',
    objectifs: [
      'Métré et DPGF à partir des plans (export PDF / DXF du DWG)',
      'Comparatif des DPGF chiffrés des entreprises : écarts, oublis, postes à clarifier',
      'Constitution d’une base de prix du cabinet',
    ],
    controlesHumains: 'quantités et prix contrôlés par le maître d’œuvre avant tout usage',
    livrable: 'DPGF, tableau comparatif des offres, base de prix',
  },
  {
    heading: 'SÉQUENCE 5 — CR de chantier et rapport quotidien',
    meta: '45 min',
    objectifs: [
      'CR de chantier à partir de notes, d’une dictée vocale et de photos',
      'Rapport quotidien illustré : avancement, points bloquants, actions',
      'Relecture avant envoi aux entreprises et au maître d’ouvrage',
    ],
    livrable: 'Gabarit de CR de chantier + rapport photo',
  },
  {
    heading: 'SÉQUENCE 6 — Planning de chantier court',
    meta: '30 min',
    objectifs: [
      'Phasage sur 1 à 2 mois, enchaînement des lots',
      'Contraintes d’exploitation : site occupé, horaires d’ouverture, interventions de nuit',
      'Export vers un planning type Excel',
    ],
    livrable: 'Planning type Excel',
  },
  {
    heading: 'SÉQUENCE 7 — Emails récurrents',
    meta: '30 min',
    objectifs: [
      'Modèles de réponse : entreprises, maître d’ouvrage, exploitant, bureau de contrôle',
      'Assistant de rédaction avec le ton et les formules du cabinet',
      'Relances, demandes de compléments, courriers à faire valider',
    ],
    livrable: 'Bibliothèque de réponses aux emails récurrents',
  },
  {
    heading: 'CLÔTURE — Bilan, plan d’action et évaluation',
    meta: '15 min',
    objectifs: [
      'Auto-positionnement de sortie et évaluation des acquis',
      'Plan d’action individuel : 3 actions concrètes à 30 jours',
      'Questionnaire de satisfaction à chaud et remise des attestations',
    ],
    livrable: 'Plan d’action individuel à 30 jours + attestation individuelle de fin de formation',
  },
];
