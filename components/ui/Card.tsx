import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { OFC_CARD, OFC_CARD_ARROW } from '@/lib/ofc-interaction-classes';

type CardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  title?: string;
  'aria-label'?: string;
};

/**
 * Carte premium cliquable (lien) ou statique.
 * Hover : translateY + ombre + bordure — géré par `.ofc-card`.
 */
export function Card({ children, className, href, title, 'aria-label': ariaLabel }: CardProps) {
  const classes = cn(OFC_CARD, 'block h-full', className);

  if (href) {
    return (
      <Link href={href} className={classes} title={title} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

export function CardArrow({ className }: { className?: string }) {
  return (
    <span className={cn(OFC_CARD_ARROW, 'inline-block', className)} aria-hidden>
      →
    </span>
  );
}
