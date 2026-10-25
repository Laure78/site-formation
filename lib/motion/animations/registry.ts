import { initMarquee } from '@/lib/motion/animations/marquee';
import { initOdometer } from '@/lib/motion/animations/odometer';
import { initRollButton } from '@/lib/motion/animations/roll-button';
import { initScaleMedia } from '@/lib/motion/animations/scale-media';
import { initScrollWords } from '@/lib/motion/animations/scroll-words';
import { initSplitWords } from '@/lib/motion/animations/split-words';
import { initSplitWordsScroll } from '@/lib/motion/animations/split-words-scroll';
import { initStaggerCards } from '@/lib/motion/animations/stagger-cards';
import { initTextRotator } from '@/lib/motion/animations/text-rotator';

export type AnimCleanup = () => void;

export type AnimInitFn = (el: HTMLElement) => AnimCleanup | void;

/** Registre `data-anim` → initialiseur. */
export const ANIM_REGISTRY: Record<string, AnimInitFn> = {
  'split-words': initSplitWords,
  'split-words-scroll': initSplitWordsScroll,
  'text-rotator': initTextRotator,
  'roll-button': initRollButton,
  odometer: initOdometer,
  marquee: initMarquee,
  'scroll-words': initScrollWords,
  'scale-media': initScaleMedia,
  'stagger-cards': initStaggerCards,
};

export function initDataAnimElement(el: HTMLElement): AnimCleanup | void {
  const type = el.dataset.anim;
  if (!type || el.dataset.animInit === 'true') return;
  const fn = ANIM_REGISTRY[type];
  if (!fn) return;
  el.dataset.animInit = 'true';
  return fn(el);
}

export function scanDataAnims(scope: ParentNode = document): AnimCleanup {
  const cleanups: AnimCleanup[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim]:not([data-anim-init="true"])').forEach((el) => {
    const cleanup = initDataAnimElement(el);
    if (cleanup) cleanups.push(cleanup);
  });
  return () => {
    cleanups.forEach((fn) => fn());
  };
}
