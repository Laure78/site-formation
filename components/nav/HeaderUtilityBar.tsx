'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, Mail, Phone, Search } from 'lucide-react';
import { useSiteSearch } from '@/components/search/SiteSearchProvider';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

const UTILITY_LINK_CLASS =
  'inline-flex min-h-9 min-w-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:px-2.5';

function utilityActive(pathname: string, href: string): boolean {
  const path = href.split('#')[0] || '/';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

type HeaderUtilityBarProps = {
  onBeforeOpenSearch?: () => void;
};

/** Bandeau supérieur — spécialisation BTP + coordonnées (maquette). */
export function HeaderUtilityBar({ onBeforeOpenSearch }: HeaderUtilityBarProps) {
  const pathname = usePathname() ?? '';
  const { openSearch } = useSiteSearch();
  const contactActive = utilityActive(pathname, LINKS.contact);
  const espaceActive =
    pathname === LINKS.espaceApprenant || pathname.startsWith(`${LINKS.espaceApprenant}/`);

  const espaceHref = `${LINKS.authConnexion}?next=${encodeURIComponent(LINKS.espaceApprenant)}`;

  return (
    <div
      className="site-header__utility -mx-4 mb-1 flex min-h-9 min-w-0 items-center justify-between gap-2 bg-[#071B42] px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:mb-1.5 lg:px-8"
      aria-label="Informations et accès rapides"
    >
      <p className="hidden min-w-0 truncate text-[0.6875rem] font-medium text-white/90 sm:block sm:text-xs">
        Organisme de formation IA spécialisé BTP — Île-de-France
      </p>
      <p className="min-w-0 truncate text-[0.65rem] font-medium leading-snug text-white/90 sm:hidden">
        IA BTP · IDF
      </p>

      <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-1 gap-y-0 sm:gap-x-2">
        <a href={`tel:${CONTACT.phone}`} className={`${UTILITY_LINK_CLASS} hidden sm:inline-flex`}>
          <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span>{CONTACT.phoneDisplay}</span>
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className={`${UTILITY_LINK_CLASS} hidden md:inline-flex`}
        >
          <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="max-w-[11rem] truncate">{CONTACT.email}</span>
        </a>
        <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
        <button
          type="button"
          onClick={(event) => {
            onBeforeOpenSearch?.();
            openSearch(event.currentTarget);
          }}
          className={UTILITY_LINK_CLASS}
        >
          <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="sr-only sm:not-sr-only">Rechercher</span>
        </button>
        <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
        <Link
          href={LINKS.contact}
          className={`${UTILITY_LINK_CLASS}${contactActive ? ' font-semibold text-white' : ''}`}
          aria-current={contactActive ? 'page' : undefined}
        >
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">Contact</span>
        </Link>
        <span className="hidden h-4 w-px bg-white/25 lg:block" aria-hidden />
        <Link
          href={espaceHref}
          title="Connexion à l’espace client — plateforme de formation Laure Olivié"
          className={`${UTILITY_LINK_CLASS} hidden lg:inline-flex${espaceActive ? ' font-semibold text-white' : ''}`}
          aria-current={espaceActive ? 'page' : undefined}
        >
          <LogIn className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span>Espace client</span>
        </Link>
      </div>
    </div>
  );
}
