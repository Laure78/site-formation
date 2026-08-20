/**
 * Classes utilitaires OFC — micro-interactions (voir `app/globals.css` @layer components).
 * Tokens : `lib/design-tokens.ts` · polices globales Inter + Outfit (`app/layout.tsx`).
 *
 * @example
 * ```tsx
 * import { OFC_CARD, OFC_TYPE_HERO, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
 *
 * <h1 className={OFC_TYPE_HERO}>…</h1>
 * <Link href="/formations" className={`${OFC_CARD} block p-6`}>…</Link>
 * ```
 */

/** Typographie — échelle DA (clamp responsive) */
export const OFC_TYPE_HERO = 'ofc-type-hero text-ofc-ink text-balance';
export const OFC_TYPE_H2 = 'ofc-type-h2 text-ofc-ink text-balance';
export const OFC_TYPE_H3 = 'ofc-type-h3 text-ofc-ink';
export const OFC_TYPE_LEAD = 'ofc-type-lead ofc-read-width';
export const OFC_TYPE_BODY = 'ofc-type-body ofc-read-width';
export const OFC_TYPE_CAPTION = 'ofc-type-caption';
export const OFC_TYPE_LABEL = 'ofc-type-label';

/** Largeur de lecture */
export const OFC_READ_WIDTH = 'ofc-read-width';
export const OFC_READ_WIDTH_WIDE = 'ofc-read-width-wide';

/** Cartes formations, métiers, articles — lift −2px + bordure #377CF3 + ombre douce (150 ms). */
export const OFC_CARD = 'ofc-card';

/** Cartes-liens sur fond gris OFC — hérite du lift `.ofc-card`. */
export const OFC_CARD_MUTED = 'ofc-card ofc-card-muted';

/** CTA primaire (Calendly, conversion). */
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

/** Cartes bénéfices accueil — lift, bordure bleue, icône pulsée au survol. */
export const OFC_BENEFIT_CARD = 'ofc-benefit-card';

/** Cartes cas d'usage IA (grille photos) — zoom image + liseré animé. */
export const OFC_CAS_USAGE_CARD = 'ofc-cas-usage-card';

/** Cartes gains commerciaux (bandeau bleu) — shimmer + lift. */
export const OFC_GAIN_CARD = 'ofc-gain-card';

/** Cartes avant/après problème → solution. */
export const OFC_PROBLEM_SOLUTION_CARD = 'ofc-problem-solution-card';

/** Étapes HowTo (5 cas d'usage). */
export const OFC_HOWTO_STEP = 'ofc-howto-step';
