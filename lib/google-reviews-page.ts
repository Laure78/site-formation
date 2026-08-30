/**
 * Données page `/avis-clients` — fusion API Google Places + fichier local.
 * Ne jamais inventer de note agrégée ni d’avis fictifs.
 */
import {
  getFilledGoogleReviews,
  type GoogleReviewEntry,
} from '@/data/googleReviews';
import { getGoogleReviews, type GoogleReview } from '@/lib/google-reviews';

export type AvisClientsAggregate = {
  rating: number;
  total: number;
};

export type AvisClientsPageData = {
  reviews: GoogleReviewEntry[];
  /** Présent uniquement si l’API Google Places renvoie rating + total fiables. */
  aggregate: AvisClientsAggregate | null;
};

/** Initiales à partir du nom complet (ex. « Marc Dupont » → « MD »). */
export function getReviewInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function formatApiReviewDate(time: number): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(time * 1000));
}

function mapApiReviewToEntry(review: GoogleReview): GoogleReviewEntry {
  return {
    id: `google-api-${review.time}`,
    author: review.author_name,
    initials: getReviewInitials(review.author_name),
    rating: review.rating,
    date: formatApiReviewDate(review.time),
    text: review.text,
    source: 'google',
  };
}

function reviewDedupeKey(review: GoogleReviewEntry): string {
  const author = review.author.trim().toLowerCase();
  const snippet = review.text.trim().slice(0, 80).toLowerCase();
  return `${author}::${snippet}`;
}

/** Fusionne les avis locaux et API sans doublon (priorité aux entrées locales). */
function mergeReviews(
  local: GoogleReviewEntry[],
  fromApi: GoogleReviewEntry[],
): GoogleReviewEntry[] {
  const seen = new Set(local.map(reviewDedupeKey));
  const merged = [...local];
  for (const entry of fromApi) {
    const key = reviewDedupeKey(entry);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(entry);
  }
  return merged;
}

/**
 * Charge les avis pour la page dédiée.
 * - API Google Places : jusqu’à 5 avis + note agrégée si credentials configurés.
 * - Fichier `data/googleReviews.ts` : avis supplémentaires saisis manuellement.
 */
export async function getAvisClientsPageData(): Promise<AvisClientsPageData> {
  const localReviews = getFilledGoogleReviews();
  const apiData = await getGoogleReviews();

  const apiReviews =
    apiData?.reviews?.length ? apiData.reviews.map(mapApiReviewToEntry) : [];

  const reviews = mergeReviews(localReviews, apiReviews);

  const aggregate =
    apiData &&
    typeof apiData.rating === 'number' &&
    apiData.rating > 0 &&
    typeof apiData.user_ratings_total === 'number' &&
    apiData.user_ratings_total > 0
      ? { rating: apiData.rating, total: apiData.user_ratings_total }
      : null;

  return { reviews, aggregate };
}
