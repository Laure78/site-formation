/** Qualité Next/Image — images hors hero (LCP). */
export const IMAGE_QUALITY_DEFAULT = 70;

/** Hero / LCP — laisser Next.js à ~75 (pas de prop = défaut). */
export const IMAGE_QUALITY_HERO = 75;

/** Attribut `sizes` réutilisables — évite w=3840 sur vignettes. */
export const IMAGE_SIZES = {
  logoHeader: '40px',
  logoHeaderMobile: '36px',
  logoInline: '48px',
  logoLinkedInLearning: '160px',
  logoMarquee: '(max-width: 768px) 152px, 168px',
  logoPartnerBand: '(max-width: 768px) 168px, 184px',
  logoPartnerCard: '(max-width: 768px) 140px, 160px',
  avatarXs: '36px',
  avatarSm: '48px',
  avatarMd: '64px',
  avatarLg: '80px',
  avatarXl: '120px',
  avatarProfile: '(max-width: 768px) 100vw, 384px',
  cardThird: '(max-width: 768px) 100vw, 33vw',
  cardHalf: '(max-width: 1024px) 100vw, 50vw',
  heroBg: '(max-width: 768px) 100vw, 100vw',
  heroSide: '(max-width: 1024px) 100vw, 400px',
  heroFormation: '(max-width: 896px) 100vw, 896px',
  contentWide: '(max-width: 1024px) 100vw, 576px',
  contentGuide: '(max-width: 1024px) 90vw, 520px',
  casUsageThumb: '(max-width: 1280px) 25vw, 220px',
  casUsageFeatured: '(max-width: 640px) 100vw, 448px',
  catalogueThumb: '(max-width: 640px) 200px, 240px',
  reviewAvatar: '40px',
  plateformeHero: '(min-width: 1024px) 560px, 100vw',
} as const;
