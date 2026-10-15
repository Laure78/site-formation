'use client';

import Link from 'next/link';
import {
  headerNavLinkIsActive,
  type HeaderMegaColumn,
  type HeaderNavLink,
} from '@/lib/header-nav';

type HeaderMegaMenuProps = {
  panelId: string;
  labelledBy: string;
  columns: readonly HeaderMegaColumn[];
  quickLinks?: readonly HeaderNavLink[];
  footerNote?: string;
  pathname: string;
  onNavigate?: () => void;
};

export function HeaderMegaMenu({
  panelId,
  labelledBy,
  columns,
  quickLinks = [],
  footerNote,
  pathname,
  onNavigate,
}: HeaderMegaMenuProps) {
  return (
    <div
      id={panelId}
      data-header-dropdown=""
      role="region"
      aria-labelledby={labelledBy}
      className="header-mega-menu absolute inset-x-0 top-full z-[60] pt-1"
    >
      <div className="header-mega-menu__panel mx-auto max-h-[min(70vh,36rem)] max-w-[80rem] overflow-y-auto overscroll-contain px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col lg:flex-row">
            <div className="grid min-w-0 flex-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:p-8">
              {columns.map((column) => (
                <div key={column.title}>
                  <p className="font-display text-sm font-bold tracking-tight text-slate-900">
                    {column.title}
                  </p>
                  <ul className="mt-4 space-y-1">
                    {column.links.map((link) => {
                      const active = headerNavLinkIsActive(link.href, pathname);
                      return (
                        <li key={`${link.href}-${link.label}`}>
                          <Link
                            href={link.href}
                            title={link.title}
                            onClick={onNavigate}
                            className={`header-mega-menu__link group block rounded-xl px-3 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                              active
                                ? 'bg-[#EFF6FF] text-[#2563EB]'
                                : 'text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-start justify-between gap-2">
                              <span className="text-sm font-semibold leading-snug">{link.label}</span>
                              {link.badge ? (
                                <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-600">
                                  {link.badge}
                                </span>
                              ) : null}
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block truncate text-xs text-slate-500">
                                {link.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {quickLinks.length > 0 ? (
              <aside className="w-full shrink-0 border-t border-slate-100 bg-[#F8FAFC] p-6 lg:w-64 lg:border-l lg:border-t-0 lg:p-8">
                <p className="font-display text-sm font-bold tracking-tight text-slate-900">
                  Accès rapides
                </p>
                <ul className="mt-4 space-y-1">
                  {quickLinks.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        title={link.title}
                        onClick={onNavigate}
                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-white hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                      >
                        <span>{link.label}</span>
                        <span aria-hidden className="text-base leading-none text-slate-400">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>

          {footerNote ? (
            <p className="border-t border-slate-100 px-6 py-3 text-center text-xs text-slate-500 sm:px-8">
              {footerNote}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
