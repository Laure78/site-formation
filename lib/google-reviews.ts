export type { GoogleReview, GooglePlaceDetails } from '@/lib/google-places-reviews-service';
export { getGooglePlaceDetailsCached as getGoogleReviews } from '@/lib/google-places-reviews-service';

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
