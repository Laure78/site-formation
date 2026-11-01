'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { trackContactCtaClick } from '@/lib/ga4-analytics';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

const VARIANT_CLASS: Record<'primary' | 'secondary' | 'inline', string> = {
  primary: OFC_CTA_PRIMARY,
  secondary: OFC_CTA_SECONDARY,
  inline: OFC_LINK,
};

export type CtaDevisProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children' | 'data-cta'> & {
  /** URL contact (défaut `/contact`). Peut inclure `?objet=devis&formation=…`. */
  href?: string;
  variant?: 'primary' | 'secondary' | 'inline';
};

/** CTA devis écrit — libellé unique « Demander un devis ». */
export function CtaDevis({
  href = LINKS.contact,
  variant = 'primary',
  className = '',
  onClick,
  ...rest
}: CtaDevisProps) {
  const mergedClassName = [VARIANT_CLASS[variant], className].filter(Boolean).join(' ');

  return (
    <Link
      href={href}
      data-cta="devis"
      className={mergedClassName || undefined}
      onClick={(event) => {
        trackContactCtaClick('devis');
        onClick?.(event);
      }}
      aria-label={CTA_DEVIS_LABEL}
      {...rest}
    >
      {CTA_DEVIS_LABEL}
    </Link>
  );
}
