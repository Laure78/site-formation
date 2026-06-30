import {
  OFC_PROMO_VIDEO,
  OFC_PROMO_VIDEO_SEO,
  getOfcPromoVideoPlayerUrl,
  getOfcPromoVideoWatchUrl,
} from '@/lib/ofc-promo-video';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

type BuildPromoVideoObjectOptions = {
  /** URL de la page qui héberge le lecteur (accueil ou page watch). */
  pageUrl: string;
  /** Fragment @id unique dans le graphe JSON-LD. */
  idSuffix?: string;
};

/** Nœud schema.org VideoObject — promo formations IA BTP (hero accueil). */
export function buildPromoVideoObjectJsonLd({
  pageUrl,
  idSuffix = 'promo-formations-ia-btp',
}: BuildPromoVideoObjectOptions): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const videoId = `${pageUrl}#${idSuffix}`;
  const thumbnailUrl = `${base}${OFC_PROMO_VIDEO_SEO.thumbnailPath}`;
  const playerUrl = getOfcPromoVideoPlayerUrl(base);
  const watchUrl = getOfcPromoVideoWatchUrl(base);

  return {
    '@type': 'VideoObject',
    '@id': videoId,
    name: OFC_PROMO_VIDEO_SEO.name,
    description: OFC_PROMO_VIDEO_SEO.description,
    thumbnailUrl,
    uploadDate: `${OFC_PROMO_VIDEO_SEO.uploadDate}T10:00:00+02:00`,
    duration: OFC_PROMO_VIDEO_SEO.duration,
    embedUrl: playerUrl,
    url: watchUrl,
    inLanguage: 'fr-FR',
    isFamilyFriendly: true,
    width: OFC_PROMO_VIDEO.width,
    height: OFC_PROMO_VIDEO.height,
    publisher: { '@id': `${base}/#organization` },
    author: { '@id': `${base}/#laure-olivie` },
    potentialAction: {
      '@type': 'WatchAction',
      target: watchUrl,
    },
  };
}

/** Entrée video-sitemap.xml (namespace Google Video). */
export function buildPromoVideoSitemapXmlEntry(baseUrl: string): string {
  const watchUrl = getOfcPromoVideoWatchUrl(baseUrl);
  const playerUrl = getOfcPromoVideoPlayerUrl(baseUrl);
  const thumb = `${baseUrl.replace(/\/$/, '')}${OFC_PROMO_VIDEO_SEO.thumbnailPath}`;
  const { name, description, uploadDate, duration } = OFC_PROMO_VIDEO_SEO;

  return `  <url>
    <loc>${watchUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${thumb}</video:thumbnail_loc>
      <video:title>${escapeXml(name)}</video:title>
      <video:description>${escapeXml(description)}</video:description>
      <video:player_loc allow_embed="yes">${playerUrl}</video:player_loc>
      <video:publication_date>${uploadDate}T10:00:00+02:00</video:publication_date>
      <video:duration>${isoDurationToSeconds(duration)}</video:duration>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>
  </url>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isoDurationToSeconds(iso: string): number {
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return 120;
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const sec = Number(m[3] ?? 0);
  return h * 3600 + min * 60 + sec;
}
