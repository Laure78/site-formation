import { LINKS } from '@/lib/internal-links';

/** Lead magnet PDF — Guide conducteur de travaux OFC (URL publique + tag analytics) */
export const SKILL_IA_LEAD_MAGNET = {
  pdfPublicPath: LINKS.pdfPackConducteurTravauxOfc,
  fileName: 'Pack_CDT_OFC.pdf',
  tag: 'leadmagnet-skill-ia-conducteur-travaux',
  landingPath: '/ressources/guide-conducteur-de-travaux',
  merciPath: '/ressources/guide-conducteur-de-travaux/merci',
} as const;

/** Articles MDX où afficher l’encart CTA (SEO / GEO). */
export const BLOG_SLUGS_WITH_SKILL_LEAD_MAGNET_CTA = [
  'chatgpt-btp-7-leviers-productivite-2026',
  'formation-ia-btp-guide-complet-2026',
] as const;

export function shouldShowSkillLeadMagnetCta(slug: string): boolean {
  return (BLOG_SLUGS_WITH_SKILL_LEAD_MAGNET_CTA as readonly string[]).includes(slug);
}
