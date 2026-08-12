'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CALENDLY_BOOKING_URL,
  CALENDLY_SCRIPT_READY_EVENT,
  buildCalendlyUrlWithUtm,
} from '@/lib/calendly';
import { useCookieConsent } from '@/components/CookieConsentBanner';
import { writeCookieConsent } from '@/lib/cookie-consent';
import { CALENDLY_INLINE_DEFAULT_HEIGHT_PX } from '@/lib/calendly-embed-config';

/**
 * Widget Calendly inline via widget.js — uniquement après consentement cookies.
 */
export function CalendlyConsentInline({
  campaign = 'prendre-rendez-vous-page',
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
}: {
  campaign?: string;
  heightPx?: number;
}) {
  const consent = useCookieConsent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.__calendlyReady) {
      setReady(true);
    }
    const onReady = () => setReady(true);
    window.addEventListener(CALENDLY_SCRIPT_READY_EVENT, onReady);
    return () => window.removeEventListener(CALENDLY_SCRIPT_READY_EVENT, onReady);
  }, []);

  useEffect(() => {
    if (consent !== 'accepted' || !ready || !containerRef.current) return;
    if (!window.Calendly?.initInlineWidget) return;

    const el = containerRef.current;
    el.innerHTML = '';
    const url = buildCalendlyUrlWithUtm({
      baseUrl: CALENDLY_BOOKING_URL,
      utmSource: 'site',
      utmMedium: 'cta',
      utmCampaign: campaign,
    });
    window.Calendly.initInlineWidget({
      url,
      parentElement: el,
    });
  }, [consent, ready, campaign]);

  if (!mounted) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500"
        style={{ minHeight: heightPx }}
      >
        Chargement de l’agenda…
      </div>
    );
  }

  if (consent !== 'accepted') {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-slate-700">
          Pour afficher l’agenda Calendly, acceptez les cookies et services tiers via le bandeau en bas
          de page.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => writeCookieConsent('accepted')}
            className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Accepter et afficher l’agenda
          </button>
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Ouvrir Calendly dans un nouvel onglet
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      style={{ minWidth: 320, height: heightPx }}
      data-calendly
      data-cta-position="inline"
    />
  );
}
