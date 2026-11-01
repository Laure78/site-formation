'use client';

import Link from 'next/link';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import { candidatureSpontaneeRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { SITE_CONFIG } from '@/lib/seo';

const SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.nousRejoindreCandidatureSpontanee}`;

/** Formulaire candidature spontanée — ancienne page /candidatures-spontanees. */
export function CandidatureSpontaneeSection() {
  const mailto = candidatureSpontaneeRecruitmentMailtoHref();

  return (
    <section
      id="candidature-spontanee"
      className={`${ofcSectionClasses({ tone: 'muted', size: 'default', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="candidature-spontanee-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <p className={OFC_EYEBROW}>Carrière</p>
        <h2 id="candidature-spontanee-heading" className={`${OFC_TYPE_H2} mt-2`}>
          Candidature spontanée
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
          Vous souhaitez contribuer au développement de notre organisme ? Présentez votre parcours,
          vos compétences et le type de collaboration recherché. Vous pouvez aussi nous écrire à{' '}
          <a
            href={mailto}
            className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            {RECRUITMENT.email}
          </a>
          .
        </p>
        <p className="mt-4">
          <a
            href={mailto}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
            aria-label={`Envoyer une candidature spontanée par email à ${RECRUITMENT.email}`}
          >
            {RECRUITMENT.email}
          </a>
        </p>

        <p className="mb-5 mt-8 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
          Complétez le formulaire ci-dessous ou envoyez votre CV et votre présentation à{' '}
          <a
            href={mailto}
            className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            {RECRUITMENT.email}
          </a>
          .
        </p>
        <div className="ofc-card p-5 sm:p-8">
          <CareerApplicationForm
            kind="spontaneous"
            sourcePage={SOURCE_PAGE}
            submitLabel="Envoyer ma candidature"
            showFormationCheckboxes={false}
            successRedirectPath={LINKS.nousRejoindreMerci}
          />
        </div>
        <p className="mt-8 text-sm text-slate-600">
          Voir aussi :{' '}
          <Link href={LINKS.nousRejoindreCandidatureFormateur} className="font-medium text-[#377CF3] underline">
            Candidature formateur indépendant
          </Link>
          {' · '}
          <Link href={`${LINKS.nousRejoindre}#job-offers-heading`} className="font-medium text-[#377CF3] underline">
            Offres d&apos;emploi
          </Link>
          {' · '}
          <Link href={LINKS.formations} className="font-medium text-[#377CF3] underline">
            Formations
          </Link>
        </p>
      </div>
    </section>
  );
}
