/**
 * Programmes BeWork — source unique des PDF, parcours 7 h / 14 h et modules.
 * Fichiers : `public/bework/programme-bework-parcours-*.pdf` (v1 — septembre 2026).
 * BeWork = marque d'OFC Création d'Entreprise (actions de formation).
 */

export const BEWORK_PROGRAMME_VERSION = 'Version 1 — septembre 2026' as const;

/** Titre court du programme (couverture PDF). */
export const BEWORK_FORMATION_TITRE =
  'Développement web avec l’IA — sans savoir coder' as const;

export type BeworkParcoursId = '7h' | '14h';

export type BeworkParcours = {
  id: BeworkParcoursId;
  title: string;
  intitule: string;
  dureeLabel: string;
  joursLabel: string;
  tarifHt: number;
  tarifLabel: string;
  effectif: string;
  pdfHref: string;
  pdfDownloadName: string;
  highlights: readonly string[];
  outcome: string;
};

export type BeworkModuleSequence = {
  title: string;
  points: readonly string[];
};

export type BeworkModule = {
  number: number;
  title: string;
  sequences: readonly BeworkModuleSequence[];
};

export type BeworkJourProgramme = {
  id: 'jour1' | 'jour2';
  label: string;
  subtitle: string;
  dureeLabel: string;
  modules: readonly BeworkModule[];
};

/** Jour 1 — commun aux parcours 7 h et 14 h. */
export const BEWORK_MODULES_JOUR1: BeworkJourProgramme = {
  id: 'jour1',
  label: 'Jour 1',
  subtitle: 'De l’idée à une première version fonctionnelle',
  dureeLabel: '7 h',
  modules: [
    {
      number: 1,
      title: 'Cadrer et préparer son projet',
      sequences: [
        {
          title: 'Cadrer son projet',
          points: [
            'Identifier les utilisateurs',
            'Clarifier le besoin ou le problème',
            'Définir les fonctionnalités principales',
            'Formaliser l’objectif du projet',
          ],
        },
        {
          title: 'Installer et prendre en main les outils',
          points: [
            'Installer et configurer l’environnement',
            'Créer et vérifier les comptes et accès',
            'Valider le bon fonctionnement avant de produire',
          ],
        },
        {
          title: 'Identifier le rôle de chaque outil',
          points: [
            'Distinguer assistant conversationnel et environnement de développement assisté par IA',
            'Comprendre le rôle de l’hébergement',
            'Choisir l’outil adapté à chaque étape',
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'Structurer son projet et guider efficacement l’IA',
      sequences: [
        {
          title: 'Appliquer une méthode de travail progressive avec l’IA',
          points: [
            'Décomposer le projet en étapes',
            'Formuler une demande précise à chaque étape',
            'Vérifier le résultat et ajuster les instructions',
          ],
        },
        {
          title: 'Structurer le périmètre fonctionnel',
          points: [
            'Organiser écrans, fonctions et parcours utilisateur',
            'Identifier les données principales',
            'Distinguer indispensable (V1) et évolutions futures',
          ],
        },
        {
          title: 'Rédiger des instructions efficaces',
          points: [
            'Structurer une consigne : rôle, contexte, objectif, contraintes, résultat attendu',
            'Comparer deux formulations pour un même besoin',
            'Repérer les erreurs fréquentes (demande vague ou trop large)',
          ],
        },
      ],
    },
    {
      number: 3,
      title: 'Construire une première version du projet',
      sequences: [
        {
          title: 'Structurer l’architecture du projet',
          points: [
            'Décomposer en éléments fonctionnels',
            'Définir l’ordre de construction',
            'Identifier les dépendances',
          ],
        },
        {
          title: 'Créer une première version',
          points: [
            'Générer une première version à partir du besoin structuré',
            'Vérifier la conformité avec la demande initiale',
            'Réaliser les premières modifications',
          ],
        },
        {
          title: 'Connecter les fonctionnalités',
          points: [
            'Mettre en place la navigation entre écrans',
            'Créer des formulaires simples',
            'Enregistrer et afficher les données nécessaires',
          ],
        },
      ],
    },
    {
      number: 4,
      title: 'Tester, corriger et pérenniser son projet',
      sequences: [
        {
          title: 'Tester, corriger et améliorer',
          points: [
            'Construire un scénario de test simple',
            'Décrire un problème et formuler une demande de correction',
            'Améliorer progressivement lisibilité et apparence',
          ],
        },
        {
          title: 'Sauvegarder et préparer la suite',
          points: [
            'Sauvegarder et conserver les versions',
            'Appliquer les précautions sur les données personnelles',
            'Élaborer une feuille de route personnelle',
          ],
        },
      ],
    },
  ],
};

/** Jour 2 — parcours 14 h uniquement. */
export const BEWORK_MODULES_JOUR2: BeworkJourProgramme = {
  id: 'jour2',
  label: 'Jour 2',
  subtitle: 'Finaliser, publier et faire évoluer son projet',
  dureeLabel: '7 h',
  modules: [
    {
      number: 1,
      title: 'Diagnostiquer et prioriser les améliorations',
      sequences: [
        {
          title: 'Réaliser un état des lieux du projet',
          points: [
            'Reprendre et tester la version du Jour 1',
            'Identifier écarts, manques et priorités',
          ],
        },
        {
          title: 'Définir les priorités d’amélioration',
          points: [
            'Classer corrections nécessaires et améliorations secondaires',
            'Organiser les prochaines étapes de la journée',
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'Améliorer et enrichir le projet',
      sequences: [
        {
          title: 'Corriger et améliorer la première version',
          points: [
            'Corriger les dysfonctionnements',
            'Améliorer parcours, contenus et affichage multi-écrans',
            'Tester chaque correction avant de poursuivre',
          ],
        },
        {
          title: 'Ajouter de nouvelles fonctionnalités',
          points: [
            'Ajouter une fonctionnalité à la fois',
            'Préserver ce qui fonctionne déjà',
            'Tester après chaque évolution',
          ],
        },
      ],
    },
    {
      number: 3,
      title: 'Préparer et publier le projet',
      sequences: [
        {
          title: 'Préparer la mise en ligne',
          points: [
            'Contrôler liens, formulaires et contenus',
            'Vérifier l’affichage sur différents formats',
            'Identifier les informations sensibles à ne pas exposer',
          ],
        },
        {
          title: 'Mettre le projet en ligne',
          points: [
            'Choisir et configurer l’hébergement',
            'Définir l’adresse d’accès et lancer la publication',
            'Effectuer les premiers tests sur la version en ligne',
          ],
        },
        {
          title: 'Précautions essentielles avant publication',
          points: [
            'Repérer les données personnelles utilisées',
            'Vérifier les productions générées par l’IA avant diffusion',
          ],
        },
      ],
    },
    {
      number: 4,
      title: 'Améliorer la visibilité et contrôler le projet publié',
      sequences: [
        {
          title: 'Bases du référencement d’un projet web',
          points: [
            'Titres, descriptions et structure des pages',
            'Optimiser adresses et images',
            'Repérer les freins courants au référencement',
          ],
        },
        {
          title: 'Vérifier l’indexation',
          points: [
            'Comprendre le principe d’indexation',
            'Déclarer le site et soumettre le plan de site si disponible',
          ],
        },
      ],
    },
    {
      number: 5,
      title: 'Tester la version publiée et préparer la suite',
      sequences: [
        {
          title: 'Réaliser un contrôle final',
          points: [
            'Parcourir le projet de bout en bout en ligne',
            'Contrôler liens, formulaires et affichages',
            'Consigner les anomalies restantes',
          ],
        },
        {
          title: 'Organiser la poursuite du projet',
          points: [
            'Hiérarchiser les améliorations restantes',
            'Élaborer une feuille de route personnelle',
            'Présenter la version publiée et les prochaines étapes',
          ],
        },
      ],
    },
  ],
};

export const BEWORK_PARCOURS = {
  '7h': {
    id: '7h',
    title: BEWORK_FORMATION_TITRE,
    intitule:
      'Développement web avec l’IA, sans savoir coder — de l’idée à une première version fonctionnelle',
    dureeLabel: '7 h',
    joursLabel: '1 journée',
    tarifHt: 300,
    tarifLabel: '300 €',
    effectif: '6 à 8 participants',
    pdfHref: '/bework/programme-bework-parcours-7h.pdf',
    pdfDownloadName: 'programme-bework-parcours-7h.pdf',
    highlights: [
      'Cadrer et préparer son projet',
      'Méthode de prompting structurée',
      'Première version fonctionnelle (70 % pratique)',
      'Tester, corriger et sauvegarder',
      'Feuille de route pour continuer après la journée',
    ],
    outcome: 'Vous repartez en sachant comment commencer.',
  },
  '14h': {
    id: '14h',
    title: 'Construire plus loin',
    intitule:
      'Développement web avec l’IA, sans savoir coder — de l’idée au projet publié et référencé',
    dureeLabel: '14 h',
    joursLabel: '2 journées',
    tarifHt: 600,
    tarifLabel: '600 €',
    effectif: '6 à 8 participants',
    pdfHref: '/bework/programme-bework-parcours-14h.pdf',
    pdfDownloadName: 'programme-bework-parcours-14h.pdf',
    highlights: [
      'Tout le parcours 7 h (Jour 1)',
      'Jour 2 : améliorer, publier et référencer',
      'Projet plus approfondi et mis en ligne',
      'Fonctionnalités supplémentaires',
      'Tests, corrections et accompagnement renforcé',
    ],
    outcome: 'Vous avez le temps de construire, tester, corriger et aller plus loin.',
  },
} as const satisfies Record<BeworkParcoursId, BeworkParcours>;

export const BEWORK_PARCOURS_LIST = [
  BEWORK_PARCOURS['7h'],
  BEWORK_PARCOURS['14h'],
] as const;
