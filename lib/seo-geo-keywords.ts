/**
 * Mots-clés SEO + ancrage GEO Île-de-France — source unique (pages, meta, alt images, vidéo).
 */
import { formatProfessionalsTrainedCount, siteStats } from '@/lib/constants';

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

export function enrichPhotoAlt(baseAlt: string, seed = baseAlt): string {
  const trimmed = baseAlt.replace(/\s+/g, ' ').trim();
  if (/^logo\s/i.test(trimmed) || trimmed.startsWith('Logo Qualiopi')) return trimmed;

  let out = trimmed;
  if (!hasSeoFormationKeyword(out)) {
    out = `${out} — ${SEO_KW_SHORT.btp}`;
  }
  if (!hasSeoGeoSignal(out)) {
    const suffix = pickGeoAltSuffix(seed);
    const candidate = `${out}, ${suffix}`;
    out = candidate.length <= PHOTO_ALT_MAX ? candidate : out;
  }
  return clampPhotoAlt(out);
}

export function buildPhotoTitleFromAlt(alt: string, _context?: string): string {
  const base = alt.split('—')[0]?.trim() ?? alt;
  const title = `${base} — ${SEO_KW_FORMATION_IA_BATIMENT}, ${SEO_GEO_PARIS} ${SEO_GEO_REGION_SHORT}`;
  return title.length <= 160 ? title : `${title.slice(0, 157).replace(/\s+\S*$/, '')}…`;
}

export function buildPromoVideoIframeTitle(): string {
  return `Vidéo ${SEO_KW_SHORT.btp} — ${SEO_KW_SHORT.batiment} et ${SEO_KW_SHORT.tp}, ${SEO_GEO_PARIS} ${SEO_GEO_REGION} | Laure Olivié`;
}

export function buildIdfDeptMetaDescription(
  departementNom: string,
  deptCode: string,
  villesCourtes: string,
): string {
  return `${SEO_KW_FORMATION_IA_BTP} en ${departementNom} (${deptCode}) : ${villesCourtes}. Présentiel intra/inter, Qualiopi, Constructys. ${formatProfessionalsTrainedCount(siteStats.personnesFormees)} pros formés, ${siteStats.noteMoyenneAffichee}.`;
}

export function buildIdfDeptPageTitle(departementNom: string, deptCode: string): string {
  return `${SEO_KW_SHORT.batiment} ${departementNom} (${deptCode}) — ${SEO_KW_SHORT.btp} ${SEO_GEO_REGION_SHORT}`;
}

export function buildIdfRegionalMetaDescription(): string {
  return `${SEO_KW_FORMATION_IA_BTP} en ${SEO_GEO_REGION} : Paris, 77, 78, 91, 92, 93, 94, 95. ${SEO_KW_FORMATION_IA_BATIMENT}, ${SEO_KW_FORMATION_IA_TP}. Qualiopi, Constructys.`;
}
