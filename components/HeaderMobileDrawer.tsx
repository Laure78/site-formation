'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';
import { AUTHOR_HEADSHOT_IMAGE_CLASS } from '@/lib/author-headshot';
import { CtaButton } from '@/components/CtaButton';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { HeaderMobileNavSection } from '@/components/nav/HeaderNavDropdown';
import { SiteSearchTrigger } from '@/components/search/SiteSearchTrigger';
import { SITE } from '@/lib/site';
import type { HeaderNavItem } from '@/lib/header-nav';

type HeaderMobileDrawerProps = {
  headerNav: readonly HeaderNavItem[];
  pathname: string;
  mobileExpanded: Record<string, boolean>;
  onToggleSection: (id: string) => void;
  onClose: () => void;
  navIcons: Record<string, LucideIcon>;
};

/** Menu mobile — chunk séparé, chargé à la première ouverture. */
export function HeaderMobileDrawer({
  headerNav,
  pathname,
  mobileExpanded,
  onToggleSection,
  onClose,
  navIcons,
}: HeaderMobileDrawerProps) {
  return (
    <>
      <button
        type="button"
        className="header-mobile-backdrop lg:hidden"
        aria-label="Fermer le menu"
        onClick={onClose}
      />
      <div
        className="header-mobile-drawer lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <Link href={SITE.links.home} onClick={onClose} className="flex items-center gap-2.5">
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
            onClick={onClose}
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
          {headerNav.map((item) => {
            const Icon = navIcons[item.id];
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
            <FormationPlateformeConnexionButton
              variant="navMobile"
              label={SITE.platform.connexionNavMobileLabel}
              onClick={onClose}
            />
            <CtaButton
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
