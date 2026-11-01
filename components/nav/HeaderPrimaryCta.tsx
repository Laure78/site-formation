'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { CtaVisio } from '@/components/CtaVisio';

const HEADER_CTA_CLASS =
  'inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a63d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] xl:px-5 xl:py-2.5 xl:text-sm';

export type HeaderPrimaryCtaProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children'
> & {
  /** Paramètre `src` — défaut `header`. */
  src?: string;
  /** @deprecated Alias `src`. */
  origin?: string;
};

export function HeaderPrimaryCta({
  src,
  origin = 'header',
  className = '',
  ...rest
}: HeaderPrimaryCtaProps) {
  const merged = [HEADER_CTA_CLASS, className].filter(Boolean).join(' ');

  return (
    <CtaVisio
      src={src ?? origin}
      variant="primary"
      className={merged}
      data-cta="header-projet"
      {...rest}
    />
  );
}
