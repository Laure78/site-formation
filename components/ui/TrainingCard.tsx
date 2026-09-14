import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { OFC_CTA_PRIMARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type TrainingCardProps = {
  href: string;
  titre: string;
  benefice: string;
  niveau?: string;
  duree: string;
  benefices?: readonly string[];
  featured?: boolean;
  ctaLabel?: string;
  className?: string;
};

/** Carte formation catalogue — niveau, durée, objectif, CTA. */
export function TrainingCard({
  href,
  titre,
  benefice,
  niveau,
  duree,
  benefices,
  featured = false,
  ctaLabel = 'Découvrir la formation',
  className,
}: TrainingCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col p-6 sm:p-7 md:p-8',
        featured && 'border-ofc-accent/35 shadow-ofc-md ring-1 ring-ofc-accent/20',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ofc-accent">
        {niveau ? <span>{niveau}</span> : null}
        {niveau ? (
          <span className="text-ofc-ink-subtle" aria-hidden>
            ·
          </span>
        ) : null}
        <span className="font-medium normal-case tracking-normal text-ofc-ink-subtle">{duree}</span>
        {featured ? (
          <span className="rounded-full bg-ofc-accent-soft px-2.5 py-0.5 text-[0.65rem] font-semibold text-ofc-accent">
            Recommandé
          </span>
        ) : null}
      </div>
      <h3 className={`${OFC_TYPE_H3} mt-4`}>{titre}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ofc-ink-muted md:text-base">{benefice}</p>
      {benefices?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-ofc-ink-muted">
          {benefices.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-ofc-accent" aria-hidden>
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={href}
        className={`${OFC_CTA_PRIMARY} mt-7 inline-flex min-h-11 w-full items-center justify-center px-5 py-3 text-sm sm:w-auto`}
      >
        {ctaLabel}
      </Link>
    </Card>
  );
}
