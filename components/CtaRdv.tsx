'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

export { CTA_RDV_LABEL };

export const CTA_RDV_HREF = LINKS.prendreRdv;

/** Primary : fond #377CF3, texte blanc, radius 8px (brief C1). */
const CTA_RDV_PRIMARY_CLASS =
  'inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[#377CF3] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-[transform,background-color] duration-200 ease-out hover:bg-[#2f6bd4] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

const VARIANT_CLASS: Record<'primary' | 'secondary' | 'inline', string> = {
  primary: CTA_RDV_PRIMARY_CLASS,
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
  /** Alias `src` — ajouté en query `?src=` pour utm_content Calendly sur `/prendre-rdv`. */
  src?: string;
};

/**
 * CTA RDV unique — `/prendre-rdv`, libellé « Réservez votre visio découverte gratuite ».
 * Calendly inline réservé à la page `/prendre-rdv` (30 min, visioconférence possible).
 */
export function CtaRdv({
  variant = 'primary',
  origin = 'unspecified',
  src,
  className = '',
  onClick,
  ...rest
}: CtaRdvProps) {
  const pathname = usePathname();
  const styleClass = VARIANT_CLASS[variant];
  const mergedClassName = [styleClass, className].filter(Boolean).join(' ');
  const emplacement = src || origin;
  const href =
    emplacement && emplacement !== 'unspecified'
      ? `${CTA_RDV_HREF}?src=${encodeURIComponent(emplacement)}`
      : CTA_RDV_HREF;

  const handleClick: ComponentPropsWithoutRef<'a'>['onClick'] = (event) => {
    const pagePath =
      typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown';
    trackCtaRdvClick(emplacement, pagePath);
    onClick?.(event);
  };

  return (
    <Link
      href={href}
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
