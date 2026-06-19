'use client';

import { useId } from 'react';
import { usePathname } from 'next/navigation';
import type { CalendlyEmbedProps } from '@/components/CalendlyEmbed';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { deriveCalendlyCampaign } from '@/lib/calendly';

type RdvLinkProps = Omit<CalendlyEmbedProps, 'type'> & {
  /** Chemin logique pour utm_campaign (défaut : URL courante). */
  page?: string;
  /** Suffixe explicite si `campaign` absent (ex. `hero`, `footer`, `encart-visio`). */
  campaignSuffix?: string;
};

/** Bouton popup Calendly — alias métier pour prise de RDV. */
export function RdvLink({
  className,
  children,
  page,
  ctaPosition = 'unknown',
  campaign,
  campaignSuffix,
  ctaId,
  variant = 'unstyled',
  ...rest
}: RdvLinkProps) {
  const pathname = usePathname();
  const reactId = useId().replace(/:/g, '');
  const pathForCampaign = page ?? pathname;
  const effectiveCtaId =
    ctaId ??
    campaignSuffix ??
    (ctaPosition !== 'unknown' ? ctaPosition : `rdv-${reactId.slice(-8)}`);
  const resolvedCampaign = deriveCalendlyCampaign(pathForCampaign, {
    campaign,
    ctaId: campaign ? undefined : effectiveCtaId,
    ctaPosition: campaign || campaignSuffix ? undefined : ctaPosition,
  });

  return (
    <CalendlyEmbed
      type="popup"
      className={className}
      ctaPosition={ctaPosition}
      campaign={resolvedCampaign}
      ctaId={ctaId ?? effectiveCtaId}
      variant={variant}
      {...rest}
    >
      {children}
    </CalendlyEmbed>
  );
}
