'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

const BASE_SECTIONS = [
  { id: 'catalogue-formations', label: 'Catalogue' },
  { id: 'trouver-mon-parcours', label: 'Parcours' },
  { id: 'plan-formation-entreprise', label: 'Équipe' },
  { id: 'contact-catalogue', label: 'Devis' },
  { id: 'faq-catalogue', label: 'FAQ' },
] as const;

export function FormationsCataloguePageNav() {
  const sections = useMemo(
    () =>
      isParcoursMetiers2027Visible()
        ? BASE_SECTIONS
        : BASE_SECTIONS.filter((s) => s.id !== 'trouver-mon-parcours'),
    [],
  );
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  const observe = useCallback(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--site-header-height') || '72px'} 0px -55% 0px`,
        threshold: [0, 0.12, 0.3],
      },
    );

    for (const el of elements) io.observe(el);
    return () => io.disconnect();
  }, [sections]);

  useEffect(() => {
    const cleanup = observe();
    return cleanup;
  }, [observe]);

  return (
    <nav
      className="sticky z-40 hidden border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md lg:block"
      style={{ top: 'var(--site-header-height, 4.5rem)' }}
      aria-label="Sommaire de la page catalogue"
    >
      <div className="mx-auto flex max-w-[80rem] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8 [scrollbar-width:none]">
        {sections.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <Link
              key={id}
              href={`#${id}`}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                active
                  ? 'bg-[#377CF3] text-white'
                  : 'text-ofc-ink-muted hover:bg-[#F2F2F2] hover:text-[#377CF3]'
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
