import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import {
  SESSION_DUREE_LIBELLE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
  LIBELLE_EFFECTIF_GROUPE_NIV02,
  libelleTarifParticipant,
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
  /** Profils « Quelle formation choisir ? » : debutant | appels-offres */
  profileTags: Array<'debutant' | 'appels-offres'>;
  /** Ligne tableau comparatif */
  comparatif: {
    publicLabel: string;
    casUsage: string;
  };
};

/** Deux parcours officiels — niveaux 1 et 2 (programmes PDF). */
export const FORMATIONS_CATALOGUE: FormationCatalogueEntry[] = [
  {
    ref: 'NIV-01',
    level: 'DÉBUTANT',
    title: "L'IA au service des pros du bâtiment et des travaux publics",
    href: '/formations/ia-batiment-travaux-publics',
    slug: 'ia-batiment-travaux-publics',
    programmePdfHref: '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf',
    visuel: PHOTOS.formationIABtpVisioBureau2026,
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
    visuel: PHOTOS.btpFormationChantierPlans2026,
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
];

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
