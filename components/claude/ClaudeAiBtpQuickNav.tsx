'use client';

import { useCallback, useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'en-chiffres', label: 'Chiffres' },
  { id: 'en-bref', label: 'En bref' },
  { id: 'tableau-interfaces', label: '5 interfaces' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'tutoriel-skill-claude-btp', label: 'Tutoriel skill' },
  { id: 'gains-temps', label: 'Gains' },
  { id: 'faq-claude', label: 'FAQ' },
] as const;

/** Navigation rapide horizontale — visible sous le hero, surbrillance au scroll. */
export function ClaudeAiBtpQuickNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [pinned, setPinned] = useState(false);

  const onScroll = useCallback(() => {
    const anchor = document.getElementById('en-chiffres');
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      setPinned(rect.top <= 100);
    }

    const offset = 140;
    let current: string = SECTIONS[0].id;
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= offset) {
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

  return (
    <div
      className={`border-b transition-[background,box-shadow] duration-200 ${
        pinned
          ? 'sticky top-[calc(var(--site-header-height))] z-40 border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-slate-100 bg-[#F8FAFC]'
      }`}
    >
      <nav
        aria-label="Parcours de lecture — Claude AI BTP"
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 scrollbar-none md:flex-wrap md:py-3.5"
      >
        <span className="hidden shrink-0 self-center pr-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 md:inline">
          Aller à
        </span>
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-[#377CF3] text-white shadow-[0_2px_10px_rgba(55,124,243,0.35)]'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-[#377CF3] hover:text-[#377CF3]'
              }`}
            >
              {section.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
