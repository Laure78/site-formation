'use client';

import type { MouseEvent, ReactNode } from 'react';

type InPageAnchorProps = {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToInPageHash(hash: string): boolean {
  const id = hash.replace(/^#/, '');
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  return true;
}

/** Lien d’ancrage same-page — scroll fiable (Next.js `Link` + `#` est peu fiable). */
export function InPageAnchor({ href, className, children }: InPageAnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollToInPageHash(href)) {
      event.preventDefault();
      window.history.pushState(null, '', href);
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
