import {
  CONSULTANT_HERO_SUBTITLE,
  CONSULTANT_HERO_TAGLINE,
} from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_HERO } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantRecruitmentHero() {
  return (
    <section className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false, divide: true })}>
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h1 className={OFC_TYPE_HERO}>Devenez consultant-formateur en IA BTP</h1>
        <p className={`mt-3 text-base leading-relaxed text-ofc-ink-muted ${DEVENEZ_CONSULTANT_PROSE}`}>
          {CONSULTANT_HERO_SUBTITLE}
        </p>
        <p className="mt-3 text-sm text-slate-500">{CONSULTANT_HERO_TAGLINE}</p>
      </div>
    </section>
  );
}
