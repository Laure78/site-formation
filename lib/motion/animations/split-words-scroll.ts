import ScrollTrigger from 'gsap/ScrollTrigger';
import { initSplitWords } from '@/lib/motion/animations/split-words';
import { prefersReducedMotion } from '@/lib/motion/gsap-shared';

/** Même effet que split-words, déclenché à l’entrée viewport (ScrollTrigger). */
export function initSplitWordsScroll(root: HTMLElement): (() => void) | void {
  if (prefersReducedMotion()) return;

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      initSplitWords(root);
    },
  });

  return () => st.kill();
}
