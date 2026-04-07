import {
  FORMATION_IA_METIERS,
  FORMATION_IA_VILLES,
  type FormationIaRawMetier,
  type FormationIaRawVille,
} from '@/lib/seo-formation-ia-hub-data';

const PARIS_SLUG = 'btp-paris';

function dedupeVilles(villes: FormationIaRawVille[]): FormationIaRawVille[] {
  const seen = new Set<string>();
  return villes.filter((v) => {
    if (seen.has(v.slug)) return false;
    seen.add(v.slug);
    return true;
  });
}

/** Maillage métier → 3 à 5 villes dont Paris systématiquement */
export function getMetierLinkedVilles(metierSlug: string): FormationIaRawVille[] {
  const paris = FORMATION_IA_VILLES.find((v) => v.slug === PARIS_SLUG);
  if (!paris) return [];
  const others = FORMATION_IA_VILLES.filter((v) => v.slug !== PARIS_SLUG);
  let h = 0;
  for (let i = 0; i < metierSlug.length; i++) h = (h * 31 + metierSlug.charCodeAt(i)) >>> 0;
  const picks: FormationIaRawVille[] = [paris];
  for (let k = 0; k < 4; k++) {
    picks.push(others[(h + k * 11) % others.length]);
  }
  return dedupeVilles(picks).slice(0, 5);
}

/** Paris : tous les métiers. Autres villes : échantillon large pour le maillage */
export function getVilleLinkedMetiers(ville: FormationIaRawVille): FormationIaRawMetier[] {
  if (ville.slug === PARIS_SLUG) return [...FORMATION_IA_METIERS];
  const idx = FORMATION_IA_VILLES.findIndex((v) => v.slug === ville.slug);
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

/** Villes du même département (maillage local) */
export function getSisterVilles(ville: FormationIaRawVille): FormationIaRawVille[] {
  return FORMATION_IA_VILLES.filter((v) => v.dept === ville.dept && v.slug !== ville.slug);
}
