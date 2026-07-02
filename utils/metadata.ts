import type { Metadata } from 'next';
import { enrichPageDescription } from '@/lib/meta-description';

/** og:site_name — cohérence sur tout le site */
export const OG_SITE_NAME = 'Laure Olivié — Formation IA pour le BTP';

/** Suffixe unique de marque — appliqué par `app/layout.tsx` (`title.template`). */
export const BRAND_TITLE_SUFFIX = ' | Laure Olivié';

/** Longueur cible du `<title>` complet (segment + suffixe). */
export const SEO_TITLE_MAX_LENGTH = 60;

const DESCRIPTION_AUTHOR_SUFFIX = 'Laure Olivié, formatrice IA pour le BTP';

/** Suffixe marque et variantes « | Laure Olivié · Qualiopi » en fin de chaîne. */
const BRAND_SUFFIX_PATTERN =
  /\s*\|\s*Laure\s+Olivi[ée](?:\s*[·•|]\s*[^|]+)?\s*$/i;

/** Mots / signes orphelins en fin de segment (après coupe). */
const TRAILING_ORPHAN_WORDS = /\s+(?:de|du|des|la|le|les|pour|et|ou|à|en|un|une|d)\s*$/i;

/** Retire le suffixe « | Laure Olivié » (et variantes) en fin de chaîne — y compris doublons. */
export function stripBrandSuffix(title: string): string {
  let t = title.trim();
  while (BRAND_SUFFIX_PATTERN.test(t)) {
    t = t.replace(BRAND_SUFFIX_PATTERN, '').trim();
  }
  return t;
}

/** Nettoie les fins de titre coupées (ponctuation, conjonctions, « & » orphelin). */
export function trimTitleOrphans(segment: string): string {
  let t = segment.trim();
  let prev = '';
  while (t !== prev) {
    prev = t;
    t = t.replace(/[&—:;,.|–\-]\s*$/, '').trim();
    t = t.replace(TRAILING_ORPHAN_WORDS, '').trim();
  }
  return t;
}

/**
 * Tronque le segment de titre (sans marque) pour que segment + BRAND_TITLE_SUFFIX ≤ maxTotal.
 * Coupe au dernier mot complet ; retire les orphelins (&, —, articles).
 */
export function truncateForBrandedTitle(segment: string, maxTotal = SEO_TITLE_MAX_LENGTH): string {
  const clean = stripBrandSuffix(segment);
  const maxSegment = maxTotal - BRAND_TITLE_SUFFIX.length;
  if (clean.length <= maxSegment) return trimTitleOrphans(clean);

  let cut = clean.slice(0, maxSegment).trim();
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) {
    cut = cut.slice(0, lastSpace).trim();
  }
  return trimTitleOrphans(cut);
}

/** Titre HTML final : segment nettoyé + suffixe unique (bypass du template layout). */
export function buildBrandedTitle(segment: string, maxTotal = SEO_TITLE_MAX_LENGTH): string {
  return `${truncateForBrandedTitle(segment, maxTotal)}${BRAND_TITLE_SUFFIX}`;
}

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
  /** Si défini, remplace le titre HTML (ignore le template du layout). */
  titleAbsolute?: string;
  description: string;
  baseUrl: string;
  path?: string;
  /** @deprecated Non émis en HTML — Google ignore meta keywords. */
  keywords?: string[];
  ogType?: 'website' | 'article';
  image?: { url: string; width?: number; height?: number; alt?: string };
  article?: ArticleMetaInput;
  /** Par défaut false : meta description telle quelle (la marque est déjà portée par og:site_name + le <title>). Passer true pour ajouter « Laure Olivié, formatrice IA pour le BTP ». */
  appendAuthorSuffix?: boolean;
  /** Remplace og:title et twitter:title (balise HTML <title> inchangée si non défini) */
  openGraphTitle?: string;
  /** Remplace og:description et twitter:description (texte tel quel, sans suffixe auteur) */
  openGraphDescription?: string;
  /** Description finale (pas d'enrichissement SEO/geo ni ellipse automatique). */
  descriptionFinal?: boolean;
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
  const defaultAlt =
    'Laure Olivié — formation IA BTP et formation IA bâtiment, Paris Île-de-France, Qualiopi';
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
  titleAbsolute,
  description,
  baseUrl,
  path = '',
  keywords: _keywords,
  ogType = 'website',
  image,
  article,
  appendAuthorSuffix = false,
  openGraphTitle,
  openGraphDescription,
  descriptionFinal = false,
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
  const rawDescription = appendAuthorSuffix
    ? withOgDescriptionSuffix(description)
    : description.trim();
  const metaDescription = descriptionFinal
    ? rawDescription
    : enrichPageDescription(rawDescription);
  const titleSegment = truncateForBrandedTitle(
    stripBrandSuffix(titleAbsolute ?? title),
  );
  const htmlTitle = buildBrandedTitle(titleSegment);
  const ogTitle = openGraphTitle?.trim()
    ? stripBrandSuffix(openGraphTitle)
    : titleSegment;
  const ogDescription =
    openGraphDescription != null ? openGraphDescription.trim() : metaDescription;
  const img = resolveImageUrl(baseUrl, image);

  const articleOg =
    ogType === 'article' && article
      ? {
          publishedTime: toIso8601Utc(article.publishedTime),
          modifiedTime: toIso8601Utc(article.modifiedTime ?? article.publishedTime),
          authors: [article.author ?? 'Laure Olivié'],
          section: article.section ?? 'Formation IA pour les pros du BTP',
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
    const section = article.section ?? 'Formation IA appliquée au bâtiment';
    other['article:author'] = author;
    other['og:author'] = author;
    other['article:published_time'] = pub;
    other['article:modified_time'] = mod;
    other['article:section'] = section;
  }

  const meta: Metadata = {
    title:
      titleAbsolute != null
        ? { absolute: htmlTitle }
        : titleSegment,
    description: metaDescription,
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
      languages: alternatesLanguages ?? { 'fr-FR': canonical, 'x-default': canonical },
    },
    ...(Object.keys(other).length ? { other } : {}),
    ...(robots !== undefined ? { robots } : {}),
  };

  return meta;
}
