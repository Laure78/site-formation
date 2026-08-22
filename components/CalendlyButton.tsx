'use client';

import type { ReactNode } from 'react';
import { Calendar } from 'lucide-react';
import { CtaButton, type CtaButtonProps } from '@/components/CtaButton';

export type CalendlyButtonProps = Omit<CtaButtonProps, 'origin'> & {
  /** Mappé vers `origin` pour GA4. */
  campaign: string;
  variant?: 'primary' | 'secondary' | 'small';
  children: ReactNode;
};

/** @deprecated Préférer `<CtaButton origin={campaign} />`. */
export default function CalendlyButton({
  campaign,
  className,
  children,
  variant: _variant = 'primary',
  ...rest
}: CalendlyButtonProps) {
  return (
    <CtaButton origin={campaign} className={className} {...rest}>
      {children}
    </CtaButton>
  );
}
