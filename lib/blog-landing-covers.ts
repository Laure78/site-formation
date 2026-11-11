import type { BlogArticle } from '@/lib/blog';
import { getBlogCardCoverSrc } from '@/lib/blog-cover';

/** Illustrations dédiées à la landing `/blog` (ne remplace pas les couvertures article ailleurs). */
const LANDING_COVER_BY_SLUG: Record<string, string> = {
  'ia-memoire-technique-appel-offres-guide-2026': '/images/blog/blog-appels-offres-dce.webp',
  'creer-skill-chatgpt-claude-btp': '/images/blog/blog-assistant-ia.webp',
  'charte-ia-btp': '/images/blog/blog-charte-ia.webp',
  'compte-rendu-chantier-ia-automatiser-gagner-temps': '/images/blog/blog-suivi-chantier.webp',
  'comment-ia-gagne-5h-conducteurs-travaux': '/images/blog/blog-suivi-chantier.webp',
  'planning-chantier-sur-mesure-ia': '/images/blog/blog-suivi-chantier.webp',
  'situation-travaux-ia-btp': '/images/blog/blog-suivi-chantier.webp',
  'chatgpt-devis-btp-methode-2026': '/images/blog/blog-devis-chiffrage.webp',
  'gagner-temps-devis-btp-ia': '/images/blog/blog-devis-chiffrage.webp',
};

export const BLOG_LANDING_HERO_IMAGE = '/images/blog/blog-hero-conducteur-travaux.webp' as const;

export const BLOG_LANDING_HERO_ALT =
  'Conducteur de travaux sur chantier avec ordinateur portable pour illustrer le blog IA BTP';

export function getBlogLandingCardCoverSrc(article: Pick<BlogArticle, 'slug' | 'coverImage'>): string {
  return LANDING_COVER_BY_SLUG[article.slug] ?? getBlogCardCoverSrc(article);
}

export function getBlogLandingCardCoverAlt(
  article: Pick<BlogArticle, 'title' | 'coverAlt'>,
): string {
  const fromCover = article.coverAlt?.trim();
  if (fromCover) {
    if (fromCover.length <= 120) return fromCover;
    return `${fromCover.slice(0, 117)}…`;
  }
  const base = article.title.trim();
  if (base.length <= 120) return base;
  return `${base.slice(0, 117)}…`;
}
