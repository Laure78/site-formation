'use client';

import Link from 'next/link';
import { Check, Copy } from 'lucide-react';
import { useCallback, useId, useRef, useState } from 'react';
import {
  PROMO_BANNER_BG,
  PROMO_BANNER_INFORMATIONAL,
  PROMO_OFFRE_FORMATIONS_2027,
  promoDisplayFields,
  resolvePromoBannerVisibility,
  resolvePromoCtaHref,
} from '@/lib/promo-offre-formations-2027';

type CopyState = 'idle' | 'copied' | 'failed';

const CTA_CLASS =
  'promo-offre-2027__cta inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#1a3561] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none';

/**
 * Bandeau formations 2027 — au-dessus du header.
 * Informatif par défaut ; mode promotionnel si l’offre est complète, activée et dans sa fenêtre.
 */
export function PromoOffreFormations2027Banner() {
  const config = PROMO_OFFRE_FORMATIONS_2027;
  const titleId = useId();
  const liveRegionId = useId();
  const codeRef = useRef<HTMLElement>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const visibility = resolvePromoBannerVisibility({ config, dismissed: false });

  const copyCode = useCallback(async () => {
    const code = config.promoCode.trim();
    if (!code) {
      setCopyState('failed');
      codeRef.current?.focus();
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('failed');
      const el = codeRef.current;
      if (el && typeof window.getSelection === 'function') {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [config.promoCode]);

  if (visibility.mode === 'hidden') return null;

  const isPromo = visibility.mode === 'promo-live';
  const display = isPromo ? promoDisplayFields(config, false) : null;
  const ctaHref = isPromo ? resolvePromoCtaHref(config) : PROMO_BANNER_INFORMATIONAL.ctaHref;
  const ctaLabel = isPromo ? 'Je choisis ma formation' : PROMO_BANNER_INFORMATIONAL.ctaLabel;
  const infoTitle = PROMO_BANNER_INFORMATIONAL.title.trim();
  const title = isPromo ? 'Offre du moment' : infoTitle;
  const showBannerTitle = Boolean(title);
  const hasRealCode = isPromo && Boolean(config.promoCode.trim());

  return (
    <div
      className="promo-offre-2027 border-b border-white/10 text-white"
      style={{ backgroundColor: PROMO_BANNER_BG }}
      data-promo-offer={config.offerId}
      data-promo-mode={visibility.mode}
      role="region"
      aria-labelledby={titleId}
    >
      <div className="promo-offre-2027__inner mx-auto flex max-w-[80rem] flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0 md:min-h-[5rem] lg:gap-6 lg:px-8">
        <div className="flex min-w-0 flex-col gap-2 md:flex-1 md:flex-row md:items-center md:gap-5 lg:gap-6">
          {showBannerTitle ? (
            <p
              id={titleId}
              className="shrink-0 font-display text-base font-bold tracking-tight text-white sm:text-lg"
            >
              {title}
            </p>
          ) : null}

          {showBannerTitle ? (
            <span
              className="promo-offre-2027__separator hidden h-10 w-px shrink-0 bg-white/85 md:block"
              aria-hidden
            />
          ) : null}

          <p
            id={showBannerTitle ? undefined : titleId}
            className="min-w-0 text-sm leading-snug text-white sm:text-[0.9375rem] md:flex-1 lg:text-base"
          >
            {isPromo && display ? (
              display.message
            ) : (
              <>
                {PROMO_BANNER_INFORMATIONAL.messageSegments.map((segment, index) =>
                  segment.emphasis ? (
                    <strong key={index} className="font-bold">
                      {segment.text}
                    </strong>
                  ) : (
                    <span key={index}>{segment.text}</span>
                  ),
                )}
              </>
            )}
          </p>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3 md:shrink-0">
          {isPromo && display ? (
            <div className="flex min-w-0 items-center gap-1.5">
              <code
                ref={codeRef}
                tabIndex={hasRealCode || copyState === 'failed' ? 0 : -1}
                className="inline-flex max-w-full select-all items-center rounded-sm bg-white px-2.5 py-1.5 font-mono text-sm font-bold tracking-wide text-[#1a3561]"
                aria-label={`Code promotionnel ${display.promoCode}`}
              >
                {display.promoCode}
              </code>
              <button
                type="button"
                onClick={copyCode}
                disabled={!hasRealCode}
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  copyState === 'copied' ? 'Code copié' : 'Copier le code promotionnel'
                }
              >
                {copyState === 'copied' ? (
                  <Check className="h-4 w-4" aria-hidden strokeWidth={2.25} />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden strokeWidth={2.25} />
                )}
              </button>
            </div>
          ) : null}

          <Link href={ctaHref} className={CTA_CLASS}>
            {ctaLabel}
          </Link>
        </div>
      </div>

      <p id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="true">
        {copyState === 'copied'
          ? 'Code promotionnel copié dans le presse-papiers.'
          : copyState === 'failed'
            ? 'Impossible de copier automatiquement. Le code reste sélectionnable.'
            : ''}
      </p>
    </div>
  );
}
