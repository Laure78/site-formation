import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Badge / pilule premium (hero, documents, labels). */
export function Badge({ children, className }: BadgeProps) {
  return <span className={cn('ofc-badge', className)}>{children}</span>;
}
