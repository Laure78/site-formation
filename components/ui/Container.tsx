import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Largeur max élargie (proche du header). */
  wide?: boolean;
};

/** Conteneur site — max-width 1280px, paddings horizontaux cohérents. */
export function Container({
  children,
  className,
  as: Tag = 'div',
  wide = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'ofc-container',
        wide && 'max-w-[90rem]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
