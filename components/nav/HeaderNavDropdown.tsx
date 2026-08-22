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

function triggerClass(active: boolean, simple = false) {
  return [
    'header-nav-trigger',
    simple ? 'header-nav-trigger--simple' : '',
    active ? 'header-nav-trigger--active' : 'header-nav-trigger--idle',
  ]
    .filter(Boolean)
    .join(' ');
}

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
  const routeActive = headerNavItemIsActive(item, pathname);
  const highlighted = routeActive || open;
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
      className="relative flex items-stretch justify-center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <div className={triggerClass(highlighted)}>
        <Link
          href={item.href}
          aria-current={routeActive ? 'page' : undefined}
          className="header-nav-trigger__link"
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
          className="header-nav-trigger__toggle"
          onClick={(event) => {
            event.preventDefault();
            onToggle();
          }}
        >
          <ChevronDown
            size={15}
            strokeWidth={2.25}
            className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </div>
      {open && box
        ? createPortal(
            <div
              id={panelId}
              data-header-dropdown=""
              className="header-nav-dropdown-panel min-w-[16.5rem] max-w-[min(100vw-2rem,24rem)] pt-1"
              style={{
                position: 'fixed',
                top: box.top - 4,
                zIndex: 60,
                ...(item.dropdownAlign === 'end' ? { right: box.right } : { left: box.left }),
              }}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
            >
              <div className="header-nav-dropdown-menu" aria-labelledby={buttonId}>
                <p className="header-nav-dropdown-heading">{item.label}</p>
                <ul>
                  {children.map((child) => {
                    const childActive = headerNavLinkIsActive(child.href, pathname);
                    return (
                      <li key={`${child.href}-${child.label}`}>
                        <Link
                          href={child.href}
                          onClick={onNavigate}
                          className={`header-nav-dropdown-link ${
                            childActive ? 'header-nav-dropdown-link--active' : ''
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {item.footer ? (
                  <div className="mt-2 border-t border-slate-100 px-2 pt-2">
                    <Link href={item.footer.href} onClick={onNavigate} className="header-nav-dropdown-footer">
                      {item.footer.label}
                      <span aria-hidden className="text-base leading-none">
                        →
                      </span>
                    </Link>
                  </div>
                ) : null}
              </div>
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
    <div className={triggerClass(active, true)}>
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className="header-nav-trigger__link"
      >
        {icon}
        {item.label}
      </Link>
    </div>
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
    <div
      className={`header-mobile-section mb-2 ${itemActive ? 'header-mobile-section--active' : ''}`}
    >
      <div className="header-mobile-section__head">
        <Link
          href={item.href}
          aria-current={itemActive ? 'page' : undefined}
          onClick={onNavigate}
          className={`header-mobile-section__link ${
            itemActive ? 'font-semibold text-[#2563EB]' : 'font-medium text-slate-900'
          }`}
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
            className="header-mobile-section__toggle"
          >
            <ChevronDown
              size={18}
              strokeWidth={2.25}
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
        ) : null}
      </div>
      {hasMenu && expanded ? (
        <ul id={panelId} className="header-mobile-submenu" aria-labelledby={buttonId}>
          {children.map((child) => {
            const childActive = headerNavLinkIsActive(child.href, pathname);
            return (
              <li key={`${child.href}-${child.label}`}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className={`header-mobile-submenu-link ${
                    childActive
                      ? 'header-mobile-submenu-link--active'
                      : 'header-mobile-submenu-link--idle'
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
                className="header-nav-dropdown-footer mx-0"
              >
                {item.footer.label}
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
