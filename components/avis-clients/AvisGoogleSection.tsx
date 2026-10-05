import type { AvisClientsGoogleBlock } from '@/lib/google-reviews-page';
import { GoogleReviewsEmbed } from '@/components/avis-clients/GoogleReviewsEmbed';
import { hasTrustindexWidget } from '@/lib/google-reviews-widget';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import { Reveal } from '@/components/motion/Reveal';

type AvisGoogleSectionProps = {
  /** Bloc Google Places API — optionnel (widget Trustindex prioritaire). */
  google: AvisClientsGoogleBlock | null;
};

/** Section principale — avis Google via widget Trustindex gratuit (ou Places API en secours). */
export function AvisGoogleSection({ google }: AvisGoogleSectionProps) {
  const mapsUrl = google?.aggregate.googleUrl || SCHEMA_GOOGLE_REVIEWS_VIEW_URL;
  const reviews = google?.reviews ?? [];
  const usingWidget = hasTrustindexWidget();

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
          {usingWidget
            ? 'Avis issus de ma fiche Google Business Profile — synchronisés automatiquement via un widget gratuit.'
            : 'Retours publiés sur la fiche Google Business Profile. Configurez le widget Trustindex gratuit pour les afficher ici automatiquement.'}
        </p>
      </Reveal>

      <div className="mt-10">
        <GoogleReviewsEmbed reviews={reviews} googleUrl={mapsUrl} />
      </div>
    </section>
  );
}
