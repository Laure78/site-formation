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
  metaTitle: 'Créer application métier BTP IA : niveau 1',
  metaDescription:
    'Formation IA pour le BTP : créer une application métier avec l’IA, du besoin au prototype fonctionnel. 7 h, présentiel, Qualiopi, financement selon éligibilité.',
  h1: 'Créer sa première application métier BTP avec l’IA',
  subtitle:
    'Découvrir la méthode pour transformer un problème métier en prototype fonctionnel — sans compétence préalable en programmation.',
  positionnement:
    'Découvrir la méthode permettant de transformer un problème métier en prototype fonctionnel, avec le développement assisté par l’intelligence artificielle.',
  prerequis:
    'Aucune compétence préalable en programmation. Une pratique courante de l’intelligence artificielle générative est recommandée.',
  promesseRealiste:
    'Chaque participant développe un prototype fonctionnel ou le socle de son application métier.',
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
      q: 'Vais-je repartir avec une application terminée ?',
      a: 'Non : en 7 heures, l’objectif est un prototype fonctionnel ou le socle de votre application métier — pas une application professionnelle complète.',
    },
    {
      q: 'Quels outils sont utilisés ?',
      a: 'La formation enseigne le développement assisté par l’IA et les outils de développement IA du moment, sans dépendre d’un logiciel particulier. La compétence reste transférable si les outils évoluent.',
    },
  ],
};

export const APPLICATION_METIER_NIVEAU_2: ApplicationMetierNiveauConfig = {
  ref: 'NIV-07',
  slug: 'application-metier-btp-niveau-2',
  path: LINKS.formationApplicationMetierBtpNiveau2,
  tarifKey: 'niveau-2',
  duree: '7 h',
  progressionLabel: 'Niveau 2 — CONNECTER',
  progressionTagline: 'Je transforme mon prototype en application métier connectée.',
  metaTitle: 'Application métier BTP connectée : niveau 2',
  metaDescription:
    'Formation IA appliquée au bâtiment : développer une application métier BTP connectée (BDD, utilisateurs, API). 7 h, Qualiopi, financement selon éligibilité.',
  h1: 'Développer une application métier BTP connectée',
  subtitle:
    'Transformer un prototype en application capable de gérer des données, plusieurs utilisateurs et des services externes.',
  positionnement:
    'Passer du prototype à une application métier connectée : base de données, utilisateurs, workflows et services externes.',
  prerequis:
    'Avoir suivi le niveau 1 ou maîtriser les compétences équivalentes (prototype, cahier des charges, premières fonctionnalités).',
  promesseRealiste:
    'Chaque participant fait évoluer son prototype vers une application connectée avec données persistantes et accès utilisateurs.',
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
  casUsageExemples: [
    {
      title: 'Site web professionnel',
      items: [
        'Formulaires, demande de devis, calendrier',
        'Prise de rendez-vous, messagerie, espace client',
      ],
    },
    {
      title: 'Application devis et métrés',
      items: ['Clients, ouvrages, quantités, prix', 'Calculs, marges, génération du devis'],
    },
    {
      title: 'Application de trésorerie',
      items: ['Encaissements, décaissements, échéances', 'Prévisions et alertes'],
    },
    {
      title: 'CRM BTP',
      items: ['Prospects, rendez-vous, devis, relances', 'Affaires et suivi commercial'],
    },
    {
      title: 'Communication digitale',
      items: [
        'Photos chantier, bibliothèque de contenus',
        'Calendrier éditorial, validation et suivi',
      ],
    },
  ],
  faq: [
    {
      q: 'Les cas d’usage (CRM, trésorerie…) sont-ils des modules obligatoires ?',
      a: 'Non : ce sont des exemples illustrant les compétences transversales enseignées. Vous appliquez la méthode à votre propre processus métier.',
    },
  ],
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
