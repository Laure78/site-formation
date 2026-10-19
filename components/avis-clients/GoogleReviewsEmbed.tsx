import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleReviewsCarousel } from '@/components/avis-clients/GoogleReviewsCarousel';
import { ElfsightGoogleReviewsWidget } from '@/components/avis-clients/ElfsightGoogleReviewsWidget';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ExternalLink } from 'lucide-react';

type GoogleReviewsEmbedProps = {
  reviews?: GoogleReviewEntry[];
  googleUrl?: string;
};

function GoogleReviewsEmptyFallback({ googleUrl }: { googleUrl: string }) {
  return (
    <div
      className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:min-h-[280px] md:p-12"
      role="status"
    >
      <p className="max-w-xl text-slate-700">
        Consultez les avis authentiques sur la fiche Google Business Profile d&apos;OFC Création
        d&apos;Entreprise.
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

/**
 * Avis Google — widget Elfsight (si configuré + consentement) ou carrousel API / lien fiche Google.
 */
export function GoogleReviewsEmbed({
  reviews = [],
  googleUrl = SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
}: GoogleReviewsEmbedProps) {
  const fallback =
    reviews.length > 0 ? (
      <GoogleReviewsCarousel reviews={reviews} />
    ) : (
      <GoogleReviewsEmptyFallback googleUrl={googleUrl} />
    );

  return <ElfsightGoogleReviewsWidget fallback={fallback} />;
}
