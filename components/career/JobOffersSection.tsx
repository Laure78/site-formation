import Link from 'next/link';
import { emploisRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

type JobOffersSectionProps = {
  /** Affiche le CTA candidature dans l’encart vide (legacy). Sur /emplois, laisser à false. */
  showEmptyStateAction?: boolean;
};

export function JobOffersSection({ showEmptyStateAction = false }: JobOffersSectionProps) {
  const offers = getPublishedJobOffers();

  return (
    <section aria-labelledby="job-offers-heading" className="scroll-mt-[var(--site-header-height)]">
      <h2 id="job-offers-heading" className={OFC_TYPE_H2}>
        Nos offres d’emploi
      </h2>

      {offers.length === 0 ? (
        <div className="emplois-offers-empty mt-4 rounded-xl border border-slate-200/90 bg-white px-4 py-4 sm:px-5 sm:py-5">
          <p className={`${OFC_TYPE_BODY} text-ofc-ink`}>
            Aucune offre d’emploi n’est publiée actuellement. Vous pouvez nous écrire à{' '}
            <a
              href={emploisRecruitmentMailtoHref()}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>{' '}
            ou déposer une candidature spontanée.
          </p>
          <p className="mt-4">
            <a
              href={emploisRecruitmentMailtoHref()}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              aria-label={`Envoyer une candidature par email à ${RECRUITMENT.email}`}
            >
              Écrire à {RECRUITMENT.email}
            </a>
          </p>
          {showEmptyStateAction ? (
            <Link
              href={LINKS.candidaturesSpontanees}
              className={`${OFC_CTA_PRIMARY} mt-4 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
            >
              Envoyer une candidature spontanée
            </Link>
          ) : null}
        </div>
      ) : (
        <ul className="mt-5 grid list-none gap-4 sm:grid-cols-2 lg:gap-5">
          {offers.map((offer) => (
            <li key={offer.id}>
              <article className="ofc-card flex h-full flex-col p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-slate-900">{offer.title}</h3>
                <dl className="mt-3 space-y-1 text-base text-slate-600">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-slate-800">Contrat :</dt>
                    <dd>{offer.contractType}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-slate-800">Localisation :</dt>
                    <dd>{offer.location}</dd>
                  </div>
                </dl>
                <p className={`${OFC_TYPE_BODY} mt-3 flex-1 text-slate-600`}>
                  {offer.missionSummary}
                </p>
                <Link
                  href={`${LINKS.emplois}/${offer.slug}`}
                  className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-base font-semibold`}
                >
                  Voir l’offre
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
