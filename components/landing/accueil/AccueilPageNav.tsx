'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'accueil-offre-choix', label: 'Formations' },
  { id: 'accueil-cas', label: 'Exemples' },
  { id: 'accueil-financement', label: 'Financement' },
  { id: 'accueil-equipe', label: 'Formateurs' },
  { id: 'accueil-ressources', label: 'Ressources' },
  { id: 'accueil-faq', label: 'FAQ' },
] as const;

/** Sommaire horizontal sticky (desktop) — état actif via IntersectionObserver. */
export function AccueilPageNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  const observe = useCallback(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--site-header-height') || '72px'} 0px -55% 0px`,
        threshold: [0, 0.15, 0.35],
      },
    );

    for (const el of elements) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observe();
    return cleanup;
  }, [observe]);

  return (
    <nav
      className="accueil-page-nav sticky z-40 hidden border-b border-ofc-border bg-white/95 backdrop-blur-md lg:block"
      style={{ top: 'var(--site-header-height, 4.5rem)' }}
      aria-label="Sommaire de la page d’accueil"
    >
      <div className="mx-auto flex max-w-[80rem] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8 [scrollbar-width:none]">
        {SECTIONS.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <Link
              key={id}
              href={`#${id}`}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-ofc-pill px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                active
                  ? 'bg-[#377CF3] text-white'
                  : 'text-ofc-ink-muted hover:bg-ofc-accent-soft hover:text-ofc-accent'
              }`}
              aria-current={active ? 'location' : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
