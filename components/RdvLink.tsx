import type { AnchorHTMLAttributes } from 'react';
import { CTACalendly } from '@/components/CTACalendly';

type RdvLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel'
> & {
  page?: string;
  ctaPosition?: 'hero' | 'middle' | 'footer' | 'inline' | 'unknown';
  /** Nom explicite pour utm_campaign (recommandé sur chaque emplacement). */
  campaign?: string;
};

/** Lien vers la prise de RDV Calendly (nouvel onglet). */
export function RdvLink({
  className,
  children,
  page,
  ctaPosition = 'unknown',
  campaign,
  ...rest
}: RdvLinkProps) {
  return (
    <CTACalendly
      className={className}
      page={page}
      ctaPosition={ctaPosition}
      utmCampaign={campaign}
      {...rest}
    >
      {children}
    </CTACalendly>
  );
}
