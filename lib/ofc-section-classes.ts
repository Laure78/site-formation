/**
 * Rythme visuel OFC — espacements, fonds alternés, séparateurs, mesh CSS.
 * Charte : blanc · #F2F2F2 · #377CF3 · contraste AA.
 *
 * @example
 * ```tsx
 * import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
 * <section className={OFC_SEC.muted}><div className={OFC_SECTION_INNER}>…</div></section>
 * ```
 */

export type OfcSectionTone = 'white' | 'muted' | 'accent' | 'soft';
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
  /** Courbe douce en bas (transition vers section grise) */
  waveBottom?: boolean;
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
  waveBottom = false,
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
    waveBottom && 'ofc-section--wave-bottom',
    heroBg && 'ofc-section--hero-bg',
  ]
    .filter(Boolean)
    .join(' ');
}

/** Conteneur interne standard */
export const OFC_SECTION_INNER = 'ofc-section-inner';
export const OFC_SECTION_INNER_WIDE = 'ofc-section-inner ofc-section-inner--wide';

/** Panneau interne (carte large dans une section) */
export const OFC_INSET_PANEL = 'ofc-inset-panel';

/** Bandeau bleu interne (sous-section dans une section blanche/grise) */
export const OFC_INNER_ACCENT_BAND = 'ofc-inner-accent-band';

/** Presets — alternance blanc / gris / bleu */
export const OFC_SEC = {
  hero: ofcSectionClasses({ tone: 'muted', size: 'hero', mesh: true, divide: true, heroBg: true }),
  heroWhite: ofcSectionClasses({ tone: 'white', size: 'hero', mesh: true }),
  white: ofcSectionClasses({ tone: 'white' }),
  whiteMesh: ofcSectionClasses({ tone: 'white', mesh: true }),
  whiteCompact: ofcSectionClasses({ tone: 'white', size: 'compact' }),
  muted: ofcSectionClasses({ tone: 'muted' }),
  mutedMesh: ofcSectionClasses({ tone: 'muted', mesh: true }),
  mutedCompact: ofcSectionClasses({ tone: 'muted', size: 'compact' }),
  soft: ofcSectionClasses({ tone: 'soft', mesh: true }),
  softWave: ofcSectionClasses({ tone: 'soft', mesh: true, waveTop: true }),
  accent: ofcSectionClasses({ tone: 'accent', mesh: true, divide: true }),
  accentLoose: ofcSectionClasses({
    tone: 'accent',
    size: 'loose',
    mesh: true,
    divide: false,
    waveBottom: true,
  }),
  waveMuted: ofcSectionClasses({ tone: 'muted', mesh: true, waveTop: true }),
} as const;
