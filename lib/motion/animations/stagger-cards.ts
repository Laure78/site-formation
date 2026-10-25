import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_DURATION, GSAP_EASE, isTouchDevice, prefersReducedMotion } from '@/lib/motion/gsap-shared';

/** Grille : cartes en cascade à l’entrée ; léger lift au hover (desktop). */
export function initStaggerCards(root: HTMLElement): (() => void) | void {
  const cardSelector = root.dataset.staggerSelector ?? ':scope > *';
  const cards = root.querySelectorAll<HTMLElement>(cardSelector);
  if (!cards.length) return;

  if (prefersReducedMotion()) {
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set(cards, { opacity: 0, y: 40, scale: 0.97 });

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: GSAP_DURATION.sm,
        ease: GSAP_EASE,
        stagger: 0.1,
      });
    },
  });

  const hovers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];

  if (!isTouchDevice()) {
    cards.forEach((card) => {
      const enter = () => {
        gsap.to(card, {
          y: -6,
          boxShadow: '0 20px 40px -16px rgba(15, 23, 42, 0.12)',
          duration: 0.35,
          ease: GSAP_EASE,
        });
      };
      const leave = () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.35,
          ease: GSAP_EASE,
        });
      };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      hovers.push({ el: card, enter, leave });
    });
  }

  return () => {
    st.kill();
    hovers.forEach(({ el, enter, leave }) => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    });
  };
}
