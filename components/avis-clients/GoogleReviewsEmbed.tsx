import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleBusinessProfileMapEmbed } from '@/components/avis-clients/GoogleBusinessProfileMapEmbed';
import { GoogleReviewsCarousel } from '@/components/avis-clients/GoogleReviewsCarousel';
import { ElfsightGoogleReviewsWidget } from '@/components/avis-clients/ElfsightGoogleReviewsWidget';
import { isElfsightGoogleReviewsConfigured } from '@/lib/elfsight-google-reviews';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ExternalLink } from 'lucide-react';

type GoogleReviewsEmbedProps = {
  reviews?: GoogleReviewEntry[];
  googleUrl?: string;
};

function GoogleReviewsEmptyFallback({ googleUrl }: { googleUrl: string }) {
  return (
    <div className="space-y-6" role="status">
      <p className="max-w-2xl text-slate-700">
        Avis publiés sur la fiche Google Business Profile d&apos;OFC Création d&apos;Entreprise —
        consultez la carte (onglet Avis dans le panneau latéral) ou ouvrez la fiche complète sur
        Google.
      </p>
      <GoogleBusinessProfileMapEmbed />
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir tous les avis Google (ouvre un nouvel onglet)"
          className={`${OFC_CTA_SECONDARY} inline-flex items-center justify-center gap-2`}
        >
          Voir tous les avis sur Google
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <p className="text-sm text-slate-500">
          Lien direct :{' '}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            fiche Laure Olivié sur Google
          </a>
        </p>
      </div>
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

  if (!isElfsightGoogleReviewsConfigured()) {
    return fallback;
  }

  return <ElfsightGoogleReviewsWidget fallback={fallback} />;
}
