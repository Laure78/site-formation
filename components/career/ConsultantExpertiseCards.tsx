import {
  Briefcase,
  Building2,
  Calculator,
  ClipboardList,
  HardHat,
  type LucideIcon,
} from 'lucide-react';
import {
  CONSULTANT_COMPETENCE_GROUPS,
  CONSULTANT_EXPERTISE_CARDS,
} from '@/lib/consultant-recruitment-content';
import type { ConsultantExpertiseValue } from '@/lib/career-form-validation';
import { DEVENEZ_CONSULTANT_INNER, DEVENEZ_CONSULTANT_PROSE } from '@/lib/devenez-consultant-layout';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

const ICONS: Record<ConsultantExpertiseValue, LucideIcon> = {
  'conduite-travaux': HardHat,
  'etudes-prix-ao': Calculator,
  'bureau-etudes-moe': ClipboardList,
  'gestion-admin-commerciale': Briefcase,
  'direction-entreprise-btp': Building2,
};

export function ConsultantExpertiseCards() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })}
      aria-labelledby="profils-recherches-heading"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <h2 id="profils-recherches-heading" className={OFC_TYPE_H2}>
          Profils et compétences recherchés
        </h2>
        <p className={`mt-3 text-base text-slate-600 ${DEVENEZ_CONSULTANT_PROSE}`}>
          Domaines d&apos;expertise métier que vous pouvez indiquer dans le questionnaire — sans
          promesse de mission sur chaque filière.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSULTANT_EXPERTISE_CARDS.map((card) => {
            const Icon = ICONS[card.id];
            return (
              <li
                key={card.id}
                className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 sm:p-5"
              >
                <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                <h3 className="mt-3 font-display text-base font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{card.iaExample}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CONSULTANT_COMPETENCE_GROUPS.map((group) => (
            <div
              key={group.title}
              className="h-full rounded-lg border border-slate-200 bg-white p-4 sm:p-5"
            >
              <h3 className="font-display text-lg font-bold text-slate-900">{group.title}</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
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
