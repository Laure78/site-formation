import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { AvisGoogleSection } from '@/components/avis-clients/AvisGoogleSection';
import { AvisClientsLeaveReviewCta } from '@/components/avis-clients/AvisClientsLeaveReviewCta';
import { AvisClientsReassurance } from '@/components/avis-clients/AvisClientsReassurance';
import { AvisClientsFinalCta } from '@/components/avis-clients/AvisClientsFinalCta';
import { StarRating } from '@/components/avis-clients/StarRating';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { getAvisClientsPageData } from '@/lib/google-reviews-page';
import { formatRating } from '@/lib/google-reviews';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import {
  OFC_CTA_PRIMARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LABEL,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export const revalidate = 21600;

const PAGE_TITLE = 'Avis clients formations IA BTP | Laure Olivié';
const PAGE_DESCRIPTION =
  'Consultez les avis Google des professionnels et entreprises ayant suivi une formation IA pour le BTP avec Laure Olivié.';

export const metadata = createPageMetadata({
  title: 'Avis clients formations IA BTP',
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.avisClients,
});

export default async function AvisClientsPage() {
  const { google, additionalReviews } = await getAvisClientsPageData();
  const mapsUrl = google?.aggregate.googleUrl ?? SCHEMA_GOOGLE_REVIEWS_VIEW_URL;

  return (
    <div>
      <section className={OFC_SEC.heroWhite}>
        <div className={OFC_SECTION_INNER}>
          <Reveal>
            <p className={OFC_TYPE_LABEL}>PREUVE SOCIALE GOOGLE</p>
            <h1 className={`${OFC_TYPE_HERO} mt-3`}>Avis clients sur mes formations IA</h1>
            <p className={`${OFC_TYPE_LEAD} mt-6 max-w-3xl text-slate-600`}>
              Découvrez les retours des entreprises, professionnels et participants que
              j&apos;accompagne dans l&apos;utilisation concrète de l&apos;intelligence artificielle.
            </p>
          </Reveal>

          {google ? (
            <Reveal className="mt-8">
              <div className="inline-flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 shadow-sm">
                <StarRating rating={google.aggregate.rating} size={22} />
                <p className="text-2xl font-bold text-[var(--accent)]">
                  {formatRating(google.aggregate.rating)}/5 sur Google
                </p>
                <p className="text-sm text-slate-600">
                  {google.aggregate.total} avis
                </p>
              </div>
            </Reveal>
          ) : null}

          <Reveal className="mt-8">
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
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className={OFC_SECTION_INNER}>
          <AvisGoogleSection google={google} />
        </div>
      </section>

      <AvisClientsLeaveReviewCta />

      {additionalReviews.length > 0 ? (
        <section className={OFC_SEC.muted}>
          <div className={OFC_SECTION_INNER}>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Autres témoignages
              </h2>
              <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">
                Témoignages complémentaires de professionnels du BTP formés à l&apos;intelligence
                artificielle en présentiel avec Laure Olivié.
              </p>
            </Reveal>
            <div className="mt-10">
              <GoogleReviewsGrid reviews={additionalReviews} />
            </div>
          </div>
        </section>
      ) : null}

      <AvisClientsReassurance />
      <AvisClientsFinalCta googleUrl={mapsUrl} />
    </div>
  );
}
