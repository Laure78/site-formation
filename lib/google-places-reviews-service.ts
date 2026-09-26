/**
 * Récupération serveur des avis Google — Places API (New) puis repli legacy.
 * Clé API uniquement côté serveur (`GOOGLE_PLACES_API_KEY`).
 */
import { unstable_cache } from 'next/cache';

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  language?: string;
}

export interface GooglePlaceDetails {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  placeName?: string | null;
  googleUrl?: string;
  lastUpdated?: string;
  source?: 'places-api-new' | 'places-api-legacy';
}

const CACHE_TAG = 'google-place-reviews';
/** 6 h — limite les appels Google tout en gardant des données fraîches. */
const REVALIDATE_SECONDS = 6 * 60 * 60;

export type GoogleReviewsApiResponse = {
  placeName: string | null;
  placeId: string;
  rating: number;
  userRatingsTotal: number;
  googleUrl: string;
  reviews: GoogleReview[];
  lastUpdated: string;
  source: 'places-api-new' | 'places-api-legacy';
};

function getCredentials(): { placeId: string; apiKey: string } | null {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!placeId || !apiKey) return null;
  return { placeId, apiKey };
}

function placeResourceName(placeId: string): string {
  return placeId.startsWith('places/') ? placeId : `places/${placeId}`;
}

function publishTimeToUnix(iso: string | undefined): number {
  if (!iso) return 0;
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : 0;
}

async function fetchFromPlacesApiNew(
  placeId: string,
  apiKey: string,
): Promise<GoogleReviewsApiResponse | null> {
  const resource = placeResourceName(placeId);
  const fieldMask = [
    'id',
    'displayName',
    'rating',
    'userRatingCount',
    'googleMapsUri',
    'reviews',
  ].join(',');

  const response = await fetch(`https://places.googleapis.com/v1/${resource}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
      'Accept-Language': 'fr',
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('[google-reviews] Places API (New) HTTP', response.status, body.slice(0, 200));
    return null;
  }

  const data = (await response.json()) as {
    displayName?: { text?: string };
    rating?: number;
    userRatingCount?: number;
    googleMapsUri?: string;
    reviews?: Array<{
      rating?: number;
      text?: { text?: string; languageCode?: string };
      publishTime?: string;
      relativePublishTimeDescription?: string;
      authorAttribution?: {
        displayName?: string;
        uri?: string;
        photoUri?: string;
      };
    }>;
  };

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .filter((r) => r.rating && r.text?.text?.trim())
    .map((r) => ({
      author_name: r.authorAttribution?.displayName?.trim() || 'Utilisateur Google',
      author_url: r.authorAttribution?.uri,
      profile_photo_url: r.authorAttribution?.photoUri,
      rating: r.rating ?? 0,
      relative_time_description: r.relativePublishTimeDescription ?? '',
      text: r.text?.text ?? '',
      time: publishTimeToUnix(r.publishTime),
      language: r.text?.languageCode,
    }));

  const rating = typeof data.rating === 'number' ? data.rating : 0;
  const userRatingsTotal =
    typeof data.userRatingCount === 'number' ? data.userRatingCount : 0;

  if (rating <= 0 || userRatingsTotal <= 0) {
    return null;
  }

  return {
    placeName: data.displayName?.text ?? null,
    placeId,
    rating,
    userRatingsTotal,
    googleUrl: data.googleMapsUri ?? '',
    reviews,
    lastUpdated: new Date().toISOString(),
    source: 'places-api-new',
  };
}

async function fetchFromPlacesApiLegacy(
  placeId: string,
  apiKey: string,
): Promise<GoogleReviewsApiResponse | null> {
  const fields = 'name,rating,user_ratings_total,url,reviews';
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${encodeURIComponent(apiKey)}&language=fr`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  const data = (await response.json()) as {
    status?: string;
    error_message?: string;
    result?: {
      name?: string;
      rating?: number;
      user_ratings_total?: number;
      url?: string;
      reviews?: Array<{
        author_name?: string;
        author_url?: string;
        profile_photo_url?: string;
        rating?: number;
        relative_time_description?: string;
        text?: string;
        time?: number;
        language?: string;
      }>;
    };
  };

  if (data.status !== 'OK' || !data.result) {
    if (data.status === 'REQUEST_DENIED') {
      console.error('[google-reviews] Places legacy denied:', data.error_message ?? data.status);
    }
    return null;
  }

  const { result } = data;
  const rating = result.rating ?? 0;
  const userRatingsTotal = result.user_ratings_total ?? 0;
  if (rating <= 0 || userRatingsTotal <= 0) return null;

  const reviews: GoogleReview[] = (result.reviews ?? [])
    .filter((r) => r.rating && r.text?.trim())
    .map((r) => ({
      author_name: r.author_name?.trim() || 'Utilisateur Google',
      author_url: r.author_url,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating ?? 0,
      relative_time_description: r.relative_time_description ?? '',
      text: r.text ?? '',
      time: r.time ?? 0,
      language: r.language,
    }));

  return {
    placeName: result.name ?? null,
    placeId,
    rating,
    userRatingsTotal,
    googleUrl: result.url ?? '',
    reviews,
    lastUpdated: new Date().toISOString(),
    source: 'places-api-legacy',
  };
}

async function fetchGoogleReviewsFromGoogle(): Promise<GoogleReviewsApiResponse | null> {
  const creds = getCredentials();
  if (!creds) {
    console.warn(
      '[google-reviews] GOOGLE_PLACE_ID et GOOGLE_PLACES_API_KEY requis (serveur uniquement).',
    );
    return null;
  }

  const fromNew = await fetchFromPlacesApiNew(creds.placeId, creds.apiKey);
  if (fromNew) return fromNew;

  return fetchFromPlacesApiLegacy(creds.placeId, creds.apiKey);
}

function toPlaceDetails(payload: GoogleReviewsApiResponse): GooglePlaceDetails {
  return {
    rating: payload.rating,
    user_ratings_total: payload.userRatingsTotal,
    reviews: payload.reviews,
    placeName: payload.placeName,
    googleUrl: payload.googleUrl,
    lastUpdated: payload.lastUpdated,
    source: payload.source,
  };
}

export async function getGoogleReviewsPayloadUncached(): Promise<GoogleReviewsApiResponse | null> {
  return fetchGoogleReviewsFromGoogle();
}

export async function getGoogleReviewsPayload(): Promise<GoogleReviewsApiResponse | null> {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim() ?? 'unset';
  return unstable_cache(
    async () => fetchGoogleReviewsFromGoogle(),
    [CACHE_TAG, placeId],
    { revalidate: REVALIDATE_SECONDS, tags: [CACHE_TAG] },
  )();
}

/** Alias historique — `getGoogleReviews()` pour l’accueil et les composants landing. */
export async function getGooglePlaceDetailsCached(): Promise<GooglePlaceDetails | null> {
  const payload = await getGoogleReviewsPayload();
  return payload ? toPlaceDetails(payload) : null;
}

export function googleReviewsPayloadToApiJson(
  payload: GoogleReviewsApiResponse,
): Omit<GoogleReviewsApiResponse, 'reviews'> & {
  reviews: GoogleReview[];
} {
  return {
    placeName: payload.placeName,
    placeId: payload.placeId,
    rating: payload.rating,
    userRatingsTotal: payload.userRatingsTotal,
    googleUrl: payload.googleUrl,
    reviews: payload.reviews,
    lastUpdated: payload.lastUpdated,
    source: payload.source,
  };
}
