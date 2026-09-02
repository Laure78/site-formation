import { A_PROPOS_PARCOURS } from '@/lib/a-propos-page-config';

export function AProposParcoursSection() {
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="scroll-mt-24">
      <h2
        id="parcours-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Mon parcours
      </h2>
      <ol className="relative mt-8 space-y-6 border-l-2 border-[#BFDBFE] pl-6">
        {A_PROPOS_PARCOURS.map((step) => (
          <li key={step.period} className="relative">
            <span
              className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full bg-[#377CF3]"
              aria-hidden
            />
            <p className="text-sm font-semibold text-[#377CF3]">{step.period}</p>
            <h3 className="mt-1 font-semibold text-[#0F172A]">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#475569]">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
