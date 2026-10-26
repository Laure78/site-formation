import { CONSULTANT_WHY_OFC } from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantWhyOfcSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="pourquoi-ofc-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="pourquoi-ofc-heading" className={OFC_TYPE_H2}>
          {CONSULTANT_WHY_OFC.heading}
        </h2>
        <p className={`mt-3 text-base leading-relaxed text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          {CONSULTANT_WHY_OFC.intro}
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {CONSULTANT_WHY_OFC.cards.map((card) => (
            <li
              key={card.title}
              className="flex h-full flex-col rounded-lg border border-slate-200 bg-slate-50/40 p-4 sm:p-5"
            >
              <h3 className="font-display text-lg font-bold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
