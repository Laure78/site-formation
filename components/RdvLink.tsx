'use client';

import { useId } from 'react';
import { CtaRdv, type CtaRdvProps } from '@/components/CtaRdv';

type RdvLinkProps = Omit<CtaRdvProps, 'origin' | 'variant'> & {
  page?: string;
  campaignSuffix?: string;
  campaign?: string;
  ctaPosition?: string;
  ctaId?: string;
  /** Alias GA4 — mappé vers `origin` de {@link CtaRdv}. */
  origin?: string;
  /** @deprecated `unstyled` et `nav` → `inline`. */
  variant?: CtaRdvProps['variant'] | 'unstyled' | 'nav';
};

/** Lien prise de RDV — alias métier de {@link CtaRdv}. */
export function RdvLink({
  page: _page,
  ctaPosition = 'unknown',
  campaign,
  campaignSuffix,
  ctaId,
  origin,
  ...rest
}: RdvLinkProps) {
  const reactId = useId().replace(/:/g, '');
  const effectiveOrigin =
    origin ??
    ctaId ??
    campaignSuffix ??
    campaign ??
    (ctaPosition !== 'unknown' ? ctaPosition : `rdv-${reactId.slice(-8)}`);

  const { variant = 'primary', ...rdvRest } = rest;
  const ctaVariant =
    variant === 'unstyled' || variant === 'nav' ? 'inline' : variant === 'secondary' ? 'secondary' : 'primary';

  return <CtaRdv origin={effectiveOrigin} variant={ctaVariant} {...rdvRest} />;
}
