import type { GoogleReview } from '@/lib/google-reviews';

/** Avis Google formatés pour le bandeau défilant. */
export type ReviewMarqueeItem = {
  id: string;
  authorName: string;
  text: string;
  rating: number;
  relativeTime?: string;
  profilePhotoUrl?: string;
  authorUrl?: string;
};

export function googleReviewsToMarqueeItems(reviews: GoogleReview[]): ReviewMarqueeItem[] {
  return reviews.map((r, i) => ({
    id: `g-${r.time}-${i}`,
    authorName: r.author_name,
    text: r.text,
    rating: r.rating,
    relativeTime: r.relative_time_description,
    profilePhotoUrl: r.profile_photo_url,
    authorUrl: r.author_url,
  }));
}
