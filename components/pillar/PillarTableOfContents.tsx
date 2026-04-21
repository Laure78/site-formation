'use client';

import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export type PillarTocItem = { label: string; anchor: string };

type Props = {
  items: readonly PillarTocItem[];
  /** Préfixe pour les ids du panneau mobile (accessibilité) */
  instanceId: string;
};

/**
 * Sommaire type page pilier — sticky desktop, accordéon mobile, surbrillance au scroll.
 */
export function PillarTableOfContents({ items, instanceId }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelId = `${instanceId}-toc-panel`;

  const refreshActive = useCallback(() => {
    const ordered = [...items].reverse();
    let found: string | null = null;
    const y = window.scrollY + 120;
    for (const { anchor } of ordered) {
      const el = document.getElementById(anchor);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= y) {
        found = anchor;
        break;
      }
    }
    setActive(found ?? items[0]?.anchor ?? null);
  }, [items]);

  useEffect(() => {
    const t = window.setTimeout(() => refreshActive(), 0);
    window.addEventListener('scroll', refreshActive, { passive: true });
    window.addEventListener('resize', refreshActive);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', refreshActive);
      window.removeEventListener('resize', refreshActive);
    };
  }, [refreshActive]);

  const linkClass = (anchor: string) =>
    [
      'block border-l-[3px] py-2.5 pl-3 text-sm transition-colors',
      active === anchor
        ? 'border-[#377CF3] font-bold text-[#1E40AF]'
        : 'border-transparent text-[#64748B] hover:text-[#1E40AF]',
    ].join(' ');

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-2xl border border-[#BFDBFE] bg-white px-4 py-3 text-left shadow-sm"
          aria-expanded={mobileOpen}
          aria-controls={panelId}
        >
          <span className="text-sm font-semibold text-[#0F172A]">
            Sur cette page ({items.length})
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[#377CF3] transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
        {mobileOpen ? (
          <nav
            id={panelId}
            aria-label="Sur cette page"
            className="mt-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
          >
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#377CF3]">Sur cette page</p>
            <ul className="mt-2 space-y-0">
              {items.map((item) => (
                <li key={item.anchor}>
                  <a
                    href={`#${item.anchor}`}
                    className={linkClass(item.anchor)}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <nav
        aria-label="Sur cette page"
        className="hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:w-[240px] lg:overflow-y-auto"
      >
        <p className="text-[13px] font-semibold uppercase tracking-widest text-[#377CF3]">Sur cette page</p>
        <ul className="mt-4 space-y-0">
          {items.map((item) => (
            <li key={item.anchor}>
              <a href={`#${item.anchor}`} className={linkClass(item.anchor)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
