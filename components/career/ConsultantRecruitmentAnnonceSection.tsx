import {
  CONSULTANT_ANNONCE_CONCLUSION,
  CONSULTANT_ANNONCE_MODALITES,
  CONSULTANT_COMPETENCES_RECHERCHEES,
  CONSULTANT_PROFILS_RECHERCHES,
  FORMATEUR_RECRUITMENT_2027_CAMPAIGN,
} from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

type ConsultantRecruitmentAnnonceSectionProps = {
  /** Afficher la conclusion « partagez l’annonce » (page /devenez-consultant). */
  showShareConclusion?: boolean;
};

export function ConsultantRecruitmentAnnonceSection({
  showShareConclusion = true,
}: ConsultantRecruitmentAnnonceSectionProps) {
  const S = FORMATEUR_RECRUITMENT_2027_CAMPAIGN.sections;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="annonce-modalites-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="annonce-modalites-heading" className={OFC_TYPE_H2}>
          {S.missionsHeading}
        </h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {CONSULTANT_ANNONCE_MODALITES.map(({ term, detail }) => (
            <div
              key={term}
              className="rounded-lg border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm leading-relaxed"
            >
              <dt className="font-semibold text-slate-900">{term}</dt>
              <dd className="mt-1 text-slate-700">{detail}</dd>
            </div>
          ))}
        </dl>

        <h2 id="profils-recherches" className={`${OFC_TYPE_H2} mt-10 scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}>
          {S.profilsHeading}
        </h2>
        <p className={`mt-3 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          {CONSULTANT_PROFILS_RECHERCHES}
        </p>
        <p className={`mt-4 text-base font-semibold text-slate-900 ${DEVENEZ_CONSULTANT_PROSE}`}>
          {S.profilsHighlight}
        </p>

        <h2 id="competences-recherchees" className={`${OFC_TYPE_H2} mt-10`}>
          {S.competencesHeading}
        </h2>
        <ul
          className={`mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 ${DEVENEZ_CONSULTANT_PROSE}`}
        >
          {CONSULTANT_COMPETENCES_RECHERCHEES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {showShareConclusion ? (
          <p
            className={`mt-10 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}
          >
            {CONSULTANT_ANNONCE_CONCLUSION}
          </p>
        ) : null}
      </div>
    </section>
  );
}
