import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

/** Programme NIV-05 — source programmes-ofc-2026-10-17.json */
export const NIV05_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'ACCUEIL — Accueil, cadrage et positionnement',
    meta: '15 min',
    objectifs: [
      'Ouverture de session',
      'Émargement, présentation des objectifs et du déroulé',
      'Recueil des attentes et auto-positionnement d’entrée sur les objectifs visés',
      'Présentation des dossiers MOE apportés par les participants',
    ],
    livrable: 'Attentes recueillies et fil rouge de la session posé',
  },
  {
    heading: 'MODULE 0 — Claude et l’écosystème Anthropic pour la MOE',
    meta: '45 min',
    objectifs: [
      'Claude ou ChatGPT ?',
      'Quel outil pour quel usage MOE : rigueur, documents longs, confidentialité',
      'Tour d’horizon',
      'Projets, connecteurs (drive, messagerie, agenda), skills, tâches planifiées, Cowork',
      'Limites de contexte d’une conversation et bonnes pratiques',
    ],
    livrable: 'Mémo « Claude pour la maîtrise d’œuvre » (recto-verso)',
  },
  {
    heading: 'MODULE 1 — Analyse des offres et conformité',
    meta: '1 h 25',
    objectifs: [
      'Lecture des pièces',
      'CCTP, CCAP, CCAG, bordereaux : points de vigilance',
      'Incohérences entre pièces',
      'Base interrogeable',
      'Import du DCE dans un Projet Claude',
      'Fiche de synthèse en 30 points clés sur un DCE réel',
      'Contrôle',
      'Retour aux pièces sources pour chaque extraction critique',
    ],
    livrable: 'Fiche-type d’analyse DCE (30 points) + 10 prompts prêts à l’emploi',
  },
  {
    heading: 'MODULE 2 — Comptes rendus de chantier',
    meta: '1 h 25',
    objectifs: [
      'Trame MOE',
      'Présents / excusés, avancement par corps d’état, réserves, décisions, échéances',
      'De la dictée au CR',
      'Dictée vocale sur smartphone → transcription → mise en forme',
      'Photos de chantier : légendes et intégration au CR',
      'Suivi',
      'Gestion des versions et historique des observations d’un CR à l’autre',
    ],
    livrable: 'Gabarit de CR de chantier MOE + prompt de transcription vocale',
  },
  {
    heading: 'MODULE 3 — Courriers, ordres de service et actes administratifs',
    meta: '1 h 25',
    objectifs: [
      'Bibliothèque d’actes MOE',
      'OS de démarrage, d’arrêt, de modification, de reprise',
      'Courriers types, PV, avenants',
      'Production et contrôle',
      'Produire un OS complet à partir d’un contexte chantier',
      'Contrôle juridique minimal : références CCAG, délais de notification',
    ],
    livrable: 'Pack de modèles d’actes administratifs MOE + prompt de rédaction',
  },
  {
    heading: 'MODULE 4 — Réserves, réception et suivi client',
    meta: '1 h 30',
    objectifs: [
      'Réserves',
      'Photo + dictée → fiche de réserve structurée',
      'Suivi et relances des entreprises',
      'Réception',
      'Pré-PV de réception : inventaire, cotation, classement par corps d’état',
      'Suivi client et GPA',
      'Réponses aux clients et acquéreurs (TMA, désordres)',
      'Visites de pré-livraison, livraison et suivi de la garantie de parfait achèvement',
    ],
    livrable: 'Modèle de suivi des réserves + tableau GPA + prompts de réponses clients',
  },
  {
    heading: 'CLÔTURE — Bilan, plan d’action et évaluation',
    meta: '15 min',
    objectifs: [
      'Clôture de session',
      'Assemblage de la bibliothèque de prompts MOE de chaque participant',
      'Auto-positionnement de sortie et mesure de la progression sur les objectifs',
      'Plan d’action individuel : 3 actions concrètes à mettre en place à 30 jours',
      'Questionnaire de satisfaction à chaud et remise des attestations',
    ],
    livrable: 'Plan d’action individuel à 30 jours + attestation individuelle de fin de formation',
  },
];
