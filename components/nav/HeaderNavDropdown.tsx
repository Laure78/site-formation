'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import type { HeaderNavDesktopHover } from '@/hooks/useHeaderNavDesktopHover';
import { ChevronDown } from 'lucide-react';
import {
  headerNavItemHasPanel,
  headerNavItemIsActive,
  headerNavLinkIsActive,
  headerNavLinkTreeIsActive,
  type HeaderMegaColumn,
  type HeaderNavItem,
  type HeaderNavLink,
} from '@/lib/header-nav';

function triggerClass({
  routeActive,
  open,
  simple = false,
}: {
  routeActive: boolean;
  open: boolean;
  simple?: boolean;
}) {
  return [
    'header-nav-trigger',
    simple ? 'header-nav-trigger--simple' : '',
    open ? 'header-nav-trigger--open' : '',
    routeActive && !open ? 'header-nav-trigger--active' : '',
    !routeActive && !open ? 'header-nav-trigger--idle' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function HeaderNavFormationsByLevel({
  columns,
  pathname,
  onNavigate,
  layout,
  dualColumn = false,
}: {
  columns: readonly HeaderMegaColumn[];
  pathname: string;
  onNavigate?: () => void;
  layout: 'columns' | 'stack';
  dualColumn?: boolean;
}) {
  const isStack = layout === 'stack';

  return (
    <div
      className={
        isStack
          ? 'header-nav-formations-stack'
          : `header-nav-dropdown-formations-grid${
              dualColumn ? ' header-nav-dropdown-formations-grid--dual' : ''
            }`
      }
    >
      {columns.map((column) => (
        <div key={column.title} className="header-nav-dropdown-formations-col min-w-0">
          <p
            className={`header-nav-dropdown-formations-level ${
              isStack ? 'header-nav-dropdown-formations-level--stack' : ''
            }`}
          >
            {column.title}
          </p>
          {column.intro ? (
            <p
              className={`text-xs leading-snug text-slate-500 ${
                isStack ? 'px-3 pb-1' : 'px-2 pb-2'
              }`}
            >
              {column.intro}
            </p>
          ) : null}
          <ul className={isStack ? 'mt-1 space-y-0' : 'mt-2 space-y-0.5'}>
            {column.links.map((link) => {
              const active = headerNavLinkIsActive(link.href, pathname);
              return (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    title={link.title}
                    onClick={onNavigate}
                    className={
                      isStack
                        ? `header-mobile-submenu-link header-mobile-submenu-link--nested ${
                            active
                              ? 'header-mobile-submenu-link--active'
                              : 'header-mobile-submenu-link--idle'
                          }`
                        : `header-nav-dropdown-link header-nav-dropdown-link--formation ${
                            active ? 'header-nav-dropdown-link--active' : ''
                          }`
                    }
                  >
                    <span
                      className={
                        isStack
                          ? 'header-mobile-submenu-link__label'
                          : 'header-nav-dropdown-link__label'
                      }
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {column.footer ? (
            <HeaderNavFormationsFooter
              footer={column.footer}
              onNavigate={onNavigate}
              className={isStack ? 'px-1' : ''}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function HeaderNavFormationsFooter({
  footer,
  onNavigate,
  className = '',
}: {
  footer: HeaderNavLink;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div className={`mt-2 border-t border-slate-100 px-2 pt-2 ${className}`}>
      <Link href={footer.href} onClick={onNavigate} className="header-nav-dropdown-footer">
        {footer.label}
        <span aria-hidden className="text-base leading-none">
          →
        </span>
      </Link>
    </div>
  );
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
                  <span className="mt-0.5 block text-xs font-normal text-slate-500">
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
              } ${
                hasNested && !nested
                  ? 'header-mobile-submenu-link--formations-level font-semibold text-slate-900'
                  : hasNested
                    ? 'font-medium text-slate-800'
                    : ''
              } ${
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
  onZoneFocusOut,
  desktopHover,
}: {
  item: HeaderNavItem;
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  /** Fermeture quand le focus quitte la rubrique et son panneau (clavier). */
  onZoneFocusOut?: () => void;
  /** Survol desktop — ouverture au pointer enter (appareils fine pointer uniquement). */
  desktopHover?: Pick<HeaderNavDesktopHover, 'onZoneEnter' | 'onZoneLeave'>;
}) {
  const panelId = `header-nav-panel-${item.id}`;
  const buttonId = `header-nav-btn-${item.id}`;
  const routeActive = headerNavItemIsActive(item, pathname);
  const children = item.children ?? [];
  const megaColumns = item.megaColumns ?? [];
  const megaQuickLinks = item.megaQuickLinks ?? [];
  const hasMega = megaColumns.length > 0;
  const alignEnd = item.dropdownAlign === 'end';
  const hideHeading = Boolean(item.hideDropdownHeading);
  const formationsPanel = Boolean(item.dropdownPanelFormations);
  const formationsDual = Boolean(item.dropdownPanelFormationsDual);
  const panelOpen = open && (children.length > 0 || hasMega);

  const submenuAriaLabel = open
    ? `Fermer le sous-menu ${item.label}`
    : `Sous-menu ${item.label}`;

  const handleZoneFocusOut = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    if (open) onZoneFocusOut?.();
  };

  return (
    <div
      className="relative flex w-full min-w-0 shrink-0 items-stretch justify-center lg:flex-1"
      data-header-nav-zone={item.id}
      onPointerEnter={() => desktopHover?.onZoneEnter(item.id)}
      onPointerLeave={() => desktopHover?.onZoneLeave(item.id)}
      onBlur={handleZoneFocusOut}
    >
      <div className={`${triggerClass({ routeActive, open })} w-full`}>
        {/* Libellé → page hub ; chevron → sous-menu (évite d’ouvrir le menu quand on veut la page). */}
        <Link
          href={item.href}
          aria-current={routeActive ? 'page' : undefined}
          onClick={onNavigate}
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
          aria-label={submenuAriaLabel}
          className="header-nav-trigger__toggle"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onToggle();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onToggle();
            }
          }}
        >
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
      {panelOpen ? (
        <div
          id={panelId}
          data-header-dropdown=""
          className={`header-nav-dropdown-panel absolute top-full z-[60] ${
            formationsPanel && hasMega && formationsDual
              ? 'min-w-[min(100vw-2rem,44rem)] max-w-[min(100vw-2rem,44rem)]'
              : formationsPanel && hasMega
              ? 'min-w-[min(100vw-2rem,56rem)] max-w-[min(100vw-2rem,56rem)]'
              : formationsPanel
                ? 'min-w-[17rem] max-w-[min(100vw-2rem,28rem)]'
                : 'min-w-[15.5rem] max-w-[min(100vw-2rem,22rem)]'
          } ${alignEnd ? 'right-0' : 'left-0'}`}
        >
          <div
            className="pointer-events-none absolute inset-x-0 -top-1 h-2"
            aria-hidden
          />
          <div
            className={`header-nav-dropdown-menu ${
              hideHeading ? 'header-nav-dropdown-menu--compact py-2' : ''
            } ${formationsPanel ? 'header-nav-dropdown-menu--formations' : ''} ${
              formationsPanel && hasMega ? 'header-nav-dropdown-menu--formations-mega' : ''
            } max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain`}
            aria-labelledby={buttonId}
          >
            {hideHeading ? null : (
              <p className="header-nav-dropdown-heading">{item.label}</p>
            )}
            {megaQuickLinks.length > 0 ? (
              <div className="mb-2 space-y-1 px-2">
                {megaQuickLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    title={link.title}
                    onClick={onNavigate}
                    className="header-nav-dropdown-footer"
                  >
                    {link.label}
                    <span aria-hidden className="text-base leading-none">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
            {hasMega ? (
              <HeaderNavFormationsByLevel
                columns={megaColumns}
                pathname={pathname}
                onNavigate={onNavigate}
                layout="columns"
                dualColumn={formationsDual}
              />
            ) : (
              <ul>
                <HeaderNavDropdownLinks
                  links={children}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              </ul>
            )}
            {item.footer ? (
              <HeaderNavFormationsFooter footer={item.footer} onNavigate={onNavigate} />
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
  const routeActive = headerNavItemIsActive(item, pathname);
  return (
    <div className={`${triggerClass({ routeActive, open: false, simple: true })} w-full min-w-0 shrink-0 lg:flex-1`}>
      <Link
        href={item.href}
        aria-current={routeActive ? 'page' : undefined}
        className="header-nav-trigger__link"
      >
        {icon}
        {item.label}
      </Link>
    </div>
  );
}

function HeaderMobileFormationsDualGroups({
  groups,
  pathname,
  onNavigate,
}: {
  groups: readonly HeaderNavLink[];
  pathname: string;
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <ul className="space-y-1">
      {groups.map((group) => {
        const groupKey = group.label;
        const isOpen = openGroup === groupKey;
        const panelId = `header-mobile-formations-group-${groupKey.replace(/\s+/g, '-')}`;
        return (
          <li key={groupKey} className="rounded-xl border border-slate-100 bg-slate-50/50">
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenGroup(isOpen ? null : groupKey)}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-900">{group.label}</span>
                {group.description ? (
                  <span className="mt-0.5 block text-xs font-normal text-slate-500">
                    {group.description}
                  </span>
                ) : null}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={2.25}
                className={`shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </button>
            {isOpen && group.children?.length ? (
              <ul id={panelId} className="border-t border-slate-100 px-1 pb-2 pt-1">
                <HeaderMobileNavLinks
                  links={group.children}
                  pathname={pathname}
                  onNavigate={onNavigate}
                  nested
                />
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
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
  const megaColumns = item.megaColumns ?? [];
  const megaQuickLinks = item.megaQuickLinks ?? [];
  const formationsDual = Boolean(item.dropdownPanelFormationsDual);
  const hasFormationsMega =
    Boolean(item.dropdownPanelFormations) && megaColumns.length > 0 && !formationsDual;
  const hasMenu = headerNavItemHasPanel(item);
  const formationsPanel = Boolean(item.dropdownPanelFormations);

  return (
    <div
      className={`header-mobile-section mb-2 ${itemActive ? 'header-mobile-section--active' : ''}`}
    >
      <div className="header-mobile-section__head">
        {hasMenu ? (
          <div className="flex min-h-11 w-full items-stretch">
            <Link
              href={item.href}
              aria-current={itemActive ? 'page' : undefined}
              onClick={onNavigate}
              className={`header-mobile-section__link min-w-0 flex-1 ${
                itemActive ? 'font-semibold text-[#2563EB]' : 'font-medium text-slate-900'
              }`}
            >
              {icon}
              <span className="flex-1 text-left">{item.label}</span>
            </Link>
            <button
              id={buttonId}
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={panelId}
              aria-haspopup="true"
              aria-label={`Ouvrir le menu ${item.label}`}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-slate-600"
            >
              <ChevronDown
                size={18}
                strokeWidth={2.25}
                className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                  expanded ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </button>
          </div>
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
        <div
          id={panelId}
          className={`header-mobile-submenu${
            formationsPanel ? ' header-mobile-submenu--formations' : ''
          }${hasFormationsMega ? ' header-mobile-submenu--formations-flat max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain' : ''}`}
          aria-labelledby={buttonId}
        >
          {formationsDual && children.length > 0 ? (
            <HeaderMobileFormationsDualGroups
              groups={children}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ) : hasFormationsMega ? (
            <>
              {megaQuickLinks.length > 0 ? (
                <div className="mb-2 px-1">
                  {megaQuickLinks.map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      title={link.title}
                      onClick={onNavigate}
                      className="header-nav-dropdown-footer"
                    >
                      {link.label}
                      <span aria-hidden className="text-base leading-none">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
              <HeaderNavFormationsByLevel
                columns={megaColumns}
                pathname={pathname}
                onNavigate={onNavigate}
                layout="stack"
              />
              {item.footer ? (
                <HeaderNavFormationsFooter footer={item.footer} onNavigate={onNavigate} />
              ) : null}
            </>
          ) : children.length > 0 ? (
            <ul>
              <HeaderMobileNavLinks links={children} pathname={pathname} onNavigate={onNavigate} />
              {item.footer ? (
                <li className="mt-1 border-t border-slate-100 pt-1">
                  <HeaderNavFormationsFooter footer={item.footer} onNavigate={onNavigate} />
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
