/**
 * Segmentation RDV — pages conducteur vs MOE (analytics `metier`).
 */
export type RdvMetierSegment = 'conducteur' | 'moe' | 'autre';

const MOE_SRC_PATTERNS = /moe|moex|amo|maitre|maître|depouillement|situation|avenant|visa|maitrise/i;
const CONDUCTEUR_SRC_PATTERNS =
  /conducteur|chantier|niv03|suivi-chantier|cr-chantier|landing-conducteur|parcours-conducteur|fiche-suivi|cdt|relance/i;

/** Déduit le segment métier à partir du paramètre `?src=` sur `/prendre-rdv`. */
export function deduceRdvMetierFromSrc(src: string | null | undefined): RdvMetierSegment {
  const normalized = (src ?? '').trim().toLowerCase();
  if (!normalized || normalized === 'direct') return 'autre';
  if (MOE_SRC_PATTERNS.test(normalized)) return 'moe';
  if (CONDUCTEUR_SRC_PATTERNS.test(normalized)) return 'conducteur';
  return 'autre';
}