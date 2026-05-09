'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { CTACalendly } from '@/components/CTACalendly';

const variantStyles = {
  primary:
    'inline-block rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white transition hover:bg-[#2563EB]',
  secondary:
    'inline-block rounded-xl border-2 border-[#377CF3] px-6 py-3 font-semibold text-[#377CF3] transition hover:bg-[#377CF3] hover:text-white',
  small: 'inline-block font-medium text-[#377CF3] underline hover:text-[#2563EB]',
} as const;

export type CalendlyButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  campaign: string;
  variant?: keyof typeof variantStyles;
  children: ReactNode;
};

export default function CalendlyButton({
  campaign,
  variant = 'primary',
  className,
  children,
  ...rest
}: CalendlyButtonProps) {
  return (
    <CTACalendly
      utmSource="site"
      utmMedium="cta"
      utmCampaign={campaign}
      page={campaign}
      ctaPosition="inline"
      ctaId={`calendly-btn-${campaign}`}
      unstyled
      className={[variantStyles[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </CTACalendly>
  );
}
