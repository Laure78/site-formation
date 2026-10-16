'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode, MouseEvent } from 'react';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { LINKS } from '@/lib/internal-links';

type AccueilPrendreRdvLinkProps = {
  origin: string;
  children?: ReactNode;
  className?: string;
  onClick?: ComponentPropsWithoutRef<'a'>['onClick'];
};

/** Lien RDV accueil — libellé CTA + suivi GA4. */
export function AccueilPrendreRdvLink({
  origin,
  className,
  children = CTA_RDV_LABEL,
  onClick,
}: AccueilPrendreRdvLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackCtaRdvClick(origin, window.location.pathname);
    onClick?.(event);
  };

  return (
    <Link
      href={LINKS.prendreRdv}
      data-cta="rdv"
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
