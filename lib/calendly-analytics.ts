/** Libellés GA4 pour l’événement `rdv_calendly_click`. */
export type RdvCalendlyPosition = 'hero' | 'milieu' | 'footer';

/** Mappe la position UI (`ctaPosition`) vers le libellé GA4 demandé. */
export function toRdvCalendlyPosition(ctaPosition: string): RdvCalendlyPosition {
  if (ctaPosition === 'hero') return 'hero';
  if (ctaPosition === 'footer' || ctaPosition === 'floating') return 'footer';
  return 'milieu';
}
