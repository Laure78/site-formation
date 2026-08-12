/**
 * Source de vérité — 5 parcours catalogue OFC (prix, durée, effectifs, contenus).
 * Ne plus dupliquer ces valeurs en dur dans le JSX / FAQ / lib.
 */

export type FormationNiveau = 1 | 2;

export type Formation = {
  code: string;
  slug: string;
  titre: string;
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
  /** Chemin public de l’affiche catalogue */
  image: string;
};

export const FORMATIONS: readonly Formation[] = [
  {
    code: 'NIV-01',
    slug: 'ia-batiment-travaux-publics',
    titre: "L'IA au service des pros du bâtiment et des travaux publics",
    niveau: 1,
    niveauLabel: 'Niveau 1',
    duree: '4 h',
    effectifMin: 4,
    effectifMax: 12,
    prixHT: 1000,
    accroche: 'Niveau 1 : bases opérationnelles pour équipes bâtiment et travaux publics.',
    objectifs: [
      'Comprendre les usages de l’IA générative utiles sur chantier et au bureau',
      'Accélérer devis, comptes rendus, courriers et suivi client',
      'Structurer l’administratif et repartir avec des prompts adaptés au BTP / TP',
    ],
    public: 'Dirigeants, conducteurs de travaux — bâtiment, TP, fonctions support',
    casUsage: 'Devis, CR, documents, terrain',
    pdfProgramme: '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf',
    image: '/images/formation-ia-batiment-travaux-publics.webp',
  },
  {
    code: 'NIV-02',
    slug: 'ia-appels-offre-btp',
    titre: "L'IA appliquée aux appels d'offres BTP",
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    effectifMin: 4,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      'Niveau 2 : Claude AI Pro, Cowork & Skills — analyse DCE, mémoire technique et assistants IA réutilisables.',
    objectifs: [
      'Paramétrer Claude AI Pro (Projects, instructions) et installer Cowork sur le poste',
      'Analyser un DCE complet via Cowork — 15 informations critiques, verdict Go / No Go',
      'Structurer et rédiger un mémoire technique avec les skills Cowork dédiés',
      "Créer des skills DCE / MT personnalisés, alimentés par les données de l'entreprise",
    ],
    public:
      "Dirigeants, responsables d'affaires, chargés d'études, conducteurs de travaux, directeurs techniques, bureaux d'études",
    casUsage: 'DCE, mémoires techniques, skills Cowork',
    pdfProgramme:
      '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf',
    image: '/images/formation-ia-appels-offres-btp.webp',
  },
  {
    code: 'NIV-03',
    slug: 'ia-conduite-travaux-suivi-chantier',
    titre: "L'IA appliquée à la conduite de travaux",
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    effectifMin: 4,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      "Niveau 2 : pilotez vos chantiers avec l'IA — une bibliothèque de 20+ skills Claude, de l'analyse du CCTP à la réception des travaux.",
    objectifs: [
      'Comprendre le fonctionnement des skills Claude et accéder à la bibliothèque de skills BTP mise à disposition',
      "Préparer et démarrer un chantier avec l'IA : analyse du CCTP, génération de la DPGF, conformité DTU, DICT, ordre de service, planning",
      'Sécuriser le chantier (PPSPS, DUERP, SOGED) et le piloter au quotidien : CR, suivi, approvisionnements, sous-traitants, métré, avenants, budget',
      "Gérer l'administratif de suivi jusqu'à la réception : situations, PV de réserves, DOE, litiges",
    ],
    public:
      'Conducteurs de travaux — chefs de chantier, responsables travaux, assistant(e)s travaux',
    casUsage:
      'Analyse CCTP & DPGF, PPSPS, CR, sous-traitants (DC4), PV de réserves, DOE, bibliothèque de skills',
    pdfProgramme: '/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf',
    image: '/images/formation-ia-conduite-travaux-btp.webp',
  },
  {
    code: 'NIV-04',
    slug: 'maitriser-claude-ai-btp',
    titre: 'Maîtriser Claude AI pour le BTP — Chat, Cowork & Code',
    niveau: 2,
    niveauLabel: 'Avancé',
    duree: '4 h',
    horaires: 'matin (9h00 – 13h00)',
    effectifMin: 4,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      'Industrialisez Claude dans votre entreprise BTP : Projets, Skills métier, Cowork, connecteurs et Claude Code — sur vos documents réels.',
    objectifs: [
      "Structurer l'usage de Claude dans l'entreprise avec les Projets et une bibliothèque de Skills",
      "Installer et utiliser des skills adaptés à votre métier : appels d'offres (RC, DCE/DQE), chantier (CCTP, CR, levée des réserves), administratif",
      'Déléguer la production documentaire à Cowork (CR, mémoires, dossiers) en autonomie supervisée',
      'Connecter Claude à vos outils (Gmail, Drive, agenda) via les connecteurs, en sécurisant les données',
      'Automatiser des tâches répétitives et générer des documents en lot avec Claude Code',
    ],
    public:
      "Référents IA, dirigeants, responsables digitaux, chargés d'affaires, conducteurs de travaux, bureau d'études, fonctions administratives",
    casUsage:
      'Projets Claude, Skills métier (AO, chantier, administratif, juridique), Cowork, connecteurs Gmail/Drive, Claude Code',
    pdfProgramme: '/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf',
    image: '/images/formation-claude-ai-btp-catalogue.webp',
  },
  {
    code: 'NIV-05',
    slug: 'ia-maitrise-oeuvre',
    titre: "L'IA au service des maîtres d'œuvre",
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    effectifMin: 3,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      "Niveau 2 : IA pour maîtres d'œuvre d'exécution — analyse DCE, CR chantier, OS, courriers et suivi des réserves.",
    objectifs: [
      "Choisir entre Claude et ChatGPT selon le cas d'usage MOE (Projets, Connecteurs, Skills, Cowork)",
      'Analyser un DCE (CCTP, bordereau) et extraire conformité et alertes contractuelles',
      'Rédiger un compte rendu de chantier en moins de 10 minutes à partir de notes vocales',
      'Produire courriers, ordres de service et actes administratifs conformes',
      'Organiser le suivi des réserves, la réception et le suivi client avec un assistant IA',
    ],
    public:
      "Maîtres d'œuvre d'exécution (MOEX), conducteurs de travaux, OPC, BET, assistant(e)s gestion travaux",
    casUsage: 'Analyse DCE, CR chantier, OS, courriers MOE, réserves et réception',
    pdfProgramme: '/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf',
    image: '/images/formation-ia-maitrise-oeuvre-btp.webp',
  },
] as const;

export type FormationCode = (typeof FORMATIONS)[number]['code'];
export type FormationSlug = (typeof FORMATIONS)[number]['slug'];

export const FORMATIONS_COUNT = FORMATIONS.length;

export function getFormationByCode(code: string): Formation | undefined {
  return FORMATIONS.find((f) => f.code === code);
}

export function getFormationBySlug(slug: string): Formation | undefined {
  return FORMATIONS.find((f) => f.slug === slug);
}

export function formationHref(f: Pick<Formation, 'slug'>): string {
  return `/formations/${f.slug}`;
}

/** Affichage durée (+ horaires si présents ; évite le double « matin »). */
export function libelleDureeFormation(f: Pick<Formation, 'duree' | 'horaires'>): string {
  if (!f.horaires) return f.duree;
  if (/matin/i.test(f.horaires)) {
    return `${f.duree} ${f.horaires}`;
  }
  return `${f.duree} matin (${f.horaires})`;
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
  return `${formatPrixHt(f.prixHT)} € HT`;
}

export const FORMATION_NIV01 = getFormationByCode('NIV-01')!;
export const FORMATION_NIV02 = getFormationByCode('NIV-02')!;

/** Prix catalogue par niveau pédagogique (source FORMATIONS). */
export const PRIX_NIVEAU_1_HT = FORMATION_NIV01.prixHT;
export const PRIX_NIVEAU_2_HT = FORMATION_NIV02.prixHT;

/** Effectif max absolu du catalogue (NIV-01). */
export const EFFECTIF_CATALOGUE_MAX = Math.max(...FORMATIONS.map((f) => f.effectifMax));
