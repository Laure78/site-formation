import {
  Children,
  createElement,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

type RevealTag =
  | 'div'
  | 'section'
  | 'article'
  | 'li'
  | 'ul'
  | 'ol'
  | 'span'
  | 'aside'
  | 'header'
  | 'footer'
  | 'figure';

export type RevealShellProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  delay?: number;
  distance?: number;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>;

export type RevealGroupShellProps = {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
  distance?: number;
  as?: RevealTag;
  itemAs?: RevealTag;
};

/**
 * Enveloppe serveur pour animations scroll — sans `"use client"`.
 * Nécessite `<RevealScrollObserver />` une seule fois sur la page.
 */
export function RevealShell({
  children,
  className = '',
  as = 'div',
  delay = 0,
  distance = 8,
  style,
  ...rest
}: RevealShellProps) {
  const mergedStyle = {
    ...style,
    '--reveal-delay': `${delay}ms`,
    '--reveal-distance': `${distance}px`,
  } as CSSProperties;

  return createElement(
    as,
    {
      'data-reveal': true,
      'data-reveal-state': 'pending',
      className: className.trim() || undefined,
      style: mergedStyle,
      ...rest,
    },
    children,
  );
}

/** Stagger CSS via `--reveal-delay` sur chaque enfant direct. */
export function RevealGroupShell({
  children,
  className = '',
  staggerMs = 60,
  distance = 8,
  as = 'div',
  itemAs,
}: RevealGroupShellProps) {
  const items = Children.toArray(children).filter(Boolean);
  const childAs = itemAs ?? as;

  return createElement(
    as,
    { className: className.trim() || undefined, 'data-reveal-group': true },
    items.map((child, index) => {
      const key = isValidElement(child) && child.key != null ? String(child.key) : index;
      return (
        <RevealShell key={key} as={childAs} delay={index * staggerMs} distance={distance}>
          {child}
        </RevealShell>
      );
    }),
  );
}
