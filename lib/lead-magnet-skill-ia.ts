/** Lead magnet PDF — Skill IA conducteur de travaux (URL publique + tag analytics) */
export const SKILL_IA_LEAD_MAGNET = {
  pdfPublicPath: '/leadmagnets/Guide_1er_Skill_IA_Conducteur_Travaux_OFC.pdf',
  fileName: 'Guide_1er_Skill_IA_Conducteur_Travaux_OFC.pdf',
  tag: 'leadmagnet-skill-ia-conducteur-travaux',
  landingPath: '/ressources/skill-ia-conducteur-travaux',
  merciPath: '/ressources/skill-ia-conducteur-travaux/merci',
} as const;

/** Articles MDX où afficher l’encart CTA (SEO / GEO). */
export const BLOG_SLUGS_WITH_SKILL_LEAD_MAGNET_CTA = [
  'chatgpt-btp-7-leviers-productivite-2026',
  'formation-ia-btp-guide-complet-2026',
] as const;

export function shouldShowSkillLeadMagnetCta(slug: string): boolean {
  return (BLOG_SLUGS_WITH_SKILL_LEAD_MAGNET_CTA as readonly string[]).includes(slug);
}
