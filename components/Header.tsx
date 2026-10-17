'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { AUTHOR_HEADSHOT_IMAGE_CLASS } from '@/lib/author-headshot';
import { IMAGE_QUALITY_DEFAULT } from '@/lib/image-props';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  GraduationCap,
  Layers,
  Building2,
  Route,
  CalendarDays,
  Users,
  Wallet,
  Handshake,
} from 'lucide-react';
import { SITE } from '@/lib/site';
import { useHeaderNavDesktopHover } from '@/hooks/useHeaderNavDesktopHover';
import { getHeaderNav, headerNavItemHasPanel } from '@/lib/header-nav';
import { HeaderPrimaryCta } from '@/components/nav/HeaderPrimaryCta';
import { HeaderUtilityBar } from '@/components/nav/HeaderUtilityBar';
import { useSiteSearch } from '@/components/search/SiteSearchProvider';
import { HeaderMegaMenu } from '@/components/nav/HeaderMegaMenu';
import {
  HeaderNavDropdown,
  HeaderNavSimpleLink,
} from '@/components/nav/HeaderNavDropdown';
import { PromoOffreFormations2027Banner } from '@/components/PromoOffreFormations2027Banner';
import type { LucideIcon } from 'lucide-react';

const HeaderMobileDrawer = dynamic(
  () =>
    import('@/components/HeaderMobileDrawer').then((mod) => ({
      default: mod.HeaderMobileDrawer,
    })),
  { ssr: false },
);

const MOBILE_NAV_ICON: Record<string, LucideIcon> = {
  formations: GraduationCap,
  'parcours-metiers': Route,
  entreprise: Building2,
  formateurs: Users,
  financement: Wallet,
  partenaires: Handshake,
  evenements: CalendarDays,
  ressources: Layers,
};

/** Seuil scroll (px) — mode compact avec hysteresis pour éviter les oscillations. */
const HEADER_COMPACT_ON_PX = 120;
const HEADER_COMPACT_OFF_PX = 48;

/** Header site unique — rendu depuis `app/layout.tsx` (masqué sur /admin). */
export function Header() {
  const pathname = usePathname();
  const headerNav = getHeaderNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [compact, setCompact] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const openItem = headerNav.find((item) => item.id === openId);
  const openMega = openItem?.megaColumns?.length ? openItem : null;
  const desktopHover = useHeaderNavDesktopHover(openId, setOpenId);
  const desktopHoverHandlers = desktopHover.enabled ? desktopHover : undefined;
  const { closeSearch, isSearchOpen } = useSiteSearch();

  const prepareSearchOpen = () => {
    setMobileOpen(false);
    setOpenId(null);
  };

  if (navPath !== pathname) {
    setNavPath(pathname);
    setMobileOpen(false);
    setOpenId(null);
    setMobileExpanded({});
  }

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const closeNav = () => {
    setOpenId(null);
  };

  const openMobileMenu = () => {
    const initial: Record<string, boolean> = {};
    for (const item of headerNav) {
      if (headerNavItemHasPanel(item) && item.isActive?.(pathname)) {
        initial[item.id] = true;
      }
    }
    setMobileExpanded(initial);
    setMobileOpen(true);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen && isSearchOpen) closeSearch();
  }, [mobileOpen, isSearchOpen, closeSearch]);

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
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
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
      if (
        target.closest('[data-header-nav-pill]') ||
        target.closest('[data-header-dropdown]') ||
        target.closest('.header-mega-menu')
      ) {
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

  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/demo/') ||
    pathname?.startsWith('/outils/demo-')
  ) {
    return null;
  }

  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-compact={compact ? 'true' : 'false'}
      >
        <PromoOffreFormations2027Banner />
        <div className="site-header__inner mx-auto flex max-w-[80rem] min-w-0 flex-col gap-0 px-4 py-2 sm:px-6 lg:gap-1.5 lg:px-8">
          <HeaderUtilityBar onBeforeOpenSearch={prepareSearchOpen} />

          {/* Ligne principale — marque et accès */}
          <div className="site-header__top flex min-w-0 items-center justify-between gap-2 sm:gap-3">
            <Link href={SITE.links.home} className="site-header__brand flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5">
              <span className="site-header__logo-mark ring-[#377CF3]/25">
                <Image
                  src={SITE.logo.src}
                  alt={SITE.logo.alt}
                  title={SITE.logo.title}
                  width={48}
                  height={48}
                  className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                  quality={IMAGE_QUALITY_DEFAULT}
                  priority
                />
              </span>
              <span className="site-header__brand-text flex min-w-0 flex-col leading-tight">
                <span className="site-header__brand-name truncate font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  {SITE.name}
                </span>
                <span className="site-header__brand-tagline hidden max-w-[14rem] truncate text-[0.65rem] font-medium leading-snug text-slate-500 sm:block sm:max-w-[16rem] md:max-w-[18rem] md:text-xs lg:max-w-[20rem]">
                  {SITE.tagline}
                </span>
              </span>
            </Link>

            <div className="site-header__actions relative z-[55] hidden shrink-0 items-center gap-2 border-l border-slate-200/90 pl-2.5 lg:!flex xl:gap-2.5 xl:pl-3.5">
              <HeaderPrimaryCta origin="header-desktop" />
            </div>

            <div className="flex shrink-0 items-center gap-0.5 lg:hidden">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => (mobileOpen ? setMobileOpen(false) : openMobileMenu())}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                aria-expanded={mobileOpen}
                aria-controls="header-mobile-drawer"
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
              </button>
            </div>
          </div>

          <div className="site-header__rdv-mobile lg:hidden">
            <HeaderPrimaryCta
              origin="header-mobile-bar"
              className="!min-h-10 w-full !px-4 !py-2 !text-sm"
            />
          </div>

          {/* Ligne 2 — navigation principale (desktop) */}
          <nav
            className="site-header__nav-pill"
            aria-label="Navigation principale"
            data-header-nav-pill=""
          >
            {headerNav.map((item) => {
              if (!headerNavItemHasPanel(item)) {
                return <HeaderNavSimpleLink key={item.id} item={item} pathname={pathname} />;
              }
              return (
                <HeaderNavDropdown
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  open={openId === item.id}
                  onToggle={() => toggleItem(item.id)}
                  onNavigate={closeNav}
                  onZoneFocusOut={() => {
                    if (openId === item.id) setOpenId(null);
                  }}
                  desktopHover={desktopHoverHandlers}
                  renderPanelInline={!item.megaColumns?.length}
                />
              );
            })}
          </nav>

        </div>

        {openMega?.megaColumns ? (
          <HeaderMegaMenu
            panelId={`header-nav-panel-${openMega.id}`}
            labelledBy={`header-nav-btn-${openMega.id}`}
            columns={openMega.megaColumns}
            quickLinks={openMega.megaQuickLinks}
            footerNote={openMega.megaFooterNote}
            pathname={pathname}
            onNavigate={closeNav}
            megaForId={openMega.id}
            onPointerZoneEnter={() => desktopHoverHandlers?.onZoneEnter(openMega.id)}
            onPointerZoneLeave={() => desktopHoverHandlers?.onZoneLeave(openMega.id)}
          />
        ) : null}
      </header>

      {mobileOpen ? (
        <HeaderMobileDrawer
          headerNav={headerNav}
          pathname={pathname}
          mobileExpanded={mobileExpanded}
          onToggleSection={(id) =>
            setMobileExpanded((current) => {
              const nextOpen = !current[id];
              // Un seul accordéon ouvert à la fois
              return nextOpen ? { [id]: true } : {};
            })
          }
          onClose={() => {
            setMobileOpen(false);
            menuButtonRef.current?.focus();
          }}
          navIcons={MOBILE_NAV_ICON}
        />
      ) : null}
    </>
  );
}
