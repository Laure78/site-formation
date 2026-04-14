'use client';

import type { ReactNode } from 'react';
import { QualiopiLogoInline } from '@/components/QualiopiLogo';
import Link from 'next/link';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

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
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'default' | 'compact';
}

export function CTABlock({
  title = 'Prêt à vous former à l\'IA ?',
  description,
  primaryLabel = 'Découvrir la formation IA BTP',
  primaryHref = '/formations',
  secondaryLabel = 'Prendre rendez-vous',
  secondaryHref = CALENDLY_BOOKING_URL,
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
            <span>Formation certifiée Qualiopi · 100% finançable Constructys</span>
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
        <CtaHref
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          {secondaryLabel}
        </CtaHref>
      </div>
    </div>
  );
}
