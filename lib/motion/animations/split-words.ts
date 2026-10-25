import gsap from 'gsap';
import { GSAP_DURATION, GSAP_EASE, prefersReducedMotion } from '@/lib/motion/gsap-shared';

const WORD_SELECTOR = '.anim-word';

/**
 * Titre révélé mot par mot (masque + translateY).
 * Attend un H1/H2 avec spans `.anim-word-mask` > `.anim-word`, ou découpe le texte du nœud.
 */
export function initSplitWords(root: HTMLElement): (() => void) | void {
  if (prefersReducedMotion()) {
    gsap.set(root.querySelectorAll(WORD_SELECTOR), { y: 0, opacity: 1 });
    return;
  }

  let words = root.querySelectorAll<HTMLElement>(WORD_SELECTOR);
  if (words.length === 0) {
    wrapWordsInPlace(root);
    words = root.querySelectorAll<HTMLElement>(WORD_SELECTOR);
  }

  gsap.set(words, { yPercent: 100, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: GSAP_EASE, duration: GSAP_DURATION.md } });
  tl.to(words, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.06,
  });

  const followSelector = root.dataset.animFollow;
  const followNodes = followSelector
    ? document.querySelectorAll<HTMLElement>(followSelector)
    : root.parentElement?.querySelectorAll<HTMLElement>('[data-anim-follow]') ?? [];

  if (followNodes.length) {
    gsap.set(followNodes, { y: 20, opacity: 0 });
    tl.to(
      followNodes,
      { y: 0, opacity: 1, duration: GSAP_DURATION.sm, stagger: 0.08 },
      '-=0.35',
    );
  }

  return () => tl.kill();
}

function wrapWordsInPlace(el: HTMLElement): void {
  const text = el.textContent?.trim() ?? '';
  if (!text) return;
  const parts = text.split(/\s+/).filter(Boolean);
  el.textContent = '';
  el.setAttribute('aria-label', text);
  for (let i = 0; i < parts.length; i++) {
    const mask = document.createElement('span');
    mask.className = 'anim-word-mask inline-block overflow-hidden align-bottom';
    const inner = document.createElement('span');
    inner.className = 'anim-word inline-block';
    inner.textContent = parts[i] + (i < parts.length - 1 ? '\u00a0' : '');
    mask.appendChild(inner);
    el.appendChild(mask);
  }
}
