import { ExternalLink } from 'lucide-react';
import type { AvisClientsGoogleBlock } from '@/lib/google-reviews-page';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { StarRating } from '@/components/avis-clients/StarRating';
import { formatRating } from '@/lib/google-reviews';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { Reveal } from '@/components/motion/Reveal';

type AvisGoogleSectionProps = {
  google: AvisClientsGoogleBlock;
};

/** Bloc « Les avis Google » — note agrégée + grille dynamique. */
export function AvisGoogleSection({ google }: AvisGoogleSectionProps) {
  const { aggregate, reviews } = google;
  const mapsUrl = aggregate.googleUrl || SCHEMA_GOOGLE_REVIEWS_VIEW_URL;

  return (
    <section className="scroll-mt-24" aria-labelledby="avis-google-title">
      <Reveal>
        <h2 id="avis-google-title" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Les avis Google
        </h2>
        {aggregate.placeName ? (
          <p className="mt-2 text-sm text-slate-600">{aggregate.placeName}</p>
        ) : null}
      </Reveal>

      <Reveal className="mt-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <StarRating rating={aggregate.rating} size={22} />
            <p className="mt-3 text-2xl font-bold text-[var(--accent)]">
              {formatRating(aggregate.rating)}/5 sur Google
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {aggregate.total} avis
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${OFC_CTA_SECONDARY} mt-5 inline-flex w-full items-center justify-center gap-2 sm:mt-0 sm:w-auto`}
          >
            Voir tous les avis sur Google
            <ExternalLink size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </Reveal>

      <div className="mt-10">
        <GoogleReviewsGrid reviews={reviews} hideEmptyFallback />
      </div>
    </section>
  );
}
