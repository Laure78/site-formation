import type { AnchorHTMLAttributes } from 'react';
import { Calendar } from 'lucide-react';
import { CTACalendly } from '@/components/CTACalendly';

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
        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[var(--accent)] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2d6ab8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        {...rest}
      >
        <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        Réservez votre visio découverte gratuite
      </CTACalendly>
    </div>
  );
}
