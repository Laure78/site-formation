'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { LINKS } from '@/lib/internal-links';

type AccueilPrendreRdvLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children'> & {
  origin: string;
  children?: ReactNode;
};

/** Lien RDV accueil — libellé « Prendre rendez-vous » + suivi GA4. */
export function AccueilPrendreRdvLink({
  origin,
  className = '',
  children = 'Prendre rendez-vous',
  onClick,
  ...rest
}: AccueilPrendreRdvLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={LINKS.prendreRdv}
      data-cta="rdv"
      className={className || undefined}
      aria-label="Prendre rendez-vous"
      onClick={(event) => {
        const pagePath =
          typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown';
        trackCtaRdvClick(origin, pagePath);
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
