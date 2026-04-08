import type { GoogleReview } from '@/lib/google-reviews';

/** Avis formatés pour le bandeau défilant (Google ou fallback statique). */
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

/** Avis de secours si l’API Google Places n’est pas disponible (même structure que le bandeau). */
export const STATIC_MARQUEE_REVIEWS: ReviewMarqueeItem[] = [
  {
    id: 'static-1',
    authorName: 'Marc D.',
    text: "Depuis la formation, je génère mes devis 10 fois plus vite. Le retour sur investissement est immédiat. Mes équipes ont gagné en productivité.",
    rating: 5,
    relativeTime: 'Stagiaire BTP',
  },
  {
    id: 'static-2',
    authorName: 'Sophie M.',
    text: "Formation 100 % terrain, zéro théorie inutile. On travaille directement sur nos vrais documents. Les gains de temps sont concrets dès le lendemain.",
    rating: 5,
    relativeTime: 'Assistante de direction',
  },
  {
    id: 'static-3',
    authorName: 'Pierre L.',
    text: "J'ai automatisé tous mes comptes rendus de chantier. Je gagne minimum 2h par jour. La formation est parfaitement adaptée à notre métier.",
    rating: 5,
    relativeTime: 'Conducteur de travaux',
  },
];
