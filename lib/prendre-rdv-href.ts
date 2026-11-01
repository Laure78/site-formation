import { LINKS } from '@/lib/internal-links';

/** URL `/prendre-rdv` avec paramètre de suivi `src`. */
export function buildPrendreRdvHref(src: string): string {
  const trimmed = src.trim();
  if (!trimmed || trimmed === 'unspecified') return LINKS.prendreRdv;
  return `${LINKS.prendreRdv}?src=${encodeURIComponent(trimmed)}`;
}
