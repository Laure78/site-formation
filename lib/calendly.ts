/**
 * Prise de RDV en ligne — agenda Calendly.
 * Surcharge possible : NEXT_PUBLIC_CALENDLY_URL dans .env.local
 */
export const CALENDLY_BOOKING_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  'https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation';

/** URL pour embed inline / popup (identique au lien de réservation). */
export const CALENDLY_EMBED_URL = CALENDLY_BOOKING_URL;
