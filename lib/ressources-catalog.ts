/**
 * Catalogue unifié des ressources hub `/ressources`.
 * Source unique pour cartes, filtres, compteurs et JSON-LD.
 */
import {
  BIBLIOTHEQUE_BEWORK_COUNT,
  BIBLIOTHEQUE_SKILLS_COUNT,
  BIBLIOTHEQUE_TUTO_COUNT,
} from '@/lib/bibliotheque-skills';
import { LINKS } from '@/lib/internal-links';
import { RESSOURCES_LEXIQUE } from '@/lib/ressources-lexique';
import { RESSOURCES_GUIDES, type RessourceGuideFonctionId } from '@/lib/ressources-guides';
import { TUTOS, type TutoCategoryId, type TutoData } from '@/lib/tutos';
import { tutoDownloadLabel } from '@/lib/tutos/types';
import type { RessourceMiniature } from '@/lib/ressources-miniatures';

/** Besoin métier — filtres hub. */
export type RessourceNeedId =
  | 'appels-offres'
  | 'chantier'
  | 'prevention'
  | 'productivite'
  | 'rh-support'
  | 'ia-assistants';

/** Format de ressource — filtres hub. */
export type RessourceFormatId = 'guide' | 'tutoriel' | 'modele-fichier' | 'skill' | 'outil';

/** Métier cible — filtres hub (optionnel). */
export type RessourceAudienceId =
  | 'dirigeant'
  | 'charge-affaires'
  | 'conducteur-travaux'
  | 'chef-chantier'
  | 'assistant-travaux'
  | 'maitrise-oeuvre'
  | 'rh-admin';

export type RessourceStatus = 'actif' | 'a_verifier' | 'archive';

/** Contenu général vs documents à validation professionnelle. */
export type RessourceSafetyLevel = 'general' | 'verification_professionnelle';

export type RessourceCatalogEntry = {
  id: string;
  title: string;
  shortDescription: string;
  resourceType: RessourceFormatId | 'article';
  format: string;
  topic: string;
  needs: readonly RessourceNeedId[];
  audiences: readonly RessourceAudienceId[];
  useCases: readonly string[];
  level?: string;
  isFree: boolean;
  requiresRegistration: boolean;
  viewUrl: string;
  downloadUrl?: string;
  downloadLabel?: string;
  image?: RessourceMiniature;
  publishedAt?: string;
  updatedAt?: string;
  featured: boolean;
  external: boolean;
  /** Ordre d’affichage par défaut (plus petit = plus haut). */
  sortOrder: number;
  /** CTA principal unique — ne pas recalculer dans plusieurs composants. */
  primaryAction: string;
  status: RessourceStatus;
  safetyLevel: RessourceSafetyLevel;
};

export const RESSOURCE_NEED_FILTERS: readonly {
  id: RessourceNeedId;
  label: string;
}[] = [
  { id: 'appels-offres', label: 'Appels d’offres et DCE' },
  { id: 'chantier', label: 'Chantier et livrables' },
  { id: 'prevention', label: 'Prévention et conformité' },
  { id: 'productivite', label: 'Devis, gestion et productivité' },
  { id: 'rh-support', label: 'RH et fonctions support' },
  { id: 'ia-assistants', label: 'IA et assistants personnalisés' },
] as const;

export const RESSOURCE_FORMAT_FILTERS: readonly {
  id: RessourceFormatId;
  label: string;
}[] = [
  { id: 'guide', label: 'Guide' },
  { id: 'tutoriel', label: 'Tutoriel' },
  { id: 'modele-fichier', label: 'Modèle ou fichier' },
  { id: 'skill', label: 'Skill' },
  { id: 'outil', label: 'Outil interactif' },
] as const;

export const RESSOURCE_AUDIENCE_FILTERS: readonly {
  id: RessourceAudienceId;
  label: string;
}[] = [
  { id: 'dirigeant', label: 'Dirigeant' },
  { id: 'charge-affaires', label: 'Chargé d’affaires' },
  { id: 'conducteur-travaux', label: 'Conducteur de travaux' },
  { id: 'chef-chantier', label: 'Chef de chantier' },
  { id: 'assistant-travaux', label: 'Assistant travaux' },
  { id: 'maitrise-oeuvre', label: 'Maîtrise d’œuvre' },
  { id: 'rh-admin', label: 'RH ou administratif' },
] as const;

const GUIDE_NEED_BY_FONCTION: Record<RessourceGuideFonctionId, readonly RessourceNeedId[]> = {
  direction: ['productivite'],
  'charge-affaires': ['appels-offres'],
  'conducteur-travaux': ['chantier'],
  'chef-chantier': ['chantier'],
  'assistant-travaux': ['chantier', 'productivite'],
  'maitrise-oeuvre': ['chantier'],
  'rh-admin': ['rh-support'],
  transversal: ['ia-assistants', 'productivite'],
};

const GUIDE_AUDIENCE_BY_FONCTION: Record<RessourceGuideFonctionId, readonly RessourceAudienceId[]> = {
  direction: ['dirigeant'],
  'charge-affaires': ['charge-affaires'],
  'conducteur-travaux': ['conducteur-travaux'],
  'chef-chantier': ['chef-chantier'],
  'assistant-travaux': ['assistant-travaux'],
  'maitrise-oeuvre': ['maitrise-oeuvre'],
  'rh-admin': ['rh-admin'],
  transversal: [],
};

const TUTO_NEED_BY_CATEGORY: Record<TutoCategoryId, readonly RessourceNeedId[]> = {
  'marches-et-veille': ['appels-offres'],
  'chantier-livrables': ['chantier'],
  'qse-conformite': ['prevention'],
  productivite: ['productivite', 'ia-assistants'],
};

const TUTO_AUDIENCE_BY_CATEGORY: Record<TutoCategoryId, readonly RessourceAudienceId[]> = {
  'marches-et-veille': ['charge-affaires', 'dirigeant'],
  'chantier-livrables': ['conducteur-travaux', 'chef-chantier', 'assistant-travaux'],
  'qse-conformite': ['rh-admin', 'chef-chantier'],
  productivite: [],
};

/** Descriptions hub sans promesses chiffrées ni conformité automatique. */
const TUTO_HUB_DESCRIPTIONS: Partial<Record<string, string>> = {
  'tuto-analyse-dce':
    'Structurer la première analyse d’un DCE : fiche type, critères, pénalités et aide au Go / No Go — à valider par le professionnel.',
  'tuto-memoire-technique':
    'Créer un skill Claude pour préparer un mémoire technique structuré — relecture et adaptation à votre entreprise requises.',
  'tuto-tri-dce-claude-chrome':
    'Organiser une veille DCE avec Claude in Chrome : filtrage des avis et supervision humaine (fonctionnalité éditeur à vérifier).',
  'tuto-cr-chantier':
    'Transformer une dictée ou des notes en compte rendu de chantier structuré selon la charte de votre entreprise.',
  'tuto-doe-dossier-ouvrages-executes':
    'Préparer l’assemblage du DOE : sommaire, classement des pièces et repérage des manques — contrôle avant remise MOE.',
  'tuto-pv-levee-reserves':
    'Rédiger un PV de levée de réserves structuré : références, numérotation et photos — relecture juridique indispensable.',
  'tuto-ppsps':
    'Préparer un PPSPS structuré à partir de la description chantier — validation par le coordinateur SPS requise.',
  'tuto-duerp':
    'Structurer un DUERP à partir des activités et risques identifiés — responsabilité du dirigeant.',
  'tuto-constat-retard':
    'Rédiger un courrier de réserves ou constat de retard structuré — relecture avant envoi recommandée.',
  'tuto-dispatch-btp':
    'Utiliser Dispatch (Anthropic) pour piloter le PC bureau depuis le terrain — prérequis, limites et validation des actions (à vérifier).',
  'tuto-skill-memoire-reclamation-bework':
    'Préparer une réclamation structurée (faits, fondement, chiffrage) — contrôle juridique et délais à vérifier.',
  'tuto-skill-livret-integration-ofc':
    'Générer un livret d’accueil à partir de vos documents internes — sécurité, EPI et parcours d’intégration à valider.',
  'tuto-skill-metre-excel-ofc':
    'Créer un skill Claude pour produire un classeur Excel de métré par lot — formules et coefficients à contrôler.',
  'tuto-skill-diuo-ofc':
    'Préparer la liasse DIUO pour le coordonnateur SPS : plans, notices et checklist fourni / manquant.',
};

/** Descriptions hub guides — ton professionnel, sans gain de temps garanti. */
const GUIDE_HUB_DESCRIPTIONS: Partial<Record<string, string>> = {
  'guide-repondre-ao-btp-ofc-2026':
    'Méthode en 5 étapes pour répondre à un AO BTP : DCE, Go/No-Go, chiffrage, mémoire technique et contrôles sur les sorties IA.',
  'guide-charge-affaires-ofc':
    'Cas d’usage Claude pour le chargé d’affaires : DCE, mémoire, DPGF, situations et DGD — du dossier au solde.',
  'guide-rh-btp-ia-ofc':
    'Cas d’usage IA pour les RH BTP : fiches de poste, offres, scoring CV, onboarding et reporting — à adapter à votre cadre.',
  'guide-chef-de-chantier-ofc':
    'Skills Claude mobile pour le chef de chantier : accueil sécurité, mode opératoire, causerie, rapport et auto-contrôle.',
  'guide-dirigeant-btp-ofc':
    'Leviers de pilotage pour dirigeants PME BTP : Go/No-Go, clauses, rentabilité, litiges et recrutement.',
  'guide-claude-btp-ofc':
    'Installer Projets, Skills et connecteurs pour l’administratif chantier — fonctionnalités éditeur à vérifier selon votre offre.',
  'bibliotheque-prompts-btp-par-metier':
    'Fichier Excel de prompts à copier par métier (direction, assistante travaux, BET, CDT, chef de chantier).',
  'guide-assistants-travaux-ofc':
    'Missions d’un marché (PPSPS, CR, situations, DOE, DGD) classées IA / mixte / humain — prompts inclus.',
  'guide-maitrise-oeuvre-ia':
    'Missions MOE classées IA, mixte ou humain — méthode skills Claude pour le pilotage de projet.',
  'guide-conducteur-de-travaux':
    'Pack conducteur de travaux : DCE, PPSPS, CR chantier, DOE — méthodes et prompts à adapter.',
};

const TUTO_STATUS: Partial<Record<string, RessourceStatus>> = {
  'tuto-dispatch-btp': 'a_verifier',
  'tuto-tri-dce-claude-chrome': 'a_verifier',
};

const TUTO_SAFETY: Partial<Record<string, RessourceSafetyLevel>> = {
  'tuto-ppsps': 'verification_professionnelle',
  'tuto-duerp': 'verification_professionnelle',
  'tuto-constat-retard': 'verification_professionnelle',
  'tuto-pv-levee-reserves': 'verification_professionnelle',
  'tuto-skill-diuo-ofc': 'verification_professionnelle',
  'tuto-skill-memoire-reclamation-bework': 'verification_professionnelle',
};

const GUIDE_STATUS: Partial<Record<string, RessourceStatus>> = {
  'guide-claude-btp-ofc': 'a_verifier',
};

const FEATURED_IDS = new Set([
  'guide-repondre-ao-btp-ofc-2026',
  'guide-conducteur-de-travaux',
  'guide-rh-btp-ia-ofc',
]);

function guideIdFromHref(href: string): string {
  return href.replace(/^\/ressources\//, '').replace(/\//g, '-');
}

function inferGuideFormat(pdfHref: string, downloadLabel?: string): string {
  if (downloadLabel?.toLowerCase().includes('excel')) return 'Excel';
  if (pdfHref.endsWith('.xlsx')) return 'Excel';
  return 'PDF';
}

function inferGuideResourceType(pdfHref: string, downloadLabel?: string): RessourceFormatId {
  if (downloadLabel?.toLowerCase().includes('excel') || pdfHref.endsWith('.xlsx')) {
    return 'modele-fichier';
  }
  return 'guide';
}

function tutoFormat(pdfFile: string): string {
  const lower = pdfFile.toLowerCase();
  if (lower.endsWith('.docx') || lower.endsWith('.doc')) return 'Word';
  return 'PDF';
}

function hubDescriptionForTuto(tuto: TutoData): string {
  return TUTO_HUB_DESCRIPTIONS[tuto.slug] ?? tuto.cardSummary;
}

function extractUseCases(text: string, max = 3): string[] {
  const parts = text
    .split(/[,;]| et /)
    .map((s) => s.trim())
    .filter((s) => s.length > 4 && s.length < 60);
  return parts.slice(0, max);
}

function primaryActionForType(
  resourceType: RessourceCatalogEntry['resourceType'],
  opts?: { external?: boolean; requiresRegistration?: boolean },
): string {
  switch (resourceType) {
    case 'guide':
      return 'Consulter le guide';
    case 'tutoriel':
      return 'Lire le tutoriel';
    case 'skill':
      return 'Voir la bibliothèque de skills';
    case 'outil':
      return 'Ouvrir l’outil';
    case 'modele-fichier':
      return opts?.requiresRegistration ? 'Accéder au fichier' : 'Télécharger le fichier';
    case 'article':
      return 'Consulter la ressource';
    default:
      return 'Voir la ressource';
  }
}

function guideFromEntry(guide: (typeof RESSOURCES_GUIDES)[number], index: number): RessourceCatalogEntry {
  const id = guideIdFromHref(guide.href);
  const resourceType = inferGuideResourceType(guide.pdfHref, guide.downloadLabel);
  const format = inferGuideFormat(guide.pdfHref, guide.downloadLabel);
  const shortDescription = GUIDE_HUB_DESCRIPTIONS[id] ?? guide.promise ?? guide.description;

  return {
    id,
    title: guide.title,
    shortDescription,
    resourceType,
    format,
    topic: RESSOURCE_NEED_FILTERS.find((n) => GUIDE_NEED_BY_FONCTION[guide.fonctionId]?.includes(n.id))?.label ?? 'BTP',
    needs: GUIDE_NEED_BY_FONCTION[guide.fonctionId] ?? [],
    audiences: GUIDE_AUDIENCE_BY_FONCTION[guide.fonctionId] ?? [],
    useCases: [...guide.highlights].slice(0, 3),
    isFree: true,
    requiresRegistration: false,
    viewUrl: guide.href,
    downloadUrl: guide.pdfHref,
    downloadLabel: guide.downloadLabel,
    image: guide.thumbnail,
    featured: FEATURED_IDS.has(id),
    external: false,
    sortOrder: index,
    primaryAction: guide.primaryActionLabel,
    status: GUIDE_STATUS[id] ?? 'actif',
    safetyLevel: 'general',
  };
}

function tutoFromEntry(tuto: TutoData, index: number): RessourceCatalogEntry {
  const viewUrl = `${LINKS.ressources}/${tuto.slug}`;
  const downloadUrl = `${LINKS.ressources}/pdf/${tuto.pdfFile}`;
  const shortDescription = hubDescriptionForTuto(tuto);

  return {
    id: tuto.slug,
    title: tuto.shortTitle || tuto.title,
    shortDescription,
    resourceType: 'tutoriel',
    format: tutoFormat(tuto.pdfFile),
    topic: RESSOURCE_NEED_FILTERS.find((n) => TUTO_NEED_BY_CATEGORY[tuto.category]?.includes(n.id))?.label ?? 'BTP',
    needs: TUTO_NEED_BY_CATEGORY[tuto.category] ?? [],
    audiences: TUTO_AUDIENCE_BY_CATEGORY[tuto.category] ?? [],
    useCases: extractUseCases(shortDescription),
    isFree: true,
    requiresRegistration: false,
    viewUrl,
    downloadUrl,
    downloadLabel: tutoDownloadLabel(tuto.pdfFile),
    image: tuto.heroImage,
    publishedAt: tuto.publishedAt,
    updatedAt: tuto.updatedAt,
    featured: FEATURED_IDS.has(tuto.slug),
    external: false,
    sortOrder: 100 + index,
    primaryAction: primaryActionForType('tutoriel'),
    status: TUTO_STATUS[tuto.slug] ?? 'actif',
    safetyLevel: TUTO_SAFETY[tuto.slug] ?? 'general',
  };
}

function buildSpecialEntries(): RessourceCatalogEntry[] {
  return [
    {
      id: 'lexique-btp',
      title: 'Lexique BTP — vocabulaire chantier et marchés publics',
      shortDescription: `Dictionnaire de ${RESSOURCES_LEXIQUE.termCount} termes, flashcards et quiz pour comprendre le vocabulaire BTP.`,
      resourceType: 'outil',
      format: 'Page web',
      topic: 'Vocabulaire BTP',
      needs: ['appels-offres', 'chantier'],
      audiences: [],
      useCases: ['Décrypter le DCE', 'Vocabulaire chantier', 'Révision par flashcards'],
      isFree: true,
      requiresRegistration: false,
      viewUrl: RESSOURCES_LEXIQUE.url,
      featured: false,
      external: true,
      sortOrder: 200,
      primaryAction: primaryActionForType('outil', { external: true }),
      status: 'actif',
      safetyLevel: 'general',
    },
    {
      id: 'bibliotheque-skills',
      title: 'Bibliothèque skills Claude BTP',
      shortDescription: `${BIBLIOTHEQUE_SKILLS_COUNT} skills (.skill) et ${BIBLIOTHEQUE_TUTO_COUNT} tutos OFC pour CR, DCE, mémoire technique, PPSPS et DOE.`,
      resourceType: 'skill',
      format: 'Archive .skill',
      topic: 'Assistants IA métier',
      needs: ['ia-assistants', 'appels-offres', 'chantier'],
      audiences: [],
      useCases: ['Importer un skill Claude', 'Automatiser un livrable métier', 'CR et DCE'],
      isFree: true,
      requiresRegistration: false,
      viewUrl: LINKS.bibliothequeSkills,
      featured: false,
      external: false,
      sortOrder: 201,
      primaryAction: primaryActionForType('skill'),
      status: 'actif',
      safetyLevel: 'general',
    },
    {
      id: 'cas-usage-ia-btp',
      title: '10 cas d’usage IA BTP concrets',
      shortDescription: 'Dix scénarios d’application de l’IA dans le BTP avec exemples par métier — à prioriser selon votre contexte.',
      resourceType: 'article',
      format: 'Page web',
      topic: 'Cas d’usage IA',
      needs: ['ia-assistants', 'productivite'],
      audiences: ['dirigeant', 'conducteur-travaux', 'charge-affaires'],
      useCases: ['Prioriser vos usages IA', 'Exemples par métier', 'Orientation formation'],
      isFree: true,
      requiresRegistration: false,
      viewUrl: LINKS.casUsage,
      featured: false,
      external: false,
      sortOrder: 202,
      primaryAction: primaryActionForType('article'),
      status: 'actif',
      safetyLevel: 'general',
    },
    {
      id: 'checklist-prompts-btp',
      title: 'Checklist 10 prompts ChatGPT BTP',
      shortDescription: 'Dix prompts prêts à copier pour devis, emails, comptes rendus et productivité administrative.',
      resourceType: 'modele-fichier',
      format: 'PDF',
      topic: 'Prompts IA',
      needs: ['productivite', 'ia-assistants'],
      audiences: [],
      useCases: ['Devis et emails', 'Comptes rendus', 'Publications réseaux sociaux'],
      isFree: true,
      requiresRegistration: true,
      viewUrl: LINKS.checklist,
      featured: false,
      external: false,
      sortOrder: 203,
      primaryAction: primaryActionForType('modele-fichier', { requiresRegistration: true }),
      status: 'actif',
      safetyLevel: 'general',
    },
    {
      id: 'formations-linkedin-learning',
      title: 'Formations LinkedIn Learning — IA appliquée au BTP',
      shortDescription: '2 cours à la demande sur l’IA pour le recrutement BTP et la productivité des TPE du bâtiment.',
      resourceType: 'outil',
      format: 'Vidéo en ligne',
      topic: 'Formation en ligne',
      needs: ['rh-support', 'productivite'],
      audiences: ['dirigeant', 'rh-admin'],
      useCases: ['Recrutement BTP', 'Productivité TPE', 'Formation à la demande'],
      isFree: false,
      requiresRegistration: true,
      viewUrl: LINKS.formationsLinkedInLearning,
      featured: false,
      external: false,
      sortOrder: 204,
      primaryAction: 'Voir les formations LinkedIn Learning',
      status: 'actif',
      safetyLevel: 'general',
    },
    {
      id: 'selecteur-cas-usage-metier',
      title: 'Sélecteur cas d’usage IA par métier',
      shortDescription: 'Identifiez les usages IA prioritaires selon votre fonction dans le BTP.',
      resourceType: 'outil',
      format: 'Page web',
      topic: 'Orientation métier',
      needs: ['ia-assistants'],
      audiences: ['dirigeant', 'conducteur-travaux', 'charge-affaires', 'chef-chantier'],
      useCases: ['Choisir par métier', 'Usages prioritaires', 'Lien vers tutos associés'],
      isFree: true,
      requiresRegistration: false,
      viewUrl: LINKS.casUsageIaMetierBtp,
      featured: false,
      external: false,
      sortOrder: 205,
      primaryAction: primaryActionForType('outil'),
      status: 'actif',
      safetyLevel: 'general',
    },
  ];
}

/** Catalogue complet dédupliqué par `id` — archives exclues par défaut. */
export function getRessourcesCatalog(options?: {
  includeArchived?: boolean;
}): readonly RessourceCatalogEntry[] {
  const guides = RESSOURCES_GUIDES.map(guideFromEntry);
  const tutos = TUTOS.map(tutoFromEntry);
  const special = buildSpecialEntries();

  const byId = new Map<string, RessourceCatalogEntry>();
  for (const entry of [...guides, ...tutos, ...special]) {
    if (!byId.has(entry.id)) {
      byId.set(entry.id, entry);
    }
  }

  let list = [...byId.values()];
  if (!options?.includeArchived) {
    list = list.filter((entry) => entry.status !== 'archive');
  }

  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Ressources mises en avant (max 3, besoins distincts). */
export function getFeaturedRessources(): readonly RessourceCatalogEntry[] {
  const featured = getRessourcesCatalog().filter((r) => r.featured);
  const picked: RessourceCatalogEntry[] = [];
  const usedNeeds = new Set<RessourceNeedId>();

  for (const resource of featured) {
    const primaryNeed = resource.needs[0];
    if (primaryNeed && usedNeeds.has(primaryNeed)) continue;
    if (primaryNeed) usedNeeds.add(primaryNeed);
    picked.push(resource);
    if (picked.length >= 3) break;
  }

  return picked;
}

/** Compteurs dynamiques pour le hero et les stats. */
export function getRessourcesCounts() {
  const catalog = getRessourcesCatalog();
  return {
    total: catalog.length,
    guides: catalog.filter((r) => r.resourceType === 'guide').length,
    tutoriels: TUTOS.length,
    skills: BIBLIOTHEQUE_SKILLS_COUNT,
    skillsBework: BIBLIOTHEQUE_BEWORK_COUNT,
    lexiqueTermes: RESSOURCES_LEXIQUE.termCount,
    modeles: catalog.filter((r) => r.resourceType === 'modele-fichier').length,
    outils: catalog.filter((r) => r.resourceType === 'outil').length,
  };
}

/** Libellé CTA principal selon le type de ressource. */
export function getRessourcePrimaryCta(entry: RessourceCatalogEntry): string {
  return entry.primaryAction;
}

/** Score de pertinence pour une recherche (titre > cas d’usage > thème > public > description). */
export function scoreRessourceSearch(resource: RessourceCatalogEntry, rawQuery: string): number {
  const terms = normalizeSearchText(rawQuery).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 0;

  const fields: { weight: number; text: string }[] = [
    { weight: 10, text: resource.title },
    { weight: 6, text: resource.useCases.join(' ') },
    { weight: 4, text: resource.topic },
    { weight: 3, text: resource.audiences.join(' ') },
    { weight: 2, text: resource.shortDescription },
    { weight: 1, text: resource.format },
  ];

  let score = 0;
  for (const term of terms) {
    for (const field of fields) {
      const hay = normalizeSearchText(field.text);
      if (hay.includes(term)) score += field.weight;
    }
  }
  return score;
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim();
}

/** Format MIME pour JSON-LD. */
export function getRessourceEncodingFormat(format: string): string | undefined {
  const lower = format.toLowerCase();
  if (lower.includes('pdf')) return 'application/pdf';
  if (lower.includes('excel') || lower.includes('xlsx')) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }
  if (lower.includes('word') || lower.includes('docx')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  if (lower.includes('skill')) return 'application/zip';
  if (lower.includes('web') || lower.includes('vidéo')) return 'text/html';
  return undefined;
}

/** H1 canonique hub. */
export const RESSOURCES_HUB_H1 = 'Ressources gratuites pour utiliser l’IA dans le BTP';

/** Nombre de cartes visibles avant « Afficher plus ». */
export const RESSOURCES_HUB_INITIAL_VISIBLE = 18;
