import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type AccueilMaquettePillProps = {
  children: ReactNode;
  variant?: 'neutral' | 'accent' | 'violet';
  className?: string;
};

/** Pastille maquette accueil — niveaux, Avant / Avec l’IA. */
export function AccueilMaquettePill({
  children,
  variant = 'neutral',
  className,
}: AccueilMaquettePillProps) {
  return (
    <span
      className={cn(
        'inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-none',
        variant === 'accent'
          ? 'bg-[#EAF3FF] text-[#0755E8]'
          : variant === 'violet'
            ? 'bg-[#EDE9FE] text-[#6D28D9] uppercase tracking-wide'
            : 'bg-[#E8E8E8] text-[#101936]/75',
        className,
      )}
    >
      {children}
    </span>
  );
}
