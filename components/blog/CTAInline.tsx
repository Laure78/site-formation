import { Calendar } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';

type Variant = 'primary' | 'soft' | 'outline';

const variantClass: Record<Variant, string> = {
  primary:
    'border-[#377CF3] bg-[#377CF3] text-white hover:bg-[#2d6ae0]',
  soft: 'border-slate-200 bg-[#F2F2F2] text-slate-900 hover:border-[#377CF3]',
  outline: 'border-2 border-[#377CF3] bg-white text-[#377CF3] hover:bg-blue-50',
};

/**
 * CTA Calendly inline pour articles MDX (2–3 par article recommandé).
 */
export function CTAInline({
  label = 'Vous voulez appliquer cette méthode sur vos documents BTP ?',
  variant = 'primary',
  className = '',
}: {
  label?: string;
  variant?: Variant;
  className?: string;
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
        <RdvLink
          page="blog"
          ctaPosition="middle"
          className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#2d6ab8]"
        >
          Réservez votre visio découverte gratuite
        </RdvLink>
      </div>
    </div>
  );
}
