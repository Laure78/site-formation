'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { CtaVisio } from '@/components/CtaVisio';

const HEADER_CTA_CLASS =
  'inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-[8px] bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-[background-color] duration-200 hover:bg-[#2f6bd4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] xl:px-5 xl:py-2.5 xl:text-sm';

export type HeaderPrimaryCtaProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children'
> & {
  /** `src` GA4 / query `?src=` pour le CTA RDV. */
  src?: string;
  /** @deprecated Alias `src`. */
  origin?: string;
  leadingAdornment?: ReactNode;
};

/** CTA header — « Prendre RDV » → `/prendre-rdv`. */
export function HeaderPrimaryCta({
  className = '',
  src,
  origin,
  leadingAdornment,
  ...rest
}: HeaderPrimaryCtaProps) {
  const merged = [HEADER_CTA_CLASS, className].filter(Boolean).join(' ');
  const trackingSrc = (src ?? origin ?? 'header').trim() || 'header';

  return (
    <CtaVisio
      src={trackingSrc}
      className={merged}
      data-cta="header-rdv"
      leadingAdornment={leadingAdornment}
      {...rest}
    />
  );
}
