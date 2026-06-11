'use client';

import { ChevronDown, List } from 'lucide-react';
import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import type { SommaireAncreItem } from '@/lib/sommaire-ancre';

export type SommaireAncreProps = {
  items: readonly SommaireAncreItem[];
  /** Préfixe unique pour les ids ARIA (ex. `blog-mon-slug`, `financement-constructys`). */
  instanceId: string;
  /** Titre affiché au-dessus des liens. */
  heading?: string;
  className?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToAnchor(anchor: string): void {
  const el = document.getElementById(anchor);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  window.history.pushState(null, '', `#${anchor}`);
}

/**
 * Table des matières cliquable — sticky desktop, bouton repliable mobile.
 * Liens d’ancrage internes (H2) pour jump links Google + repérage immédiat.
 */
export function SommaireAncre({
  items,
  instanceId,
  heading = 'Sur cette page',
  className = '',
}: SommaireAncreProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelId = `${instanceId}-sommaire-panel`;
  const triggerId = `${instanceId}-sommaire-trigger`;

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

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, anchor: string) => {
    event.preventDefault();
    scrollToAnchor(anchor);
    setMobileOpen(false);
  };

  const linkClass = (anchor: string) =>
    [
      'block border-l-[3px] py-2 pl-3 text-sm leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]',
      active === anchor
        ? 'border-[#377CF3] font-semibold text-[#1E40AF]'
        : 'border-transparent text-[#64748B] hover:border-[#BFDBFE] hover:text-[#1E40AF]',
    ].join(' ');

  if (items.length === 0) return null;

  const linkList = (
    <ol className="space-y-0.5">
      {items.map((item) => (
        <li key={item.anchor}>
          <a
            href={`#${item.anchor}`}
            className={linkClass(item.anchor)}
            onClick={(e) => handleAnchorClick(e, item.anchor)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className={className.trim() || undefined} data-sommaire-ancre>
      <div className="lg:hidden">
        <button
          id={triggerId}
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex w-full items-center justify-between rounded-2xl border border-[#BFDBFE] bg-white px-4 py-3 text-left shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          aria-expanded={mobileOpen}
          aria-controls={panelId}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
            <List size={18} className="shrink-0 text-[#377CF3]" aria-hidden />
            {heading} ({items.length})
          </span>
          <ChevronDown
            className={`ofc-sommaire-chevron h-5 w-5 shrink-0 text-[#377CF3] transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
        {mobileOpen ? (
          <nav
            id={panelId}
            aria-labelledby={triggerId}
            className="mt-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
          >
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#377CF3]">{heading}</p>
            <div className="mt-3">{linkList}</div>
          </nav>
        ) : null}
      </div>

      <nav
        aria-label={heading}
        className="hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:w-[240px] lg:overflow-y-auto"
      >
        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-[#377CF3]">
          <List size={16} aria-hidden />
          {heading}
        </p>
        <div className="mt-4">{linkList}</div>
      </nav>
    </div>
  );
}
