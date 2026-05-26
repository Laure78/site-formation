'use client';

import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { CALENDLY_EMBED_URL } from '@/lib/calendly';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

/**
 * Widget Calendly inline — délègue à {@link CalendlyEmbed} type="inline".
 */
export function CalendlyInlineWidget({
  className = '',
  url = CALENDLY_EMBED_URL,
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
}: {
  className?: string;
  url?: string;
  heightPx?: number;
}) {
  return (
    <CalendlyEmbed
      type="inline"
      url={url}
      heightPx={heightPx}
      className={className}
      ctaPosition="inline"
      campaign="inline-widget"
    />
  );
}
