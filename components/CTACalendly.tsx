'use client';

import { CtaRdv, type CtaRdvProps } from '@/components/CtaRdv';

type CTACalendlyProps = Omit<CtaRdvProps, 'origin'> & {
  page?: string;
  unstyled?: boolean;
  /** @deprecated — mappé vers `origin`. */
  utmCampaign?: string;
  campaign?: string;
  ctaPosition?: string;
  ctaId?: string;
};

/**
 * @deprecated Préférer {@link CtaRdv} — alias rétrocompatible.
 */
export function CTACalendly({
  page: _page,
  unstyled = false,
  utmCampaign,
  campaign,
  ctaPosition,
  ctaId,
  ...rest
}: CTACalendlyProps) {
  const origin = ctaId ?? campaign ?? utmCampaign ?? ctaPosition ?? 'cta-calendly-legacy';

  return (
    <CtaRdv
      origin={origin}
      variant={unstyled ? 'inline' : 'primary'}
      {...rest}
    />
  );
}
