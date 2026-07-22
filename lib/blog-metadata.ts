import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { formatPersonnesFormeesCount } from '@/lib/constants';

const DESC =
  `Articles formation IA pour le BTP : devis, CCTP/DCE, appels d'offres, ChatGPT, Constructys. ${formatPersonnesFormeesCount()} pros formés. Qualiopi.`;

const OG = {
  url: '/og/og-blog-formation-ia-btp.png',
  width: 1200,
  height: 630,
  alt: 'Blog formation IA BTP — conseils ChatGPT et Claude pour le chantier',
} as const;

export function getBlogIndexMetadata(path: string, pageNum: number): Metadata {
  const isFirst = pageNum <= 1;
  const shortTitle = isFirst
    ? 'Blog Formation IA pour les pros du BTP · Guides, prompts & cas d\'usage'
    : `Blog Formation IA appliquée au bâtiment — Page ${pageNum}`;

  return createPageMetadata({
    title: shortTitle,
    description: DESC,
    path,
    keywords: null,
    appendAuthorSuffix: false,
    image: OG,
  });
}

export function getBlogCategoryMetadata(
  path: string,
  pageNum: number,
  categoryLabel: string
): Metadata {
  const isFirst = pageNum <= 1;
  const shortTitle = isFirst
    ? `Articles IA BTP — ${categoryLabel}`
    : `Articles IA BTP — ${categoryLabel} (page ${pageNum})`;

  return createPageMetadata({
    title: shortTitle,
    description: `${DESC} Catégorie : ${categoryLabel}.`,
    path,
    keywords: null,
    appendAuthorSuffix: false,
    image: OG,
  });
}
