import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OFC_TYPE_H2, OFC_TYPE_LEAD } from '@/lib/ofc-interaction-classes';

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleId?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
};

/** En-tête de section : eyebrow + titre + description courte. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleId,
  titleAs: TitleTag = 'h2',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={cn('max-w-3xl', alignClass, className)}>
      {eyebrow ? <Eyebrow className={align === 'center' ? 'justify-center' : undefined}>{eyebrow}</Eyebrow> : null}
      <TitleTag
        id={titleId}
        className={cn(OFC_TYPE_H2, eyebrow ? 'mt-4' : undefined)}
      >
        {title}
      </TitleTag>
      {description ? (
        <p className={cn(OFC_TYPE_LEAD, 'mt-4 text-ofc-ink-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
