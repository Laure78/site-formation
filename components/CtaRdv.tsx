'use client';

import { CtaVisio, type CtaVisioProps } from '@/components/CtaVisio';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';

export { CTA_RDV_LABEL };

export const CTA_RDV_HREF = LINKS.prendreRdv;

export type CtaRdvProps = Omit<CtaVisioProps, 'src'> & {
  /** Emplacement GA4 / `?src=` — alias de {@link CtaVisioProps.src}. */
  origin?: string;
  src?: string;
};

/**
 * @deprecated Préférer {@link CtaVisio} — alias rétrocompatible.
 */
export function CtaRdv({
  origin = 'unspecified',
  src,
  ...rest
}: CtaRdvProps) {
  const trackingSrc = src ?? origin;
  return <CtaVisio src={trackingSrc} {...rest} />;
}
