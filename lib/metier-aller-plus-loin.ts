/**
 * Maillage « Aller plus loin » pour landings métiers — pilier toujours en tête.
 * Max 5 liens, pas de doublon d’URL.
 */
import { LINKS } from '@/lib/internal-links';

export type MetierAllerPlusLoinLink = {
  href: string;
  label: string;
};

const PILIER: MetierAllerPlusLoinLink = {
  href: LINKS.formationIaBtp,
  label: 'Formation IA pour le BTP',
};

export function buildMetierAllerPlusLoinLinks(
  sisters: readonly MetierAllerPlusLoinLink[],
  options?: {
    includeFinancement?: boolean;
    includeRdv?: boolean;
    rdvLabel?: string;
    max?: number;
  },
): MetierAllerPlusLoinLink[] {
  const max = options?.max ?? 5;
  const out: MetierAllerPlusLoinLink[] = [PILIER];
  const seen = new Set<string>([PILIER.href]);

  for (const link of sisters) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    out.push(link);
    if (out.length >= max) return out;
  }

  if (options?.includeFinancement !== false && !seen.has(LINKS.financement) && out.length < max) {
    out.push({ href: LINKS.financement, label: 'Financement Constructys' });
    seen.add(LINKS.financement);
  }

  if (options?.includeRdv !== false && !seen.has(LINKS.prendreRdv) && out.length < max) {
    out.push({
      href: LINKS.prendreRdv,
      label: options?.rdvLabel ?? 'Prendre un rendez-vous découverte',
    });
  }

  return out;
}
