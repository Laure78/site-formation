import gsap from 'gsap';
import { GSAP_EASE, isTouchDevice, prefersReducedMotion } from '@/lib/motion/gsap-shared';

/** Texte du bouton qui roule au survol (desktop uniquement). */
export function initRollButton(root: HTMLElement): (() => void) | void {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const label = root.querySelector<HTMLElement>('[data-roll-label]');
  if (!label || root.querySelector('[data-roll-duplicate]')) return;

  const text = label.textContent?.trim() ?? '';
  if (!text) return;

  const wrap = document.createElement('span');
  wrap.className = 'anim-roll-wrap';
  wrap.setAttribute('aria-hidden', 'true');

  const makeLine = (duplicate: boolean) => {
    const line = document.createElement('span');
    line.className = 'anim-roll-line';
    if (duplicate) line.dataset.rollDuplicate = 'true';
    line.textContent = text;
    return line;
  };

  wrap.append(makeLine(false), makeLine(true));
  label.replaceChildren(wrap);

  const lines = wrap.querySelectorAll<HTMLElement>('.anim-roll-line');

  const onEnter = () => {
    gsap.to(lines, {
      yPercent: -100,
      duration: 0.4,
      ease: GSAP_EASE,
    });
  };
  const onLeave = () => {
    gsap.to(lines, {
      yPercent: 0,
      duration: 0.4,
      ease: GSAP_EASE,
    });
  };

  root.addEventListener('mouseenter', onEnter);
  root.addEventListener('mouseleave', onLeave);
  root.addEventListener('focusin', onEnter);
  root.addEventListener('focusout', onLeave);

  return () => {
    root.removeEventListener('mouseenter', onEnter);
    root.removeEventListener('mouseleave', onLeave);
    root.removeEventListener('focusin', onEnter);
    root.removeEventListener('focusout', onLeave);
  };
}
