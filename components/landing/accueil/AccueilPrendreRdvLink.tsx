'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { CtaVisio } from '@/components/CtaVisio';

type AccueilPrendreRdvLinkProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'children'
> & {
  /** Paramètre `src` pour suivi. */
  origin: string;
  className?: string;
};

/** Lien RDV accueil — libellé CTA unique + `clic_visio`. */
export function AccueilPrendreRdvLink({
  origin,
  className,
  ...rest
}: AccueilPrendreRdvLinkProps) {
  return <CtaVisio src={origin} className={className} data-cta="rdv" {...rest} />;
}
