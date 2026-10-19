'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { LogIn, Mail, Search, X } from 'lucide-react';
import { AUTHOR_HEADSHOT_IMAGE_CLASS } from '@/lib/author-headshot';
import { IMAGE_QUALITY_DEFAULT } from '@/lib/image-props';
import { HeaderPrimaryCta } from '@/components/nav/HeaderPrimaryCta';
import { HeaderMobileNavSection } from '@/components/nav/HeaderNavDropdown';
import { useSiteSearch } from '@/components/search/SiteSearchProvider';
import { SITE } from '@/lib/site';
import { LINKS } from '@/lib/internal-links';
import { headerNavLinkIsActive, type HeaderNavItem } from '@/lib/header-nav';
type HeaderMobileDrawerProps = {
  headerNav: readonly HeaderNavItem[];
  pathname: string;
  onBeforeOpenSearch?: () => void;
  mobileExpanded: Record<string, boolean>;
  onToggleSection: (id: string) => void;
  onClose: () => void;
  navIcons: Record<string, LucideIcon>;
};

const MOBILE_UTILITY_BTN =
  'flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

/** Menu mobile — chunk séparé, chargé à la première ouverture. */
export function HeaderMobileDrawer({
  headerNav,
  pathname,
  onBeforeOpenSearch,
  mobileExpanded,
  onToggleSection,
  onClose,
  navIcons,
}: HeaderMobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { openSearch } = useSiteSearch();
  const espaceHref = `${LINKS.authConnexion}?next=${encodeURIComponent(LINKS.espaceApprenant)}`;
  const contactActive = headerNavLinkIsActive(LINKS.contact, pathname);
  const espaceActive =
    pathname === LINKS.espaceApprenant || pathname.startsWith(`${LINKS.espaceApprenant}/`);

  useEffect(() => {
    const node = drawerRef.current;
    if (!node) return;
    closeButtonRef.current?.focus();

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        className="header-mobile-backdrop lg:hidden"
        aria-label="Fermer le menu"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        id="header-mobile-drawer"
        className="header-mobile-drawer lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <Link href={SITE.links.home} onClick={onClose} className="flex min-w-0 items-center gap-2.5">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200/70">
              <Image
                src={SITE.logo.src}
                alt={SITE.logo.alt}
                width={36}
                height={36}
                className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                quality={IMAGE_QUALITY_DEFAULT}
                loading="lazy"
              />
            </span>
            <span className="truncate font-display text-base font-bold text-slate-900">{SITE.name}</span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            aria-label="Fermer"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>
        <nav
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4"
          aria-label="Navigation mobile"
        >
          <div className="mb-4 border-b border-slate-100 pb-3">
            <button
              type="button"
              className={MOBILE_UTILITY_BTN}
              onClick={(event) => {
                onBeforeOpenSearch?.();
                onClose();
                openSearch(event.currentTarget);
              }}
            >
              <Search className="h-[18px] w-[18px] shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
              Rechercher
            </button>
            <Link
              href={LINKS.contact}
              onClick={onClose}
              className={`${MOBILE_UTILITY_BTN}${contactActive ? ' font-semibold text-[#377CF3]' : ''}`}
            >
              <Mail className="h-[18px] w-[18px] shrink-0 text-slate-400" strokeWidth={1.75} aria-hidden />
              Contact
            </Link>
            <Link
              href={espaceHref}
              onClick={onClose}
              className={`${MOBILE_UTILITY_BTN}${espaceActive ? ' font-semibold text-[#377CF3]' : ''}`}
            >
              <LogIn className="h-[18px] w-[18px] shrink-0 text-slate-400" strokeWidth={1.75} aria-hidden />
              Espace client
            </Link>
          </div>
          {headerNav.map((item) => {
            const Icon = navIcons[item.id];
            const itemActive = item.isActive?.(pathname) || pathname === item.href;
            return (
              <HeaderMobileNavSection
                key={item.id}
                item={item}
                pathname={pathname}
                expanded={Boolean(mobileExpanded[item.id])}
                onToggle={() => onToggleSection(item.id)}
                onNavigate={onClose}
                icon={
                  Icon ? (
                    <Icon
                      size={18}
                      strokeWidth={1.75}
                      className={itemActive ? 'text-[#377CF3]' : 'text-slate-400'}
                    />
                  ) : undefined
                }
              />
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4">
          <p className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
            <span className="font-medium text-slate-500">Présentiel · Île-de-France</span>
            <Link href={LINKS.contact} onClick={onClose} className="hover:text-[#377CF3]">
              Contact
            </Link>
          </p>
          <div className="flex flex-col gap-3">
            <HeaderPrimaryCta
              origin="header-mobile-drawer"
              onClick={onClose}
              className="w-full text-center text-[0.9375rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
