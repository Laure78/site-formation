import { A_PROPOS_PARCOURS } from '@/lib/a-propos-page-config';

/** Frise chronologique — horizontale sur desktop, verticale sur mobile. */
export function AProposParcoursSection() {
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="scroll-mt-24">
      <h2
        id="parcours-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Mon <span className="text-ofc-accent">parcours</span>
      </h2>

      {/* Mobile — timeline verticale */}
      <ol className="relative mt-8 space-y-6 border-l-2 border-[#BFDBFE] pl-6 md:hidden">
        {A_PROPOS_PARCOURS.map((step) => (
          <li key={step.period} className="relative">
            <span
              className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full bg-ofc-accent ring-4 ring-white"
              aria-hidden
            />
            <p className="text-sm font-semibold text-ofc-accent">{step.period}</p>
            <h3 className="mt-1 font-semibold text-[#0F172A]">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ofc-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      {/* Desktop — frise horizontale */}
      <div className="mt-10 hidden md:block">
        <ol className="relative grid grid-cols-5 gap-3">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-5 h-0.5 bg-gradient-to-r from-ofc-accent/20 via-ofc-accent to-ofc-accent/20"
            aria-hidden
          />
          {A_PROPOS_PARCOURS.map((step) => (
            <li key={step.period} className="relative pt-10 text-center">
              <span
                className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-ofc-accent shadow-sm ring-2 ring-ofc-accent/30"
                aria-hidden
              />
              <p className="text-xs font-bold text-ofc-accent lg:text-sm">{step.period}</p>
              <h3 className="mt-2 text-xs font-semibold leading-snug text-[#0F172A] lg:text-sm">
                {step.title}
              </h3>
              <p className="mt-2 text-left text-[0.6875rem] leading-relaxed text-ofc-ink-muted lg:text-xs">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
