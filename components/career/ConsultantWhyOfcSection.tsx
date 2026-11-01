import { NOUS_REJOINDRE_WHY_ORGANISME } from '@/lib/consultant-recruitment-content';
import { RECRUITMENT_PAGE_INNER, RECRUITMENT_PAGE_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function ConsultantWhyOfcSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })}
      aria-labelledby="pourquoi-ofc-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2 id="pourquoi-ofc-heading" className={OFC_TYPE_H2}>
          {NOUS_REJOINDRE_WHY_ORGANISME.heading}
        </h2>
        <p className={`mt-3 text-base leading-relaxed text-slate-600 ${RECRUITMENT_PAGE_PROSE}`}>
          {NOUS_REJOINDRE_WHY_ORGANISME.intro}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NOUS_REJOINDRE_WHY_ORGANISME.cards.map((card) => (
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
