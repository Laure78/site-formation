import Link from 'next/link';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

export function JobOffersSection() {
  const offers = getPublishedJobOffers();

  return (
    <section aria-labelledby="job-offers-heading" className="scroll-mt-24">
      <h2 id="job-offers-heading" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
        Nos offres d’emploi
      </h2>

      {offers.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
          <p className="text-slate-700">
            Aucune offre d’emploi n’est publiée actuellement. Vous pouvez toutefois nous présenter
            votre parcours.
          </p>
          <Link
            href={LINKS.candidaturesSpontanees}
            className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold`}
          >
            Envoyer une candidature spontanée
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {offers.map((offer) => (
            <li key={offer.id}>
              <article className="ofc-card flex h-full flex-col p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-slate-900">{offer.title}</h3>
                <dl className="mt-3 space-y-1 text-sm text-slate-600">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-slate-800">Contrat :</dt>
                    <dd>{offer.contractType}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-slate-800">Localisation :</dt>
                    <dd>{offer.location}</dd>
                  </div>
                </dl>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {offer.missionSummary}
                </p>
                <Link
                  href={`${LINKS.emplois}/${offer.slug}`}
                  className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold`}
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
