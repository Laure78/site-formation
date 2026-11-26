import { LINKS } from '@/lib/internal-links';

/** Lead magnet PDF — Guide conducteur de travaux OFC (URL publique + tag analytics) */
export const SKILL_IA_LEAD_MAGNET = {
  pdfPublicPath: LINKS.pdfPackConducteurTravauxOfc,
  fileName: 'Pack_CDT_OFC_V2.pdf',
  tag: 'leadmagnet-skill-ia-conducteur-travaux',
  landingPath: '/ressources/guide-conducteur-de-travaux',
  merciPath: '/ressources/guide-conducteur-de-travaux/merci',
  editionLabel: 'Édition 2 · Novembre 2026',
  pageCount: 62,
  fileSizeLabel: '2,28 Mo',
  skillCount: 6,
  tutorialCount: 7,
  downloadInfoLine:
    'Édition 2 · Novembre 2026 · 62 pages · PDF de 2,28 Mo · Gratuit, sans inscription',
  downloadButtonLabel: 'Télécharger le guide PDF – version 2',
} as const;

/** Articles MDX où afficher l’encart CTA (SEO / GEO). */
export const BLOG_SLUGS_WITH_SKILL_LEAD_MAGNET_CTA = [
  'chatgpt-btp-7-leviers-productivite-2026',
  'formation-ia-btp-guide-complet-2026',
] as const;

export function shouldShowSkillLeadMagnetCta(slug: string): boolean {
  return (BLOG_SLUGS_WITH_SKILL_LEAD_MAGNET_CTA as readonly string[]).includes(slug);
}