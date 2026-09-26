import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

export const NIV04_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'Accueil — cadrage et positionnement',
    meta: '10 min · émargement · attentes',
    objectifs: [
      'Accueil des participants, émargement et présentation des objectifs de la demi-journée',
      'Recueil des attentes et auto-positionnement d’entrée sur les objectifs visés',
      'Fil rouge : une PME BTP qui structure son usage de Claude, du premier Projet « chantier » à un environnement complet et fiabilisé',
    ],
    livrable: 'Attentes recueillies et fil rouge de session posé',
  },
  {
    heading: 'Module 1 — Projets et skills : structurer Claude pour l’entreprise',
    meta: '60 min · Projects · Skills · exécution de code',
    objectifs: [
      'Créer un Projet par affaire, chantier ou client : instructions permanentes et base de connaissances',
      'Centraliser CCTP, CCAP, chartes et modèles dans le Projet pour des réponses contextualisées',
      'Créer, téléverser et organiser une bibliothèque de skills BTP réutilisables',
      'Activer l’option « Exécution de code », tester et partager les skills',
    ],
    livrable: 'Un Projet « chantier type » structuré + 2 skills BTP opérationnels',
  },
  {
    heading: 'Module 2 — Cowork : déléguer la production documentaire',
    meta: '55 min · tâches agentiques supervisées',
    objectifs: [
      'Lancer une tâche agentique de production documentaire en autonomie supervisée',
      'Produire un livrable complet (CR, mémoire, dossier) à partir de ses propres pièces',
      'Enchaîner skills et outils bureautiques (tableur, présentation) dans une même tâche Cowork',
      'Garder la main : relecture et validation systématiques avant diffusion',
    ],
    livrable: 'Un dossier chantier produit de bout en bout avec Cowork',
  },
  {
    heading: 'Module 3 — Connecteurs : relier Claude à ses outils',
    meta: '55 min · messagerie · drive · agenda',
    objectifs: [
      'Relier Claude à sa messagerie, son drive, son agenda ou un outil de gestion',
      'Cas d’usage : récupérer un DCE depuis le drive, classer des mails, alimenter un suivi chantier',
      'Périmètre d’accès, données sensibles, validation humaine et RGPD',
      'Cas des marchés publics : confidentialité des DCE, des offres et des données clients',
    ],
    livrable: 'Un connecteur configuré + un workflow type sécurisé',
  },
  {
    heading: 'Module 4 — Claude Code : automatiser ses tâches',
    meta: '50 min · scripts · lots documentaires',
    objectifs: [
      'Automatiser des tâches répétitives et générer des documents en lot',
      'Créer un petit outil métier guidé (génération de pièces de chantier)',
      'Tester, corriger et sécuriser ses automatisations',
      'Sauvegarder et réutiliser ses scripts et prompts d’un chantier à l’autre',
    ],
    livrable:
      'Poste de travail Claude opérationnel — Projet « chantier », bibliothèque de skills, connecteur et automatisme Claude Code',
  },
  {
    heading: 'Clôture — bilan, plan d’action',
    meta: '10 min · auto-positionnement · satisfaction',
    objectifs: [
      'Auto-positionnement de sortie et mesure de la progression sur les objectifs visés',
      'Plan d’action individuel : 3 actions concrètes à mettre en place à 30 jours',
      'Questions / réponses, questionnaire de satisfaction et remise des attestations',
    ],
    livrable: 'Plan d’action individuel + attestation individuelle de fin de formation',
  },
];
