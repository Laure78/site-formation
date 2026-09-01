'use client';

import { useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function isInViewport(el: HTMLElement, threshold: number): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  const ratio = rect.height > 0 ? visible / rect.height : 0;
  return ratio >= threshold || (rect.top < vh * 0.92 && rect.bottom > 0);
}

/**
 * Un seul IntersectionObserver pour tous les `[data-reveal]` de la page.
 * Remplace des dizaines d’instances `<Reveal />` hydratées (TBT / JS inutilisé).
 */
export function RevealScrollObserver() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal][data-reveal-state="pending"]');
    if (nodes.length === 0) return;

    if (reducedMotion) {
      nodes.forEach((el) => {
        el.dataset.revealState = 'off';
      });
      return;
    }

    const markVisible = (el: HTMLElement) => {
      if (el.dataset.revealState === 'visible') return;
      el.dataset.revealState = 'visible';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            markVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 12% 0px' },
    );

    const safetyTimers: number[] = [];

    nodes.forEach((el) => {
      if (isInViewport(el, 0.05)) {
        markVisible(el);
        return;
      }

      observer.observe(el);

      safetyTimers.push(
        window.setTimeout(() => {
          if (el.dataset.revealState === 'pending') markVisible(el);
        }, 2000),
      );
    });

    const onScrollOrResize = () => {
      nodes.forEach((el) => {
        if (el.dataset.revealState !== 'pending') return;
        if (isInViewport(el, 0.05)) markVisible(el);
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      safetyTimers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [reducedMotion]);

  return null;
}
