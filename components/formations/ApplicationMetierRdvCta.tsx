'use client';

import { CtaVisio } from '@/components/CtaVisio';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  /** @deprecated Libellé fixe — conservé pour compatibilité des appels. */
  label?: string;
  origin: string;
  /** Texte stocké pour préremplir le parcours RDV (sans PII). */
  formationHint: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

/** CTA visio fiche applications métier — hint formation pour `/prendre-rdv`. */
export function ApplicationMetierRdvCta({
  origin,
  formationHint,
  variant = 'primary',
  className = '',
}: Props) {
  const style = variant === 'primary' ? OFC_CTA_PRIMARY : OFC_CTA_SECONDARY;

  return (
    <CtaVisio
      src={origin}
      data-cta="rdv"
      variant={variant}
      className={[style, 'inline-flex min-h-12 items-center justify-center px-6', className]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        try {
          sessionStorage.setItem('rdv_formation_hint', formationHint);
          if (formationHint.toLowerCase().includes('application')) {
            sessionStorage.setItem('rdv_besoin_preselect', 'outils-sur-mesure');
          }
        } catch {
          /* ignore */
        }
      }}
    />
  );
}
