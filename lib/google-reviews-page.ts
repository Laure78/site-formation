/**
 * Données page `/avis-clients` — API Google Places + témoignages locaux optionnels.
 * Ne jamais inventer de note agrégée ni d’avis fictifs.
 */
import {
  getFilledGoogleReviews,
  type GoogleReviewEntry,
} from '@/data/googleReviews';
import {
  getGoogleReviewsPayload,
  type GoogleReview,
} from '@/lib/google-places-reviews-service';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';

export type AvisClientsAggregate = {
  rating: number;
  total: number;
  placeName: string | null;
  googleUrl: string;
  lastUpdated: string | null;
};

export type AvisClientsGoogleBlock = {
  aggregate: AvisClientsAggregate;
  reviews: GoogleReviewEntry[];
};

export type AvisClientsPageData = {
  /** Bloc Google dynamique — null si API indisponible ou credentials absents. */
  google: AvisClientsGoogleBlock | null;
  /** Témoignages saisis localement (`data/googleReviews.ts`), hors doublons Google. */
  additionalReviews: GoogleReviewEntry[];
};

/** Initiales à partir du nom complet (ex. « Marc Dupont » → « MD »). */
export function getReviewInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function formatApiReviewDate(time: number, relative?: string): string {
  if (time > 0) {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(time * 1000));
  }
  return relative?.trim() || '';
}

function mapApiReviewToEntry(review: GoogleReview): GoogleReviewEntry {
  return {
    id: `google-api-${review.time || review.author_name}`,
    author: review.author_name,
    initials: getReviewInitials(review.author_name),
    rating: review.rating,
    date: formatApiReviewDate(review.time, review.relative_time_description),
    relativeTime: review.relative_time_description || undefined,
    text: review.text,
    source: 'google',
    profilePhotoUrl: review.profile_photo_url,
    authorUrl: review.author_url,
  };
}

function reviewDedupeKey(review: GoogleReviewEntry): string {
  const author = review.author.trim().toLowerCase();
  const snippet = review.text.trim().slice(0, 80).toLowerCase();
  return `${author}::${snippet}`;
}

function excludeDuplicatesFromLocal(
  local: GoogleReviewEntry[],
  googleKeys: Set<string>,
): GoogleReviewEntry[] {
  return local.filter((entry) => !googleKeys.has(reviewDedupeKey(entry)));
}

/**
 * Charge les avis pour la page dédiée (SSR + cache 6 h côté service).
 */
export async function getAvisClientsPageData(): Promise<AvisClientsPageData> {
  const localReviews = getFilledGoogleReviews();
  const payload = await getGoogleReviewsPayload();

  if (!payload || payload.rating <= 0 || payload.userRatingsTotal <= 0) {
    return {
      google: null,
      additionalReviews: localReviews,
    };
  }

  const googleReviews = payload.reviews.map(mapApiReviewToEntry);
  const googleKeys = new Set(googleReviews.map(reviewDedupeKey));

  return {
    google: {
      aggregate: {
        rating: payload.rating,
        total: payload.userRatingsTotal,
        placeName: payload.placeName,
        googleUrl: payload.googleUrl || SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
        lastUpdated: payload.lastUpdated,
      },
      reviews: googleReviews,
    },
    additionalReviews: excludeDuplicatesFromLocal(localReviews, googleKeys),
  };
}
