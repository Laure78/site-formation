/**
 * Contenu éditorial — parcours « Créer ses applications métier BTP avec l’IA ».
 * Compétence indépendante des outils : pas de nom d’environnement de développement dans les textes publics.
 */

import { LINKS } from '@/lib/internal-links';
import type { ApplicationMetierBtpTarifKey } from '@/lib/tarifs-applications-metier-btp';

export type ApplicationMetierModule = {
  title: string;
  duree: string;
  items: readonly string[];
};

export type ApplicationMetierCasUsage = {
  title: string;
  items: readonly string[];
};

export type ApplicationMetierNiveauConfig = {
  ref: 'NIV-06' | 'NIV-07' | 'NIV-08';
  slug: string;
  path: string;
  tarifKey: ApplicationMetierBtpTarifKey;
  duree: '7 h';
  progressionLabel: string;
  progressionTagline: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  positionnement: string;
  prerequis: string;
  promesseRealiste: string;
  objectifs: readonly string[];
  modules: readonly ApplicationMetierModule[];
  casUsageExemples?: readonly ApplicationMetierCasUsage[];
  faq: readonly { q: string; a: string }[];
  /** Enrichissement UX fiche (optionnel — N1 en priorité). */
  ux?: ApplicationMetierNiveauUx;
};

export type ApplicationMetierNiveauUx = {
  /** Ligne facts hero : « 7 h · 1 à 8 participants · … » */
  heroFacts: string;
  /** Badge hero optionnel (sinon progressionLabel). */
  heroBadge?: string;
  /** Libellé CTA hero (défaut : Parler de mon projet). */
  ctaHeroLabel?: string;
  /** Titre section résultat (défaut N1). */
  resultatJourneeTitle?: string;
  /** Résultats de la journée (4 max). */
  resultatJournee: readonly string[];
  /** Titre section cas d’usage. */
  casUsageTitle?: string;
  /** Cartes cas d’usage (6 max) — titre + une phrase. */
  casUsageCards: readonly { title: string; text: string }[];
  /** Bloc « Une application métier, concrètement ? » (N1). */
  definitionApp?: {
    intro: string;
    points: readonly string[];
  };
  /** Comparaison niveaux (ex. N1 vs N2). */
  comparison?: {
    title: string;
    left: { title: string; subtitle?: string; items: readonly string[] };
    right: { title: string; subtitle?: string; items: readonly string[] };
  };
  avant?: readonly string[];
  apres?: readonly string[];
  /** Exemple de workflow métier (N2). */
  workflow?: {
    title: string;
    steps: readonly string[];
    caption: string;
  };
  /** Concepts métier expliqués simplement (N2). */
  concepts?: {
    title: string;
    items: readonly { title: string; text: string }[];
  };
  pourQui: readonly string[];
  pourQuiHighlight: string;
  /** Phrase courte sous la liste (ex. « pas besoin de coder »). */
  pourQuiNote?: string;
  /** Timeline programme simplifiée (alignée sur modules officiels). */
  programmeSteps: readonly {
    label: string;
    title: string;
    text: string;
    duree?: string;
  }[];
  livrablesTitle?: string;
  livrables: readonly string[];
  livrablesNote?: string;
  /** IA vs validation humaine (N2+). */
  iaValidation?: {
    title: string;
    rows: readonly { ia: string; humain: string }[];
  };
  /** Bloc formatrice court. */
  formatrice?: {
    title: string;
    role: string;
    paragraphs: readonly string[];
  };
  ctaFinal?: {
    title: string;
    text: string;
    label: string;
  };
};

export const PARCOURS_APPLICATIONS_METIER = {
  metaTitle: 'Parcours applications métier BTP : 21 h IA',
  metaDescription:
    'Parcours formation applications métier BTP en 3 niveaux (21 h) : créer, connecter et industrialiser une application avec l’IA. Formation IA pour le BTP, Qualiopi.',
  h1: 'Créer ses applications métier BTP avec l’intelligence artificielle',
  messagePrincipal:
    'Vos processus métier reposent encore sur des fichiers Excel, des e-mails et des tâches manuelles ?',
  promesse:
    'Apprenez à transformer vos besoins métier en applications grâce à l’intelligence artificielle.',
  sousPromesse:
    'Un parcours progressif de 21 heures pour apprendre à concevoir, connecter et faire évoluer ses propres applications métier.',
  intro:
    'Devis, métrés, appels d’offres, chantier, trésorerie, prospection, communication, documents, planning, relation client : le parcours enseigne une méthode commune — sans viser le métier de développeur professionnel.',
  parcoursCompletDuree: '21 h',
  parcoursCompletPromesse:
    'Le participant développe progressivement une application métier plus aboutie et acquiert une méthode lui permettant de créer et faire évoluer ses propres outils.',
  parcoursCompletPrudence:
    'Aucune garantie qu’une application complexe sera totalement terminée et prête pour une mise en production professionnelle au bout de 21 heures.',
  exemplesBesoins: [
    'Remplacer un fichier Excel',
    'Automatiser une tâche répétitive',
    'Centraliser des informations chantier',
    'Créer un outil de devis',
    'Analyser un DCE',
    'Suivre la trésorerie',
    'Gérer des prospects',
    'Créer un site web métier',
    'Automatiser la communication digitale',
  ],
  faq: [
    {
      q: 'Faut-il savoir programmer pour suivre ce parcours ?',
      a: 'Non pour le niveau 1 : aucune compétence préalable en programmation n’est exigée. Une pratique courante de l’IA générative est recommandée. Les niveaux suivants supposent d’avoir construit un premier prototype ou des compétences équivalentes.',
    },
    {
      q: 'Ce parcours forme-t-il à devenir développeur ?',
      a: 'Non. L’objectif est de transformer vos problèmes métier du BTP en applications concrètes avec l’intelligence artificielle — prototypes, outils internes et méthode de cadrage — en conservant la validation métier de votre côté.',
    },
    {
      q: 'Quelle durée pour le parcours complet ?',
      a: 'Trois sessions de 7 heures (21 heures au total), en présentiel intra-entreprise en Île-de-France. Chaque niveau peut aussi être suivi séparément.',
    },
    {
      q: 'Le financement OPCO est-il possible ?',
      a: 'Prise en charge possible selon l’éligibilité de l’entreprise et les barèmes Constructys en vigueur. Les plafonds de prise en charge peuvent être inférieurs au tarif de la formation.',
    },
  ] as const,
} as const;

export const APPLICATION_METIER_NIVEAU_1: ApplicationMetierNiveauConfig = {
  ref: 'NIV-06',
  slug: 'application-metier-btp-niveau-1',
  path: LINKS.formationApplicationMetierBtpNiveau1,
  tarifKey: 'niveau-1',
  duree: '7 h',
  progressionLabel: 'Niveau 1 — CONCEVOIR',
  progressionTagline: 'Je transforme un problème métier en prototype.',
  metaTitle: 'Créer une application métier BTP avec l’IA | Niveau 1',
  metaDescription:
    'Formation pratique de 7 h pour créer votre premier prototype d’application métier BTP avec l’IA. Intra-entreprise en Île-de-France. Qualiopi.',
  h1: 'Créez votre première application métier BTP avec l’IA',
  subtitle:
    'Transformez un problème concret de votre entreprise en premier prototype fonctionnel, sans être développeur.',
  positionnement:
    'Découvrir la méthode permettant de transformer un problème métier en prototype fonctionnel, avec le développement assisté par l’intelligence artificielle.',
  prerequis:
    'Aucune compétence préalable en programmation. Une pratique courante de l’intelligence artificielle générative est recommandée.',
  promesseRealiste:
    'Chaque participant développe un prototype fonctionnel ou le socle de son application métier — pas une application industrielle complète.',
  objectifs: [
    'Identifier un processus pouvant être digitalisé',
    'Analyser un point de douleur métier',
    'Formaliser un cahier des charges simple',
    'Définir les utilisateurs, les données et les fonctionnalités',
    'Concevoir une interface (navigation, formulaires, tableaux)',
    'Créer des formulaires et des tableaux avec règles métier simples',
    'Tester une première version et construire un prototype fonctionnel',
  ],
  modules: [
    {
      title: 'Identifier les processus à digitaliser',
      duree: '45 min',
      items: [
        'Tâches répétitives, doubles saisies, fichiers Excel',
        'Documents répétitifs, données dispersées, procédures manuelles',
      ],
    },
    {
      title: 'Transformer le besoin en cahier des charges',
      duree: '1 h',
      items: [
        'Problème, utilisateur, données, pages et fonctionnalités',
        'Règles métier et résultats attendus',
      ],
    },
    {
      title: 'Comprendre une application web',
      duree: '1 h',
      items: [
        'Interface, logique métier, données et base de données',
        'Serveur, hébergement et API',
      ],
    },
    {
      title: 'Concevoir l’interface',
      duree: '1 h 30',
      items: [
        'Navigation, tableau de bord, formulaires et tableaux',
        'Fiches, filtres et boutons',
      ],
    },
    {
      title: 'Construire les fonctionnalités',
      duree: '1 h 30',
      items: [
        'Créer, modifier, supprimer, rechercher et filtrer',
        'Calculer et changer un statut',
      ],
    },
    {
      title: 'Tester et améliorer',
      duree: '1 h 15',
      items: [
        'Tests utilisateurs, erreurs et corrections',
        'Responsive ordinateur et smartphone, préparation de la publication',
      ],
    },
  ],
  faq: [
    {
      q: 'Faut-il savoir coder ?',
      a: 'Non. Aucune compétence préalable en programmation n’est exigée. Une pratique courante de l’IA générative est recommandée.',
    },
    {
      q: 'Que peut-on créer en une journée ?',
      a: 'Un prototype fonctionnel ou le socle de votre application métier — pas une application professionnelle complète déployée en production.',
    },
    {
      q: 'Quelle différence entre le Niveau 1 et le Niveau 2 ?',
      a: 'Le Niveau 1 sert à concevoir et prototyper. Le Niveau 2 connecte données, utilisateurs et services pour faire évoluer le prototype.',
    },
    {
      q: 'Puis-je travailler sur mon propre projet ?',
      a: 'Oui. Vous venez avec un problème métier concret de votre entreprise : c’est la matière première de la journée.',
    },
    {
      q: 'Quels outils sont utilisés ?',
      a: 'La formation enseigne le développement assisté par l’IA et les assistants de développement du moment, sans dépendre d’un logiciel particulier. La compétence reste transférable si les outils évoluent.',
    },
    {
      q: 'La formation peut-elle être financée par un OPCO ?',
      a: 'Prise en charge possible selon l’éligibilité de l’entreprise et les barèmes Constructys en vigueur. Les plafonds peuvent être inférieurs au tarif de la formation.',
    },
    {
      q: 'La formation est-elle organisée dans nos locaux ?',
      a: 'Oui : format intra-entreprise, en présentiel en Île-de-France, pour votre équipe (1 à 8 participants).',
    },
  ],
  ux: {
    heroFacts: '7 h · 1 à 8 participants · Intra-entreprise · Île-de-France',
    heroBadge: 'Applications métier BTP · Niveau 1 — Concevoir',
    resultatJournee: [
      'Définir votre besoin métier',
      'Structurer les fonctions de votre application',
      'Créer et tester un premier prototype fonctionnel',
    ],
    casUsageCards: [
      {
        title: 'Devis & métrés',
        text: 'Transformer une saisie métier en outil de préparation de devis.',
      },
      {
        title: 'Chantier',
        text: 'Centraliser informations, actions ou réserves d’un chantier.',
      },
      {
        title: 'Trésorerie',
        text: 'Créer un tableau de suivi adapté à l’activité de l’entreprise.',
      },
      {
        title: 'Commercial',
        text: 'Structurer un mini CRM pour prospects, devis et relances.',
      },
      {
        title: 'Documents',
        text: 'Générer plus rapidement certains documents récurrents.',
      },
      {
        title: 'Suivi métier',
        text: 'Remplacer un fichier Excel devenu difficile à maintenir.',
      },
    ],
    definitionApp: {
      intro:
        'Une application métier est un outil conçu autour de votre façon de travailler. Elle peut remplacer un fichier Excel, centraliser des informations ou automatiser certaines étapes d’un processus.',
      points: [
        'Vous partez de votre besoin réel.',
        'Vous n’apprenez pas à coder pour devenir développeur.',
        'Vous apprenez à construire un outil utile à votre entreprise avec l’aide de l’IA.',
      ],
    },
    avant: [
      'Fichiers Excel dispersés',
      'Doubles saisies',
      'Informations difficiles à retrouver',
      'Tâches répétitives',
      'Outils génériques mal adaptés',
    ],
    apres: [
      'Besoin métier cadré',
      'Données structurées',
      'Fonctionnalités prioritaires définies',
      'Premier prototype créé',
      'Plan d’amélioration identifié',
    ],
    pourQui: [
      'Dirigeants de PME / TPE du BTP',
      'Conducteurs de travaux',
      'Chargés d’affaires',
      'Responsables métier ou référents digitaux',
    ],
    pourQuiNote: 'Aucune compétence en programmation n’est nécessaire.',
    pourQuiHighlight:
      'Vous devez surtout connaître votre métier et venir avec un problème concret à résoudre.',
    programmeSteps: [
      {
        label: '01 — IDENTIFIER',
        title: 'Identifier',
        text: 'Choisir un problème métier réellement utile à résoudre.',
      },
      {
        label: '02 — CADRER',
        title: 'Cadrer',
        text: 'Définir les utilisateurs, données, règles et fonctionnalités.',
      },
      {
        label: '03 — CONCEVOIR',
        title: 'Concevoir',
        text: 'Transformer le besoin en cahier des charges simple.',
      },
      {
        label: '04 — PROTOTYPER',
        title: 'Prototyper',
        text: 'Construire les premières interfaces et fonctionnalités avec l’IA.',
      },
      {
        label: '05 — TESTER',
        title: 'Tester',
        text: 'Tester le prototype, corriger les erreurs et préparer la suite.',
      },
    ],
    livrables: [
      'Votre cahier des charges simplifié',
      'La structure de votre application',
      'Votre premier prototype',
      'Une méthode pour continuer à l’améliorer',
    ],
  },
};

export const APPLICATION_METIER_NIVEAU_2: ApplicationMetierNiveauConfig = {
  ref: 'NIV-07',
  slug: 'application-metier-btp-niveau-2',
  path: LINKS.formationApplicationMetierBtpNiveau2,
  tarifKey: 'niveau-2',
  duree: '7 h',
  progressionLabel: 'Niveau 2 — CONNECTER',
  progressionTagline: 'Je transforme mon prototype en application métier connectée.',
  metaTitle: 'Application métier BTP connectée avec l’IA | Niveau 2',
  metaDescription:
    'Formation de 7 h pour connecter votre application métier BTP : données, utilisateurs, workflows et services externes. Niveau 2 en Île-de-France.',
  h1: 'Développez une application métier BTP connectée',
  subtitle:
    'Faites évoluer votre prototype avec une base de données, des utilisateurs, des workflows et des services connectés.',
  positionnement:
    'Passer du prototype à une application métier connectée : base de données, utilisateurs, workflows et services externes.',
  prerequis:
    'Avoir suivi le niveau 1 ou maîtriser les compétences équivalentes (prototype, cahier des charges, premières fonctionnalités).',
  promesseRealiste:
    'Le Niveau 2 vise une application fonctionnelle et connectée. La mise en production à grande échelle peut nécessiter une validation technique complémentaire.',
  objectifs: [
    'Structurer une base de données métier (tables, relations, statuts, historique)',
    'Gérer l’authentification, les rôles et les droits',
    'Construire un workflow métier (prospect → devis → chantier, etc.)',
    'Connecter des services externes (API, calendrier, messagerie, notifications)',
    'Automatiser des actions répétitives et générer des documents',
    'Tester et sécuriser les accès et les données',
  ],
  modules: [
    {
      title: 'Structurer une base de données métier',
      duree: '1 h 15',
      items: ['Tables, champs, relations et identifiants', 'Statuts et historique'],
    },
    {
      title: 'Gérer les utilisateurs et les accès',
      duree: '1 h',
      items: [
        'Authentification et comptes utilisateurs',
        'Administrateur, collaborateurs, rôles et droits',
      ],
    },
    {
      title: 'Construire un workflow métier',
      duree: '1 h',
      items: [
        'Exemple : prospect → rendez-vous → devis → relance → commande → chantier',
        'Ou : affaire → préparation → travaux → contrôle → réception',
      ],
    },
    {
      title: 'Connecter des services externes',
      duree: '1 h 15',
      items: [
        'API, formulaires, calendrier, messagerie',
        'Notifications et services externes',
      ],
    },
    {
      title: 'Automatiser les actions répétitives',
      duree: '1 h',
      items: [
        'Créer une tâche, envoyer une notification, changer un statut',
        'Générer un document, préparer une relance',
      ],
    },
    {
      title: 'Générer et gérer des documents',
      duree: '1 h',
      items: ['Devis, rapport, compte rendu, fiche chantier', 'Synthèse et PDF'],
    },
    {
      title: 'Tester et sécuriser',
      duree: '30 min',
      items: [
        'Contrôle des accès et validation des données',
        'Tests et gestion des erreurs',
      ],
    },
  ],
  faq: [
    {
      q: 'Faut-il avoir suivi le Niveau 1 ?',
      a: 'Oui, ou disposer déjà d’un prototype, d’un cahier des charges et de premières fonctionnalités équivalentes.',
    },
    {
      q: 'Faut-il savoir coder ?',
      a: 'Non. La formation s’appuie sur le développement assisté par l’IA. Vous devez surtout connaître votre processus métier et votre prototype.',
    },
    {
      q: 'Puis-je travailler sur mon propre prototype ?',
      a: 'Oui. C’est l’objectif : faire évoluer votre outil (ou un cas métier proche) vers une application connectée.',
    },
    {
      q: 'Qu’est-ce qu’une application « connectée » ?',
      a: 'Une application qui stocke durablement vos données, gère plusieurs utilisateurs, fait avancer un processus (workflow) et peut échanger avec d’autres services.',
    },
    {
      q: 'Quels services peut-on connecter ?',
      a: 'Selon votre besoin : calendrier, formulaires, messagerie, notifications, ou d’autres services externes utiles à votre processus BTP.',
    },
    {
      q: 'Peut-on obtenir un financement OPCO ?',
      a: 'Prise en charge possible selon l’éligibilité de l’entreprise et les règles applicables. Les plafonds peuvent être inférieurs au tarif de la formation.',
    },
    {
      q: 'Quelle différence entre Niveau 2 et Niveau 3 ?',
      a: 'Le Niveau 2 connecte données, utilisateurs et workflows. Le Niveau 3 ajoute des fonctions IA avancées, automatise davantage et prépare le déploiement.',
    },
  ],
  ux: {
    heroFacts: '7 h · 1 à 8 participants · Intra-entreprise · Île-de-France',
    heroBadge: 'Applications métier BTP · Niveau 2 — Connecter',
    ctaHeroLabel: 'Parler de mon application',
    resultatJourneeTitle: 'Passez du prototype à une application connectée',
    resultatJournee: [
      'Stocker vos données métier',
      'Gérer plusieurs utilisateurs',
      'Automatiser votre workflow',
      'Connecter vos outils existants',
    ],
    casUsageTitle: 'Ce que votre application peut commencer à gérer',
    casUsageCards: [
      {
        title: 'CRM BTP',
        text: 'Prospects → rendez-vous → devis → relance → commande.',
      },
      {
        title: 'Devis & métrés',
        text: 'Centraliser affaires, quantités, devis et statuts.',
      },
      {
        title: 'Chantier',
        text: 'Affaires → préparation → travaux → contrôle → réception.',
      },
      {
        title: 'Trésorerie',
        text: 'Suivre factures, échéances, encaissements et alertes.',
      },
      {
        title: 'Documents',
        text: 'Générer comptes rendus, fiches chantier ou rapports.',
      },
      {
        title: 'Équipes',
        text: 'Donner des accès différents selon les utilisateurs.',
      },
    ],
    comparison: {
      title: 'Vous avez déjà le prototype. Maintenant, connectez-le.',
      left: {
        title: 'Niveau 1',
        subtitle: 'Prototype',
        items: ['Interfaces', 'Fonctions principales', 'Cahier des charges', 'Première version'],
      },
      right: {
        title: 'Niveau 2',
        subtitle: 'Application connectée',
        items: [
          'Base de données',
          'Comptes utilisateurs',
          'Rôles',
          'Automatisations',
          'Services externes',
        ],
      },
    },
    workflow: {
      title: 'Exemple : connecter votre processus commercial',
      steps: ['Prospect', 'Rendez-vous', 'Devis', 'Relance', 'Commande', 'Chantier'],
      caption:
        'Chaque étape peut mettre à jour les données, déclencher une action ou générer un document.',
    },
    concepts: {
      title: 'Les briques d’une application connectée',
      items: [
        {
          title: 'Base de données',
          text: 'Vos clients, affaires, devis et chantiers sont enregistrés durablement.',
        },
        {
          title: 'Utilisateurs',
          text: 'Chaque collaborateur possède son accès.',
        },
        {
          title: 'Rôles',
          text: 'Un conducteur de travaux ne voit pas forcément les mêmes fonctions qu’un administrateur.',
        },
        {
          title: 'Workflow',
          text: 'Votre application suit les différentes étapes de votre processus.',
        },
        {
          title: 'Connexion',
          text: 'Votre application peut échanger avec un calendrier, une messagerie ou un autre service.',
        },
      ],
    },
    pourQui: [
      'Dirigeants de PME BTP',
      'Conducteurs de travaux',
      'Chargés d’affaires',
      'Responsables métier / digital / BE',
    ],
    pourQuiHighlight:
      'Prérequis : avoir suivi le Niveau 1 ou disposer déjà d’un prototype, d’un cahier des charges et de premières fonctionnalités.',
    programmeSteps: [
      {
        label: '01',
        title: 'Structurer les données',
        text: 'Tables, champs, relations, statuts et historique.',
        duree: '1 h 15',
      },
      {
        label: '02',
        title: 'Gérer les utilisateurs',
        text: 'Authentification, comptes, rôles et droits.',
        duree: '1 h',
      },
      {
        label: '03',
        title: 'Créer le workflow',
        text: 'Transformer votre processus métier en étapes et actions.',
        duree: '1 h',
      },
      {
        label: '04',
        title: 'Connecter des services',
        text: 'Calendrier, formulaires, messagerie, notifications et API.',
        duree: '1 h 15',
      },
      {
        label: '05',
        title: 'Automatiser',
        text: 'Déclencher certaines actions selon les événements de l’application.',
        duree: '1 h',
      },
      {
        label: '06',
        title: 'Générer des documents',
        text: 'Devis, rapports, comptes rendus, fiches chantier ou PDF.',
        duree: '1 h',
      },
      {
        label: '07',
        title: 'Tester et sécuriser',
        text: 'Contrôler les accès, données, erreurs et comportements.',
        duree: '30 min',
      },
    ],
    livrablesTitle: 'Vous repartez avec une application plus complète',
    livrables: [
      'Données métier persistantes',
      'Gestion des utilisateurs et rôles',
      'Workflow connecté',
      'Automatisations et génération documentaire',
    ],
    livrablesNote:
      'Le Niveau 2 vise une application fonctionnelle et connectée. La mise en production à grande échelle peut nécessiter une validation technique complémentaire.',
    iaValidation: {
      title: 'L’IA accélère le développement. Vous gardez le contrôle.',
      rows: [
        { ia: 'Proposer un schéma de données', humain: 'Valider les règles métier' },
        { ia: 'Aider à connecter un service', humain: 'Vérifier confidentialité et droits' },
        { ia: 'Générer un document', humain: 'Contrôler le contenu avant utilisation' },
      ],
    },
    formatrice: {
      title: 'Laure Olivié',
      role: 'Formatrice IA spécialisée BTP',
      paragraphs: [
        'Plus de 10 ans d’expérience terrain dans les travaux publics et la conduite de chantier.',
        'J’accompagne les PME du BTP à créer des outils métier utiles, avec validation humaine sur les résultats sensibles.',
      ],
    },
    ctaFinal: {
      title: 'Vous avez déjà un prototype à faire évoluer ?',
      text: 'Présentez-moi votre outil et le processus que vous souhaitez connecter.',
      label: 'Réserver une visio de 30 minutes',
    },
  },
};

export const APPLICATION_METIER_NIVEAU_3: ApplicationMetierNiveauConfig = {
  ref: 'NIV-08',
  slug: 'application-metier-btp-niveau-3',
  path: LINKS.formationApplicationMetierBtpNiveau3,
  tarifKey: 'niveau-3',
  duree: '7 h',
  progressionLabel: 'Niveau 3 — INTÉGRER L’IA ET INDUSTRIALISER',
  progressionTagline:
    'Je transforme mon application en outil avancé intégrant intelligence artificielle, automatisations et workflows métier.',
  metaTitle: 'Application métier BTP IA : niveau 3',
  metaDescription:
    'Formation IA pour les pros du BTP : application métier BTP avec intelligence artificielle, automatisations et workflows. 7 h, Qualiopi, présentiel IDF.',
  h1: 'Développer une application métier BTP avancée avec l’IA',
  subtitle:
    'Intégrer des fonctionnalités avancées d’intelligence artificielle dans une application métier — analyse documentaire, workflows et déploiement.',
  positionnement:
    'Industrialiser une application métier avec IA intégrée, automatisations, sécurité et déploiement.',
  prerequis:
    'Être autonome dans la création d’une application simple, comprendre les principales briques techniques, maîtriser le niveau 2 ou disposer d’une expérience équivalente.',
  promesseRealiste:
    'Chaque participant intègre des briques IA et des automatisations dans son application, avec validation humaine sur les résultats sensibles.',
  objectifs: [
    'Structurer une application métier avancée (modules, données, automatisations)',
    'Intégrer l’IA pour analyser, extraire, classer, résumer et générer',
    'Exploiter des documents métier (import, extraction, recherche, comparaison)',
    'Construire un workflow IA avec contrôle humain',
    'Automatiser un processus complet (analyse, génération, notifications)',
    'Fiabiliser, sécuriser, déployer et maintenir l’application',
  ],
  modules: [
    {
      title: 'Structurer une application métier avancée',
      duree: '1 h',
      items: [
        'Architecture, modules, données et utilisateurs',
        'Documents, automatisations et dépendances',
      ],
    },
    {
      title: 'Intégrer une intelligence artificielle',
      duree: '1 h 15',
      items: [
        'Analyser, extraire, classer, résumer, comparer',
        'Générer et structurer des informations',
      ],
    },
    {
      title: 'Exploiter des documents métier',
      duree: '1 h 15',
      items: [
        'Import de documents et extraction d’informations',
        'Recherche, comparaison, analyse et structuration',
      ],
    },
    {
      title: 'Construire un workflow IA',
      duree: '1 h',
      items: [
        'Document → analyse → extraction → classification → génération',
        'Contrôle humain → résultat',
      ],
    },
    {
      title: 'Automatiser un processus complet',
      duree: '1 h',
      items: [
        'Déclencher analyse, génération, notifications',
        'Changement de statut, tâches et production de documents',
      ],
    },
    {
      title: 'Fiabiliser et sécuriser',
      duree: '1 h',
      items: [
        'Validation des données, droits et accès aux documents',
        'Clés API, données sensibles, erreurs, sauvegardes, principes RGPD',
      ],
    },
    {
      title: 'Déployer et maintenir',
      duree: '30 min',
      items: [
        'Environnement de production, tests, versionnement',
        'Mises à jour, sauvegardes et maintenance',
      ],
    },
  ],
  casUsageExemples: [
    {
      title: 'Assistant DCE + mémoire technique',
      items: [
        'Classement RC, CCAP, CCTP — extraction des contraintes',
        'Critères de notation et aide à la préparation du mémoire',
        'Validation finale par l’utilisateur',
      ],
    },
    {
      title: 'Assistant devis et métrés',
      items: ['Métré → ouvrages → quantités → chiffrage → devis'],
    },
    {
      title: 'Assistant trésorerie',
      items: ['Factures, échéances, prévision, alertes de tension'],
    },
    {
      title: 'Assistant communication digitale',
      items: ['Photos chantier → contenu → validation → calendrier éditorial'],
    },
    {
      title: 'Assistant chantier',
      items: [
        'Observation → photo → tâche → responsable → échéance → notification',
      ],
    },
  ],
  faq: [
    {
      q: 'Le niveau 3 est-il réservé aux appels d’offres ?',
      a: 'Non : l’assistant DCE est un exemple parmi d’autres. Le niveau 3 enseigne l’intégration de l’IA dans toute application métier (trésorerie, chantier, communication, etc.).',
    },
  ],
};

export const APPLICATION_METIER_NIVEAUX = [
  APPLICATION_METIER_NIVEAU_1,
  APPLICATION_METIER_NIVEAU_2,
  APPLICATION_METIER_NIVEAU_3,
] as const;

export function getApplicationMetierNiveauByRef(
  ref: 'NIV-06' | 'NIV-07' | 'NIV-08',
): ApplicationMetierNiveauConfig {
  const found = APPLICATION_METIER_NIVEAUX.find((n) => n.ref === ref);
  if (!found) throw new Error(`Niveau inconnu: ${ref}`);
  return found;
}

/** Cas d’usage illustratifs — page pilier (exemples, pas modules obligatoires). */
export const PARCOURS_CAS_USAGE_CARTES: readonly ApplicationMetierCasUsage[] = [
  {
    title: 'Devis et métrés',
    items: [
      'Clients, affaires, ouvrages, désignations, unités, quantités',
      'Prix, coefficients, marges, calculs et génération de devis',
    ],
  },
  {
    title: 'Analyse de DCE',
    items: [
      'RC, CCAP, CCTP, DPGF, BPU, annexes',
      'Extraction des exigences, dates, pénalités, critères de notation',
      'Contraintes, points de vigilance et incohérences',
    ],
  },
  {
    title: 'Assistant mémoire technique',
    items: [
      'DCE, bibliothèque entreprise, références, moyens humains et matériels',
      'Méthodologies, QSE et planning',
      'La validation finale du document reste réalisée par l’utilisateur',
    ],
  },
  {
    title: 'Gestion de chantier',
    items: [
      'Tâches, photos, observations, comptes rendus, réserves',
      'Échéances, documents, notifications et suivi d’avancement',
    ],
  },
  {
    title: 'Trésorerie',
    items: [
      'Encaissements, décaissements, factures, échéances',
      'Trésorerie prévisionnelle, alertes, relances et tableaux de bord',
    ],
  },
  {
    title: 'CRM BTP',
    items: [
      'Prospect → rendez-vous → devis → relance → commande → chantier',
    ],
  },
  {
    title: 'Communication digitale',
    items: [
      'Photos de chantier, réalisations, idées de contenus',
      'Publications, calendrier éditorial et références commerciales',
    ],
  },
  {
    title: 'Site web métier',
    items: [
      'Présentation, réalisations, formulaire contact, demande de devis',
      'Prise de rendez-vous, calendrier, messagerie, espace client',
      'Exemple de cas d’usage — pas un module pédagogique obligatoire',
    ],
  },
] as const;
