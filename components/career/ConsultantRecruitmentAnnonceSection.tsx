import {
  CONSULTANT_ANNONCE_CONCLUSION,
  CONSULTANT_ANNONCE_MODALITES,
  CONSULTANT_COMPETENCES_RECHERCHEES,
  CONSULTANT_PROFILS_RECHERCHES,
} from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantRecruitmentAnnonceSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="annonce-modalites-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="annonce-modalites-heading" className={OFC_TYPE_H2}>
          Modalités
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

        <h2 id="profils-recherches-annonce" className={`${OFC_TYPE_H2} mt-10`}>
          Profils recherchés
        </h2>
        <p className={`mt-3 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          {CONSULTANT_PROFILS_RECHERCHES}
        </p>

        <h2 id="competences-recherchees-annonce" className={`${OFC_TYPE_H2} mt-10`}>
          Compétences recherchées
        </h2>
        <ul
          className={`mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 ${DEVENEZ_CONSULTANT_PROSE}`}
        >
          {CONSULTANT_COMPETENCES_RECHERCHEES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p
          className={`mt-10 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}
        >
          {CONSULTANT_ANNONCE_CONCLUSION}
        </p>
      </div>
    </section>
  );
}
