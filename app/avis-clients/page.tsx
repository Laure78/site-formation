import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { AvisGoogleSection } from '@/components/avis-clients/AvisGoogleSection';
import { AvisClientsReassurance } from '@/components/avis-clients/AvisClientsReassurance';
import { AvisClientsFinalCta } from '@/components/avis-clients/AvisClientsFinalCta';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { getAvisClientsPageData } from '@/lib/google-reviews-page';
import {
  SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
  SCHEMA_GOOGLE_REVIEW_SUBMIT_URL,
} from '@/lib/schema-constants';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LABEL,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export const revalidate = 21600;

const PAGE_TITLE = 'Avis clients Formation IA BTP | Laure Olivié';
const PAGE_DESCRIPTION =
  'Avis clients : entreprises du BTP formées en présentiel Île-de-France par Laure Olivié — formation IA, ChatGPT, Claude, appels d\u2019offres et chantier.';

export const metadata = createPageMetadata({
  title: 'Avis clients Formation IA BTP',
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.avisClients,
});

export default async function AvisClientsPage() {
  const { google, additionalReviews } = await getAvisClientsPageData();

  return (
    <div>
      <section className={OFC_SEC.heroWhite}>
        <div className={OFC_SECTION_INNER}>
          <Reveal>
            <p className={OFC_TYPE_LABEL}>ILS NOUS FONT CONFIANCE</p>
            <h1 className={`${OFC_TYPE_HERO} mt-3`}>Avis clients sur les formations IA BTP</h1>
            <p className={`${OFC_TYPE_LEAD} mt-6 max-w-3xl text-slate-600`}>
              Découvrez les retours des professionnels et entreprises accompagnés par{' '}
              <strong className="font-semibold text-slate-800">Laure Olivié</strong>, formatrice IA BTP
              en <strong className="font-semibold text-slate-800">présentiel en région parisienne</strong>,
              dans l&apos;intégration concrète de l&apos;intelligence artificielle dans leurs métiers.
            </p>
          </Reveal>

          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={SCHEMA_GOOGLE_REVIEW_SUBMIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${OFC_CTA_PRIMARY} inline-flex w-full items-center justify-center gap-2 sm:w-auto`}
            >
              Déposer un avis Google
              <ExternalLink size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              href={google?.aggregate.googleUrl ?? SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${OFC_CTA_SECONDARY} inline-flex w-full items-center justify-center gap-2 sm:w-auto`}
            >
              Voir tous les avis Google
              <ExternalLink size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {google ? (
        <section className={OFC_SEC.white}>
          <div className={OFC_SECTION_INNER}>
            <AvisGoogleSection google={google} />
          </div>
        </section>
      ) : null}

      <section className={google ? OFC_SEC.muted : OFC_SEC.white}>
        <div className={OFC_SECTION_INNER}>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              {google ? 'Autres témoignages' : 'Ce sont nos clients qui en parlent le mieux'}
            </h2>
            <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">
              Entreprises du BTP, TPE et PME, conducteurs de travaux, responsables formation et professionnels
              du secteur partagent leur expérience de{' '}
              <strong className="font-semibold text-slate-800">formation intelligence artificielle BTP</strong>{' '}
              en présentiel avec Laure Olivié, formatrice certifiée Qualiopi — sessions intra-entreprise en
              Île-de-France uniquement.
            </p>
          </Reveal>

          <div className="mt-10">
            {google && additionalReviews.length === 0 ? (
              <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                Les avis supplémentaires publiés sur le site seront ajoutés ici lorsqu&apos;ils sont
                disponibles. Consultez la fiche Google pour l&apos;ensemble des retours clients.
              </p>
            ) : (
              <GoogleReviewsGrid reviews={additionalReviews} />
            )}
          </div>

          {!google ? (
            <p className="mt-8 text-center text-sm text-slate-600">
              <a
                href={SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Consulter la fiche Google Business Profile
              </a>
            </p>
          ) : null}
        </div>
      </section>

      <AvisClientsReassurance />
      <AvisClientsFinalCta />
    </div>
  );
}
