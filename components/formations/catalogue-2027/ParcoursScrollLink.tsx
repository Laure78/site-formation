'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'onClick'> & {
  anchorId: string;
  children: ReactNode;
};

/** Lien interne — scroll fluide vers une ancre (sans query string). */
export function ParcoursScrollLink({ anchorId, children, className, ...rest }: Props) {
  return (
    <a
      href={`#${anchorId}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToAnchor(anchorId);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
