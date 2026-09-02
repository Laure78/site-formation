'use client';

import { CtaRdv, type CtaRdvProps } from '@/components/CtaRdv';

type Props = Omit<CtaRdvProps, 'origin'> & {
  origin?: string;
};

/** CTA « Visio découverte gratuite » — vers `/prendre-rendez-vous`. */
export function VisioDecouverteCalendlyLink({
  className = '',
  origin = 'visio-decouverte-link',
  ...rest
}: Props) {
  return (
    <div
      className={`inline-flex rounded-lg bg-[#377CF3] p-[3px] shadow-[0_4px_14px_rgba(55,124,243,0.35)] ${className}`}
    >
      <CtaRdv
        origin={origin}
        variant="primary"
        className="gap-2 border-2 border-white font-bold"
        {...rest}
      />
    </div>
  );
}
