'use client';

import {
  Children,
  createElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type RevealTag =
  | 'div'
  | 'section'
  | 'article'
  | 'li'
  | 'ul'
  | 'ol'
  | 'span'
  | 'aside'
  | 'header'
  | 'footer'
  | 'figure';

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Élément HTML enveloppant (défaut : `div`). */
  as?: RevealTag;
  /** Délai avant transition (ms) — utile pour le stagger dans un groupe. */
  delay?: number;
  /** Décalage vertical initial en px (transform uniquement, pas de CLS). */
  distance?: number;
  /** Seuil Intersection Observer (0–1). */
  threshold?: number;
  rootMargin?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>;

export type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Écart entre chaque enfant (ms). */
  staggerMs?: number;
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  as?: RevealTag;
  /** Élément HTML de chaque enfant (ex. `li` dans un `ul`). */
  itemAs?: RevealTag;
};

function isInViewport(el: HTMLElement, threshold: number): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  const ratio = rect.height > 0 ? visible / rect.height : 0;
  return ratio >= threshold || (rect.top < vh * 0.92 && rect.bottom > 0);
}

/**
 * Apparition douce au scroll (fade + léger translate-y), une seule fois.
 *
 * **SSR / accessibilité**
 * - Le contenu est **visible** dans le HTML serveur (pas d’`opacity: 0` sans JS).
 * - L’état « en attente » n’est appliqué qu’au client, avant peinture, pour les blocs hors écran.
 * - `prefers-reduced-motion: reduce` → aucune animation.
 * - Pas de CLS : seuls `opacity` et `transform` sont animés.
 *
 * @example
 * ```tsx
 * <Reveal as="section" className="mt-12">
 *   <h2>Titre de section</h2>
 *   <p>Paragraphe déjà présent dans le DOM.</p>
 * </Reveal>
 *
 * <RevealGroup className="grid gap-6 sm:grid-cols-3" staggerMs={90}>
 *   {items.map((item) => (
 *     <article key={item.id} className="rounded-2xl border p-6">{item.title}</article>
 *   ))}
 * </RevealGroup>
 * ```
 */
export function Reveal({
  children,
  className = '',
  as = 'div',
  delay = 0,
  distance = 8,
  threshold = 0,
  rootMargin = '0px 0px 12% 0px',
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.dataset.revealState = 'off';
      return;
    }

    let observer: IntersectionObserver | undefined;
    let safetyTimer: number | undefined;

    const markVisible = () => {
      if (el.dataset.revealState === 'visible') return;
      el.dataset.revealState = 'visible';
      observer?.disconnect();
      if (safetyTimer !== undefined) window.clearTimeout(safetyTimer);
    };

    if (isInViewport(el, Math.max(threshold, 0.05))) {
      markVisible();
      return;
    }

    el.dataset.revealState = 'pending';

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) markVisible();
      },
      { threshold, rootMargin }
    );
    observer.observe(el);

    const onScrollOrResize = () => {
      if (el.dataset.revealState !== 'pending') return;
      if (isInViewport(el, Math.max(threshold, 0.05))) markVisible();
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Filet de sécurité : ne jamais laisser un bloc invisible (évite les « vides » au scroll).
    safetyTimer = window.setTimeout(() => {
      if (el.dataset.revealState === 'pending') markVisible();
    }, 2000);

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (safetyTimer !== undefined) window.clearTimeout(safetyTimer);
    };
  }, [reducedMotion, threshold, rootMargin]);

  const mergedStyle = {
    ...style,
    '--reveal-delay': `${delay}ms`,
    '--reveal-distance': `${distance}px`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ref,
      'data-reveal': true,
      className: className.trim() || undefined,
      style: mergedStyle,
      ...rest,
    },
    children
  );
}

/** Enveloppe chaque enfant direct dans un `<Reveal>` avec stagger progressif. */
export function RevealGroup({
  children,
  className = '',
  staggerMs = 60,
  distance,
  threshold,
  rootMargin,
  as = 'div',
  itemAs,
}: RevealGroupProps) {
  const items = Children.toArray(children).filter(Boolean);
  const childAs = itemAs ?? as;

  return createElement(
    as,
    { className: className.trim() || undefined, 'data-reveal-group': true },
    items.map((child, index) => {
      const key = isValidElement(child) && child.key != null ? String(child.key) : index;
      return (
        <Reveal
          key={key}
          as={childAs}
          delay={index * staggerMs}
          distance={distance}
          threshold={threshold}
          rootMargin={rootMargin}
        >
          {child}
        </Reveal>
      );
    })
  );
}
