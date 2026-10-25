import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/gsap-shared';

/**
 * Phrase dont les mots passent du gris au noir au scroll (scrub).
 * Enfants `.anim-scroll-word` ou découpe automatique.
 */
export function initScrollWords(root: HTMLElement): (() => void) | void {
  let words = root.querySelectorAll<HTMLElement>('.anim-scroll-word');
  if (words.length === 0) {
    wrapScrollWords(root);
    words = root.querySelectorAll<HTMLElement>('.anim-scroll-word');
  }
  if (words.length === 0) return;

  if (prefersReducedMotion()) {
    gsap.set(words, { opacity: 1, color: 'var(--anim-scroll-word-active, #0f172a)' });
    return;
  }

  gsap.set(words, {
    opacity: 0.35,
    color: 'var(--anim-scroll-word-muted, #94a3b8)',
  });

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 75%',
    end: 'bottom 40%',
    scrub: true,
    onUpdate: (self) => {
      const n = words.length;
      const progress = self.progress;
      words.forEach((word, i) => {
        const threshold = (i + 0.5) / n;
        const active = progress >= threshold - 0.08;
        gsap.to(word, {
          opacity: active ? 1 : 0.35,
          color: active
            ? 'var(--anim-scroll-word-active, #0f172a)'
            : 'var(--anim-scroll-word-muted, #94a3b8)',
          duration: 0.15,
          overwrite: true,
        });
      });
    },
  });

  return () => st.kill();
}

function wrapScrollWords(el: HTMLElement): void {
  const text = el.textContent?.trim() ?? '';
  if (!text) return;
  const parts = text.split(/\s+/).filter(Boolean);
  el.textContent = '';
  el.setAttribute('aria-label', text);
  for (let i = 0; i < parts.length; i++) {
    const span = document.createElement('span');
    span.className = 'anim-scroll-word inline';
    span.textContent = parts[i] + (i < parts.length - 1 ? '\u00a0' : '');
    el.appendChild(span);
  }
}
