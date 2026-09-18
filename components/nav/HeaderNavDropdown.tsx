'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  headerNavItemIsActive,
  headerNavLinkTreeIsActive,
  type HeaderNavItem,
  type HeaderNavLink,
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

function HeaderNavDropdownLinks({
  links,
  pathname,
  onNavigate,
  nested = false,
}: {
  links: readonly HeaderNavLink[];
  pathname: string;
  onNavigate?: () => void;
  nested?: boolean;
}) {
  return (
    <>
      {links.map((child) => {
        const childActive = headerNavLinkTreeIsActive(child, pathname);
        const hasNested = Boolean(child.children?.length);
        return (
          <li key={`${child.href}-${child.label}`}>
            <Link
              href={child.href}
              title={child.title}
              onClick={onNavigate}
              className={`header-nav-dropdown-link ${
                nested ? 'header-nav-dropdown-link--nested' : ''
              } ${hasNested ? 'header-nav-dropdown-link--group' : ''} ${
                childActive ? 'header-nav-dropdown-link--active' : ''
              }`}
            >
              {child.label}
            </Link>
            {hasNested ? (
              <ul className="header-nav-dropdown-nested">
                <HeaderNavDropdownLinks
                  links={child.children!}
                  pathname={pathname}
                  onNavigate={onNavigate}
                  nested
                />
              </ul>
            ) : null}
          </li>
        );
      })}
    </>
  );
}

function HeaderMobileNavLinks({
  links,
  pathname,
  onNavigate,
  nested = false,
}: {
  links: readonly HeaderNavLink[];
  pathname: string;
  onNavigate: () => void;
  nested?: boolean;
}) {
  return (
    <>
      {links.map((child) => {
        const childActive = headerNavLinkTreeIsActive(child, pathname);
        const hasNested = Boolean(child.children?.length);
        return (
          <li key={`${child.href}-${child.label}`}>
            <Link
              href={child.href}
              title={child.title}
              onClick={onNavigate}
              className={`header-mobile-submenu-link ${
                nested ? 'header-mobile-submenu-link--nested' : ''
              } ${hasNested ? 'font-medium text-slate-800' : ''} ${
                childActive
                  ? 'header-mobile-submenu-link--active'
                  : 'header-mobile-submenu-link--idle'
              }`}
            >
              {child.label}
            </Link>
            {hasNested ? (
              <ul className="header-mobile-submenu-nested">
                <HeaderMobileNavLinks
                  links={child.children!}
                  pathname={pathname}
                  onNavigate={onNavigate}
                  nested
                />
              </ul>
            ) : null}
          </li>
        );
      })}
    </>
  );
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
  const routeActive = headerNavItemIsActive(item, pathname);
  const highlighted = routeActive || open;
  const children = item.children ?? [];
  const alignEnd = item.dropdownAlign === 'end';

  return (
    <div
      className="relative flex w-full items-stretch justify-center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <div className={`${triggerClass(highlighted)} w-full`}>
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
            size={17}
            strokeWidth={2.25}
            className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </div>
      {open ? (
        <div
          id={panelId}
          data-header-dropdown=""
          className={`header-nav-dropdown-panel absolute top-full z-[60] min-w-[16.5rem] max-w-[min(100vw-2rem,24rem)] pt-1 ${
            alignEnd ? 'right-0' : 'left-0'
          }`}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <div className="header-nav-dropdown-menu" aria-labelledby={buttonId}>
            <p className="header-nav-dropdown-heading">{item.label}</p>
            <ul>
              <HeaderNavDropdownLinks links={children} pathname={pathname} onNavigate={onNavigate} />
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
        </div>
      ) : null}
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
    <div className={`${triggerClass(active, true)} w-full`}>
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
          <HeaderMobileNavLinks links={children} pathname={pathname} onNavigate={onNavigate} />
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
