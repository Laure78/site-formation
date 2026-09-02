'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Libellé unique — tous les CTA RDV site (jamais surchargé via props). */
export const CTA_RDV_LABEL = 'Réservez votre visio découverte gratuite' as const;

export const CTA_RDV_HREF = LINKS.prendreRdv;

const VARIANT_CLASS: Record<'primary' | 'secondary' | 'inline', string> = {
  primary: OFC_CTA_PRIMARY,
  secondary: OFC_CTA_SECONDARY,
  inline: OFC_LINK,
};

export type CtaRdvProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children' | 'data-cta'
> & {
  /** Style uniquement — le libellé et la destination sont fixes. */
  variant?: 'primary' | 'secondary' | 'inline';
  /** Emplacement GA4 (`cta_rdv_click` → paramètre `origin`). */
  origin?: string;
};

/**
 * CTA RDV unique — `/prendre-rendez-vous`, libellé « Réservez votre visio découverte gratuite ».
 * Calendly inline réservé à la page `/prendre-rendez-vous`.
 */
export function CtaRdv({
  variant = 'primary',
  origin = 'unspecified',
  className = '',
  onClick,
  ...rest
}: CtaRdvProps) {
  const pathname = usePathname();
  const styleClass = VARIANT_CLASS[variant];
  const mergedClassName = [styleClass, className].filter(Boolean).join(' ');

  const handleClick: ComponentPropsWithoutRef<'a'>['onClick'] = (event) => {
    const pagePath =
      typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown';
    trackCtaRdvClick(origin, pagePath);
    onClick?.(event);
  };

  return (
    <Link
      href={CTA_RDV_HREF}
      data-cta="rdv"
      className={mergedClassName || undefined}
      onClick={handleClick}
      aria-label={CTA_RDV_LABEL}
      {...rest}
    >
      {CTA_RDV_LABEL}
    </Link>
  );
}
