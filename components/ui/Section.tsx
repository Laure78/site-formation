import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  OFC_SEC,
  OFC_SECTION_INNER,
  ofcSectionClasses,
  type OfcSectionSize,
  type OfcSectionTone,
} from '@/lib/ofc-section-classes';

const TONE_TO_SEC: Record<OfcSectionTone | 'canvas' | 'hero', string> = {
  white: OFC_SEC.white,
  muted: OFC_SEC.muted,
  soft: OFC_SEC.soft,
  accent: OFC_SEC.accent,
  canvas: OFC_SEC.muted,
  hero: OFC_SEC.hero,
};

function toneForClasses(tone: keyof typeof TONE_TO_SEC): OfcSectionTone {
  if (tone === 'canvas') return 'muted';
  if (tone === 'hero') return 'muted';
  return tone;
}

function resolveSectionClassName(
  tone: keyof typeof TONE_TO_SEC,
  size: OfcSectionSize = 'default',
): string {
  if (tone === 'hero' && size === 'default') {
    return TONE_TO_SEC.hero;
  }
  if (size === 'default') {
    return TONE_TO_SEC[tone];
  }
  return ofcSectionClasses({
    tone: toneForClasses(tone),
    size,
    mesh: tone === 'hero',
    divide: tone === 'hero',
    heroBg: tone === 'hero',
  });
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: keyof typeof TONE_TO_SEC;
  /** Rythme vertical — `compact` pour bandes de confiance, etc. */
  size?: OfcSectionSize;
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
  size = 'default',
  id,
  'aria-labelledby': ariaLabelledBy,
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(resolveSectionClassName(tone, size), className)}
    >
      {bare ? (
        children
      ) : (
        <div className={cn(OFC_SECTION_INNER, innerClassName)}>{children}</div>
      )}
    </section>
  );
}
