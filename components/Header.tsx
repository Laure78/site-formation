'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AUTHOR_HEADSHOT_IMAGE_CLASS } from '@/lib/author-headshot';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  Home,
  GraduationCap,
  CircleDollarSign,
  Layers,
  BookOpen,
  Landmark,
  UserCircle,
  LogIn,
} from 'lucide-react';
import { SITE } from '@/lib/site';
import { headerNavItemIsActive } from '@/lib/header-nav';
import { CtaButton } from '@/components/CtaButton';
import { SiteSearchTrigger } from '@/components/search/SiteSearchTrigger';
import {
  HeaderMobileNavSection,
  HeaderNavDropdown,
  HeaderNavSimpleLink,
} from '@/components/nav/HeaderNavDropdown';
import type { LucideIcon } from 'lucide-react';

const MOBILE_NAV_ICON: Record<string, LucideIcon> = {
  accueil: Home,
  formations: GraduationCap,
  financement: CircleDollarSign,
  ressources: Layers,
  blog: BookOpen,
  partenaires: Landmark,
  'a-propos': UserCircle,
};

const PLATFORM_NAV_CLASS =
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

const PLATFORM_NAV_MOBILE_CLASS =
  'inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#377CF3] bg-white px-4 py-3.5 text-center text-[0.9375rem] font-semibold text-[#377CF3]';

/** Seuil scroll (px) — mode compact avec hysteresis pour éviter les oscillations. */
const HEADER_COMPACT_ON_PX = 120;
const HEADER_COMPACT_OFF_PX = 48;

/** Header site unique — rendu depuis `app/layout.tsx` sur toutes les routes. */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [compact, setCompact] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (navPath !== pathname) {
    setNavPath(pathname);
    setMobileOpen(false);
    setOpenId(null);
    setMobileExpanded({});
  }

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenId(null), 180);
  };

  const openItem = (id: string) => {
    clearCloseTimer();
    setOpenId(id);
  };

  const toggleItem = (id: string) => {
    clearCloseTimer();
    setOpenId((current) => (current === id ? null : id));
  };

  const closeNav = () => {
    clearCloseTimer();
    setOpenId(null);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const initial: Record<string, boolean> = {};
    for (const item of SITE.nav.header) {
      if (item.children?.length && headerNavItemIsActive(item, pathname)) {
        initial[item.id] = true;
      }
    }
    setMobileExpanded(initial);
  }, [mobileOpen, pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact((prev) => {
        if (!prev && y > HEADER_COMPACT_ON_PX) return true;
        if (prev && y < HEADER_COMPACT_OFF_PX) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!openId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenId(null);
        const button = document.getElementById(`header-nav-btn-${openId}`);
        button?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-header-nav-pill]') || target.closest('[data-header-dropdown]')) {
        return;
      }
      setOpenId(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [openId]);

  return (
    <>
      <header
        className="site-header"
        data-compact={compact ? 'true' : 'false'}
        onMouseLeave={scheduleClose}
      >
        <div className="site-header__inner">
          <Link href={SITE.links.home} className="site-header__brand">
            <span className="site-header__logo-mark ring-[#377CF3]/25">
              <Image
                src={SITE.logo.src}
                alt={SITE.logo.alt}
                title={SITE.logo.title}
                fill
                className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                sizes="40px"
                loading="lazy"
                quality={70}
              />
            </span>
            <span className="sr-only">{SITE.name}</span>
          </Link>

          <nav
            className="site-header__nav-pill"
            aria-label="Navigation principale"
            data-header-nav-pill=""
          >
            {SITE.nav.header.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              if (!hasChildren) {
                const Icon = MOBILE_NAV_ICON[item.id];
                return (
                  <HeaderNavSimpleLink
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    icon={
                      Icon ? (
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                          className="hidden shrink-0 text-current/70 xl:block"
                          aria-hidden
                        />
                      ) : undefined
                    }
                  />
                );
              }
              return (
                <HeaderNavDropdown
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  open={openId === item.id}
                  onOpen={() => openItem(item.id)}
                  onClose={scheduleClose}
                  onToggle={() => toggleItem(item.id)}
                  onNavigate={closeNav}
                />
              );
            })}
          </nav>

          <div className="site-header__search hidden xl:flex">
            <SiteSearchTrigger className="px-2 py-2" />
          </div>

          <div className="site-header__actions">
            <a
              href={SITE.platform.loginHref}
              title={SITE.platform.title}
              aria-label={SITE.platform.connexionLabel}
              className={PLATFORM_NAV_CLASS}
            >
              <LogIn className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
              {SITE.platform.connexionLabel}
            </a>
            <CtaButton
              origin="header-desktop"
              className="text-sm max-[380px]:px-3 max-[380px]:py-2 max-[380px]:text-xs"
            />
          </div>

          <div className="site-header__rdv-mobile">
            <CtaButton
              origin="header-mobile-bar"
              className="text-sm max-[380px]:px-3 max-[380px]:py-2 max-[380px]:text-xs"
            />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <SiteSearchTrigger className="p-2.5" />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="header-mobile-backdrop lg:hidden"
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="header-mobile-drawer lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
              <Link
                href={SITE.links.home}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200/70">
                  <Image
                    src={SITE.logo.src}
                    alt=""
                    fill
                    className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                    sizes="36px"
                    quality={70}
                    loading="lazy"
                  />
                </span>
                <span className="font-display text-base font-bold text-slate-900">{SITE.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>
            <div className="border-b border-slate-100 px-4 py-3">
              <SiteSearchTrigger className="w-full justify-start px-3 py-2.5" showLabel />
            </div>
            <nav
              className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4"
              aria-label="Navigation mobile"
            >
              {SITE.nav.header.map((item) => {
                const Icon = MOBILE_NAV_ICON[item.id];
                return (
                  <HeaderMobileNavSection
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    expanded={Boolean(mobileExpanded[item.id])}
                    onToggle={() =>
                      setMobileExpanded((current) => ({
                        ...current,
                        [item.id]: !current[item.id],
                      }))
                    }
                    onNavigate={() => setMobileOpen(false)}
                    icon={
                      Icon ? (
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                          className={
                            item.isActive?.(pathname) || pathname === item.href
                              ? 'text-[#377CF3]'
                              : 'text-slate-400'
                          }
                        />
                      ) : undefined
                    }
                  />
                );
              })}
            </nav>
            <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4">
              <div className="flex flex-col gap-3">
                <a
                  href={SITE.platform.loginHref}
                  title={SITE.platform.title}
                  aria-label={SITE.platform.connexionNavMobileLabel}
                  onClick={() => setMobileOpen(false)}
                  className={PLATFORM_NAV_MOBILE_CLASS}
                >
                  <LogIn className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  {SITE.platform.connexionNavMobileLabel}
                </a>
                <CtaButton
                  origin="header-mobile-drawer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center text-[0.9375rem]"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
