import {
  Calculator,
  FileStack,
  FileText,
  FolderOpen,
  MessageSquare,
} from 'lucide-react';
import { A_PROPOS_DOCUMENTAIRE } from '@/lib/a-propos-page-config';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const DOC_ICONS = [Calculator, FileText, FileStack, MessageSquare, FolderOpen] as const;

/** Section bleu nuit — documents BTP couverts par les formations. */
export function AProposExpertiseDocumentaireSection() {
  return (
    <section
      className="bg-[#0F172A] py-12 md:py-16"
      aria-labelledby="expertise-documentaire-title"
    >
      <div className={`${OFC_SECTION_INNER} px-4 sm:px-6 lg:px-8`}>
        <h2
          id="expertise-documentaire-title"
          className="text-center font-display text-2xl font-bold tracking-tight text-white md:text-3xl"
        >
          L&apos;IA appliquée à vos{' '}
          <span className="text-[#7CB3FF]">documents BTP</span>
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {A_PROPOS_DOCUMENTAIRE.map((item, index) => {
            const Icon = DOC_ICONS[index] ?? FileText;
            return (
              <li
                key={item.title}
                className="rounded-xl border border-white/15 bg-[#1E293B]/80 p-5 transition-colors duration-200 hover:border-[#377CF3]/40 hover:bg-[#1E293B] motion-reduce:transition-none"
              >
                <Icon className="h-6 w-6 text-[#7CB3FF]" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-4 text-sm font-semibold text-white md:text-base">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 md:text-sm">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
