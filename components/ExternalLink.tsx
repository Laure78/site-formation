/**
 * Lien externe optimisé SEO — target="_blank" rel="noopener noreferrer"
 * Optionnel : rel="nofollow" pour liens sponsorisés ou non éditoriaux
 */

import { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  href: string;
  children: ReactNode;
  /** rel="nofollow" pour liens sponsorisés, partenariats payants, UGC */
  noFollow?: boolean;
  /** Texte alternatif pour accessibilité (évite "lien externe" générique) */
  title?: string;
}

/** Composant ExternalLinkAnchor pour éviter conflit avec icône Lucide ExternalLink */
export function ExternalLinkAnchor({
  href,
  children,
  noFollow = false,
  title,
  className,
  ...rest
}: ExternalLinkProps) {
  const rel = ['noopener', 'noreferrer', noFollow ? 'nofollow' : null].filter(Boolean).join(' ');
  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      title={title}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
