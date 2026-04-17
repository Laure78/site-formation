'use client';

import { useEffect, useRef } from 'react';
import { CALENDLY_EMBED_URL } from '@/lib/calendly';

const HEIGHT_PX = 680;

/**
 * Widget Calendly inline (équivalent shortcode [calendly-inline] WordPress).
 * Initialisation explicite : le script peut être chargé avant le montage React.
 */
export function CalendlyInlineWidget({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const init = () => {
      if (!window.Calendly?.initInlineWidget) return;
      parent.innerHTML = '';
      window.Calendly.initInlineWidget({ url: CALENDLY_EMBED_URL, parentElement: parent });
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
  }, []);

  return (
    <div
      ref={ref}
      className={`calendly-inline-widget w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
      style={{ minWidth: 320, height: HEIGHT_PX, width: '100%' }}
    />
  );
}
