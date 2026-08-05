import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { joinTitleSegments } from '@/utils/metadata';
import { computeBlogListing } from '@/lib/blog-index-query';
import {
  blogCategoryListingHref,
  blogIndexListingHref,
} from '@/lib/blog-index-urls';
import type { BlogCategoryId } from '@/lib/blog';

/** Meta description index blog — 155 car., phrase complète. */
const DESC =
  "Articles IA pour le BTP : devis, CCTP/DCE, appels d'offres, ChatGPT, Constructys. 34 guides pratiques par Laure Olivié, Qualiopi, présentiel Île-de-France.";

const OG = {
  url: '/og/og-blog-formation-ia-btp.png',
  width: 1200,
  height: 630,
  alt: 'Blog formation IA BTP — conseils ChatGPT et Claude pour le chantier',
} as const;

/** Pages liste blog indexables (index, follow). */
const BLOG_LISTING_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

function withPagination(
  meta: Metadata,
  pageNum: number,
  totalPages: number,
  hrefForPage: (page: number) => string
): Metadata {
  if (totalPages <= 1) return meta;
  const pagination: NonNullable<Metadata['pagination']> = {};
  if (pageNum > 1) pagination.previous = hrefForPage(pageNum - 1);
  if (pageNum < totalPages) pagination.next = hrefForPage(pageNum + 1);
  if (!pagination.previous && !pagination.next) return meta;
  return { ...meta, pagination };
}

/**
 * Métadonnées index `/blog` et `/blog/page/N`.
 * - canonical auto-référencé via `path` (jamais forcé vers `/blog` sur les pages ≥ 2)
 * - title paginé via `joinTitleSegments` + `buildBrandedTitle` (≤ 60 car.)
 * - robots index,follow explicites
 * - `pagination.previous` / `pagination.next` → `<link rel="prev|next">`
 */
export function getBlogIndexMetadata(path: string, pageNum: number): Metadata {
  const isFirst = pageNum <= 1;
  /** Segment seul — `createPageMetadata` ajoute « | Laure Olivié » (budget ≤ 45 car.). */
  const shortTitle = isFirst
    ? 'Blog IA pour le BTP — guides et cas d\'usage'
    : joinTitleSegments('Blog IA BTP', `page ${pageNum}`);

  const { totalPages } = computeBlogListing({
    page: 1,
    categoryId: null,
    q: null,
    excludeFeatured: true,
  });

  const meta = createPageMetadata({
    title: shortTitle,
    description: DESC,
    descriptionFinal: true,
    path,
    keywords: null,
    appendAuthorSuffix: false,
    image: OG,
    robots: BLOG_LISTING_ROBOTS,
  });

  return withPagination(meta, pageNum, totalPages, blogIndexListingHref);
}

export function getBlogCategoryMetadata(
  path: string,
  pageNum: number,
  categoryLabel: string,
  categoryId: BlogCategoryId
): Metadata {
  const isFirst = pageNum <= 1;
  const shortTitle = isFirst
    ? joinTitleSegments('Articles IA BTP', categoryLabel)
    : joinTitleSegments('Blog IA BTP', categoryLabel, `p.${pageNum}`);

  const { totalPages } = computeBlogListing({
    page: 1,
    categoryId,
    q: null,
    excludeFeatured: false,
  });

  const categoryDescription =
    `Catégorie « ${categoryLabel} » du blog IA BTP : devis, CCTP/DCE, appels d'offres, Constructys. Guides Laure Olivié, Qualiopi, présentiel Île-de-France.`;

  const meta = createPageMetadata({
    title: shortTitle,
    description: categoryDescription,
    descriptionFinal: true,
    path,
    keywords: null,
    appendAuthorSuffix: false,
    image: OG,
    robots: BLOG_LISTING_ROBOTS,
  });

  return withPagination(meta, pageNum, totalPages, (p) =>
    blogCategoryListingHref(categoryId, p)
  );
}
