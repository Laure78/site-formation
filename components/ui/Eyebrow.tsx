import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span';
};

/** Surtitre discret — tracking large, uppercase. */
export function Eyebrow({ children, className, as: Tag = 'p' }: EyebrowProps) {
  return <Tag className={cn('ofc-eyebrow', className)}>{children}</Tag>;
}
