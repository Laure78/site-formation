import Link from 'next/link';
import { JobOffersSection } from '@/components/career/JobOffersSection';
import { emploisRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_TYPE_BODY,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const HERO_SECTION = ofcSectionClasses({
  tone: 'white',
  size: 'compact',
  mesh: false,
  divide: false,
});

const MAIN_SECTION = ofcSectionClasses({
  tone: 'muted',
  size: 'compact',
  divide: false,
});

const MAILTO_RECRUTEMENT = emploisRecruitmentMailtoHref();

export function EmploisPageContent() {
  const offers = getPublishedJobOffers();
  const hasOffers = offers.length > 0;

  return (
    <div className="emplois-page">
      <section
        className={`${HERO_SECTION} emplois-hub-hero scroll-mt-[var(--site-header-height)]`}
        aria-labelledby="emplois-h1"
      >
        <div className={`${OFC_SECTION_INNER} emplois-hub-hero__inner`}>
          <div className="max-w-3xl">
            <p className={OFC_EYEBROW}>Carrière</p>
            <h1 id="emplois-h1" className={`${OFC_TYPE_HERO} emplois-hub-hero__title`}>
              Rejoignez l’équipe Laure Olivié
            </h1>
            <p className={`${OFC_TYPE_BODY} emplois-hub-hero__lead text-ofc-ink-muted text-pretty`}>
              Contribuez à la formation des professionnels du bâtiment et des travaux publics aux
              usages concrets de l’intelligence artificielle — présentiel en Île-de-France, organisme
              certifié Qualiopi.
            </p>
            <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted`}>
              Pour toute candidature (emploi salarié ou spontanée), écrivez à{' '}
              <a
                href={MAILTO_RECRUTEMENT}
                className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                {RECRUITMENT.email}
              </a>
              .
            </p>
            <p className="mt-4">
              <a
                href={MAILTO_RECRUTEMENT}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
                aria-label={`Contacter le recrutement à ${RECRUITMENT.email}`}
              >
                {RECRUITMENT.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className={`${MAIN_SECTION} emplois-page__main`} aria-label="Recrutement et candidatures">
        <div className={OFC_SECTION_INNER}>
          <div className="emplois-page__layout">
            <JobOffersSection />

            {hasOffers ? (
              <div className="emplois-page__complementary mt-10 border-t border-slate-200/80 pt-10">
                <p className={`${OFC_TYPE_BODY} max-w-2xl text-ofc-ink-muted`}>
                  Vous ne trouvez pas le poste adapté, ou vous souhaitez intervenir en indépendant ?
                </p>
                <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-stretch">
                  <EmploisConsultantBlock compact />
                  <EmploisSpontaneousBlock variant="link" />
                </div>
              </div>
            ) : (
              <div className="emplois-page__paths mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
                <EmploisSpontaneousBlock variant="primary" />
                <EmploisConsultantBlock compact />
              </div>
            )}

            <p className={`${OFC_TYPE_BODY} mt-10 max-w-2xl text-ofc-ink-muted`}>
              Questions recrutement ou envoi de CV :{' '}
              <a
                href={MAILTO_RECRUTEMENT}
                className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                {RECRUITMENT.email}
              </a>
              .
            </p>

            <p className={`${OFC_TYPE_BODY} emplois-page__catalogue-link mt-6 text-ofc-ink-muted`}>
            Découvrez aussi le{' '}
            <Link href={LINKS.formations} className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
              catalogue des formations IA BTP
            </Link>
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
      className={`emplois-path-block flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6`}
    >
      <h2 id="emplois-spontaneous-heading" className={`${OFC_TYPE_H2} emplois-path-block__title`}>
        Candidature spontanée — emploi salarié
      </h2>
      <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
        {isPrimary
          ? 'Aucune offre ne correspond à votre profil ? Présentez votre parcours et le type de poste ou de collaboration salariée que vous recherchez.'
          : 'Présentez votre parcours pour un emploi salarié au sein de l’organisme.'}
      </p>
      {isPrimary ? (
        <Link
          href={LINKS.candidaturesSpontanees}
          className={`${OFC_CTA_PRIMARY} emplois-path-block__cta mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-2.5 pt-5 text-base font-semibold sm:w-auto`}
        >
          Envoyer une candidature spontanée
        </Link>
      ) : (
        <Link
          href={LINKS.candidaturesSpontanees}
          className="emplois-path-block__text-link mt-auto inline-flex min-h-11 items-center pt-4 font-semibold text-[#377CF3] underline-offset-2 hover:underline"
        >
          Envoyer une candidature spontanée
        </Link>
      )}
    </section>
  );
}

function EmploisConsultantBlock({ compact }: { compact: boolean }) {
  return (
    <section
      aria-labelledby="emplois-consultant-heading"
      className={
        compact
          ? 'emplois-path-block emplois-path-block--secondary flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6'
          : 'emplois-path-block'
      }
    >
      <h2 id="emplois-consultant-heading" className={`${OFC_TYPE_H2} emplois-path-block__title text-lg md:text-xl`}>
        Collaboration consultant-formateur
      </h2>
      <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
        Parcours indépendant : présentez votre expertise BTP, votre pratique de l’IA et les sujets
        que vous souhaitez transmettre en formation.
      </p>
      <Link
        href={LINKS.devenezConsultant}
        className={`${OFC_CTA_SECONDARY} emplois-path-block__cta mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-2.5 pt-5 text-base font-semibold sm:w-auto`}
      >
        Proposer mon expertise
      </Link>
    </section>
  );
}
