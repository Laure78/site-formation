import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

export const NIV05_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'Accueil — positionnement',
    meta: '5 min',
    objectifs: [
      'Accueil, émargement, présentation des objectifs et recueil des attentes',
      'Auto-positionnement d’entrée sur les objectifs visés',
    ],
    livrable: 'Attentes recueillies et cadrage de session posé',
  },
  {
    heading: 'Module 0 — Introduction à Claude, l’écosystème Anthropic',
    meta: '30 min',
    objectifs: [
      'Claude vs ChatGPT : pour quel usage MOE choisir l’un ou l’autre — rigueur, confidentialité par défaut',
      'Tour d’horizon : Projets, connecteurs (drive, messagerie, agenda), skills, tâches planifiées, Cowork',
      'Limites de contexte — comprendre la capacité d’une conversation pour ne pas être bloqué',
    ],
    livrable:
      'Mémo « Claude pour la maîtrise d’œuvre » (1 page recto-verso) — quand utiliser Claude ou ChatGPT',
  },
  {
    heading: 'Module 1 — Analyse des offres et conformité avec l’IA',
    meta: '50 min',
    objectifs: [
      'Lecture rapide CCTP, CCAP, CCAG, bordereaux — points de vigilance et incohérences entre pièces',
      'Import du DCE dans un Projet (via connecteur drive) — base interrogeable',
      'Construction d’une fiche de synthèse (30 points clés) en moins de 15 minutes sur un DCE réel',
      'Contrôle des extractions par retour aux pièces sources',
    ],
    livrable: 'Fiche-type d’analyse DCE (30 points) + 10 prompts prêts à l’emploi',
  },
  {
    heading: 'Module 2 — Comptes rendus de chantier en 10 minutes',
    meta: '50 min',
    objectifs: [
      'Trame MOE : présents / excusés, avancement par corps d’état, réserves, décisions, prochaines échéances',
      'Dictée vocale sur smartphone → transcription → mise en forme automatique',
      'Photos de chantier : légendes et intégration dans le CR — gestion des versions et historique des réserves',
    ],
    livrable:
      'Gabarit CR de chantier MOE + prompt de transcription vocale — gain mesuré : 45 min à 10 min par CR',
  },
  {
    heading: 'Module 3 — Courriers, ordres de service et actes administratifs',
    meta: '50 min',
    objectifs: [
      'Bibliothèque IA d’actes MOE : OS (démarrage, arrêt, modification, reprise), courriers types, PV, avenants',
      'Production d’un OS complet en moins de 5 minutes à partir d’un contexte chantier',
      'Contrôle juridique minimal (références CCAG, délais de notification) — 3 modèles personnalisés réutilisables',
    ],
    livrable:
      'Pack de 15 modèles d’actes administratifs MOE (OS, courriers, avenants) + prompt de rédaction juridique',
  },
  {
    heading: 'Module 4 — Réserves, réception et suivi client',
    meta: '50 min',
    objectifs: [
      'Saisie terrain : photo + dictée → fiche de réserve structurée — suivi automatisé et relances entreprises',
      'Préparation d’un pré-PV de réception : inventaire, cotation, classement par corps d’état',
      'Réponses clients et acquéreurs (TMA, désordres), visites cloisons, pré-livraison, livraison — suivi GPA',
    ],
    livrable:
      'Modèle de suivi des réserves + tableau GPA + 8 prompts pour réponses clients standardisées',
  },
  {
    heading: 'Clôture — bilan et plan d’action',
    meta: '5 min',
    objectifs: [
      'Auto-positionnement de sortie et plan d’action individuel à 30 jours',
      'Questionnaire de satisfaction et remise des attestations',
    ],
    livrable: 'Plan d’action individuel + attestation individuelle de fin de formation',
  },
];
