'use client';

import { useCallback, useEffect, useState } from 'react';
import { TUTOS, TUTO_CATEGORY_META, TUTO_CATEGORY_ORDER } from '@/lib/tutos';

const SECTIONS = TUTO_CATEGORY_ORDER.map((id) => {
  const meta = TUTO_CATEGORY_META[id];
  const count = TUTOS.filter((t) => t.category === id).length;
  return { id: meta.sectionId, label: meta.pillLabel, count };
}).filter((s) => s.count > 0);

/**
 * Barre sticky de navigation par rubrique — visible une fois la section tutos atteinte.
 */
export function RessourcesTutosNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0]?.id ?? '');
  const [pinned, setPinned] = useState(false);

  const onScroll = useCallback(() => {
    const anchor = document.getElementById('tutoriels-pdf');
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setPinned(rect.top <= 72);

    const headerOffset = 140;
    let current = SECTIONS[0]?.id ?? '';
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= headerOffset) {
        current = section.id;
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  if (SECTIONS.length === 0) return null;

  return (
    <div
      className={`sticky z-40 transition-[top,box-shadow,background] duration-200 ${
        pinned
          ? 'top-[calc(var(--site-header-height))] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
          : 'top-0 border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Filtrer les tutoriels par rubrique"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:py-4"
      >
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition md:text-[0.9375rem] ${
                isActive
                  ? 'bg-[#377CF3] text-white shadow-[0_2px_10px_rgba(55,124,243,0.35)]'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]'
              }`}
            >
              {section.label}
              <span className={`ml-1.5 text-xs ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                ({section.count})
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
