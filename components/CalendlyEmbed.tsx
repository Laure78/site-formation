'use client';

import { useCallback, type MouseEventHandler, type ReactNode } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import {
  CALENDLY_EMBED_URL,
  buildCalendlyInlineIframeUrl,
  buildCalendlyUrlWithUtm,
} from '@/lib/calendly';
import {
  CALENDLY_BUTTON_VARIANT_CLASS,
  CALENDLY_DEFAULT_BUTTON_TEXT,
  CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  type CalendlyEmbedVariant,
} from '@/lib/calendly-embed-config';

export type CalendlyEmbedType = 'popup' | 'inline' | 'link';

type CtaPosition = 'hero' | 'middle' | 'footer' | 'inline' | 'floating' | 'unknown';

export type CalendlyEmbedProps = {
  /** URL Calendly — défaut : événement appel découverte OFC. */
  url?: string;
  type?: CalendlyEmbedType;
  /** Libellé bouton si pas d’enfants React. */
  buttonText?: string;
  /** utm_campaign */
  campaign?: string;
  ctaPosition?: CtaPosition;
  ctaId?: string;
  utmSource?: string;
  utmMedium?: string;
  className?: string;
  variant?: CalendlyEmbedVariant;
  heightPx?: number;
  /** En-tête section (mode inline). */
  sectionTitle?: string;
  sectionSubtitle?: string;
  /** Mode link : ouverture nouvel onglet (fallback popup). */
  preferNewTab?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Attributs data-* analytics hérités de CTACalendly. */
  'data-calendly-tracked'?: string;
  id?: string;
  title?: string;
  disabled?: boolean;
  'aria-label'?: string;
};

function trackCalendlyClick(location: string, ctaPosition: string, ctaId: string) {
  const payload = {
    event: 'calendly_click',
    location,
    cta_position: ctaPosition,
    cta_id: ctaId,
  };
  sendGTMEvent(payload);
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'calendly_click', {
      location,
      cta_position: ctaPosition,
      cta_id: ctaId,
    });
  }
}

function tryOpenPopup(url: string): boolean {
  if (typeof window === 'undefined') return false;
  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url });
    return true;
  }
  return false;
}

/** Ouvre Calendly en popup si le widget est prêt, sinon nouvel onglet (même geste utilisateur). */
function openCalendlyPopup(url: string): boolean {
  if (tryOpenPopup(url)) return true;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  return opened !== null;
}

function resolveCalendlyUrl({
  url,
  utmSource = 'site',
  utmMedium = 'cta',
  campaign,
  ctaPosition = 'unknown',
}: Pick<CalendlyEmbedProps, 'url' | 'utmSource' | 'utmMedium' | 'campaign' | 'ctaPosition'>) {
  const base = url ?? CALENDLY_EMBED_URL;
  return buildCalendlyUrlWithUtm({
    baseUrl: base,
    utmSource,
    utmMedium,
    utmCampaign: campaign ?? (ctaPosition === 'unknown' ? 'cta-unspecified' : ctaPosition),
  });
}

function CalendlyInlineBody({
  url,
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  className = '',
}: {
  url: string;
  heightPx?: number;
  className?: string;
}) {
  const iframeSrc = buildCalendlyInlineIframeUrl(url);

  return (
    <div
      data-calendly
      data-cta-position="inline"
      className={`w-full max-w-full ${className}`}
      style={{ minWidth: 320, width: '100%', maxWidth: 600, margin: '0 auto' }}
    >
      <div
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{ height: heightPx }}
      >
        <iframe
          src={iframeSrc}
          title="Réserver un créneau Calendly — formation IA BTP"
          className="h-full w-full border-0"
        />
      </div>
      <p className="mt-3 text-center text-sm text-slate-600">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ofc-link font-semibold"
        >
          Ouvrir l&apos;agenda dans un nouvel onglet
        </a>
      </p>
    </div>
  );
}

/**
 * Widget Calendly unifié — popup natif, inline iframe ou lien (fallback).
 * Source unique pour toutes les pages de conversion du site.
 */
export function CalendlyEmbed({
  url,
  type = 'popup',
  buttonText = CALENDLY_DEFAULT_BUTTON_TEXT,
  campaign,
  ctaPosition = 'unknown',
  ctaId,
  utmSource = 'site',
  utmMedium = 'cta',
  className = '',
  variant = 'primary',
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  sectionTitle,
  sectionSubtitle,
  preferNewTab = false,
  children,
  onClick,
  id,
  title,
  disabled,
  'aria-label': ariaLabel,
}: CalendlyEmbedProps) {
  const resolvedUrl = resolveCalendlyUrl({ url, utmSource, utmMedium, campaign, ctaPosition });
  const resolvedCtaId = ctaId ?? `calendly-${ctaPosition}`;
  const label = children ?? buttonText;

  const handleActivate = useCallback(() => {
    const location =
      typeof window !== 'undefined' ? window.location.pathname : 'unknown';
    trackCalendlyClick(location, ctaPosition, resolvedCtaId);
  }, [ctaPosition, resolvedCtaId]);

  const handlePopupClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    handleActivate();
    onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
    if (preferNewTab) return;
    if (openCalendlyPopup(resolvedUrl)) {
      e.preventDefault();
    }
  };

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    handleActivate();
    onClick?.(e);
  };

  if (type === 'inline') {
    return (
      <div className={className}>
        {sectionTitle ? (
          <h2 className="font-display text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {sectionTitle}
          </h2>
        ) : null}
        {sectionSubtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 md:text-lg">
            {sectionSubtitle}
          </p>
        ) : null}
        <div className={sectionTitle || sectionSubtitle ? 'mt-8' : undefined}>
          <CalendlyInlineBody url={resolvedUrl} heightPx={heightPx} />
        </div>
      </div>
    );
  }

  if (type === 'link') {
    return (
      <a
        href={resolvedUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-calendly
        data-calendly-tracked="component"
        data-cta-position={ctaPosition}
        data-cta-id={resolvedCtaId}
        onClick={handleLinkClick}
        className={`${CALENDLY_BUTTON_VARIANT_CLASS[variant]} ${className}`.trim()}
      >
        {label}
      </a>
    );
  }

  const popupClassName = [
    'cta-calendly',
    `cta-calendly--${ctaPosition}`,
    CALENDLY_BUTTON_VARIANT_CLASS[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={resolvedUrl}
      id={id}
      title={title}
      aria-label={ariaLabel ?? (typeof label === 'string' ? label : 'Prendre rendez-vous en ligne')}
      target="_blank"
      rel="noopener noreferrer"
      data-calendly
      data-calendly-tracked="component"
      data-cta-position={ctaPosition}
      data-cta-id={resolvedCtaId}
      onClick={disabled ? (e) => e.preventDefault() : handlePopupClick}
      aria-disabled={disabled || undefined}
      className={`${popupClassName}${disabled ? ' pointer-events-none opacity-50' : ''}`.trim()}
    >
      {label}
    </a>
  );
}
