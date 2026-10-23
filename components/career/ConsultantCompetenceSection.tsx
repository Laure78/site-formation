import { CONSULTANT_COMPETENCE_GROUPS } from '@/lib/consultant-recruitment-content';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export function ConsultantCompetenceSection() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'muted', size: 'default' })}
      aria-labelledby="competences-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
        <h2 id="competences-heading" className={OFC_TYPE_H2}>
          Les compétences qui nous intéressent
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          Nous valorisons les méthodes pédagogiques fondées sur la pratique et le contrôle humain
          des productions de l&apos;IA.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CONSULTANT_COMPETENCE_GROUPS.map((group) => (
            <div key={group.title} className="ofc-card h-full p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-slate-900">{group.title}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
