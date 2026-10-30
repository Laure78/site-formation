import Link from 'next/link';
import { JobOffersSection } from '@/components/career/JobOffersSection';
import { NousRejoindreFormateurRecruitment } from '@/components/career/NousRejoindreFormateurRecruitment';
import { ScrollToHashOnLoad } from '@/components/navigation/ScrollToHashOnLoad';
import { emploisRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_BODY,
  OFC_TYPE_H2,
} from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_READABLE_COLUMN } from '@/lib/ofc-section-classes';

const SALARIE_SECTION = ofcSectionClasses({
  tone: 'white',
  size: 'compact',
  divide: true,
});

export function EmploisPageContent() {
  const offers = getPublishedJobOffers();
  const hasOffers = offers.length > 0;

  return (
    <div className="emplois-page">
      <ScrollToHashOnLoad />
      <NousRejoindreFormateurRecruitment />

      <section
        className={`${SALARIE_SECTION} emplois-page__salarie`}
        aria-labelledby="emplois-salarie-heading"
      >
        <div className={OFC_READABLE_COLUMN}>
          <h2 id="emplois-salarie-heading" className={OFC_TYPE_H2}>
            Emploi salarié et autres candidatures
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
            Les missions de formateur indépendant du catalogue 2027 sont distinctes des postes
            salariés au sein de l’organisme. Consultez les offres ci-dessous ou déposez une
            candidature spontanée pour un emploi salarié.
          </p>

          <div className="mt-6">
            <JobOffersSection compactEmpty={!hasOffers} />

            {hasOffers ? (
              <div className="emplois-page__complementary mt-8 border-t border-slate-200/80 pt-8">
                <div className="grid gap-5 lg:grid-cols-2">
                  <EmploisSpontaneousBlock variant="link" />
                  <EmploisConsultantFormBlock />
                </div>
              </div>
            ) : (
              <div className="emplois-page__paths mt-6 grid gap-5 lg:grid-cols-2">
                <EmploisSpontaneousBlock variant="primary" />
                <EmploisConsultantFormBlock />
              </div>
            )}

            <p className={`${OFC_TYPE_BODY} mt-8 text-ofc-ink-muted`}>
              Questions recrutement ou envoi de CV (emploi salarié) :{' '}
              <a
                href={emploisRecruitmentMailtoHref()}
                className="break-all font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                {RECRUITMENT.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function EmploisSpontaneousBlock({ variant }: { variant: 'primary' | 'link' }) {
  const isPrimary = variant === 'primary';

  return (
    <section
      aria-labelledby="emplois-spontaneous-heading"
      className="emplois-path-block flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6"
    >
      <h2 id="emplois-spontaneous-heading" className={`${OFC_TYPE_H2} emplois-path-block__title text-lg md:text-xl`}>
        Candidature spontanée — emploi salarié
      </h2>
      <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
        {isPrimary
          ? 'Vous recherchez un poste salarié au sein de l’organisme ? Présentez votre parcours et le type de collaboration que vous visez.'
          : 'Présentez votre parcours pour un emploi salarié au sein de l’organisme.'}
      </p>
      {isPrimary ? (
        <Link
          href={LINKS.candidaturesSpontanees}
          className={`${OFC_CTA_PRIMARY} emplois-path-block__cta mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold sm:w-auto`}
        >
          Envoyer une candidature spontanée
        </Link>
      ) : (
        <Link
          href={LINKS.candidaturesSpontanees}
          className="emplois-path-block__text-link mt-4 inline-flex min-h-11 items-center font-semibold text-[#377CF3] underline-offset-2 hover:underline"
        >
          Envoyer une candidature spontanée
        </Link>
      )}
    </section>
  );
}

function EmploisConsultantFormBlock() {
  return (
    <section
      aria-labelledby="emplois-consultant-form-heading"
      className="emplois-path-block emplois-path-block--secondary flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6"
    >
      <h2
        id="emplois-consultant-form-heading"
        className={`${OFC_TYPE_H2} emplois-path-block__title text-lg md:text-xl`}
      >
        Questionnaire consultant-formateur
      </h2>
      <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
        Vous préférez compléter un formulaire en ligne pour les parcours métiers ? Utilisez la page
        dédiée (complément à l’envoi par email sur cette annonce).
      </p>
      <Link
        href={LINKS.devenezConsultant}
        className={`${OFC_CTA_SECONDARY} emplois-path-block__cta mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold sm:w-auto`}
      >
        Accéder au questionnaire
      </Link>
    </section>
  );
}
