/**
 * Filtres catalogue `/formations#catalogue-modules` — sérialisation URL (SEO : pas d’index des variantes).
 */
import type { FormationNiveau } from '@/data/formations';
import type { DomaineId, MetierId } from '@/data/catalogue-2027';
import {
  CATALOGUE_THEMATIQUE_IDS,
  type CatalogueThematiqueId,
} from '@/lib/catalogue-thematiques-btp';

export type CatalogueModulesFilterParams = {
  domaine?: DomaineId;
  metier?: MetierId;
  q?: string;
};

export type CatalogueVue = 'ia' | 'modules' | 'tout';

export type CatalogueDisponibiliteFilter = 'disponible' | 'ouverture-2027';

export type CatalogueDureeFilter = 4 | 7 | 14;

export type FormationsIaFilterParams = CatalogueModulesFilterParams & {
  /** Filtre niveau — section « Formations IA disponibles » */
  niveau?: FormationNiveau;
  /** Rubrique thématique catalogue */
  thematique?: CatalogueThematiqueId;
  /** Segment catalogue unifié */
  vue?: CatalogueVue;
  disponibilite?: CatalogueDisponibiliteFilter;
  duree?: CatalogueDureeFilter;
  /** Offres sur demande — page catalogue maquette */
  segment?: 'sur-demande';
};

const THEMATIQUE_IDS = new Set<string>(CATALOGUE_THEMATIQUE_IDS);

const NIVEAU_VALUES = new Set<string>(['1', '2', '3']);

const DOMAINE_IDS = new Set<string>([
  'direction',
  'commercial',
  'travaux',
  'management',
  'administration',
  'technique-qualite-prevention',
  'numerique-ia',
]);

export function parseCatalogueModulesFilters(
  searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>,
): CatalogueModulesFilterParams {
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      const v = searchParams.get(key);
      return v && v.trim() ? v.trim() : undefined;
    }
    const raw = searchParams[key];
    if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
    return raw?.trim() || undefined;
  };

  const domaineRaw = get('domaine');
  const metierRaw = get('metier');
  const q = get('q');

  return {
    domaine:
      domaineRaw && DOMAINE_IDS.has(domaineRaw) ? (domaineRaw as DomaineId) : undefined,
    metier: metierRaw ? (metierRaw as MetierId) : undefined,
    q,
  };
}

export function buildCatalogueModulesHref(filters: CatalogueModulesFilterParams): string {
  return buildFormationsIaHref(filters);
}

export function parseFormationsIaFilters(
  searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>,
): FormationsIaFilterParams {
  const base = parseCatalogueModulesFilters(searchParams);
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      const v = searchParams.get(key);
      return v && v.trim() ? v.trim() : undefined;
    }
    const raw = searchParams[key];
    if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
    return raw?.trim() || undefined;
  };
  const niveauRaw = get('niveau');
  const niveau =
    niveauRaw && NIVEAU_VALUES.has(niveauRaw)
      ? (Number.parseInt(niveauRaw, 10) as FormationNiveau)
      : undefined;
  const thematiqueRaw = get('thematique');
  const thematique =
    thematiqueRaw && THEMATIQUE_IDS.has(thematiqueRaw)
      ? (thematiqueRaw as CatalogueThematiqueId)
      : undefined;

  const vueRaw = get('vue');
  const vue =
    vueRaw === 'ia' || vueRaw === 'modules' || vueRaw === 'tout'
      ? (vueRaw as CatalogueVue)
      : undefined;

  const disponibiliteRaw = get('disponibilite');
  const disponibilite =
    disponibiliteRaw === 'disponible' || disponibiliteRaw === 'ouverture-2027'
      ? (disponibiliteRaw as CatalogueDisponibiliteFilter)
      : undefined;

  const dureeRaw = get('duree');
  const dureeParsed = dureeRaw ? Number.parseInt(dureeRaw, 10) : NaN;
  const duree =
    dureeParsed === 4 || dureeParsed === 7 || dureeParsed === 14
      ? (dureeParsed as CatalogueDureeFilter)
      : undefined;

  return { ...base, niveau, thematique, vue, disponibilite, duree };
}

/** Lien menu / cartes — formations IA filtrées par niveau. */
export function buildFormationsIaNiveauHref(niveau: FormationNiveau): string {
  return buildFormationsCataloguePageHref({ niveau });
}

/** Filtres publics de `/formations` — durée, sur demande (niveau conservé pour liens legacy). */
export type FormationsCataloguePageFilters = {
  niveau?: FormationNiveau;
  duree?: CatalogueDureeFilter;
  segment?: 'sur-demande';
};

export function parseFormationsCataloguePageFilters(
  searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>,
): FormationsCataloguePageFilters {
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      const v = searchParams.get(key);
      return v && v.trim() ? v.trim() : undefined;
    }
    const raw = searchParams[key];
    if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
    return raw?.trim() || undefined;
  };
  const ia = parseFormationsIaFilters(searchParams);
  const segmentRaw = get('segment');
  return {
    niveau: ia.niveau,
    duree: ia.duree,
    segment: segmentRaw === 'sur-demande' ? 'sur-demande' : undefined,
  };
}

export function buildFormationsCataloguePageHref(
  filters: FormationsCataloguePageFilters,
): string {
  const params = new URLSearchParams();
  if (filters.niveau) params.set('niveau', String(filters.niveau));
  if (filters.duree) params.set('duree', String(filters.duree));
  if (filters.segment === 'sur-demande') params.set('segment', 'sur-demande');
  const qs = params.toString();
  const hash = 'catalogue-formations';
  return qs ? `/formations?${qs}#${hash}` : `/formations#${hash}`;
}

export function buildFormationsIaHref(filters: FormationsIaFilterParams): string {
  const params = new URLSearchParams();
  if (filters.vue && filters.vue !== 'tout') params.set('vue', filters.vue);
  if (filters.niveau) params.set('niveau', String(filters.niveau));
  if (filters.thematique) params.set('thematique', filters.thematique);
  if (filters.domaine) params.set('domaine', filters.domaine);
  if (filters.metier) params.set('metier', filters.metier);
  if (filters.disponibilite) params.set('disponibilite', filters.disponibilite);
  if (filters.duree) params.set('duree', String(filters.duree));
  if (filters.q) params.set('q', filters.q);
  const qs = params.toString();
  const hash = 'catalogue-formations';
  return qs ? `/formations?${qs}#${hash}` : `/formations#${hash}`;
}

export function buildFormationsThematiqueHref(thematique: CatalogueThematiqueId): string {
  return buildFormationsIaHref({ thematique });
}
