/**
 * Rythme visuel OFC — espacements, fonds alternés, séparateurs, mesh CSS.
 * Charte : blanc · #F2F2F2 · #377CF3 · contraste AA.
 *
 * @example
 * ```tsx
 * import { OFC_SEC } from '@/lib/ofc-section-classes';
 * <section className={OFC_SEC.muted}>…</section>
 * ```
 */

export type OfcSectionTone = 'white' | 'muted' | 'accent';
export type OfcSectionSize = 'default' | 'compact' | 'hero' | 'loose';

export type OfcSectionOptions = {
  tone?: OfcSectionTone;
  size?: OfcSectionSize;
  /** Dégradé radial discret (#377CF3) — sections clés */
  mesh?: boolean;
  /** Filet horizontal dégradé en bas de section */
  divide?: boolean;
  /** Courbe douce en haut (transition depuis section bleue) */
  waveTop?: boolean;
  /** Fond hero accueil (gradient #F2F2F2 → blanc) */
  heroBg?: boolean;
};

/** Classe de base — padding vertical harmonisé via CSS vars */
export const OFC_SECTION_BASE = 'ofc-section';

export function ofcSectionClasses({
  tone = 'white',
  size = 'default',
  mesh = false,
  divide = true,
  waveTop = false,
  heroBg = false,
}: OfcSectionOptions = {}): string {
  return [
    OFC_SECTION_BASE,
    `ofc-section--${tone}`,
    size !== 'default' && `ofc-section--${size}`,
    mesh && 'ofc-section--mesh',
    tone === 'accent' && 'ofc-section--mesh-accent',
    divide && 'ofc-section--divide',
    waveTop && 'ofc-section--wave-top',
    heroBg && 'ofc-section--hero-bg',
  ]
    .filter(Boolean)
    .join(' ');
}

/** Conteneur interne standard */
export const OFC_SECTION_INNER = 'ofc-section-inner';
export const OFC_SECTION_INNER_WIDE = 'ofc-section-inner ofc-section-inner--wide';

/** Presets — alternance blanc / gris / bleu */
export const OFC_SEC = {
  hero: ofcSectionClasses({ tone: 'muted', size: 'hero', mesh: true, divide: true, heroBg: true }),
  white: ofcSectionClasses({ tone: 'white' }),
  whiteMesh: ofcSectionClasses({ tone: 'white', mesh: true }),
  whiteCompact: ofcSectionClasses({ tone: 'white', size: 'compact' }),
  muted: ofcSectionClasses({ tone: 'muted' }),
  mutedMesh: ofcSectionClasses({ tone: 'muted', mesh: true }),
  mutedCompact: ofcSectionClasses({ tone: 'muted', size: 'compact' }),
  accent: ofcSectionClasses({ tone: 'accent', divide: true }),
  accentLoose: ofcSectionClasses({ tone: 'accent', size: 'loose', mesh: true, divide: false }),
  waveMuted: ofcSectionClasses({ tone: 'muted', mesh: true, waveTop: true }),
} as const;
