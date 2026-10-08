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

/** Menus et libellés courts (catalogue, navigation). */
export const DEV_WEB_IA_FORMATION_TITRE_COURT = 'Créer son ERP BTP avec l’IA' as const;

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
  'Devis, chantiers, planning, heures et suivi de gestion : apprenez à construire un outil adapté à votre entreprise, puis à le faire évoluer, sans savoir programmer.' as const;

export const DEV_WEB_IA_INTRO =
  'Vos informations sont réparties entre Excel, les emails et plusieurs logiciels ? Cette formation vous apprend à structurer votre projet d’ERP BTP et à construire une première version avec l’IA. Vous commencez par votre besoin prioritaire. Vous ajoutez ensuite les modules utiles à votre activité.' as const;

export const DEV_WEB_IA_ERP_DEFINITION =
  'Un ERP est un outil qui centralise les informations et relie les fonctions de gestion de l’entreprise. « Sur mesure » signifie adapté à vos processus, vos utilisateurs et vos données. « Évolutif » signifie pouvoir ajouter des fonctions, tester les modifications et conserver les données existantes.' as const;

export const DEV_WEB_IA_HERO_REASSURANCES = [
  'Niveau 3 — création, dans une progression en trois niveaux',
  'Vous commencez par un module prioritaire, puis vous enrichissez l’outil',
  'Aucune compétence en programmation requise',
] as const;

export const DEV_WEB_IA_HERO_FACTS = [
  '7 h (1 journée)',
  '9h00 – 12h30 · 13h30 – 17h00',
  'Présentiel Île-de-France',
  '4 à 8 participants',
  '70 % pratique · 30 % méthodologie',
] as const;

export const DEV_WEB_IA_DUREE_COURTE = '7 h' as const;

export const DEV_WEB_IA_CTA_PRIMARY_LABEL = 'Échanger sur mon projet d’ERP BTP' as const;
export const DEV_WEB_IA_CTA_SECONDARY_LABEL = 'Découvrir le programme' as const;

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
    desc: 'Groupes limités à 4 à 8 participants pour des allers-retours réguliers avec la formatrice.',
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
  eyebrow: 'Choisissez votre parcours',
  titleLine1: 'Un même point de départ.',
  titleLine2: 'À vous de choisir jusqu’où aller.',
  lead: 'Une première journée (7 h) pour cadrer le besoin, choisir un module et construire une première version testable. Une deuxième journée (7 h supplémentaires) pour approfondir, relier les fonctions utiles et préparer les conditions d’un déploiement progressif.',
} as const;

export const DEV_WEB_IA_PARCOURS_MARKETING = {
  '7h': {
    label: 'Parcours 1 — 1 journée',
    title: 'Cadrer et amorcer votre ERP BTP',
    desc: 'Choisir un module prioritaire, définir écrans et données, construire une première version testable avec l’IA.',
    badge14h: null as string | null,
  },
  '14h': {
    label: 'Parcours 2 — 2 journées',
    title: 'Approfondir et préparer l’évolution',
    desc: 'Reprendre le Jour 1, enrichir le module, travailler validations, exports et accès, puis poser la feuille de route.',
    badge14h: 'Comprend le parcours 7 h',
  },
} as const;

export const DEV_WEB_IA_JOUR_RESUME = {
  jour1: {
    label: 'Jour 1',
    closing: 'Jour 1 — Je cadre mon besoin et j’amorce mon premier module.',
    points: [
      'Cadrer le besoin et choisir un module',
      'Définir les écrans, les données et les utilisateurs',
      'Construire une première version avec l’IA',
      'Tester un parcours simple et préparer la suite',
    ],
  },
  jour2: {
    label: 'Jour 2',
    closing: 'Jour 2 — J’améliore, je relie et je prépare le déploiement.',
    points: [
      'Reprendre et améliorer la première version',
      'Approfondir le module ou relier un second module',
      'Travailler validations, exports et accès',
      'Tester, sauvegarder et préparer le déploiement',
      'Construire une feuille de route d’évolution',
    ],
  },
} as const;

export const DEV_WEB_IA_PUBLIC_PRINCIPAL =
  'Dirigeants, responsables administratifs, conducteurs de travaux et fonctions support des TPE et PME du bâtiment et des travaux publics.' as const;

export const DEV_WEB_IA_PUBLIC_EGALEMENT =
  'Toute personne qui pilote ou organise la gestion de l’entreprise et souhaite structurer un outil de suivi adapté à ses processus.' as const;

export const DEV_WEB_IA_PUBLIC = [
  'Dirigeants TPE/PME BTP',
  'Responsables administratifs',
  'Conducteurs de travaux',
  'Fonctions support',
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
  highlighted?: boolean;
};

export const DEV_WEB_IA_ERP_MODULES: readonly DevWebIaErpModule[] = [
  {
    id: 'clients-commercial',
    number: 1,
    title: 'Clients et suivi commercial',
    description: 'Contacts, prospects, échanges, opportunités et relances.',
  },
  {
    id: 'visites-metres',
    number: 2,
    title: 'Visites et métrés',
    description: 'Fiches de visite, photos, mesures et informations nécessaires au devis.',
  },
  {
    id: 'devis-facturation',
    number: 3,
    title: 'Devis et suivi de facturation',
    description:
      'Bibliothèque de prestations, devis, suivi des situations et des règlements. Les fonctions de facturation nécessitent une vérification des exigences applicables avant utilisation réelle.',
  },
  {
    id: 'suivi-chantier',
    number: 4,
    title: 'Suivi de chantier',
    description: 'Avancement, comptes rendus, photos, documents, réserves et tâches.',
  },
  {
    id: 'planning',
    number: 5,
    title: 'Planning',
    description: 'Affectation des équipes, interventions, disponibilités et matériel.',
  },
  {
    id: 'heures-paie',
    number: 6,
    title: 'Relevé des heures et préparation de la paie',
    description:
      'Saisie des heures par chantier, validation et récapitulatif pour préparer les éléments à transmettre au gestionnaire de paie.',
    highlighted: true,
  },
  {
    id: 'achats-depenses',
    number: 7,
    title: 'Achats et dépenses',
    description: 'Commandes, fournisseurs, matériaux et dépenses affectées aux chantiers.',
  },
  {
    id: 'tableau-de-bord',
    number: 8,
    title: 'Tableau de bord',
    description:
      'Heures prévues et réalisées, dépenses, avancement et indicateurs de gestion selon les données disponibles.',
  },
] as const;

export const DEV_WEB_IA_HEURES_FONCTIONS = [
  'Salarié, date et chantier',
  'Horaires de début et de fin, pauses et durée travaillée',
  'Répartition des heures entre plusieurs chantiers',
  'Absences et commentaires',
  'Éléments déclarés utiles à la préparation de la paie : paniers, déplacements et autres variables selon les règles de l’entreprise',
  'Statuts : brouillon, soumis, validé, à corriger',
  'Historique des modifications et des validations',
  'Récapitulatif hebdomadaire ou mensuel',
  'Export CSV ou Excel au format convenu avec le gestionnaire de paie',
  'Imputation des heures validées au suivi des coûts du chantier',
] as const;

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
};

export type DevWebIaProgrammeModule = {
  number: number;
  title: string;
  objective: string;
  activities: readonly string[];
  result: string;
};

/** Programme Jour 1 — intitulés officiels conservés, activités adaptées ERP BTP. */
export const DEV_WEB_IA_MODULES: readonly DevWebIaProgrammeModule[] = [
  {
    number: 1,
    title: 'Cadrer et préparer son projet',
    objective:
      'Clarifier le besoin d’ERP, choisir le premier module et disposer d’un environnement prêt à l’emploi.',
    activities: [
      'Cartographier le processus de gestion prioritaire (ex. relevés d’heures, devis, suivi chantier)',
      'Identifier les utilisateurs (dirigeant, chef d’équipe, bureau) et leurs droits d’accès',
      'Choisir le premier module à construire et ce qui pourra attendre',
      'Préparer l’environnement : outils installés, comptes et accès vérifiés',
    ],
    result: 'Un besoin cadré, un module prioritaire choisi et un poste prêt pour construire.',
  },
  {
    number: 2,
    title: 'Structurer son projet et guider efficacement l’IA',
    objective:
      'Organiser écrans, données et relations, puis guider l’IA avec des consignes précises.',
    activities: [
      'Définir les écrans, les données et les relations entre les éléments (chantier, salarié, devis…)',
      'Esquisser le parcours utilisateur (ex. saisie des heures → validation → export)',
      'Découper le travail en étapes avec des demandes ciblées à l’IA',
      'Rédiger et ajuster des instructions structurées (contexte, objectif, contraintes, résultat attendu)',
    ],
    result: 'Une structure claire du module et une méthode pour dialoguer efficacement avec l’IA.',
  },
  {
    number: 3,
    title: 'Construire une première version',
    objective:
      'Passer du cadrage à une première version manipulable du module prioritaire.',
    activities: [
      'Structurer l’architecture du module et l’ordre de construction',
      'Générer une première version avec l’IA à partir du besoin structuré',
      'Mettre en place navigation, formulaires et affichage des données utiles',
      'Appliquer les premières corrections constatées sur votre projet',
    ],
    result:
      'Une première version testable du module — pas un ERP complet ni prêt pour l’exploitation.',
  },
  {
    number: 4,
    title: 'Tester, corriger et pérenniser son projet',
    objective:
      'Vérifier le résultat, préparer les exports et organiser la suite.',
    activities: [
      'Construire un scénario de test sur le parcours principal',
      'Vérifier qu’aucune donnée sensible (clients, salariés) n’est exposée',
      'Préparer les exports nécessaires (ex. CSV pour le gestionnaire de paie)',
      'Sauvegarder le projet et rédiger une feuille de route d’évolution',
    ],
    result:
      'Une méthode de test, un projet sauvegardé et un plan pour faire évoluer l’outil après la formation.',
  },
];

/** Programme Jour 2 — parcours 14 h (pas de référencement site vitrine). */
export const DEV_WEB_IA_MODULES_JOUR2: readonly DevWebIaModule[] = [
  {
    number: 1,
    title: 'Diagnostiquer et prioriser les améliorations',
    points: [
      'Reprendre et tester la version du Jour 1',
      'Identifier écarts, manques et priorités pour l’outil de gestion',
      'Classer corrections nécessaires et évolutions secondaires',
      'Organiser les prochaines étapes de la journée',
    ],
  },
  {
    number: 2,
    title: 'Améliorer et enrichir le projet',
    points: [
      'Corriger les dysfonctionnements du module prioritaire',
      'Approfondir le module ou amorcer un second module, selon l’avancement',
      'Préserver les données déjà saisies lors des évolutions',
      'Tester après chaque modification',
    ],
  },
  {
    number: 3,
    title: 'Préparer validations, exports et accès',
    points: [
      'Travailler les circuits de validation (brouillon, soumis, validé)',
      'Préparer les exports utiles au bureau ou au gestionnaire de paie',
      'Définir les accès selon les rôles',
      'Repérer les informations sensibles à ne pas exposer',
    ],
  },
  {
    number: 4,
    title: 'Partager l’outil avec l’équipe en conditions contrôlées',
    points: [
      'Préparer le partage sécurisé de l’outil interne avec l’équipe',
      'Vérifier l’affichage sur ordinateur et téléphone',
      'Contrôler liens, formulaires et parcours principaux',
      'Consigner les anomalies restantes avant un usage élargi',
    ],
  },
  {
    number: 5,
    title: 'Tester, sauvegarder et préparer le déploiement',
    points: [
      'Parcourir le projet de bout en bout',
      'Sauvegarder et conserver les versions',
      'Élaborer une feuille de route d’évolution (modules suivants, tests, maintenance)',
      'Présenter la version testée et les prochaines étapes',
    ],
  },
];

export const DEV_WEB_IA_LIVRABLES = [
  'Environnement de travail vérifié',
  'Projet d’ERP cadré et premier module priorisé',
  'Première version testable (non prête pour l’exploitation)',
  'Méthode pour guider, tester et corriger avec l’IA',
  'Projet sauvegardé et feuille de route d’évolution',
  'Certificat de réalisation',
] as const;

export const DEV_WEB_IA_LIVRABLES_14H = [
  ...DEV_WEB_IA_LIVRABLES,
  'un module approfondi ou un second module amorcé',
  'validations, exports et accès travaillés',
  'conditions d’un déploiement progressif préparées',
] as const;

export const DEV_WEB_IA_PEDAGOGIE = [
  'Fil rouge sur le projet d’ERP de chaque participant — pas sur un cas générique',
  'Courtes démonstrations, ateliers guidés puis travail individuel sur poste',
  'Tests et corrections en direct, avec échanges avec la formatrice',
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
    a: 'Non. Vous repartez avec une première version testable, une méthode et une feuille de route — pas un ERP complet, sécurisé et prêt à l’exploitation.',
  },
  {
    q: 'Quels abonnements et frais faut-il prévoir ?',
    a: 'Un abonnement ChatGPT ou Claude AI est requis pour la session (non inclus). Après la formation, l’hébergement d’un outil interne simple peut être gratuit ou de quelques euros par mois ; les options sont vues en session.',
  },
  {
    q: 'Où se déroule la formation ?',
    a: 'Uniquement en présentiel en Île-de-France : en inter-entreprises à dates programmées, ou en intra dans vos locaux.',
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
  `Demande d’information — Créer son ERP BTP avec l’IA (${DEV_WEB_IA_FORMATION_REFERENCE})` as const;

export function devWebIaProjectFormHref(): string {
  return `${DEV_WEB_IA_PATH}#${DEV_WEB_IA_PROJECT_FORM_ID}`;
}

export function devWebIaDevisHref(_formationTitle?: string): string {
  return devWebIaProjectFormHref();
}

export function devWebIaInscriptionHref(): string {
  return `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent(DEV_WEB_IA_FORMATION_TITRE)}`;
}

export function devWebIaProgrammeHref(): string {
  return `${DEV_WEB_IA_PATH}#programme`;
}
