import type { AnchorHTMLAttributes } from 'react';
import { CTACalendly } from '@/components/CTACalendly';

type RdvLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel'
> & {
  page?: string;
  ctaPosition?: 'hero' | 'middle' | 'footer' | 'inline' | 'unknown';
};

/** Lien vers la prise de RDV Calendly (nouvel onglet). */
export function RdvLink({ className, children, page, ctaPosition = 'unknown', ...rest }: RdvLinkProps) {
  return (
    <CTACalendly className={className} page={page} ctaPosition={ctaPosition} {...rest}>
      {children}
    </CTACalendly>
  );
}
