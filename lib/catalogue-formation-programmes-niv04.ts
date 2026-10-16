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
    objective:
      'Structurer un Projet Claude et industrialiser deux procédures métier réutilisables (skills).',
    objectifs: [
      'Créer un Projet par affaire, chantier ou client : instructions permanentes et base de connaissances',
      'Centraliser CCTP, CCAP, chartes et modèles anonymisés dans le Projet',
      'Créer, téléverser et organiser une bibliothèque de skills BTP (SKILL.md lu avant activation)',
      'Cycle : cadrer la procédure → sources → tester → corriger → documenter le journal de tests',
      'Activer l’option « Exécution de code » si disponible ; sinon : prompt-procédure versionné',
    ],
    livrable: 'Projet « chantier type » + 2 skills BTP testés + journal de tests',
    controlesHumains:
      'Revue du périmètre documentaire et des consignes de confidentialité avant usage réel.',
    critereEvaluation:
      'Instructions claires ; skills déclenchables ; sorties contrôlées sur pièces sources.',
  },
  {
    heading: 'Module 2 — Cowork : déléguer la production documentaire',
    meta: '55 min · tâches agentiques supervisées',
    objective:
      'Produire un dossier documentaire sous supervision humaine, avec jalons de validation.',
    objectifs: [
      'Lancer une tâche de production documentaire en autonomie supervisée (Cowork si accessible)',
      'Alternative pédagogique : enchaînement de prompts dans le Projet avec points de contrôle',
      'Produire un livrable complet (CR, mémoire, dossier) à partir de pièces anonymisées',
      'Enchaîner skills et exports bureautiques ; Artifacts pour itérer le livrable',
      'Arrêt obligatoire avant diffusion : relecture et validation systématiques',
    ],
    livrable: 'Dossier chantier produit de bout en bout + journal de validation des jalons',
    controlesHumains:
      'Connecteurs désactivés si non autorisés ; décision finale humaine tracée.',
    critereEvaluation:
      'Jalons validés ; sources citées ; aucune diffusion sans validation.',
  },
  {
    heading: 'Module 3 — Connecteurs : relier Claude à ses outils',
    meta: '55 min · messagerie · drive · agenda',
    objective:
      'Relier Claude aux outils avec une matrice de données autorisées et un workflow sécurisé.',
    objectifs: [
      'Démonstration : connecteur drive / messagerie selon accès du compte (Help Center Connectors)',
      'Cas d’usage : récupérer un DCE pédagogique, classer des mails, alimenter un suivi chantier',
      'Cartographier droits d’accès, données autorisées / interdites, étapes de validation',
      'Alternative sans connecteur : téléchargement manuel vers le Projet',
      'Marchés publics : confidentialité des DCE, offres et données clients — aucun dépôt hors cadre',
    ],
    livrable: 'Workflow type sécurisé + matrice de données autorisées',
    controlesHumains:
      'Autorisations entreprise obligatoires ; pas de données clients réelles sans cadre adapté.',
    critereEvaluation:
      'Matrice complète ; risques listés ; alternative sans connecteur documentée.',
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
