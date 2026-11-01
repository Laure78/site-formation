'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { isCalendlyBookingHref } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { SITE } from '@/lib/site';

function isContactHref(href: string): boolean {
  const path = href.split('?')[0]?.replace(/\/$/, '') ?? '';
  return path === LINKS.contact || path.endsWith('/contact');
}

function CtaHref({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

interface CTABlockProps {
  title?: string;
  description?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  /** @deprecated — utiliser `primaryOrigin` / `src` sur CtaVisio. */
  primaryCalendlyCampaign?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** @deprecated — utiliser `secondaryOrigin`. */
  secondaryCalendlyCampaign?: string;
  /** `src` GA4 pour le CTA visio primary (défaut : `cta-block-primary`). */
  primaryOrigin?: string;
  /** `src` GA4 pour le CTA visio secondary (défaut : `cta-block-secondary`). */
  secondaryOrigin?: string;
  variant?: 'default' | 'compact';
}

function isRdvHref(href: string): boolean {
  return isCalendlyBookingHref(href);
}

export function CTABlock({
  title = 'Prêt à vous former à l\'IA ?',
  description,
  primaryLabel = 'Découvrir la formation IA appliquée au bâtiment',
  primaryHref = '/formations',
  primaryCalendlyCampaign = 'cta-block-primary',
  secondaryLabel,
  secondaryHref = SITE.cta.href,
  secondaryCalendlyCampaign = 'cta-block-secondary',
  primaryOrigin,
  secondaryOrigin,
  variant = 'default',
}: CTABlockProps) {
  const primaryRdvSrc = primaryOrigin ?? primaryCalendlyCampaign;
  const secondaryRdvSrc = secondaryOrigin ?? secondaryCalendlyCampaign;

  const primaryClass =
    'inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-slate-50';
  const secondaryClass =
    'inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10';

  return (
    <div className="rounded-2xl bg-[var(--accent)] p-8 text-white">
      {variant === 'default' && (
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      )}
      <div className="mt-2 text-white/90">
        {description ?? (
          <span>
            Formation dispensée par un organisme certifié Qualiopi · financement possible selon
            éligibilité
          </span>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        {isRdvHref(primaryHref) ? (
          <CtaVisio src={primaryRdvSrc} variant="secondary" className={primaryClass} />
        ) : isContactHref(primaryHref) ? (
          <CtaDevis href={primaryHref} variant="primary" className={primaryClass} />
        ) : (
          <CtaHref href={primaryHref} className={primaryClass}>
            {primaryLabel}
          </CtaHref>
        )}
        {isRdvHref(secondaryHref) ? (
          <CtaVisio src={secondaryRdvSrc} variant="secondary" className={secondaryClass} />
        ) : isContactHref(secondaryHref) ? (
          <CtaDevis href={secondaryHref} variant="secondary" className={secondaryClass} />
        ) : (
          <CtaHref href={secondaryHref} className={secondaryClass}>
            {secondaryLabel ?? primaryLabel}
          </CtaHref>
        )}
      </div>
    </div>
  );
}
