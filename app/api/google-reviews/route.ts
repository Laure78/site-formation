import { NextResponse } from 'next/server';
import {
  getGoogleReviewsPayload,
  googleReviewsPayloadToApiJson,
} from '@/lib/google-places-reviews-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/google-reviews — avis Google normalisés (sans clé API).
 * Cache CDN : 6 h + stale-while-revalidate.
 */
export async function GET() {
  try {
    const payload = await getGoogleReviewsPayload();

    if (!payload) {
      return NextResponse.json(
        { error: 'google_reviews_unavailable', message: 'Avis Google temporairement indisponibles.' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    return NextResponse.json(googleReviewsPayloadToApiJson(payload), {
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[api/google-reviews]', error);
    return NextResponse.json(
      { error: 'google_reviews_error', message: 'Erreur lors de la récupération des avis.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
