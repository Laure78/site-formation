'use client';

import type { ReactNode } from 'react';
import { QualiopiLogoInline } from '@/components/QualiopiLogo';
import Link from 'next/link';
import { buildSiteCalendlyCtaUrl, isCalendlyBookingHref } from '@/lib/calendly';
import { CTACalendly } from '@/components/CTACalendly';

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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
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
  /** Description personnalisée (ex. CTA pour prendre RDV) */
  description?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  /** utm_campaign lorsque primaryHref pointe vers Calendly */
  primaryCalendlyCampaign?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** utm_campaign lorsque secondaryHref pointe vers Calendly */
  secondaryCalendlyCampaign?: string;
  variant?: 'default' | 'compact';
}

export function CTABlock({
  title = 'Prêt à vous former à l\'IA ?',
  description,
  primaryLabel = 'Découvrir la formation IA appliquée au bâtiment',
  primaryHref = '/formations',
  primaryCalendlyCampaign = 'cta-block-primary',
  secondaryLabel = 'Prendre rendez-vous (30 min, gratuit)',
  secondaryHref = buildSiteCalendlyCtaUrl('cta-block-secondary'),
  secondaryCalendlyCampaign = 'cta-block-secondary',
  variant = 'default',
}: CTABlockProps) {
  return (
    <div className="rounded-2xl bg-[var(--accent)] p-8 text-white">
      {variant === 'default' && (
        <h2 className="font-display text-2xl font-bold">
          {title}
        </h2>
      )}
      <div className="mt-2 text-white/90">
        {description ?? (
          <span className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex shrink-0 items-center rounded-md bg-white px-1.5 py-1 shadow-sm">
              <QualiopiLogoInline heightPx={22} />
            </span>
            <span>Formation dispensée par un organisme certifié Qualiopi · financement possible selon éligibilité</span>
          </span>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        {isCalendlyBookingHref(primaryHref) ? (
          <CTACalendly
            ctaPosition="footer"
            ctaId="cta-block-primary"
            utmSource="site"
            utmMedium="cta"
            utmCampaign={primaryCalendlyCampaign}
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-slate-50"
          >
            {primaryLabel}
          </CTACalendly>
        ) : (
          <CtaHref
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-slate-50"
          >
            {primaryLabel}
          </CtaHref>
        )}
        {isCalendlyBookingHref(secondaryHref) ? (
          <CTACalendly
            ctaPosition="footer"
            ctaId="cta-block-secondary"
            utmSource="site"
            utmMedium="cta"
            utmCampaign={secondaryCalendlyCampaign}
            className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-8 py-4 text-base font-bold text-white hover:bg-[#2d6ab8]"
          >
            {secondaryLabel}
          </CTACalendly>
        ) : (
          <CtaHref
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            {secondaryLabel}
          </CtaHref>
        )}
      </div>
    </div>
  );
}
