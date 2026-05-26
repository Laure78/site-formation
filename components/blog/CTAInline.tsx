import { Calendar } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

type Variant = 'primary' | 'soft' | 'outline';

const variantClass: Record<Variant, string> = {
  primary:
    'border-[#377CF3] bg-[#377CF3] text-white hover:bg-[#2d6ae0]',
  soft: 'border-slate-200 bg-[#F2F2F2] text-slate-900 hover:border-[#377CF3]',
  outline: 'border-2 border-[#377CF3] bg-white text-[#377CF3] hover:bg-blue-50',
};

/**
 * CTA Calendly inline pour articles MDX — popup natif.
 */
export function CTAInline({
  label = 'Vous voulez appliquer cette méthode sur vos documents BTP ?',
  variant = 'primary',
  className = '',
  campaign = 'blog-mdx-inline',
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  campaign?: string;
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
        <CalendlyEmbed
          type="popup"
          variant="unstyled"
          ctaPosition="middle"
          campaign={campaign}
          className="inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#2d6ab8]"
        />
      </div>
    </div>
  );
}
