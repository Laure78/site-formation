import Link from 'next/link';
import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { ConsultantRecruitmentAnnonceSection } from '@/components/career/ConsultantRecruitmentAnnonceSection';
import {
  FORMATEUR_RECRUITMENT_2027_CAMPAIGN,
  NOUS_REJOINDRE_FORMATEUR_FAQ,
} from '@/lib/consultant-recruitment-content';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { formatOrganismeQualiopiCourt } from '@/lib/marque-identite';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_TYPE_BODY,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { OFC_READABLE_COLUMN, ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const HERO_SECTION = ofcSectionClasses({
  tone: 'white',
  size: 'compact',
  mesh: false,
  divide: false,
});

const MAILTO = formateurRecruitmentMailtoHref();

/** Annonce recrutement formateurs indépendants — hub /nous-rejoindre. */
export function NousRejoindreFormateurRecruitment() {
  const C = FORMATEUR_RECRUITMENT_2027_CAMPAIGN;
  const hero = C.hero;

  return (
    <>
      <section
        className={`${HERO_SECTION} scroll-mt-[var(--site-header-height)]`}
        aria-labelledby="nous-rejoindre-formateur-h1"
      >
        <div className={OFC_SECTION_INNER}>
          <div className="max-w-3xl">
            <p className={OFC_EYEBROW}>{hero.eyebrow}</p>
            <h1 id="nous-rejoindre-formateur-h1" className={`${OFC_TYPE_HERO} mt-2 text-pretty`}>
              {hero.h1}
            </h1>
            <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted text-pretty`}>{hero.intro}</p>
            <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted`}>
              Campagne portée par {formatOrganismeQualiopiCourt()} — missions de formateur
              indépendant en intelligence artificielle appliquée au bâtiment et aux travaux publics,
              en présentiel en Île-de-France, à partir de 2027.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-ofc-ink">
              <li>Missions indépendantes rémunérées</li>
              <li>Expérience BTP requise</li>
              <li>Présentiel · Île-de-France</li>
              <li>À partir de 2027</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#candidature"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              >
                {hero.primaryCtaLabel}
              </a>
              <a
                href="#profils-recherches"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              >
                {hero.secondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ConsultantRecruitmentAnnonceSection showShareConclusion={false} />

      <section
        id="candidature"
        className={`${ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
        aria-labelledby="candidature-formateur-heading"
      >
        <div className={OFC_SECTION_INNER}>
          <div className="max-w-3xl">
            <h2 id="candidature-formateur-heading" className={OFC_TYPE_H2}>
              {C.sections.candidatureHeading}
            </h2>
            <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted`}>
              {C.candidatureIntro}
            </p>
            <p className="mt-3">
              <a
                href={MAILTO}
                className="break-all text-lg font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                {RECRUITMENT.email}
              </a>
            </p>
            <p className="mt-6">
              <a
                href={MAILTO}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              >
                Envoyer ma candidature
              </a>
            </p>
            <p className={`${OFC_TYPE_BODY} mt-8 text-ofc-ink-muted`}>{C.conclusion.share}</p>
            <p className={`${OFC_TYPE_BODY} mt-2 font-semibold text-ofc-ink`}>
              {C.conclusion.signature}
              <br />
              <Link
                href={LINKS.home}
                className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                {C.conclusion.site}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
        aria-labelledby="nous-rejoindre-faq-title"
      >
        <div className={OFC_READABLE_COLUMN}>
          <FAQAccordion
            id="recrutement-formateur-faq"
            title="Questions fréquentes — recrutement formateur IA BTP"
            subtitle="Réponses courtes sur les missions indépendantes du catalogue 2027."
            items={NOUS_REJOINDRE_FORMATEUR_FAQ}
          />
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: false })}
        aria-label="Liens utiles"
      >
        <div className={OFC_SECTION_INNER}>
          <p className={`${OFC_TYPE_BODY} text-ofc-ink-muted`}>
            Découvrez le{' '}
            <Link
              href={LINKS.formations}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              catalogue des formations IA BTP
            </Link>{' '}
            et l’{' '}
            <Link
              href={LINKS.formateurs}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              équipe de formateurs
            </Link>{' '}
            qui anime déjà les parcours en présentiel.
          </p>
        </div>
      </section>
    </>
  );
}
