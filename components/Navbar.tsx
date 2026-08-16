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
  Landmark,
  UserCircle,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { HEADER_NAV } from '@/lib/header-nav';
import { PHOTOS, SITE_LOGO_ALT, SITE_LOGO_TITLE } from '@/lib/photos';
import { SiteSearchTrigger } from '@/components/search/SiteSearchTrigger';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
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
  partenaires: Landmark,
  'a-propos': UserCircle,
};

/** Seuil scroll (px) — fond compact + compression visuelle du header. */
const HEADER_COMPACT_SCROLL_PX = 80;

/** Header site unique — rendu depuis `app/layout.tsx` sur toutes les routes. */
export function Header() {
  return <NavbarInner />;
}

/** @deprecated Préférer `Header` — même chrome sticky. */
export function Navbar() {
  return <NavbarInner />;
}

function NavbarInner() {
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > HEADER_COMPACT_SCROLL_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <Link href="/" className="site-header__brand">
            <span className="site-header__logo-mark ring-[#377CF3]/25">
              <Image
                src={PHOTOS.siteAvatar.src}
                alt={SITE_LOGO_ALT}
                title={SITE_LOGO_TITLE}
                fill
                className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                sizes="40px"
                priority
              />
            </span>
            <span className="sr-only">Laure Olivié</span>
          </Link>

          <nav
            className="site-header__nav-pill"
            aria-label="Navigation principale"
            data-header-nav-pill=""
          >
            {HEADER_NAV.map((item) => {
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
                          size={16}
                          strokeWidth={1.75}
                          className="hidden shrink-0 text-slate-500 2xl:block"
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
            <FormationPlateformeConnexionButton variant="nav" />
            <Link
              href={LINKS.prendreRdv}
              className="cta-calendly cta-calendly--inline inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Prendre rendez-vous
            </Link>
          </div>

          <div className="site-header__rdv-mobile">
            <Link
              href={LINKS.prendreRdv}
              className="cta-calendly cta-calendly--inline inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 max-[380px]:px-3 max-[380px]:py-2 max-[380px]:text-xs"
            >
              Prendre rendez-vous
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <SiteSearchTrigger className="p-2.5" />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2.5 text-slate-700 hover:bg-slate-100"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
            <SiteSearchTrigger className="px-2 py-2" showLabel />
            <span className="font-display text-lg font-bold text-slate-900">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2.5 text-slate-700 hover:bg-slate-100"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4" aria-label="Navigation mobile">
            {HEADER_NAV.map((item) => {
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
                          item.isActive?.(pathname) ? 'text-[var(--accent)]' : 'text-slate-400'
                        }
                      />
                    ) : undefined
                  }
                />
              );
            })}

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6">
              <FormationPlateformeConnexionButton
                variant="navMobile"
                label="Connexion plateforme"
                onClick={() => setMobileOpen(false)}
              />
              <Link
                href={LINKS.prendreRdv}
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-full bg-[var(--accent)] px-4 py-4 text-center text-[0.9375rem] font-semibold text-white hover:bg-blue-700"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
