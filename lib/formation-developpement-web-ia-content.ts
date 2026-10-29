/**
 * Contenu — formation NUM-04 / NIV-10 : créer des applications métier BTP avec l’IA.
 * Formation catalogue : 14 heures sur 2 jours (2 × 7 h par journée). Tarif 14 h : grille catalogue 2027.
 */
import { LINKS } from '@/lib/internal-links';
import { formatNumberFr } from '@/lib/format-number-fr';
import {
  TARIF_PARTICIPANT_NIV10_14H_HT,
  TARIF_PARTICIPANT_NIV10_HT,
} from '@/lib/tarifs-catalogue-participant';

export const DEV_WEB_IA_PATH = LINKS.formationDeveloppementWebIaSansCoder;
export const DEV_WEB_IA_CODE = 'NIV-10' as const;

/** Intitulé officiel catalogue / Qualiopi — aligné `data/formations.ts` (NIV-10 / NUM-04). */
export const DEV_WEB_IA_FORMATION_TITRE = 'Créer des applications métier BTP avec l’IA' as const;

/** Menus et libellés courts (catalogue, navigation, breadcrumb, footer). */
export { DEV_WEB_IA_FORMATION_TITRE_COURT } from '@/lib/formation-developpement-web-ia-labels';

/** Tarifs inter — grille catalogue 2027 (distincts de BeWork). */
export const TARIF_INTER_DEV_WEB_IA_HT = TARIF_PARTICIPANT_NIV10_HT;
export const TARIF_INTER_DEV_WEB_IA_14H_HT = TARIF_PARTICIPANT_NIV10_14H_HT;

/** Métadonnées parcours catalogue — sans importer BeWork (évite cycle Header client). */
export const DEV_WEB_IA_PARCOURS_7H = {
  id: '7h' as const,
  title: DEV_WEB_IA_FORMATION_TITRE,
  intitule:
    'Créer des applications métier BTP avec l’IA — premier prototype sur un périmètre limité',
  dureeLabel: '7 h',
  joursLabel: '1 journée',
  tarifHt: TARIF_INTER_DEV_WEB_IA_HT,
  tarifLabel: `${formatNumberFr(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant`,
  effectif: '4 à 8 participants',
  pdfHref: LINKS.pdfProgrammeDeveloppementWebIaSansCoder,
  highlights: [
    'Cadrer un besoin sur un périmètre limité',
    'Construire un premier prototype assisté par l’IA',
    'Tester et documenter les bases',
  ],
  outcome: 'Vous repartez avec un prototype testé sur un périmètre défini.',
};

export const DEV_WEB_IA_PARCOURS_14H = {
  id: '14h' as const,
  title: DEV_WEB_IA_FORMATION_TITRE,
  intitule:
    'Créer des applications métier BTP avec l’IA — réalisation approfondie, tests et documentation',
  dureeLabel: '14 h',
  joursLabel: '2 journées',
  tarifHt: TARIF_INTER_DEV_WEB_IA_14H_HT,
  tarifLabel: `${formatNumberFr(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT / participant`,
  effectif: '4 à 8 participants',
  pdfHref: LINKS.pdfProgrammeDeveloppementWebIaSansCoder14h,
  highlights: [
    'Tout le parcours 7 h',
    'Approfondissement, tests et documentation',
    'Préparation des évolutions (sans promesse de mise en production complète)',
  ],
  outcome: 'Prototype approfondi, testé et documenté — pas un logiciel prêt pour la production.',
};

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
  'Concevez une application adaptée à votre entreprise, sans savoir coder.' as const;

export const DEV_WEB_IA_INTRO =
  'Planning, relevés d’heures, suivi de chantier, devis, CRM, tableaux de bord… Vous apprenez à transformer vos propres besoins métier en un outil fonctionnel et évolutif avec l’IA générative.' as const;

export const DEV_WEB_IA_INTRO_CLARIFIER =
  'Vous ne devenez pas développeur. Vous apprenez à piloter l’IA pour construire votre outil.' as const;

export const DEV_WEB_IA_ERP_DEFINITION =
  'Un outil métier centralise les informations utiles à votre activité. Vous commencez par un besoin prioritaire, puis vous enrichissez progressivement les fonctions, en testant chaque évolution.' as const;

export const DEV_WEB_IA_HERO_EYEBROW = 'Formation IA BTP — Niveau 3' as const;

export const DEV_WEB_IA_HERO_BENEFIT_CARDS = [
  {
    num: '01',
    title: 'Sur mesure',
    texte: 'Un outil construit autour de vos processus, et non l’inverse.',
  },
  {
    num: '02',
    title: 'Autonome',
    texte:
      'Vous apprenez à modifier et faire évoluer votre outil sans dépendre systématiquement d’un prestataire.',
  },
  {
    num: '03',
    title: 'Économique',
    texte:
      'Évitez, lorsque le besoin le permet, l’accumulation de logiciels, d’abonnements ou de développements simples externalisés.',
  },
  {
    num: '04',
    title: 'Données sous contrôle',
    texte:
      'Apprenez à organiser les accès, les données et les règles de confidentialité de votre application.',
  },
] as const;

export const DEV_WEB_IA_HERO_REASSURANCES = [
  'Adapté à vos méthodes de travail',
  'Évolutif selon vos besoins',
  'Utilisable par vos équipes',
  'Maîtrise accrue de vos données',
  'Réduction des doubles saisies',
  'Réduction potentielle des coûts liés à l’empilement de logiciels',
  'Autonomie pour modifier et faire évoluer l’outil',
] as const;

export const DEV_WEB_IA_HERO_FACTS = [
  '14 heures — 2 jours',
  'Présentiel en Île-de-France',
  '4 à 8 participants',
  'Aucune compétence en programmation requise',
] as const;

/** Durée affichée fiche, hero et infos pratiques — alignée `data/formations.ts` (NIV-10). */
export const DEV_WEB_IA_DUREE_AFFICHAGE = '14 heures — 2 jours' as const;

/** Durée courte catalogue / cartes — alignée `data/formations.ts` (NIV-10). */
export const DEV_WEB_IA_DUREE_COURTE = '14 h' as const;

export const DEV_WEB_IA_CTA_PRIMARY_LABEL = 'Construire mon projet d’outil BTP' as const;
export const DEV_WEB_IA_CTA_SECONDARY_LABEL = 'Voir le programme' as const;
export const DEV_WEB_IA_CTA_FINAL_LABEL = 'Échanger sur mon projet' as const;

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
      'Cadrage du projet d’outil métier BTP',
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
      'Relier plusieurs fonctions',
      'Préparer validations, exports et accès',
      'Tester et préparer le déploiement',
    ],
  },
} as const;

/** Introduction section programme (H2 + lead + formats). */
export const DEV_WEB_IA_PROGRAMME_SECTION = {
  title: 'Le parcours en étapes',
  paragraphs: [
    'Une formation pratique construite autour de votre propre projet.',
    'Vous partez de vos méthodes de travail et de vos besoins pour concevoir progressivement un outil métier adapté à votre entreprise.',
  ],
  formats: [
    {
      id: '7h' as const,
      label: 'Parcours 7 h',
      summary: 'Cadrer, construire, tester et préparer la suite',
    },
    {
      id: '14h' as const,
      label: 'Parcours 14 h',
      summary: 'Connecter, sécuriser et préparer le déploiement',
    },
  ],
  disclaimer:
    'Le résultat dépend de votre niveau, de la complexité du projet, du nombre de fonctionnalités, des données disponibles et des intégrations nécessaires. La formation permet de concevoir une première version fonctionnelle et évolutive — pas un outil métier complet terminé.',
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
  'Analyser un besoin métier et fixer un périmètre réaliste pour une première version d’application',
  'Organiser le projet : parcours utilisateur, écrans, données et priorités fonctionnelles',
  'Formuler des consignes structurées et exploitables par l’IA, étape par étape',
  'Obtenir une première version testable sans écrire le code soi-même',
  'Appliquer une démarche de test, de correction et de sauvegarde sur son projet',
  'Définir une feuille de route pour poursuivre le projet après la formation',
] as const;

/** Modules programme NIV-10 — source programmes-ofc-2026-10-17.json */
export const DEV_WEB_IA_PROGRAM_MODULES = [
  {
    title: 'Accueil, cadrage et positionnement — 15 min',
    points: [
      'Émargement, présentation des objectifs et du déroulé',
      'Recueil des attentes et auto-positionnement d’entrée sur les objectifs visés',
      'Présentation des idées de projet : suivi de chantier, planning d’interventions, suivi des devis, tableau de bord, espace client',
    ],
  },
  {
    title: 'Module 1 — Cadrer et préparer son projet — 1 h 15',
    points: [
      'Utilisateurs, besoin métier, fonctions prioritaires — périmètre de la première version',
      'Outils installés, comptes et accès vérifiés — quel outil pour quelle tâche',
    ],
  },
  {
    title: 'Module 2 — Structurer son projet et guider l’IA — 1 h 30',
    points: [
      'Parcours utilisateur et écrans principaux — fonctionnalités et données nécessaires à la V1',
      'Découper le travail en étapes — consignes structurées : contexte, objectif, contraintes, résultat attendu',
    ],
  },
  {
    title: 'Module 3 — Construire une première version — 2 h 15',
    points: [
      'Organisation du projet et ordre de construction des blocs',
      'Première version générée par l’IA — navigation, formulaires simples, affichage des données utiles',
      'Repérer les écarts et les corriger sur son propre projet',
    ],
  },
  {
    title: 'Module 4 — Tester, corriger et pérenniser — 1 h 30',
    points: [
      'Scénario de test sur les fonctions principales — demandes de correction précises à l’IA',
      'Sauvegarde du projet et précautions sur les données personnelles',
      'Feuille de route personnelle et prochaines étapes',
    ],
  },
  {
    title: 'Bilan, plan d’action et évaluation — 15 min',
    points: [
      'Présentation de sa première version au groupe',
      'Auto-positionnement de sortie et plan d’action individuel à 30 jours',
      'Questionnaire de satisfaction et remise des attestations',
    ],
  },
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

/** Comparatif logiciels standards vs outil métier — section conversion. */
export const DEV_WEB_IA_COMPARATIF = {
  title: 'Votre entreprise doit-elle s’adapter au logiciel… ou le logiciel à votre entreprise ?',
  standards: {
    title: 'Logiciels standards',
    points: [
      'Fonctionnalités parfois inutiles',
      'Processus imposés',
      'Informations réparties entre plusieurs outils',
      'Multiplication possible des abonnements',
      'Dépendance à l’éditeur pour certaines évolutions',
      'Adaptations parfois limitées',
    ],
  },
  metier: {
    title: 'Votre outil métier',
    points: [
      'Fonctions choisies selon vos besoins',
      'Écrans adaptés à vos utilisateurs',
      'Règles correspondant à votre organisation',
      'Évolution progressive',
      'Automatisations ciblées',
      'Maîtrise des accès et de l’architecture de vos données',
    ],
  },
  closing:
    'Vous commencez petit : une fonction utile. Puis vous faites évoluer votre outil au rythme de votre entreprise.',
} as const;

export const DEV_WEB_IA_AUTONOMIE = {
  title: 'Vous ne repartez pas seulement avec un outil. Vous apprenez à le faire évoluer.',
  lead: 'Le principal bénéfice de cette formation est l’autonomie.',
  steps: [
    'Expliquer votre besoin à l’IA',
    'Transformer un processus métier en fonctionnalités',
    'Générer une première version',
    'Tester le résultat',
    'Identifier une erreur',
    'Demander une correction',
    'Ajouter une fonctionnalité',
    'Modifier une interface',
    'Organiser les données',
    'Faire évoluer progressivement l’application',
  ],
  highlight:
    'L’objectif n’est pas de vous apprendre à coder. L’objectif est de vous apprendre à piloter l’IA pour construire et faire évoluer vos propres outils.',
} as const;

export const DEV_WEB_IA_ECONOMIQUE = {
  title: 'Réduisez la dépendance aux logiciels multiples',
  lead: 'Dans beaucoup de PME du BTP, les informations sont dispersées entre :',
  outils: [
    'Excel',
    'Emails',
    'WhatsApp',
    'Logiciel de devis',
    'Planning',
    'Application de suivi de chantier',
    'Outil RH',
    'Documents partagés',
  ],
  coutsLead: 'Chaque outil supplémentaire peut ajouter :',
  couts: [
    'Un abonnement',
    'Une nouvelle saisie',
    'Une nouvelle interface',
    'Une nouvelle formation',
    'Une nouvelle dépendance',
  ],
  body: 'Avec l’IA, certaines fonctions internes simples peuvent aujourd’hui être regroupées dans un outil adapté à l’entreprise — pour des applications métier internes adaptées au besoin.',
  caution:
    'Un outil créé pendant la formation ne remplace pas systématiquement un logiciel métier réglementé, un logiciel de paie, un logiciel comptable ou une solution nécessitant des certifications spécifiques.',
  punchline:
    'Investissez dans votre capacité à construire vos outils, pas uniquement dans de nouveaux abonnements.',
} as const;

export const DEV_WEB_IA_DONNEES_AXES = [
  {
    title: 'Maîtrise des données',
    texte: 'Comprendre où sont stockées les informations de l’application.',
  },
  {
    title: 'Accès utilisateurs',
    texte: 'Définir qui peut consulter, modifier ou valider chaque information.',
  },
  {
    title: 'Données confidentielles',
    texte: 'Identifier les données qui ne doivent pas être transmises à un modèle d’IA.',
  },
  {
    title: 'Environnement adapté',
    texte:
      'Choisir les outils, services et paramètres appropriés au niveau de confidentialité attendu.',
  },
] as const;

export const DEV_WEB_IA_DONNEES_PRUDENCE =
  'Vous apprenez à identifier les données sensibles et à choisir une architecture et des outils adaptés au niveau de confidentialité attendu.' as const;

export const DEV_WEB_IA_AVANT_APRES = {
  title: 'Avant la formation / Après la formation',
  avant: [
    'Excel',
    'Emails',
    'Informations dispersées',
    'Processus manuels',
    'Doubles saisies',
    'Logiciels qui ne correspondent pas toujours au fonctionnement de l’entreprise',
  ],
  apres: [
    'Un besoin métier clairement défini',
    'Une première application fonctionnelle',
    'Des données structurées',
    'Des processus intégrés',
    'Une méthode pour continuer seul',
    'Une feuille de route d’évolution',
  ],
} as const;

export const DEV_WEB_IA_ACCESSIBLE = {
  title: 'Vous utilisez déjà l’IA ? Vous pouvez apprendre à créer votre outil.',
  lead: 'Pas besoin d’être développeur. Pas besoin de connaître un langage informatique. Pas besoin d’avoir déjà créé une application.',
  prerequis: [
    'Savoir utiliser un ordinateur',
    'Naviguer sur Internet',
    'Utiliser ChatGPT ou Claude',
    'Avoir un besoin métier à résoudre',
  ],
  loop: 'Vous décrivez. L’IA génère. Vous testez. Vous corrigez. Vous améliorez.',
} as const;

export const DEV_WEB_IA_RESULTATS = {
  title: 'À la fin de la formation, vous savez…',
  items: [
    'Transformer un besoin métier en application',
    'Expliquer précisément une fonctionnalité à l’IA',
    'Créer une première interface',
    'Structurer les données',
    'Créer des règles et validations',
    'Tester une fonctionnalité',
    'Corriger avec l’IA',
    'Ajouter de nouvelles fonctions',
    'Organiser la suite du développement',
  ],
  closing:
    'Vous repartez avec une première version fonctionnelle de votre projet et surtout avec la méthode pour continuer à la faire évoluer.',
  prudence:
    'Une version créée pendant la formation est une première version testable et évolutive. Elle n’est pas automatiquement prête pour une utilisation en production.',
} as const;

export const DEV_WEB_IA_PROGRAMME_SCAN_7H = [
  {
    num: '1',
    title: 'Cadrer',
    texte: 'Transformer un problème métier en cahier des charges simple.',
  },
  {
    num: '2',
    title: 'Construire',
    texte: 'Créer la première fonctionnalité avec l’IA.',
  },
  {
    num: '3',
    title: 'Tester',
    texte: 'Vérifier les données, règles, droits et parcours utilisateurs.',
  },
  {
    num: '4',
    title: 'Faire évoluer',
    texte: 'Corriger, améliorer et préparer le module suivant.',
  },
] as const;

export const DEV_WEB_IA_PROGRAMME_SCAN_14H = [
  {
    num: '5',
    title: 'Connecter',
    texte: 'Relier plusieurs fonctions.',
  },
  {
    num: '6',
    title: 'Sécuriser',
    texte: 'Structurer les accès, sauvegardes et données.',
  },
  {
    num: '7',
    title: 'Déployer',
    texte: 'Préparer l’utilisation par plusieurs collaborateurs.',
  },
] as const;

export const DEV_WEB_IA_CTA_FINAL = {
  title: 'Quel outil votre entreprise construirait-elle si vous n’aviez plus besoin de savoir coder ?',
  lead: 'Relevé d’heures ? Planning ? Suivi chantier ? CRM ? Tableau de bord ? Application métier complète ?',
  closing: 'Commencez par le besoin qui vous fait perdre le plus de temps.',
  facts: ['Formation en présentiel en Île-de-France', DEV_WEB_IA_DUREE_AFFICHAGE, '4 à 8 participants'],
} as const;

export type DevWebIaErpModule = {
  id: string;
  number: number;
  title: string;
  description: string;
  useCases: readonly string[];
  highlighted?: boolean;
  disclaimer?: string;
};

/** Exemples d’outils métier possibles — pistes fonctionnelles, pas un programme obligatoire. */
export const DEV_WEB_IA_ERP_MODULES_SECTION = {
  title: 'Ce que vous pouvez créer',
  subtitle:
    'Des applications métier BTP concrètes. Vous choisissez un besoin prioritaire et apprenez la méthode pour développer les suivants.',
  note: 'Vous ne construisez pas ces 8 modules pendant la formation. Vous choisissez un besoin prioritaire et apprenez la méthode permettant de développer les suivants.',
} as const;

export const DEV_WEB_IA_ERP_MODULES: readonly DevWebIaErpModule[] = [
  {
    id: 'heures-paie',
    number: 1,
    title: 'Relevé d’heures',
    description: 'Saisie terrain → validation → export paie',
    highlighted: true,
    useCases: ['Saisie terrain', 'Validation', 'Export paie'],
  },
  {
    id: 'planning',
    number: 2,
    title: 'Planning',
    description: 'Chantiers → équipes → affectations → disponibilités',
    useCases: ['Chantiers', 'Équipes', 'Affectations', 'Disponibilités'],
  },
  {
    id: 'suivi-chantier',
    number: 3,
    title: 'Suivi de chantier',
    description: 'Avancement → photos → réserves → documents',
    useCases: ['Avancement', 'Photos', 'Réserves', 'Documents'],
  },
  {
    id: 'devis-facturation',
    number: 4,
    title: 'Devis',
    description: 'Prestations → quantités → prix → validation',
    useCases: ['Prestations', 'Quantités', 'Prix', 'Validation'],
    disclaimer:
      'Les fonctions de facturation doivent être vérifiées au regard des obligations réglementaires et comptables applicables avant toute utilisation réelle.',
  },
  {
    id: 'visites-metres',
    number: 5,
    title: 'Visites & métrés',
    description: 'Photos → mesures → contraintes → préparation du devis',
    useCases: ['Photos', 'Mesures', 'Contraintes', 'Préparation devis'],
  },
  {
    id: 'clients-commercial',
    number: 6,
    title: 'CRM BTP',
    description: 'Prospect → visite → devis → relance → chantier',
    useCases: ['Prospect', 'Visite', 'Devis', 'Relance', 'Chantier'],
  },
  {
    id: 'achats-depenses',
    number: 7,
    title: 'Achats',
    description: 'Fournisseurs → commandes → dépenses chantier',
    useCases: ['Fournisseurs', 'Commandes', 'Dépenses chantier'],
  },
  {
    id: 'tableau-de-bord',
    number: 8,
    title: 'Tableau de bord',
    description: 'Heures → coûts → avancement → indicateurs',
    useCases: ['Heures', 'Coûts', 'Avancement', 'Indicateurs'],
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
  title: 'Jour 1 — Construire une première version fonctionnelle',
  intro:
    'Première journée (7 h) sur votre propre projet d’outil métier BTP : cadrer le besoin, choisir une fonction prioritaire, construire une première version utilisable et définir la suite du développement.',
} as const;

/** Programme Jour 1 (7 h) — 4 étapes. */
export const DEV_WEB_IA_MODULES: readonly DevWebIaProgrammeModule[] = [
  {
    number: 1,
    title: 'Cadrer son outil métier BTP',
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
  title: 'Formation sur 2 journées — construire, approfondir et relier son outil',
  intro:
    'Cette formation de 14 heures sur 2 jours vous accompagne dans la création d’un outil métier BTP avec l’IA, sans savoir coder. La première journée est consacrée à la conception et à la construction d’une première version. La seconde permet d’améliorer l’outil, de relier ses fonctionnalités et de préparer son déploiement.',
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
  'Projet d’outil métier BTP cadré et premier module priorisé',
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
  DEV_WEB_IA_DONNEES_PRUDENCE,
] as const;

export const DEV_WEB_IA_FAQ = [
  {
    q: 'Faut-il savoir coder ?',
    a: 'Non. Aucun prérequis en programmation n’est nécessaire. Vous décrivez votre besoin, guidez l’IA, testez le résultat et corrigez — sans devenir développeur.',
  },
  {
    q: 'Peut-on commencer par les relevés d’heures ?',
    a: 'Oui. Les relevés d’heures pour préparer la paie sont un module prioritaire fréquent. Pendant la formation, vous travaillez sur le périmètre adapté à votre niveau et au rythme des deux journées.',
  },
  {
    q: 'Peut-on faire évoluer son outil après la formation ?',
    a: 'Oui. Vous repartez avec une méthode et une feuille de route pour ajouter des fonctions, tester les modifications et conserver les données existantes.',
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
    q: 'L’outil est-il prêt à être utilisé à la fin de la formation ?',
    a: 'Non. Vous repartez avec une première version fonctionnelle et évolutive, une méthode et une feuille de route. Le résultat dépend de votre niveau, de la complexité du projet et des intégrations nécessaires — pas d’application métier complète terminée en 14 heures (2 jours).',
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
    q: 'Peut-on créer un outil de gestion de chantier avec l’IA sans savoir coder ?',
    a: 'Oui, c’est l’objectif du parcours : décrire le besoin, guider l’IA, tester et corriger. Vous repartez avec une première version et une feuille de route — pas une application clé en main sans relecture métier.',
  },
  {
    q: 'Quelle est la durée et le format de la formation ?',
    a: '14 heures sur 2 jours en présentiel Île-de-France (4 à 8 participants), inter ou intra. Chaque journée dure 7 h (9h00 – 12h30 / 13h30 – 17h00). Tarif catalogue HT par participant. Prise en charge OPCO/Constructys selon éligibilité.',
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
  return `${formatNumberFr(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant`;
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

/** CTA secondaire hero — ancre programme. */
export function devWebIaSecondaryCtaHref(): string {
  return `${DEV_WEB_IA_PATH}#programme`;
}

export function devWebIaProgrammeHref(): string {
  return `${DEV_WEB_IA_PATH}#programme`;
}
