'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import {
  CONSULTANT_ANNONCE_CONCLUSION,
  type NousRejoindreRecruitmentCategoryId,
} from '@/lib/consultant-recruitment-content';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const CANDIDATURE_IMAGE = PHOTOS.recrutementCandidatureFormateur2027;

type ConsultantFormateurCandidatureSectionProps = {
  sourcePage: string;
  /** Hub /nous-rejoindre : masque le lien « retour ». */
  embedded?: boolean;
  initialRecruitmentCategories?: NousRejoindreRecruitmentCategoryId[];
};

export function ConsultantFormateurCandidatureSection({
  sourcePage,
  embedded = false,
  initialRecruitmentCategories = [],
}: ConsultantFormateurCandidatureSectionProps) {
  const mailtoRecrutement = formateurRecruitmentMailtoHref();

  return (
    <section
      id="candidature-formateur"
      className={`${ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="candidature-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        {!embedded ? (
          <p className="text-sm font-medium text-slate-600">
            <Link
              href={LINKS.nousRejoindre}
              className="text-[#377CF3] underline-offset-2 hover:underline"
            >
              ← Retour à la page recrutement
            </Link>
          </p>
        ) : null}

        <h2 id="candidature-heading" className={`${OFC_TYPE_H2} ${embedded ? '' : 'mt-4'} text-[#101936]`}>
          Candidatez pour animer nos parcours métiers ou nos formations IA BTP
        </h2>

        <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start xl:gap-10">
          <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 shadow-md lg:sticky lg:top-[calc(var(--site-header-height,4rem)+1rem)]">
            <Image
              src={CANDIDATURE_IMAGE.src}
              alt={CANDIDATURE_IMAGE.alt}
              width={CANDIDATURE_IMAGE.width}
              height={CANDIDATURE_IMAGE.height}
              className="aspect-[4/3] h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 340px"
            />
          </figure>

          <div className="min-w-0">
            <div className="rounded-xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-8">
              <CareerApplicationForm
                kind="consultant"
                sourcePage={sourcePage}
                submitLabel="Envoyer ma candidature"
                groupedLayout
                successRedirectPath={LINKS.nousRejoindreMerci}
                initialRecruitmentCategories={initialRecruitmentCategories}
              />
            </div>

            <aside className="mt-6 rounded-xl bg-[#101936] px-5 py-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="text-sm font-semibold">Une question sur votre candidature ?</p>
                <p className="mt-1 text-sm text-white/80">
                  CV, parcours BTP, exemple d&apos;usage de l&apos;IA et disponibilités.
                </p>
              </div>
              <a
                href={mailtoRecrutement}
                className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-[#7EB4FF] underline-offset-2 hover:underline sm:mt-0"
              >
                <Mail className="h-5 w-5 shrink-0" aria-hidden />
                {RECRUITMENT.email}
              </a>
            </aside>

            <p className="mt-6 text-sm leading-relaxed text-slate-600">{CONSULTANT_ANNONCE_CONCLUSION}</p>

            <p className="mt-4 text-sm text-slate-600">
              Vous recherchez un{' '}
              <Link
                href={`${LINKS.nousRejoindre}#job-offers-heading`}
                className="font-medium text-[#377CF3] underline"
              >
                emploi salarié
              </Link>{' '}
              ou souhaitez une{' '}
              <Link
                href={LINKS.nousRejoindreCandidatureSpontanee}
                className="font-medium text-[#377CF3] underline"
              >
                candidature spontanée
              </Link>{' '}
              ?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
