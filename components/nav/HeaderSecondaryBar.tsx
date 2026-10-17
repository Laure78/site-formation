'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { LINKS } from '@/lib/internal-links';

function SecondaryLink({
  href,
  children,
  pathname,
}: {
  href: string;
  children: ReactNode;
  pathname: string;
}) {
  const path = href.split('#')[0] || '/';
  const active =
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-md px-1.5 py-0.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
        active ? 'font-semibold text-[#377CF3]' : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      {children}
    </Link>
  );
}

/** Ligne discrète — financement et espace apprenant. */
export function HeaderSecondaryBar() {
  const pathname = usePathname() ?? '';

  return (
    <div
      className="site-header__secondary hidden min-w-0 border-t border-slate-100/90 pt-1 lg:block"
      aria-label="Accès secondaires"
    >
      <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[0.6875rem] leading-snug sm:text-xs">
        <nav className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3" aria-label="Financement">
          <SecondaryLink href={LINKS.financement} pathname={pathname}>
            Financement
          </SecondaryLink>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <FormationPlateformeConnexionButton
            variant="nav"
            label="Espace pédagogique"
            className="!border-transparent !bg-transparent !px-1.5 !py-0.5 !text-[0.6875rem] !font-medium !text-slate-600 hover:!bg-transparent hover:!text-slate-900 sm:!text-xs"
          />
        </nav>
      </div>
    </div>
  );
}
