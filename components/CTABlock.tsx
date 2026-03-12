'use client';

import Link from 'next/link';

interface CTABlockProps {
  title?: string;
  /** Description personnalisée (ex. CTA pour prendre RDV) */
  description?: string;
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
  secondaryHref = '/prendre-rdv',
  variant = 'default',
}: CTABlockProps) {
  return (
    <div className="rounded-2xl bg-[var(--accent)] p-8 text-white">
      {variant === 'default' && (
        <h2 className="font-display text-2xl font-bold">
          {title}
        </h2>
      )}
      <p className="mt-2 text-white/90">
        {description ?? 'Formation certifiée Qualiopi · 100% finançable Constructys'}
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-slate-50"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
