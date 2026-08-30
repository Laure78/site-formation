'use client';

import { useCallback, useState } from 'react';
import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleReviewCard } from '@/components/avis-clients/GoogleReviewCard';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ExternalLink } from 'lucide-react';

const PAGE_SIZE = 6;

type GoogleReviewsGridProps = {
  reviews: GoogleReviewEntry[];
};

export function GoogleReviewsGrid({ reviews }: GoogleReviewsGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const shown = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, reviews.length));
  }, [reviews.length]);

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <p className="text-slate-700">
          Les avis Google seront affichés ici dès qu&apos;ils seront disponibles dans notre système.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Consultez la fiche Google de Laure Olivié pour lire les retours des entreprises et professionnels
          du BTP formés à l&apos;intelligence artificielle.
        </p>
        <a
          href={SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${OFC_CTA_SECONDARY} mt-6 inline-flex items-center gap-2`}
        >
          Voir tous les avis Google
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {shown.map((review) => (
          <div key={review.id}>
            <GoogleReviewCard review={review} />
          </div>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={loadMore}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center gap-2 px-8`}
          >
            Afficher plus d&apos;avis ↓
          </button>
        </div>
      ) : null}
    </>
  );
}
