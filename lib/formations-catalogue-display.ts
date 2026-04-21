import { PHOTOS } from '@/lib/photos';
import {
  SESSION_DUREE_LIBELLE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
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
  /** Profils « Quelle formation choisir ? » : debutant | appels-offres | architecte */
  /** Profils filtres (BTP-03 RH : hors 3 profils-type — visible dans « Toutes »). */
  profileTags: Array<'debutant' | 'appels-offres' | 'architecte'>;
  /** Ligne tableau comparatif */
  comparatif: {
    publicLabel: string;
    casUsage: string;
  };
};

/** Données catalogue — contenu objectifs et titres alignés sur app/formations (SEO préservé). */
export const FORMATIONS_CATALOGUE: FormationCatalogueEntry[] = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT',
    title: "L'IA au service du bâtiment",
    href: '/formations/ia-au-service-du-batiment',
    slug: 'ia-au-service-du-batiment',
    visuel: PHOTOS.formationIABtpVisioBureau2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: 'La base opérationnelle pour toute équipe bâtiment.',
    profileTags: ['debutant'],
    objectifs: [
      "Identifier les usages IA utiles dans le BTP avec ChatGPT et Claude AI",
      "Accélérer la rédaction de devis et messages clients",
      "Structurer l'administratif (CR, relances, modèles)",
      "Repartir avec des trames et prompts prêts à l'emploi",
    ],
    comparatif: {
      publicLabel: 'Équipes BTP tous profils',
      casUsage: 'Devis, CR, emails',
    },
  },
  {
    ref: 'BTP-02',
    level: 'AVANCÉ',
    title: "Répondre aux appels d'offre avec l'IA",
    href: '/formations/ia-appels-offre-btp',
    slug: 'ia-appels-offre-btp',
    visuel: PHOTOS.btpFormationChantierPlans2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: "Gagnez plus d'appels d'offres avec un mémoire technique 5× plus rapide.",
    profileTags: ['appels-offres'],
    objectifs: [
      "Analyser un DCE rapidement et structurer les critères d'évaluation",
      "Rédiger mémoires techniques et chiffrages avec méthode et assistant IA",
      "Bibliothèque de prompts et templates par métier pour les marchés BTP",
      "Créer et paramétrer un assistant IA DCE / mémoire adapté à votre entreprise",
      'Sécuriser le process : confidentialité, relecture humaine — Qualiopi, OPCO Constructys',
    ],
    comparatif: {
      publicLabel: "Chargés d'affaires, resp. AO",
      casUsage: 'Mémoires techniques, DCE',
    },
  },
  {
    ref: 'BTP-03',
    level: 'AVANCÉ',
    title: 'Formation IA pour la Fonction RH dans le BTP',
    href: '/formations/ia-rh-btp',
    slug: 'ia-rh-btp',
    visuel: PHOTOS.btpFormationBureauConseil2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: "Recrutez et fidélisez sans vous noyer dans l'administratif RH.",
    profileTags: [],
    objectifs: [
      'Automatiser le recrutement et la sélection',
      'Piloter la GEPP et anticiper les compétences',
      'Créer des tableaux de bord RH opérationnels',
      'Construire un assistant IA RH sur-mesure',
    ],
    comparatif: {
      publicLabel: 'Équipes RH bâtiment',
      casUsage: 'Recrutement, GEPP',
    },
  },
  {
    ref: 'BTP-04',
    level: 'DÉBUTANT',
    title: "L'IA au service des Travaux Publics",
    href: '/formations/ia-travaux-publics',
    slug: 'ia-travaux-publics',
    visuel: PHOTOS.btpFormationChantierEquipe2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: 'DCE, CCTP, reporting TP : l’IA appliquée aux travaux publics avec Claude AI.',
    profileTags: ['debutant'],
    objectifs: [
      'Réponse aux consultations : DCE, trames, synthèses et check-lists avec Claude AI pour le DCE TP',
      'Documents de chantier et reporting avec protocole de validation',
      "Templates TP, assistants par rôle et charte d'usage IA en entreprise",
    ],
    comparatif: {
      publicLabel: 'Équipes travaux publics',
      casUsage: 'DCE, reporting TP',
    },
  },
  {
    ref: 'BTP-05',
    level: 'DÉBUTANT',
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    slug: 'sensibilisation-ia-assistants-personnalises',
    visuel: PHOTOS.formationSensibilisationAssistantsIaBtp2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: 'Créez vos propres assistants IA en 4h.',
    profileTags: ['debutant'],
    objectifs: [
      "Sensibilisation à l'IA et usages terrain (supports PDF)",
      'Banque de prompts par métier (Excel)',
      'Concevoir des assistants IA personnalisés',
      'Ressources plateforme en prolongement — Qualiopi, OPCO Constructys',
    ],
    comparatif: {
      publicLabel: 'Tous publics BTP',
      casUsage: 'Assistants IA personnalisés',
    },
  },
  {
    ref: 'BTP-06',
    level: 'AVANCÉ',
    title: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    href: '/formations/ia-architecture-claude-dpgf',
    slug: 'ia-architecture-claude-dpgf',
    visuel: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    pitch: 'DPGF, métrés, comptes rendus : le cabinet augmenté par Claude AI.',
    profileTags: ['architecte'],
    objectifs: [
      'DPGF, métrés et planning GANTT avec Claude AI et Google Sheets',
      'CR de chantier, situations de travaux, PV de réception (Google Docs)',
      'Courriers et actes de marché via connecteur Google Drive',
      'Bibliothèque de prompts et flux opérationnels pour le cabinet',
    ],
    comparatif: {
      publicLabel: 'Architectes, MOE',
      casUsage: 'DPGF, métrés, CR',
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
