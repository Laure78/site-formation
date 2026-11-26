import type { FormateurProfile } from '@/lib/formateurs';
import {
  FORMATEUR_PROFILE_TIMELINE_DOT,
  FORMATEUR_PROFILE_TIMELINE_ITEM,
} from '@/components/formateurs/profile/formateur-profile-section-styles';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';

type Props = {
  headingId: string;
  title: string;
  formateur: FormateurProfile;
  tone?: 'white' | 'muted';
  /** Ex. titre + « — » + période sur une ligne (Marc). */
  titleFormat?: 'marc' | 'thomas';
};

export function FormateurProfileExperienceSection({
  headingId,
  title,
  formateur,
  tone = 'white',
}: Props) {
  const experiences = formateur.experiences ?? [];
  if (experiences.length === 0 && !formateur.formationsProfessionnelles?.length) {
    return null;
  }

  return (
    <section
      className={ofcSectionClasses({ tone, size: 'compact' })}
      aria-labelledby={headingId}
    >
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <h2 id={headingId} className={OFC_TYPE_H2}>
          {title}
        </h2>
        {experiences.length > 0 ? (
          <ol className="relative mt-8 space-y-8 border-slate-200 pl-0">
            {experiences.map((step) => (
              <li key={step.titre} className={FORMATEUR_PROFILE_TIMELINE_ITEM}>
                <span className={FORMATEUR_PROFILE_TIMELINE_DOT} aria-hidden />
                <h3 className="font-display text-lg font-bold text-[#101936]">
                  {step.periode ? `${step.titre} — ${step.periode}` : step.titre}
                </h3>
                {step.detail ? (
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{step.detail}</p>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}
        {formateur.formationsProfessionnelles &&
        formateur.formationsProfessionnelles.length > 0 ? (
          <div className="mt-8 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3">
            <p className="text-sm font-semibold text-[#101936]">Formation professionnelle</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {formateur.formationsProfessionnelles.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}