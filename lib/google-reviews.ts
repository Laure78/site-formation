export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export async function getGoogleReviews(): Promise<GooglePlaceDetails | null> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  // Si pas de credentials, retourner null (mode développement)
  if (!placeId || !apiKey) {
    console.warn('Missing Google Places credentials. Set GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY in .env.local');
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=fr`,
      { 
        next: { revalidate: 86400 }, // Cache 24h
      }
    );

    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      return {
        rating: data.result.rating || 0,
        user_ratings_total: data.result.user_ratings_total || 0,
        reviews: data.result.reviews || [],
      };
    }
    
    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Places API request denied. Check your API key and restrictions.');
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

// Fonction helper pour formater la note
export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
