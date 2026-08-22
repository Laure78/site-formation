'use client';

import { Calendar } from 'lucide-react';
import { CtaButton, type CtaButtonProps } from '@/components/CtaButton';

type Props = Omit<CtaButtonProps, 'origin'>;

/** CTA « Visio découverte gratuite » — vers `/prendre-rendez-vous`. */
export function VisioDecouverteCalendlyLink({ className = '', ...rest }: Props) {
  return (
    <div
      className={`inline-flex rounded-lg bg-[#377CF3] p-[3px] shadow-[0_4px_14px_rgba(55,124,243,0.35)] ${className}`}
    >
      <CtaButton
        origin="visio-decouverte-link"
        className="gap-2 border-2 border-white font-bold"
        {...rest}
      >
        <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        Réservez votre visio découverte gratuite
      </CtaButton>
    </div>
  );
}
