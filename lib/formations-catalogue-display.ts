/**
 * Couche affichage catalogue — dérivée de `data/formations.ts` (source de vérité).
 */

import { PHOTOS } from '@/lib/photos';
import {
  FORMATIONS,
  FORMATIONS_COUNT,
  formationHref,
  getFormationByCode,
  isFormationSurDevis,
  libelleEffectifFormation,
  libelleEffectifMaxFormation,
  type Formation,
} from '@/data/formations';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import {
  MENTIONS_TVA_REGIMES_COURT,
} from '@/lib/tarifs-sessions';
import {
  libelleTarifLancementDevWebIa,
} from '@/lib/formation-developpement-web-ia-content';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';

export type CatalogueLevel = 'DÉBUTANT' | 'AVANCÉ';

/** Tarif affiché sur le catalogue public — HT / participant uniquement. */
export function libelleTarifParcoursCatalogue(f: Formation): string {
  if (f.tarifParticipantHt && f.tarifParticipantHt > 0) {
    return libelleTarifParticipantCatalogue(f.tarifParticipantHt);
  }
  if (f.code === 'NIV-10') {
    return libelleTarifLancementDevWebIa();
  }
  if (isFormationSurDevis(f) || f.tarifParcoursAppMetier) {
    return 'Sur devis';
  }
  return 'Sur devis';
}

export type FormationCatalogueEntry = {
  ref: string;
  level: CatalogueLevel;
  title: string;
  programmeVersion: string;
  programmeUpdatedAt: string;
  href: string;
  visuel: (typeof PHOTOS)[keyof typeof PHOTOS];
  duree: string;
  effectif: string;
  objectifs: string[];
  pitch: string;
  promesse: string;
  casUsageCourts: readonly string[];
  gamme: import('@/data/formations').FormationGamme;
  theme?: import('@/data/formations').FormationTheme;
  slug: string;
  programmePdfHref: string;
  prixHT: number;
  /** Libellé tarif parcours 7 h (applications métier). */
  tarifParcoursLabel?: string;
  effectifMin: number;
  effectifMax: number;
  profileTags: Array<
    | 'debutant'
    | 'appels-offres'
    | 'conduite-travaux'
    | 'maitriser-claude'
    | 'maitrise-oeuvre'
    | 'cursor-btp'
    | 'applications-metier-btp'
    | 'assistants-ia'
  >;
  comparatif: {
    publicLabel: string;
    casUsage: string;
  };
};

const PHOTO_BY_CODE: Record<string, (typeof PHOTOS)[keyof typeof PHOTOS]> = {
  'NIV-01': PHOTOS.formationNiv01IaBatimentTravauxPublics2026,
  'NIV-02': PHOTOS.formationNiv02IaAppelsOffreBtp2026,
  'NIV-03': PHOTOS.formationNiv03IaConduiteTravaux2026,
  'NIV-04': PHOTOS.formationNiv04MaitriserClaudeAiBtp2026,
  'NIV-05': PHOTOS.formationNiv05IaMaitriseOeuvre2026,
  'NIV-06': PHOTOS.formationNiv06CursorBtp2026,
  'NIV-07': PHOTOS.formationNiv07ApplicationConnectee2026,
  'NIV-08': PHOTOS.formationNiv08ApplicationAvancee2026,
  'NIV-09': PHOTOS.formationNiv09AssistantsIaPersonnalisesBtp2026,
  'NIV-10': PHOTOS.formationNiv10DevWebIaHero2026,
};

const PROFILE_TAGS_BY_CODE: Record<
  string,
  FormationCatalogueEntry['profileTags']
> = {
  'NIV-01': ['debutant'],
  'NIV-02': ['appels-offres'],
  'NIV-03': ['conduite-travaux'],
  'NIV-04': ['maitriser-claude'],
  'NIV-05': ['maitrise-oeuvre'],
  'NIV-06': ['applications-metier-btp'],
  'NIV-07': ['applications-metier-btp'],
  'NIV-08': ['applications-metier-btp'],
  'NIV-09': ['assistants-ia'],
  'NIV-10': ['applications-metier-btp'],
};

function toCatalogueEntry(f: Formation): FormationCatalogueEntry {
  const photo = PHOTO_BY_CODE[f.code];
  if (!photo) {
    throw new Error(`Visuel catalogue manquant pour ${f.code}`);
  }
  return {
    ref: f.code,
    level: f.niveau === 1 ? 'DÉBUTANT' : 'AVANCÉ',
    title: f.titre,
    programmeVersion: f.programmeVersion,
    programmeUpdatedAt: f.programmeUpdatedAt,
    href: formationHref(f),
    slug: f.slug,
    programmePdfHref: f.pdfProgramme,
    visuel: photo,
    /** Durée seule (ex. « 4 h ») — pas d’horaires sur le catalogue. */
    duree: f.duree,
    effectif: libelleEffectifFormation(f),
    pitch: f.accroche,
    promesse: f.promesse,
    casUsageCourts: f.casUsageCourts,
    gamme: f.gamme,
    theme: f.theme,
    objectifs: [...f.objectifs],
    prixHT: f.prixHT,
    tarifParcoursLabel: libelleTarifParcoursCatalogue(f),
    effectifMin: f.effectifMin,
    effectifMax: f.effectifMax,
    profileTags: PROFILE_TAGS_BY_CODE[f.code] ?? [],
    comparatif: {
      publicLabel: f.public,
      casUsage: f.casUsage,
    },
  };
}

const ALL_FORMATIONS_CATALOGUE: FormationCatalogueEntry[] = FORMATIONS.map(toCatalogueEntry);

/** Parcours visibles sur le site public (respecte les dates de publication). */
export function getFormationsCatalogue(at: Date = new Date()): FormationCatalogueEntry[] {
  return ALL_FORMATIONS_CATALOGUE.filter((e) => isFormationCataloguePublished(e.ref, at));
}

/** Nombre de parcours visibles — source pour copy SEO et listes catalogue. */
export { getCatalogueFormationsCount } from '@/lib/formation-catalogue-visibility';

/** Liste complète (admin, audit Qualiopi, sync LMS) — inclut les parcours non encore publiés. */
export const FORMATIONS_CATALOGUE: FormationCatalogueEntry[] = ALL_FORMATIONS_CATALOGUE;

/** @deprecated Préférer getCatalogueFormationsCount() pour le site public. */
export const CATALOGUE_FORMATIONS_COUNT = FORMATIONS_COUNT;

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

/** Niveau pédagogique affiché — « Niveau 1 », « Niveau 2 » ou « Niveau 3 ». */
export function catalogueNiveauLabel(ref: string): string {
  const f = getFormationByCode(ref);
  if (f?.niveau === 1) return 'Niveau 1';
  if (f?.niveau === 3) return 'Niveau 3';
  return 'Niveau 2';
}

/** Badge niveau catalogue — Initiation / Perfectionnement / Création et déploiement. */
export function catalogueNiveauBadgeLabel(ref: string): string {
  const f = getFormationByCode(ref);
  if (f?.niveau === 1) return 'Niveau 1 · Initiation';
  if (f?.niveau === 3) return 'Niveau 3 · Création et déploiement';
  return 'Niveau 2 · Perfectionnement';
}

/** Catégorie thématique secondaire (optionnelle, affichée sous le badge niveau). */
export function catalogueThemeSecondaryLabel(ref: string): string | null {
  const f = getFormationByCode(ref);
  if (!f?.theme) return null;
  const THEME_LABELS: Record<string, string> = {
    'appels-offres-etudes': 'Appels d\u2019offres',
    'chantier-travaux': 'Chantier',
    'maitrise-oeuvre': 'Maîtrise d\u2019œuvre',
    'outils-applications': ref === 'NIV-10' ? 'Création et déploiement' : 'Claude',
    'assistants-automatisation': 'Assistants IA',
    'administratif': 'Administratif',
    'gestion-contractuelle': 'Gestion contractuelle',
    'commercial': 'Commercial',
    'transformation-ia': 'Transformation IA',
    'strategie-adoption': 'Stratégie IA',
  };
  return THEME_LABELS[f.theme] ?? null;
}

export function catalogueGammeLabel(gamme: FormationCatalogueEntry['gamme']): string {
  switch (gamme) {
    case 'decouvrir':
      return 'Découvrir';
    case 'appliquer-metier':
      return 'Métier';
    case 'deployer':
      return 'Déployer';
    default:
      return 'Catalogue';
  }
}

export function isCatalogueNiveau1(ref: string): boolean {
  return getFormationByCode(ref)?.niveau === 1;
}

/** Ligne hero / carte : badge Initiation / Perfectionnement / Création et déploiement. */
export function catalogueNiveauEtLevel(ref: string, _level: CatalogueLevel): string {
  return catalogueNiveauBadgeLabel(ref);
}

/** Libellé lien UI — titre officiel (sans code NIV-XX ni version). */
export function formationCatalogueLinkLabel(
  entry: Pick<FormationCatalogueEntry, 'title'>
): string {
  return entry.title;
}

/** Sous-titre catalogue : « Version 2 · 20/08/2026 ». */
export function formationCatalogueVersionLine(
  entry: Pick<FormationCatalogueEntry, 'programmeVersion' | 'programmeUpdatedAt'>
): string {
  return `${entry.programmeVersion} · ${entry.programmeUpdatedAt}`;
}

/** Badge pédagogique affiché sur cartes accueil : NIVEAU 1, 2 ou 3. */
export function cataloguePedagogicalLevelBadge(ref: string): string {
  return catalogueNiveauLabel(ref).toUpperCase();
}

export function isCatalogueNiveau3(ref: string): boolean {
  return getFormationByCode(ref)?.niveau === 3;
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
  const entry =
    FORMATIONS_CATALOGUE.find((e) =>
      level === 'DÉBUTANT' ? e.level === 'DÉBUTANT' : e.level === 'AVANCÉ'
    ) ?? FORMATIONS_CATALOGUE[0];
  return libelleTarifPourEntry(entry);
}

function libelleTarifPourEntry(entry: FormationCatalogueEntry): string {
  const label = entry.tarifParcoursLabel ?? tarifLabelForEntry(entry);
  return `${label} (${libelleEffectifMaxFormation(entry)}) — ${MENTIONS_TVA_REGIMES_COURT}`;
}

/** Libellé tarif carte catalogue — HT / participant. */
export function tarifLabelForEntry(entry: FormationCatalogueEntry): string {
  if (entry.tarifParcoursLabel) {
    return entry.tarifParcoursLabel;
  }
  const formation = getFormationByCode(entry.ref);
  if (formation) {
    return libelleTarifParcoursCatalogue(formation);
  }
  return 'Sur devis';
}
