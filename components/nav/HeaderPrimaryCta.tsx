'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { CtaDevis } from '@/components/CtaDevis';

const HEADER_CTA_CLASS =
  'inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#0755E8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0648c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755E8] xl:px-5 xl:py-2.5 xl:text-sm';

export type HeaderPrimaryCtaProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children'
> & {
  /** Conservé pour compatibilité analytics — ignoré (CTA devis). */
  src?: string;
  /** @deprecated Alias `src`. */
  origin?: string;
};

/** CTA header — « Demander un devis » (maquette). */
export function HeaderPrimaryCta({ className = '', ...rest }: HeaderPrimaryCtaProps) {
  const merged = [HEADER_CTA_CLASS, className].filter(Boolean).join(' ');

  return <CtaDevis className={merged} data-cta="header-devis" {...rest} />;
}
