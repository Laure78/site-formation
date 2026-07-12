import {
  FORMATION_IA_METIERS,
  FORMATION_IA_VILLES,
  type FormationIaRawMetier,
  type FormationIaRawVille,
} from '@/lib/seo-formation-ia-hub-data';
import { LINKS } from '@/lib/internal-links';

/** Lien géo canonique (plus de pages hub `/formation-ia/btp-*` live). */
export type FormationIaGeoCanonical = {
  id: string;
  label: string;
  dept: string;
  deptName: string;
  href: string;
};

/**
 * Maillage local depuis les pages métier hub — URLs canoniques uniquement.
 * Paris + départements IDF + SQY (fiche ville).
 */
export const FORMATION_IA_GEO_CANONICAL: FormationIaGeoCanonical[] = [
  {
    id: 'paris',
    label: 'Paris',
    dept: '75',
    deptName: 'Paris',
    href: LINKS.formationIaBtpParis,
  },
  {
    id: 'yvelines',
    label: 'Yvelines',
    dept: '78',
    deptName: 'Yvelines',
    href: LINKS.formationIaBtpYvelines78,
  },
  {
    id: 'sqy',
    label: 'Saint-Quentin-en-Yvelines',
    dept: '78',
    deptName: 'Yvelines',
    href: LINKS.formationSaintQuentinYvelines,
  },
  {
    id: 'seine-et-marne',
    label: 'Seine-et-Marne',
    dept: '77',
    deptName: 'Seine-et-Marne',
    href: LINKS.formationIaBtpSeineEtMarne77,
  },
  {
    id: 'hauts-de-seine',
    label: 'Hauts-de-Seine',
    dept: '92',
    deptName: 'Hauts-de-Seine',
    href: LINKS.formationIaBtpHautsDeSeine92,
  },
  {
    id: 'val-de-marne',
    label: 'Val-de-Marne',
    dept: '94',
    deptName: 'Val-de-Marne',
    href: LINKS.formationIaBtpValDeMarne94,
  },
  {
    id: 'val-doise',
    label: "Val-d'Oise",
    dept: '95',
    deptName: "Val-d'Oise",
    href: LINKS.formationIaBtpValDoise95,
  },
  {
    id: 'essonne',
    label: 'Essonne',
    dept: '91',
    deptName: 'Essonne',
    href: LINKS.formationIaBtpEssonne91,
  },
  {
    id: 'seine-saint-denis',
    label: 'Seine-Saint-Denis',
    dept: '93',
    deptName: 'Seine-Saint-Denis',
    href: LINKS.formationIaBtpSeineSaintDenis93,
  },
  {
    id: 'idf',
    label: 'Île-de-France',
    dept: 'IDF',
    deptName: 'Île-de-France',
    href: LINKS.formationIleDeFrance,
  },
];

function dedupeGeo(items: FormationIaGeoCanonical[]): FormationIaGeoCanonical[] {
  const seen = new Set<string>();
  return items.filter((v) => {
    if (seen.has(v.href)) return false;
    seen.add(v.href);
    return true;
  });
}

/** Maillage métier → 3 à 5 zones géo (Paris systématiquement) */
export function getMetierLinkedVilles(metierSlug: string): FormationIaGeoCanonical[] {
  const paris = FORMATION_IA_GEO_CANONICAL.find((v) => v.id === 'paris');
  if (!paris) return [];
  const others = FORMATION_IA_GEO_CANONICAL.filter((v) => v.id !== 'paris' && v.id !== 'idf');
  let h = 0;
  for (let i = 0; i < metierSlug.length; i++) h = (h * 31 + metierSlug.charCodeAt(i)) >>> 0;
  const picks: FormationIaGeoCanonical[] = [paris];
  for (let k = 0; k < 4; k++) {
    picks.push(others[(h + k * 11) % others.length]);
  }
  return dedupeGeo(picks).slice(0, 5);
}

/** Paris : tous les métiers. Autres villes : échantillon large pour le maillage */
export function getVilleLinkedMetiers(ville: FormationIaRawVille): FormationIaRawMetier[] {
  if (ville.slug === 'btp-paris') return [...FORMATION_IA_METIERS];
  const idx = Math.max(0, FORMATION_IA_VILLES.findIndex((v) => v.slug === ville.slug));
  const n = Math.min(12, FORMATION_IA_METIERS.length);
  const out: FormationIaRawMetier[] = [];
  for (let i = 0; i < n; i++) {
    out.push(FORMATION_IA_METIERS[(idx * 5 + i * 3) % FORMATION_IA_METIERS.length]);
  }
  const seen = new Set<string>();
  return out.filter((m) => {
    if (seen.has(m.slug)) return false;
    seen.add(m.slug);
    return true;
  });
}

/** Villes du même département (maillage local) — vide si plus de hub villes */
export function getSisterVilles(ville: FormationIaRawVille | FormationIaGeoCanonical): FormationIaGeoCanonical[] {
  const dept = 'dept' in ville ? ville.dept : '';
  const href = 'href' in ville ? ville.href : undefined;
  return FORMATION_IA_GEO_CANONICAL.filter(
    (v) => v.dept === dept && v.href !== href && v.id !== 'idf'
  );
}
