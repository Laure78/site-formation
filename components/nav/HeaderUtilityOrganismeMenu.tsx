'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { headerNavLinkIsActive } from '@/lib/header-nav';
import {
  UTILITY_ORGANISME_NAV_LINKS,
  utilityOrganismeNavActive,
} from '@/lib/header-nav-organisme-links';
import { usePathname } from 'next/navigation';

const TRIGGER_CLASS =
  'inline-flex min-h-11 min-w-0 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] lg:min-h-9 lg:px-2.5';

export function HeaderUtilityOrganismeMenu() {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = utilityOrganismeNavActive(pathname);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={`${panelId}-btn`}
        aria-expanded={open}
        aria-controls={`${panelId}-panel`}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`${TRIGGER_CLASS}${active ? ' font-semibold text-[#377CF3]' : ''}`}
      >
        <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.75} aria-hidden />
        <span>Notre organisme</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id={`${panelId}-panel`}
          role="region"
          aria-labelledby={`${panelId}-btn`}
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[70] min-w-[15rem] rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg"
        >
          <ul className="max-h-[min(70vh,20rem)] overflow-y-auto">
            {UTILITY_ORGANISME_NAV_LINKS.map((link) => {
              const linkActive = headerNavLinkIsActive(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.title}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 text-sm transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#377CF3] ${
                      linkActive ? 'font-semibold text-[#377CF3]' : 'text-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
