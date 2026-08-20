/**
 * Design tokens OFC — source de vérité TypeScript (miroir de `app/globals.css`).
 * Utiliser les classes utilitaires (`OFC_TYPE_*`, `OFC_SEC`) plutôt que ces chaînes en dur.
 *
 * @see app/globals.css — @theme + :root
 */

/** Préfixe des variables CSS custom properties */
export const OFC_TOKEN_PREFIX = 'ofc' as const;

/** Couleurs sémantiques (alias legacy `--accent` conservés dans globals.css) */
export const OFC_COLORS = {
  accent: 'var(--ofc-color-accent)',
  accentHover: 'var(--ofc-color-accent-hover)',
  accentSoft: 'var(--ofc-color-accent-soft)',
  surface: 'var(--ofc-color-surface)',
  ink: 'var(--ofc-color-ink)',
  inkMuted: 'var(--ofc-color-ink-muted)',
  border: 'var(--ofc-color-border)',
  borderStrong: 'var(--ofc-color-border-strong)',
  onAccent: 'var(--ofc-color-on-accent)',
} as const;

/** Espacement vertical des sections (padding-block) */
export const OFC_SECTION_SPACE = {
  py: 'var(--ofc-section-py)',
  pyMd: 'var(--ofc-section-py-md)',
  pyLg: 'var(--ofc-section-py-lg)',
  pyXl: 'var(--ofc-section-py-xl)',
} as const;

/** Rayons — préférer les classes Tailwind `rounded-ofc-*` */
export const OFC_RADIUS = {
  sm: 'var(--radius-ofc-sm)',
  md: 'var(--radius-ofc-md)',
  lg: 'var(--radius-ofc-lg)',
  xl: 'var(--radius-ofc-xl)',
  card: 'var(--radius-ofc-card)',
  pill: 'var(--radius-ofc-pill)',
} as const;

/** Ombres */
export const OFC_SHADOW = {
  sm: 'var(--shadow-ofc-sm)',
  md: 'var(--shadow-ofc-md)',
  lg: 'var(--shadow-ofc-lg)',
  accent: 'var(--shadow-ofc-accent)',
} as const;

/** Durées et courbes d’animation */
export const OFC_MOTION = {
  fast: 'var(--ofc-duration-fast)',
  base: 'var(--ofc-duration-base)',
  slow: 'var(--ofc-duration-slow)',
  easeOut: 'var(--ofc-ease-out)',
  revealDistance: 'var(--ofc-reveal-distance)',
} as const;

/** Largeur de lecture (~65–75 caractères à 17–18 px) */
export const OFC_READ_WIDTH = {
  prose: 'var(--ofc-read-width)',
  proseWide: 'var(--ofc-read-width-wide)',
} as const;
