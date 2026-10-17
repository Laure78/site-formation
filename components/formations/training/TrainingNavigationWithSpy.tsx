'use client';

import { useEffect, useState } from 'react';
import { TrainingNavigation, type TrainingNavItem } from '@/components/formations/training/TrainingNavigation';

type Props = {
  items: readonly TrainingNavItem[];
};

/** Sommaire sticky + surlignage de la section visible (aria-current). */
export function TrainingNavigationWithSpy({ items }: Props) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const ids = items
      .map((item) => item.href.replace(/^#/, ''))
      .filter(Boolean);

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Sections de la formation"
      className="sticky top-[var(--site-header-height)] z-30 border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-[78rem] px-4">
        <ul className="-mx-1 flex gap-0.5 overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`inline-flex min-h-10 items-center rounded-lg border-b-2 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                    isActive
                      ? 'border-[#377CF3] text-[#377CF3]'
                      : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#377CF3]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
