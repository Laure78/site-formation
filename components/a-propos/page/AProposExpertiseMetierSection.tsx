import {
  A_PROPOS_SPECIALISATION_CARDS,
  A_PROPOS_SPECIALISATION_INTRO,
} from '@/lib/a-propos-page-config';
import { Bot, HardHat, Scale, Wrench } from 'lucide-react';

const CARD_ICONS = [HardHat, Bot, Wrench, Scale] as const;

/** Notre spécialisation BTP — 4 piliers. */
export function AProposExpertiseMetierSection() {
  return (
    <section
      id="specialisation"
      className="scroll-mt-24"
      aria-labelledby="specialisation-title"
    >
      <h2
        id="specialisation-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Le BTP n&apos;est pas un secteur parmi d&apos;autres.{' '}
        <span className="text-ofc-accent">C&apos;est notre spécialité.</span>
      </h2>
      <div className="mt-4 max-w-3xl space-y-3 text-[0.9375rem] leading-relaxed text-ofc-ink-muted sm:text-base">
        {A_PROPOS_SPECIALISATION_INTRO.map((p) => (
          <p key={p.slice(0, 36)}>{p}</p>
        ))}
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {A_PROPOS_SPECIALISATION_CARDS.map((item, index) => {
          const Icon = CARD_ICONS[index] ?? HardHat;
          return (
            <li
              key={item.title}
              className="rounded-xl border border-ofc-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-[#0F172A]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}