import {
  CONSULTANT_ANNONCE_CONCLUSION,
  CONSULTANT_ANNONCE_MODALITES,
  CONSULTANT_COMPETENCES_RECHERCHEES,
  CONSULTANT_PROFILS_RECHERCHES,
  FORMATEUR_RECRUITMENT_2027_CAMPAIGN,
} from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_READABLE_COLUMN, ofcSectionClasses } from '@/lib/ofc-section-classes';

type ConsultantRecruitmentAnnonceSectionProps = {
  /** Afficher la conclusion « partagez l’annonce » (page /devenez-consultant). */
  showShareConclusion?: boolean;
  /** Colonne éditoriale centrée (hub /nous-rejoindre). */
  useReadableColumn?: boolean;
};

export function ConsultantRecruitmentAnnonceSection({
  showShareConclusion = true,
  useReadableColumn = false,
}: ConsultantRecruitmentAnnonceSectionProps) {
  const S = FORMATEUR_RECRUITMENT_2027_CAMPAIGN.sections;
  const innerClass = useReadableColumn ? OFC_READABLE_COLUMN : DEVENEZ_CONSULTANT_INNER;
  const proseClass = useReadableColumn ? '' : DEVENEZ_CONSULTANT_PROSE;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="annonce-modalites-heading"
    >
      <div className={innerClass}>
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
        <p className={`mt-3 text-base leading-relaxed text-slate-600 ${proseClass}`}>
          {CONSULTANT_PROFILS_RECHERCHES}
        </p>
        <p className={`mt-4 text-base font-semibold text-slate-900 ${proseClass}`}>
          {S.profilsHighlight}
        </p>

        <h2 id="competences-recherchees" className={`${OFC_TYPE_H2} mt-10`}>
          {S.competencesHeading}
        </h2>
        <ul
          className={`mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 ${proseClass}`}
        >
          {CONSULTANT_COMPETENCES_RECHERCHEES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {showShareConclusion ? (
          <p
            className={`mt-10 text-base leading-relaxed text-slate-600 ${proseClass}`}
          >
            {CONSULTANT_ANNONCE_CONCLUSION}
          </p>
        ) : null}
      </div>
    </section>
  );
}
