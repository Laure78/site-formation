import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

type Variant = 'primary' | 'soft' | 'outline';

const variantClass: Record<Variant, string> = {
  primary:
    'border-[#377CF3] bg-[#377CF3] text-white hover:bg-[#2d6ae0]',
  soft: 'border-slate-200 bg-[#F2F2F2] text-slate-900 hover:border-[#377CF3]',
  outline: 'border-2 border-[#377CF3] bg-white text-[#377CF3] hover:bg-blue-50',
};

const linkButtonClass: Record<Variant, string> = {
  primary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#377CF3] shadow-sm hover:bg-slate-50',
  soft: 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#2d6ae0]',
  outline:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#2d6ae0]',
};

/**
 * CTA inline pour articles MDX — Calendly par défaut, ou lien interne si `href` est fourni.
 */
export function CTAInline({
  label = 'Vous voulez appliquer cette méthode sur vos documents BTP ?',
  variant = 'primary',
  className = '',
  campaign = 'blog-mdx-inline',
  href,
  linkLabel = 'Découvrir la formation',
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  campaign?: string;
  /** Lien interne (ex. fiche formation). Si absent → Calendly. */
  href?: string;
  /** Libellé du bouton quand `href` est défini. */
  linkLabel?: string;
}) {
  return (
    <div
      className={`my-8 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${variantClass[variant]} ${className}`}
    >
      <p className="flex items-center gap-2 text-sm font-medium">
        <Calendar size={20} strokeWidth={1.5} className="shrink-0 opacity-90" aria-hidden />
        <span>{label}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {href ? (
          <Link href={href} className={linkButtonClass[variant]}>
            {linkLabel}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        ) : (
          <CalendlyEmbed
            type="link"
            variant="primary"
            ctaPosition="middle"
            campaign={campaign}
            className="font-bold shadow-sm"
          />
        )}
      </div>
    </div>
  );
}
