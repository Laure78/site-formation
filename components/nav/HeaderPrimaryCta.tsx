'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import {
  HEADER_PRIMARY_CTA_HREF,
  HEADER_PRIMARY_CTA_LABEL,
} from '@/lib/header-cta';

const HEADER_CTA_CLASS =
  'inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a63d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] xl:px-5 xl:py-2.5 xl:text-sm';

export type HeaderPrimaryCtaProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children'
> & {
  origin?: string;
};

export function HeaderPrimaryCta({
  origin = 'header',
  className = '',
  onClick,
  ...rest
}: HeaderPrimaryCtaProps) {
  const href =
    origin && origin !== 'unspecified'
      ? `${HEADER_PRIMARY_CTA_HREF}?src=${encodeURIComponent(origin)}`
      : HEADER_PRIMARY_CTA_HREF;

  const merged = [HEADER_CTA_CLASS, className].filter(Boolean).join(' ');

  return (
    <Link
      href={href}
      data-cta="header-projet"
      className={merged}
      aria-label={HEADER_PRIMARY_CTA_LABEL}
      onClick={(event) => {
        if (typeof window !== 'undefined') {
          trackCtaRdvClick(origin, window.location.pathname);
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {HEADER_PRIMARY_CTA_LABEL}
    </Link>
  );
}
