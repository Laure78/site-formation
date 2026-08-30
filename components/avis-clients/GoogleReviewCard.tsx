import type { GoogleReviewEntry } from '@/data/googleReviews';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { StarRating } from '@/components/avis-clients/StarRating';

type GoogleReviewCardProps = {
  review: GoogleReviewEntry;
};

/** Carte avis Google — fond clair, bordure légère, lift discret au survol. */
export function GoogleReviewCard({ review }: GoogleReviewCardProps) {
  const subtitle = [review.optionalRole, review.optionalCompany].filter(Boolean).join(' — ');

  return (
    <article
      className={`${OFC_CARD} flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm`}
    >
      <header className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]"
          aria-hidden="true"
        >
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">{review.author}</p>
          {subtitle ? <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p> : null}
          <p className="mt-1 block text-xs text-slate-500">{review.date}</p>
        </div>
      </header>

      <StarRating rating={review.rating} size={16} className="mt-4" />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 md:text-base">
        <p>{review.text}</p>
      </blockquote>

      <footer className="mt-5 border-t border-slate-100 pt-3">
        <p className="text-xs font-medium text-slate-500">
          Source : <span className="text-slate-600">Google</span>
        </p>
      </footer>
    </article>
  );
}
