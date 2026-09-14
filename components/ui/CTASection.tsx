import Link from 'next/link';
import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AccueilPrendreRdvLink } from '@/components/landing/accueil/AccueilPrendreRdvLink';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type CTASectionProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  titleId?: string;
  origin?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

/** Bloc CTA final premium — respiration importante. */
export function CTASection({
  eyebrow = 'Formation IA BTP',
  title,
  description,
  titleId = 'cta-section-title',
  origin = 'cta-section',
  secondaryHref = LINKS.formations,
  secondaryLabel = 'Découvrir les formations',
  className,
}: CTASectionProps) {
  return (
    <section className={cn('px-4 py-16 md:py-24 lg:py-28', className)} aria-labelledby={titleId}>
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-ofc-accent px-6 py-14 text-center text-white sm:px-10 md:px-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 80% 0%, rgba(255,255,255,0.25), transparent 55%)',
          }}
          aria-hidden
        />
        <div className="relative">
          <Eyebrow className="justify-center text-white/75">{eyebrow}</Eyebrow>
          <h2 id={titleId} className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              {description}
            </p>
          ) : null}
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <AccueilPrendreRdvLink
              origin={origin}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95 sm:w-auto`}
            >
              {CTA_RDV_LABEL}
            </AccueilPrendreRdvLink>
            <Link
              href={secondaryHref}
              className={`${OFC_CTA_SECONDARY} min-h-11 w-full border-white/40 bg-transparent px-6 py-3 text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto`}
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
