'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { CtaButton } from '@/components/CtaButton';
import { SITE } from '@/lib/site';

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
      <a href={href} target="_blank" className={className}>
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
  /** @deprecated — utiliser `secondaryOrigin`. */
  primaryCalendlyCampaign?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** @deprecated — utiliser `secondaryOrigin`. */
  secondaryCalendlyCampaign?: string;
  /** Origin GA4 pour le CTA RDV (défaut : `cta-block-secondary`). */
  secondaryOrigin?: string;
  variant?: 'default' | 'compact';
}

function isRdvHref(href: string): boolean {
  return href === SITE.cta.href || href === '/prendre-rdv';
}

export function CTABlock({
  title = 'Prêt à vous former à l\'IA ?',
  description,
  primaryLabel = 'Découvrir la formation IA appliquée au bâtiment',
  primaryHref = '/formations',
  secondaryLabel,
  secondaryHref = SITE.cta.href,
  secondaryCalendlyCampaign = 'cta-block-secondary',
  secondaryOrigin,
  variant = 'default',
}: CTABlockProps) {
  const rdvLabel = secondaryLabel ?? SITE.cta.label;
  const rdvOrigin = secondaryOrigin ?? secondaryCalendlyCampaign;

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
        <CtaHref
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-slate-50"
        >
          {primaryLabel}
        </CtaHref>
        {isRdvHref(secondaryHref) ? (
          <CtaButton
            origin={rdvOrigin}
            label={rdvLabel}
            variant="unstyled"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white hover:bg-white/10"
          />
        ) : (
          <CtaHref
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            {rdvLabel}
          </CtaHref>
        )}
      </div>
    </div>
  );
}
