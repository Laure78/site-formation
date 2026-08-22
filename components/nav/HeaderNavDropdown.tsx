'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  headerNavItemIsActive,
  headerNavLinkIsActive,
  type HeaderNavItem,
} from '@/lib/header-nav';

const TRIGGER_CLASS =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full py-2 pl-2 pr-1 text-sm font-medium transition-all xl:pl-2 xl:pr-0.5 2xl:pl-3.5';
const TRIGGER_ACTIVE = 'bg-white text-slate-900 shadow-sm';
const TRIGGER_IDLE = 'text-slate-700 hover:text-slate-900';
const LINK_CLASS =
  'block rounded-lg px-3 py-2 text-sm leading-snug text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';
const LINK_ACTIVE = 'bg-slate-50 font-medium text-[var(--accent)]';

export function HeaderNavDropdown({
  item,
  pathname,
  open,
  onOpen,
  onClose,
  onToggle,
  onNavigate,
}: {
  item: HeaderNavItem;
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const panelId = `header-nav-panel-${item.id}`;
  const buttonId = `header-nav-btn-${item.id}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ top: number; left: number; right: number } | null>(null);
  const active = headerNavItemIsActive(item, pathname) || open;
  const children = item.children ?? [];

  useLayoutEffect(() => {
    if (!open) return;
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setBox({
        top: rect.bottom,
        left: rect.left,
        right: window.innerWidth - rect.right,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative flex items-stretch"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href={item.href}
        aria-current={headerNavItemIsActive(item, pathname) ? 'page' : undefined}
        className={`${TRIGGER_CLASS} ${active ? TRIGGER_ACTIVE : TRIGGER_IDLE} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]`}
      >
        {item.label}
      </Link>
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        aria-label={`Ouvrir le menu ${item.label}`}
        className={`flex items-center rounded-full py-2 pr-2 pl-0.5 text-slate-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] xl:pr-2.5 ${
          open ? 'text-slate-800' : 'hover:text-slate-700'
        }`}
        onClick={(event) => {
          event.preventDefault();
          onToggle();
        }}
      >
        <ChevronDown
          size={15}
          strokeWidth={2}
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && box
        ? createPortal(
            <div
              id={panelId}
              data-header-dropdown=""
              className="min-w-[15.5rem] max-w-[min(100vw-2rem,22rem)] pt-2"
              style={{
                position: 'fixed',
                top: box.top,
                zIndex: 60,
                ...(item.dropdownAlign === 'end' ? { right: box.right } : { left: box.left }),
              }}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
            >
              <ul
                className="max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/80 bg-white py-2 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]"
                aria-labelledby={buttonId}
              >
                {children.map((child) => {
                  const childActive = headerNavLinkIsActive(child.href, pathname);
                  return (
                    <li key={`${child.href}-${child.label}`}>
                      <Link
                        href={child.href}
                        onClick={onNavigate}
                        className={`${LINK_CLASS} ${childActive ? LINK_ACTIVE : ''}`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
                {item.footer ? (
                  <li className="mt-1 border-t border-slate-100 pt-1">
                    <Link
                      href={item.footer.href}
                      onClick={onNavigate}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                    >
                      {item.footer.label}
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export function HeaderNavSimpleLink({
  item,
  pathname,
  icon,
}: {
  item: HeaderNavItem;
  pathname: string;
  icon?: ReactNode;
}) {
  const active = headerNavItemIsActive(item, pathname);
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] xl:px-2 2xl:px-3.5 ${
        active ? TRIGGER_ACTIVE : TRIGGER_IDLE
      }`}
    >
      {icon}
      {item.label}
    </Link>
  );
}

export function HeaderMobileNavSection({
  item,
  pathname,
  expanded,
  onToggle,
  onNavigate,
  icon,
}: {
  item: HeaderNavItem;
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  icon?: ReactNode;
}) {
  const panelId = `header-mobile-panel-${item.id}`;
  const buttonId = `header-mobile-btn-${item.id}`;
  const itemActive = headerNavItemIsActive(item, pathname);
  const children = item.children ?? [];
  const hasMenu = children.length > 0;

  return (
    <div className="border-b border-slate-100 py-1">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          aria-current={itemActive ? 'page' : undefined}
          onClick={onNavigate}
          className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
            hasMenu ? 'font-semibold' : 'font-medium'
          } ${itemActive ? 'text-[var(--accent)]' : 'text-slate-900'}`}
        >
          {icon}
          {item.label}
        </Link>
        {hasMenu ? (
          <button
            id={buttonId}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-haspopup="true"
            aria-label={`Afficher le menu ${item.label}`}
            className="flex shrink-0 items-center rounded-lg px-2 text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
        ) : null}
      </div>
      {hasMenu && expanded ? (
        <ul id={panelId} className="space-y-0.5 pb-2 pl-1" aria-labelledby={buttonId}>
          {children.map((child) => {
            const childActive = headerNavLinkIsActive(child.href, pathname);
            return (
              <li key={`${child.href}-${child.label}`}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className={`block rounded-lg px-3 py-2.5 text-sm leading-snug ${
                    childActive
                      ? 'bg-slate-50 font-medium text-[var(--accent)]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
          {item.footer ? (
            <li className="mt-1 border-t border-slate-100 pt-1">
              <Link
                href={item.footer.href}
                onClick={onNavigate}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--accent)]"
              >
                {item.footer.label}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
