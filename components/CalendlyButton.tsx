'use client';

import { CtaRdv, type CtaRdvProps } from '@/components/CtaRdv';

export type CalendlyButtonProps = Omit<CtaRdvProps, 'origin' | 'variant'> & {
  /** Mappé vers `origin` pour GA4. */
  campaign: string;
  variant?: 'primary' | 'secondary' | 'small';
};

/** @deprecated Préférer {@link CtaRdv}. */
export default function CalendlyButton({
  campaign,
  className,
  variant: legacyVariant = 'primary',
  ...rest
}: CalendlyButtonProps) {
  const ctaVariant =
    legacyVariant === 'secondary' ? 'secondary' : legacyVariant === 'small' ? 'inline' : 'primary';

  return <CtaRdv origin={campaign} variant={ctaVariant} className={className} {...rest} />;
}
