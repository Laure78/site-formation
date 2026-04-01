import type { AnchorHTMLAttributes } from 'react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

type RdvLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel'
>;

/** Lien vers la prise de RDV Calendly (nouvel onglet). */
export function RdvLink({ className, children, ...rest }: RdvLinkProps) {
  return (
    <a
      href={CALENDLY_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
