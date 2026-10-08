/**
 * Contenu — formation NIV-10 : créer son ERP BTP sur mesure et évolutif avec l’IA.
 * Parcours 7 h / 14 h — tarifs alignés `lib/bework-programmes.ts` (source tarifaire).
 */
import { getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_PARCOURS } from '@/lib/bework-programmes';
import { formatTarifHt } from '@/lib/tarifs-sessions';

export const DEV_WEB_IA_PATH = LINKS.formationDeveloppementWebIaSansCoder;
export const DEV_WEB_IA_CODE = 'NIV-10' as const;

/** Intitulé officiel catalogue / Qualiopi — source `data/formations.ts` (NIV-10). */
export const DEV_WEB_IA_FORMATION_TITRE = getFormationByCode('NIV-10')!.titre;

/** Menus et libellés courts (catalogue, navigation, breadcrumb, footer). */
export const DEV_WEB_IA_FORMATION_TITRE_COURT = 'Créer des applications métier BTP avec l’IA' as const;

/** Tarifs inter — source unique. */
export const TARIF_INTER_DEV_WEB_IA_HT = BEWORK_PARCOURS['7h'].tarifHt;
export const TARIF_INTER_DEV_WEB_IA_14H_HT = BEWORK_PARCOURS['14h'].tarifHt;

export const DEV_WEB_IA_PARCOURS_7H = BEWORK_PARCOURS['7h'];
export const DEV_WEB_IA_PARCOURS_14H = BEWORK_PARCOURS['14h'];

export const DEV_WEB_IA_PDF_7H_HREF = LINKS.pdfProgrammeDeveloppementWebIaSansCoder;
export const DEV_WEB_IA_PDF_14H_HREF = LINKS.pdfProgrammeDeveloppementWebIaSansCoder14h;

export const PROGRAMME_PDF_7H = 'programme_OFC_Niveau3_Outils_Chantier_IA_7h_20261008.pdf' as const;
export const PROGRAMME_PDF_14H = 'programme_OFC_Niveau3_Outils_Chantier_IA_14h_20261008.pdf' as const;

export const DEV_WEB_IA_BADGE_NOUVELLE = 'Nouvelle formation' as const;
export const DEV_WEB_IA_BADGE_NOUVEAU = 'Nouveau' as const;
export const DEV_WEB_IA_PRIX_LANCEMENT_LABEL = 'Prix de lancement' as const;

export const DEV_WEB_IA_FINANCEMENT_MENTION =
  'Prise en charge OPCO/Constructys selon éligibilité — un reste à charge peut s’appliquer.' as const;

export const DEV_WEB_IA_SUBTITLE =
  'Concevez votre ERP sur mesure, testez-le et faites-le évoluer — sans savoir coder.' as const;

export const DEV_WEB_IA_INTRO =
  'Une idée, une journée, une première version fonctionnelle. Vos informations sont réparties entre Excel, les emails et plusieurs logiciels ? Cette formation vous apprend à concevoir et construire une première version d’outil métier avec l’IA — devis, chantiers, planning — sans écrire de code.' as const;

export const DEV_WEB_IA_ERP_DEFINITION =
  'Un outil métier centralise les informations utiles à votre activité. Vous commencez par un besoin prioritaire, puis vous enrichissez progressivement les fonctions, en testant chaque évolution.' as const;

export const DEV_WEB_IA_HERO_REASSURANCES = [
  'Niveau 3 — création, dans une progression en trois niveaux',
  'Vous partez d’un besoin concret de votre entreprise',
  'Aucune compétence en programmation requise',
] as const;

export const DEV_WEB_IA_HERO_FACTS = [
  '7 h (1 journée)',
  '9h00 – 12h30 · 13h30 – 17h00',
  'Présentiel Île-de-France uniquement',
  '4 à 8 participants',
  '70 % pratique · 30 % méthodologie',
] as const;

export const DEV_WEB_IA_DUREE_COURTE = '7 h' as const;

export const DEV_WEB_IA_CTA_PRIMARY_LABEL = 'Échanger sur votre projet de formation' as const;
export const DEV_WEB_IA_CTA_SECONDARY_LABEL = 'Demander une place' as const;

export const DEV_WEB_IA_INCLUS_TARIF = [
  'l’animation de la formation',
  'les supports pédagogiques',
  'l’accès aux ressources prévues',
  'les exercices pratiques',
  'les évaluations prévues dans le programme',
] as const;

export const DEV_WEB_IA_FORMATS = [
  'Présentiel en Île-de-France uniquement (inter-entreprises ou intra dans vos locaux)',
  'Tarif HT / participant — 4 à 8 participants',
] as const;

export const DEV_WEB_IA_MODALITES_SECTION = {
  eyebrow: 'Modalités',
  title: 'Présentiel en Île-de-France uniquement.',
  lead: 'Sessions en inter-entreprises à dates programmées, ou en intra dans vos locaux. Petit groupe (4 à 8), accompagnement de proximité tout au long de la pratique.',
  compareLabel: 'Voir les tarifs',
  compareHref: '#tarifs-modalites',
} as const;

export const DEV_WEB_IA_MODALITES = [
  {
    id: 'presentiel',
    title: 'Présentiel',
    badge: 'Île-de-France uniquement',
    desc: 'En inter-entreprises à dates programmées, ou en intra dans vos locaux. Petit groupe (4 à 8), accompagnement de proximité tout au long de la pratique.',
  },
] as const;

export const DEV_WEB_IA_QUALIOPI_ENGAGEMENTS = [
  {
    num: '01',
    title: 'Apprendre en pratiquant',
    desc: 'Pédagogie active autour de votre projet d’ERP : démonstrations courtes, ateliers guidés, production individuelle.',
  },
  {
    num: '02',
    title: 'Un accompagnement personnalisé',
    desc: 'Groupes limités à 4 à 8 participants pour des allers-retours pédagogiques réguliers.',
  },
  {
    num: '03',
    title: 'Une progression évaluée',
    desc: 'Objectifs identifiés, évaluation des acquis via le projet réalisé et questionnaire de satisfaction.',
  },
  {
    num: '04',
    title: 'Des ressources pour continuer',
    desc: 'Supports, fiches méthode et accès à l’espace apprenant pour poursuivre après la session.',
  },
] as const;

export const DEV_WEB_IA_PARCOURS_INTRO = {
  eyebrow: 'Formats 7 h et 14 h',
  titleLine1: 'Combien coûtent les formats',
  titleLine2: '7 h et 14 h ?',
  lead: 'Une première journée (7 h) pour cadrer le besoin, choisir un module métier et construire une première version fonctionnelle. Une deuxième journée (7 h supplémentaires) pour approfondir, relier les modules utiles et préparer le déploiement progressif.',
} as const;

export const DEV_WEB_IA_PARCOURS_MARKETING = {
  '7h': {
    label: 'Parcours 7 h — 1 journée',
    title: 'Construire une première version fonctionnelle',
    desc: 'Cadrer votre projet d’ERP BTP, choisir une fonction prioritaire et construire une première version utilisable avec l’IA.',
    badge14h: null as string | null,
    highlights: [
      'Cadrer son ERP BTP',
      'Construire le premier module avec l’IA',
      'Créer les règles de gestion',
      'Tester et préparer la suite',
    ],
    outcome: 'Vous repartez avec une première version fonctionnelle et une feuille de route.',
  },
  '14h': {
    label: 'Parcours 14 h — 2 journées',
    title: 'Construire, approfondir et relier son ERP',
    desc: 'Le Jour 1 reprend le parcours 7 h. Le Jour 2 sert à améliorer, relier les modules et préparer le déploiement.',
    badge14h: 'Comprend le parcours 7 h',
    highlights: [
      'Tout le parcours 7 h (Jour 1)',
      'Améliorer et enrichir le module',
      'Relier plusieurs modules',
      'Préparer validations, exports et accès',
      'Tester et préparer le déploiement',
    ],
    outcome: 'Vous avez le temps d’approfondir, connecter et sécuriser l’outil.',
  },
} as const;

export const DEV_WEB_IA_JOUR_RESUME = {
  jour1: {
    label: 'Jour 1 — Construire la première version',
    closing: 'Jour 1 — Je cadre mon besoin et je construis mon premier module.',
    points: [
      'Cadrage du projet d’ERP BTP',
      'Construction du premier module avec l’IA',
      'Règles de gestion',
      'Tests et feuille de route',
    ],
  },
  jour2: {
    label: 'Jour 2 — Approfondir et préparer le déploiement',
    closing: 'Jour 2 — J’améliore, je relie et je prépare le déploiement.',
    points: [
      'Diagnostiquer et prioriser les améliorations',
      'Améliorer et enrichir le module',
      'Relier plusieurs modules',
      'Préparer validations, exports et accès',
      'Tester et préparer le déploiement',
    ],
  },
} as const;

/** Introduction section programme (H2 + lead + formats). */
export const DEV_WEB_IA_PROGRAMME_SECTION = {
  title: 'Construire son ERP BTP avec l’IA',
  paragraphs: [
    'Une formation pratique construite autour de votre propre projet.',
    'Vous partez de vos méthodes de travail, de vos fichiers et de vos besoins pour concevoir progressivement un outil de gestion adapté à votre entreprise.',
  ],
  formats: [
    {
      id: '7h' as const,
      label: 'Parcours 7 h',
      summary: 'Concevoir et construire une première version fonctionnelle',
    },
    {
      id: '14h' as const,
      label: 'Parcours 14 h',
      summary: 'Approfondir, relier les modules et préparer le déploiement',
    },
  ],
  disclaimer:
    'Le résultat dépend de votre niveau, de la complexité du projet, du nombre de fonctionnalités, des données disponibles et des intégrations nécessaires. La formation permet de concevoir une première version fonctionnelle et évolutive — pas un ERP complet terminé.',
} as const;

export const DEV_WEB_IA_PUBLIC_PRINCIPAL =
  'Dirigeants de TPE et PME du BTP · Conducteurs de travaux et chargés d’affaires · Assistant(e)s travaux et fonctions support du bâtiment · Indépendants du second œuvre.' as const;

export const DEV_WEB_IA_PUBLIC_EGALEMENT =
  'Toute personne qui pilote ou organise la gestion d’une entreprise du bâtiment et souhaite créer un outil métier adapté à ses processus.' as const;

export const DEV_WEB_IA_PUBLIC = [
  'Dirigeants de TPE et PME du BTP',
  'Conducteurs de travaux et chargés d’affaires',
  'Assistant(e)s travaux et fonctions support',
  'Indépendants du second œuvre',
] as const;

export const DEV_WEB_IA_PREREQUIS = [
  'Savoir utiliser un ordinateur',
  'Savoir naviguer sur Internet',
  'Disposer d’une adresse email',
  'Pouvoir installer des applications sur son ordinateur',
  'Disposer d’un abonnement actif à ChatGPT ou Claude AI',
  'Avoir vérifié ses accès avant la formation',
] as const;

/** Objectifs pédagogiques observables — page marketing (PDF à aligner). */
export const DEV_WEB_IA_OBJECTIFS = [
  'Cartographier un processus de gestion de votre entreprise',
  'Choisir le premier module à construire',
  'Structurer les données et les relations entre les modules',
  'Définir les utilisateurs et leurs droits d’accès',
  'Guider l’IA avec des consignes précises',
  'Construire et tester une première version',
  'Préparer les exports nécessaires',
  'Sauvegarder le projet et organiser ses évolutions',
] as const;

export const DEV_WEB_IA_BENEFICES = [
  {
    title: 'Centraliser les informations',
    texte: 'Rassembler au même endroit les données utiles à la gestion de l’entreprise.',
  },
  {
    title: 'Limiter les doubles saisies',
    texte: 'Réduire les ressaisies entre Excel, emails et logiciels séparés.',
  },
  {
    title: 'Relier bureau et chantier',
    texte: 'Faire circuler les informations entre le bureau et les équipes de terrain.',
  },
  {
    title: 'Suivre heures et coûts',
    texte: 'Suivre les heures et les coûts par chantier à partir des données saisies.',
  },
  {
    title: 'Adapter écrans et validations',
    texte: 'Définir les écrans et les circuits de validation selon votre organisation.',
  },
  {
    title: 'Ajouter des modules',
    texte: 'Enrichir l’outil au fil des besoins, module après module.',
  },
] as const;

export type DevWebIaErpModule = {
  id: string;
  number: number;
  title: string;
  description: string;
  useCases: readonly string[];
  highlighted?: boolean;
  disclaimer?: string;
};

/** Modules métier possibles de l’ERP — pistes fonctionnelles, pas un programme pédagogique obligatoire. */
export const DEV_WEB_IA_ERP_MODULES_SECTION = {
  title: 'Choisissez les modules utiles à votre entreprise',
  subtitle:
    'L’objectif n’est pas de tout construire en une journée. Vous identifiez les fonctions prioritaires puis développez progressivement votre ERP.',
  note: 'Ces 8 briques sont des modules fonctionnels possibles d’un logiciel de gestion BTP sur mesure — pas 8 modules à réaliser pendant la formation.',
} as const;

export const DEV_WEB_IA_ERP_MODULES: readonly DevWebIaErpModule[] = [
  {
    id: 'clients-commercial',
    number: 1,
    title: 'Clients et suivi commercial',
    description: 'Contacts, prospects, échanges, opportunités, relances et historique commercial.',
    useCases: [
      'Centraliser les coordonnées clients',
      'Suivre les demandes de devis',
      'Mémoriser les échanges',
      'Programmer les relances',
      'Suivre les opportunités commerciales',
    ],
  },
  {
    id: 'visites-metres',
    number: 2,
    title: 'Visites et métrés',
    description: 'Préparer les visites chantier et centraliser les informations nécessaires au chiffrage.',
    useCases: [
      'Créer une fiche de visite',
      'Enregistrer les dimensions',
      'Ajouter des photos',
      'Noter les contraintes d’accès',
      'Préparer les informations nécessaires au devis',
    ],
  },
  {
    id: 'devis-facturation',
    number: 3,
    title: 'Devis et suivi de facturation',
    description:
      'Structurer ses prestations, préparer ses devis et suivre les montants facturés ou restant à facturer.',
    useCases: [
      'Bibliothèque d’ouvrages et prestations',
      'Création d’un devis',
      'Calcul des quantités et montants',
      'Suivi des devis acceptés ou refusés',
      'Suivi des situations et règlements',
    ],
    disclaimer:
      'Les fonctions de facturation doivent être vérifiées au regard des obligations réglementaires et comptables applicables avant toute utilisation réelle.',
  },
  {
    id: 'suivi-chantier',
    number: 4,
    title: 'Suivi de chantier',
    description: 'Centraliser l’avancement du chantier et les informations terrain.',
    useCases: [
      'Suivi de l’avancement',
      'Comptes rendus',
      'Photos chantier',
      'Documents et réserves',
      'Tâches et observations du conducteur de travaux',
    ],
  },
  {
    id: 'planning',
    number: 5,
    title: 'Planning',
    description: 'Organiser les équipes, les interventions et les moyens nécessaires aux chantiers.',
    useCases: [
      'Affectation des salariés',
      'Planning hebdomadaire',
      'Disponibilités',
      'Matériel et interventions',
      'Visualisation par chantier',
    ],
  },
  {
    id: 'heures-paie',
    number: 6,
    title: 'Relevé des heures et préparation de la paie',
    description:
      'Saisir et valider les heures réalisées par chantier avant transmission au gestionnaire de paie.',
    highlighted: true,
    useCases: [
      'Saisie quotidienne ou hebdomadaire',
      'Heures par salarié et par chantier',
      'Validation du chef d’équipe',
      'Récapitulatif mensuel',
      'Export pour le gestionnaire de paie',
    ],
  },
  {
    id: 'achats-depenses',
    number: 7,
    title: 'Achats et dépenses',
    description: 'Suivre les commandes, fournisseurs et dépenses affectées aux chantiers.',
    useCases: [
      'Fournisseurs et commandes',
      'Matériaux et locations',
      'Dépenses chantier',
      'Comparaison budget / dépenses',
    ],
  },
  {
    id: 'tableau-de-bord',
    number: 8,
    title: 'Tableau de bord',
    description: 'Regrouper les indicateurs essentiels pour piloter l’activité.',
    useCases: [
      'Heures prévues / réalisées',
      'Dépenses et avancement chantier',
      'Devis en attente',
      'Chiffre d’affaires suivi',
      'Indicateurs par chantier',
    ],
  },
] as const;

/** @deprecated Conservé pour compatibilité éventuelle — préférer DEV_WEB_IA_FIL_ROUGE. */
export const DEV_WEB_IA_HEURES_FONCTIONS = [
  'Salarié, date et chantier',
  'Horaires de début et de fin, pauses et durée travaillée',
  'Répartition des heures entre plusieurs chantiers',
  'Absences et commentaires',
  'Éléments déclarés utiles à la préparation de la paie',
  'Statuts : brouillon, soumis, validé, à corriger',
  'Récapitulatif hebdomadaire ou mensuel',
  'Export CSV ou Excel pour le gestionnaire de paie',
] as const;

/** @deprecated Conservé pour compatibilité éventuelle — préférer DEV_WEB_IA_FIL_ROUGE. */
export const DEV_WEB_IA_HEURES_PARCOURS = [
  'Saisie sur chantier',
  'Contrôle',
  'Validation',
  'Export pour préparation de la paie',
] as const;

export const DEV_WEB_IA_EVOLUTIF_POINTS = [
  {
    title: 'Données partagées',
    texte: 'Les modules s’appuient sur des données communes (chantiers, équipes, clients).',
  },
  {
    title: 'Ajout progressif',
    texte: 'Vous ajoutez des fonctions au fur et à mesure, sans tout reconstruire.',
  },
  {
    title: 'Sauvegardes et versions',
    texte: 'Vous conservez un historique des versions avant chaque évolution importante.',
  },
  {
    title: 'Contrôle des accès',
    texte: 'Vous définissez qui consulte, saisit ou valide selon le rôle.',
  },
  {
    title: 'Tests après chaque évolution',
    texte: 'Chaque modification est testée avant d’être utilisée par l’équipe.',
  },
  {
    title: 'Hébergement et maintenance',
    texte: 'Vous anticipez les coûts d’hébergement et la maintenance de l’outil.',
  },
] as const;

export type DevWebIaModule = {
  number: number;
  title: string;
  points: readonly string[];
  objective?: string;
  useCaseIntro?: string;
  useCaseItems?: readonly string[];
  flow?: readonly string[];
  result?: string;
};

export type DevWebIaProgrammeModule = {
  number: number;
  title: string;
  objective: string;
  activities: readonly string[];
  result: string;
  examples?: readonly string[];
  filRougeLabel?: string;
  filRougeSteps?: readonly string[];
  processExample?: readonly string[];
};

export const DEV_WEB_IA_PARCOURS_7H_SECTION = {
  title: 'Parcours 7 h — Construire une première version fonctionnelle',
  intro:
    'Une journée de travail sur votre propre projet d’ERP BTP. L’objectif est de cadrer votre besoin, choisir une fonction prioritaire, construire une première version utilisable et définir la suite du développement.',
} as const;

/** Programme parcours 7 h / Jour 1 du parcours 14 h — 4 étapes. */
export const DEV_WEB_IA_MODULES: readonly DevWebIaProgrammeModule[] = [
  {
    number: 1,
    title: 'Cadrer son ERP BTP',
    objective: 'Transformer un besoin métier en projet concret.',
    activities: [
      'Cartographier le processus actuel',
      'Identifier les tâches répétitives',
      'Définir les utilisateurs',
      'Déterminer les droits d’accès',
      'Identifier les données nécessaires',
      'Choisir le premier module à développer',
    ],
    examples: [
      'Relevé d’heures',
      'Devis',
      'Suivi chantier',
      'Visites et métrés',
      'Planning',
    ],
    result: 'Un périmètre clair et un premier module prioritaire.',
  },
  {
    number: 2,
    title: 'Construire le premier module avec l’IA',
    objective: 'Créer une première version fonctionnelle à partir du besoin défini.',
    activities: [
      'Structurer les données',
      'Créer les écrans',
      'Créer les formulaires',
      'Construire les principales fonctionnalités',
      'Utiliser l’IA pour générer et améliorer le code',
      'Tester progressivement chaque fonction',
    ],
    filRougeLabel: 'Exemple fil rouge recommandé — relevé des heures chantier',
    filRougeSteps: [
      'Salarié',
      'Chantier',
      'Date',
      'Nombre d’heures',
      'Commentaire',
      'Validation',
      'Récapitulatif',
    ],
    result: 'Une première fonctionnalité métier utilisable.',
  },
  {
    number: 3,
    title: 'Créer les règles de gestion',
    objective: 'Transformer une simple interface en véritable outil métier.',
    activities: [
      'Statuts',
      'Validations',
      'Droits utilisateurs',
      'Calculs',
      'Filtres',
      'Exports',
      'Contrôles',
      'Gestion des informations sensibles',
    ],
    processExample: [
      'Chef d’équipe → saisit les heures',
      'Conducteur de travaux → contrôle',
      'Bureau → valide',
      'Gestionnaire de paie → reçoit l’export',
    ],
    result: 'Un processus cohérent avec l’organisation réelle de l’entreprise.',
  },
  {
    number: 4,
    title: 'Tester et préparer la suite',
    objective: 'Fiabiliser la première version et organiser son évolution.',
    activities: [
      'Tests ordinateur et mobile',
      'Contrôle des formulaires',
      'Vérification des parcours utilisateurs',
      'Correction des principales anomalies',
      'Sauvegarde',
      'Liste des évolutions',
      'Priorisation du prochain module',
    ],
    result: 'Une première version fonctionnelle et une feuille de route pour continuer.',
  },
];

export const DEV_WEB_IA_PARCOURS_14H_SECTION = {
  title: 'Parcours 14 h — Construire, approfondir et relier son ERP',
  intro:
    'Le parcours 14 h reprend l’intégralité du programme de 7 h puis ajoute une deuxième journée consacrée à l’amélioration de l’outil, aux connexions entre modules et à la préparation du déploiement.',
  jour1Label: 'Jour 1 — Construire la première version',
  jour1Duree: '7 h',
  jour2Label: 'Jour 2 — Approfondir et préparer le déploiement',
  jour2Duree: '7 h',
  jour1Resume: [
    'Cadrage',
    'Construction du premier module',
    'Règles de gestion',
    'Tests',
    'Feuille de route',
  ],
  outcome:
    'Une version plus aboutie de l’ERP, plusieurs fonctions éventuellement reliées et une feuille de route claire pour poursuivre le développement.',
} as const;

/** Programme Jour 2 — parcours 14 h. */
export const DEV_WEB_IA_MODULES_JOUR2: readonly DevWebIaModule[] = [
  {
    number: 1,
    title: 'Diagnostiquer et prioriser les améliorations',
    points: [
      'Reprendre la version créée lors du Jour 1',
      'Tester les principales fonctionnalités',
      'Identifier les erreurs',
      'Identifier les fonctionnalités manquantes',
      'Distinguer les corrections prioritaires des évolutions secondaires',
    ],
    useCaseIntro: 'Le relevé d’heures fonctionne mais il manque :',
    useCaseItems: [
      'Validation',
      'Filtre par chantier',
      'Export mensuel',
      'Droits utilisateurs',
    ],
  },
  {
    number: 2,
    title: 'Améliorer et enrichir le module',
    points: [
      'Corriger les dysfonctionnements',
      'Améliorer l’interface',
      'Ajouter des contrôles',
      'Enrichir les données',
      'Préserver les informations déjà enregistrées',
      'Améliorer l’usage mobile',
    ],
  },
  {
    number: 3,
    title: 'Relier plusieurs modules',
    objective: 'Éviter les doubles saisies.',
    points: [
      'Transformer un devis accepté en chantier',
      'Rattacher les heures à un chantier existant',
      'Rattacher les dépenses au chantier',
      'Faire remonter les informations dans le tableau de bord',
    ],
    flow: ['Client', 'Devis', 'Chantier', 'Heures', 'Dépenses', 'Tableau de bord'],
  },
  {
    number: 4,
    title: 'Préparer validations, exports et accès',
    points: [
      'Circuits brouillon / soumis / validé',
      'Profils utilisateurs',
      'Droits d’accès',
      'Données sensibles',
      'Exports Excel / CSV / PDF selon le projet',
      'Informations destinées au bureau ou au gestionnaire de paie',
    ],
  },
  {
    number: 5,
    title: 'Tester et préparer le déploiement',
    points: [
      'Tester les parcours principaux',
      'Tester ordinateur et téléphone',
      'Contrôler les liens',
      'Vérifier les formulaires',
      'Documenter les anomalies restantes',
      'Organiser les sauvegardes',
      'Définir les prochaines évolutions',
    ],
  },
];

export const DEV_WEB_IA_CAS_USAGE_SECTION = {
  title: 'Exemples d’ERP que vous pouvez commencer à construire',
  lead: 'Des enchaînements concrets pour un outil de gestion BTP — chaque participant part de son propre projet.',
} as const;

export const DEV_WEB_IA_CAS_USAGE = [
  {
    id: 'heures',
    title: 'Relevé des heures chantier',
    steps: ['Salariés', 'Chantiers', 'Heures', 'Validation', 'Export paie'],
  },
  {
    id: 'crm',
    title: 'CRM et suivi commercial',
    steps: ['Prospect', 'Demande', 'Visite', 'Devis', 'Relance', 'Chantier'],
  },
  {
    id: 'visites',
    title: 'Visites et métrés',
    steps: ['Adresse', 'Photos', 'Mesures', 'Contraintes', 'Prestations', 'Préparation du devis'],
  },
  {
    id: 'suivi',
    title: 'Suivi chantier',
    steps: ['Chantier', 'Avancement', 'Photos', 'Compte rendu', 'Réserves', 'Documents'],
  },
  {
    id: 'planning',
    title: 'Planning équipes',
    steps: ['Chantiers', 'Salariés', 'Disponibilités', 'Affectations', 'Vue semaine'],
  },
  {
    id: 'pilotage',
    title: 'Pilotage de chantier',
    steps: ['Budget', 'Heures', 'Achats', 'Avancement', 'Écarts', 'Tableau de bord'],
  },
] as const;

export const DEV_WEB_IA_FIL_ROUGE = {
  title: 'Exemple : créer un module de relevé des heures',
  lead: 'Un fil rouge fréquent pour créer son logiciel BTP avec l’IA — préparation des éléments à transmettre au gestionnaire de paie.',
  steps: [
    'Création des salariés',
    'Création des chantiers',
    'Saisie des heures sur mobile',
    'Validation par le responsable',
    'Récapitulatif par salarié',
    'Récapitulatif par chantier',
    'Export mensuel',
    'Préparation des éléments à transmettre au gestionnaire de paie',
  ],
  closing:
    'Ce premier module peut ensuite être connecté au planning, aux chantiers, aux dépenses et au tableau de bord.',
} as const;

export const DEV_WEB_IA_FORMAT_COMPARATIF = {
  title: 'Quel format choisir ?',
  tagline: '7 h = construire · 14 h = construire + approfondir + connecter + sécuriser',
  parcours7h: {
    title: 'Parcours 7 h',
    ideals: [
      'Démarrer son projet',
      'Cadrer son besoin',
      'Construire un premier module',
      'Apprendre la méthode',
      'Obtenir une première version fonctionnelle',
    ],
  },
  parcours14h: {
    title: 'Parcours 14 h',
    ideals: [
      'Aller plus loin',
      'Améliorer la première version',
      'Relier plusieurs fonctions',
      'Structurer les accès',
      'Préparer les exports',
      'Fiabiliser l’outil',
      'Préparer son déploiement',
    ],
  },
} as const;

export const DEV_WEB_IA_LIVRABLES = [
  'Environnement de travail vérifié',
  'Projet d’ERP BTP cadré et premier module priorisé',
  'Première version fonctionnelle (évolutive, non prête pour l’exploitation)',
  'Méthode pour guider, tester et corriger avec l’IA',
  'Projet sauvegardé et feuille de route d’évolution',
  'Certificat de réalisation',
] as const;

export const DEV_WEB_IA_LIVRABLES_14H = [
  ...DEV_WEB_IA_LIVRABLES,
  'module approfondi et éventuellement relié à d’autres fonctions',
  'validations, exports et accès travaillés',
  'conditions d’un déploiement progressif préparées',
] as const;

export const DEV_WEB_IA_PEDAGOGIE = [
  'Fil rouge sur le projet d’ERP de chaque participant — pas sur un cas générique',
  'Courtes démonstrations, ateliers guidés puis travail individuel sur poste',
  'Tests et corrections en direct, avec échanges pédagogiques pendant la session',
  'Petit groupe (4 à 8 participants) pour des allers-retours réguliers',
] as const;

export const DEV_WEB_IA_ESPACE = [
  'Supports de formation',
  'Fiches méthodologiques',
  'Ressources complémentaires',
  'Supports liés au prompting',
] as const;

export const DEV_WEB_IA_EVALUATION = [
  'Avant : questionnaire d’analyse du besoin et de positionnement',
  'Pendant : évaluation à travers le projet réalisé par le participant',
  'En fin : présentation de la production, évaluation des acquis, questionnaire de satisfaction',
  'Suivi : enquête à froid à 3 mois',
] as const;

export const DEV_WEB_IA_DONNEES_CONTROLE = [
  'On travaille avec des données fictives ou anonymisées pendant la session.',
  'Vous apprenez à repérer ce qui ne doit jamais être exposé (coordonnées clients, données salariés, prix).',
  'Vous restez propriétaire de votre outil et de son contenu.',
] as const;

export const DEV_WEB_IA_FAQ = [
  {
    q: 'Faut-il savoir coder ?',
    a: 'Non. Aucun prérequis en programmation n’est nécessaire. Vous décrivez votre besoin, guidez l’IA, testez le résultat et corrigez — sans devenir développeur.',
  },
  {
    q: 'Peut-on commencer par les relevés d’heures ?',
    a: 'Oui. Les relevés d’heures pour préparer la paie sont un module prioritaire fréquent. Pendant la formation, vous travaillez sur le périmètre adapté à votre niveau et à la durée choisie.',
  },
  {
    q: 'Peut-on faire évoluer son ERP après la formation ?',
    a: 'Oui. Vous repartez avec une méthode et une feuille de route pour ajouter des modules, tester les modifications et conserver les données existantes.',
  },
  {
    q: 'Peut-on importer des fichiers Excel ?',
    a: 'Souvent, oui, selon le format de vos fichiers et le module construit. Les imports dépendent des outils utilisés ; nous voyons les options réalistes en session.',
  },
  {
    q: 'Peut-on transmettre les heures au gestionnaire de paie ?',
    a: 'Oui, via un export CSV ou Excel au format convenu. L’outil prépare les données ; les règles de calcul et les éléments de paie restent à paramétrer et à valider avec le gestionnaire de paie.',
  },
  {
    q: 'L’ERP est-il prêt à être utilisé à la fin de la formation ?',
    a: 'Non. Vous repartez avec une première version fonctionnelle et évolutive, une méthode et une feuille de route. Le résultat dépend de votre niveau, de la complexité du projet et des intégrations nécessaires — pas d’ERP complet terminé en 7 h ou 14 h.',
  },
  {
    q: 'Quels abonnements et frais faut-il prévoir ?',
    a: 'Un abonnement ChatGPT ou Claude AI est requis pour la session (non inclus). Après la formation, l’hébergement d’un outil interne simple peut être gratuit ou de quelques euros par mois ; les options sont vues en session.',
  },
  {
    q: 'Où se déroule la formation ?',
    a: 'Uniquement en présentiel en Île-de-France : en inter-entreprises à dates programmées, ou en intra dans vos locaux. Effectif : 4 à 8 participants.',
  },
  {
    q: 'Quels formats sont proposés ?',
    a: 'Deux formats : 7 h (300 € HT/participant) et 14 h (600 € HT/participant), en inter-entreprises (4 à 8 participants) ou en intra. Présentiel Île-de-France uniquement.',
  },
  {
    q: 'Dois-je apporter mon ordinateur ?',
    a: 'Oui. La session est pratique : vous travaillez sur votre propre poste. Vérifiez vos accès ChatGPT ou Claude AI avant le jour J.',
  },
  {
    q: 'Peut-on connecter l’outil à tous nos logiciels ?',
    a: 'Non, pas automatiquement. Les imports, exports et éventuelles connexions dépendent des outils que vous utilisez déjà. Nous restons factuels sur ce qui est réaliste pour votre cas.',
  },
] as const;

export function libelleTarifLancementDevWebIa(): string {
  return `${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant`;
}

export function mentionFinancementDevWebIa(): string {
  return DEV_WEB_IA_FINANCEMENT_MENTION;
}

export const DEV_WEB_IA_PROJECT_FORM_ID = 'parlez-projet' as const;

export const DEV_WEB_IA_FORMATION_REFERENCE = 'NIV-10' as const;

export const DEV_WEB_IA_CONTACT_SUBJECT =
  `Demande d’information — Applications métier BTP avec l’IA (${DEV_WEB_IA_FORMATION_REFERENCE})` as const;

export function devWebIaProjectFormHref(): string {
  return `${DEV_WEB_IA_PATH}#${DEV_WEB_IA_PROJECT_FORM_ID}`;
}

/** CTA principal — appel découverte Calendly. */
export function devWebIaPrimaryCtaHref(): string {
  return LINKS.prendreRdv;
}

export function devWebIaDevisHref(_formationTitle?: string): string {
  return LINKS.prendreRdv;
}

/** CTA secondaire — demander une place (contact). */
export function devWebIaInscriptionHref(): string {
  return `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent(DEV_WEB_IA_FORMATION_TITRE)}`;
}

export function devWebIaProgrammeHref(): string {
  return `${DEV_WEB_IA_PATH}#programme`;
}
