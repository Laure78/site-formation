'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

type DevenezConsultantCandidatureSectionProps = {
  sourcePage: string;
};

export function DevenezConsultantCandidatureSection({
  sourcePage,
}: DevenezConsultantCandidatureSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const mailtoRecrutement = formateurRecruitmentMailtoHref();

  return (
    <section
      id="candidature"
      className={`${ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="candidature-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="candidature-heading" className={OFC_TYPE_H2}>
          {submitted ? 'Candidature envoyée' : 'Présentez votre candidature'}
        </h2>

        {submitted ? (
          <p className={`mt-3 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
            Votre proposition a été transmise à l&apos;équipe recrutement OFC.
          </p>
        ) : (
          <p className={`mt-3 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
            Complétez ce questionnaire pour nous présenter votre parcours BTP, votre pratique de
            l&apos;IA et vos disponibilités.
          </p>
        )}

        {!submitted ? (
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
        ) : null}

        <div className="mt-6 rounded-xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-8">
          <CareerApplicationForm
            kind="consultant"
            sourcePage={sourcePage}
            submitLabel="Envoyer ma candidature"
            groupedLayout
            onSuccess={() => setSubmitted(true)}
          />
        </div>

        <p className={`mt-6 text-sm text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          Vous recherchez un{' '}
          <Link href={LINKS.emplois} className="font-medium text-[#377CF3] underline">
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
