'use client';

import type { AnchorHTMLAttributes } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { buildCalendlyUrlWithUtm } from '@/lib/calendly';

type CtaPosition = 'hero' | 'middle' | 'footer' | 'inline' | 'unknown';

type CTACalendlyProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  page?: string;
  ctaPosition?: CtaPosition;
  ctaId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  unstyled?: boolean;
};

/**
 * Lien Calendly unifié avec tracking GA4/GTM.
 * Événement: `calendly_click`
 */
export function CTACalendly({
  page,
  ctaPosition = 'unknown',
  ctaId,
  utmSource,
  utmMedium = 'cta',
  utmCampaign,
  unstyled = true,
  onClick,
  children,
  className,
  ...rest
}: CTACalendlyProps) {
  const href = buildCalendlyUrlWithUtm({
    utmSource:
      utmSource ?? ((page || 'site').replaceAll('/', '-').replace(/^-+|-+$/g, '') || 'site'),
    utmMedium,
    utmCampaign: utmCampaign ?? ctaPosition,
  });

  const trackingClass = `cta-calendly cta-calendly--${ctaPosition}`;
  const buttonClass = unstyled
    ? ''
    : 'inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#2d6ab8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6ab8]';

  const handleClick: NonNullable<AnchorHTMLAttributes<HTMLAnchorElement>['onClick']> = (e) => {
    const location =
      page || (typeof window !== 'undefined' ? window.location.pathname : 'unknown');
    const payload = {
      event: 'calendly_click',
      location,
      cta_position: ctaPosition,
      cta_id: ctaId ?? `calendly-${ctaPosition}`,
    };

    // API GTM Next.js (dataLayer push).
    sendGTMEvent(payload);

    // Fallback GA4 direct si gtag est disponible.
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'calendly_click', {
        location,
        cta_position: ctaPosition,
        cta_id: ctaId ?? `calendly-${ctaPosition}`,
      });
    }

    onClick?.(e);
  };

  return (
    <a
      href={href}
      data-calendly
      data-calendly-tracked="component"
      data-cta-position={ctaPosition}
      data-cta-id={ctaId ?? `calendly-${ctaPosition}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${trackingClass} ${buttonClass} ${className ?? ''}`.trim()}
      {...rest}
    >
      {children}
    </a>
  );
}
