/**
 * Mots-clés SEO + ancrage GEO Île-de-France — source unique (pages, meta, alt images, vidéo).
 */
import { deptLocatif, getDeptGrammar } from '@/lib/formation-ia-btp-dept-grammar';

export const SEO_KW_FORMATION_IA_BTP = 'formation IA pour le BTP' as const;
export const SEO_KW_FORMATION_IA_BATIMENT = 'formation IA appliquée au bâtiment' as const;
export const SEO_KW_FORMATION_IA_TP = 'formation IA travaux publics' as const;

/** Variantes courtes pour alt / title (≤ 125 car. avec le reste du libellé). */
export const SEO_KW_SHORT = {
  btp: 'formation IA BTP',
  batiment: 'formation IA bâtiment',
  tp: 'formation IA travaux publics',
} as const;

export const SEO_GEO_REGION = 'Île-de-France' as const;
export const SEO_GEO_REGION_SHORT = 'IDF' as const;
export const SEO_GEO_PARIS = 'Paris' as const;
export const SEO_GEO_SIEGE = 'Guyancourt (78)' as const;

/** Départements franciliens — code → libellé SEO. */
export const SEO_GEO_DEPARTEMENTS = {
  '75': { nom: 'Paris', prep: 'de Paris', villes: ['Paris'] },
  '77': {
    nom: 'Seine-et-Marne',
    prep: 'de Seine-et-Marne',
    villes: ['Melun', 'Meaux', 'Chelles', 'Fontainebleau'],
  },
  '78': {
    nom: 'Yvelines',
    prep: 'des Yvelines',
    villes: ['Versailles', 'Saint-Quentin-en-Yvelines', 'Guyancourt', 'Mantes-la-Jolie'],
  },
  '91': {
    nom: 'Essonne',
    prep: "de l'Essonne",
    villes: ['Évry-Courcouronnes', 'Massy', 'Palaiseau', 'Corbeil-Essonnes'],
  },
  '92': {
    nom: 'Hauts-de-Seine',
    prep: 'des Hauts-de-Seine',
    villes: ['Nanterre', 'Boulogne-Billancourt', 'Colombes', 'Antony'],
  },
  '93': {
    nom: 'Seine-Saint-Denis',
    prep: 'de Seine-Saint-Denis',
    villes: ['Saint-Denis', 'Montreuil', 'Aubervilliers', 'Bobigny'],
  },
  '94': {
    nom: 'Val-de-Marne',
    prep: 'du Val-de-Marne',
    villes: ['Créteil', 'Vitry-sur-Seine', 'Champigny-sur-Marne', 'Vincennes'],
  },
  '95': {
    nom: "Val-d'Oise",
    prep: "du Val-d'Oise",
    villes: ['Cergy-Pontoise', 'Argenteuil', 'Sarcelles', 'Pontoise'],
  },
} as const;

export type SeoGeoDeptCode = keyof typeof SEO_GEO_DEPARTEMENTS;

/** Grandes villes franciliennes (pages hub / maillage). */
export const SEO_GEO_VILLES_MAJEURES = [
  'Paris',
  'Versailles',
  'Nanterre',
  'Créteil',
  'Saint-Denis',
  'Cergy-Pontoise',
  'Melun',
  'Évry-Courcouronnes',
  'Massy',
  'Boulogne-Billancourt',
  'Saint-Quentin-en-Yvelines',
  'Guyancourt',
] as const;

export const PHOTO_ALT_MAX = 125;

/** Suffixe GEO compact pour alt image (rotation par hash de chaîne). */
export function pickGeoAltSuffix(seed: string): string {
  const options = [
    `Paris ${SEO_GEO_REGION_SHORT}`,
    SEO_GEO_REGION,
    `${SEO_GEO_PARIS} et ${SEO_GEO_REGION_SHORT}`,
    SEO_GEO_SIEGE,
  ] as const;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % options.length;
  return options[h]!;
}

export function hasSeoFormationKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('formation ia') ||
    lower.includes('ia btp') ||
    lower.includes('ia bâtiment') ||
    lower.includes('travaux publics') ||
    lower.includes('chatgpt btp') ||
    lower.includes('intelligence artificielle')
  );
}

export function hasSeoGeoSignal(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('paris') ||
    lower.includes('île-de-france') ||
    lower.includes('ile-de-france') ||
    /\bidf\b/.test(lower) ||
    lower.includes('guyancourt') ||
    lower.includes('versailles') ||
    lower.includes('francilien') ||
    /\b(75|77|78|91|92|93|94|95)\b/.test(lower) ||
    Object.values(SEO_GEO_DEPARTEMENTS).some((d) => lower.includes(d.nom.toLowerCase()))
  );
}

export function clampPhotoAlt(text: string, max = PHOTO_ALT_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, max - 1);
  return `${cut.replace(/[,;:\s-]+$/u, '')}…`;
}

/** @deprecated Préférer `normalizePhotoAlt` — conserve l'API pour scripts legacy. */
export function enrichPhotoAlt(baseAlt: string, _seed = baseAlt): string {
  const trimmed = baseAlt.replace(/\s+/g, ' ').trim();
  return clampPhotoAlt(trimmed);
}

export function buildPhotoTitleFromAlt(alt: string, _context?: string): string {
  const base = alt.split('—')[0]?.trim() ?? alt;
  const title = `${base} — ${SEO_KW_FORMATION_IA_BATIMENT}, ${SEO_GEO_PARIS} ${SEO_GEO_REGION_SHORT}`;
  return title.length <= 160 ? title : `${title.slice(0, 157).replace(/\s+\S*$/, '')}…`;
}

/** Meta descriptions départements IDF — générées via {@link buildFormationIaBtpDeptMetaDescription}. */
export const IDF_DEPT_META_CODES = ['75', '77', '78', '91', '92', '93', '94', '95'] as const;

/** Noms longs — « Qualiopi » au lieu de « organisme Qualiopi » (≤ 160 car.). */
const DEPT_META_SHORT_QUALIOPI_NOM = new Set([
  'Seine-Saint-Denis',
  'Seine-et-Marne',
  'Hauts-de-Seine',
  'Val-de-Marne',
]);

/** Locatifs longs — même raccourci Qualiopi. */
const DEPT_META_SHORT_QUALIOPI_EXTRA = new Set(['Yvelines', 'Essonne', "Val-d'Oise"]);

/**
 * Meta description pages `/formation-ia-btp-*` — patron 150–160 car., phrase complète.
 * Patron : « Formation IA pour le BTP [locatif] : devis, DCE et comptes rendus sur vos documents.
 * Présentiel dans vos locaux, [organisme ]Qualiopi. Visio découverte [de] 30 min. »
 */
export function buildFormationIaBtpDeptMetaDescription(
  deptCode: string,
  departementNom?: string,
): string {
  const grammar = getDeptGrammar(deptCode, departementNom);
  const locatif = deptLocatif(grammar);
  const useShortQualiopi =
    DEPT_META_SHORT_QUALIOPI_NOM.has(grammar.nom) ||
    DEPT_META_SHORT_QUALIOPI_EXTRA.has(grammar.nom);

  let qualiopi = useShortQualiopi ? 'Qualiopi' : 'organisme Qualiopi';
  let presentiel = 'Présentiel dans vos locaux';
  let visio = 'Visio découverte de 30 min.';

  const compose = () =>
    `Formation IA pour le BTP ${locatif} : devis, DCE et comptes rendus sur vos documents. ${presentiel}, ${qualiopi}. ${visio}`;

  let text = compose();
  if (text.length > 160) {
    visio = 'Visio découverte 30 min.';
    text = compose();
  }
  if (text.length > 160) {
    presentiel = 'Présentiel intra';
    text = compose();
  }
  return text;
}

/** @deprecated Préférer {@link buildFormationIaBtpDeptMetaDescription} — conservé pour scripts d'audit. */
export const FORMATION_IA_BTP_DEPT_META_BY_CODE: Record<string, string> = Object.fromEntries(
  IDF_DEPT_META_CODES.map((code) => [
    code,
    buildFormationIaBtpDeptMetaDescription(code),
  ]),
);

export function buildIdfDeptMetaDescription(
  departementNom: string,
  deptCode: string,
  _villesCourtes: string,
): string {
  if ((IDF_DEPT_META_CODES as readonly string[]).includes(deptCode)) {
    return buildFormationIaBtpDeptMetaDescription(deptCode, departementNom);
  }
  const locatif = deptLocatif(getDeptGrammar(deptCode, departementNom));
  return `Formation IA BTP ${locatif} (${deptCode}) : présentiel intra sur vos documents réels. Qualiopi, Constructys.`;
}

/** Segment title (≤ budget segment) — suffixe « | Laure Olivié » ajouté par buildMetadata. */
export function buildIdfDeptPageTitle(departementNom: string, deptCode: string): string {
  const full = `Formation IA BTP ${departementNom} (${deptCode})`;
  if (full.length <= 40) return full;
  const short = `Formation IA BTP (${deptCode}) — ${departementNom}`;
  if (short.length <= 40) return short;
  return `Formation IA BTP ${departementNom} (${deptCode})`.slice(0, 40).replace(/\s+\S*$/, '').trim();
}

export function buildIdfRegionalMetaDescription(): string {
  return `Formation IA BTP en présentiel dans toute l'Île-de-France : devis, DCE, comptes rendus sur vos vrais documents. Qualiopi, Constructys.`;
}
