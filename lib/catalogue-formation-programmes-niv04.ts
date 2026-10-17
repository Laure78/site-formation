import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

/** Programme NIV-04 — source programmes-ofc-2026-10-17.json */
export const NIV04_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'ACCUEIL — Accueil, cadrage et positionnement',
    meta: '15 min',
    objectifs: [
      'Ouverture de session',
      'Émargement, présentation des objectifs et du déroulé',
      'Recueil des attentes et auto-positionnement d’entrée sur les objectifs visés',
      'Fil rouge : une PME du BTP qui structure son usage de Claude, du premier Projet à un environnement fiabilisé',
    ],
    livrable: 'Attentes recueillies et fil rouge de la session posé',
  },
  {
    heading: 'MODULE 1 — Projets et skills : structurer Claude pour l’entreprise',
    meta: '1 h 40',
    objectifs: [
      'Projets Claude',
      'Un Projet par affaire, chantier ou client : instructions permanentes et base de connaissances',
      'Centraliser CCTP, CCAP, chartes et modèles anonymisés',
      'Bibliothèque de skills BTP',
      'Créer, téléverser et organiser ses skills (lecture du SKILL.md avant activation)',
      'Cycle : cadrer la procédure → sources → tester → corriger → documenter',
      'Alternative',
      'Si l’option « Exécution de code » est indisponible : prompt-procédure versionné',
    ],
    livrable: 'Projet « chantier type » + 2 skills BTP testés + journal de tests',
  },
  {
    heading: 'MODULE 2 — Cowork : déléguer la production documentaire',
    meta: '1 h 35',
    objectifs: [
      'Tâche supervisée',
      'Lancer une production documentaire en autonomie supervisée avec jalons de validation',
      'Alternative : enchaînement de prompts dans le Projet avec points de contrôle',
      'Livrable complet',
      'CR, mémoire ou dossier produit à partir de pièces anonymisées',
      'Enchaîner skills, Artifacts et exports bureautiques',
      'Contrôle humain',
      'Arrêt obligatoire avant diffusion : relecture et validation tracées',
    ],
    livrable: 'Dossier de chantier produit de bout en bout + journal de validation des jalons',
  },
  {
    heading: 'MODULE 3 — Connecteurs : relier Claude à ses outils',
    meta: '1 h 30',
    objectifs: [
      'Démonstration et cas d’usage',
      'Connecteur drive / messagerie / agenda selon les accès du compte',
      'Récupérer un DCE pédagogique, classer des mails, alimenter un suivi de chantier',
      'Sécuriser les données',
      'Cartographie des droits d’accès et des données autorisées / interdites',
      'Marchés publics : confidentialité des DCE, offres et données clients',
      'Alternative',
      'Sans connecteur : téléchargement manuel des pièces vers le Projet',
    ],
    livrable: 'Workflow type sécurisé + matrice des données autorisées',
  },
  {
    heading: 'MODULE 4 — Claude Code : automatiser ses tâches',
    meta: '1 h 45',
    objectifs: [
      'Automatiser',
      'Automatiser des tâches répétitives et générer des documents en lot',
      'Créer un petit outil métier guidé (génération de pièces de chantier)',
      'Fiabiliser',
      'Tester, corriger et sécuriser ses automatisations',
      'Sauvegarder et réutiliser scripts et prompts d’un chantier à l’autre',
    ],
    livrable: 'Poste de travail Claude opérationnel : Projet, bibliothèque de skills, connecteur et automatisation testée',
  },
  {
    heading: 'CLÔTURE — Bilan, plan d’action et évaluation',
    meta: '15 min',
    objectifs: [
      'Clôture de session',
      'Revue des configurations créées et règles de gouvernance à diffuser dans l’entreprise',
      'Auto-positionnement de sortie et mesure de la progression sur les objectifs',
      'Plan d’action individuel : 3 actions concrètes à mettre en place à 30 jours',
      'Questionnaire de satisfaction à chaud et remise des attestations',
    ],
    livrable: 'Plan d’action individuel à 30 jours + attestation individuelle de fin de formation',
  },
];
