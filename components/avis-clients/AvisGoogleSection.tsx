import { ExternalLink } from 'lucide-react';
import type { AvisClientsGoogleBlock } from '@/lib/google-reviews-page';
import { GoogleReviewsEmbed } from '@/components/avis-clients/GoogleReviewsEmbed';
import { StarRating } from '@/components/avis-clients/StarRating';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { formatRating } from '@/lib/google-reviews';
import { Reveal } from '@/components/motion/Reveal';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type AvisGoogleSectionProps = {
  google: AvisClientsGoogleBlock | null;
};

/** Section principale — avis Google Business Profile (Elfsight + repli API). */
export function AvisGoogleSection({ google }: AvisGoogleSectionProps) {
  const mapsUrl = google?.aggregate.googleUrl || SCHEMA_GOOGLE_REVIEWS_VIEW_URL;
  const reviews = google?.reviews ?? [];

  return (
    <section className="scroll-mt-24" aria-labelledby="avis-google-title">
      <Reveal>
        <h2
          id="avis-google-title"
          className="font-display text-2xl font-bold text-slate-900 md:text-2xl"
        >
          Ils partagent leur expérience
        </h2>
      </Reveal>

      <Reveal className="mt-8">
        <h3
          id="avis-google-widget-title"
          className="font-display text-xl font-bold text-slate-900 md:text-2xl"
        >
          Découvrez les avis de nos clients sur Google
        </h3>
        {google ? (
          <div className="mt-4 inline-flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm">
            <StarRating rating={google.aggregate.rating} size={20} />
            <p className="text-lg font-bold text-[var(--accent)]">
              {formatRating(google.aggregate.rating)}/5 sur Google
            </p>
            <p className="text-sm text-slate-600">{google.aggregate.total} avis publics</p>
          </div>
        ) : null}
      </Reveal>

      <div className="mt-8" aria-labelledby="avis-google-widget-title">
        <GoogleReviewsEmbed reviews={reviews} googleUrl={mapsUrl} />
      </div>

      <Reveal className="mt-10">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir tous les avis Google (ouvre un nouvel onglet)"
          className={`${OFC_CTA_PRIMARY} inline-flex w-full items-center justify-center gap-2 sm:w-auto`}
        >
          Voir tous les avis Google
          <ExternalLink size={18} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
