'use client';

import type { CalendlyEmbedProps } from '@/components/CalendlyEmbed';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

type CTACalendlyProps = Omit<CalendlyEmbedProps, 'type'> & {
  page?: string;
  unstyled?: boolean;
  /** Alias rétrocompatible — préférer `campaign`. */
  utmCampaign?: string;
};

/**
 * @deprecated Préférer `<CalendlyEmbed />` directement — alias rétrocompatible (lien nouvel onglet).
 */
export function CTACalendly({
  page,
  unstyled = true,
  variant,
  className,
  utmCampaign,
  campaign,
  ...rest
}: CTACalendlyProps) {
  return (
    <CalendlyEmbed
      type="link"
      variant={unstyled ? 'unstyled' : variant ?? 'primary'}
      className={className}
      campaign={campaign ?? utmCampaign}
      {...rest}
    />
  );
}
