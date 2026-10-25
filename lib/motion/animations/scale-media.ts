import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/gsap-shared';

/** Carte média 85 % → 100 % au scroll + parallaxe des vignettes `[data-parallax]`. */
export function initScaleMedia(root: HTMLElement): (() => void) | void {
  if (prefersReducedMotion()) {
    gsap.set(root, { scale: 1, width: '100%' });
    return;
  }

  gsap.set(root, { scale: 0.85, transformOrigin: 'center center' });

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 85%',
    end: 'center center',
    scrub: true,
    onUpdate: (self) => {
      const scale = 0.85 + self.progress * 0.15;
      gsap.set(root, { scale });
    },
  });

  const floats = root.querySelectorAll<HTMLElement>('[data-parallax]');
  const cleanups: (() => void)[] = [];

  floats.forEach((node, i) => {
    const speed = Number(node.dataset.parallax ?? 0.15 + i * 0.08);
    const pst = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(node, { y: (self.progress - 0.5) * 80 * speed });
      },
    });
    cleanups.push(() => pst.kill());
  });

  return () => {
    st.kill();
    cleanups.forEach((fn) => fn());
  };
}
