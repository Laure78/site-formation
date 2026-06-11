import type { AnchorHTMLAttributes } from 'react';
import { Calendar } from 'lucide-react';
import { CTACalendly } from '@/components/CTACalendly';
import { OFC_CTA_PRIMARY_PILL } from '@/lib/ofc-interaction-classes';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'children'>;

/**
 * CTA « Visio découverte gratuite » — lien Calendly (appel découverte formation).
 * @see https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation
 */
export function VisioDecouverteCalendlyLink({ className = '', ...rest }: Props) {
  return (
    <div
      className={`inline-flex rounded-full bg-[var(--accent)] p-[3px] shadow-[0_4px_14px_rgba(55,124,243,0.35)] ${className}`}
    >
      <CTACalendly
        ctaPosition="hero"
        ctaId="visio-decouverte-link"
        utmSource="site"
        utmMedium="cta"
        utmCampaign="visio-decouverte"
        className={`${OFC_CTA_PRIMARY_PILL} gap-2 border-2 border-white font-bold`}
        {...rest}
      >
        <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        Réservez votre visio découverte gratuite
      </CTACalendly>
    </div>
  );
}
