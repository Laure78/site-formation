'use client';

import { CtaButton, type CtaButtonProps } from '@/components/CtaButton';

type CTACalendlyProps = Omit<CtaButtonProps, 'origin'> & {
  page?: string;
  unstyled?: boolean;
  /** @deprecated — mappé vers `origin`. */
  utmCampaign?: string;
  campaign?: string;
  ctaPosition?: string;
  ctaId?: string;
};

/**
 * @deprecated Préférer `<CtaButton origin="…" />` — alias rétrocompatible.
 */
export function CTACalendly({
  page: _page,
  unstyled = false,
  utmCampaign,
  campaign,
  ctaPosition,
  ctaId,
  variant: _variant,
  ...rest
}: CTACalendlyProps) {
  const origin = ctaId ?? campaign ?? utmCampaign ?? ctaPosition ?? 'cta-calendly-legacy';

  return (
    <CtaButton
      origin={origin}
      variant={unstyled ? 'unstyled' : 'primary'}
      {...rest}
    />
  );
}
