/**
 * Classes utilitaires OFC — micro-interactions (voir `app/globals.css` @layer components).
 * Charte : #377CF3 · #F2F2F2 · blanc · Poppins (display).
 *
 * @example
 * ```tsx
 * import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
 *
 * <Link href="/formations" className={`${OFC_CARD} block p-6`}>…</Link>
 * <CalendlyEmbed variant="primary" />
 * <Link href="/blog" className={OFC_LINK}>Lire l'article</Link>
 * ```
 */

/** Cartes formations, métiers, articles — lift −2px + bordure #377CF3 + ombre douce (150 ms). */
export const OFC_CARD = 'ofc-card';

/** Cartes-liens sur fond gris OFC — hérite du lift `.ofc-card`. */
export const OFC_CARD_MUTED = 'ofc-card ofc-card-muted';

/** CTA primaire (Calendly popup, conversion). */
export const OFC_CTA_PRIMARY = 'ofc-cta-primary';

/** CTA primaire pilule (hero accueil). */
export const OFC_CTA_PRIMARY_PILL = 'ofc-cta-primary-pill';

/** CTA secondaire contour bleu. */
export const OFC_CTA_SECONDARY = 'ofc-cta-secondary';

/** CTA blanc sur fond bleu (bandeau conversion, sticky bar). */
export const OFC_CTA_ON_ACCENT = 'ofc-cta-on-accent';

/** CTA compact blanc — barre sticky mobile / espaces réduits. */
export const OFC_CTA_COMPACT = 'ofc-cta-compact';

/** CTA contour blanc sur fond bleu (secondaire hero pilier). */
export const OFC_CTA_GHOST_ON_ACCENT = 'ofc-cta-ghost-on-accent';

/** Liens internes — soulignement animé au survol (#377CF3). */
export const OFC_LINK = 'ofc-link';
