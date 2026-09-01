'use client';

import { useEffect, useState } from 'react';
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  readCookieConsent,
  type CookieConsentValue,
} from '@/lib/cookie-consent';

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
