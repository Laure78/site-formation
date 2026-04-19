/**
 * Prise de RDV en ligne — agenda Calendly.
 * Surcharge possible : NEXT_PUBLIC_CALENDLY_URL dans .env.local
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
