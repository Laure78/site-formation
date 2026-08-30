import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { GoogleReviewsGrid } from '@/components/avis-clients/GoogleReviewsGrid';
import { AvisClientsReassurance } from '@/components/avis-clients/AvisClientsReassurance';
import { AvisClientsFinalCta } from '@/components/avis-clients/AvisClientsFinalCta';
import { StarRating } from '@/components/avis-clients/StarRating';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { getAvisClientsPageData } from '@/lib/google-reviews-page';
import { formatRating } from '@/lib/google-reviews';
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

export const revalidate = 86400;

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
  const { reviews, aggregate } = await getAvisClientsPageData();

  return (
    <div>
      {/* Section 1 — Hero */}
      <section className={OFC_SEC.heroWhite}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <Reveal>
            <p className={OFC_TYPE_LABEL}>ILS NOUS FONT CONFIANCE</p>
            <h1 className={`${OFC_TYPE_HERO} mt-3`}>Avis clients sur les formations IA BTP</h1>
            <p className={`${OFC_TYPE_LEAD} mt-6 text-slate-600`}>
              Découvrez les retours des professionnels et entreprises accompagnés par{' '}
              <strong className="font-semibold text-slate-800">Laure Olivié</strong>, formatrice IA BTP
              en <strong className="font-semibold text-slate-800">présentiel en région parisienne</strong>,
              dans l&apos;intégration concrète de l&apos;intelligence artificielle dans leurs métiers.
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-5 shadow-sm">
              {aggregate ? (
                <>
                  <StarRating rating={5} size={22} className="justify-center sm:justify-start" />
                  <p className="mt-3 text-center text-sm font-semibold text-slate-800 sm:text-left">
                    Avis Google
                  </p>
                  <p className="mt-1 text-center text-2xl font-bold text-[var(--accent)] sm:text-left">
                    {formatRating(aggregate.rating)}/5 sur Google
                  </p>
                  <p className="mt-0.5 text-center text-sm text-slate-600 sm:text-left">
                    {aggregate.total} avis client{aggregate.total > 1 ? 's' : ''}
                  </p>
                </>
              ) : (
                <>
                  <StarRating rating={5} size={22} className="justify-center sm:justify-start" />
                  <p className="mt-3 text-center text-sm font-semibold text-slate-800 sm:text-left">
                    Avis Google
                  </p>
                  <p className="mt-1 text-center text-base font-medium text-slate-700 sm:text-left">
                    Les avis de nos clients sur Google
                  </p>
                </>
              )}
            </div>
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
              href={SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
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

      {/* Section 2 — Avis clients */}
      <section className={OFC_SEC.white}>
        <div className={OFC_SECTION_INNER}>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Ce sont nos clients qui en parlent le mieux
            </h2>
            <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">
              Entreprises du BTP, artisans, conducteurs de travaux, responsables formation et professionnels
              du secteur partagent leur expérience de{' '}
              <strong className="font-semibold text-slate-800">formation intelligence artificielle BTP</strong>{' '}
              en présentiel avec Laure Olivié, formatrice certifiée Qualiopi — sessions intra-entreprise en
              Île-de-France uniquement.
            </p>
          </Reveal>

          <div className="mt-10">
            <GoogleReviewsGrid reviews={reviews} />
          </div>
        </div>
      </section>

      {/* Section 3 — Réassurance */}
      <AvisClientsReassurance />

      {/* Section 4 — CTA final */}
      <AvisClientsFinalCta />
    </div>
  );
}
