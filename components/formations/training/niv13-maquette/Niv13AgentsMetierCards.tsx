import { Briefcase, HardHat } from 'lucide-react';
import { AGENTS_IA_METIER_CARDS } from '@/lib/formation-agents-ia-autonomes-btp-content';

const ICONS = { dirigeant: Briefcase, 'conducteur-travaux': HardHat } as const;

export function Niv13AgentsMetierCards() {
  return (
    <section aria-labelledby="niv13-public-title" className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
      <h2 id="niv13-public-title" className="ofc-type-h2 text-center text-[#101936] md:text-left">
        À qui s&apos;adresse cette formation ?
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-slate-600 md:mx-0 md:text-left md:text-base">
        Un seul programme, deux parcours métier au choix en atelier — dirigeant ou conducteur de travaux.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {AGENTS_IA_METIER_CARDS.map((card) => {
          const Icon = ICONS[card.id];
          return (
            <article
              key={card.id}
              className="rounded-2xl border border-slate-200 border-b-[3px] border-b-[#377CF3] bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50"
            >
              <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.title}</h3>
              <p className="mt-2 text-sm font-medium text-[#1D4ED8]">Objectif du parcours</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{card.objectif}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
