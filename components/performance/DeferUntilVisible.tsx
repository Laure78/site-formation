'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type DeferUntilVisibleProps = {
  children: ReactNode;
  /** Contenu SSR affiché tant que la zone n’est pas proche du viewport. */
  fallback: ReactNode;
  /** Marge d’anticipation (IntersectionObserver). */
  rootMargin?: string;
  /** Hauteur minimale pour limiter le layout shift. */
  minHeight?: string;
  className?: string;
};

/**
 * Monte les enfants (souvent import dynamique) lorsque le bloc entre dans le viewport.
 * Le fallback reste en HTML initial — utile pour alléger le premier octet sans masquer le SEO.
 */
export function DeferUntilVisible({
  children,
  fallback,
  rootMargin = '280px 0px',
  minHeight,
  className,
}: DeferUntilVisibleProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={rootRef} className={className} style={minHeight ? { minHeight } : undefined}>
      {visible ? children : fallback}
    </div>
  );
}
