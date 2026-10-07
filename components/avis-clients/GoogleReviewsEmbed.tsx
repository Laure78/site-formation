import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ExternalLink } from 'lucide-react';

type GoogleReviewsEmbedProps = {
  reviews?: GoogleReviewEntry[];
  googleUrl?: string;
};

/**
 * Affichage des avis Google — grille si données disponibles, sinon lien vers la fiche Google.
 * Pas de widget tiers, pas de clé API côté client.
 */
export function GoogleReviewsEmbed({
  reviews = [],
  googleUrl = SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
}: GoogleReviewsEmbedProps) {
  if (reviews.length > 0) {
    return (
      <div className="min-h-[320px] md:min-h-[360px]">
        <GoogleReviewsGrid reviews={reviews} hideEmptyFallback />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:min-h-[280px] md:p-12"
      role="status"
    >
      <p className="max-w-xl text-slate-700">
        Consultez les avis Google sur ma fiche Business Profile — retours d&apos;entreprises et
        professionnels formés à l&apos;IA pour le BTP.
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
