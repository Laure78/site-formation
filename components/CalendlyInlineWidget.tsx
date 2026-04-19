'use client';

import { useEffect, useRef } from 'react';
import { CALENDLY_EMBED_URL } from '@/lib/calendly';

const DEFAULT_HEIGHT_PX = 680;

/**
 * Widget Calendly inline (équivalent shortcode [calendly-inline] WordPress).
 * Initialisation explicite : le script peut être chargé avant le montage React.
 */
export function CalendlyInlineWidget({
  className = '',
  url = CALENDLY_EMBED_URL,
  heightPx = DEFAULT_HEIGHT_PX,
}: {
  className?: string;
  /** URL d’embed (ex. variante ?hide_gdpr_banner=1). */
  url?: string;
  heightPx?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const init = () => {
      if (!window.Calendly?.initInlineWidget) return;
      parent.innerHTML = '';
      window.Calendly.initInlineWidget({ url, parentElement: parent });
    };

    if (window.Calendly?.initInlineWidget) {
      init();
      return;
    }

    const id = window.setInterval(() => {
      if (window.Calendly?.initInlineWidget) {
        window.clearInterval(id);
        init();
      }
    }, 150);

    return () => window.clearInterval(id);
  }, [url]);

  return (
    <div
      ref={ref}
      className={`calendly-inline-widget w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
      style={{ minWidth: 320, height: heightPx, width: '100%' }}
    />
  );
}
