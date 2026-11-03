import type { ReactNode } from 'react';
import { RevealShell } from '@/components/motion/RevealShell';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

type AccueilMaquetteSectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  'aria-labelledby'?: string;
  tone?: 'white' | 'muted' | 'canvas';
};

/** Section accueil — rythme compact maquette (sans mesh / filets). */
export function AccueilMaquetteSection({
  children,
  className,
  innerClassName,
  id,
  'aria-labelledby': ariaLabelledBy,
  tone = 'white',
}: AccueilMaquetteSectionProps) {
  return (
    <Section
      id={id}
      aria-labelledby={ariaLabelledBy}
      tone={tone}
      size="compact"
      className={cn('ofc-section--divide-0 ofc-section--mesh-0 accueil-maquette__section', className)}
      innerClassName={cn('accueil-maquette__inner px-4 sm:px-6 lg:px-8', innerClassName)}
    >
      {children}
    </Section>
  );
}

type AccueilMaquetteHeadingProps = {
  id: string;
  title: string;
  description?: string;
};

export function AccueilMaquetteHeading({ id, title, description }: AccueilMaquetteHeadingProps) {
  return (
    <RevealShell
      as="header"
      className="mx-auto max-w-2xl text-center"
      distance={ACCUEIL_MOTION_REVEAL.distance}
    >
      <h2 id={id} className={`${OFC_TYPE_H2} text-xl font-extrabold text-[#101936] md:text-2xl`}>
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted md:text-[0.9375rem]">
          {description}
        </p>
      ) : null}
    </RevealShell>
  );
}
