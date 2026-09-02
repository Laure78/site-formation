import { PARTENAIRES_INTERVENTION_STEPS } from '@/lib/partenaires-references-config';

export function PartenairesInterventionSection() {
  return (
    <section id="deroulement" className="scroll-mt-24" aria-labelledby="deroulement-title">
      <h2
        id="deroulement-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Comment se déroule une intervention ?
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2">
        {PARTENAIRES_INTERVENTION_STEPS.map((step) => (
          <li
            key={step.n}
            className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          >
            <span className="text-sm font-bold text-[#377CF3]">Étape {step.n}</span>
            <h3 className="mt-1 font-semibold text-[#0F172A]">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
