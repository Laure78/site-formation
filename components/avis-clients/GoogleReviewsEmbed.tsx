import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ExternalLink } from 'lucide-react';

type GoogleReviewsEmbedProps = {
  reviews: GoogleReviewEntry[];
  /** URL fiche Google (dynamique si fournie par l’API). */
  googleUrl?: string;
};

/**
 * Présentation des avis Google Business — données injectées côté serveur
 * via Places API (pas de script tiers, pas de clé API côté client).
 * Hauteur minimale pour limiter le CLS.
 */
export function GoogleReviewsEmbed({
  reviews,
  googleUrl = SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
}: GoogleReviewsEmbedProps) {
  if (reviews.length === 0) {
    return (
      <div
        className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:min-h-[280px] md:p-12"
        role="status"
      >
        <p className="max-w-xl text-slate-700">
          Les avis Google s&apos;afficheront ici dès que la connexion à la fiche Google Business
          Profile sera active. En attendant, vous pouvez les consulter directement sur Google.
        </p>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir tous les avis Google (ouvre un nouvel onglet)"
          className={`${OFC_CTA_SECONDARY} mt-6 inline-flex items-center gap-2`}
        >
          Voir tous les avis Google
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-[320px] md:min-h-[360px]">
      <GoogleReviewsGrid reviews={reviews} hideEmptyFallback />
    </div>
  );
}
