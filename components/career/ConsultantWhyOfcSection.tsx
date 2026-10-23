import { CONSULTANT_WHY_OFC } from '@/lib/consultant-recruitment-content';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export function ConsultantWhyOfcSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'muted', size: 'default' })}
      aria-labelledby="pourquoi-ofc-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
        <h2 id="pourquoi-ofc-heading" className={OFC_TYPE_H2}>
          {CONSULTANT_WHY_OFC.heading}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          {CONSULTANT_WHY_OFC.intro}
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {CONSULTANT_WHY_OFC.cards.map((card) => (
            <li key={card.title} className="ofc-card flex h-full flex-col p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
