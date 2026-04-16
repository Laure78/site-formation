import { Calendar } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

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
  label = 'Prendre rendez-vous découverte',
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
        <RdvLink className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#377CF3] shadow-sm hover:bg-blue-50">
          Calendly — réserver
        </RdvLink>
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium underline underline-offset-2 opacity-90 hover:opacity-100"
        >
          {CALENDLY_BOOKING_URL}
        </a>
      </div>
    </div>
  );
}
