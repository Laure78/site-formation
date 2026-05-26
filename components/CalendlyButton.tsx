'use client';

import type { ReactNode } from 'react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

const variantMap = {
  primary: 'primary',
  secondary: 'secondary',
  small: 'unstyled',
} as const;

export type CalendlyButtonProps = {
  campaign: string;
  variant?: keyof typeof variantMap;
  children: ReactNode;
  className?: string;
};

/** Bouton popup Calendly avec campagne UTM. */
export default function CalendlyButton({
  campaign,
  variant = 'primary',
  className,
  children,
}: CalendlyButtonProps) {
  return (
    <CalendlyEmbed
      type="popup"
      campaign={campaign}
      ctaPosition="inline"
      ctaId={`calendly-btn-${campaign}`}
      variant={variantMap[variant]}
      className={className}
    >
      {children}
    </CalendlyEmbed>
  );
}
