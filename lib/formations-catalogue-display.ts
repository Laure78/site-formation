import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import {
  SESSION_DUREE_LIBELLE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
  LIBELLE_EFFECTIF_GROUPE_NIV02,
  libelleTarifParticipant,
  tarifHtDepuisBadgeCatalogue,
  formatTarifHt,
} from '@/lib/tarifs-sessions';

export type CatalogueLevel = 'DÉBUTANT' | 'AVANCÉ';

export type FormationCatalogueEntry = {
  ref: string;
  level: CatalogueLevel;
  title: string;
  href: string;
  visuel: (typeof PHOTOS)[keyof typeof PHOTOS];
  duree: string;
  effectif: string;
  objectifs: string[];
  /** Pitch une ligne — catalogue / cartes */
  pitch: string;
  /** Slug URL fiche (segment final) — UTM intra-devis */
  slug: string;
  /** Programme officiel PDF */
  programmePdfHref: string;
  /** Profils « Quelle formation choisir ? » */
  profileTags: Array<'debutant' | 'appels-offres' | 'conduite-travaux' | 'maitriser-claude' | 'maitrise-oeuvre'>;
  /** Ligne tableau comparatif */
  comparatif: {
    publicLabel: string;
    casUsage: string;
  };
};

/** Quatre parcours officiels — niveau 1 et niveau 2 (programmes PDF). */
export const FORMATIONS_CATALOGUE: FormationCatalogueEntry[] = [
  {
    ref: 'NIV-01',
    level: 'DÉBUTANT',
    title: "L'IA au service des pros du bâtiment et des travaux publics",
    href: '/formations/ia-batiment-travaux-publics',
    slug: 'ia-batiment-travaux-publics',
    programmePdfHref: '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf',
    visuel: PHOTOS.formationNiv01IaBatimentTravauxPublics2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: "Niveau 1 : bases opérationnelles pour équipes bâtiment et travaux publics.",
    profileTags: ['debutant'],
    objectifs: [
      'Comprendre les usages de l’IA générative utiles sur chantier et au bureau',
      'Accélérer devis, comptes rendus, courriers et suivi client',
      'Structurer l’administratif et repartir avec des prompts adaptés au BTP / TP',
    ],
    comparatif: {
      publicLabel: 'Dirigeants, conducteurs de travaux — bâtiment, TP, fonctions support',
      casUsage: 'Devis, CR, documents, terrain',
    },
  },
  {
    ref: 'NIV-02',
    level: 'AVANCÉ',
    title: "L'IA appliquée aux appels d'offres BTP",
    href: '/formations/ia-appels-offre-btp',
    slug: 'ia-appels-offre-btp',
    programmePdfHref: LINKS.pdfProgrammeFormationAoBtpDetail2026,
    visuel: PHOTOS.formationNiv02IaAppelsOffreBtp2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_NIV02,
    pitch:
      "Niveau 2 : Claude AI Pro, Cowork & Skills — analyse DCE, mémoire technique et assistants IA réutilisables.",
    profileTags: ['appels-offres'],
    objectifs: [
      'Paramétrer Claude AI Pro (Projects, instructions) et installer Cowork sur le poste',
      'Analyser un DCE complet via Cowork — 15 informations critiques, verdict Go / No Go',
      'Structurer et rédiger un mémoire technique avec les skills Cowork dédiés',
      'Créer des skills DCE / MT personnalisés, alimentés par les données de l\'entreprise',
    ],
    comparatif: {
      publicLabel: 'Dirigeants, responsables d\'affaires, chargés d\'études, conducteurs de travaux, directeurs techniques, bureaux d\'études',
      casUsage: 'DCE, mémoires techniques, skills Cowork',
    },
  },
  {
    ref: 'NIV-03',
    level: 'AVANCÉ',
    title: "L'IA appliquée à la conduite de travaux",
    href: LINKS.formationConduiteTravauxSuiviChantier,
    slug: 'ia-conduite-travaux-suivi-chantier',
    programmePdfHref: LINKS.pdfProgrammeConduiteTravauxNiv03,
    visuel: PHOTOS.formationNiv03IaConduiteTravaux2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: '8 participants max',
    pitch:
      "Niveau 2 : pilotez vos chantiers avec l'IA — une bibliothèque de 20+ skills Claude, de l'analyse du CCTP à la réception des travaux.",
    profileTags: ['conduite-travaux'],
    objectifs: [
      'Comprendre le fonctionnement des skills Claude et accéder à la bibliothèque de skills BTP mise à disposition',
      'Préparer et démarrer un chantier avec l\'IA : analyse du CCTP, génération de la DPGF, conformité DTU, DICT, ordre de service, planning',
      'Sécuriser le chantier (PPSPS, DUERP, SOGED) et le piloter au quotidien : CR, suivi, approvisionnements, sous-traitants, métré, avenants, budget',
      'Gérer l\'administratif de suivi jusqu\'à la réception : situations, PV de réserves, DOE, litiges',
    ],
    comparatif: {
      publicLabel:
        'Conducteurs de travaux — chefs de chantier, responsables travaux, assistant(e)s travaux',
      casUsage:
        'Analyse CCTP & DPGF, PPSPS, CR, sous-traitants (DC4), PV de réserves, DOE, bibliothèque de skills',
    },
  },
  {
    ref: 'NIV-04',
    level: 'AVANCÉ',
    title: 'Maîtriser Claude AI pour le BTP',
    href: LINKS.formationMaitriserClaudeAiBtp,
    slug: 'maitriser-claude-ai-btp',
    programmePdfHref: LINKS.pdfProgrammeMaitriserClaudeBtpNiv04,
    visuel: PHOTOS.formationNiv04MaitriserClaudeAiBtp2026,
    duree: '4 h · matin (9h00 – 13h00)',
    effectif: '8 participants max',
    pitch:
      "Niveau 2 : industrialisez l'IA dans votre entreprise BTP — Projets, Skills, Cowork, connecteurs et Claude Code, sur vos cas réels.",
    profileTags: ['maitriser-claude'],
    objectifs: [
      'Structurer l\'usage de Claude dans l\'entreprise avec les Projets et une bibliothèque de Skills',
      'Déléguer la production documentaire à Cowork (CR, mémoires, dossiers) en autonomie supervisée',
      'Connecter Claude à ses outils (Gmail, Drive, agenda) via les connecteurs, en sécurisant les données',
      'Automatiser des tâches répétitives et générer des documents en lot avec Claude Code',
      'Fiabiliser, sécuriser et réutiliser ses skills, connecteurs et automatisations Claude',
    ],
    comparatif: {
      publicLabel:
        'Référents IA, dirigeants, responsables digitaux, chargés d\'affaires et conducteurs de travaux',
      casUsage: 'Projets Claude, Skills, Cowork, connecteurs (Gmail/Drive), Claude Code, automatisation',
    },
  },
  {
    ref: 'NIV-05',
    level: 'AVANCÉ',
    title: "L'IA au service des maîtres d'œuvre",
    href: LINKS.formationIaMaitriseOeuvre,
    slug: 'ia-maitrise-oeuvre',
    programmePdfHref: LINKS.pdfProgrammeIaMaitriseOeuvre,
    visuel: PHOTOS.formationNiv05IaMaitriseOeuvre2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: '3 à 8 participants',
    pitch:
      "Niveau 2 : IA pour maîtres d'œuvre d'exécution — analyse DCE, CR chantier, OS, courriers et suivi des réserves.",
    profileTags: ['maitrise-oeuvre'],
    objectifs: [
      'Choisir entre Claude et ChatGPT selon le cas d\'usage MOE (Projets, Connecteurs, Skills, Cowork)',
      'Analyser un DCE (CCTP, bordereau) et extraire conformité et alertes contractuelles',
      'Rédiger un compte rendu de chantier en moins de 10 minutes à partir de notes vocales',
      'Produire courriers, ordres de service et actes administratifs conformes',
      'Organiser le suivi des réserves, la réception et le suivi client avec un assistant IA',
    ],
    comparatif: {
      publicLabel:
        'Maîtres d\'œuvre d\'exécution (MOEX), conducteurs de travaux, OPC, BET, assistant(e)s gestion travaux',
      casUsage: 'Analyse DCE, CR chantier, OS, courriers MOE, réserves et réception',
    },
  },
];

/** Nombre de parcours catalogue — source unique pour copy SEO et JSON-LD. */
export const CATALOGUE_FORMATIONS_COUNT = FORMATIONS_CATALOGUE.length;

export function getFormationCatalogueByRef(ref: string): FormationCatalogueEntry | undefined {
  return FORMATIONS_CATALOGUE.find((e) => e.ref === ref);
}

/** Visuel promotionnel catalogue — source unique pour cartes, hero fiches et OG image. */
export function getFormationCatalogueVisuel(ref: string) {
  const entry = getFormationCatalogueByRef(ref);
  if (!entry) {
    throw new Error(`Référence catalogue inconnue : ${ref}`);
  }
  return entry.visuel;
}

/** Niveau pédagogique affiché (sans code NIV-XX). */
export function catalogueNiveauLabel(ref: string): 'Niveau 1' | 'Niveau 2' {
  return ref === 'NIV-01' ? 'Niveau 1' : 'Niveau 2';
}

export function isCatalogueNiveau1(ref: string): boolean {
  return ref === 'NIV-01';
}

/** Ligne hero / carte : « Niveau 1 · Débutant » ou « Niveau 2 · Avancé ». */
export function catalogueNiveauEtLevel(ref: string, level: CatalogueLevel): string {
  const niveau = catalogueNiveauLabel(ref);
  const levelLabel = level === 'DÉBUTANT' ? 'Débutant' : 'Avancé';
  return `${niveau} · ${levelLabel}`;
}

/** Libellé lien UI — titre officiel (sans code NIV-XX). */
export function formationCatalogueLinkLabel(
  entry: Pick<FormationCatalogueEntry, 'title'>
): string {
  return entry.title;
}

/** Badge pédagogique affiché sur cartes accueil : NIVEAU 1 ou NIVEAU 2. */
export function cataloguePedagogicalLevelBadge(ref: string): string {
  return catalogueNiveauLabel(ref).toUpperCase();
}

const LEVEL_ORDER: Record<CatalogueLevel, number> = { DÉBUTANT: 0, AVANCÉ: 1 };

function refNum(ref: string) {
  return parseInt(ref.replace(/\D/g, ''), 10);
}

/** Tri affichage catalogue : débutant puis avancé, puis numéro de réf. */
export function sortFormationsCatalogue(
  list: FormationCatalogueEntry[]
): FormationCatalogueEntry[] {
  return [...list].sort((a, b) => {
    const lr = LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level];
    if (lr !== 0) return lr;
    return refNum(a.ref) - refNum(b.ref);
  });
}

export function tarifLabel(level: CatalogueLevel): string {
  return libelleTarifParticipant(level);
}

/** Libellé tarif carte catalogue */
export function tarifLabelForEntry(entry: FormationCatalogueEntry): string {
  const n = formatTarifHt(tarifHtDepuisBadgeCatalogue(entry.level));
  if (entry.effectif !== LIBELLE_EFFECTIF_GROUPE_COURT) {
    return `${n} € HT / session`;
  }
  return libelleTarifParticipant(entry.level);
}
