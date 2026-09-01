'use client';

import dynamic from 'next/dynamic';
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
} from 'lucide-react';
import { SITE } from '@/lib/site';
import { headerNavItemIsActive, getHeaderNav } from '@/lib/header-nav';
import { CtaButton } from '@/components/CtaButton';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { SiteSearchTrigger } from '@/components/search/SiteSearchTrigger';
import {
  HeaderNavDropdown,
  HeaderNavSimpleLink,
} from '@/components/nav/HeaderNavDropdown';
import type { LucideIcon } from 'lucide-react';

const HeaderMobileDrawer = dynamic(
  () =>
    import('@/components/HeaderMobileDrawer').then((mod) => ({
      default: mod.HeaderMobileDrawer,
    })),
  { ssr: false },
);

const MOBILE_NAV_ICON: Record<string, LucideIcon> = {
  accueil: Home,
  formations: GraduationCap,
  financement: CircleDollarSign,
  ressources: Layers,
  blog: BookOpen,
  partenaires: Landmark,
  'a-propos': UserCircle,
};

/** Seuil scroll (px) — mode compact avec hysteresis pour éviter les oscillations. */
const HEADER_COMPACT_ON_PX = 120;
const HEADER_COMPACT_OFF_PX = 48;

/** Header site unique — rendu depuis `app/layout.tsx` sur toutes les routes. */
export function Header() {
  const pathname = usePathname();
  const headerNav = getHeaderNav();
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
    for (const item of headerNav) {
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
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const attachScroll = () => {
      if (!mounted) return;
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
      cleanup = () => window.removeEventListener('scroll', onScroll);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(attachScroll, { timeout: 2500 });
      return () => {
        mounted = false;
        window.cancelIdleCallback(idleId);
        cleanup?.();
      };
    }

    const timerId = window.setTimeout(attachScroll, 1);
    return () => {
      mounted = false;
      window.clearTimeout(timerId);
      cleanup?.();
    };
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
                priority
                fetchPriority="high"
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
            {headerNav.map((item) => {
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
            <FormationPlateformeConnexionButton
              variant="nav"
              label={SITE.platform.connexionLabel}
            />
            <CtaButton
              origin="header-desktop"
              className="text-sm max-[380px]:px-3 max-[380px]:py-2 max-[380px]:text-xs"
            />
          </div>

          <div className="site-header__rdv-mobile">
            <CtaButton
              origin="header-mobile-bar"
              layout="nav"
              className="px-3 py-2 text-xs leading-tight sm:px-4 sm:text-sm"
            />
          </div>

          <div className="flex shrink-0 items-center gap-0.5 lg:hidden">
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
        <HeaderMobileDrawer
          headerNav={headerNav}
          pathname={pathname}
          mobileExpanded={mobileExpanded}
          onToggleSection={(id) =>
            setMobileExpanded((current) => ({
              ...current,
              [id]: !current[id],
            }))
          }
          onClose={() => setMobileOpen(false)}
          navIcons={MOBILE_NAV_ICON}
        />
      ) : null}
    </>
  );
}
