'use client';

import { useId } from 'react';
import { usePathname } from 'next/navigation';
import { CtaButton, type CtaButtonProps } from '@/components/CtaButton';

type RdvLinkProps = Omit<CtaButtonProps, 'origin'> & {
  page?: string;
  campaignSuffix?: string;
  campaign?: string;
  ctaPosition?: string;
  ctaId?: string;
};

/** Lien prise de RDV — alias métier de {@link CtaButton}. */
export function RdvLink({
  page: _page,
  ctaPosition = 'unknown',
  campaign,
  campaignSuffix,
  ctaId,
  ...rest
}: RdvLinkProps) {
  const reactId = useId().replace(/:/g, '');
  const effectiveCtaId =
    ctaId ??
    campaignSuffix ??
    campaign ??
    (ctaPosition !== 'unknown' ? ctaPosition : `rdv-${reactId.slice(-8)}`);

  return <CtaButton origin={effectiveCtaId} {...rest} />;
}
