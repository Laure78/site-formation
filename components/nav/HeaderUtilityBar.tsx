'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, Mail, Search } from 'lucide-react';
import { useSiteSearch } from '@/components/search/SiteSearchProvider';
import { LINKS } from '@/lib/internal-links';

const UTILITY_LINK_CLASS =
  'inline-flex min-h-11 min-w-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] lg:min-h-9 lg:px-2.5';

function utilityActive(pathname: string, href: string): boolean {
  const path = href.split('#')[0] || '/';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

type HeaderUtilityBarProps = {
  onBeforeOpenSearch?: () => void;
};

/** Bandeau supérieur — positionnement + accès rapides. */
export function HeaderUtilityBar({ onBeforeOpenSearch }: HeaderUtilityBarProps) {
  const pathname = usePathname() ?? '';
  const { openSearch } = useSiteSearch();
  const contactActive = utilityActive(pathname, LINKS.contact);
  const espaceActive =
    pathname === LINKS.espaceApprenant || pathname.startsWith(`${LINKS.espaceApprenant}/`);

  const espaceHref = `${LINKS.authConnexion}?next=${encodeURIComponent(LINKS.espaceApprenant)}`;

  return (
    <div
      className="site-header__utility -mx-4 mb-1 flex min-h-9 min-w-0 items-center justify-between gap-2 border-b border-slate-100/90 bg-[#F2F2F2]/70 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:mb-1.5 lg:px-8"
      aria-label="Informations et accès rapides"
    >
      <p className="hidden min-w-0 truncate text-[0.6875rem] font-medium text-slate-600 sm:block sm:text-xs">
        Formations IA BTP · Présentiel en Île-de-France
      </p>
      <p className="min-w-0 truncate text-[0.65rem] font-medium leading-snug text-slate-600 sm:hidden">
        IA BTP · Présentiel IDF
      </p>

      <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-0.5 gap-y-0 sm:gap-x-1">
        <button
          type="button"
          onClick={(event) => {
            onBeforeOpenSearch?.();
            openSearch(event.currentTarget);
          }}
          className={UTILITY_LINK_CLASS}
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          <span>Rechercher</span>
        </button>
        <span className="header-utility-divider hidden sm:block" aria-hidden />
        <Link
          href={LINKS.contact}
          className={`${UTILITY_LINK_CLASS}${contactActive ? ' font-semibold text-[#377CF3]' : ''}`}
          aria-current={contactActive ? 'page' : undefined}
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.75} aria-hidden />
          <span>Contact</span>
        </Link>
        <span className="header-utility-divider hidden sm:block" aria-hidden />
        <Link
          href={espaceHref}
          title="Connexion à l’espace client — plateforme de formation Laure Olivié"
          className={`${UTILITY_LINK_CLASS}${espaceActive ? ' font-semibold text-[#377CF3]' : ''}`}
          aria-current={espaceActive ? 'page' : undefined}
        >
          <LogIn className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.75} aria-hidden />
          <span>Espace client</span>
        </Link>
      </div>
    </div>
  );
}
