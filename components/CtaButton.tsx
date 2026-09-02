'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { CtaRdv, type CtaRdvProps } from '@/components/CtaRdv';

export const CTA_BUTTON_BASE_CLASS =
  'inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#2a63d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

export type CtaButtonProps = Omit<CtaRdvProps, 'variant'> & {
  /** @deprecated Ignoré — libellé fixe via {@link CtaRdv}. */
  label?: string;
  /** @deprecated Ignoré — libellé fixe via {@link CtaRdv}. */
  compactLabel?: string;
  /** @deprecated Ignoré — destination fixe `/prendre-rendez-vous`. */
  href?: string;
  /** @deprecated Ignoré — contenu fixe via {@link CtaRdv}. */
  children?: ReactNode;
  /** @deprecated Ignoré — conservé pour compatibilité API. */
  layout?: 'body' | 'nav';
  variant?: 'primary' | 'unstyled';
  onClick?: ComponentPropsWithoutRef<'a'>['onClick'];
};

/**
 * @deprecated Préférer {@link CtaRdv} — alias rétrocompatible vers le CTA RDV unifié.
 */
export function CtaButton({
  origin = 'unspecified',
  variant = 'primary',
  className = '',
  ...rest
}: CtaButtonProps) {
  const ctaVariant = variant === 'unstyled' ? 'inline' : 'primary';
  return (
    <CtaRdv
      origin={origin}
      variant={ctaVariant}
      className={className}
      {...rest}
    />
  );
}
