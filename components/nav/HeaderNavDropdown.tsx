'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { HeaderMegaMenu } from '@/components/nav/HeaderMegaMenu';
import {
  headerNavItemHasPanel,
  headerNavItemIsActive,
  headerNavLinkTreeIsActive,
  type HeaderNavItem,
  type HeaderNavLink,
} from '@/lib/header-nav';

function triggerClass(active: boolean, simple = false, catalogue = false) {
  return [
    'header-nav-trigger',
    simple ? 'header-nav-trigger--simple' : '',
    catalogue ? 'header-nav-trigger--catalogue text-white shadow-sm' : '',
    active && !catalogue ? 'header-nav-trigger--active' : '',
    !active && !catalogue ? 'header-nav-trigger--idle' : '',
    catalogue && active ? 'header-nav-trigger--catalogue-active' : '',
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
              <span className="min-w-0 flex-1">
                <span className="header-nav-dropdown-link__label">{child.label}</span>
                {child.description ? (
                  <span className="mt-0.5 block truncate text-xs font-normal text-slate-500">
                    {child.description}
                  </span>
                ) : null}
              </span>
              {child.badge ? (
                <span className="header-nav-dropdown-link__badge">{child.badge}</span>
              ) : null}
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
              <span className="min-w-0 flex-1">
                <span className="header-mobile-submenu-link__label">{child.label}</span>
                {child.description ? (
                  <span className="mt-0.5 block text-xs font-normal text-slate-500">
                    {child.description}
                  </span>
                ) : null}
              </span>
              {child.badge ? (
                <span className="header-mobile-submenu-link__badge">{child.badge}</span>
              ) : null}
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
  onToggle,
  onNavigate,
  renderPanelInline = true,
}: {
  item: HeaderNavItem;
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  /** false = panneau rendu au niveau du header (méga-menu pleine largeur). */
  renderPanelInline?: boolean;
}) {
  const panelId = `header-nav-panel-${item.id}`;
  const buttonId = `header-nav-btn-${item.id}`;
  const routeActive = headerNavItemIsActive(item, pathname);
  const highlighted = routeActive || open;
  const children = item.children ?? [];
  const hasMega = Boolean(item.megaColumns?.length);
  const isCatalogue = item.variant === 'catalogue';
  const alignEnd = item.dropdownAlign === 'end';

  return (
    <div className="relative flex shrink-0 items-stretch justify-center">
      <div
        className={triggerClass(highlighted, false, isCatalogue)}
        style={
          isCatalogue
            ? { backgroundColor: highlighted ? '#2A6BD9' : '#377CF3', color: '#fff' }
            : undefined
        }
      >
        {/* Bouton d’ouverture — les destinations sont des liens dans le panneau (pas de doublon d’URL). */}
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-haspopup={hasMega ? 'dialog' : 'true'}
          aria-controls={panelId}
          aria-current={routeActive ? 'page' : undefined}
          className="header-nav-trigger__link header-nav-trigger__link--menu-btn"
          onClick={onToggle}
        >
          <span>{item.label}</span>
          <ChevronDown
            size={17}
            strokeWidth={2.25}
            className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden
          />
        </button>
      </div>
      {open && hasMega && item.megaColumns && renderPanelInline ? (
        <HeaderMegaMenu
          panelId={panelId}
          labelledBy={buttonId}
          columns={item.megaColumns}
          quickLinks={item.megaQuickLinks}
          footerNote={item.megaFooterNote}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ) : null}
      {open && !hasMega && children.length > 0 && renderPanelInline ? (
        <div
          id={panelId}
          data-header-dropdown=""
          className={`header-nav-dropdown-panel absolute top-full z-[60] min-w-[18.5rem] max-w-[min(100vw-2rem,28rem)] pt-1 ${
            alignEnd ? 'right-0' : 'left-0'
          }`}
        >
          <div className="header-nav-dropdown-menu max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain" aria-labelledby={buttonId}>
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
    <div className={`${triggerClass(active, true)} shrink-0`}>
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
  const hasMega = Boolean(item.megaColumns?.length);
  const hasMenu = headerNavItemHasPanel(item);
  const isCatalogue = item.variant === 'catalogue';

  return (
    <div
      className={`header-mobile-section mb-2 ${itemActive ? 'header-mobile-section--active' : ''} ${
        isCatalogue ? 'header-mobile-section--catalogue overflow-hidden rounded-xl bg-[#377CF3]' : ''
      }`}
    >
      <div className="header-mobile-section__head">
        {hasMenu ? (
          <button
            id={buttonId}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-haspopup="true"
            aria-current={itemActive ? 'page' : undefined}
            className={`header-mobile-section__link header-mobile-section__menu-btn ${
              isCatalogue
                ? 'font-semibold text-white'
                : itemActive
                  ? 'font-semibold text-[#2563EB]'
                  : 'font-medium text-slate-900'
            }`}
          >
            {icon}
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronDown
              size={18}
              strokeWidth={2.25}
              className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden
            />
          </button>
        ) : (
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
        )}
      </div>
      {hasMenu && expanded ? (
        <div id={panelId} className="header-mobile-submenu" aria-labelledby={buttonId}>
          {hasMega && item.megaColumns
            ? item.megaColumns.map((column) => (
                <div key={column.title} className="mb-3">
                  <p className="px-2 pb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                    {column.title}
                  </p>
                  <ul>
                    <HeaderMobileNavLinks
                      links={column.links}
                      pathname={pathname}
                      onNavigate={onNavigate}
                    />
                  </ul>
                </div>
              ))
            : null}
          {hasMega && item.megaQuickLinks?.length ? (
            <div className="mb-3 border-t border-slate-100 pt-3">
              <p className="px-2 pb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                Accès rapides
              </p>
              <ul>
                <HeaderMobileNavLinks
                  links={item.megaQuickLinks}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              </ul>
            </div>
          ) : null}
          {hasMega && item.megaFooterNote ? (
            <p className="px-2 pb-2 text-xs text-slate-500">{item.megaFooterNote}</p>
          ) : null}
          {!hasMega && children.length > 0 ? (
            <ul>
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
      ) : null}
    </div>
  );
}
