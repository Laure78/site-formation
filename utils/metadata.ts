import type { Metadata } from 'next';
import { enrichPageDescription } from '@/lib/meta-description';

/** og:site_name — cohérence sur tout le site */
export const OG_SITE_NAME = 'Laure Olivié — Formation IA pour le BTP';

/** Suffixe unique de marque — appliqué par `app/layout.tsx` (`title.template`). */
export const BRAND_TITLE_SUFFIX = ' | Laure Olivié';

/** Longueur cible du `<title>` complet (segment + suffixe). */
export const SEO_TITLE_MAX_LENGTH = 60;

/**
 * Budget du segment seul (avant « | Laure Olivié »).
 * Dérivé de SEO_TITLE_MAX_LENGTH − suffixe (= 45) — ne pas fixer en dur plus bas,
 * sinon titres légitimes du type « … en Île-de-France » sont coupés → « … en | Laure Olivié ».
 */
export const SEO_TITLE_SEGMENT_MAX_LENGTH =
  SEO_TITLE_MAX_LENGTH - BRAND_TITLE_SUFFIX.length;

/** Fourchette meta description SERP (phrases complètes, sans ellipse). */
export const META_DESCRIPTION_MIN_LENGTH = 150;
export const META_DESCRIPTION_MAX_LENGTH = 160;

function isSeoDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

/** Warning SEO uniquement en développement (jamais en prod). */
export function warnSeoMetadataDev(message: string): void {
  if (!isSeoDev()) return;
  console.warn(`[seo] ${message}`);
}

const DESCRIPTION_AUTHOR_SUFFIX = 'Laure Olivié, formatrice IA pour le BTP';

/** Suffixe marque et variantes « | Laure Olivié · Qualiopi » en fin de chaîne. */
const BRAND_SUFFIX_PATTERN =
  /\s*\|\s*Laure\s+Olivi[ée](?:\s*[·•|]\s*[^|]+)?\s*$/i;

/** Anciens suffixes catalogue (« | Qualiopi », etc.) — retirés avant troncature. */
const LEGACY_PIPE_SUFFIX_PATTERN = /\s*\|\s*Qualiopi(?:\s*[·•].*)?\s*$/i;

/** Mots / signes orphelins en fin de segment (après coupe). */
const TRAILING_ORPHAN_WORDS = /\s+(?:de|du|des|la|le|les|pour|et|ou|à|en|un|une|d)\s*$/i;

/** Séparateurs orphelins juste avant le suffixe marque (ex. « BTP · | Laure Olivié »). */
const ORPHAN_BEFORE_BRAND_PATTERN = /(?:\s*[·•]\s*\||\s*\|\s*\|)/;

/**
 * Assemble des segments de titre en filtrant les vides / undefined
 * avant de joindre avec « · » — évite « base · | Laure Olivié ».
 */
export function joinTitleSegments(
  ...segments: Array<string | null | undefined | false>
): string {
  return segments
    .map((s) => (typeof s === 'string' ? s.trim() : ''))
    .filter(Boolean)
    .join(' · ');
}

/** Retire le suffixe « | Laure Olivié » (et variantes) en fin de chaîne — y compris doublons. */
export function stripBrandSuffix(title: string): string {
  let t = title.trim();
  let prev = '';
  while (t !== prev) {
    prev = t;
    t = t.replace(BRAND_SUFFIX_PATTERN, '').trim();
    t = t.replace(LEGACY_PIPE_SUFFIX_PATTERN, '').trim();
  }
  return t;
}

/** Nettoie les fins de titre coupées (ponctuation, conjonctions, « · » / « & » orphelins). */
export function trimTitleOrphans(segment: string): string {
  let t = segment.trim();
  let prev = '';
  while (t !== prev) {
    prev = t;
    t = t.replace(/[&—:;,.|–\-·•]\s*$/u, '').trim();
    t = t.replace(TRAILING_ORPHAN_WORDS, '').trim();
  }
  return t;
}

/**
 * Échoue en développement si le titre contient un séparateur orphelin
 * (« · | » ou « | | »). En prod : warning uniquement.
 */
export function assertBrandedTitleClean(title: string, context?: string): void {
  if (!ORPHAN_BEFORE_BRAND_PATTERN.test(title)) return;
  const where = context ? ` (${context})` : '';
  const message = `title séparateur orphelin (« · | » / « | | ») : « ${title} »${where}`;
  if (isSeoDev()) {
    throw new Error(`[seo] ${message}`);
  }
  warnSeoMetadataDev(message);
}

/**
 * Tronque le segment de titre (sans marque) à maxSegment caractères.
 * Coupe au dernier mot complet ; retire les orphelins (&, —, articles).
 * À appeler AVANT d’ajouter `BRAND_TITLE_SUFFIX` — jamais sur un titre déjà suffixé.
 */
export function truncateForBrandedTitle(
  segment: string,
  maxSegment = SEO_TITLE_SEGMENT_MAX_LENGTH,
): string {
  const clean = stripBrandSuffix(segment);
  if (maxSegment <= 0) return '';
  if (clean.length <= maxSegment) return trimTitleOrphans(clean);

  let cut = clean.slice(0, maxSegment).trimEnd();
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) {
    cut = cut.slice(0, lastSpace).trimEnd();
  }
  return trimTitleOrphans(cut);
}

/**
 * Titre HTML / OG / Twitter : vérifie segment + suffixe ≤ maxTotal,
 * tronque le segment AVANT le suffixe (jamais en plein mot), puis ajoute « | Laure Olivié ».
 * Ne jamais tronquer une chaîne déjà suffixée (évite « … BTP & | Laure Olivié »).
 */
export function buildBrandedTitle(
  segment: string,
  maxTotal = SEO_TITLE_MAX_LENGTH,
  maxSegment = SEO_TITLE_SEGMENT_MAX_LENGTH,
): string {
  // Normalise d’abord les sous-segments séparés par « · » (filtre les vides).
  const joined = joinTitleSegments(
    ...stripBrandSuffix(segment)
      .split(/\s*[·•]\s*/)
      .map((part) => part.trim()),
  );
  const clean = trimTitleOrphans(joined);
  const suffixLen = BRAND_TITLE_SUFFIX.length;
  const segmentBudget = Math.max(0, Math.min(maxSegment, maxTotal - suffixLen));
  let truncated = truncateForBrandedTitle(clean, segmentBudget);

  // Garde-fou : si le segment dépasse encore le budget, re-couper au mot
  // avant d’ajouter le suffixe — jamais après concaténation.
  while (truncated.length > segmentBudget && truncated.includes(' ')) {
    truncated = trimTitleOrphans(truncated.slice(0, truncated.lastIndexOf(' ')));
  }
  truncated = trimTitleOrphans(truncated);

  if (clean.length > truncated.length) {
    warnSeoMetadataDev(
      `title tronqué avant suffixe (${clean.length} → ${truncated.length} car. segment, total ≤ ${maxTotal}) : « ${clean} » → « ${truncated}${BRAND_TITLE_SUFFIX} »`,
    );
  }

  // Suffixe marque EN DERNIER, après troncature du segment.
  const full = `${truncated}${BRAND_TITLE_SUFFIX}`;
  assertBrandedTitleClean(full, 'buildBrandedTitle');
  if (full.length > maxTotal) {
    warnSeoMetadataDev(
      `title final > ${maxTotal} car. (${full.length}) : « ${full} »`,
    );
  }

  return full;
}

/** Vérifie la fourchette 150–160 car. — warning en dev, pas de troncature. */
export function assertMetaDescriptionLength(
  description: string,
  context?: string,
): void {
  const len = description.length;
  if (len >= META_DESCRIPTION_MIN_LENGTH && len <= META_DESCRIPTION_MAX_LENGTH) {
    return;
  }
  const where = context ? ` (${context})` : '';
  warnSeoMetadataDev(
    `description hors fourchette ${META_DESCRIPTION_MIN_LENGTH}–${META_DESCRIPTION_MAX_LENGTH} car. : ${len}${where}`,
  );
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
      url: `${baseUrl}/images/laure-olivie-formatrice-ia-btp-qualiopi.webp`,
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
  void _keywords;
  const baseNorm = baseUrl.replace(/\/$/, '');
  const pathNorm = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : '';
  if (!pathNorm) {
    warnSeoMetadataDev(
      'path manquant — canonical auto-référencé tombe sur la racine du site',
    );
  }
  const canonical = `${baseNorm}${pathNorm}`.replace(/\/$/, '') || baseNorm;
  const rawDescription = appendAuthorSuffix
    ? withOgDescriptionSuffix(description)
    : description.trim();
  const metaDescription = descriptionFinal
    ? rawDescription
    : enrichPageDescription(rawDescription);
  assertMetaDescriptionLength(metaDescription, pathNorm || '/');

  const rawSegment = stripBrandSuffix(titleAbsolute ?? title);
  /** Toujours tronquer le segment puis ajouter le suffixe (title, og, twitter). */
  const htmlTitle = buildBrandedTitle(rawSegment);
  const ogTitle = openGraphTitle?.trim()
    ? buildBrandedTitle(openGraphTitle)
    : htmlTitle;
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
    /** absolute : évite le double suffixe via `title.template` du layout */
    title: { absolute: htmlTitle },
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
