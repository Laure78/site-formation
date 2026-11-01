'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { trackClicVisio } from '@/lib/ga4-analytics';
import { buildPrendreRdvHref } from '@/lib/prendre-rdv-href';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Primary : fond #377CF3, texte blanc, radius 8px (charte OFC). */
const CTA_VISIO_PRIMARY_CLASS =
  'inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[#377CF3] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-[transform,background-color] duration-200 ease-out hover:bg-[#2f6bd4] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

const VARIANT_CLASS: Record<'primary' | 'secondary' | 'inline', string> = {
  primary: CTA_VISIO_PRIMARY_CLASS,
  secondary: OFC_CTA_SECONDARY,
  inline: OFC_LINK,
};

export type CtaVisioProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children' | 'data-cta'
> & {
  /** Emplacement de suivi — query `?src=` + GA4 `clic_visio.src`. */
  src: string;
  variant?: 'primary' | 'secondary' | 'inline';
  /** @deprecated Alias de `src` — conservé pour migration depuis {@link CtaRdv}. */
  origin?: string;
};

/**
 * CTA visio unique — `/prendre-rdv`, libellé « Réservez votre visio découverte gratuite ».
 */
export function CtaVisio({
  src,
  origin,
  variant = 'primary',
  className = '',
  onClick,
  ...rest
}: CtaVisioProps) {
  const pathname = usePathname();
  const trackingSrc = (src || origin || 'unspecified').trim() || 'unspecified';
  const href = buildPrendreRdvHref(trackingSrc);
  const styleClass = VARIANT_CLASS[variant];
  const mergedClassName = [styleClass, className].filter(Boolean).join(' ');

  const handleClick: ComponentPropsWithoutRef<'a'>['onClick'] = (event) => {
    const pagePath =
      typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown';
    trackClicVisio(trackingSrc, pagePath);
    onClick?.(event);
  };

  return (
    <Link
      href={href}
      data-cta="visio"
      className={mergedClassName || undefined}
      onClick={handleClick}
      aria-label={CTA_RDV_LABEL}
      {...rest}
    >
      {CTA_RDV_LABEL}
    </Link>
  );
}
