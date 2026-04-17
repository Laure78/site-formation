import type { Metadata } from 'next';

/** og:site_name — cohérence sur tout le site */
export const OG_SITE_NAME = 'Laure Olivié — Formation IA BTP';

const DESCRIPTION_AUTHOR_SUFFIX = 'Laure Olivié, formatrice IA BTP';

/** Ajoute la mention formatrice aux descriptions OG/meta (évite les doublons) */
export function withOgDescriptionSuffix(description: string): string {
  const d = description.trim();
  if (d.includes(DESCRIPTION_AUTHOR_SUFFIX)) return d;
  const sep = d.endsWith('.') ? ' ' : '. ';
  return `${d}${sep}${DESCRIPTION_AUTHOR_SUFFIX}.`;
}

export type ArticleMetaInput = {
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
};

export type BuildPageMetadataInput = {
  title: string;
  description: string;
  baseUrl: string;
  path?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  image?: { url: string; width?: number; height?: number; alt?: string };
  article?: ArticleMetaInput;
  /** Par défaut true : suffixe « Laure Olivié, formatrice IA BTP » */
  appendAuthorSuffix?: boolean;
  /** Remplace og:title et twitter:title (balise HTML <title> inchangée si non défini) */
  openGraphTitle?: string;
  /** Remplace og:description et twitter:description (texte tel quel, sans suffixe auteur) */
  openGraphDescription?: string;
  robots?: Metadata['robots'];
  /** ex. { 'fr-FR': 'https://www.laureolivie.fr' } — renforce le signal hreflang */
  alternatesLanguages?: Record<string, string>;
  category?: string;
};

function toIso8601Utc(date: string): string {
  const parsed = new Date(`${date}T12:00:00+01:00`);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function resolveImageUrl(
  baseUrl: string,
  image?: { url: string; width?: number; height?: number; alt?: string }
) {
  const defaultAlt = 'Laure Olivié — Formatrice IA pour le BTP, Qualiopi';
  if (!image?.url) {
    return {
      url: `${baseUrl}/images/laure-olivie-formatrice.png`,
      width: 1200,
      height: 630,
      alt: defaultAlt,
    };
  }
  const url = image.url.startsWith('http')
    ? image.url
    : `${baseUrl}${image.url.startsWith('/') ? image.url : `/${image.url}`}`;
  return {
    url,
    width: image.width ?? 1200,
    height: image.height ?? 630,
    alt: image.alt ?? defaultAlt,
  };
}

/**
 * Métadonnées Open Graph / Twitter / canonique réutilisables (App Router).
 * - og:title, og:description, og:type, og:image, og:url, og:locale, og:site_name
 * - Articles : article:* dans `other` + champs Open Graph article
 */
export function buildPageMetadata({
  title,
  description,
  baseUrl,
  path = '',
  keywords,
  ogType = 'website',
  image,
  article,
  appendAuthorSuffix = true,
  openGraphTitle,
  openGraphDescription,
  robots,
  alternatesLanguages,
  category,
}: BuildPageMetadataInput): Metadata {
  const baseNorm = baseUrl.replace(/\/$/, '');
  const pathNorm = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : '';
  const canonical = `${baseNorm}${pathNorm}`.replace(/\/$/, '') || baseNorm;
  const metaDescription = appendAuthorSuffix
    ? withOgDescriptionSuffix(description)
    : description.trim();
  const ogTitle = openGraphTitle?.trim() || title;
  const ogDescription =
    openGraphDescription != null ? openGraphDescription.trim() : metaDescription;
  const img = resolveImageUrl(baseUrl, image);

  const articleOg =
    ogType === 'article' && article
      ? {
          publishedTime: toIso8601Utc(article.publishedTime),
          modifiedTime: toIso8601Utc(article.modifiedTime ?? article.publishedTime),
          authors: [article.author ?? 'Laure Olivié'],
          section: article.section ?? 'Formation IA BTP',
        }
      : {};

  const openGraph = {
    type: ogType,
    title: ogTitle,
    description: ogDescription,
    url: canonical,
    siteName: OG_SITE_NAME,
    locale: 'fr_FR',
    images: [img],
    ...articleOg,
  } as NonNullable<Metadata['openGraph']>;

  const other: Record<string, string> = {};
  if (ogType === 'article' && article) {
    const pub = toIso8601Utc(article.publishedTime);
    const mod = toIso8601Utc(article.modifiedTime ?? article.publishedTime);
    const author = article.author ?? 'Laure Olivié';
    const section = article.section ?? 'Formation IA BTP';
    other['article:author'] = author;
    other['og:author'] = author;
    other['article:published_time'] = pub;
    other['article:modified_time'] = mod;
    other['article:section'] = section;
  }

  const meta: Metadata = {
    title,
    description: metaDescription,
    ...(keywords?.length ? { keywords } : {}),
    ...(category ? { category } : {}),
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [img.url],
    },
    alternates: {
      canonical,
      languages: alternatesLanguages ?? { 'fr-FR': canonical },
    },
    ...(Object.keys(other).length ? { other } : {}),
    ...(robots !== undefined ? { robots } : {}),
  };

  return meta;
}
