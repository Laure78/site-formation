import type { AvisClientsGoogleBlock } from '@/lib/google-reviews-page';
import { GoogleReviewsEmbed } from '@/components/avis-clients/GoogleReviewsEmbed';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { Reveal } from '@/components/motion/Reveal';

type AvisGoogleSectionProps = {
  google: AvisClientsGoogleBlock | null;
};

/** Section principale — avis Google Business Profile. */
export function AvisGoogleSection({ google }: AvisGoogleSectionProps) {
  const mapsUrl = google?.aggregate.googleUrl || SCHEMA_GOOGLE_REVIEWS_VIEW_URL;
  const reviews = google?.reviews ?? [];

  return (
    <section className="scroll-mt-24" aria-labelledby="avis-google-title">
      <Reveal>
        <h2
          id="avis-google-title"
          className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
        >
          Ils partagent leur expérience
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">
          Retours publiés sur ma fiche Google Business Profile.
        </p>
      </Reveal>

      <div className="mt-10">
        <GoogleReviewsEmbed reviews={reviews} googleUrl={mapsUrl} />
      </div>
    </section>
  );
}
