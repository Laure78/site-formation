import type { Metadata } from 'next';
import {
  BRAND_TITLE_SUFFIX,
  SEO_TITLE_MAX_LENGTH,
  buildTitle,
  buildMetadata,
} from '@/lib/seo';

/** Ligne d’ancrage modalité / zone — pages métier BTP */
export const METIER_IDF_PRESENTIEL_LINE =
  'Interventions en présentiel · Île-de-France uniquement';

const IDF_TITLE_SUFFIX = ' en Île-de-France';

/** Segment « Formation IA {métier} BTP en Île-de-France » si le <title> complet tient en ≤ 60 car. */
export function buildMetierBtpIdfTitleSegment(metierNomTitre: string): string | null {
  const segment = `Formation IA ${metierNomTitre} BTP${IDF_TITLE_SUFFIX}`;
  const full = `${segment}${BRAND_TITLE_SUFFIX}`;
  if (full.length <= SEO_TITLE_MAX_LENGTH) return segment;
  return null;
}

/** Applique le titre IDF au metadata si la longueur le permet. */
export function withMetierBtpIdfTitle(
  metadata: Metadata,
  metierNomTitre: string,
): Metadata {
  const segment = buildMetierBtpIdfTitleSegment(metierNomTitre);
  if (!segment) return metadata;
  const absolute = buildTitle(segment);
  return {
    ...metadata,
    title: { absolute },
    openGraph: metadata.openGraph
      ? { ...metadata.openGraph, title: absolute }
      : metadata.openGraph,
    twitter: metadata.twitter
      ? { ...metadata.twitter, title: absolute }
      : metadata.twitter,
  };
}

type MetierBtpMetadataInput = Parameters<typeof buildMetadata>[0] & {
  /**
   * Conserve le title / titleAbsolute fourni (bénéfice + mot-clé).
   * Sinon, si « Formation IA {métier} BTP en Île-de-France | Laure Olivié » tient
   * en ≤ 60 car., ce titre IDF générique remplace le title custom.
   */
  preferCustomTitle?: boolean;
};

/** Métadonnées page métier + titre IDF si ≤ 60 car. (sauf `preferCustomTitle`). */
export function createMetierBtpPageMetadata(
  metierNomTitre: string,
  input: MetierBtpMetadataInput,
): Metadata {
  const { preferCustomTitle, ...metadataInput } = input;
  const meta = buildMetadata(metadataInput);
  if (preferCustomTitle) return meta;
  return withMetierBtpIdfTitle(meta, metierNomTitre);
}
