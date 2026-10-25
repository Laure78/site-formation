'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { scanDataAnims } from '@/lib/motion/animations/registry';
import { markGsapReady, prefersReducedMotion } from '@/lib/motion/gsap-shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LENIS_SKIP_PREFIXES = ['/admin', '/auth/', '/espace-apprenant', '/mon-espace'] as const;

function shouldUseLenis(pathname: string | null): boolean {
  if (!pathname) return true;
  return !LENIS_SKIP_PREFIXES.some((p) => pathname.startsWith(p));
}

/**
 * Racine motion GSAP + Lenis — scanne `[data-anim]` et branche ScrollTrigger.
 * Monté une fois via `DeferredLayoutWidgets` (client, sans SSR).
 */
export function GsapMotionRoot() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<(time: number) => void>(() => {});

  useGSAP(
    () => {
      document.querySelectorAll<HTMLElement>('[data-anim-init="true"]').forEach((el) => {
        delete el.dataset.animInit;
      });

      const cleanupAnim = scanDataAnims();
      markGsapReady();

      const reduced = prefersReducedMotion();
      const useLenis = shouldUseLenis(pathname) && !reduced;

      if (useLenis) {
        const lenis = new Lenis({
          lerp: 0.085,
          smoothWheel: true,
          touchMultiplier: 1.1,
        });
        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        rafRef.current = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafRef.current);
        gsap.ticker.lagSmoothing(0);
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cleanupAnim();
        if (lenisRef.current) {
          gsap.ticker.remove(rafRef.current);
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
        ScrollTrigger.getAll().forEach((st) => st.kill());
        delete document.documentElement.dataset.gsapMotionReady;
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
