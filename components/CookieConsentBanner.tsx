'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from '@/lib/cookie-consent';
import { LINKS } from '@/lib/internal-links';

export function useCookieConsent(): CookieConsentValue | null {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);

  useEffect(() => {
    setConsent(readCookieConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ value: CookieConsentValue }>).detail;
      setConsent(detail?.value ?? readCookieConsent());
    };
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onChange);
  }, []);

  return consent;
}

/**
 * Bandeau cookies RGPD — requis avant chargement Calendly (widget.js) et scripts marketing.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  const accept = useCallback(() => {
    writeCookieConsent('accepted');
    setVisible(false);
  }, []);

  const refuse = useCallback(() => {
    writeCookieConsent('refused');
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-slate-200 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm md:p-5 md:pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="min-w-0">
          <p id="cookie-consent-title" className="font-display text-base font-semibold text-slate-900">
            Cookies et services tiers
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm leading-snug text-slate-600">
            Nous utilisons des cookies nécessaires au site et, avec votre accord, des services tiers
            (Calendly pour la prise de rendez-vous, mesure d’audience).{' '}
            <Link href={LINKS.politiqueConfidentialite} className="font-medium text-[var(--accent)] hover:underline">
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={refuse}
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 md:flex-none"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="min-h-11 min-w-0 flex-1 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 md:flex-none"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
