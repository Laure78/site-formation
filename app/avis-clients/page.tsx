import Link from 'next/link';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { AvisGoogleSection } from '@/components/avis-clients/AvisGoogleSection';
import { AvisClientsLeaveReviewCta } from '@/components/avis-clients/AvisClientsLeaveReviewCta';
import { AvisClientsReassurance } from '@/components/avis-clients/AvisClientsReassurance';
import { AvisClientsFinalCta } from '@/components/avis-clients/AvisClientsFinalCta';
import { Reveal } from '@/components/motion/Reveal';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import { FAQ_AVIS_CLIENTS_PAGE } from '@/lib/avis-clients-page-faq';
import { getAvisClientsPageData } from '@/lib/google-reviews-page';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import {
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
              Retours authentiques de professionnels du BTP et de dirigeants formés à l&apos;IA en
              présentiel en Île-de-France —{' '}
              <Link href={LINKS.formationIaBtp} className="font-medium text-[var(--accent)] hover:underline">
                formation IA BTP
              </Link>
              ,{' '}
              <Link
                href={LINKS.formationIaConducteurDeTravaux}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                parcours conducteur de travaux
              </Link>{' '}
              et{' '}
              <Link
                href={LINKS.formationIaDirigeantPmeBtp}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                dirigeants de PME
              </Link>
              .
            </p>
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
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Autres témoignages complémentaires
              </h2>
            </Reveal>
            <div className="mt-10">
              <GoogleReviewsGrid reviews={additionalReviews} />
            </div>
          </div>
        </section>
      ) : null}

      <section className={OFC_SEC.white}>
        <div className={OFC_SECTION_INNER}>
          <FormationsFaqSection
            items={FAQ_AVIS_CLIENTS_PAGE}
            title="Où lire les avis sur les formations ?"
            subtitle="Google Maps, indicateurs Qualiopi et témoignages complémentaires."
          />
        </div>
      </section>

      <AvisClientsReassurance />
      <AvisClientsFinalCta googleUrl={mapsUrl} />
    </div>
  );
}
