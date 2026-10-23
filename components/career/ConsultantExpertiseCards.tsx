import {
  Briefcase,
  Building2,
  Calculator,
  ClipboardList,
  HardHat,
  type LucideIcon,
} from 'lucide-react';
import { CONSULTANT_EXPERTISE_CARDS } from '@/lib/consultant-recruitment-content';
import type { ConsultantExpertiseValue } from '@/lib/career-form-validation';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

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
      className={ofcSectionClasses({ tone: 'white', size: 'default' })}
      aria-labelledby="profils-recherches-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
        <h2 id="profils-recherches-heading" className={OFC_TYPE_H2}>
          Quels profils recherchons-nous ?
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          Domaines d&apos;expertise que vous pouvez présenter — ce ne sont pas des postes ouverts
          systématiquement.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONSULTANT_EXPERTISE_CARDS.map((card) => {
            const Icon = ICONS[card.id];
            return (
              <li key={card.id} className="ofc-card flex h-full flex-col p-5">
                <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                <h3 className="mt-3 font-display text-base font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{card.iaExample}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
