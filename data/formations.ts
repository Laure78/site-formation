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
  /** Version du programme (ex. « Version 2 ») — affichée dans le catalogue */
  programmeVersion: string;
  /** Date de mise à jour du programme PDF (JJ/MM/AAAA) — catalogue et Informations pratiques */
  programmeUpdatedAt: string;
  /** Chemin public de l’affiche catalogue */
  image: string;
};

export const FORMATIONS: readonly Formation[] = [
  {
    code: 'NIV-01',
    slug: 'ia-batiment-travaux-publics',
    titre: "L'IA au service des professionnels du BTP",
    niveau: 1,
    niveauLabel: 'Niveau 1',
    duree: '4 h',
    horaires: '9h00 — 13h00',
    effectifMin: 4,
    effectifMax: 12,
    prixHT: 1200,
    accroche:
      'Niveau 1 — fondamentaux ChatGPT et IA générative pour artisans, PME et fonctions support du bâtiment.',
    objectifs: [
      'Maîtriser les outils IA adaptés aux métiers du BTP pour automatiser les tâches chronophages (mails, devis, documents, communication)',
      'Générer des devis techniques conformes aux DTU et règles professionnelles, adaptés à son métier',
      'Rédiger des documents réglementaires (DOE, PV de réception, fiches techniques, rapports de fin de chantier) avec l’IA',
      'Créer du contenu professionnel pour valoriser son expertise BTP sur les réseaux sociaux et auprès de ses clients',
      'Appliquer les bonnes pratiques RGPD dans l’utilisation de l’IA pour sécuriser les données entreprise et clients',
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
    titre: "L'IA appliquée aux appels d'offres BTP",
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    horaires: '9h00 — 13h00 ou 13h30 — 17h30 (à convenir)',
    effectifMin: 8,
    effectifMax: 12,
    prixHT: 1200,
    accroche:
      'Niveau 2 : Claude AI Pro, Cowork & Skills — analyse DCE, mémoire technique et assistants IA réutilisables.',
    objectifs: [
      'Paramétrer Claude AI Pro (Projects, instructions personnalisées) pour l\'adapter à son métier et à ses appels d\'offres',
      'Analyser un DCE complet via Cowork en extrayant les 15 informations critiques (critères de jugement, clauses éliminatoires, pénalités, délais)',
      'Structurer un plan de mémoire technique adapté aux pondérations spécifiques du DCE avec l\'assistance de l\'IA',
      'Rédiger les 5 sections clés d\'un mémoire technique (présentation, méthodologie, moyens, sécurité, environnement) en utilisant les skills dédiés',
      'Créer et configurer ses propres skills spécialisés DCE et mémoire technique, alimentés par ses données d\'entreprise et réutilisables sur ses futurs appels d\'offres',
      'Contrôler la fiabilité des productions générées (anti-hallucination, relecture experte) avant toute remise d\'offre',
    ],
    public:
      'Dirigeants, responsables d\'affaires, chargés d\'études, conducteurs de travaux et directeurs techniques de TPE/PME du BTP et de bureaux d\'études',
    casUsage: 'DCE, mémoires techniques, skills Cowork',
    pdfProgramme:
      '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf',
    programmeVersion: 'Version 2',
    programmeUpdatedAt: '22/08/2026',
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
    titre: 'Maîtriser Claude AI pour le BTP — Chat, Cowork & Code',
    niveau: 2,
    niveauLabel: 'Avancé',
    duree: '4 h',
    horaires: 'matin (9h00 – 13h00)',
    effectifMin: 1,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      'Industrialisez Claude dans votre entreprise BTP : Projets, Skills métier, Cowork, connecteurs et Claude Code — sur vos documents réels.',
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
    titre: "L'IA au service des maîtres d'œuvre",
    niveau: 2,
    niveauLabel: 'Niveau 2',
    duree: '4 h',
    horaires: '9h00 – 13h00 ou 13h30 – 17h30',
    effectifMin: 3,
    effectifMax: 8,
    prixHT: 1200,
    accroche:
      "Maîtrise d'œuvre d'exécution — 5 modules opérationnels, avec introduction à Claude.",
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
] as const;

export type FormationCode = (typeof FORMATIONS)[number]['code'];
export type FormationSlug = (typeof FORMATIONS)[number]['slug'];

export const FORMATIONS_COUNT = FORMATIONS.length;

/** Plage de numérotation catalogue — 5 formations (NIV-01 … NIV-05). */
export const CATALOGUE_NIV_RANGE = 'NIV-01 à NIV-05' as const;

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
  return `${formatPrixHt(f.prixHT)} € HT / session forfaitaire`;
}

export const FORMATION_NIV01 = getFormationByCode('NIV-01')!;
export const FORMATION_NIV02 = getFormationByCode('NIV-02')!;

/** Prix catalogue par niveau pédagogique (source FORMATIONS). */
export const PRIX_NIVEAU_1_HT = FORMATION_NIV01.prixHT;
export const PRIX_NIVEAU_2_HT = FORMATION_NIV02.prixHT;

/** Effectif max absolu du catalogue (NIV-01). */
export const EFFECTIF_CATALOGUE_MAX = Math.max(...FORMATIONS.map((f) => f.effectifMax));
