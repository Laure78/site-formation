'use client';

import { useLayoutEffect, useRef } from 'react';
import { formatCountUpDisplay, formatNumberFr } from '@/lib/format-number-fr';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type CountUpProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Valeur de départ de l’animation (défaut 0). */
  from?: number;
  /** Durée de l’animation (ms). */
  duration?: number;
  className?: string;
  /** Libellé accessibilité — défaut : valeur finale formatée FR. */
  'aria-label'?: string;
  threshold?: number;
  rootMargin?: string;
};

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function isInViewport(el: HTMLElement, threshold: number): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  const ratio = rect.height > 0 ? visible / rect.height : 0;
  return ratio >= threshold || (rect.top < vh * 0.92 && rect.bottom > 0);
}

/**
 * Compteur animé au scroll — chiffres clés (`PROOF` / `formatProofFormes`).
 *
 * **SEO / accessibilité**
 * - La valeur finale est rendue dans le HTML serveur (ex. formés, note `/5`).
 * - Hors viewport : le texte final reste en place jusqu’à l’entrée dans l’écran.
 * - `prefers-reduced-motion: reduce` → pas d’animation, valeur finale conservée.
 */
export function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  from = 0,
  duration = 800,
  className = '',
  'aria-label': ariaLabelProp,
  threshold = 0.15,
  rootMargin = '0px 0px -6% 0px',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finalText = formatCountUpDisplay(to, { decimals, prefix, suffix });
  const ariaLabel = ariaLabelProp ?? finalText;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let startTime: number | null = null;
    let cancelled = false;

    const write = (value: number) => {
      el.textContent = `${prefix}${formatNumberFr(value, decimals)}${suffix}`;
    };

    const run = (timestamp: number) => {
      if (cancelled) return;
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = from + (to - from) * easeOutCubic(progress);
      write(current);
      if (progress < 1) {
        frame = requestAnimationFrame(run);
      } else {
        write(to);
      }
    };

    const start = () => {
      write(from);
      startTime = null;
      frame = requestAnimationFrame(run);
    };

    if (isInViewport(el, threshold)) {
      start();
      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
      };
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        observer = null;
        start();
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [to, from, decimals, prefix, suffix, duration, reducedMotion, threshold, rootMargin]);

  return (
    <span
      ref={ref}
      className={className.trim() || undefined}
      data-countup
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      {finalText}
    </span>
  );
}
