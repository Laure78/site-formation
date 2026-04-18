import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

const DESC =
  "Articles et guides IA BTP : devis, CCTP/DCE, appels d'offres, ChatGPT, Constructys. Méthode terrain testée sur 1 592 pros formés. Qualiopi.";

const OG = {
  url: '/og/blog-og.png',
  width: 1200,
  height: 630,
  alt: 'Blog Formation IA BTP — guides, prompts et cas d’usage',
} as const;

export function getBlogIndexMetadata(path: string, pageNum: number): Metadata {
  const isFirst = pageNum <= 1;
  const shortTitle = isFirst
    ? 'Blog Formation IA BTP · Guides, prompts & cas d\'usage'
    : `Blog Formation IA BTP — Page ${pageNum}`;

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
