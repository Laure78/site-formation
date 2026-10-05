'use client';

import { useEffect, useRef, useState } from 'react';
import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import {
  getTrustindexLoaderSrc,
  getTrustindexWidgetId,
} from '@/lib/google-reviews-widget';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ExternalLink } from 'lucide-react';

type GoogleReviewsEmbedProps = {
  /** Avis Places API (optionnel) — non utilisé si le widget Trustindex est configuré. */
  reviews?: GoogleReviewEntry[];
  googleUrl?: string;
};

const SCRIPT_ATTR = 'data-ofc-trustindex-widget';

/**
 * Embed avis Google — priorité au widget Trustindex gratuit (pas de clé API Google).
 * Chargement différé (IntersectionObserver) pour limiter l’impact Core Web Vitals.
 * Fallback : grille Places API si disponible, sinon lien vers la fiche Google.
 */
export function GoogleReviewsEmbed({
  reviews = [],
  googleUrl = SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
}: GoogleReviewsEmbedProps) {
  const widgetId = getTrustindexWidgetId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !widgetId) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [widgetId]);

  useEffect(() => {
    if (!widgetId || !inView) return;
    const host = containerRef.current;
    if (!host) return;

    const existing = host.querySelector(`script[${SCRIPT_ATTR}="${widgetId}"]`);
    if (existing) return;

    const script = document.createElement('script');
    script.src = getTrustindexLoaderSrc(widgetId);
    script.async = true;
    script.defer = true;
    script.setAttribute(SCRIPT_ATTR, widgetId);
    script.onerror = () => setScriptError(true);
    host.appendChild(script);

    return () => {
      script.remove();
    };
  }, [widgetId, inView]);

  if (widgetId) {
    return (
      <div
        ref={containerRef}
        className="min-h-[360px] w-full overflow-hidden md:min-h-[420px]"
        aria-label="Avis Google Business Profile"
      >
        {scriptError ? (
          <div
            className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
            role="alert"
          >
            <p className="max-w-xl text-slate-700">
              Le widget d&apos;avis Google n&apos;a pas pu se charger. Consultez les avis directement
              sur Google.
            </p>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir tous les avis Google (ouvre un nouvel onglet)"
              className={`${OFC_CTA_SECONDARY} mt-6 inline-flex items-center gap-2`}
            >
              Voir tous les avis Google
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        ) : null}
      </div>
    );
  }

  if (reviews.length > 0) {
    return (
      <div className="min-h-[320px] md:min-h-[360px]">
        <GoogleReviewsGrid reviews={reviews} hideEmptyFallback />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:min-h-[280px] md:p-12"
      role="status"
    >
      <p className="max-w-xl text-slate-700">
        Les avis Google s&apos;afficheront ici dès que le widget gratuit sera configuré. En
        attendant, vous pouvez les consulter directement sur Google.
      </p>
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Voir tous les avis Google (ouvre un nouvel onglet)"
        className={`${OFC_CTA_SECONDARY} mt-6 inline-flex items-center gap-2`}
      >
        Voir tous les avis Google
        <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
