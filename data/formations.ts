/**
 * Source de vérité — parcours catalogue OFC (prix, durée, effectifs, contenus).
 * Ne plus dupliquer ces valeurs en dur dans le JSX / FAQ / lib.
 */

import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV03_HT,
  TARIF_PARTICIPANT_NIV04_HT,
  TARIF_PARTICIPANT_NIV05_HT,
  TARIF_PARTICIPANT_NIV09_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';

export type FormationNiveau = 1 | 2 | 3;

/** Gamme stratégique du catalogue — Découvrir · Appliquer par métier · Déployer. */
export type FormationGamme = 'decouvrir' | 'appliquer-metier' | 'deployer';

/** Thématique métier (gamme Appliquer ou Déployer). */
export type FormationTheme =
  | 'appels-offres-etudes'
  | 'chantier-travaux'
  | 'maitrise-oeuvre'
  | 'administratif'
  | 'gestion-contractuelle'
  | 'commercial'
  | 'transformation-ia'
  | 'strategie-adoption'
  | 'assistants-automatisation'
  | 'outils-applications';

export type Formation = {
  code: string;
  slug: string;
  titre: string;
  /** Promesse courte — cartes catalogue (max ~120 car.). */
  promesse: string;
  /** 3 cas d'usage max — cartes catalogue et GEO. */
  casUsageCourts: readonly [string, string, string];
  gamme: FormationGamme;
  theme?: FormationTheme;
  niveau: FormationNiveau;
  niveauLabel: string;
  duree: string;
  horaires?: string;
  effectifMin: number;
  effectifMax: number;
  /**
   * @deprecated Conservé pour compatibilité — toujours `0` pour le catalogue public.
   * Utiliser `tarifParticipantHt` (tarif HT par participant).
   */
  prixHT: number;
  /** Tarif HT par participant — source d’affichage catalogue. */
  tarifParticipantHt?: number;
  accroche: string;
  objectifs: string[];
  public: string;
  casUsage: string;
  pdfProgramme: string;
  /** Version du programme (ex. « Version 2 ») — affichée dans le catalogue */
  programmeVersion: string;
  /** Date de mise à jour du programme PDF (JJ/MM/AAAA) — catalogue et Informations pratiques */
  programmeUpdatedAt: string;
  /** Chemin public de l’affiche catalogue */
  image: string;
  /**
   * Parcours applications métier BTP — tarif via `lib/tarifs-applications-metier-btp.ts`
   * (null = sur devis, sans montant catalogue).
   */
  tarifParcoursAppMetier?: import('@/lib/tarifs-applications-metier-btp').ApplicationMetierBtpTarifKey;
};

export const FORMATIONS: readonly Formation[] = [
  {
    code: 'NIV-01',
    slug: 'ia-batiment-travaux-publics',
    titre: 'Les bases de l’IA pour les pros du BTP',
    promesse:
      'Comprendre l’IA générative et l’utiliser sur vos documents BTP : devis, emails, comptes rendus et DOE.',
    casUsageCourts: ['Rédiger un devis ou une désignation', 'Préparer un compte rendu', 'Structurer un DOE ou PV'],
    gamme: 'decouvrir',
    niveau: 1,
    niveauLabel: 'NUM-01',
    duree: '4 h',
    horaires: '9h00 – 13h00',
    effectifMin: 6,
    effectifMax: 12,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV01_HT,
    accroche:
      'Fondamentaux ChatGPT et IA générative pour TPE, PME du bâtiment et fonctions support — devis, DOE et communication sur vos documents réels.',
    objectifs: [
      'Expliquer le fonctionnement, les limites et le cadre d’usage de l’IA générative (littératie IA — art. 4 du règlement européen sur l’IA, RGPD)',
      'Formuler une demande précise à ChatGPT ou Claude avec la méthode CRAFT (Contexte – Rôle – Action – Format – Ton)',
      'Préparer et structurer une première version de devis ou de désignation d’ouvrage, soumise au contrôle du professionnel',
      'Rédiger un compte rendu, une trame de DOE ou de PV à partir de notes, avec relecture humaine',
      'Créer des emails et contenus professionnels, et anonymiser ses documents avant tout usage de l’IA',
    ],
    public:
      'Dirigeants BTP (gros œuvre, second œuvre, étanchéité, bardage, couverture, électricité, plomberie, peinture, VRD, TP), chargés d’affaires, conducteurs de travaux, techniciens bureau d’études, assistant(e)s administratives et fonctions support',
    casUsage: 'Devis, DOE, PV, CR, communication digitale',
    pdfProgramme: '/formations/pdf/programme_OFC_NIV-01_Bases_IA_BTP_20261017.pdf',
    programmeVersion: 'Référence NIV-01',
    programmeUpdatedAt: '17/10/2026',
    image: '/images/formation-ia-batiment-travaux-publics.webp',
  },
  {
    code: 'NIV-02',
    slug: 'ia-appels-offre-btp',
    titre: 'IA et appels d’offres BTP',
    promesse:
      'Construire une méthode guidée pour analyser un DCE, préparer le chiffrage et structurer un mémoire technique avec l’IA.',
    casUsageCourts: [
      'Extraire les exigences d’un DCE',
      'Préparer une checklist de chiffrage',
      'Structurer un mémoire technique',
    ],
    gamme: 'appliquer-metier',
    theme: 'appels-offres-etudes',
    niveau: 2,
    niveauLabel: 'NUM-02',
    duree: '7 h',
    horaires: '9h00 – 12h30 / 13h30 – 17h00',
    effectifMin: 6,
    effectifMax: 12,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV02_HT,
    accroche:
      'Atelier pratique sur un dossier fil rouge : analyser un DCE, préparer le chiffrage et structurer un mémoire technique avec l’IA.',
    objectifs: [
      'Organiser les pièces d’un DCE (RC, CCTP, CCAP, DPGF, BPU) avant analyse assistée par l’IA',
      'Extraire les exigences importantes avec citation des pièces sources',
      'Comparer le RC, le CCTP, le CCAP et la DPGF pour repérer écarts, manques et questions à la MOE',
      'Créer une checklist des points à vérifier avant le chiffrage et la comparer à un ancien devis — validation métier obligatoire',
      'Structurer un plan de mémoire technique selon les critères et pondérations du RC, et rédiger une section de façon guidée',
      'Réutiliser une méthode de travail (trames, prompts, contrôles humains) sur les prochains dossiers',
    ],
    public:
      'Dirigeants de PME du BTP, responsables d’affaires, chargés d’études, conducteurs de travaux, responsables appels d’offres et entreprises répondant déjà à des consultations',
    casUsage: 'DCE, checklist de chiffrage, mémoire technique',
    pdfProgramme:
      '/formations/ia-appels-offre-btp/programme_OFC_NIV-02_IA_Appels_offres_20261017.pdf',
    programmeVersion: 'Référence NIV-02',
    programmeUpdatedAt: '17/10/2026',
    image: '/images/formation-ia-appels-offres-btp.webp',
  },
  {
    code: 'NIV-03',
    slug: 'ia-conduite-travaux-suivi-chantier',
    titre: 'IA et conduite de travaux',
    promesse:
      'Utiliser ChatGPT et Claude dans l’organisation et le suivi documentaire de chantier : CCTP, plannings, comptes rendus et tableaux d’actions — distinct de la méthode de réception.',
    casUsageCourts: ['Analyser un CCTP et préparer le chantier', 'Rédiger un compte rendu', 'Suivre les actions documentaires'],
    gamme: 'appliquer-metier',
    theme: 'chantier-travaux',
    niveau: 2,
    niveauLabel: 'NUM-07',
    duree: '7 h',
    horaires: '9h00 – 12h30 / 13h30 – 17h00',
    effectifMin: 6,
    effectifMax: 12,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV03_HT,
    accroche:
      'Démarrage, sécurité, comptes rendus et réception avec les skills Claude — de l’analyse du CCTP à la réception des travaux.',
    objectifs: [
      'Utiliser, adapter et créer des skills Claude à partir de la bibliothèque BTP mise à disposition',
      'Préparer le démarrage d’un chantier : analyse du CCTP et de la DPGF, DICT, ordre de service, planning',
      'Produire les documents de sécurité (PPSPS, DUERP de chantier, SOGED) en vue d’une validation QSE',
      'Piloter le chantier au quotidien : compte rendu, tableau d’actions, suivi d’avancement, sous-traitants, métré',
      'Gérer l’administratif jusqu’à la réception : situations, PV de réserves, DOE et courriers',
    ],
    public:
      'Conducteurs de travaux, chefs de chantier, responsables travaux, assistant(e)s travaux',
    casUsage:
      'Analyse CCTP & DPGF, PPSPS, CR, sous-traitants (DC4), PV de réserves, DOE, bibliothèque de skills',
    pdfProgramme:
      '/formations/ia-conduite-travaux-suivi-chantier/programme_OFC_NIV-03_IA_Conduite_travaux_20261017.pdf',
    programmeVersion: 'Référence NIV-03',
    programmeUpdatedAt: '17/10/2026',
    image: '/images/formation-ia-conduite-travaux-btp.webp',
  },
  {
    code: 'NIV-04',
    slug: 'maitriser-claude-ai-btp',
    titre: 'Maîtriser Claude AI pour le BTP',
    promesse:
      'Exploiter l’écosystème Claude (Projects, Cowork, Skills, connecteurs) pour industrialiser vos usages documentaires BTP.',
    casUsageCourts: ['Créer des assistants IA métier', 'Automatiser la production documentaire', 'Connecter Claude à vos outils'],
    gamme: 'deployer',
    theme: 'outils-applications',
    niveau: 2,
    niveauLabel: 'NUM-03',
    duree: '7 h',
    horaires: '9h00 – 12h30 / 13h30 – 17h00',
    effectifMin: 6,
    effectifMax: 12,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV04_HT,
    accroche:
      'Industrialisez Claude dans votre entreprise BTP : Projets, Skills métier, Cowork et connecteurs — sur vos documents réels.',
    objectifs: [
      "Structurer l'usage de Claude dans l'entreprise avec les Projets et une bibliothèque de skills réutilisables",
      'Déléguer la production documentaire à Cowork (CR, mémoires, dossiers) en autonomie supervisée',
      'Connecter Claude à ses outils (messagerie, drive, agenda) via les connecteurs, en sécurisant les données',
      'Automatiser des tâches répétitives et générer des documents en lot avec Claude Code',
      'Fiabiliser, sécuriser et réutiliser ses skills, connecteurs et automatisations',
      "Distinguer ce qui peut être délégué à l'IA de ce qui doit rester en validation humaine (prix, engagements, données sensibles, marchés publics)",
    ],
    public:
      "Référents IA, dirigeants, responsables digitaux, chargés d'affaires et conducteurs de travaux souhaitant industrialiser l'usage de Claude dans l'entreprise",
    casUsage:
      'Projets Claude, bibliothèque de skills BTP, Cowork, connecteurs messagerie/drive/agenda, Claude Code — fil rouge PME BTP',
    pdfProgramme:
      '/formations/maitriser-claude-ai-btp/programme_OFC_NIV-04_Maitriser_Claude_BTP_20261017.pdf',
    programmeVersion: 'Référence NIV-04',
    programmeUpdatedAt: '17/10/2026',
    image: '/images/formation-claude-ai-btp-catalogue.webp',
  },
  {
    code: 'NIV-05',
    slug: 'ia-maitrise-oeuvre',
    titre: 'IA et maîtrise d’œuvre',
    promesse:
      'Coordonner et contrôler le chantier côté MOE/MOEX : analyse DCE, CR, ordres de service, visas, réserves et GPA.',
    casUsageCourts: ['Analyser un dossier MOE', 'Rédiger CR et ordres de service', 'Suivre réserves et réception'],
    gamme: 'appliquer-metier',
    theme: 'maitrise-oeuvre',
    niveau: 2,
    niveauLabel: 'NUM-08',
    duree: '7 h',
    horaires: '9h00 – 12h30 / 13h30 – 17h00',
    effectifMin: 6,
    effectifMax: 12,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV05_HT,
    accroche:
      'Analyse DCE, comptes rendus, ordres de service, réserves et réception — ChatGPT et Claude côté maîtrise d’œuvre.',
    objectifs: [
      'Identifier les fonctionnalités clés de Claude et choisir entre Claude et ChatGPT selon l’usage MOE',
      'Analyser un DCE (CCTP, CCAP, bordereaux) avec l’IA pour en extraire points de conformité et alertes contractuelles',
      'Rédiger un compte rendu de chantier structuré à partir de notes écrites ou vocales',
      'Produire ordres de service, courriers et actes administratifs à partir de modèles réutilisables',
      'Organiser le suivi des réserves, la préparation de la réception et les réponses aux clients',
      'Construire une bibliothèque de prompts réutilisable en respectant la confidentialité des données chantier',
    ],
    public:
      'Maîtres d’œuvre d’exécution (MOEX), conducteurs de travaux MOE, OPC, bureaux d’études techniques, assistant(e)s de gestion travaux',
    casUsage: 'Analyse DCE, CR chantier, OS, courriers MOE, réserves, réception et GPA',
    pdfProgramme:
      '/formations/ia-maitrise-oeuvre/programme_OFC_NIV-05_IA_Maitrise_oeuvre_20261017.pdf',
    programmeVersion: 'Référence NIV-05',
    programmeUpdatedAt: '17/10/2026',
    image: '/images/formation-ia-maitrise-oeuvre-btp.webp',
  },
  {
    code: 'NIV-06',
    slug: 'application-metier-btp-niveau-1',
    titre: 'Créer sa première application métier BTP avec l’IA',
    promesse:
      'Transformer un problème métier en prototype fonctionnel avec le développement assisté par l’intelligence artificielle.',
    casUsageCourts: [
      'Remplacer un fichier Excel métier',
      'Centraliser des informations chantier',
      'Automatiser une tâche répétitive',
    ],
    gamme: 'deployer',
    theme: 'outils-applications',
    niveau: 3,
    niveauLabel: 'Niveau 1 — Concevoir',
    duree: '7 h',
    horaires: 'journée complète ou organisation à convenir',
    effectifMin: 2,
    effectifMax: 8,
    prixHT: 0,
    tarifParcoursAppMetier: 'niveau-1',
    accroche:
      'Découvrir la méthode pour cadrer un besoin métier BTP et obtenir un prototype fonctionnel avec le développement assisté par l’IA — sans compétence préalable en programmation.',
    objectifs: [
      'Identifier un besoin métier pouvant être transformé en application',
      'Formaliser un cahier des charges simple (utilisateurs, données, fonctionnalités)',
      'Comprendre les briques d’une application web (interface, logique, données, hébergement)',
      'Concevoir une interface (navigation, formulaires, tableaux, indicateurs)',
      'Construire les premières fonctionnalités (CRUD, filtres, calculs, statuts)',
      'Tester et améliorer un prototype sur ordinateur et smartphone',
    ],
    public:
      'Dirigeants PME BTP, conducteurs de travaux, chargés d’affaires, responsables administratifs et profils métier porteurs d’un projet d’outil interne',
    casUsage: 'Prototype de suivi, remplacement Excel, outil de saisie chantier',
    pdfProgramme:
      '/formations/application-metier-btp-niveau-1/programme-application-metier-btp-niveau-1-ofc.pdf',
    programmeVersion: 'Version 1',
    programmeUpdatedAt: '01/09/2026',
    image: '/images/formation-ia-architecture-claude-presentiel-groupe.jpg',
  },
  {
    code: 'NIV-07',
    slug: 'application-metier-btp-niveau-2',
    titre: 'Développer une application métier BTP connectée',
    promesse:
      'Faire évoluer un prototype vers une application connectée : base de données, utilisateurs, workflows et services externes.',
    casUsageCourts: [
      'CRM ou suivi commercial BTP',
      'Application devis et métrés',
      'Suivi de trésorerie',
    ],
    gamme: 'deployer',
    theme: 'outils-applications',
    niveau: 3,
    niveauLabel: 'Niveau 2 — Connecter',
    duree: '7 h',
    horaires: 'journée complète ou organisation à convenir',
    effectifMin: 2,
    effectifMax: 8,
    prixHT: 0,
    tarifParcoursAppMetier: 'niveau-2',
    accroche:
      'Structurer une base de données métier, gérer les accès, connecter des services et automatiser des actions — sur votre cas d’usage réel.',
    objectifs: [
      'Structurer une base de données métier (tables, relations, statuts, historique)',
      'Mettre en place authentification, rôles et droits',
      'Construire un workflow métier adapté à son processus',
      'Connecter des services externes (API, calendrier, messagerie, notifications)',
      'Automatiser des actions répétitives et générer des documents',
      'Tester et sécuriser les accès et les données',
    ],
    public:
      'Participants ayant suivi le niveau 1 ou disposant d’un prototype — dirigeants, conducteurs de travaux, responsables BE et profils métier',
    casUsage: 'CRM, devis, trésorerie, site web métier, communication digitale',
    pdfProgramme:
      '/formations/application-metier-btp-niveau-2/programme-application-metier-btp-niveau-2-ofc.pdf',
    programmeVersion: 'Version 1',
    programmeUpdatedAt: '01/09/2026',
    image: '/images/formation-ia-architecture-claude-presentiel-groupe.jpg',
  },
  {
    code: 'NIV-08',
    slug: 'application-metier-btp-niveau-3',
    titre: 'Développer une application métier BTP avancée avec l’IA',
    promesse:
      'Intégrer l’intelligence artificielle dans une application métier : analyse documentaire, workflows IA, déploiement et maintenance.',
    casUsageCourts: [
      'Assistant analyse DCE',
      'Workflow documents chantier',
      'Automatisations métier avec IA',
    ],
    gamme: 'deployer',
    theme: 'outils-applications',
    niveau: 3,
    niveauLabel: 'Niveau 3 — Industrialiser',
    duree: '7 h',
    horaires: 'journée complète ou organisation à convenir',
    effectifMin: 2,
    effectifMax: 8,
    prixHT: 0,
    tarifParcoursAppMetier: 'niveau-3',
    accroche:
      'Intégrer l’IA dans une application métier existante : extraction, classification, génération, workflows automatisés — validation humaine obligatoire.',
    objectifs: [
      'Structurer une application métier avancée (modules, automatisations, dépendances)',
      'Intégrer l’IA pour analyser, extraire, classer, résumer et générer',
      'Exploiter des documents métier (import, recherche, comparaison, structuration)',
      'Construire un workflow IA avec contrôle humain',
      'Automatiser un processus complet (analyse, notifications, documents)',
      'Fiabiliser, sécuriser, déployer et maintenir l’application',
    ],
    public:
      'Participants autonomes sur une application simple — dirigeants, référents digitaux et profils métier avancés du BTP',
    casUsage: 'Assistant DCE, devis, trésorerie, communication, suivi chantier',
    pdfProgramme:
      '/formations/application-metier-btp-niveau-3/programme-application-metier-btp-niveau-3-ofc.pdf',
    programmeVersion: 'Version 1',
    programmeUpdatedAt: '01/09/2026',
    image: '/images/formation-ia-architecture-claude-presentiel-groupe.jpg',
  },
  {
    code: 'NIV-09',
    slug: 'assistants-ia-personnalises-btp',
    titre: 'Créer ses assistants IA pour son entreprise du bâtiment',
    promesse:
      'Créez vos propres assistants IA pour les tâches quotidiennes de votre entreprise du BTP — ChatGPT et Claude, 7 h en présentiel.',
    casUsageCourts: [
      '4 assistants IA métier',
      'Skills BTP personnalisables',
      'Devis, CR, AO, administratif',
    ],
    gamme: 'appliquer-metier',
    theme: 'assistants-automatisation',
    niveau: 2,
    niveauLabel: 'Niveau 2 — Intermédiaire',
    duree: '7 h',
    horaires: '9h00 — 12h30 / 13h30 — 17h00',
    effectifMin: 6,
    effectifMax: 12,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV09_HT,
    accroche:
      'ChatGPT & Claude : fonctionnalités clés et assistants métier — journée pratique pour créer 4 assistants adaptés à vos documents.',
    objectifs: [
      'Utiliser les fonctionnalités clés de ChatGPT et de Claude (projets, skills, connecteurs)',
      'Créer un assistant IA personnalisé et des skills réutilisables pour son entreprise',
      'Alimenter ses assistants avec ses modèles (devis, CR, courriers, conditions générales)',
      'Déployer ses assistants en équipe avec confidentialité et vérification humaine',
      'Appliquer ses assistants à une tâche réelle du quotidien',
    ],
    public:
      'Professionnels du BTP : dirigeants, conducteurs de travaux, chefs d’équipe, chargés d’affaires, assistant(e)s administratifs et travaux, conjoints collaborateurs, fonctions support',
    casUsage: 'Assistants devis, CR chantier, courriers, appels d’offres, administratif, communication',
    pdfProgramme:
      '/formations/assistants-ia-personnalises-btp/programme_OFC_Assistants_IA_BTP_7h_20261022.pdf',
    programmeVersion: '22/10/2026',
    programmeUpdatedAt: '22/10/2026',
    image: '/images/formation-sensibilisation-assistants-ia-btp.png',
  },
  {
    code: 'NIV-10',
    slug: 'developpement-web-ia-sans-coder',
    titre: 'Créer des applications métier BTP avec l’IA',
    promesse:
      'Concevoir, construire et tester une première application métier BTP — sans coder — sur un périmètre défini.',
    casUsageCourts: [
      'Suivi des devis et relances',
      'Planning d’interventions chantier',
      'Tableau de bord affaires',
    ],
    gamme: 'deployer',
    theme: 'outils-applications',
    niveau: 3,
    niveauLabel: 'Niveau 3 — Avancé',
    duree: '14 h',
    horaires: '2 journées — 9h00 – 12h30 / 13h30 – 17h00',
    effectifMin: 4,
    effectifMax: 8,
    prixHT: 0,
    tarifParticipantHt: TARIF_PARTICIPANT_NIV10_14H_HT,
    accroche:
      'Concevoir, construire et tester une première application métier BTP avec l’IA — sans compétence en programmation.',
    objectifs: [
      'Analyser un besoin métier et fixer un périmètre réaliste pour une première version d’application',
      'Organiser le projet : parcours utilisateur, écrans, données et priorités fonctionnelles',
      'Formuler des consignes structurées et exploitables par l’IA, étape par étape',
      'Obtenir une première version testable sans écrire le code soi-même',
      'Appliquer une démarche de test, de correction et de sauvegarde sur son projet',
      'Définir une feuille de route pour poursuivre le projet après la formation',
    ],
    public:
      'Dirigeants de TPE et PME du BTP, conducteurs de travaux et chargés d’affaires, assistant(e)s travaux et fonctions support, indépendants du second œuvre',
    casUsage: 'Outil métier BTP — première version assistée par IA',
    pdfProgramme:
      '/formations/developpement-web-ia-sans-coder/programme_OFC_Niveau3_Outils_Chantier_IA_14h_20261008.pdf',
    programmeVersion: 'Référence NIV-10',
    programmeUpdatedAt: '08/10/2026',
    image: '/images/formation-ia-architecture-claude-presentiel-groupe.jpg',
  },
] as const;

export type FormationCode = (typeof FORMATIONS)[number]['code'];
export type FormationSlug = (typeof FORMATIONS)[number]['slug'];

export const FORMATIONS_COUNT = FORMATIONS.length;

/** Nombre de parcours catalogue officiels (NIV-01 … NIV-10) — copy site, llms.txt, GEO. */
export const CATALOGUE_FORMATIONS_TOTAL = FORMATIONS.length;

/**
 * Durées catalogue — seul NIV-01 (« Les bases de l’IA ») est en 4 h.
 * Toutes les autres sessions publiées sont en 7 h, sauf NIV-10 (14 h).
 */
export const CATALOGUE_DUREE_BASES_IA_ONLY = '4 h' as const;
export const CATALOGUE_DUREE_SESSION_METIER = '7 h' as const;
export const CATALOGUE_DUREE_NIV10 = '14 h' as const;

/** Plage de numérotation catalogue — NIV-01 … NIV-10. */
export const CATALOGUE_NIV_RANGE = 'NIV-01 à NIV-10' as const;

export function getFormationByCode(code: string): Formation | undefined {
  return FORMATIONS.find((f) => f.code === code);
}

export function getFormationBySlug(slug: string): Formation | undefined {
  return FORMATIONS.find((f) => f.slug === slug);
}

export function formationHref(f: Pick<Formation, 'slug'>): string {
  return `/formations/${f.slug}`;
}

/** Affichage durée (+ horaires si présents ; sans préfixe « matin » abusif). */
export function libelleDureeFormation(f: Pick<Formation, 'duree' | 'horaires'>): string {
  if (!f.horaires) return f.duree;
  return `${f.duree} (${f.horaires})`;
}

/** « 4 à 12 participants » — jamais de littéral hors de cette helper. */
export function libelleEffectifFormation(
  f: Pick<Formation, 'effectifMin' | 'effectifMax'>
): string {
  if (f.effectifMin === f.effectifMax) {
    return `${f.effectifMax} participants`;
  }
  return `${f.effectifMin} à ${f.effectifMax} participants`;
}

export function libelleEffectifMaxFormation(f: Pick<Formation, 'effectifMax'>): string {
  return `${f.effectifMax} participants max`;
}

/** Format FR du prix HT (ex. 1 200). */
export function formatPrixHt(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount);
}

export function isFormationSurDevis(
  f: Pick<Formation, 'prixHT' | 'tarifParticipantHt'>,
): boolean {
  return f.prixHT <= 0 && !f.tarifParticipantHt;
}

export function libellePrixSessionHt(
  f: Pick<Formation, 'prixHT' | 'tarifParticipantHt'>,
): string {
  if (f.tarifParticipantHt && f.tarifParticipantHt > 0) {
    return `${formatPrixHt(f.tarifParticipantHt)} € HT / participant`;
  }
  if (isFormationSurDevis(f)) return 'Sur devis';
  return 'Sur devis';
}

export const FORMATION_NIV01 = getFormationByCode('NIV-01')!;
export const FORMATION_NIV02 = getFormationByCode('NIV-02')!;

/** Prix catalogue par niveau pédagogique (source FORMATIONS) — HT / participant. */
export const PRIX_NIVEAU_1_HT = FORMATION_NIV01.tarifParticipantHt ?? TARIF_PARTICIPANT_NIV01_HT;
export const PRIX_NIVEAU_2_HT = FORMATION_NIV02.tarifParticipantHt ?? TARIF_PARTICIPANT_NIV02_HT;

/** Effectif max absolu du catalogue (NIV-01). */
export const EFFECTIF_CATALOGUE_MAX = Math.max(...FORMATIONS.map((f) => f.effectifMax));
