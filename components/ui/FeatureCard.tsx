import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardArrow } from '@/components/ui/Card';
import { OFC_CARD_ARROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type FeatureCardProps = {
  href: string;
  title: string;
  description?: string;
  points?: readonly string[];
  icon?: LucideIcon;
  ctaLabel?: string;
  className?: string;
};

/** Carte module / domaine métier — style « application SaaS ». */
export function FeatureCard({
  href,
  title,
  description,
  points,
  icon: Icon,
  ctaLabel = 'Voir la formation adaptée',
  className,
}: FeatureCardProps) {
  return (
    <Card href={href} className={`group flex flex-col p-6 sm:p-7 md:p-8 ${className ?? ''}`}>
      {Icon ? (
        <span
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ofc-accent-soft text-ofc-accent"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      ) : null}
      <h3 className={`${OFC_TYPE_H3} group-hover:text-ofc-accent`}>{title}</h3>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted md:text-base">{description}</p>
      ) : null}
      {points?.length ? (
        <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-ofc-ink-muted">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ofc-accent" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ofc-accent">
        {ctaLabel}
        <ArrowRight className={`${OFC_CARD_ARROW} h-4 w-4`} aria-hidden />
      </span>
    </Card>
  );
}

type SimpleFeatureCardProps = {
  href: string;
  title: string;
  phrase: string;
  tags?: readonly string[];
  icon?: LucideIcon;
  ariaLabel?: string;
  children?: ReactNode;
};

/** Carte cas d’usage compacte (grille fonctionnalités). */
export function SimpleFeatureCard({
  href,
  title,
  phrase,
  tags,
  icon: Icon,
  ariaLabel,
}: SimpleFeatureCardProps) {
  return (
    <Card href={href} aria-label={ariaLabel} className="group flex min-h-[11.5rem] flex-col gap-3 p-6 sm:p-7">
      {Icon ? (
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ofc-accent-soft text-ofc-accent"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      ) : null}
      <h3 className="font-display text-base font-bold leading-snug text-ofc-ink md:text-lg">{title}</h3>
      <p className="text-sm leading-relaxed text-ofc-ink-muted">{phrase}</p>
      {tags?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-ofc-border bg-[#F8FAFC] px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-ofc-ink-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <span className="mt-auto flex items-center justify-between gap-2 pt-1 text-sm font-semibold text-ofc-accent">
        Découvrir
        <CardArrow />
      </span>
    </Card>
  );
}
