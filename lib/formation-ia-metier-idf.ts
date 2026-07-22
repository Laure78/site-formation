import type { Metadata } from 'next';
import {
  BRAND_TITLE_SUFFIX,
  SEO_TITLE_MAX_LENGTH,
  buildBrandedTitle,
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
  const absolute = buildBrandedTitle(segment);
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

/** Métadonnées page métier + titre IDF si ≤ 60 car. */
export function createMetierBtpPageMetadata(
  metierNomTitre: string,
  input: Parameters<typeof buildMetadata>[0],
): Metadata {
  return withMetierBtpIdfTitle(buildMetadata(input), metierNomTitre);
}
