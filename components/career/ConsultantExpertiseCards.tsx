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
import { RECRUITMENT_PAGE_INNER, RECRUITMENT_PAGE_PROSE } from '@/lib/devenez-consultant-layout';
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
      className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
      aria-labelledby="domaines-intervention-heading"
    >
      <div className={RECRUITMENT_PAGE_INNER}>
        <h2 id="domaines-intervention-heading" className={OFC_TYPE_H2}>
          Domaines d&apos;intervention
        </h2>
        <p className={`mt-3 text-base text-slate-600 ${RECRUITMENT_PAGE_PROSE}`}>
          Cas d&apos;usage que nous transmettons en formation — indiquez dans le formulaire le
          domaine le plus proche de votre pratique.
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
      </div>
    </section>
  );
}
