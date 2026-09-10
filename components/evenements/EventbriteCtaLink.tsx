'use client';

import { trackEventbriteClick } from '@/lib/ga4-analytics';
import { EVENEMENT_AO_BTP } from '@/lib/evenements/repondre-appel-offres-btp-5-etapes';

type EventbriteCtaLinkProps = {
  origin: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Lien billetterie Eventbrite — GA4 `eventbrite_click` (clic ≠ inscription confirmée).
 */
export function EventbriteCtaLink({ origin, className, children }: EventbriteCtaLinkProps) {
  return (
    <a
      href={EVENEMENT_AO_BTP.eventbriteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-eventbrite-origin={origin}
      onClick={() => {
        trackEventbriteClick(origin, EVENEMENT_AO_BTP.slug);
      }}
    >
      {children ?? EVENEMENT_AO_BTP.ctaPrimary}
    </a>
  );
}
