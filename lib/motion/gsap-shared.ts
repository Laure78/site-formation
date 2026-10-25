/** Constantes partagées — animations GSAP (style 1600.agency, sobre). */

export const GSAP_EASE = 'power4.out' as const;

/** Équivalent CSS cubic-bezier(0.22, 1, 0.36, 1) */
export const GSAP_EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const GSAP_DURATION = {
  sm: 0.6,
  md: 0.8,
  lg: 1,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Écran tactile — pas d’effets hover (roll-button, etc.). */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

export function markGsapReady(): void {
  document.documentElement.dataset.gsapMotionReady = 'true';
}
