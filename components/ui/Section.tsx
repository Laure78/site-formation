import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { OFC_SEC, OFC_SECTION_INNER, type OfcSectionTone } from '@/lib/ofc-section-classes';

const TONE_TO_SEC: Record<OfcSectionTone | 'canvas' | 'hero', string> = {
  white: OFC_SEC.white,
  muted: OFC_SEC.muted,
  soft: OFC_SEC.soft,
  accent: OFC_SEC.accent,
  canvas: OFC_SEC.muted,
  hero: OFC_SEC.hero,
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: keyof typeof TONE_TO_SEC;
  id?: string;
  'aria-labelledby'?: string;
  /** Désactive le conteneur interne (layout full-bleed custom). */
  bare?: boolean;
};

/** Section de page avec rythme vertical et fond tokenisés. */
export function Section({
  children,
  className,
  innerClassName,
  tone = 'white',
  id,
  'aria-labelledby': ariaLabelledBy,
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(TONE_TO_SEC[tone], className)}
    >
      {bare ? (
        children
      ) : (
        <div className={cn(OFC_SECTION_INNER, innerClassName)}>{children}</div>
      )}
    </section>
  );
}
