/**
 * Source de vérité — 5 parcours catalogue OFC (prix, durée, effectifs, contenus).
 * Ne plus dupliquer ces valeurs en dur dans le JSX / FAQ / lib.
 */

import {
  TARIF_APPLICATION_METIER_BTP_NIV1_HT,
  TARIF_APPLICATION_METIER_BTP_NIV2_HT,
  TARIF_APPLICATION_METIER_BTP_NIV3_HT,
} from '@/lib/tarifs-applications-metier-btp';

export type FormationNiveau = 1 | 2;

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
  prixHT: number;
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
    titre: 'Formation IA BTP : devis, emails et productivité',
    promesse:
      'Comprendre l’IA générative et l’utiliser sur vos documents BTP : devis, emails, comptes rendus et DOE.',
    casUsageCourts: ['Rédiger un devis ou une désignation', 'Préparer un compte rendu', 'Structurer un DOE ou PV'],
    gamme: 'decouvrir',
    niveau: 1,
    niveauLabel: 'Niveau 1',
    duree: '4 h',
    horaires: '9h00 — 13h00',
    effectifMin: 4,
    effectifMax: 12,
    prixHT: 1200,
    accroche:
      'Fondamentaux ChatGPT et IA générative pour TPE, PME du bâtiment et fonctions support — devis, DOE et communication sur vos documents réels.',
    objectifs: [
      'Formuler une demande précise à une IA (ChatGPT, Claude) pour des documents du BTP',
      'Préparer et structurer une première version de devis, soumise au contrôle du professionnel',
      'Transformer des notes en compte rendu, trame de DOE ou de PV — avec relecture humaine',
      'Préparer des emails et contenus professionnels à partir de cas métier',
      'Anonymiser les documents et appliquer les règles de confidentialité avant tout usage de l’IA',
    ],
    public:
      'Dirigeants BTP (gros œuvre, second œuvre, étanchéité, bardage, couverture, électricité, plomberie, peinture, VRD, TP), chargés d’affaires, conducteurs de travaux, techniciens bureau d’études, assistantes administratives et fonctions support',
    casUsage: 'Devis, DOE, PV, CR, communication digitale',
    pdfProgramme: '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf',
    programmeVersion: 'Version 5',
    programmeUpdatedAt: '22/08/2026',
    image: '/images/formation-ia-batiment-travaux-publics.webp',
  },
  {
    code: 'NIV-02',
    slug: 'ia-appels-offre-btp',
    titre: 'Formation IA appels d’offres BTP : analyser un DCE et préparer son mémoire technique',
    promesse:
      'En quatre heures, construire une méthode guidée pour analyser un DCE, préparer le chiffrage et structurer un mémoire technique avec l’IA.',
    casUsageCourts: [
      'Extraire les exigences d’un DCE',
      'Préparer une checklist de chiffrage',
      'Structurer un mémoire technique',
    ],
    gamme: 'appliquer-metier',
    theme: 'appels-offres-etudes',
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    horaires: '9h00 — 13h00 ou 13h30 — 17h30 (à convenir)',
    effectifMin: 8,
    effectifMax: 12,
    prixHT: 1200,
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
      '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf',
    programmeVersion: 'Version 2',
    programmeUpdatedAt: '22/08/2026',
    image: '/images/formation-ia-appels-offres-btp.webp',
  },
  {
    code: 'NIV-03',
    slug: 'ia-conduite-travaux-suivi-chantier',
    titre: 'Formation IA conducteur de travaux : suivi chantier, CR et DOE',
    promesse:
      'Piloter le chantier avec l’IA : analyser le CCTP, produire vos CR, suivre les actions et structurer le DOE jusqu’à la réception.',
    casUsageCourts: ['Analyser un CCTP et préparer le chantier', 'Rédiger un compte rendu', 'Organiser réserves et DOE'],
    gamme: 'appliquer-metier',
    theme: 'chantier-travaux',
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    effectifMin: 4,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      'Pilotez vos chantiers avec l\'IA — bibliothèque de 20+ skills Claude, de l\'analyse du CCTP à la réception des travaux.',
    objectifs: [
      'Comprendre le fonctionnement des skills Claude et accéder à la bibliothèque de skills BTP mise à disposition',
      "Préparer et démarrer un chantier avec l'IA : analyse du CCTP, génération de la DPGF, DICT, ordre de service, planning",
      'Sécuriser le chantier (PPSPS, DUERP, SOGED) et le piloter au quotidien : CR, suivi, approvisionnements, sous-traitants, métré, avenants, budget',
      "Gérer l'administratif de suivi jusqu'à la réception : situations, PV de réserves, DOE, litiges",
    ],
    public:
      'Conducteurs de travaux — chefs de chantier, responsables travaux, assistant(e)s travaux',
    casUsage:
      'Analyse CCTP & DPGF, PPSPS, CR, sous-traitants (DC4), PV de réserves, DOE, bibliothèque de skills',
    pdfProgramme: '/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf',
    programmeVersion: 'Version 3',
    programmeUpdatedAt: '22/08/2026',
    image: '/images/formation-ia-conduite-travaux-btp.webp',
  },
  {
    code: 'NIV-04',
    slug: 'maitriser-claude-ai-btp',
    titre: 'Maîtriser Claude pour le BTP : Projects, Cowork et Skills',
    promesse:
      'Exploiter l’écosystème Claude (Projects, Cowork, Skills, connecteurs) pour industrialiser vos usages documentaires BTP.',
    casUsageCourts: ['Créer des assistants IA métier', 'Automatiser la production documentaire', 'Connecter Claude à vos outils'],
    gamme: 'deployer',
    theme: 'outils-applications',
    niveau: 2,
    niveauLabel: 'Avancé',
    duree: '4 h',
    horaires: '9h00 – 13h00',
    effectifMin: 1,
    effectifMax: 8,
    prixHT: 1200,
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
    pdfProgramme: '/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf',
    programmeVersion: 'Version 3',
    programmeUpdatedAt: '22/08/2026',
    image: '/images/formation-claude-ai-btp-catalogue.webp',
  },
  {
    code: 'NIV-05',
    slug: 'ia-maitrise-oeuvre',
    titre: "Formation IA maîtrise d'œuvre : CR, OS et réception chantier",
    promesse:
      'Coordonner et contrôler le chantier côté MOE/MOEX : analyse DCE, CR, ordres de service, visas, réserves et GPA.',
    casUsageCourts: ['Analyser un dossier MOE', 'Rédiger CR et ordres de service', 'Suivre réserves et réception'],
    gamme: 'appliquer-metier',
    theme: 'maitrise-oeuvre',
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    horaires: '9h00 – 13h00 ou 13h30 – 17h30',
    effectifMin: 3,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      "Maîtrise d'œuvre d'exécution — analyse DCE, CR chantier, OS et suivi réserves avec ChatGPT et Claude.",
    objectifs: [
      "Identifier les fonctionnalités clés de Claude (Projets, connecteurs, skills, Cowork) et choisir entre Claude et ChatGPT selon le cas d'usage MOE",
      'Analyser un dossier d\'appel d\'offres (DCE, CCTP, bordereau) avec l\'IA pour en extraire les points de conformité et les alertes contractuelles',
      'Rédiger un compte rendu de chantier complet en moins de 10 minutes à partir de notes vocales ou prises au fil de l\'eau',
      'Produire courriers, ordres de service et actes administratifs conformes à partir d\'un modèle IA structuré',
      'Organiser le suivi des réserves, la préparation de réception et le suivi client avec un assistant IA dédié',
      'Utiliser ChatGPT et Claude en autonomie sur un poste de maîtrise d\'œuvre, en respectant la confidentialité des données chantier',
      'Construire une bibliothèque de prompts réutilisables sur l\'ensemble de ses opérations',
    ],
    public:
      "Maîtres d'œuvre d'exécution (MOEX), conducteurs de travaux, OPC, BET, assistant(e)s de gestion travaux",
    casUsage: 'Analyse DCE, CR chantier, OS, courriers MOE, réserves, réception et GPA',
    pdfProgramme: '/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf',
    programmeVersion: 'Version 3',
    programmeUpdatedAt: '22/08/2026',
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
    niveau: 2,
    niveauLabel: 'Niveau 1 — Concevoir',
    duree: '7 h',
    horaires: 'journée complète ou organisation à convenir',
    effectifMin: 1,
    effectifMax: 8,
    prixHT: TARIF_APPLICATION_METIER_BTP_NIV1_HT,
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
    niveau: 2,
    niveauLabel: 'Niveau 2 — Connecter',
    duree: '7 h',
    horaires: 'journée complète ou organisation à convenir',
    effectifMin: 1,
    effectifMax: 8,
    prixHT: TARIF_APPLICATION_METIER_BTP_NIV2_HT,
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
    niveau: 2,
    niveauLabel: 'Niveau 3 — Industrialiser',
    duree: '7 h',
    horaires: 'journée complète ou organisation à convenir',
    effectifMin: 1,
    effectifMax: 8,
    prixHT: TARIF_APPLICATION_METIER_BTP_NIV3_HT,
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
] as const;

export type FormationCode = (typeof FORMATIONS)[number]['code'];
export type FormationSlug = (typeof FORMATIONS)[number]['slug'];

export const FORMATIONS_COUNT = FORMATIONS.length;

/** Plage de numérotation catalogue — 8 formations (NIV-01 … NIV-08). */
export const CATALOGUE_NIV_RANGE = 'NIV-01 à NIV-08' as const;

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

export function libellePrixSessionHt(f: Pick<Formation, 'prixHT'>): string {
  return `${formatPrixHt(f.prixHT)} € HT par session (intra-entreprise)`;
}

export const FORMATION_NIV01 = getFormationByCode('NIV-01')!;
export const FORMATION_NIV02 = getFormationByCode('NIV-02')!;

/** Prix catalogue par niveau pédagogique (source FORMATIONS). */
export const PRIX_NIVEAU_1_HT = FORMATION_NIV01.prixHT;
export const PRIX_NIVEAU_2_HT = FORMATION_NIV02.prixHT;

/** Effectif max absolu du catalogue (NIV-01). */
export const EFFECTIF_CATALOGUE_MAX = Math.max(...FORMATIONS.map((f) => f.effectifMax));
