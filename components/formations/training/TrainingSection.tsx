import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Conteneur section formation — largeur max ~1248 px, rythme OFC. */
export function TrainingSection({
  id,
  title,
  titleId,
  description,
  children,
  tone = 'white',
  className,
  /** Marge scroll pour header + nav sticky. */
  scrollMargin = 'nav',
}: {
  id?: string;
  title?: string;
  titleId?: string;
  description?: ReactNode;
  children: ReactNode;
  tone?: 'white' | 'muted';
  className?: string;
  scrollMargin?: 'header' | 'nav' | 'none';
}) {
  const headingId = titleId ?? (id ? `${id}-title` : undefined);
  const scrollClass =
    scrollMargin === 'nav'
      ? 'scroll-mt-[calc(var(--site-header-height)+3.25rem)]'
      : scrollMargin === 'header'
        ? 'scroll-mt-24'
        : undefined;

  return (
    <section
      id={id}
      className={cn(
        'border-b border-slate-200 px-4 py-12 md:py-16',
        scrollClass,
        tone === 'muted' ? 'bg-slate-50' : 'bg-white',
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-[78rem]">
        {title ? (
          <h2
            id={headingId}
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem]"
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <div className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{description}</div>
        ) : null}
        <div className={title || description ? 'mt-8' : undefined}>{children}</div>
      </div>
    </section>
  );
}
