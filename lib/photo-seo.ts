import { PHOTOS } from '@/lib/photos';
import { buildPhotoTitleFromAlt } from '@/lib/seo-geo-keywords';
import { normalizePhotoAlt } from '@/lib/image-alt';

/** Visuel site avec métadonnées SEO image (alt, description, title optionnels). */
export type SitePhotoAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  description?: string;
  title?: string;
};

export function isSitePhotoAsset(value: unknown): value is SitePhotoAsset {
  return (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    'alt' in value &&
    typeof (value as SitePhotoAsset).src === 'string'
  );
}

/** Alt image — enrichissement SEO/GEO si le libellé source est incomplet. */
export function getPhotoAlt(photo: SitePhotoAsset): string {
  return normalizePhotoAlt(photo.alt);
}

/** Title image (tooltip) — complémentaire à l'alt, jamais dupliqué. */
export function getPhotoTitle(photo: SitePhotoAsset): string {
  return photo.title ?? buildPhotoTitleFromAlt(photo.alt, photo.src);
}

/** Description SEO longue — schémas ImageObject, métadonnées enrichies. */
export function getPhotoDescription(photo: SitePhotoAsset): string | undefined {
  return photo.description;
}

const CATALOGUE_VISUEL_BY_REF: Record<string, SitePhotoAsset> = {
  'NIV-01': PHOTOS.formationNiv01IaBatimentTravauxPublics2026,
  'NIV-02': PHOTOS.formationNiv02IaAppelsOffreBtp2026,
  'NIV-03': PHOTOS.formationNiv03IaConduiteTravaux2026,
  'NIV-04': PHOTOS.formationNiv04MaitriserClaudeAiBtp2026,
  'NIV-05': PHOTOS.formationNiv05IaMaitriseOeuvre2026,
};

export function getFormationCatalogueImageObjectJsonLd(
  catalogueRef: string,
  baseUrl: string
): Record<string, unknown> | undefined {
  const photo = CATALOGUE_VISUEL_BY_REF[catalogueRef];
  if (!photo?.description) return undefined;

  const base = baseUrl.replace(/\/$/, '');
  return {
    '@type': 'ImageObject',
    url: `${base}${photo.src}`,
    contentUrl: `${base}${photo.src}`,
    name: photo.alt,
    description: photo.description,
    width: photo.width,
    height: photo.height,
    creditText: "OFC Création d'Entreprise",
    copyrightHolder: {
      '@type': 'Organization',
      name: "OFC Création d'Entreprise",
    },
  };
}
