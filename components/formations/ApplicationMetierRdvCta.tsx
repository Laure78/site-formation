'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  label: string;
  origin: string;
  /** Texte stocké pour préremplir le parcours RDV (sans PII). */
  formationHint: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

/**
 * CTA RDV fiche applications métier — libellé local + hint formation pour `/prendre-rendez-vous`.
 * Ne modifie pas le libellé global de {@link CtaRdv}.
 */
export function ApplicationMetierRdvCta({
  label,
  origin,
  formationHint,
  variant = 'primary',
  className = '',
}: Props) {
  const pathname = usePathname();
  const style = variant === 'primary' ? OFC_CTA_PRIMARY : OFC_CTA_SECONDARY;

  return (
    <Link
      href={LINKS.prendreRdv}
      data-cta="rdv"
      className={[style, 'inline-flex min-h-12 items-center justify-center px-6', className]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        try {
          sessionStorage.setItem('rdv_formation_hint', formationHint);
          // Préselection besoin « outils sur mesure » si arrivée depuis une fiche applications métier
          if (formationHint.toLowerCase().includes('application')) {
            sessionStorage.setItem('rdv_besoin_preselect', 'outils-sur-mesure');
          }
        } catch {
          /* ignore */
        }
        trackCtaRdvClick(
          origin,
          typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown',
        );
      }}
    >
      {label}
    </Link>
  );
}
