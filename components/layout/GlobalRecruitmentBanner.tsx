'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FORMATEUR_RECRUITMENT_2027_CAMPAIGN,
} from '@/lib/consultant-recruitment-content';
import { LINKS } from '@/lib/internal-links';
import { shouldShowPublicSiteChrome } from '@/lib/public-site-chrome';

const LINK_CLASS =
  'shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold text-white underline-offset-2 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/** Bandeau compact recrutement formateurs — au-dessus du header, pages publiques uniquement. */
export function GlobalRecruitmentBanner() {
  const pathname = usePathname();
  const campaign = FORMATEUR_RECRUITMENT_2027_CAMPAIGN;

  if (!campaign.enabled || !shouldShowPublicSiteChrome(pathname)) {
    return null;
  }

  const { banner } = campaign;

  return (
    <div
      className="global-recruitment-banner border-b border-[#2d6ad8] bg-[#377CF3] text-white"
      role="region"
      aria-label="Recrutement formateurs IA BTP 2027"
    >
      <div className="mx-auto flex max-w-[80rem] min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-2 sm:justify-between sm:px-6 lg:px-8">
        <p className="min-w-0 text-center text-sm leading-snug sm:text-left">
          <span className="hidden sm:inline">{banner.desktopMessage}</span>
          <span className="sm:hidden">{banner.mobileMessage}</span>
        </p>
        <Link href={LINKS.nousRejoindre} className={LINK_CLASS}>
          {banner.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
