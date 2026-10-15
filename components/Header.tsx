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
  CircleDollarSign,
  Layers,
  Building2,
  UserCircle,
  Landmark,
  Mail,
} from 'lucide-react';
import { SITE } from '@/lib/site';
import { getHeaderNav, headerNavItemHasPanel } from '@/lib/header-nav';
import { CtaButton } from '@/components/CtaButton';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { SiteSearchBar } from '@/components/search/SiteSearchBar';
import { HeaderMegaMenu } from '@/components/nav/HeaderMegaMenu';
import {
  HeaderNavDropdown,
  HeaderNavSimpleLink,
} from '@/components/nav/HeaderNavDropdown';
import { PromoOffreFormations2027Banner } from '@/components/PromoOffreFormations2027Banner';
import {
  LINKEDIN_PROFILE_ARIA,
  LINKEDIN_PROFILE_URL,
} from '@/lib/linkedin-profile';
import type { LucideIcon } from 'lucide-react';

const headerLinkedInClass =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#377CF3] transition-colors hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

function HeaderLinkedInButton({ className = '' }: { className?: string }) {
  return (
    <ExternalLinkAnchor
      href={LINKEDIN_PROFILE_URL}
      aria-label={LINKEDIN_PROFILE_ARIA.footer}
      title={LINKEDIN_PROFILE_ARIA.footer}
      className={`${headerLinkedInClass}${className ? ` ${className}` : ''}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#377CF3] text-white shadow-sm">
        <LinkedInIcon className="h-4 w-4" />
      </span>
    </ExternalLinkAnchor>
  );
}

const HeaderMobileDrawer = dynamic(
  () =>
    import('@/components/HeaderMobileDrawer').then((mod) => ({
      default: mod.HeaderMobileDrawer,
    })),
  { ssr: false },
);

const MOBILE_NAV_ICON: Record<string, LucideIcon> = {
  formations: GraduationCap,
  entreprise: Building2,
  financement: CircleDollarSign,
  ressources: Layers,
  'a-propos': UserCircle,
  partenaires: Landmark,
  contact: Mail,
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
          {/* Ligne 1 — marque, recherche, accès */}
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

            <div className="site-header__search mx-3 hidden min-w-0 flex-1 lg:mx-4 lg:block">
              <SiteSearchBar
                scope="all"
                placeholder="Rechercher une formation, un besoin…"
                className="w-full max-w-xl"
              />
            </div>

            <div className="site-header__actions relative z-[55] hidden shrink-0 items-center gap-2 border-l border-slate-200/90 pl-2.5 lg:!flex xl:gap-2.5 xl:pl-3.5">
              <HeaderLinkedInButton className="hidden xl:inline-flex" />
              <FormationPlateformeConnexionButton
                variant="nav"
                label="Espace apprenant"
                className="!border-transparent !bg-transparent !px-2 !py-1.5 !text-xs !font-medium !text-slate-600 hover:!bg-slate-50 hover:!text-slate-900 xl:!text-sm"
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
