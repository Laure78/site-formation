import { ChevronDown, CircleHelp } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import type { FAQItem } from '@/lib/faq';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

type Props = {
  featured: readonly FAQItem[];
  secondary: readonly FAQItem[];
  id?: string;
};

/** FAQ — titre à gauche, grille 2 colonnes sur desktop. */
export function Niv01MaquetteFaqSection({ featured, secondary, id = 'faq-niv-01' }: Props) {
  const all = [...featured, ...secondary];
  if (all.length === 0) return null;

  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--site-header-height)+1rem)] border-b border-[#DAE3F0] bg-white px-4 py-10 md:py-12"
      aria-labelledby="niv01-faq-title"
    >
      <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <h2
            id="niv01-faq-title"
            className="font-display text-2xl font-extrabold tracking-tight text-[#101936] md:text-[1.75rem]"
          >
            Questions fréquentes
          </h2>
          <div className="grid gap-2.5 md:grid-cols-2 md:items-start md:gap-3">
            {all.map((item) => (
              <details
                key={item.q}
                className="formation-niv01-maquette-faq group rounded-2xl border border-[#DAE3F0] bg-white shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3.5 text-left [&::-webkit-details-marker]:hidden">
                  <CircleHelp
                    className="h-[1.125rem] w-[1.125rem] shrink-0 text-[#377CF3]"
                    strokeWidth={1.875}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[#101936]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className="h-[1.125rem] w-[1.125rem] shrink-0 text-ofc-ink-subtle motion-safe:transition-transform group-open:rotate-180"
                    strokeWidth={1.875}
                    aria-hidden
                  />
                </summary>
                <div className="border-t border-[#DAE3F0]/80 px-4 pb-4 pt-3 text-sm leading-relaxed text-ofc-ink-muted">
                  <FAQAnswer content={item.a} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
