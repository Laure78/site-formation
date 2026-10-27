import { CONSULTANT_HERO_H1, CONSULTANT_HERO_INTRO } from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_HERO } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantRecruitmentHero() {
  return (
    <section className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false, divide: true })}>
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h1 className={OFC_TYPE_HERO}>{CONSULTANT_HERO_H1}</h1>
        <p className={`mt-3 text-base leading-relaxed text-ofc-ink-muted ${DEVENEZ_CONSULTANT_PROSE}`}>
          {CONSULTANT_HERO_INTRO}
        </p>
      </div>
    </section>
  );
}
