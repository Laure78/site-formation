'use client';

import Link from 'next/link';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import {
  CONSULTANT_ANNONCE_CONCLUSION,
  CONSULTANT_CANDIDATURE_INTRO_AFTER_EMAIL,
  CONSULTANT_CANDIDATURE_INTRO_BEFORE_EMAIL,
  FORMATEUR_RECRUITMENT_2027_CAMPAIGN,
} from '@/lib/consultant-recruitment-content';
import { QUALIOPI_STATS } from '@/config/qualiopi';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { RECRUITMENT_PAGE_INNER, RECRUITMENT_PAGE_PROSE } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

type ConsultantFormateurCandidatureSectionProps = {
  sourcePage: string;
};

export function ConsultantFormateurCandidatureSection({
  sourcePage,
}: ConsultantFormateurCandidatureSectionProps) {
  const mailtoRecrutement = formateurRecruitmentMailtoHref();

  return (
    <section
      id="candidature"
      className={`${ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="candidature-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2 id="candidature-heading" className={OFC_TYPE_H2}>
          {FORMATEUR_RECRUITMENT_2027_CAMPAIGN.sections.candidatureHeading}
        </h2>

        <ul
          className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700"
          aria-label="Indicateurs de l’organisme de formation"
        >
          <li>
            Satisfaction {QUALIOPI_STATS.NOTE_MOYENNE} ({QUALIOPI_STATS.NB_REPONDANTS} répondants)
          </li>
          <li>Organisme certifié Qualiopi</li>
          <li>Recrutement catalogue 2027</li>
        </ul>

        <p className={`mt-3 text-base leading-relaxed text-slate-600 ${RECRUITMENT_PAGE_PROSE}`}>
          {CONSULTANT_CANDIDATURE_INTRO_BEFORE_EMAIL}{' '}
          <a
            href={mailtoRecrutement}
            className="break-all font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            {RECRUITMENT.email}
          </a>
          {CONSULTANT_CANDIDATURE_INTRO_AFTER_EMAIL}
        </p>

        <div
          className="mt-5 rounded-lg border border-slate-200 bg-white px-4 py-4 sm:px-5"
          aria-label="Candidature par email"
        >
          <p className="text-sm font-medium text-slate-800">Vous préférez candidater par email ?</p>
          <a
            href={mailtoRecrutement}
            className="mt-1 inline-block text-base font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            {RECRUITMENT.email}
          </a>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-8">
          <CareerApplicationForm
            kind="consultant"
            sourcePage={sourcePage}
            submitLabel="Envoyer ma candidature"
            groupedLayout
            successRedirectPath={LINKS.nousRejoindreMerci}
          />
        </div>

        <p className={`mt-6 text-base leading-relaxed text-slate-600 ${RECRUITMENT_PAGE_PROSE}`}>
          {CONSULTANT_ANNONCE_CONCLUSION}
        </p>

        <p className={`mt-4 text-sm text-slate-600 ${RECRUITMENT_PAGE_PROSE}`}>
          Vous recherchez un{' '}
          <Link href="#emplois-salarie-heading" className="font-medium text-[#377CF3] underline">
            emploi salarié
          </Link>{' '}
          ou souhaitez une{' '}
          <Link
            href={LINKS.candidaturesSpontanees}
            className="font-medium text-[#377CF3] underline"
          >
            candidature spontanée
          </Link>{' '}
          ?
        </p>
      </div>
    </section>
  );
}
