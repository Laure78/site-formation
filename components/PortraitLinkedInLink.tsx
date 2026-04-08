import type { ReactNode } from 'react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { SITE_CONFIG } from '@/lib/seo';

/**
 * Enveloppe les photos portrait de Laure Olivié avec un lien vers le profil LinkedIn (GEO / cohérence NAP).
 */
export function PortraitLinkedInLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ExternalLinkAnchor
      href={SITE_CONFIG.linkedinProfileUrl}
      title="Profil LinkedIn — Laure Olivié"
      aria-label="Ouvrir le profil LinkedIn de Laure Olivié"
      className={
        className ??
        'block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
      }
    >
      {children}
    </ExternalLinkAnchor>
  );
}
