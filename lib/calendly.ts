import { LINKS } from '@/lib/internal-links';

/**
 * Prise de RDV via Calendly — visio découverte.
 * Surcharge possible : NEXT_PUBLIC_CALENDLY_URL dans .env.local
 * Usage interne : réservé à `/prendre-rendez-vous` (embed Calendly).
 */
export const CALENDLY_BOOKING_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  'https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation';

/** URL pour embed inline / popup (identique au lien de réservation). */
export const CALENDLY_EMBED_URL = CALENDLY_BOOKING_URL;

/** Widget inline — page événement + bannière GDPR masquée (hub villes /formation-ia/btp-*). */
export const CALENDLY_INLINE_WIDGET_URL =
  process.env.NEXT_PUBLIC_CALENDLY_INLINE_WIDGET_URL ??
  'https://calendly.com/formation-ia-artisans-btp-appel-decouverte?hide_gdpr_banner=1';

type CalendlyUtmParams = {
  /** URL de base (événement ou page hôte Calendly). */
  baseUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

/** Événement window émis quand widget.js est chargé (inline + popup). */
export const CALENDLY_SCRIPT_READY_EVENT = 'calendly:ready';

/** Slug URL → segment utm_campaign (ex. `/formation-ia-btp-paris` → `formation-ia-btp-paris`). */
export function slugifyPathForCalendlyCampaign(pathname: string): string {
  const raw = pathname.replace(/^\//, '').replace(/\/$/, '');
  return raw ? raw.replace(/\//g, '-') : 'home';
}

type DeriveCalendlyCampaignOptions = {
  campaign?: string;
  ctaPosition?: string;
  ctaId?: string;
};

/**
 * Campagne UTM descriptive — jamais `cta-unspecified`.
 * Priorité : `campaign` explicite → `{slug}-{ctaId}` → `{slug}-{ctaPosition}` → `{slug}-rdv`.
 */
export function deriveCalendlyCampaign(
  pathname: string,
  { campaign, ctaPosition, ctaId }: DeriveCalendlyCampaignOptions = {},
): string {
  if (campaign) return campaign;
  const slug = slugifyPathForCalendlyCampaign(pathname);
  if (ctaId) return `${slug}-${ctaId}`;
  if (ctaPosition && ctaPosition !== 'unknown') return `${slug}-${ctaPosition}`;
  return `${slug}-rdv`;
}

export function buildCalendlyUrlWithUtm({
  baseUrl = CALENDLY_BOOKING_URL,
  utmSource,
  utmMedium = 'cta',
  utmCampaign,
}: CalendlyUtmParams = {}): string {
  const u = new URL(baseUrl);
  if (utmSource) u.searchParams.set('utm_source', utmSource);
  if (utmMedium) u.searchParams.set('utm_medium', utmMedium);
  if (utmCampaign) u.searchParams.set('utm_campaign', utmCampaign);
  return u.href;
}

/** URL iframe inline Calendly (`embed=true`) — repli si widget.js indisponible. */
export function buildCalendlyInlineIframeUrl(bookingUrl: string): string {
  const u = new URL(bookingUrl);
  u.searchParams.set('embed', 'true');
  if (!u.searchParams.has('hide_gdpr_banner')) {
    u.searchParams.set('hide_gdpr_banner', '1');
  }
  return u.href;
}

/** Lien CTA site — redirige vers `/prendre-rendez-vous` (Calendly réservé à cette page). */
export function buildSiteCalendlyCtaUrl(_campaign: string): string {
  return LINKS.prendreRdv;
}

/** Indique si l’URL pointe vers la prise de RDV (page interne ou legacy Calendly). */
export function isCalendlyBookingHref(href: string): boolean {
  if (href === LINKS.prendreRdv || href === '/prendre-rdv') return true;
  try {
    const u = new URL(href, 'https://www.laureolivie.fr');
    if (u.pathname.replace(/\/$/, '') === LINKS.prendreRdv) return true;
    const base = new URL(CALENDLY_BOOKING_URL);
    return (
      u.hostname === base.hostname &&
      u.pathname.replace(/\/$/, '') === base.pathname.replace(/\/$/, '')
    );
  } catch {
    return false;
  }
}

/** UTM catalogue — aligné maillage site (utm_source=site). */
export function calendlyCatalogueUrl(utmCampaign: string): string {
  return buildSiteCalendlyCtaUrl(utmCampaign);
}

/** Page pilier /claude-ai-btp — tracking Calendly (hero vs bloc conversion). */
export function calendlyClaudeBtpGuideUrl(segment: 'hero' | 'bottom-cta'): string {
  const map = {
    hero: 'claude-btp-guide-hero',
    'bottom-cta': 'claude-btp-guide-fin',
  } as const;
  return buildSiteCalendlyCtaUrl(map[segment]);
}

/** Page /a-propos — tracking Calendly (hero, approche, CTA final). */
export function calendlyAboutUrl(section: 'hero' | 'approach' | 'bottom-cta'): string {
  const map = {
    hero: 'a-propos-hero',
    approach: 'a-propos-approche',
    'bottom-cta': 'a-propos-fin',
  } as const;
  return buildSiteCalendlyCtaUrl(map[section]);
}
