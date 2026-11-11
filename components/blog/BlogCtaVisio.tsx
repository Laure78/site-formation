'use client';

import { CtaVisio } from '@/components/CtaVisio';

type Props = {
  /** Tracking `?src=` + GA4. */
  src: string;
  /** Texte d’intro au-dessus du bouton (optionnel). */
  label?: string;
  className?: string;
};

/** CTA visio dans les articles MDX — `CtaVisio` + libellé charte. */
export function BlogCtaVisio({ src, label, className = '' }: Props) {
  return (
    <div
      className={`my-8 flex flex-col gap-4 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      {label ? <p className="text-sm font-medium text-slate-800">{label}</p> : null}
      <CtaVisio src={src} className="shrink-0" />
    </div>
  );
}
