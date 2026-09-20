import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Conteneur section formation — largeur max ~1150px, rythme OFC. */
export function TrainingSection({
  id,
  title,
  titleId,
  description,
  children,
  tone = 'white',
  className,
}: {
  id?: string;
  title?: string;
  titleId?: string;
  description?: ReactNode;
  children: ReactNode;
  tone?: 'white' | 'muted';
  className?: string;
}) {
  const headingId = titleId ?? (id ? `${id}-title` : undefined);
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 border-b border-slate-200 px-4 py-12 md:py-16',
        tone === 'muted' ? 'bg-slate-50' : 'bg-white',
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-[70rem]">
        {title ? (
          <h2 id={headingId} className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem]">
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
