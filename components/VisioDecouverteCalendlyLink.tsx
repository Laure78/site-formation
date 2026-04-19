import type { AnchorHTMLAttributes } from 'react';
import { Calendar } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

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
      <a
        href={CALENDLY_BOOKING_URL}
        data-calendly
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        {...rest}
      >
        <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        Visio découverte gratuite
      </a>
    </div>
  );
}
